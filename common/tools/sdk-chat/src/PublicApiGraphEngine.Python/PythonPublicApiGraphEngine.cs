// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.RegularExpressions;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Python;

/// <summary>
/// Graphs public API surface from Python source files.
/// Shells out to Python's ast module for proper parsing.
/// </summary>
public partial class PythonPublicApiGraphEngine : IPublicApiGraphEngine<ApiIndex>
{
    private static readonly IReadOnlyDictionary<string, string> InspectEnvironment = new Dictionary<string, string>
    {
        ["PYTHONDONTWRITEBYTECODE"] = "1",
        ["PYTHONNOUSERSITE"] = "1",
        ["PYTHONHASHSEED"] = "0",
        ["PYTHONSAFEPATH"] = "1",
    };

    private static readonly string ScriptPath = Path.Combine(
        AppContext.BaseDirectory,
        "graph_api.py");

    /// <summary>Shared availability configuration for all Python engine components.</summary>
    internal static readonly EngineConfig SharedConfig = new()
    {
        Language = "python",
        NativeBinaryName = "python_engine",
        RuntimeToolName = "python",
        RuntimeCandidates = ["python3", "python"]
    };

    private readonly EngineAvailabilityProvider _availability = new(SharedConfig);

    /// <inheritdoc />
    public string Language => "python";

    /// <summary>
    /// Warning message from tool resolution (if any).
    /// Check this after calling IsAvailable() for non-fatal issues.
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
            ? JsonSerializer.Serialize(index, ApiIndexContext.Indented.ApiIndex)
            : JsonSerializer.Serialize(index, ApiIndexContext.Default.ApiIndex);

    /// <inheritdoc />
    public string ToStubs(ApiIndex index) => PythonFormatter.Format(index);

    /// <inheritdoc />
    async Task<EngineResult<ApiIndex>> IPublicApiGraphEngine<ApiIndex>.GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        if (!IsAvailable())
            return EngineResult<ApiIndex>.CreateFailure(UnavailableReason ?? "Python not available");

        try
        {
            var (index, diagnostics) = await ExtractCoreAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
            return EngineResult<ApiIndex>.CreateSuccess(index, diagnostics);
        }
        catch (Exception ex)
        {
            return EngineResult<ApiIndex>.CreateFailure($"{ex.Message}\n{ex.StackTrace}");
        }
    }

    public Task<ApiIndex> GraphAsync(string rootPath, CancellationToken ct = default)
        => GraphAsync(new EngineInput.SourceDirectory(rootPath), null, ct);

    public Task<ApiIndex> GraphAsync(EngineInput input, CancellationToken ct = default)
        => GraphAsync(input, null, ct);

    public async Task<ApiIndex> GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct = default)
    {
        var (index, _) = await ExtractCoreAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
        return index;
    }

    /// <summary>
    /// Shared engine logic that returns both the API index and any stderr warnings.
    /// </summary>
    private async Task<(ApiIndex Index, IReadOnlyList<ApiDiagnostic> Diagnostics)> ExtractCoreAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        string? explicitImportName = null;
        var allowRootPathImport = false;
        if (input is EngineInput.PythonPackage pyPkg)
        {
            explicitImportName = pyPkg.ImportName;
            allowRootPathImport = pyPkg.AllowRootPathImport;
        }

        var rootPath = ProcessSandbox.ValidateRootPath(input.RootDirectory);
        using var activity = EngineTelemetry.StartGraphing(Language, rootPath);
        List<ApiDiagnostic> engineInputDiagnostics = [];
        var availability = _availability.GetAvailability();

        string? importName = null;
        if (!string.IsNullOrWhiteSpace(explicitImportName))
        {
            importName = explicitImportName;
        }
        else
        {
            importName = await DeriveImportNameAsync(rootPath).ConfigureAwait(false);
        }

        var useInspectMode = false;
        if (!string.IsNullOrWhiteSpace(importName))
        {
            useInspectMode = await IsImportableAsync(availability.ExecutablePath!, rootPath, importName!, allowRootPathImport, ct).ConfigureAwait(false);
            if (useInspectMode)
            {
                engineInputDiagnostics.Add(new ApiDiagnostic
                {
                    Id = "ENGINE_INPUT",
                    Level = DiagnosticLevel.Info,
                    Text = $"Using compiled artifacts via Python runtime inspection for import '{importName}'."
                });
            }
            else
            {
                engineInputDiagnostics.Add(new ApiDiagnostic
                {
                    Id = "ENGINE_INPUT",
                    Level = DiagnosticLevel.Warning,
                    Text = $"Package '{importName}' is not importable. Falling back to source analysis. Run: pip install -e ."
                });
            }
        }

        // Docker mode: fall back to buffered engine call
        if (availability.Mode == EngineMode.Docker)
        {
            var result = await DockerSandbox.ExecuteAsync(
                availability.DockerImageName!,
                rootPath,
                [rootPath, "--json"],
                cancellationToken: ct).ConfigureAwait(false);

            if (!result.Success)
            {
                var errorMsg = result.TimedOut
                    ? $"Python engine (docker) timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"Python engine (docker) failed: {result.StandardError}";
                EngineTelemetry.RecordResult(activity, false, error: errorMsg);
                throw new InvalidOperationException(errorMsg);
            }

            if (result.OutputTruncated)
                throw new InvalidOperationException(
                    "Python engine output was truncated (exceeded output size limit). " +
                    "The target package may be too large for engine processing.");

            var raw = DeserializeRaw(result.StandardOutput)
                ?? throw new InvalidOperationException("Failed to parse Python engine output");

            var apiIndex = ConvertToApiIndex(raw);
            EngineTelemetry.RecordResult(activity, true, apiIndex.Modules.Count);
            var stderrDiag = ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, ParseStderrDiagnostics(result.StandardError));
            var fin = FinalizeIndex(apiIndex, crossLanguageMap, stderrDiag);
            return (fin, fin.Diagnostics ?? []);
        }

        // Native/Runtime mode: stream stdout directly to JSON deserializer
        await using var streamResult = await RunEngineStreamAsync(rootPath, availability, useInspectMode, importName, allowRootPathImport, ct).ConfigureAwait(false);

        if (streamResult.StandardOutputStream is null)
        {
            var errorMsg = streamResult.StartupError ?? "Python engine failed to start";
            EngineTelemetry.RecordResult(activity, false, error: errorMsg);
            throw new InvalidOperationException(errorMsg);
        }

        var rawIndex = await JsonSerializer.DeserializeAsync(
            streamResult.StandardOutputStream,
            RawPythonJsonContext.Default.RawPythonApiIndex,
            ct).ConfigureAwait(false);

        await streamResult.CompleteAsync().ConfigureAwait(false);

        if (!streamResult.Success)
        {
            var errorMsg = streamResult.TimedOut
                ? $"Python engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"Python engine failed: {streamResult.StandardError}";
            EngineTelemetry.RecordResult(activity, false, error: errorMsg);
            throw new InvalidOperationException(errorMsg);
        }

        if (rawIndex is null)
            throw new InvalidOperationException("Failed to parse Python engine output");

        var index = ConvertToApiIndex(rawIndex);
        EngineTelemetry.RecordResult(activity, true, index.Modules.Count);
        var stderrDiagnostics = ParseStderrDiagnostics(streamResult.StandardError);
        var finalized = FinalizeIndex(index, crossLanguageMap, ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, stderrDiagnostics));
        return (finalized, finalized.Diagnostics ?? []);
    }

    /// <summary>
    /// Runs the engine with streaming stdout for JSON deserialization.
    /// </summary>
    private static async Task<StreamingProcessResult> RunEngineStreamAsync(string rootPath, EngineAvailabilityResult availability, bool inspectMode, string? importName, bool allowRootPathImport, CancellationToken ct)
    {
        List<string> args = [rootPath, "--json"];
        if (inspectMode && !string.IsNullOrWhiteSpace(importName))
        {
            args.Add("--mode");
            args.Add("inspect");
            args.Add("--import-name");
            args.Add(importName);
        }

        var environment = BuildEnvironment(rootPath, inspectMode, allowRootPathImport);

        if (availability.Mode == EngineMode.NativeBinary)
        {
            return await ProcessSandbox.ExecuteWithStreamAsync(
                availability.ExecutablePath!,
                args,
                environmentVariables: environment,
                cancellationToken: ct).ConfigureAwait(false);
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
            throw new InvalidOperationException(availability.UnavailableReason ?? "Python engine not available");

        var scriptPath = GetScriptPath();

        return await ProcessSandbox.ExecuteWithStreamAsync(
            availability.ExecutablePath!,
            [scriptPath, ..args],
            environmentVariables: environment,
            cancellationToken: ct).ConfigureAwait(false);
    }

    /// <summary>
    /// Attempts to import the given module name in a sandboxed Python process.
    /// </summary>
    /// <remarks>
    /// <b>Security:</b> This executes <c>importlib.import_module</c> in the target Python
    /// environment—module-level code in the target package <em>will</em> run. We mitigate
    /// risk via <c>PYTHONSAFEPATH</c>, <c>PYTHONNOUSERSITE</c>, and a short timeout, but
    /// callers should only pass trusted, locally-installed packages.
    /// </remarks>
    /// <summary>
    /// Validates that an import name is a legal Python dotted identifier.
    /// Rejects shell metacharacters, path separators, and other injection vectors.
    /// </summary>
    private static partial class ImportNameValidator
    {
        // Matches a valid Python dotted import path: e.g. "azure_core", "azure.storage.blob"
        [GeneratedRegex(@"^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$", RegexOptions.CultureInvariant)]
        internal static partial Regex ValidImportNamePattern();
    }

    private static bool IsValidImportName(string importName)
        => ImportNameValidator.ValidImportNamePattern().IsMatch(importName);

    private static async Task<bool> IsImportableAsync(string pythonExecutable, string rootPath, string importName, bool allowRootPathImport, CancellationToken ct)
    {
        if (!IsValidImportName(importName))
            return false;

        var environment = BuildEnvironment(rootPath, inspectMode: true, allowRootPathImport);
        var result = await ProcessSandbox.ExecuteAsync(
            pythonExecutable,
            ["-c", "import importlib,sys; importlib.import_module(sys.argv[1]); print('ok')", importName],
            environmentVariables: environment,
            timeout: TimeSpan.FromSeconds(10),
            cancellationToken: ct).ConfigureAwait(false);

        return result.Success;
    }

    private static IReadOnlyDictionary<string, string>? BuildEnvironment(string rootPath, bool inspectMode, bool allowRootPathImport)
    {
        if (!inspectMode)
        {
            return null;
        }

        Dictionary<string, string> environment = new(InspectEnvironment);
        if (allowRootPathImport)
        {
            environment["PYTHONPATH"] = rootPath;
        }

        return environment;
    }

    /// <summary>
    /// Best-effort extraction of the Python package import name from pyproject.toml,
    /// setup.cfg, or setup.py. Uses a lightweight line-by-line parser that handles the
    /// common single-line <c>name = "value"</c> pattern. Does not support multi-line
    /// values, inline tables, or comments on the same line as a value assignment.
    /// This is intentional — full TOML parsing would require an external dependency
    /// and the simple pattern covers virtually all real-world Python SDK packages.
    /// </summary>
    private static async Task<string?> DeriveImportNameAsync(string rootPath)
    {
        var pyproject = Path.Combine(rootPath, "pyproject.toml");
        if (File.Exists(pyproject))
        {
            // Track the current TOML table section to only match [project].name per PEP 621.
            // Also accept [tool.poetry].name for Poetry-style projects.
            var currentSection = "";
            foreach (var line in await File.ReadAllLinesAsync(pyproject).ConfigureAwait(false))
            {
                var trimmed = line.Trim();

                // Skip comments
                if (trimmed.StartsWith('#'))
                    continue;

                // Track section headers
                if (trimmed.StartsWith('[') && trimmed.EndsWith(']'))
                {
                    currentSection = trimmed[1..^1].Trim();
                    continue;
                }

                // Only extract name from [project] (PEP 621) or [tool.poetry]
                if (!string.Equals(currentSection, "project", StringComparison.Ordinal)
                    && !string.Equals(currentSection, "tool.poetry", StringComparison.Ordinal))
                    continue;

                if (trimmed.StartsWith("name", StringComparison.Ordinal) && trimmed.Length > 4
                    && (trimmed[4] == ' ' || trimmed[4] == '=' || trimmed[4] == '\t')
                    && trimmed.Contains('=') && trimmed.Contains('"'))
                {
                    var idx = trimmed.IndexOf('=');
                    var value = trimmed[(idx + 1)..].Trim().Trim('"', '\'');
                    if (!string.IsNullOrWhiteSpace(value))
                        return value.Replace('-', '_').ToLowerInvariant();
                }
            }
        }

        var setupCfg = Path.Combine(rootPath, "setup.cfg");
        if (File.Exists(setupCfg))
        {
            var currentSetupCfgSection = "";
            foreach (var line in await File.ReadAllLinesAsync(setupCfg).ConfigureAwait(false))
            {
                var trimmed = line.Trim();

                // Skip comments
                if (trimmed.StartsWith('#') || trimmed.StartsWith(';'))
                    continue;

                // Track section headers (INI-style)
                if (trimmed.StartsWith('[') && trimmed.EndsWith(']'))
                {
                    currentSetupCfgSection = trimmed[1..^1].Trim();
                    continue;
                }

                // Only extract name from [metadata] section
                if (!string.Equals(currentSetupCfgSection, "metadata", StringComparison.OrdinalIgnoreCase))
                    continue;

                if (trimmed.StartsWith("name", StringComparison.OrdinalIgnoreCase) && trimmed.Length > 4
                    && (trimmed[4] == ' ' || trimmed[4] == '=' || trimmed[4] == '\t')
                    && trimmed.Contains('='))
                {
                    var idx = trimmed.IndexOf('=');
                    var value = trimmed[(idx + 1)..].Trim().Trim('"', '\'');
                    if (!string.IsNullOrWhiteSpace(value))
                        return value.Replace('-', '_').ToLowerInvariant();
                }
            }
        }

        var setupPy = Path.Combine(rootPath, "setup.py");
        if (File.Exists(setupPy))
        {
            var content = await File.ReadAllTextAsync(setupPy).ConfigureAwait(false);
            var marker = "name=";
            var idx = content.IndexOf(marker, StringComparison.OrdinalIgnoreCase);
            if (idx >= 0)
            {
                var rest = content[(idx + marker.Length)..].TrimStart();
                if (rest.Length > 2 && (rest[0] == '\'' || rest[0] == '"'))
                {
                    var quote = rest[0];
                    var end = rest.IndexOf(quote, 1);
                    if (end > 1)
                    {
                        var value = rest[1..end];
                        if (!string.IsNullOrWhiteSpace(value))
                            return value.Replace('-', '_').ToLowerInvariant();
                    }
                }
            }
        }

        return null;
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
    {
        return index with
        {
            CrossLanguagePackageId = map?.PackageId,
            Modules = index.Modules.Select(module => FinalizeModule(module, module.Name, map)).ToList(),
            Dependencies = index.Dependencies?.Select(dependency => dependency with
            {
                Classes = dependency.Classes?.Select(cls => FinalizeClass(cls, dependency.Package, map)).ToList(),
                Functions = dependency.Functions?.Select(function =>
                {
                    var funcId = function.Id ?? BuildTypeId(dependency.Package, function.Name);
                    return function with
                    {
                        Id = funcId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(funcId, out var xId) ? xId : null,
                    };
                }).ToList(),
            }).ToList(),
        };

        static ModuleInfo FinalizeModule(ModuleInfo module, string moduleName, CrossLanguageMap? map)
            => module with
            {
                Classes = module.Classes?.Select(cls => FinalizeClass(cls, moduleName, map)).ToList(),
                Functions = module.Functions?.Select(function =>
                {
                    var funcId = function.Id ?? BuildTypeId(moduleName, function.Name);
                    return function with
                    {
                        Id = funcId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(funcId, out var xId) ? xId : null,
                    };
                }).ToList(),
            };

        static ClassInfo FinalizeClass(ClassInfo cls, string? scope, CrossLanguageMap? map)
        {
            var typeId = cls.Id ?? BuildTypeId(scope, cls.Name);
            return cls with
            {
                Id = typeId,
                CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var clsXId) ? clsXId : null,
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
        }
    }

    private static string BuildTypeId(string? moduleName, string typeName)
        => string.IsNullOrWhiteSpace(moduleName) ? typeName : $"{moduleName}.{typeName}";

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

    private static string GetScriptPath()
    {
        // SECURITY: Only load scripts from assembly directory - no path traversal allowed
        if (File.Exists(ScriptPath))
            return ScriptPath;

        throw new FileNotFoundException(
            $"Corrupt installation: graph_api.py not found at {ScriptPath}. " +
            "Reinstall the application to resolve this issue.");
    }

    private static ApiIndex ConvertToApiIndex(RawPythonApiIndex raw)
    {
        static IReadOnlyList<ParameterInfo>? MapParameters(IReadOnlyList<RawPythonParameter>? parameters)
            => parameters?.Select(p => new ParameterInfo
            {
                Name = p.Name ?? "",
                Type = p.Type,
                Default = p.Default,
                Kind = p.Kind,
            }).ToList();

        var modules = raw.Modules?.Select(m => new ModuleInfo(
            m.Name ?? "",
            m.Classes?.Select(c => new ClassInfo
            {
                Name = c.Name ?? "",
                EntryPoint = c.EntryPoint,
                ReExportedFrom = c.ReExportedFrom,
                Base = c.Base,
                Doc = c.Doc,
                IsDeprecated = c.Deprecated,
                DeprecatedMessage = c.DeprecatedMsg,
                Methods = c.Methods?.Select(mt => new MethodInfo
                {
                    Name = mt.Name ?? "",
                    Signature = mt.Sig ?? "",
                    Params = MapParameters(mt.Params),
                    Doc = mt.Doc,
                    IsAsync = mt.Async,
                    IsClassMethod = mt.Classmethod,
                    IsStaticMethod = mt.Staticmethod,
                    Ret = mt.Ret,
                    IsDeprecated = mt.Deprecated,
                    DeprecatedMessage = mt.DeprecatedMsg,
                }).ToList(),
                Properties = c.Properties?.Select(p => new PropertyInfo
                {
                    Name = p.Name ?? "",
                    Type = p.Type,
                    Doc = p.Doc,
                    IsDeprecated = p.Deprecated,
                    DeprecatedMessage = p.DeprecatedMsg,
                }).ToList()
            }).ToList(),
            m.Functions?.Select(f => new FunctionInfo
            {
                Name = f.Name ?? "",
                EntryPoint = f.EntryPoint,
                ReExportedFrom = f.ReExportedFrom,
                Signature = f.Sig ?? "",
                Params = MapParameters(f.Params),
                Doc = f.Doc,
                Ret = f.Ret,
                IsAsync = f.Async,
                IsDeprecated = f.Deprecated,
                DeprecatedMessage = f.DeprecatedMsg,
            }).ToList()
        )).ToList() ?? [];

        var dependencies = raw.Dependencies?.Select(d => new DependencyInfo
        {
            Package = d.Package ?? "",
            Classes = d.Classes?.Select(c => new ClassInfo
            {
                Name = c.Name ?? "",
                Base = c.Base,
                Doc = c.Doc,
                IsDeprecated = c.Deprecated,
                DeprecatedMessage = c.DeprecatedMsg,
                Methods = c.Methods?.Select(mt => new MethodInfo
                {
                    Name = mt.Name ?? "",
                    Signature = mt.Sig ?? "",
                    Params = MapParameters(mt.Params),
                    Doc = mt.Doc,
                    IsAsync = mt.Async,
                    IsClassMethod = mt.Classmethod,
                    IsStaticMethod = mt.Staticmethod,
                    Ret = mt.Ret,
                    IsDeprecated = mt.Deprecated,
                    DeprecatedMessage = mt.DeprecatedMsg,
                }).ToList(),
                Properties = c.Properties?.Select(p => new PropertyInfo
                {
                    Name = p.Name ?? "",
                    Type = p.Type,
                    Doc = p.Doc,
                    IsDeprecated = p.Deprecated,
                    DeprecatedMessage = p.DeprecatedMsg,
                }).ToList()
            }).ToList(),
            Functions = d.Functions?.Select(f => new FunctionInfo
            {
                Name = f.Name ?? "",
                Signature = f.Sig ?? "",
                Params = MapParameters(f.Params),
                Doc = f.Doc,
                Ret = f.Ret,
                IsAsync = f.Async,
                IsDeprecated = f.Deprecated,
                DeprecatedMessage = f.DeprecatedMsg,
            }).ToList()
        }).ToList();

        return new ApiIndex(raw.Package ?? "", modules, dependencies);
    }

    // AOT-safe deserialization using source-generated context
    private static RawPythonApiIndex? DeserializeRaw(string json) =>
        JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonApiIndex);
}
