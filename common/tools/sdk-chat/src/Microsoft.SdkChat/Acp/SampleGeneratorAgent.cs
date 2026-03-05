// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.Text.Json;
using AgentClientProtocol.Sdk;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Configuration;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Telemetry;

namespace Microsoft.SdkChat.Acp;

/// <summary>
/// ACP agent for SDK sample generation.
///
/// This agent does NOT call AI directly. Instead, it:
/// 1. Analyzes the SDK and builds an AI prompt
/// 2. Returns the prompt to the client for AI generation
/// 3. Receives the generated samples and writes them to disk
///
/// This design keeps AI exclusively on the client side, simplifying
/// the protocol and allowing clients to use any AI provider.
/// </summary>
public sealed class SampleGeneratorAgent(
    IServiceProvider services,
    ILogger<SampleGeneratorAgent> logger,
    int maxSessions = SdkChatOptions.DefaultMaxAcpSessions) : IAgent
{
    /// <summary>Maximum concurrent sessions to prevent memory exhaustion from misbehaving clients.</summary>
    private readonly int _maxSessions = maxSessions;

    private readonly ConcurrentDictionary<string, AgentSessionState> _sessions = new();
    private AgentSideConnection? _currentConnection;

    public void SetConnection(AgentSideConnection connection)
    {
        Interlocked.Exchange(ref _currentConnection, connection);
    }

    public Task<InitializeResponse> InitializeAsync(InitializeRequest request, CancellationToken ct = default)
    {
        return Task.FromResult(new InitializeResponse
        {
            ProtocolVersion = Protocol.Version,
            AgentCapabilities = new AgentCapabilities
            {
                SessionCapabilities = new SessionCapabilities()
            },
            AgentInfo = new Implementation
            {
                Name = "sdk-chat",
                Version = "1.0.0",
                Title = "SDK Chat Sample Generator"
            }
        });
    }

    public Task<NewSessionResponse> NewSessionAsync(NewSessionRequest request, CancellationToken ct = default)
    {
        // Guard against unbounded session creation (DoS protection)
        if (_sessions.Count >= _maxSessions)
        {
            throw RequestError.InternalError(null,
                $"Maximum session limit ({_maxSessions}) reached. Close existing sessions before creating new ones.");
        }

        var sessionId = $"sess_{Guid.NewGuid():N}";

        var state = new AgentSessionState
        {
            SessionId = sessionId,
            WorkingDirectory = request.Cwd
        };

        if (!_sessions.TryAdd(sessionId, state))
        {
            throw new InvalidOperationException($"Session {sessionId} already exists");
        }

        logger.LogDebug("Created session {SessionId} with cwd {Cwd}", sessionId, request.Cwd);

        return Task.FromResult(new NewSessionResponse { SessionId = sessionId });
    }

    public async Task<PromptResponse> PromptAsync(PromptRequest request, CancellationToken ct = default)
    {
        using var activity = SdkChatTelemetry.StartAcpSession(request.SessionId, "prompt");

        if (!_sessions.TryGetValue(request.SessionId, out var session))
        {
            throw RequestError.SessionNotFound(request.SessionId);
        }

        using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct, session.CancellationToken);
        var effectiveCt = linkedCts.Token;

        var connection = _currentConnection;
        var packageInfoService = services.GetRequiredService<IPackageInfoService>();

        try
        {
            return session.Phase switch
            {
                SessionPhase.Initial => await HandleInitialPhaseAsync(session, request, packageInfoService, connection, effectiveCt),
                SessionPhase.AwaitingSdkPath => await HandleSdkPathPhaseAsync(session, request, packageInfoService, connection, effectiveCt),
                SessionPhase.AwaitingOutputFolder => await HandleOutputFolderPhaseAsync(session, request, connection, effectiveCt),
                SessionPhase.AwaitingSampleCount => await HandleSampleCountPhaseAsync(session, request, connection, effectiveCt),
                SessionPhase.AwaitingPromptConfirmation => await HandlePromptConfirmationPhaseAsync(session, request, connection, effectiveCt),
                SessionPhase.AwaitingSamples => await HandleSamplesPhaseAsync(session, request, connection, effectiveCt),
                SessionPhase.Complete => new PromptResponse { StopReason = StopReason.EndTurn },
                _ => throw new InvalidOperationException($"Unknown session phase: {session.Phase}")
            };
        }
        catch (OperationCanceledException)
        {
            await SendTextAsync(connection, request.SessionId, "\n⏹️ Cancelled.\n", ct);
            CleanupSession(request.SessionId);
            return new PromptResponse { StopReason = StopReason.Cancelled };
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in session {SessionId}", request.SessionId);
            await SendTextAsync(connection, request.SessionId, $"\n❌ Error: {ex.Message}\n", ct);
            CleanupSession(request.SessionId);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }
    }

    /// <summary>Phase 1: Ask for SDK path.</summary>
    private async Task<PromptResponse> HandleInitialPhaseAsync(
        AgentSessionState session,
        PromptRequest request,
        IPackageInfoService packageInfoService,
        AgentSideConnection? connection,
        CancellationToken ct)
    {
        var defaultPath = session.WorkingDirectory ?? ".";

        await SendTextAsync(connection, request.SessionId, "🔧 SDK Sample Generator\n\n", ct);
        await SendTextAsync(connection, request.SessionId, $"SDK path (Enter for workspace): {defaultPath}\n", ct);

        session.Phase = SessionPhase.AwaitingSdkPath;
        return new PromptResponse { StopReason = StopReason.EndTurn };
    }

    /// <summary>Phase 2: Analyze SDK at the specified path.</summary>
    private async Task<PromptResponse> HandleSdkPathPhaseAsync(
        AgentSessionState session,
        PromptRequest request,
        IPackageInfoService packageInfoService,
        AgentSideConnection? connection,
        CancellationToken ct)
    {
        var userInput = ExtractUserText(request.Prompt);
        var defaultPath = session.WorkingDirectory ?? ".";
        session.SdkPath = string.IsNullOrWhiteSpace(userInput)
            ? defaultPath
            : ResolvePath(session, userInput);

        if (!Directory.Exists(session.SdkPath))
        {
            await SendTextAsync(connection, request.SessionId, $"❌ Directory does not exist: {session.SdkPath}\n", ct);
            await SendTextAsync(connection, request.SessionId, $"SDK path (Enter for workspace): {defaultPath}\n", ct);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        await SendTextAsync(connection, request.SessionId, $"📂 Analyzing SDK at {session.SdkPath}...\n", ct);

        session.SourceResult = await packageInfoService.DetectSourceFolderAsync(session.SdkPath, language: null, ct);
        session.SamplesResult = await packageInfoService.DetectSamplesFolderAsync(session.SdkPath, ct);

        if (string.IsNullOrEmpty(session.SourceResult.Language))
        {
            await SendTextAsync(connection, request.SessionId, "❌ Could not detect SDK language.\n", ct);
            await SendTextAsync(connection, request.SessionId, $"SDK path (Enter for workspace): {defaultPath}\n", ct);
            session.Phase = SessionPhase.AwaitingSdkPath;
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        await SendTextAsync(connection, request.SessionId, $"✓ Detected {session.SourceResult.Language} SDK\n", ct);
        await SendTextAsync(connection, request.SessionId, $"  Source: {session.SourceResult.SourceFolder}\n", ct);

        var suggestedOutput = Path.GetFullPath(session.SamplesResult.SuggestedSamplesFolder);
        await SendTextAsync(connection, request.SessionId, $"\nOutput directory (Enter for default): {suggestedOutput}\n", ct);

        session.Phase = SessionPhase.AwaitingOutputFolder;
        return new PromptResponse { StopReason = StopReason.EndTurn };
    }

    /// <summary>Phase 3: Get output directory from user.</summary>
    private async Task<PromptResponse> HandleOutputFolderPhaseAsync(
        AgentSessionState session,
        PromptRequest request,
        AgentSideConnection? connection,
        CancellationToken ct)
    {
        var userInput = ExtractUserText(request.Prompt);
        var suggestedOutput = Path.GetFullPath(session.SamplesResult!.SuggestedSamplesFolder);
        session.OutputFolder = string.IsNullOrWhiteSpace(userInput)
            ? suggestedOutput
            : ResolvePath(session, userInput);

        await SendTextAsync(connection, request.SessionId, $"  Output: {session.OutputFolder}\n\n", ct);
        await SendTextAsync(connection, request.SessionId, "How many samples to generate? (Enter for default: 5)\n", ct);

        session.Phase = SessionPhase.AwaitingSampleCount;
        return new PromptResponse { StopReason = StopReason.EndTurn };
    }

    /// <summary>Phase 4: Get sample count from user.</summary>
    private async Task<PromptResponse> HandleSampleCountPhaseAsync(
        AgentSessionState session,
        PromptRequest request,
        AgentSideConnection? connection,
        CancellationToken ct)
    {
        var userInput = ExtractUserText(request.Prompt);

        // Parse sample count, default to 5
        if (string.IsNullOrWhiteSpace(userInput))
        {
            session.SampleCount = 5;
        }
        else if (int.TryParse(userInput.Trim(), out var count) && count > 0 && count <= 20)
        {
            session.SampleCount = count;
        }
        else
        {
            await SendTextAsync(connection, request.SessionId, "❌ Please enter a number between 1 and 20.\n", ct);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        await SendTextAsync(connection, request.SessionId, $"  Samples: {session.SampleCount}\n\n", ct);
        await SendTextAsync(connection, request.SessionId, "📝 Building AI prompt...\n", ct);

        // Build the prompt
        session.BuiltPrompt = await BuildPromptAsync(session, ct);

        await SendTextAsync(connection, request.SessionId, $"✓ Prompt ready ({session.BuiltPrompt.EstimatedTokens} tokens)\n\n", ct);
        await SendTextAsync(connection, request.SessionId, "The AI prompt has been built. Reply with:\n", ct);
        await SendTextAsync(connection, request.SessionId, "  - 'generate' to receive the prompt for AI generation\n", ct);
        await SendTextAsync(connection, request.SessionId, "  - 'cancel' to abort\n", ct);

        session.Phase = SessionPhase.AwaitingPromptConfirmation;
        return new PromptResponse { StopReason = StopReason.EndTurn };
    }

    /// <summary>Phase 5: Return prompt to client for AI generation.</summary>
    private async Task<PromptResponse> HandlePromptConfirmationPhaseAsync(
        AgentSessionState session,
        PromptRequest request,
        AgentSideConnection? connection,
        CancellationToken ct)
    {
        var userInput = ExtractUserText(request.Prompt).ToLowerInvariant();

        if (userInput.Contains("cancel", StringComparison.Ordinal))
        {
            await SendTextAsync(connection, request.SessionId, "🚫 Cancelled.\n", ct);
            CleanupSession(session.SessionId);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        if (!string.IsNullOrWhiteSpace(userInput)
            && !userInput.Contains("generate", StringComparison.Ordinal)
            && !userInput.Contains("yes", StringComparison.Ordinal)
            && !userInput.Equals("y", StringComparison.OrdinalIgnoreCase))
        {
            await SendTextAsync(connection, request.SessionId, "Please reply with 'generate' (or press Enter) to proceed, or 'cancel' to abort.\n", ct);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        // Return the prompt to the client
        var prompt = session.BuiltPrompt!;

        await SendTextAsync(connection, request.SessionId, "\n📤 Prompt ready for AI generation.\n", ct);
        await SendTextAsync(connection, request.SessionId, "Send the generated samples as JSON array:\n", ct);
        await SendTextAsync(connection, request.SessionId, "[{\"name\":\"...\",\"description\":\"...\",\"code\":\"...\",\"filePath\":\"...\"}]\n\n", ct);

        // Return prompt data in response metadata for structured access
        session.Phase = SessionPhase.AwaitingSamples;

        return new PromptResponse
        {
            StopReason = StopReason.EndTurn,
            Meta = new Dictionary<string, object>
            {
                ["promptData"] = new Dictionary<string, object>
                {
                    ["systemPrompt"] = prompt.SystemPrompt,
                    ["userPrompt"] = prompt.UserPrompt,
                    ["language"] = session.SourceResult!.Language!,
                    ["outputFolder"] = session.OutputFolder!,
                    ["sampleCount"] = session.SampleCount,
                    ["estimatedTokens"] = prompt.EstimatedTokens
                }
            }
        };
    }

    /// <summary>Phase 6: Receive samples from client and write to disk.</summary>
    private async Task<PromptResponse> HandleSamplesPhaseAsync(
        AgentSessionState session,
        PromptRequest request,
        AgentSideConnection? connection,
        CancellationToken ct)
    {
        var userInput = ExtractUserText(request.Prompt);

        if (string.IsNullOrWhiteSpace(userInput))
        {
            await SendTextAsync(connection, request.SessionId, "❌ No samples provided. Send JSON array of samples.\n", ct);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        // Parse samples from JSON
        List<GeneratedSample> samples;
        try
        {
            samples = SampleResponseParser.ParseJsonArray(userInput);
        }
        catch (JsonException ex)
        {
            await SendTextAsync(connection, request.SessionId, $"❌ Invalid JSON: {ex.Message}\n", ct);
            await SendTextAsync(connection, request.SessionId, $"{SampleResponseParser.CorrectionPrompt}\n", ct);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        if (samples.Count is 0)
        {
            await SendTextAsync(connection, request.SessionId, "❌ No samples in array.\n", ct);
            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        // Write samples to disk
        var outputFolder = Path.GetFullPath(session.OutputFolder!);
        var language = SdkLanguageHelpers.Parse(session.SourceResult!.Language!);
        var fileExtension = GetFileExtension(language);
        List<string> writtenFiles = [];

        Directory.CreateDirectory(outputFolder);

        await SendTextAsync(connection, request.SessionId, $"\n📁 Writing {samples.Count} sample(s)...\n", ct);

        foreach (var sample in samples)
        {
            if (string.IsNullOrEmpty(sample.Code))
                continue;

            var relativePath = !string.IsNullOrEmpty(sample.FilePath)
                ? PathSanitizer.SanitizeFilePath(sample.FilePath, fileExtension)
                : PathSanitizer.SanitizeFileName(sample.Name ?? "sample") + fileExtension;

            var filePath = Path.GetFullPath(Path.Combine(outputFolder, relativePath));

            // Security: ensure path stays within output directory (normalize separators)
            var normalizedOutput = outputFolder.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
            if (!filePath.StartsWith(normalizedOutput + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase))
            {
                logger.LogWarning("Skipping sample with path outside output directory: {Path}", filePath);
                continue;
            }

            var fileDir = Path.GetDirectoryName(filePath);
            if (!string.IsNullOrEmpty(fileDir))
                Directory.CreateDirectory(fileDir);

            await File.WriteAllTextAsync(filePath, sample.Code, ct);
            writtenFiles.Add(filePath);

            await SendTextAsync(connection, request.SessionId, $"  ✓ {relativePath}\n", ct);
        }

        await SendTextAsync(connection, request.SessionId, $"\n✅ Done! Wrote {writtenFiles.Count} sample(s) to {outputFolder}\n", ct);

        using (var metricsActivity = SdkChatTelemetry.StartAcpSession(session.SessionId, "samples"))
        {
            SdkChatTelemetry.RecordSampleMetrics(metricsActivity, writtenFiles.Count, 0, 0);
        }
        logger.LogInformation("Wrote {Count} samples to {Path}", writtenFiles.Count, outputFolder);

        session.Phase = SessionPhase.Complete;
        CleanupSession(session.SessionId);

        return new PromptResponse { StopReason = StopReason.EndTurn };
    }

    /// <summary>Build the AI prompt for sample generation.</summary>
    private async Task<BuiltPrompt> BuildPromptAsync(AgentSessionState session, CancellationToken ct)
    {
        var sourceResult = session.SourceResult!;
        var samplesResult = session.SamplesResult!;
        var language = SdkLanguageHelpers.Parse(sourceResult.Language!);
        var fileHelper = services.GetRequiredService<FileHelper>();
        var context = CreateLanguageContext(language, fileHelper);

        var sdkName = sourceResult.SdkName ?? Path.GetFileName(session.SdkPath ?? ".");
        var count = session.SampleCount;
        var systemPrompt = $"Generate {count} runnable SDK samples for the '{sdkName}' SDK. {context.GetInstructions()}";

        // Build user prompt by collecting source context
        var userPromptBuilder = new System.Text.StringBuilder();
        var existingSampleCount = samplesResult.SamplesFolder != null && Directory.Exists(samplesResult.SamplesFolder)
            ? SdkInfo.CountFilesSafely(samplesResult.SamplesFolder, $"*{context.FileExtension}")
            : 0;

        // Prefix
        userPromptBuilder.AppendLine(existingSampleCount > 0
            ? $"Generate {count} NEW samples for uncovered APIs. Avoid duplicating <existing-samples>."
            : $"Generate {count} samples covering: init/auth, CRUD, async, error handling, advanced features.");
        userPromptBuilder.AppendLine();

        // Output folder
        userPromptBuilder.AppendLine($"<output-folder>{Path.GetFileName(session.OutputFolder!)}</output-folder>");
        userPromptBuilder.AppendLine("Generate filePath relative to the output folder above.");
        userPromptBuilder.AppendLine();

        // Stream source context (limited to reasonable size for prompt)
        const int MaxContextChars = 100_000; // ~25K tokens
        var contextChars = 0;

        await foreach (var chunk in context.StreamContextAsync(
            sourceResult.SourceFolder ?? session.SdkPath!,
            samplesResult.SamplesFolder,
            config: null,
            totalBudget: MaxContextChars,
            ct: ct))
        {
            if (contextChars + chunk.Length > MaxContextChars)
                break;
            userPromptBuilder.Append(chunk);
            contextChars += chunk.Length;
        }

        var userPrompt = userPromptBuilder.ToString();
        var estimatedTokens = (systemPrompt.Length + userPrompt.Length) / 4;

        return new BuiltPrompt(systemPrompt, userPrompt, estimatedTokens);
    }

    private static Services.Languages.Samples.SampleLanguageContext CreateLanguageContext(SdkLanguage language, FileHelper fileHelper) => language switch
    {
        SdkLanguage.DotNet => new Services.Languages.Samples.DotNetSampleLanguageContext(fileHelper),
        SdkLanguage.Python => new Services.Languages.Samples.PythonSampleLanguageContext(fileHelper),
        SdkLanguage.JavaScript => new Services.Languages.Samples.JavaScriptSampleLanguageContext(fileHelper),
        SdkLanguage.TypeScript => new Services.Languages.Samples.TypeScriptSampleLanguageContext(fileHelper),
        SdkLanguage.Java => new Services.Languages.Samples.JavaSampleLanguageContext(fileHelper),
        SdkLanguage.Go => new Services.Languages.Samples.GoSampleLanguageContext(fileHelper),
        _ => throw new NotSupportedException($"Language {language} not supported")
    };

    private static string GetFileExtension(SdkLanguage language) => language switch
    {
        SdkLanguage.DotNet => ".cs",
        SdkLanguage.Python => ".py",
        SdkLanguage.JavaScript => ".js",
        SdkLanguage.TypeScript => ".ts",
        SdkLanguage.Java => ".java",
        SdkLanguage.Go => ".go",
        _ => ".txt"
    };

    private static Task SendTextAsync(AgentSideConnection? connection, string sessionId, string text, CancellationToken ct)
    {
        return connection?.SendTextAsync(sessionId, text, ct) ?? Task.CompletedTask;
    }

    private static string ExtractUserText(ContentBlock[] prompt)
    {
        List<string> parts = [];
        foreach (var block in prompt)
        {
            if (block is TextContent text && !string.IsNullOrWhiteSpace(text.Text))
                parts.Add(text.Text.Trim());
        }
        return string.Join("\n", parts).Trim();
    }

    private static string ResolvePath(AgentSessionState session, string userInput)
    {
        var trimmed = userInput.Trim();
        if (Path.IsPathRooted(trimmed))
        {
            return Path.GetFullPath(trimmed);
        }

        var baseDirectory = string.IsNullOrWhiteSpace(session.WorkingDirectory)
            ? Directory.GetCurrentDirectory()
            : session.WorkingDirectory;

        return Path.GetFullPath(Path.Combine(baseDirectory, trimmed));
    }

    private void CleanupSession(string sessionId)
    {
        if (_sessions.TryRemove(sessionId, out var state))
        {
            state.Dispose();
            logger.LogDebug("Cleaned up session {SessionId}", sessionId);
        }
    }

    public Task CancelAsync(CancelNotification notification, CancellationToken ct = default)
    {
        logger.LogDebug("Cancel requested for session {SessionId}", notification.SessionId);

        if (_sessions.TryGetValue(notification.SessionId, out var sessionState))
        {
            sessionState.RequestCancellation();
            logger.LogInformation("Cancelled session {SessionId}", notification.SessionId);
        }

        return Task.CompletedTask;
    }

    private enum SessionPhase
    {
        Initial,
        AwaitingSdkPath,
        AwaitingOutputFolder,
        AwaitingSampleCount,
        AwaitingPromptConfirmation,
        AwaitingSamples,
        Complete
    }

    private sealed record BuiltPrompt(string SystemPrompt, string UserPrompt, int EstimatedTokens);

    private sealed class AgentSessionState : IDisposable
    {
        private readonly CancellationTokenSource _cts = new();

        public required string SessionId { get; init; }
        public string? WorkingDirectory { get; init; }

        public SessionPhase Phase { get; set; } = SessionPhase.Initial;
        public string? SdkPath { get; set; }
        public SourceFolderResult? SourceResult { get; set; }
        public SamplesFolderResult? SamplesResult { get; set; }
        public string? OutputFolder { get; set; }
        public int SampleCount { get; set; } = 5;
        public BuiltPrompt? BuiltPrompt { get; set; }

        public CancellationToken CancellationToken => _cts.Token;
        public void RequestCancellation() => _cts.Cancel();
        public void Dispose() => _cts.Dispose();
    }
}
