// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Configuration;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Scrubs sensitive data (API keys, tokens, secrets) from text before logging.
/// Defense-in-depth: prevents accidental credential exposure in debug logs.
/// </summary>
public static partial class SensitiveDataScrubber
{
    /// <summary>OpenAI API keys: sk-... or sk-proj-...</summary>
    [GeneratedRegex(@"sk-(?:proj-)?[a-zA-Z0-9]{20,}", RegexOptions.Compiled)]
    private static partial Regex OpenAiKeyPattern();

    /// <summary>GitHub tokens: ghp_, gho_, ghu_, ghs_, ghr_</summary>
    [GeneratedRegex(@"gh[pousr]_[a-zA-Z0-9]{36,}", RegexOptions.Compiled)]
    private static partial Regex GitHubTokenPattern();

    /// <summary>Generic Bearer tokens</summary>
    [GeneratedRegex(@"Bearer\s+[a-zA-Z0-9\-_\.]+", RegexOptions.Compiled | RegexOptions.IgnoreCase)]
    private static partial Regex BearerTokenPattern();

    /// <summary>Generic API key patterns in key=value or "key": "value" format</summary>
    [GeneratedRegex(@"(?i)(api[_-]?key|apikey|secret|password|token|credential|auth)([""']?\s*[:=]\s*[""']?)([a-zA-Z0-9\-_\.]{16,})", RegexOptions.Compiled)]
    private static partial Regex GenericSecretPattern();

    /// <summary>Long hex strings that look like API keys (32+ chars, preceded by key-like word)</summary>
    [GeneratedRegex(@"(?i)(?:key|secret|password|token)([""']?\s*[:=]\s*[""']?)([a-fA-F0-9]{32,})", RegexOptions.Compiled)]
    private static partial Regex HexKeyPattern();

    private const string RedactedPlaceholder = "[REDACTED]";

    /// <summary>
    /// Environment variable name patterns that may contain secrets.
    /// Any env var matching these patterns will have its value scrubbed.
    /// </summary>
    private static readonly string[] SensitiveEnvVarPatterns =
    [
        "_KEY",
        "_TOKEN",
        "_SECRET",
        "_PASSWORD",
        "_CREDENTIAL"
    ];

    // Lazy-loaded cache of actual secret values from environment (for runtime scrubbing)
    private static readonly Lazy<HashSet<string>> _cachedSecretValues = new(LoadSecretValuesFromEnvironment);

    private static HashSet<string> LoadSecretValuesFromEnvironment()
    {
        var secrets = new HashSet<string>(StringComparer.Ordinal);

        // Scan all environment variables for sensitive patterns
        foreach (var key in Environment.GetEnvironmentVariables().Keys.Cast<string>())
        {
            var isSensitive = SensitiveEnvVarPatterns.Any(pattern =>
                key.Contains(pattern, StringComparison.OrdinalIgnoreCase));

            if (isSensitive)
            {
                var value = Environment.GetEnvironmentVariable(key);
                // Only cache non-trivial values (at least 8 chars to avoid false positives)
                if (!string.IsNullOrEmpty(value) && value.Length >= 8)
                {
                    secrets.Add(value);
                }
            }
        }

        return secrets;
    }

    /// <summary>
    /// Scrubs all recognized sensitive patterns from the input text.
    /// Also scrubs any values matching known sensitive environment variables.
    /// </summary>
    public static string Scrub(string? text)
    {
        if (string.IsNullOrEmpty(text))
            return text ?? string.Empty;

        var result = text;

        // PRIORITY 1: Scrub known secret values from environment variables
        // This catches secrets even if they don't match standard patterns
        foreach (var secret in _cachedSecretValues.Value)
        {
            if (result.Contains(secret, StringComparison.Ordinal))
            {
                result = result.Replace(secret, RedactedPlaceholder);
            }
        }

        // PRIORITY 2: Apply pattern-based scrubbing (catches any remaining patterns)
        result = OpenAiKeyPattern().Replace(result, RedactedPlaceholder);
        result = GitHubTokenPattern().Replace(result, RedactedPlaceholder);
        result = BearerTokenPattern().Replace(result, $"Bearer {RedactedPlaceholder}");

        // Generic secret pattern preserves the key name for debugging
        result = GenericSecretPattern().Replace(result, m =>
            $"{m.Groups[1].Value}{m.Groups[2].Value}{RedactedPlaceholder}");

        // Hex keys preceded by key-like words
        result = HexKeyPattern().Replace(result, m =>
            $"{m.Groups[0].Value.Split('=')[0].Split(':')[0]}{m.Groups[1].Value}{RedactedPlaceholder}");

        return result;
    }
}

/// <summary>
/// Debug logger for AI requests. Enable via SDK_CLI_DEBUG=true.
/// All output is scrubbed for secrets before writing.
/// </summary>
public class AiDebugLogger
{
    private readonly ILogger<AiDebugLogger> _logger;
    private readonly string _debugDir;
    private readonly bool _enabled;

    public AiDebugLogger(ILogger<AiDebugLogger> logger, SdkChatOptions options)
    {
        _logger = logger;
        _enabled = options.DebugEnabled;
        _debugDir = options.DebugDirectory ?? GetDefaultDebugDir();

        if (_enabled)
        {
            Directory.CreateDirectory(_debugDir);
            _logger.LogInformation("AI Debug logging enabled. Logs will be written to: {DebugDir}", _debugDir);
        }
    }

    private static string GetDefaultDebugDir()
    {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        return Path.Combine(home, ".sdk-chat", "debug");
    }

    /// <summary>
    /// Log an AI request before it's sent.
    /// </summary>
    public AiDebugSession StartSession(
        string provider,
        string model,
        string? endpoint,
        string systemPrompt,
        string userPrompt,
        ContextInfo? contextInfo = null)
    {
        if (!_enabled) return new AiDebugSession(null, null);

        var session = new AiDebugSession(
            _debugDir,
            $"{DateTime.UtcNow:yyyyMMdd_HHmmss}_{Guid.NewGuid():N}"[..31]  // truncate to reasonable length
        );

        session.Provider = provider;
        session.Model = model;
        session.Endpoint = endpoint;
        session.SystemPrompt = systemPrompt;
        session.UserPrompt = userPrompt;
        session.ContextInfo = contextInfo;
        session.StartTime = DateTime.UtcNow;

        _logger.LogDebug("Started debug session {SessionId}", session.SessionId);

        return session;
    }

    public async Task CompleteSessionAsync(
        AiDebugSession session,
        string response,
        bool streaming,
        int? promptTokens = null,
        int? completionTokens = null,
        Exception? error = null)
    {
        if (!_enabled || session.FilePath == null) return;

        session.Response = response;
        session.Streaming = streaming;
        session.PromptTokens = promptTokens;
        session.CompletionTokens = completionTokens;
        session.Error = error;
        session.EndTime = DateTime.UtcNow;

        // Stream directly to file to handle large content
        await using var writer = new StreamWriter(session.FilePath, false, Encoding.UTF8);
        await WriteMarkdownAsync(writer, session);

        _logger.LogDebug("Wrote debug log to {FilePath}", session.FilePath);
    }

    /// <summary>
    /// Complete a debug session using response chunks that were streamed to disk
    /// via <see cref="AiDebugSession.AppendResponseChunk"/>.
    /// Avoids holding the full response in memory.
    /// </summary>
    public async Task CompleteSessionFromStreamAsync(
        AiDebugSession session,
        bool streaming,
        int? promptTokens = null,
        int? completionTokens = null,
        Exception? error = null)
    {
        if (!_enabled || session.FilePath == null) return;

        // Flush any buffered chunks to disk
        await session.FlushResponseStreamAsync();
        await session.DisposeAsync();

        session.Streaming = streaming;
        session.PromptTokens = promptTokens;
        session.CompletionTokens = completionTokens;
        session.Error = error;
        session.EndTime = DateTime.UtcNow;

        // Write the markdown file, reading the response from the temp file
        await using var writer = new StreamWriter(session.FilePath, false, Encoding.UTF8);
        await WriteMarkdownFromStreamAsync(writer, session);

        // Clean up the temporary response file
        if (session.ResponseChunkFile != null && File.Exists(session.ResponseChunkFile))
        {
            try { File.Delete(session.ResponseChunkFile); }
            catch { /* best-effort cleanup */ }
        }

        _logger.LogDebug("Wrote debug log to {FilePath}", session.FilePath);
    }

    /// <summary>
    /// Writes the markdown debug log, reading the response section from the temp chunk file
    /// instead of from an in-memory string.
    /// </summary>
    private static async Task WriteMarkdownFromStreamAsync(StreamWriter writer, AiDebugSession session)
    {
        // Write everything except the response section using the existing method
        // by temporarily setting Response to a placeholder
        var responseLength = session.ResponseCharsWritten;

        // Header
        await writer.WriteLineAsync($"# AI Debug Log: {session.SessionId}");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync($"**Generated:** {session.StartTime:yyyy-MM-dd HH:mm:ss} UTC");
        await writer.WriteLineAsync();

        // Summary Table
        await writer.WriteLineAsync("## Summary");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("| Property | Value |");
        await writer.WriteLineAsync("|----------|-------|");
        await writer.WriteLineAsync($"| Provider | {session.Provider} |");
        await writer.WriteLineAsync($"| Model | {session.Model} |");
        await writer.WriteLineAsync($"| Endpoint | {session.Endpoint ?? "(default)"} |");
        await writer.WriteLineAsync($"| Streaming | {session.Streaming} |");
        await writer.WriteLineAsync($"| Duration | {(session.EndTime - session.StartTime)?.TotalMilliseconds:F0}ms |");
        await writer.WriteLineAsync($"| Status | {(session.Error == null ? "✅ Success" : "❌ Error")} |");
        await writer.WriteLineAsync();

        // Token usage if available
        if (session.PromptTokens.HasValue || session.CompletionTokens.HasValue)
        {
            await writer.WriteLineAsync("### Token Usage");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("| Type | Count |");
            await writer.WriteLineAsync("|------|-------|");
            if (session.PromptTokens.HasValue)
                await writer.WriteLineAsync($"| Prompt Tokens | {session.PromptTokens:N0} |");
            if (session.CompletionTokens.HasValue)
                await writer.WriteLineAsync($"| Completion Tokens | {session.CompletionTokens:N0} |");
            if (session.PromptTokens.HasValue && session.CompletionTokens.HasValue)
                await writer.WriteLineAsync($"| **Total** | **{session.PromptTokens + session.CompletionTokens:N0}** |");
            await writer.WriteLineAsync();
        }

        // Context Information
        if (session.ContextInfo != null)
        {
            await writer.WriteLineAsync("## Context Files");
            await writer.WriteLineAsync();

            if (session.ContextInfo.Files.Count > 0)
            {
                await writer.WriteLineAsync("| File | Size | Status |");
                await writer.WriteLineAsync("|------|------|--------|");

                foreach (var file in session.ContextInfo.Files.OrderByDescending(f => f.OriginalSize))
                {
                    var status = file.WasTruncated
                        ? $"⚠️ Truncated ({file.TruncatedSize:N0}/{file.OriginalSize:N0} chars, {file.TruncationPercent:F0}%)"
                        : "✅ Full";
                    await writer.WriteLineAsync($"| `{file.RelativePath}` | {FormatBytes(file.OriginalSize)} | {status} |");
                }
                await writer.WriteLineAsync();
            }

            await writer.WriteLineAsync("### Context Statistics");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync($"- **Total Files:** {session.ContextInfo.TotalFiles}");
            await writer.WriteLineAsync($"- **Files Included:** {session.ContextInfo.FilesIncluded}");
            await writer.WriteLineAsync($"- **Files Truncated:** {session.ContextInfo.FilesTruncated}");
            await writer.WriteLineAsync($"- **Files Skipped:** {session.ContextInfo.FilesSkipped}");
            await writer.WriteLineAsync($"- **Total Context Size:** {FormatBytes(session.ContextInfo.TotalContextSize)}");
            await writer.WriteLineAsync($"- **Max Context Size:** {FormatBytes(session.ContextInfo.MaxContextSize)}");
            await writer.WriteLineAsync();
        }

        // System Prompt
        await writer.WriteLineAsync("## System Prompt");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync(SensitiveDataScrubber.Scrub(session.SystemPrompt));
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync();

        // User Prompt
        var scrubbedUserPrompt = SensitiveDataScrubber.Scrub(session.UserPrompt);
        await writer.WriteLineAsync("## User Prompt");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync($"**Length:** {session.UserPrompt.Length:N0} characters (~{EstimateTokens(session.UserPrompt):N0} tokens)");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```");
        await writer.WriteAsync(scrubbedUserPrompt);
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync();

        // Response — stream from temp file instead of holding in memory
        await writer.WriteLineAsync("## Response");
        await writer.WriteLineAsync();

        if (session.Error != null)
        {
            await writer.WriteLineAsync("### ❌ Error");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");
            await writer.WriteLineAsync(SensitiveDataScrubber.Scrub(session.Error.ToString()));
            await writer.WriteLineAsync("```");
        }
        else if (session.ResponseChunkFile != null && File.Exists(session.ResponseChunkFile))
        {
            await writer.WriteLineAsync($"**Length:** {responseLength:N0} characters (~{responseLength / 4:N0} tokens)");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");

            // Stream from temp file in chunks — never load the full response into memory.
            // Use a sliding overlap to prevent secrets straddling chunk boundaries from
            // escaping the scrubber. The overlap size matches the longest plausible secret.
            const int ReadBufferSize = 8192;
            const int MaxSecretLength = 128; // covers GitHub tokens (~40), OpenAI keys (~51)
            var buffer = new char[ReadBufferSize];
            using var reader = new StreamReader(session.ResponseChunkFile, Encoding.UTF8);
            int charsRead;
            string pending = ""; // carries the last MaxSecretLength chars between iterations
            while ((charsRead = await reader.ReadAsync(buffer, 0, buffer.Length)) > 0)
            {
                // Prepend the overlap from the previous iteration so boundary-spanning
                // secrets are visible to the scrubber as a single contiguous string.
                var combined = pending + new string(buffer, 0, charsRead);
                var scrubbed = SensitiveDataScrubber.Scrub(combined);

                // Write everything except the last MaxSecretLength chars.
                // Those chars become the overlap for the next iteration.
                if (scrubbed.Length > MaxSecretLength)
                {
                    await writer.WriteAsync(scrubbed[..^MaxSecretLength]);
                    pending = combined[^MaxSecretLength..];
                }
                else
                {
                    // Entire scrubbed output fits in the overlap — carry it all forward
                    pending = combined;
                }
            }

            // Flush the final overlap — no more chunks coming, so scrub and write all of it.
            if (pending.Length > 0)
            {
                await writer.WriteAsync(SensitiveDataScrubber.Scrub(pending));
            }

            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");
        }
        else
        {
            await writer.WriteLineAsync("**Length:** 0 characters");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");
            await writer.WriteLineAsync("(empty)");
            await writer.WriteLineAsync("```");
        }
        await writer.WriteLineAsync();

        // Request Details
        await writer.WriteLineAsync("## Request Details");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```json");
        var details = new DebugRequestDetails
        {
            Provider = session.Provider,
            Model = session.Model,
            Endpoint = session.Endpoint ?? "(default)",
            Streaming = session.Streaming,
            SystemPromptHash = ComputeHash(session.SystemPrompt),
            UserPromptHash = ComputeHash(session.UserPrompt),
            UserPromptLength = session.UserPrompt.Length,
            ResponseHash = "(streamed)",
            ResponseLength = (int)responseLength,
            DurationMs = (session.EndTime - session.StartTime)?.TotalMilliseconds
        };
        await writer.WriteLineAsync(JsonSerializer.Serialize(details, DebugJsonContext.Default.DebugRequestDetails));
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync();

        await writer.WriteLineAsync("---");
        await writer.WriteLineAsync($"*Debug log generated by SDK Chat v1.0.0*");
    }

    private static async Task WriteMarkdownAsync(StreamWriter writer, AiDebugSession session)
    {
        // Header
        await writer.WriteLineAsync($"# AI Debug Log: {session.SessionId}");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync($"**Generated:** {session.StartTime:yyyy-MM-dd HH:mm:ss} UTC");
        await writer.WriteLineAsync();

        // Summary Table
        await writer.WriteLineAsync("## Summary");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("| Property | Value |");
        await writer.WriteLineAsync("|----------|-------|");
        await writer.WriteLineAsync($"| Provider | {session.Provider} |");
        await writer.WriteLineAsync($"| Model | {session.Model} |");
        await writer.WriteLineAsync($"| Endpoint | {session.Endpoint ?? "(default)"} |");
        await writer.WriteLineAsync($"| Streaming | {session.Streaming} |");
        await writer.WriteLineAsync($"| Duration | {(session.EndTime - session.StartTime)?.TotalMilliseconds:F0}ms |");
        await writer.WriteLineAsync($"| Status | {(session.Error == null ? "✅ Success" : "❌ Error")} |");
        await writer.WriteLineAsync();

        // Token usage if available
        if (session.PromptTokens.HasValue || session.CompletionTokens.HasValue)
        {
            await writer.WriteLineAsync("### Token Usage");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("| Type | Count |");
            await writer.WriteLineAsync("|------|-------|");
            if (session.PromptTokens.HasValue)
                await writer.WriteLineAsync($"| Prompt Tokens | {session.PromptTokens:N0} |");
            if (session.CompletionTokens.HasValue)
                await writer.WriteLineAsync($"| Completion Tokens | {session.CompletionTokens:N0} |");
            if (session.PromptTokens.HasValue && session.CompletionTokens.HasValue)
                await writer.WriteLineAsync($"| **Total** | **{session.PromptTokens + session.CompletionTokens:N0}** |");
            await writer.WriteLineAsync();
        }

        // Context Information
        if (session.ContextInfo != null)
        {
            await writer.WriteLineAsync("## Context Files");
            await writer.WriteLineAsync();

            if (session.ContextInfo.Files.Count > 0)
            {
                await writer.WriteLineAsync("| File | Size | Status |");
                await writer.WriteLineAsync("|------|------|--------|");

                foreach (var file in session.ContextInfo.Files.OrderByDescending(f => f.OriginalSize))
                {
                    var status = file.WasTruncated
                        ? $"⚠️ Truncated ({file.TruncatedSize:N0}/{file.OriginalSize:N0} chars, {file.TruncationPercent:F0}%)"
                        : "✅ Full";
                    await writer.WriteLineAsync($"| `{file.RelativePath}` | {FormatBytes(file.OriginalSize)} | {status} |");
                }
                await writer.WriteLineAsync();
            }

            // Context stats
            await writer.WriteLineAsync("### Context Statistics");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync($"- **Total Files:** {session.ContextInfo.TotalFiles}");
            await writer.WriteLineAsync($"- **Files Included:** {session.ContextInfo.FilesIncluded}");
            await writer.WriteLineAsync($"- **Files Truncated:** {session.ContextInfo.FilesTruncated}");
            await writer.WriteLineAsync($"- **Files Skipped:** {session.ContextInfo.FilesSkipped}");
            await writer.WriteLineAsync($"- **Total Context Size:** {FormatBytes(session.ContextInfo.TotalContextSize)}");
            await writer.WriteLineAsync($"- **Max Context Size:** {FormatBytes(session.ContextInfo.MaxContextSize)}");
            await writer.WriteLineAsync();
        }

        // System Prompt
        // SECURITY: Scrub sensitive data before writing
        await writer.WriteLineAsync("## System Prompt");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync(SensitiveDataScrubber.Scrub(session.SystemPrompt));
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync();

        // User Prompt - FULL content, no truncation
        // SECURITY: Scrub sensitive data before writing
        var scrubbedUserPrompt = SensitiveDataScrubber.Scrub(session.UserPrompt);
        await writer.WriteLineAsync("## User Prompt");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync($"**Length:** {session.UserPrompt.Length:N0} characters (~{EstimateTokens(session.UserPrompt):N0} tokens)");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```");
        await writer.WriteAsync(scrubbedUserPrompt);  // Stream scrubbed content
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync();

        // Response - FULL content, no truncation
        await writer.WriteLineAsync("## Response");
        await writer.WriteLineAsync();

        if (session.Error != null)
        {
            await writer.WriteLineAsync("### ❌ Error");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");
            // SECURITY: Scrub error messages too (may contain secrets in stack traces)
            await writer.WriteLineAsync(SensitiveDataScrubber.Scrub(session.Error.ToString()));
            await writer.WriteLineAsync("```");
        }
        else
        {
            // SECURITY: Scrub response before writing
            var scrubbedResponse = SensitiveDataScrubber.Scrub(session.Response ?? "(empty)");
            await writer.WriteLineAsync($"**Length:** {session.Response?.Length ?? 0:N0} characters (~{EstimateTokens(session.Response ?? ""):N0} tokens)");
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");
            await writer.WriteAsync(scrubbedResponse);  // Stream scrubbed content
            await writer.WriteLineAsync();
            await writer.WriteLineAsync("```");
        }
        await writer.WriteLineAsync();

        // Request Details (for debugging purposes)
        await writer.WriteLineAsync("## Request Details");
        await writer.WriteLineAsync();
        await writer.WriteLineAsync("```json");
        var details = new DebugRequestDetails
        {
            Provider = session.Provider,
            Model = session.Model,
            Endpoint = session.Endpoint ?? "(default)",
            Streaming = session.Streaming,
            SystemPromptHash = ComputeHash(session.SystemPrompt),
            UserPromptHash = ComputeHash(session.UserPrompt),
            UserPromptLength = session.UserPrompt.Length,
            ResponseHash = ComputeHash(session.Response ?? ""),
            ResponseLength = session.Response?.Length ?? 0,
            DurationMs = (session.EndTime - session.StartTime)?.TotalMilliseconds
        };
        await writer.WriteLineAsync(JsonSerializer.Serialize(details, DebugJsonContext.Default.DebugRequestDetails));
        await writer.WriteLineAsync("```");
        await writer.WriteLineAsync();

        // Footer
        await writer.WriteLineAsync("---");
        await writer.WriteLineAsync($"*Debug log generated by SDK Chat v1.0.0*");
    }

    private static string FormatBytes(long bytes)
    {
        if (bytes < 1024) return $"{bytes} B";
        if (bytes < 1024 * 1024) return $"{bytes / 1024.0:F1} KB";
        return $"{bytes / (1024.0 * 1024.0):F1} MB";
    }

    private static int EstimateTokens(string text)
    {
        // Rough estimate: ~4 characters per token
        return text.Length / 4;
    }

    private static string ComputeHash(string text)
    {
        var bytes = Encoding.UTF8.GetBytes(text);
        var hash = SHA256.HashData(bytes);
        return Convert.ToHexString(hash).Substring(0, 16).ToLowerInvariant();
    }
}

/// <summary>
/// Represents an active debug session for tracking request/response.
/// </summary>
public class AiDebugSession : IAsyncDisposable
{
    public string? SessionId { get; }
    public string? FilePath { get; }

    public string Provider { get; set; } = "";
    public string Model { get; set; } = "";
    public string? Endpoint { get; set; }
    public string SystemPrompt { get; set; } = "";
    public string UserPrompt { get; set; } = "";
    public string? Response { get; set; }
    public bool Streaming { get; set; }
    public ContextInfo? ContextInfo { get; set; }

    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }

    public int? PromptTokens { get; set; }
    public int? CompletionTokens { get; set; }
    public Exception? Error { get; set; }

    /// <summary>
    /// Path to a temporary file that accumulates raw response chunks on disk.
    /// Null when debug logging is disabled.
    /// </summary>
    internal string? ResponseChunkFile { get; }

    /// <summary>
    /// Writer for streaming response chunks to disk. Opened lazily on first write.
    /// </summary>
    private StreamWriter? _responseWriter;
    private readonly Lock _writerLock = new();

    /// <summary>
    /// Total characters written to the response stream.
    /// Updated atomically; safe to read from any thread.
    /// </summary>
    public long ResponseCharsWritten => Interlocked.Read(ref _responseCharsWritten);
    private long _responseCharsWritten;

    /// <summary>
    /// Whether this session is actively recording response chunks to disk.
    /// </summary>
    public bool IsRecording => ResponseChunkFile != null;

    public AiDebugSession(string? debugDir, string? sessionId)
    {
        SessionId = sessionId;
        FilePath = sessionId != null && debugDir != null
            ? Path.Combine(debugDir, $"{sessionId}.md")
            : null;
        ResponseChunkFile = FilePath != null
            ? FilePath + ".response.tmp"
            : null;
    }

    /// <summary>
    /// Append a response chunk to the temporary file on disk.
    /// No-op if this session is not recording.
    /// </summary>
    internal void AppendResponseChunk(string chunk)
    {
        if (ResponseChunkFile == null || string.IsNullOrEmpty(chunk))
            return;

        lock (_writerLock)
        {
            _responseWriter ??= new StreamWriter(ResponseChunkFile, append: true, Encoding.UTF8)
            {
                AutoFlush = false // Buffer writes; OS will flush on close
            };
            _responseWriter.Write(chunk);
            Interlocked.Add(ref _responseCharsWritten, chunk.Length);
        }
    }

    /// <summary>
    /// Flush and close the response chunk writer.
    /// </summary>
    internal async Task FlushResponseStreamAsync()
    {
        if (_responseWriter != null)
        {
            await _responseWriter.FlushAsync();
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_responseWriter != null)
        {
            await _responseWriter.DisposeAsync();
            _responseWriter = null;
        }
        GC.SuppressFinalize(this);
    }
}

/// <summary>
/// Information about files included in the context.
/// </summary>
public class ContextInfo
{
    public List<ContextFileInfo> Files { get; set; } = new();
    public int TotalFiles { get; set; }
    public int FilesIncluded { get; set; }
    public int FilesTruncated { get; set; }
    public int FilesSkipped { get; set; }
    public long TotalContextSize { get; set; }
    public long MaxContextSize { get; set; }
}

/// <summary>
/// Information about a single file in the context.
/// </summary>
public class ContextFileInfo
{
    public string RelativePath { get; set; } = "";
    public long OriginalSize { get; set; }
    public long TruncatedSize { get; set; }
    public bool WasTruncated { get; set; }

    public double TruncationPercent => OriginalSize > 0
        ? (1.0 - (double)TruncatedSize / OriginalSize) * 100
        : 0;
}

/// <summary>
/// Request details for debug logging. Typed record to enable AOT-safe serialization.
/// </summary>
internal sealed record DebugRequestDetails
{
    public required string Provider { get; init; }
    public required string Model { get; init; }
    public required string Endpoint { get; init; }
    public required bool Streaming { get; init; }
    public required string SystemPromptHash { get; init; }
    public required string UserPromptHash { get; init; }
    public required int UserPromptLength { get; init; }
    public required string ResponseHash { get; init; }
    public required int ResponseLength { get; init; }
    public required double? DurationMs { get; init; }
}

/// <summary>
/// Source-generated JSON context for debug logging.
/// </summary>
[System.Text.Json.Serialization.JsonSourceGenerationOptions(WriteIndented = true)]
[System.Text.Json.Serialization.JsonSerializable(typeof(DebugRequestDetails))]
internal sealed partial class DebugJsonContext : System.Text.Json.Serialization.JsonSerializerContext
{
}
