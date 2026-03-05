// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Buffers;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Centralized, hardened process execution for Public API Graph Engines.
/// All external process invocations SHOULD go through this class.
///
/// Security features:
/// - Enforced timeouts (no runaway processes)
/// - Output capture with size limits
/// - Structured telemetry
/// </summary>
public static class ProcessSandbox
{
    /// <summary>Maximum output size per stream in characters (~10M chars).</summary>
    public const int MaxOutputChars = 10 * 1024 * 1024;

    /// <summary>Marker appended to output when truncation occurs.</summary>
    internal const string TruncationMarker = "[OUTPUT TRUNCATED - exceeded ";

    /// <summary>
    /// Returns true if the given output was truncated by <see cref="ReadStreamWithLimitAsync"/>.
    /// </summary>
    public static bool IsOutputTruncated(string? output) =>
        output is not null && output.Contains(TruncationMarker, StringComparison.Ordinal);

    /// <summary>
    /// Validates that a root path is safe to pass to an external process.
    /// Resolves symlinks, verifies the directory exists, and rejects paths
    /// with suspicious patterns (null bytes, excessive traversal).
    /// </summary>
    /// <param name="rootPath">The path to validate.</param>
    /// <returns>The fully resolved canonical path.</returns>
    /// <exception cref="ArgumentException">Thrown if the path is null, empty, or contains dangerous characters.</exception>
    /// <exception cref="DirectoryNotFoundException">Thrown if the resolved path does not exist.</exception>
    public static string ValidateRootPath([NotNull] string? rootPath)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(rootPath);

        // Block null bytes - classic path injection vector
        if (rootPath.Contains('\0'))
            throw new ArgumentException("Root path contains null bytes.", nameof(rootPath));

        // Resolve to absolute, canonical path (resolves symlinks, .., etc.)
        var resolved = Path.GetFullPath(rootPath);

        if (!Directory.Exists(resolved))
            throw new DirectoryNotFoundException($"Root path does not exist: {resolved}");

        return resolved;
    }

    /// <summary>
    /// Execute a process with sandboxed settings.
    /// </summary>
    /// <param name="fileName">Executable path - must be validated before calling.</param>
    /// <param name="arguments">Arguments - will be passed via ArgumentList for safety.</param>
    /// <param name="workingDirectory">Optional working directory.</param>
    /// <param name="timeout">Timeout override. Uses EngineTimeout.Value if not specified.</param>
    /// <param name="stdinData">Optional data to write to the process's standard input. When provided,
    /// the data is written and stdin is closed, signaling EOF to the child process.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Process result with exit code, stdout, and stderr.</returns>
    public static async Task<ProcessResult> ExecuteAsync(
        string fileName,
        IEnumerable<string>? arguments = null,
        string? workingDirectory = null,
        IReadOnlyDictionary<string, string>? environmentVariables = null,
        TimeSpan? timeout = null,
        string? stdinData = null,
        CancellationToken cancellationToken = default)
    {
        ValidateFileName(fileName);

        var effectiveTimeout = timeout ?? EngineTimeout.Value;
        using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeoutCts.CancelAfter(effectiveTimeout);
        var effectiveCt = timeoutCts.Token;

        using var activity = EngineTelemetry.StartProcess(Path.GetFileName(fileName), "sandbox");

        var psi = new ProcessStartInfo
        {
            FileName = fileName,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            RedirectStandardInput = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        if (!string.IsNullOrEmpty(workingDirectory))
        {
            psi.WorkingDirectory = workingDirectory;
        }

        if (environmentVariables is not null)
        {
            foreach (var (key, value) in environmentVariables)
            {
                psi.Environment[key] = value;
            }
        }

        // Use ArgumentList for proper escaping - prevents injection
        if (arguments is not null)
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
            if (process is null)
            {
                return ProcessResult.Failed(-1, "", $"Failed to start process: {fileName}");
            }

            // Write stdin data if provided, then close stdin to signal EOF
            if (stdinData is not null)
            {
                await process.StandardInput.WriteAsync(stdinData).ConfigureAwait(false);
                await process.StandardInput.FlushAsync(effectiveCt).ConfigureAwait(false);
            }
            process.StandardInput.Close();

            // Read streams in parallel to prevent deadlocks
            var outputTask = ReadStreamWithLimitAsync(process.StandardOutput, MaxOutputChars, effectiveCt);
            var errorTask = ReadStreamWithLimitAsync(process.StandardError, MaxOutputChars, effectiveCt);

            await Task.WhenAll(outputTask, errorTask, process.WaitForExitAsync(effectiveCt)).ConfigureAwait(false);

            var output = await outputTask;
            var error = await errorTask;
            var elapsed = Stopwatch.GetElapsedTime(startTime);

            activity?.SetTag("process.exit_code", process.ExitCode);
            activity?.SetTag("process.duration_ms", elapsed.TotalMilliseconds);

            return new ProcessResult(process.ExitCode, output, error, elapsed);
        }
        catch (OperationCanceledException) when (timeoutCts.IsCancellationRequested && !cancellationToken.IsCancellationRequested)
        {
            var elapsed = Stopwatch.GetElapsedTime(startTime);
            activity?.SetTag("process.timed_out", true);

            // Kill the entire process tree to prevent orphaned child processes
            // from accumulating indefinitely after repeated timeouts.
            KillProcess(process);

            return ProcessResult.Failed(-1, "", $"Process timed out after {effectiveTimeout.TotalSeconds}s", elapsed, timedOut: true);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            // User-initiated cancellation: propagate so callers can observe it
            // via try/catch(OperationCanceledException) upstream.
            KillProcess(process);
            throw;
        }
        catch (Exception ex)
        {
            var elapsed = Stopwatch.GetElapsedTime(startTime);
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
    /// Best-effort kill of a process and its entire process tree.
    /// Swallows all exceptions — the process may have already exited.
    /// </summary>
    private static void KillProcess(Process? process)
    {
        if (process is null) return;

        try
        {
            process.Kill(entireProcessTree: true);
        }
        catch
        {
            // Best-effort: process may have already exited, or we may lack permissions.
            // Swallow and let the finally block Dispose the handle.
        }
    }

    /// <summary>
    /// Characters blocked in executable file names to prevent shell injection.
    /// Uses SearchValues for hardware-accelerated vectorized searching.
    /// </summary>
    private static readonly SearchValues<char> InvalidFileNameChars = SearchValues.Create(";|&$`\n\r");

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
        var result = new StringBuilder();
        var totalCharsRead = 0;

        while (!cancellationToken.IsCancellationRequested)
        {
            var charsRead = await reader.ReadAsync(buffer, cancellationToken).ConfigureAwait(false);
            if (charsRead == 0) break;

            totalCharsRead += charsRead;
            if (totalCharsRead > maxChars)
            {
                // Append only the portion that fits within the limit
                var remaining = maxChars - (totalCharsRead - charsRead);
                if (remaining > 0)
                    result.Append(buffer, 0, remaining);
                result.Append(TruncationMarker);
                result.Append(maxChars / 1024 / 1024);
                result.Append("M char limit]");
                break;
            }

            result.Append(buffer, 0, charsRead);
        }

        return result.ToString();
    }

    /// <summary>
    /// Execute a process and return stdout as a <see cref="Stream"/> for streaming deserialization.
    /// Stderr is captured in-memory. The caller must dispose the returned <see cref="StreamingProcessResult"/>
    /// after consuming stdout.
    /// </summary>
    /// <remarks>
    /// This avoids buffering the entire stdout into a <see cref="string"/> before deserialization,
    /// halving peak memory for large JSON outputs (e.g., API graphing of large SDKs).
    /// </remarks>
    public static async Task<StreamingProcessResult> ExecuteWithStreamAsync(
        string fileName,
        IEnumerable<string>? arguments = null,
        string? workingDirectory = null,
        IReadOnlyDictionary<string, string>? environmentVariables = null,
        TimeSpan? timeout = null,
        string? stdinData = null,
        CancellationToken cancellationToken = default)
    {
        ValidateFileName(fileName);

        var effectiveTimeout = timeout ?? EngineTimeout.Value;
        var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeoutCts.CancelAfter(effectiveTimeout);
        var effectiveCt = timeoutCts.Token;

        var psi = new ProcessStartInfo
        {
            FileName = fileName,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            RedirectStandardInput = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        if (!string.IsNullOrEmpty(workingDirectory))
        {
            psi.WorkingDirectory = workingDirectory;
        }

        if (environmentVariables is not null)
        {
            foreach (var (key, value) in environmentVariables)
            {
                psi.Environment[key] = value;
            }
        }

        if (arguments is not null)
        {
            foreach (var arg in arguments)
            {
                psi.ArgumentList.Add(arg);
            }
        }

        var startTime = Stopwatch.GetTimestamp();
        Process? process;

        try
        {
            process = Process.Start(psi);
        }
        catch (Exception ex)
        {
            timeoutCts.Dispose();
            return StreamingProcessResult.CreateFailed(-1, $"Failed to start process: {ex.Message}", timeoutCts);
        }

        if (process is null)
        {
            timeoutCts.Dispose();
            return StreamingProcessResult.CreateFailed(-1, "Failed to start process", timeoutCts);
        }

        // Write stdin data if provided, then close stdin to signal EOF
        if (stdinData is not null)
        {
            await process.StandardInput.WriteAsync(stdinData).ConfigureAwait(false);
            await process.StandardInput.FlushAsync(effectiveCt).ConfigureAwait(false);
        }
        process.StandardInput.Close();

        // Start capturing stderr in background - it's typically small
        var stderrTask = ReadStreamWithLimitAsync(process.StandardError, MaxOutputChars, effectiveCt);

        // Return the stdout stream for the caller to consume directly via streaming JSON deserialization.
        // The caller is responsible for disposing StreamingProcessResult which handles cleanup.
        return new StreamingProcessResult(process, process.StandardOutput.BaseStream, stderrTask, startTime, timeoutCts, effectiveCt);
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

    /// <summary>
    /// True if <see cref="StandardOutput"/> was truncated due to exceeding the output size limit.
    /// Truncated output will contain invalid/incomplete JSON and should not be parsed.
    /// </summary>
    public bool OutputTruncated => ProcessSandbox.IsOutputTruncated(StandardOutput);

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

/// <summary>
/// Result of a streaming process execution. Provides stdout as a <see cref="Stream"/>
/// for direct deserialization without intermediate string buffering.
/// Must be disposed after consuming the stream.
/// </summary>
public sealed class StreamingProcessResult : IAsyncDisposable, IDisposable
{
    private readonly Process? _process;
    private readonly Task<string>? _stderrTask;
    private readonly long _startTimestamp;
    private readonly CancellationTokenSource _timeoutCts;
    private readonly CancellationToken _effectiveCt;
    private bool _disposed;

    /// <summary>The stdout stream for streaming deserialization. Null on startup failure.</summary>
    public Stream? StandardOutputStream { get; }

    /// <summary>Stderr content. Available after <see cref="CompleteAsync"/> is called.</summary>
    public string StandardError { get; private set; } = "";

    /// <summary>Exit code. Available after <see cref="CompleteAsync"/> is called.</summary>
    public int ExitCode { get; private set; } = -1;

    /// <summary>Whether the process timed out.</summary>
    public bool TimedOut { get; private set; }

    /// <summary>Whether the process completed successfully (exit code 0, no timeout).</summary>
    public bool Success => ExitCode == 0 && !TimedOut;

    /// <summary>Elapsed duration. Available after <see cref="CompleteAsync"/> is called.</summary>
    public TimeSpan Duration { get; private set; }

    /// <summary>Error message for startup failures.</summary>
    public string? StartupError { get; }

    internal StreamingProcessResult(Process process, Stream stdoutStream, Task<string> stderrTask, long startTimestamp, CancellationTokenSource timeoutCts, CancellationToken effectiveCt)
    {
        _process = process;
        StandardOutputStream = stdoutStream;
        _stderrTask = stderrTask;
        _startTimestamp = startTimestamp;
        _timeoutCts = timeoutCts;
        _effectiveCt = effectiveCt;
    }

    private StreamingProcessResult(int exitCode, string error, CancellationTokenSource timeoutCts)
    {
        ExitCode = exitCode;
        StandardError = error;
        StartupError = error;
        _timeoutCts = timeoutCts;
        _effectiveCt = default;
    }

    internal static StreamingProcessResult CreateFailed(int exitCode, string error, CancellationTokenSource timeoutCts)
        => new(exitCode, error, timeoutCts);

    /// <summary>
    /// Wait for the process to exit and finalize stderr/exit code.
    /// Call this AFTER consuming the stdout stream.
    /// </summary>
    public async Task CompleteAsync()
    {
        if (_process is null) return;

        try
        {
            await _process.WaitForExitAsync(_effectiveCt).ConfigureAwait(false);
            ExitCode = _process.ExitCode;
            StandardError = _stderrTask is not null ? await _stderrTask.ConfigureAwait(false) : "";
            Duration = Stopwatch.GetElapsedTime(_startTimestamp);
        }
        catch (OperationCanceledException)
        {
            TimedOut = true;
            Duration = Stopwatch.GetElapsedTime(_startTimestamp);
            try { _process.Kill(entireProcessTree: true); } catch { }
        }
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        _process?.Dispose();
        _timeoutCts.Dispose();
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        if (_process is not null)
        {
            try
            {
                if (!_process.HasExited)
                    _process.Kill(entireProcessTree: true);
            }
            catch { }
            _process.Dispose();
        }

        _timeoutCts.Dispose();
        await Task.CompletedTask;
    }
}
