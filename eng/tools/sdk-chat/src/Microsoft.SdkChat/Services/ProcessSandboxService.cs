// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Buffers;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Logging;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Centralized, hardened process execution service.
/// All external process invocations MUST go through this service.
///
/// Security features:
/// - Enforced timeouts (no runaway processes)
/// - Argument sanitization
/// - Output capture with size limits
/// - Structured logging with OpenTelemetry traces
/// </summary>
public sealed class ProcessSandboxService
{
    private static readonly SearchValues<char> InvalidFileNameChars = SearchValues.Create(";|&$`\n\r");
    private readonly ILogger<ProcessSandboxService> _logger;
    private readonly TimeSpan _defaultTimeout;
    private const int MaxOutputChars = 10 * 1024 * 1024; // 10M char limit per stream

    public ProcessSandboxService(ILogger<ProcessSandboxService> logger, TimeSpan? defaultTimeout = null)
    {
        _logger = logger;
        _defaultTimeout = defaultTimeout ?? TimeSpan.FromSeconds(60);
    }

    /// <summary>
    /// Execute a process with sandboxed settings.
    /// </summary>
    /// <param name="fileName">Executable path - must be validated before calling.</param>
    /// <param name="arguments">Arguments - will be passed via ArgumentList for safety.</param>
    /// <param name="workingDirectory">Optional working directory.</param>
    /// <param name="timeout">Timeout override. Defaults to 60 seconds.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Process result with exit code, stdout, and stderr.</returns>
    public async Task<ProcessResult> ExecuteAsync(
        string fileName,
        IEnumerable<string>? arguments = null,
        string? workingDirectory = null,
        TimeSpan? timeout = null,
        CancellationToken cancellationToken = default)
    {
        ValidateFileName(fileName);

        var effectiveTimeout = timeout ?? _defaultTimeout;
        using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeoutCts.CancelAfter(effectiveTimeout);
        var effectiveCt = timeoutCts.Token;

        using var activity = Telemetry.SdkChatTelemetry.StartActivity("ProcessSandbox.Execute");
        activity?.SetTag("process.executable", Path.GetFileName(fileName));
        activity?.SetTag("process.timeout_ms", effectiveTimeout.TotalMilliseconds);

        var psi = new ProcessStartInfo
        {
            FileName = fileName,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        if (!string.IsNullOrEmpty(workingDirectory))
        {
            psi.WorkingDirectory = workingDirectory;
        }

        // Use ArgumentList for proper escaping - prevents injection
        if (arguments != null)
        {
            foreach (var arg in arguments)
            {
                psi.ArgumentList.Add(arg);
            }
        }

        var startTime = Stopwatch.GetTimestamp();
        Process? process = null;

        try
        {
            process = Process.Start(psi);
            if (process == null)
            {
                _logger.LogError("Failed to start process: {FileName}", fileName);
                return ProcessResult.Failed(-1, "", $"Failed to start process: {fileName}");
            }

            _logger.LogDebug("Started process {FileName} with PID {Pid}",
                Path.GetFileName(fileName), process.Id);

            // Read streams in parallel to prevent deadlocks
            var outputTask = ReadStreamWithLimitAsync(process.StandardOutput, MaxOutputChars, effectiveCt);
            var errorTask = ReadStreamWithLimitAsync(process.StandardError, MaxOutputChars, effectiveCt);

            await Task.WhenAll(outputTask, errorTask, process.WaitForExitAsync(effectiveCt)).ConfigureAwait(false);

            var output = await outputTask;
            var error = await errorTask;
            var elapsed = Stopwatch.GetElapsedTime(startTime);

            activity?.SetTag("process.exit_code", process.ExitCode);
            activity?.SetTag("process.duration_ms", elapsed.TotalMilliseconds);

            _logger.LogDebug("Process {FileName} exited with code {ExitCode} in {Duration}ms",
                Path.GetFileName(fileName), process.ExitCode, elapsed.TotalMilliseconds);

            return new ProcessResult(process.ExitCode, output, error, elapsed);
        }
        catch (OperationCanceledException) when (timeoutCts.IsCancellationRequested && !cancellationToken.IsCancellationRequested)
        {
            var elapsed = Stopwatch.GetElapsedTime(startTime);
            _logger.LogWarning("Process {FileName} timed out after {Timeout}ms",
                Path.GetFileName(fileName), effectiveTimeout.TotalMilliseconds);

            activity?.SetTag("process.timed_out", true);

            // Kill the entire process tree to prevent orphaned child processes
            try { process?.Kill(entireProcessTree: true); } catch { /* best-effort */ }

            return ProcessResult.Failed(-1, "", $"Process timed out after {effectiveTimeout.TotalSeconds}s", elapsed, timedOut: true);
        }
        catch (Exception ex)
        {
            var elapsed = Stopwatch.GetElapsedTime(startTime);
            _logger.LogError(ex, "Process {FileName} failed with exception", Path.GetFileName(fileName));

            activity?.SetTag("error", true);
            activity?.SetTag("error.message", ex.Message);

            return ProcessResult.Failed(-1, "", ex.Message, elapsed);
        }
        finally
        {
            process?.Dispose();
        }
    }

    /// <summary>
    /// Validate file name to prevent obvious injection attacks.
    /// </summary>
    private static void ValidateFileName([NotNull] string? fileName)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(fileName);

        // Block obvious shell metacharacters in the executable name
        if (fileName.AsSpan().IndexOfAny(InvalidFileNameChars) >= 0)
        {
            throw new ArgumentException($"File name contains invalid characters: {fileName}", nameof(fileName));
        }
    }

    /// <summary>
    /// Read stream with character limit to prevent memory exhaustion.
    /// </summary>
    private static async Task<string> ReadStreamWithLimitAsync(
        StreamReader reader,
        int maxChars,
        CancellationToken cancellationToken)
    {
        var buffer = new char[8192];
        var result = new System.Text.StringBuilder();
        var totalCharsRead = 0;

        while (!cancellationToken.IsCancellationRequested)
        {
            var charsRead = await reader.ReadAsync(buffer, cancellationToken).ConfigureAwait(false);
            if (charsRead == 0) break;

            totalCharsRead += charsRead;
            if (totalCharsRead > maxChars)
            {
                var remaining = maxChars - (totalCharsRead - charsRead);
                if (remaining > 0)
                    result.Append(buffer, 0, remaining);
                result.Append("\n[OUTPUT TRUNCATED - exceeded ");
                result.Append(maxChars / 1024 / 1024);
                result.Append("M char limit]");
                break;
            }

            result.Append(buffer, 0, charsRead);
        }

        return result.ToString();
    }
}

/// <summary>
/// Result of a sandboxed process execution.
/// </summary>
public sealed record ProcessResult
{
    public int ExitCode { get; init; }
    public string StandardOutput { get; init; }
    public string StandardError { get; init; }
    public TimeSpan Duration { get; init; }
    public bool TimedOut { get; init; }
    public bool Success => ExitCode == 0 && !TimedOut;

    public ProcessResult(int exitCode, string standardOutput, string standardError, TimeSpan? duration = null)
    {
        ExitCode = exitCode;
        StandardOutput = standardOutput;
        StandardError = standardError;
        Duration = duration ?? TimeSpan.Zero;
        TimedOut = false;
    }

    private ProcessResult(int exitCode, string output, string error, TimeSpan duration, bool timedOut)
    {
        ExitCode = exitCode;
        StandardOutput = output;
        StandardError = error;
        Duration = duration;
        TimedOut = timedOut;
    }

    public static ProcessResult Failed(int exitCode, string output, string error, TimeSpan? duration = null, bool timedOut = false)
        => new(exitCode, output, error, duration ?? TimeSpan.Zero, timedOut);
}
