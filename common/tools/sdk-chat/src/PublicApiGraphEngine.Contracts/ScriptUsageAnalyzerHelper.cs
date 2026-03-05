// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Shared helper for script-based usage analyzers (Python, Go, Java, TypeScript).
/// Encapsulates the common pattern of:
///   1. Piping API JSON to the child process via stdin
///   2. Invoking the external script/binary via ProcessSandbox
///   3. Parsing the UsageResult JSON output
///   4. Mapping to UsageIndex with proper error handling
///
/// Eliminates ~80% code duplication across the 4 script-based analyzers.
/// </summary>
public static class ScriptUsageAnalyzerHelper
{
    /// <summary>
    /// Configuration for a script-based usage analysis invocation.
    /// </summary>
    public sealed record ScriptInvocationConfig
    {
        /// <summary>Language name for telemetry and error messages.</summary>
        public required string Language { get; init; }

        /// <summary>The availability result for the engine runtime.</summary>
        public required EngineAvailabilityResult Availability { get; init; }

        /// <summary>API JSON string to pipe to the script via stdin.</summary>
        public required string ApiJson { get; init; }

        /// <summary>Path to the directory containing code to analyze.</summary>
        public required string SamplesPath { get; init; }

        /// <summary>
        /// Builds the arguments for each execution mode.
        /// The API JSON path argument is always "-" (read from stdin).
        /// Receives the availability result and samples path.
        /// </summary>
        public required Func<EngineAvailabilityResult, string, ScriptArgs> BuildArgs { get; init; }

        /// <summary>
        /// Fallback signature lookup for uncovered operations whose signatures
        /// were not provided by the script output.
        /// </summary>
        public Dictionary<string, string>? SignatureLookup { get; init; }
    }

    /// <summary>
    /// Arguments for a specific execution mode invocation.
    /// </summary>
    public sealed record ScriptArgs(IEnumerable<string> Arguments, string? WorkingDirectory = null);

    /// <summary>
    /// Result from a script-based usage analysis, including any warnings/errors.
    /// </summary>
    public sealed record AnalysisResult
    {
        /// <summary>The usage index, or null if analysis failed.</summary>
        public UsageIndex? Index { get; init; }

        /// <summary>Structured error messages (replaces Console.Error.WriteLine).</summary>
        public IReadOnlyList<string> Errors { get; init; } = [];
    }

    /// <summary>
    /// Runs a script-based usage analysis, piping API JSON via stdin.
    /// </summary>
    public static async Task<AnalysisResult> AnalyzeAsync(
        ScriptInvocationConfig config,
        CancellationToken ct = default)
    {
        List<string> errors = [];

        var output = await InvokeScriptAsync(config, errors, ct).ConfigureAwait(false);
        if (string.IsNullOrWhiteSpace(output))
            return new AnalysisResult { Index = new UsageIndex { FileCount = 0 }, Errors = errors };

        var result = JsonSerializer.Deserialize(output, EngineJsonContext.Default.UsageResult);
        if (result is null)
            return new AnalysisResult { Index = new UsageIndex { FileCount = 0 }, Errors = errors };

        var usageIndex = new UsageIndex
        {
            FileCount = result.FileCount,
            CoveredOperations = result.Covered?.Select(c => new OperationUsage
            {
                ClientType = c.Client ?? "",
                Operation = c.Method ?? "",
                File = c.File ?? "",
                Line = c.Line
            }).ToList() ?? [],
            UncoveredOperations = result.Uncovered?.Select(u =>
            {
                var sig = u.Sig;
                if (sig is null && config.SignatureLookup is not null)
                    sig = config.SignatureLookup.GetValueOrDefault($"{u.Client}.{u.Method}");
                sig ??= $"{u.Method}(...)";
                return new UncoveredOperation
                {
                    ClientType = u.Client ?? "",
                    Operation = u.Method ?? "",
                    Signature = sig
                };
            }).ToList() ?? []
        };

        return new AnalysisResult { Index = usageIndex, Errors = errors };
    }

    private static async Task<string?> InvokeScriptAsync(
        ScriptInvocationConfig config,
        List<string> errors,
        CancellationToken ct)
    {
        var availability = config.Availability;
        var prefix = $"{config.Language} usage analyzer";
        var args = config.BuildArgs(availability, config.SamplesPath);

        if (availability.Mode == EngineMode.NativeBinary)
        {
            var result = await ProcessSandbox.ExecuteAsync(
                availability.ExecutablePath!,
                args.Arguments,
                workingDirectory: args.WorkingDirectory,
                stdinData: config.ApiJson,
                cancellationToken: ct
            ).ConfigureAwait(false);

            if (!result.Success)
            {
                errors.Add(result.TimedOut
                    ? $"{prefix}: timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"{prefix}: failed (exit {result.ExitCode}): {result.StandardError}");
                return null;
            }

            return result.StandardOutput;
        }

        if (availability.Mode == EngineMode.Docker)
        {
            var dockerResult = await DockerSandbox.ExecuteAsync(
                availability.DockerImageName!,
                [config.SamplesPath],
                args.Arguments.ToArray(),
                stdinData: config.ApiJson,
                cancellationToken: ct
            ).ConfigureAwait(false);

            if (!dockerResult.Success)
            {
                errors.Add(dockerResult.TimedOut
                    ? $"{prefix}: Docker timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"{prefix}: Docker failed: {dockerResult.StandardError}");
                return null;
            }

            return dockerResult.StandardOutput;
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
            return null;

        var runtimeResult = await ProcessSandbox.ExecuteAsync(
            availability.ExecutablePath!,
            args.Arguments,
            workingDirectory: args.WorkingDirectory,
            stdinData: config.ApiJson,
            cancellationToken: ct
        ).ConfigureAwait(false);

        if (!runtimeResult.Success)
        {
            errors.Add(runtimeResult.TimedOut
                ? $"{prefix}: timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"{prefix}: failed (exit {runtimeResult.ExitCode}): {runtimeResult.StandardError}");
            return null;
        }

        return runtimeResult.StandardOutput;
    }
}
