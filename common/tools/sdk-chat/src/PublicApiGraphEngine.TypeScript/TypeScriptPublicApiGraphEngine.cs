// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.TypeScript;

/// <summary>
/// Graphs public API surface from TypeScript packages using ts-morph.
/// </summary>
public class TypeScriptPublicApiGraphEngine : IPublicApiGraphEngine<ApiIndex>
{
    private static readonly SemaphoreSlim NpmInstallLock = new(1, 1);

    /// <summary>Shared availability configuration for all TypeScript engine components.</summary>
    internal static readonly EngineConfig SharedConfig = new()
    {
        Language = "typescript",
        NativeBinaryName = "ts_engine",
        RuntimeToolName = "node",
        RuntimeCandidates = ["node"]
    };

    private readonly EngineAvailabilityProvider _availability = new(SharedConfig);

    /// <inheritdoc />
    public string Language => "typescript";

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
    public string ToStubs(ApiIndex index) => TypeScriptFormatter.Format(index);

    /// <inheritdoc />
    async Task<EngineResult<ApiIndex>> IPublicApiGraphEngine<ApiIndex>.GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        if (!IsAvailable())
            return EngineResult<ApiIndex>.CreateFailure(UnavailableReason ?? "Node.js not available");

        using var activity = EngineTelemetry.StartGraphing(Language, input.RootDirectory);
        try
        {
            var (result, diagnostics) = await ExtractCoreAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
            if (result is not null)
            {
                EngineTelemetry.RecordResult(activity, true, result.Modules.Count);
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
    /// Graph API from a TypeScript package directory.
    /// Prefers pre-compiled binary from build, falls back to Node.js runtime.
    /// </summary>
    public Task<ApiIndex> GraphAsync(string rootPath, CancellationToken ct = default)
        => GraphAsync(new EngineInput.SourceDirectory(rootPath), null, ct);

    public Task<ApiIndex> GraphAsync(EngineInput input, CancellationToken ct = default)
        => GraphAsync(input, null, ct);

    public async Task<ApiIndex> GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct = default)
    {
        var (index, _) = await ExtractCoreAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
        return index ?? throw new InvalidOperationException("TypeScript engine returned no API surface.");
    }

    /// <summary>
    /// Shared engine logic that returns both the API index and any stderr warnings.
    /// </summary>
    private async Task<(ApiIndex? Index, IReadOnlyList<ApiDiagnostic> Diagnostics)> ExtractCoreAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        string? packageJsonPath = input is EngineInput.TypeScriptProject tsPkg ? tsPkg.PackageJsonPath : null;
        var rootPath = ProcessSandbox.ValidateRootPath(input.RootDirectory);
        List<ApiDiagnostic> engineInputDiagnostics = [];

        // Discover package.json if not explicitly provided.
        // Check rootPath first, then the parent directory — TypeScript packages
        // commonly have src/ as the source folder but package.json at the project root.
        if (string.IsNullOrWhiteSpace(packageJsonPath))
        {
            var candidate = Path.Combine(rootPath, "package.json");
            if (File.Exists(candidate))
            {
                packageJsonPath = candidate;
            }
            else
            {
                var parentDir = Path.GetDirectoryName(rootPath);
                if (!string.IsNullOrWhiteSpace(parentDir))
                {
                    var parentCandidate = Path.Combine(parentDir, "package.json");
                    if (File.Exists(parentCandidate))
                        packageJsonPath = parentCandidate;
                }
            }
        }

        // Resolve .d.ts output directory from package.json exports/types
        string? dtsRoot = null;
        if (!string.IsNullOrWhiteSpace(packageJsonPath))
        {
            dtsRoot = ResolveDtsOutputFromPackageJson(packageJsonPath!);
        }

        if (dtsRoot is not null)
        {
            engineInputDiagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Info,
                Text = $"Using compiled artifacts: declaration files in {dtsRoot}"
            });
        }

        var availability = _availability.GetAvailability();

        // Docker mode: fall back to buffered engine call (Docker API returns string)
        if (availability.Mode == EngineMode.Docker)
        {
            var result = await RunEngineAsync("--json", rootPath, dtsRoot, packageJsonPath, ct).ConfigureAwait(false);
            var diag = ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, ParseStderrDiagnostics(result.StandardError));

            if (string.IsNullOrWhiteSpace(result.StandardOutput))
                return (null, diag);

            if (result.OutputTruncated)
                throw new InvalidOperationException(
                    "TypeScript engine output was truncated (exceeded output size limit). " +
                    "The target package may be too large for engine processing.");

            var idx = JsonSerializer.Deserialize(result.StandardOutput, SourceGenerationContext.Default.ApiIndex);
            if (idx is null) return (null, diag);

            var fin = FinalizeIndex(idx, crossLanguageMap, diag);
            return (fin, fin.Diagnostics);
        }

        // Native/Runtime mode: stream stdout directly to JSON deserializer (halves peak memory)
        await using var streamResult = await RunEngineStreamAsync(rootPath, dtsRoot, packageJsonPath, ct).ConfigureAwait(false);

        if (streamResult.StandardOutputStream is null)
        {
            return (null, ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, ParseStderrDiagnostics(streamResult.StandardError)));
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
                ? $"TypeScript engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"TypeScript engine failed: {streamResult.StandardError}";
            throw new InvalidOperationException(errorMsg);
        }

        if (index is null) return (null, stderrDiagnostics);

        var finalized = FinalizeIndex(index, crossLanguageMap, ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, stderrDiagnostics));
        return (finalized, finalized.Diagnostics);
    }

    /// <summary>
    /// Runs the engine with streaming stdout for JSON deserialization.
    /// Used in NativeBinary and RuntimeInterpreter modes.
    /// </summary>
    private async Task<StreamingProcessResult> RunEngineStreamAsync(string rootPath, string? dtsRoot, string? packageJsonPath, CancellationToken ct)
    {
        var availability = _availability.GetAvailability();

        var args = BuildEngineArgs(rootPath, "--json", dtsRoot, packageJsonPath);

        if (availability.Mode == EngineMode.NativeBinary)
        {
            return await ProcessSandbox.ExecuteWithStreamAsync(
                availability.ExecutablePath!,
                args,
                cancellationToken: ct).ConfigureAwait(false);
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
        {
            throw new InvalidOperationException(availability.UnavailableReason ?? "TypeScript engine not available");
        }

        var scriptDir = GetScriptDir();
        await EnsureDependenciesAsync(scriptDir, ct).ConfigureAwait(false);
        var scriptPath = Path.Combine(scriptDir, "dist", "graph_api.js");

        return await ProcessSandbox.ExecuteWithStreamAsync(
            availability.ExecutablePath!,
            [scriptPath, ..args],
            workingDirectory: scriptDir,
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
            Modules = index.Modules.Select(module => module with
            {
                Classes = module.Classes?.Select(cls =>
                {
                    var typeId = cls.Id ?? BuildTypeId(index.Package, cls.Name);
                    return cls with
                    {
                        Id = typeId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var clsXId) ? clsXId : null,
                        Constructors = cls.Constructors?.Select(ctor =>
                        {
                            var ctorId = ctor.Id ?? BuildMemberId(typeId, "constructor");
                            return ctor with
                            {
                                Id = ctorId,
                                CrossLanguageId = map is not null && map.Ids.TryGetValue(ctorId, out var ctorXId) ? ctorXId : null,
                            };
                        }).ToList(),
                        Methods = cls.Methods?.Select(method =>
                        {
                            var methodId = method.Id ?? BuildMemberId(typeId, method.Name);
                            return method with
                            {
                                Id = methodId,
                                CrossLanguageId = map is not null && map.Ids.TryGetValue(methodId, out var methodXId) ? methodXId : null,
                            };
                        }).ToList(),
                        Properties = cls.Properties?.Select(property =>
                        {
                            var propId = property.Id ?? BuildMemberId(typeId, property.Name);
                            return property with
                            {
                                Id = propId,
                                CrossLanguageId = map is not null && map.Ids.TryGetValue(propId, out var propXId) ? propXId : null,
                            };
                        }).ToList(),
                    };
                }).ToList(),
                Interfaces = module.Interfaces?.Select(iface =>
                {
                    var typeId = iface.Id ?? BuildTypeId(index.Package, iface.Name);
                    return iface with
                    {
                        Id = typeId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var ifaceXId) ? ifaceXId : null,
                        Methods = iface.Methods?.Select(method =>
                        {
                            var methodId = method.Id ?? BuildMemberId(typeId, method.Name);
                            return method with
                            {
                                Id = methodId,
                                CrossLanguageId = map is not null && map.Ids.TryGetValue(methodId, out var methodXId) ? methodXId : null,
                            };
                        }).ToList(),
                        Properties = iface.Properties?.Select(property =>
                        {
                            var propId = property.Id ?? BuildMemberId(typeId, property.Name);
                            return property with
                            {
                                Id = propId,
                                CrossLanguageId = map is not null && map.Ids.TryGetValue(propId, out var propXId) ? propXId : null,
                            };
                        }).ToList(),
                    };
                }).ToList(),
                Enums = module.Enums?.Select(en =>
                {
                    var enumId = en.Id ?? BuildTypeId(index.Package, en.Name);
                    return en with
                    {
                        Id = enumId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(enumId, out var enumXId) ? enumXId : null,
                    };
                }).ToList(),
                Types = module.Types?.Select(type =>
                {
                    var typeId = type.Id ?? BuildTypeId(index.Package, type.Name);
                    return type with
                    {
                        Id = typeId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var typeXId) ? typeXId : null,
                    };
                }).ToList(),
                Functions = module.Functions?.Select(function =>
                {
                    var funcId = function.Id ?? BuildTypeId(index.Package, function.Name);
                    return function with
                    {
                        Id = funcId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(funcId, out var funcXId) ? funcXId : null,
                    };
                }).ToList(),
            }).ToList(),
        };

    private static string BuildTypeId(string packageName, string typeName)
        => string.IsNullOrWhiteSpace(packageName) ? typeName : $"{packageName}.{typeName}";

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
    /// Extract and format as TypeScript stub syntax.
    /// </summary>
    public async Task<string> ExtractAsTypeScriptAsync(string rootPath, CancellationToken ct = default)
    {
        var result = await RunEngineAsync("--stub", rootPath, null, null, ct).ConfigureAwait(false);
        return result.StandardOutput;
    }

    /// <summary>
    /// Runs the TypeScript engine with the given output flag, dispatching to the correct
    /// execution mode (NativeBinary, RuntimeInterpreter, or Docker).
    /// </summary>
    private async Task<ProcessResult> RunEngineAsync(string outputFlag, string rootPath, string? dtsRoot, string? packageJsonPath, CancellationToken ct)
    {
        rootPath = ProcessSandbox.ValidateRootPath(rootPath);
        var availability = _availability.GetAvailability();
        var args = BuildEngineArgs(rootPath, outputFlag, dtsRoot, packageJsonPath);

        if (availability.Mode == EngineMode.NativeBinary)
        {
            var result = await ProcessSandbox.ExecuteAsync(
                availability.ExecutablePath!,
                args,
                cancellationToken: ct
            ).ConfigureAwait(false);

            if (!result.Success)
            {
                var errorMsg = result.TimedOut
                    ? $"TypeScript engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"TypeScript engine failed: {result.StandardError}";
                throw new InvalidOperationException(errorMsg);
            }

            return result;
        }

        if (availability.Mode == EngineMode.Docker)
        {
            var dockerResult = await DockerSandbox.ExecuteAsync(
                availability.DockerImageName!,
                rootPath,
                [..args],
                cancellationToken: ct
            ).ConfigureAwait(false);

            if (!dockerResult.Success)
            {
                var errorMsg = dockerResult.TimedOut
                    ? $"TypeScript engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"TypeScript engine failed: {dockerResult.StandardError}";
                throw new InvalidOperationException(errorMsg);
            }

            return dockerResult;
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
        {
            throw new InvalidOperationException(availability.UnavailableReason ?? "TypeScript engine not available");
        }

        // Fall back to Node.js runtime
        var scriptDir = GetScriptDir();
        await EnsureDependenciesAsync(scriptDir, ct).ConfigureAwait(false);

        var scriptPath = Path.Combine(scriptDir, "dist", "graph_api.js");

        var nodeResult = await ProcessSandbox.ExecuteAsync(
            availability.ExecutablePath!,
            [scriptPath, ..args],
            workingDirectory: scriptDir,
            cancellationToken: ct
        ).ConfigureAwait(false);

        if (!nodeResult.Success)
        {
            var errorMsg = nodeResult.TimedOut
                ? $"TypeScript engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"Node failed: {nodeResult.StandardError}";
            throw new InvalidOperationException(errorMsg);
        }

        return nodeResult;
    }

    private IReadOnlyList<string> BuildEngineArgs(string rootPath, string outputFlag, string? dtsRoot, string? packageJsonPath = null)
    {
        List<string> args = [rootPath, outputFlag];

        if (!string.IsNullOrWhiteSpace(dtsRoot))
        {
            args.Add("--mode");
            args.Add("compiled");
            args.Add("--dts-root");
            args.Add(dtsRoot);

            if (!string.IsNullOrWhiteSpace(packageJsonPath))
            {
                args.Add("--package-json");
                args.Add(packageJsonPath!);
            }
        }

        return args;
    }

    /// <summary>
    /// Resolves the .d.ts output directory from package.json's "types", "typings",
    /// or "exports" field. Collects all conditional type entry points and returns
    /// their common ancestor directory so the engine can process all conditions.
    /// Returns null if no compiled declarations are found.
    /// </summary>
    internal static string? ResolveDtsOutputFromPackageJson(string packageJsonPath)
    {
        if (!File.Exists(packageJsonPath))
            return null;

        try
        {
            var content = File.ReadAllText(packageJsonPath);
            using var doc = JsonDocument.Parse(content, new JsonDocumentOptions
            {
                AllowTrailingCommas = true,
                CommentHandling = JsonCommentHandling.Skip,
            });
            var root = doc.RootElement;
            var packageDir = Path.GetDirectoryName(packageJsonPath);
            if (string.IsNullOrWhiteSpace(packageDir))
                return null;

            // Collect all .d.ts type paths from exports and top-level fields
            List<string> allTypePaths = [];

            if (root.TryGetProperty("exports", out var exports) && exports.ValueKind == JsonValueKind.Object)
            {
                CollectTypePaths(exports, allTypePaths);
            }

            // Also check top-level types/typings
            if (root.TryGetProperty("types", out var types) && types.ValueKind == JsonValueKind.String)
            {
                var v = types.GetString();
                if (!string.IsNullOrWhiteSpace(v)) allTypePaths.Add(v!);
            }
            else if (root.TryGetProperty("typings", out var typings) && typings.ValueKind == JsonValueKind.String)
            {
                var v = typings.GetString();
                if (!string.IsNullOrWhiteSpace(v)) allTypePaths.Add(v!);
            }

            if (allTypePaths.Count == 0)
                return null;

            // Resolve all paths and filter to ones that actually exist
            var resolvedDirs = allTypePaths
                .Select(p => Path.GetFullPath(Path.Combine(packageDir, p)))
                .Where(File.Exists)
                .Select(p => Path.GetDirectoryName(p)!)
                .Where(d => !string.IsNullOrWhiteSpace(d))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();

            if (resolvedDirs.Count == 0)
                return null;

            if (resolvedDirs.Count == 1)
                return resolvedDirs[0];

            // Find common ancestor of all .d.ts directories
            return FindCommonAncestor(resolvedDirs);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException)
        {
            return null;
        }
    }

    /// <summary>
    /// Recursively collects all "types" string values from a JSON element tree.
    /// Handles nested conditional exports like exports["."].node.types, exports["."].browser.types, etc.
    /// </summary>
    private static void CollectTypePaths(JsonElement element, List<string> paths)
    {
        if (element.ValueKind != JsonValueKind.Object)
            return;

        foreach (var prop in element.EnumerateObject())
        {
            if (prop.Name == "types" && prop.Value.ValueKind == JsonValueKind.String)
            {
                var v = prop.Value.GetString();
                if (!string.IsNullOrWhiteSpace(v))
                    paths.Add(v!);
            }
            else if (prop.Value.ValueKind == JsonValueKind.Object)
            {
                CollectTypePaths(prop.Value, paths);
            }
        }
    }

    /// <summary>
    /// Finds the longest common directory prefix of the given paths.
    /// </summary>
    private static string FindCommonAncestor(List<string> dirs)
    {
        var segments = dirs
            .Select(d => Path.TrimEndingDirectorySeparator(d).Split(Path.DirectorySeparatorChar))
            .ToList();

        var minLen = segments.Min(s => s.Length);
        var commonCount = 0;
        for (var i = 0; i < minLen; i++)
        {
            var seg = segments[0][i];
            if (segments.All(s => string.Equals(s[i], seg, StringComparison.OrdinalIgnoreCase)))
                commonCount = i + 1;
            else
                break;
        }

        if (commonCount == 0)
            return dirs[0];

        return string.Join(Path.DirectorySeparatorChar, segments[0].Take(commonCount));
    }

    internal static async Task EnsureDependenciesAsync(string scriptDir, CancellationToken ct)
    {
        var nodeModules = Path.Combine(scriptDir, "node_modules");

        // Fast path: node_modules already exists (pre-installed during build or previous run)
        if (Directory.Exists(nodeModules)) return;

        // Use semaphore to prevent concurrent npm install on the same directory
        await NpmInstallLock.WaitAsync(ct);
        try
        {
            // Double-check after acquiring lock
            if (Directory.Exists(nodeModules)) return;

            // SECURITY: Route through ProcessSandbox for proper timeout, output limits, and argument escaping
            // npm is resolved via PATH - ProcessSandbox will validate the executable
            var result = await ProcessSandbox.ExecuteAsync(
                "npm",
                ["install", "--silent"],
                workingDirectory: scriptDir,
                timeout: TimeSpan.FromMinutes(5), // npm can be slow on cold cache
                cancellationToken: ct
            ).ConfigureAwait(false);

            if (!result.Success)
            {
                var errorMsg = result.TimedOut
                    ? "npm install timed out after 5 minutes"
                    : $"npm install failed: {result.StandardError}";
                throw new InvalidOperationException(errorMsg);
            }
        }
        finally
        {
            NpmInstallLock.Release();
        }
    }

    private static string GetScriptDir()
    {
        // SECURITY: Only load scripts from assembly directory - no path traversal allowed
        var assemblyDir = AppContext.BaseDirectory;
        var distPath = Path.Combine(assemblyDir, "dist", "graph_api.js");

        if (File.Exists(distPath))
            return assemblyDir;

        throw new FileNotFoundException(
            $"Corrupt installation: dist/graph_api.js not found at {distPath}. " +
            "Reinstall the application to resolve this issue.");
    }
}
