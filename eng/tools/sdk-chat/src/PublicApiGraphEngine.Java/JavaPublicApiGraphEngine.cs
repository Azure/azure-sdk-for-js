// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Java;

/// <summary>
/// Graphs public API surface from Java packages using JBang + JavaParser.
/// </summary>
public class JavaPublicApiGraphEngine : IPublicApiGraphEngine<ApiIndex>
{
    /// <summary>Shared availability configuration for all Java engine components.</summary>
    internal static readonly EngineConfig SharedConfig = new()
    {
        Language = "java",
        NativeBinaryName = "java_engine",
        RuntimeToolName = "jbang",
        RuntimeCandidates = ["jbang"]
    };

    private readonly EngineAvailabilityProvider _availability = new(SharedConfig);

    /// <inheritdoc />
    public string Language => "java";

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
    public string ToStubs(ApiIndex index) => JavaFormatter.Format(index);

    /// <inheritdoc />
    async Task<EngineResult<ApiIndex>> IPublicApiGraphEngine<ApiIndex>.GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        if (!IsAvailable())
            return EngineResult<ApiIndex>.CreateFailure(UnavailableReason ?? "JBang not available");

        using var activity = EngineTelemetry.StartGraphing(Language, input.RootDirectory);
        try
        {
            var (result, diagnostics) = await ExtractCoreAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
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
    /// Graph API from a Java package directory.
    /// Prefers pre-compiled binary from build, falls back to JBang runtime.
    /// </summary>
    public Task<ApiIndex> GraphAsync(string rootPath, CancellationToken ct = default)
        => GraphAsync(new EngineInput.SourceDirectory(rootPath), null, ct);

    public Task<ApiIndex> GraphAsync(EngineInput input, CancellationToken ct = default)
        => GraphAsync(input, null, ct);

    public async Task<ApiIndex> GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct = default)
    {
        var (index, _) = await ExtractCoreAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
        return index ?? throw new InvalidOperationException("Java engine returned no API surface.");
    }

    /// <summary>
    /// Shared engine logic that returns both the API index and any stderr warnings.
    /// </summary>
    private async Task<(ApiIndex? Index, IReadOnlyList<ApiDiagnostic> Diagnostics)> ExtractCoreAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        string? pomPath = input is EngineInput.JavaMavenProject maven ? maven.PomPath : null;
        string? gradlePath = input is EngineInput.JavaGradleProject gradle ? gradle.GradlePath : null;
        var rootPath = ProcessSandbox.ValidateRootPath(input.RootDirectory);
        List<ApiDiagnostic> engineInputDiagnostics = [];

        string? classesDir = null;
        if (!string.IsNullOrWhiteSpace(pomPath))
        {
            classesDir = await ResolveMavenClassesDirectoryAsync(pomPath!, ct).ConfigureAwait(false);
        }
        else if (!string.IsNullOrWhiteSpace(gradlePath))
        {
            classesDir = await ResolveGradleClassesDirectoryAsync(gradlePath!, ct).ConfigureAwait(false);
        }

        if (!string.IsNullOrWhiteSpace(classesDir))
        {
            engineInputDiagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Info,
                Text = $"Using compiled artifacts: class files in {classesDir}"
            });
        }
        else if (!string.IsNullOrWhiteSpace(pomPath) || !string.IsNullOrWhiteSpace(gradlePath))
        {
            var buildFile = pomPath ?? gradlePath;
            engineInputDiagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Warning,
                Text = $"Java artifact mode requested, but no compiled classes were found for '{buildFile}'. Falling back to source analysis."
            });
        }

        var availability = _availability.GetAvailability();

        // Docker mode: fall back to buffered engine call
        if (availability.Mode == EngineMode.Docker)
        {
            var result = await RunEngineAsync("--json", rootPath, classesDir, ct).ConfigureAwait(false);
            var diag = ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, ParseStderrDiagnostics(result.StandardError));

            if (string.IsNullOrWhiteSpace(result.StandardOutput))
                return (null, diag);

            if (result.OutputTruncated)
                throw new InvalidOperationException(
                    "Java engine output was truncated (exceeded output size limit). " +
                    "The target package may be too large for engine processing.");

            var idx = JsonSerializer.Deserialize(result.StandardOutput, SourceGenerationContext.Default.ApiIndex);
            if (idx is null) return (null, diag);

            var fin = FinalizeIndex(idx, crossLanguageMap, diag);
            return (fin, fin.Diagnostics);
        }

        // Native/Runtime mode: stream stdout directly to JSON deserializer
        await using var streamResult = await RunEngineStreamAsync(rootPath, classesDir, ct).ConfigureAwait(false);

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
                ? $"Java engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"Java engine failed: {streamResult.StandardError}";
            throw new InvalidOperationException(errorMsg);
        }

        if (index is null) return (null, stderrDiagnostics);

        var finalized = FinalizeIndex(index, crossLanguageMap, ApiDiagnosticsPostProcessor.PrependDiagnostics(engineInputDiagnostics, stderrDiagnostics));
        return (finalized, finalized.Diagnostics);
    }

    /// <summary>
    /// Runs the engine with streaming stdout for JSON deserialization.
    /// </summary>
    private async Task<StreamingProcessResult> RunEngineStreamAsync(string rootPath, string? classesDir, CancellationToken ct)
    {
        var availability = _availability.GetAvailability();
        var args = BuildEngineArgs(rootPath, "--json", classesDir);

        if (availability.Mode == EngineMode.NativeBinary)
        {
            return await ProcessSandbox.ExecuteWithStreamAsync(
                availability.ExecutablePath!,
                args,
                cancellationToken: ct).ConfigureAwait(false);
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
            throw new InvalidOperationException(availability.UnavailableReason ?? "Java engine not available");

        var scriptPath = GetScriptPath();

        return await ProcessSandbox.ExecuteWithStreamAsync(
            availability.ExecutablePath!,
            ["--quiet", scriptPath, ..args],
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
                Classes = package.Classes?.Select(cls => FinalizeClassInfo(cls, package.Name, map)).ToList(),
                Interfaces = package.Interfaces?.Select(iface => FinalizeClassInfo(iface, package.Name, map)).ToList(),
                Annotations = package.Annotations?.Select(annotation => FinalizeClassInfo(annotation, package.Name, map)).ToList(),
                Enums = package.Enums?.Select(en =>
                {
                    var enumId = en.Id ?? BuildTypeId(package.Name, en.Name);
                    return en with
                    {
                        Id = enumId,
                        CrossLanguageId = map is not null && map.Ids.TryGetValue(enumId, out var enumXId) ? enumXId : null,
                        Methods = en.Methods?.Select(method =>
                        {
                            var methodId = method.Id ?? BuildMemberId(enumId, method.Name);
                            return method with
                            {
                                Id = methodId,
                                CrossLanguageId = map is not null && map.Ids.TryGetValue(methodId, out var methodXId) ? methodXId : null,
                            };
                        }).ToList(),
                    };
                }).ToList(),
            }).ToList(),
        };

    private static ClassInfo FinalizeClassInfo(ClassInfo cls, string packageName, CrossLanguageMap? map)
    {
        var typeId = cls.Id ?? BuildTypeId(packageName, cls.Name);
        return cls with
        {
            Id = typeId,
            CrossLanguageId = map is not null && map.Ids.TryGetValue(typeId, out var clsXId) ? clsXId : null,
            Constructors = cls.Constructors?.Select(ctor =>
            {
                var ctorId = ctor.Id ?? BuildMemberId(typeId, ctor.Name);
                return ctor with { Id = ctorId, CrossLanguageId = map is not null && map.Ids.TryGetValue(ctorId, out var ctorXId) ? ctorXId : null };
            }).ToList(),
            Methods = cls.Methods?.Select(method =>
            {
                var methodId = method.Id ?? BuildMemberId(typeId, method.Name);
                return method with { Id = methodId, CrossLanguageId = map is not null && map.Ids.TryGetValue(methodId, out var methodXId) ? methodXId : null };
            }).ToList(),
            Fields = cls.Fields?.Select(field =>
            {
                var fieldId = field.Id ?? BuildMemberId(typeId, field.Name);
                return field with { Id = fieldId, CrossLanguageId = map is not null && map.Ids.TryGetValue(fieldId, out var fieldXId) ? fieldXId : null };
            }).ToList(),
        };
    }

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
    /// Extract and format as Java stub syntax.
    /// </summary>
    public async Task<string> ExtractAsJavaAsync(string rootPath, CancellationToken ct = default)
    {
        var result = await RunEngineAsync("--stub", rootPath, null, ct).ConfigureAwait(false);
        return result.StandardOutput;
    }

    /// <summary>
    /// Runs the Java engine with the given output flag, dispatching to the correct
    /// execution mode (NativeBinary, RuntimeInterpreter, or Docker).
    /// </summary>
    private async Task<ProcessResult> RunEngineAsync(string outputFlag, string rootPath, string? classesDir, CancellationToken ct)
    {
        rootPath = ProcessSandbox.ValidateRootPath(rootPath);
        var availability = _availability.GetAvailability();
        var args = BuildEngineArgs(rootPath, outputFlag, classesDir);

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
                    ? $"Java engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"Java engine failed: {result.StandardError}";
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
                    ? $"Java engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                    : $"Java engine failed: {dockerResult.StandardError}";
                throw new InvalidOperationException(errorMsg);
            }

            return dockerResult;
        }

        if (availability.Mode != EngineMode.RuntimeInterpreter)
        {
            throw new InvalidOperationException(availability.UnavailableReason ?? "Java engine not available");
        }

        // Fall back to JBang runtime
        var scriptPath = GetScriptPath();

        var jbangResult = await ProcessSandbox.ExecuteAsync(
            availability.ExecutablePath!,
            ["--quiet", scriptPath, ..args],
            cancellationToken: ct
        ).ConfigureAwait(false);

        if (!jbangResult.Success)
        {
            var errorMsg = jbangResult.TimedOut
                ? $"Java engine timed out after {EngineTimeout.Value.TotalSeconds}s"
                : $"JBang failed: {jbangResult.StandardError}";
            throw new InvalidOperationException(errorMsg);
        }

        return jbangResult;
    }

    private static IReadOnlyList<string> BuildEngineArgs(string rootPath, string outputFlag, string? classesDir)
    {
        List<string> args = [rootPath, outputFlag];
        if (!string.IsNullOrWhiteSpace(classesDir))
        {
            args.Add("--mode");
            args.Add("compiled");
            args.Add("--classes-dir");
            args.Add(classesDir);
        }
        return args;
    }

    private static async Task<string?> ResolveMavenClassesDirectoryAsync(string pomPath, CancellationToken ct)
    {
        if (!File.Exists(pomPath))
            return null;

        var result = await ProcessSandbox.ExecuteAsync(
            "mvn",
            ["help:evaluate", "-Dexpression=project.build.outputDirectory", "-q", "-DforceStdout", "-f", pomPath],
            timeout: TimeSpan.FromSeconds(30),
            cancellationToken: ct).ConfigureAwait(false);

        if (!result.Success)
            return null;

        var output = result.StandardOutput
            .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .LastOrDefault();

        if (string.IsNullOrWhiteSpace(output) || !Directory.Exists(output))
            return null;

        return Directory.EnumerateFiles(output, "*.class", SearchOption.AllDirectories).Any() ? output : null;
    }

    private static async Task<string?> ResolveGradleClassesDirectoryAsync(string gradlePath, CancellationToken ct)
    {
        if (!File.Exists(gradlePath))
            return null;

        var gradleDirectory = Path.GetDirectoryName(gradlePath);
        if (string.IsNullOrWhiteSpace(gradleDirectory))
            return null;

        var gradleExecutable = File.Exists(Path.Combine(gradleDirectory, "gradlew"))
            ? Path.Combine(gradleDirectory, "gradlew")
            : "gradle";

        var initScriptPath = Path.Combine(Path.GetTempPath(), $"sdkchat-gradle-init-{Guid.NewGuid():N}.gradle");

        try
        {
            // Use FileMode.CreateNew to avoid TOCTOU — fails if file already exists.
            const string initScript = """
allprojects {
    tasks.register('sdkChatPrintMainClassesDirs') {
        doLast {
            def sourceSetsExt = project.extensions.findByName('sourceSets')
            if (sourceSetsExt == null) {
                return
            }

            def mainSourceSet = sourceSetsExt.findByName('main')
            if (mainSourceSet == null) {
                return
            }

            println mainSourceSet.output.classesDirs.files.collect { it.absolutePath }.join(File.pathSeparator)
        }
    }
}
""";
            await using (var fs = new FileStream(initScriptPath, FileMode.CreateNew, FileAccess.Write, FileShare.None))
            await using (var writer = new StreamWriter(fs))
            {
                await writer.WriteAsync(initScript).ConfigureAwait(false);
            }

            // Register cleanup on cancellation so the temp file is removed even if
            // the awaited process is cancelled before reaching the finally block.
            await using var ctRegistration = ct.Register(() => TryDeleteFile(initScriptPath));

            var result = await ProcessSandbox.ExecuteAsync(
                gradleExecutable,
                ["-q", "-I", initScriptPath, "-b", gradlePath, "sdkChatPrintMainClassesDirs"],
                workingDirectory: gradleDirectory,
                timeout: TimeSpan.FromSeconds(45),
                cancellationToken: ct).ConfigureAwait(false);

            if (!result.Success)
                return null;

            var outputLines = result.StandardOutput
                .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            var lastLine = outputLines.LastOrDefault();
            if (string.IsNullOrWhiteSpace(lastLine))
                return null;

            var candidates = lastLine
                .Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Where(Directory.Exists);

            foreach (var candidate in candidates)
            {
                if (Directory.EnumerateFiles(candidate, "*.class", SearchOption.AllDirectories).Any())
                    return candidate;
            }

            return null;
        }
        finally
        {
            TryDeleteFile(initScriptPath);
        }
    }

    private static void TryDeleteFile(string path)
    {
        try
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
        catch
        {
        }
    }

    private static string GetScriptPath()
    {
        // SECURITY: Only load scripts from assembly directory - no path traversal allowed
        var assemblyDir = AppContext.BaseDirectory;
        var scriptPath = Path.Combine(assemblyDir, "GraphApi.java");

        if (File.Exists(scriptPath))
            return scriptPath;

        throw new FileNotFoundException(
            $"Corrupt installation: GraphApi.java not found at {scriptPath}. " +
            "Reinstall the application to resolve this issue.");
    }
}
