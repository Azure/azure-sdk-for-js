// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Security.Cryptography;
using System.Text.Json;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Go;

/// <summary>
/// Graphs public API surface from Go packages using go/parser.
/// Uses lazy compilation - compiles the engine binary once and caches it.
/// </summary>
public class GoPublicApiGraphEngine : IPublicApiGraphEngine<ApiIndex>
{
    private static readonly SemaphoreSlim CompileLock = new(1, 1);
    private static volatile string? _cachedBinaryPath;

    /// <summary>Shared availability configuration for all Go engine components.</summary>
    internal static readonly EngineConfig SharedConfig = new()
    {
        Language = "go",
        NativeBinaryName = "go_engine",
        RuntimeToolName = "go",
        RuntimeCandidates = ["go", "/usr/local/go/bin/go", "/opt/go/bin/go"],
        RuntimeValidationArgs = "version"
    };

    private readonly EngineAvailabilityProvider _availability = new(SharedConfig);

    /// <inheritdoc />
    public string Language => "go";

    /// <summary>
    /// Warning message from tool resolution (if any).
    /// </summary>
    public string? Warning => _availability.Warning;

    /// <summary>
    /// Gets the current execution mode (NativeBinary or RuntimeInterpreter).
    /// </summary>
    public EngineMode Mode => _availability.Mode;

    /// <inheritdoc />
    public bool IsAvailable() => _availability.IsAvailable;

    /// <inheritdoc />
    public string? UnavailableReason => _availability.UnavailableReason;

    /// <inheritdoc />
    public string ToJson(ApiIndex index, bool pretty = false)
        => pretty
            ? JsonSerializer.Serialize(index, SourceGenerationContext.Indented.ApiIndex)
            : JsonSerializer.Serialize(index, SourceGenerationContext.Default.ApiIndex);

    /// <inheritdoc />
    public string ToStubs(ApiIndex index) => GoFormatter.Format(index);

    /// <inheritdoc />
    async Task<EngineResult<ApiIndex>> IPublicApiGraphEngine<ApiIndex>.GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        var rootPath = input.RootDirectory;
        if (!IsAvailable())
            return EngineResult<ApiIndex>.CreateFailure(UnavailableReason ?? "Go not available");

        using var activity = EngineTelemetry.StartGraphing(Language, rootPath);
        try
        {
            var (result, diagnostics) = await ExtractCoreAsync(rootPath, crossLanguageMap, ct).ConfigureAwait(false);
            if (result is not null)
            {
                EngineTelemetry.RecordResult(activity, true, result.Packages.Count);
                return EngineResult<ApiIndex>.CreateSuccess(result, diagnostics);
            }
            EngineTelemetry.RecordResult(activity, false, error: "No API surface graphed");
            return EngineResult<ApiIndex>.CreateFailure("No API surface graphed");
        }
        catch (Exception ex)
        {
            EngineTelemetry.RecordResult(activity, false, error: ex.Message);
            return EngineResult<ApiIndex>.CreateFailure($"{ex.Message}\n{ex.StackTrace}");
        }
    }

    /// <summary>
    /// Graph API from a Go module directory.
    /// Prefers pre-compiled binary from build, falls back to runtime compilation.
    /// </summary>
    public Task<ApiIndex> GraphAsync(string rootPath, CancellationToken ct = default)
        => GraphAsync(new EngineInput.SourceDirectory(rootPath), null, ct);

    public async Task<ApiIndex> GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct = default)
    {
        var (index, _) = await ExtractCoreAsync(input.RootDirectory, crossLanguageMap, ct).ConfigureAwait(false);
        return index ?? throw new InvalidOperationException("Go engine returned no API surface.");
    }

    /// <summary>
    /// Shared engine logic that returns both the API index and any stderr warnings.
    /// </summary>
    private async Task<(ApiIndex? Index, IReadOnlyList<ApiDiagnostic> Diagnostics)> ExtractCoreAsync(string rootPath, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        rootPath = ProcessSandbox.ValidateRootPath(rootPath);
        var availability = _availability.GetAvailability();

        // Docker mode: fall back to buffered engine call
        if (availability.Mode == EngineMode.Docker)
        {
            var result = await RunEngineAsync("--json", rootPath, ct).ConfigureAwait(false);
            var diag = ParseStderrDiagnostics(result.StandardError);

            if (string.IsNullOrWhiteSpace(result.StandardOutput))
                return (null, diag);

            if (result.OutputTruncated)
                throw new InvalidOperationException(
                    "Go engine output was truncated (exceeded output size limit). " +
                    "The target package may be too large for engine processing.");

            var idx = JsonSerializer.Deserialize(result.StandardOutput, SourceGenerationContext.Default.ApiIndex);
            if (idx is null) return (null, diag);

            var fin = FinalizeIndex(idx, crossLanguageMap, diag);
            return (fin, fin.Diagnostics);
        }

        // Native/Runtime mode: stream stdout directly to JSON deserializer
        await using var streamResult = await RunEngineStreamAsync(rootPath, ct).ConfigureAwait(false);

        if (streamResult.StandardOutputStream is null)
        {
            var diagnostics = ParseStderrDiagnostics(streamResult.StandardError);
            return (null, diagnostics);
        }

        var index = await JsonSerializer.DeserializeAsync(
            streamResult.StandardOutputStream,
            SourceGenerationContext.Default.ApiIndex,
            ct).ConfigureAwait(false);

        await streamResult.CompleteAsync().ConfigureAwait(false);
        var stderrDiagnostics = ParseStderrDiagnostics(streamResult.StandardError);

        if (!streamResult.Success)
        {
            var errorMsg = streamResult.TimedOut
                ? $"Go engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"Go engine failed: {streamResult.StandardError}";
            throw new InvalidOperationException(errorMsg);
        }

        if (index is null) return (null, stderrDiagnostics);

        var finalized = FinalizeIndex(index, crossLanguageMap, stderrDiagnostics);
        return (finalized, finalized.Diagnostics);
    }

    /// <summary>
    /// Runs the engine with streaming stdout for JSON deserialization.
    /// </summary>
    private async Task<StreamingProcessResult> RunEngineStreamAsync(string rootPath, CancellationToken ct)
    {
        var availability = _availability.GetAvailability();

        if (availability.Mode == EngineMode.NativeBinary)
        {
            return await ProcessSandbox.ExecuteWithStreamAsync(
                availability.ExecutablePath!,
                [rootPath, "--json"],
                cancellationToken: ct).ConfigureAwait(false);
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
            throw new InvalidOperationException(availability.UnavailableReason ?? "Go engine not available");

        var binaryPath = await EnsureCompiledAsync(availability.ExecutablePath!, ct).ConfigureAwait(false);

        return await ProcessSandbox.ExecuteWithStreamAsync(
            binaryPath,
            [rootPath, "--json"],
            cancellationToken: ct).ConfigureAwait(false);
    }

    private static ApiIndex FinalizeIndex(ApiIndex index, CrossLanguageMap? crossLanguageMap, IReadOnlyList<ApiDiagnostic> upstreamDiagnostics)
    {
        var finalized = FinalizeTree(index, crossLanguageMap);
        var diagnostics = ApiDiagnosticsPostProcessor.Build(finalized, upstreamDiagnostics);
        return finalized with { Diagnostics = diagnostics };
    }

    /// <summary>
    /// Single-pass tree finalization: assigns deterministic IDs and applies cross-language mapping
    /// in one traversal instead of two separate cloning passes.
    /// </summary>
    private static ApiIndex FinalizeTree(ApiIndex index, CrossLanguageMap? map)
        => index with
        {
            CrossLanguagePackageId = map?.PackageId,
            Packages = index.Packages.Select(package => package with
            {
                Structs = package.Structs?.Select(structInfo =>
                {
                    var typeId = structInfo.Id ?? BuildTypeId(index.Package, package.Name, structInfo.Name);
                    return structInfo with
                    {
                        Id = typeId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var sXId) ? sXId : null,
                        Fields = structInfo.Fields?.Select(field =>
                        {
                            var fieldId = field.Id ?? BuildMemberId(typeId, field.Name);
                            return field with { Id = fieldId, CrossLanguageId = map is not null && map.Ids.TryGetValue(fieldId, out var fXId) ? fXId : null };
                        }).ToList(),
                        Methods = structInfo.Methods?.Select(method =>
                        {
                            var methodId = method.Id ?? BuildMemberId(typeId, method.Name);
                            return method with { Id = methodId, CrossLanguageId = map is not null && map.Ids.TryGetValue(methodId, out var mXId) ? mXId : null };
                        }).ToList(),
                    };
                }).ToList(),
                Interfaces = package.Interfaces?.Select(iface =>
                {
                    var typeId = iface.Id ?? BuildTypeId(index.Package, package.Name, iface.Name);
                    return iface with
                    {
                        Id = typeId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var iXId) ? iXId : null,
                        Methods = iface.Methods?.Select(method =>
                        {
                            var methodId = method.Id ?? BuildMemberId(typeId, method.Name);
                            return method with { Id = methodId, CrossLanguageId = map is not null && map.Ids.TryGetValue(methodId, out var mXId) ? mXId : null };
                        }).ToList(),
                    };
                }).ToList(),
                Functions = package.Functions?.Select(function =>
                {
                    var funcId = function.Id ?? BuildTypeId(index.Package, package.Name, function.Name);
                    return function with { Id = funcId, CrossLanguageId = map is not null && map.Ids.TryGetValue(funcId, out var fXId) ? fXId : null };
                }).ToList(),
                Types = package.Types?.Select(type =>
                {
                    var typeId = type.Id ?? BuildTypeId(index.Package, package.Name, type.Name);
                    return type with { Id = typeId, CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var tXId) ? tXId : null };
                }).ToList(),
                Constants = package.Constants?.Select(constant =>
                {
                    var constId = constant.Id ?? BuildTypeId(index.Package, package.Name, constant.Name);
                    return constant with { Id = constId, CrossLanguageId = map is not null && map.Ids.TryGetValue(constId, out var cXId) ? cXId : null };
                }).ToList(),
                Variables = package.Variables?.Select(variable =>
                {
                    var varId = variable.Id ?? BuildTypeId(index.Package, package.Name, variable.Name);
                    return variable with { Id = varId, CrossLanguageId = map is not null && map.Ids.TryGetValue(varId, out var vXId) ? vXId : null };
                }).ToList(),
            }).ToList(),
        };

    private static string BuildTypeId(string packageName, string moduleName, string typeName)
    {
        var prefix = string.IsNullOrWhiteSpace(moduleName) ? packageName : $"{packageName}.{moduleName}";
        return string.IsNullOrWhiteSpace(prefix) ? typeName : $"{prefix}.{typeName}";
    }

    private static string BuildMemberId(string typeId, string memberName)
        => $"{typeId}.{memberName}";

    private static IReadOnlyList<ApiDiagnostic> ParseStderrDiagnostics(string? stderr)
        => string.IsNullOrWhiteSpace(stderr)
            ? []
            : stderr
                .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(text => new ApiDiagnostic
                {
                    Id = "SDKWARN",
                    Text = text,
                    Level = DiagnosticLevel.Warning,
                })
                .ToList();

    /// <summary>
    /// Extract and format as Go stub syntax.
    /// </summary>
    public async Task<string> ExtractAsGoAsync(string rootPath, CancellationToken ct = default)
    {
        var result = await RunEngineAsync("--stub", rootPath, ct).ConfigureAwait(false);
        return result.StandardOutput;
    }

    /// <summary>
    /// Runs the Go engine with the given output flag, dispatching to the correct
    /// execution mode (NativeBinary, RuntimeInterpreter, or Docker).
    /// </summary>
    private async Task<ProcessResult> RunEngineAsync(string outputFlag, string rootPath, CancellationToken ct)
    {
        rootPath = ProcessSandbox.ValidateRootPath(rootPath);
        var availability = _availability.GetAvailability();
        ProcessResult result;

        if (availability.Mode == EngineMode.NativeBinary)
        {
            result = await ProcessSandbox.ExecuteAsync(
                availability.ExecutablePath!,
                [rootPath, outputFlag],
                cancellationToken: ct
            ).ConfigureAwait(false);
        }
        else if (availability.Mode == EngineMode.RuntimeInterpreter)
        {
            var binaryPath = await EnsureCompiledAsync(availability.ExecutablePath!, ct).ConfigureAwait(false);
            result = await ProcessSandbox.ExecuteAsync(
                binaryPath,
                [rootPath, outputFlag],
                cancellationToken: ct
            ).ConfigureAwait(false);
        }
        else if (availability.Mode == EngineMode.Docker)
        {
            result = await DockerSandbox.ExecuteAsync(
                availability.DockerImageName!,
                rootPath,
                [rootPath, outputFlag],
                cancellationToken: ct
            ).ConfigureAwait(false);
        }
        else
        {
            throw new InvalidOperationException(availability.UnavailableReason ?? "Go engine not available");
        }

        if (!result.Success)
        {
            var errorMsg = result.TimedOut
                ? $"Go engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"Go engine failed: {result.StandardError}";
            throw new InvalidOperationException(errorMsg);
        }

        return result;
    }

    /// <summary>
    /// Ensures the Go engine is compiled and cached. Uses content-based hashing
    /// so recompilation only occurs when the source changes.
    /// This is the fallback when pre-compiled binary is not available.
    /// </summary>
    internal static async Task<string> EnsureCompiledAsync(string goPath, CancellationToken ct)
    {
        var scriptPath = GetScriptPath();
        if (!File.Exists(scriptPath))
        {
            throw new FileNotFoundException($"graph_api.go not found at {scriptPath}");
        }

        // Fast path: binary already cached in memory
        if (_cachedBinaryPath is not null && File.Exists(_cachedBinaryPath))
        {
            return _cachedBinaryPath;
        }

        await CompileLock.WaitAsync(ct).ConfigureAwait(false);
        try
        {
            // Double-check after acquiring lock
            if (_cachedBinaryPath is not null && File.Exists(_cachedBinaryPath))
            {
                return _cachedBinaryPath;
            }

            var sourceContent = await File.ReadAllBytesAsync(scriptPath, ct).ConfigureAwait(false);
            var hash = Convert.ToHexString(SHA256.HashData(sourceContent))[..16].ToLowerInvariant();

            var cacheDir = Path.Combine(Path.GetTempPath(), "sdk-chat", "go-cache");
            Directory.CreateDirectory(cacheDir);

            // Evict stale cached binaries to prevent unbounded disk growth in CI.
            // Only the binary matching the current source hash is kept.
            EvictStaleCacheEntries(cacheDir, hash);

            var binaryName = OperatingSystem.IsWindows() ? $"engine_{hash}.exe" : $"engine_{hash}";

            // SECURITY: Validate binary name to prevent path traversal attacks
            // Even though hash is hex-safe, be defensive against future code changes
            ToolPathResolver.ValidateSafeInput(binaryName, nameof(binaryName), allowPath: false);

            var binaryPath = Path.Combine(cacheDir, binaryName);

            if (File.Exists(binaryPath))
            {
                _cachedBinaryPath = binaryPath;
                return binaryPath;
            }

            var compileResult = await ProcessSandbox.ExecuteAsync(
                goPath,
                ["build", "-o", binaryPath, scriptPath],
                timeout: TimeSpan.FromMinutes(3),
                cancellationToken: ct
            ).ConfigureAwait(false);

            if (!compileResult.Success)
            {
                var errorMsg = compileResult.TimedOut
                    ? "go build timed out after 3 minutes"
                    : $"go build failed: {compileResult.StandardError}";
                throw new InvalidOperationException(errorMsg);
            }

            _cachedBinaryPath = binaryPath;
            return binaryPath;
        }
        finally
        {
            CompileLock.Release();
        }
    }

    /// <summary>
    /// Removes cached Go engine binaries that don't match the current source hash.
    /// Prevents unbounded disk growth in CI environments where the source changes frequently.
    /// </summary>
    private static void EvictStaleCacheEntries(string cacheDir, string currentHash)
    {
        try
        {
            var prefix = "engine_";
            foreach (var file in Directory.EnumerateFiles(cacheDir, $"{prefix}*"))
            {
                var fileName = Path.GetFileNameWithoutExtension(file);
                // Keep the binary matching the current hash
                if (fileName.EndsWith(currentHash, StringComparison.Ordinal))
                    continue;

                try { File.Delete(file); }
                catch { /* Best-effort: file may be in use by another process */ }
            }
        }
        catch
        {
            // Best-effort: cache eviction failure is non-critical
        }
    }

    private static string GetScriptPath()
    {
        // SECURITY: Only load scripts from assembly directory - no path traversal allowed
        var assemblyDir = AppContext.BaseDirectory;
        var scriptPath = Path.Combine(assemblyDir, "graph_api.go");

        if (File.Exists(scriptPath))
            return scriptPath;

        throw new FileNotFoundException(
            $"Corrupt installation: graph_api.go not found at {scriptPath}. " +
            "Reinstall the application to resolve this issue.");
    }
}
