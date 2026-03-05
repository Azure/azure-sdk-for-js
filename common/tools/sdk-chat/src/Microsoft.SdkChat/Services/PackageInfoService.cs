// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;
using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.DotNet;
using PublicApiGraphEngine.Go;
using PublicApiGraphEngine.Java;
using PublicApiGraphEngine.Python;
using PublicApiGraphEngine.TypeScript;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Interface for SDK package analysis operations.
/// Enables dependency injection and mocking for tests.
/// </summary>
public interface IPackageInfoService
{
    /// <summary>
    /// Detects the source folder for an SDK package.
    /// </summary>
    /// <param name="packagePath">Root path of the SDK package.</param>
    /// <param name="language">Optional language override (e.g., "dotnet", "python").</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Source folder detection result.</returns>
    Task<SourceFolderResult> DetectSourceFolderAsync(string packagePath, string? language = null, CancellationToken ct = default);

    /// <summary>
    /// Detects the samples folder for an SDK package.
    /// </summary>
    /// <param name="packagePath">Root path of the SDK package.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Samples folder detection result.</returns>
    Task<SamplesFolderResult> DetectSamplesFolderAsync(string packagePath, CancellationToken ct = default);

    /// <summary>
    /// Graphs the public API surface from an SDK package.
    /// </summary>
    /// <param name="packagePath">Root path of the SDK package.</param>
    /// <param name="language">Optional language override.</param>
    /// <param name="asJson">If true, returns JSON format; otherwise returns language stubs.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>API graphing result with the public API surface.</returns>
    Task<ApiGraphResult> GraphPublicApiAsync(string packagePath, string? language = null, bool asJson = false, string? crossLanguageMetadataPath = null, ArtifactOptions? artifactOptions = null, CancellationToken ct = default);

    /// <summary>
    /// Analyzes API coverage in existing samples or tests.
    /// </summary>
    /// <param name="packagePath">Root path of the SDK package.</param>
    /// <param name="samplesPath">Optional path to samples folder (auto-detected if null).</param>
    /// <param name="language">Optional language override.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Coverage analysis result with covered and uncovered operations.</returns>
    Task<CoverageAnalysisResult> AnalyzeCoverageAsync(string packagePath, string? samplesPath = null, string? language = null, CancellationToken ct = default);

    /// <summary>
    /// Analyzes API coverage across multiple packages in a monorepo.
    /// </summary>
    /// <param name="rootPath">Root path of the monorepo.</param>
    /// <param name="samplesPath">Optional samples folder override for all packages.</param>
    /// <param name="language">Optional language override.</param>
    /// <param name="progress">Optional progress reporter.</param>
    /// <param name="maxParallelism">Maximum number of packages to analyze in parallel (default: 1 = sequential).</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Batch coverage analysis result.</returns>
    Task<CoverageBatchResult> AnalyzeCoverageMonorepoAsync(string rootPath, string? samplesPath = null, string? language = null, IProgress<string>? progress = null, int maxParallelism = 1, CancellationToken ct = default);
}

/// <summary>
/// Unified service for SDK package analysis: source detection, samples detection,
/// API graphing, and coverage analysis.
/// </summary>
public sealed class PackageInfoService : IPackageInfoService
{
    /// <inheritdoc />
    public async Task<SourceFolderResult> DetectSourceFolderAsync(string packagePath, string? language = null, CancellationToken ct = default)
    {
        var sdkInfo = await SdkInfo.ScanAsync(packagePath, ct).ConfigureAwait(false);

        var effectiveLanguage = !string.IsNullOrEmpty(language)
            ? SdkLanguageHelpers.Parse(language)
            : sdkInfo.Language;

        return new SourceFolderResult
        {
            SourceFolder = sdkInfo.SourceFolder,
            Language = effectiveLanguage?.ToString(),
            LanguageName = sdkInfo.LanguageName,
            FileExtension = sdkInfo.FileExtension,
            RootPath = sdkInfo.RootPath,
            SdkName = sdkInfo.SdkName,
            IsValid = sdkInfo.IsValid
        };
    }

    /// <inheritdoc />
    public async Task<SamplesFolderResult> DetectSamplesFolderAsync(string packagePath, CancellationToken ct = default)
    {
        var sdkInfo = await SdkInfo.ScanAsync(packagePath, ct).ConfigureAwait(false);

        return new SamplesFolderResult
        {
            SamplesFolder = sdkInfo.SamplesFolder,
            SuggestedSamplesFolder = sdkInfo.SuggestedSamplesFolder,
            AllCandidates = sdkInfo.AllSamplesCandidates.ToArray(),
            HasExistingSamples = sdkInfo.SamplesFolder != null,
            Language = sdkInfo.Language?.ToString(),
            RootPath = sdkInfo.RootPath
        };
    }

    /// <inheritdoc />
    public async Task<ApiGraphResult> GraphPublicApiAsync(
        string packagePath,
        string? language = null,
        bool asJson = false,
        string? crossLanguageMetadataPath = null,
        ArtifactOptions? artifactOptions = null,
        CancellationToken ct = default)
    {
        var sdkInfo = await SdkInfo.ScanAsync(packagePath, ct).ConfigureAwait(false);

        var effectiveLanguage = !string.IsNullOrEmpty(language)
            ? SdkLanguageHelpers.Parse(language)
            : sdkInfo.Language;

        if (effectiveLanguage == null || effectiveLanguage == SdkLanguage.Unknown)
        {
            return new ApiGraphResult
            {
                Success = false,
                ErrorCode = "LANGUAGE_DETECTION_FAILED",
                ErrorMessage = "Could not detect SDK language. Specify --language explicitly.",
                SourceFolder = sdkInfo.SourceFolder
            };
        }

        var useArtifactOptions = HasAnyArtifactOption(artifactOptions);
        EngineInput engineInput;
        ApiDiagnostic? artifactMismatchWarning = null;
        if (useArtifactOptions)
        {
            (engineInput, artifactMismatchWarning) = BuildEngineInputFromArtifactOptions(artifactOptions!, effectiveLanguage.Value, sdkInfo.SourceFolder);
        }
        else
        {
            engineInput = BuildEngineInputFromSdkInfo(sdkInfo, effectiveLanguage.Value);
        }
        var engine = CreateEngine(effectiveLanguage.Value);
        if (engine == null)
        {
            return new ApiGraphResult
            {
                Success = false,
                ErrorCode = "ENGINE_NOT_FOUND",
                ErrorMessage = $"No engine available for language: {effectiveLanguage}",
                SourceFolder = sdkInfo.SourceFolder
            };
        }

        if (!engine.IsAvailable())
        {
            return new ApiGraphResult
            {
                Success = false,
                ErrorCode = "ENGINE_UNAVAILABLE",
                ErrorMessage = engine.UnavailableReason ?? $"Engine for {effectiveLanguage} is not available",
                SourceFolder = sdkInfo.SourceFolder
            };
        }

        var crossLanguageMap = string.IsNullOrWhiteSpace(crossLanguageMetadataPath)
            ? null
            : CrossLanguageMetadata.Load(crossLanguageMetadataPath);

        var result = await engine.GraphAsyncCore(engineInput, crossLanguageMap, ct).ConfigureAwait(false);

        if (!result.IsSuccess)
        {
            var failure = (EngineResult.Failure)result;
            return new ApiGraphResult
            {
                Success = false,
                ErrorCode = "ENGINE_FAILED",
                ErrorMessage = failure.Error,
                SourceFolder = sdkInfo.SourceFolder
            };
        }

        var apiIndex = result.GetValueOrThrow();

        return new ApiGraphResult
        {
            Success = true,
            SourceFolder = sdkInfo.SourceFolder,
            Language = effectiveLanguage.Value.ToString(),
            Package = apiIndex.Package,
            ApiSurface = asJson ? apiIndex.ToJson(pretty: true) : apiIndex.ToStubs(),
            Format = asJson ? "json" : "stubs",
            Diagnostics = artifactMismatchWarning is not null
                ? [artifactMismatchWarning, ..result.Diagnostics]
                : result.Diagnostics.ToArray()
        };
    }

    /// <inheritdoc />
    public async Task<CoverageAnalysisResult> AnalyzeCoverageAsync(
        string packagePath,
        string? samplesPath = null,
        string? language = null,
        CancellationToken ct = default)
    {
        var sdkInfo = await SdkInfo.ScanAsync(packagePath, ct).ConfigureAwait(false);

        var effectiveLanguage = !string.IsNullOrEmpty(language)
            ? SdkLanguageHelpers.Parse(language)
            : sdkInfo.Language;

        if (effectiveLanguage == null || effectiveLanguage == SdkLanguage.Unknown)
        {
            return new CoverageAnalysisResult
            {
                Success = false,
                ErrorCode = "LANGUAGE_DETECTION_FAILED",
                ErrorMessage = "Could not detect SDK language. Specify --language explicitly."
            };
        }

        var effectiveSamplesPath = samplesPath ?? sdkInfo.SamplesFolder;
        if (string.IsNullOrEmpty(effectiveSamplesPath) || !Directory.Exists(effectiveSamplesPath))
        {
            return new CoverageAnalysisResult
            {
                Success = false,
                ErrorCode = "NO_SAMPLES_FOUND",
                ErrorMessage = $"No samples folder found. Detected path: {sdkInfo.SuggestedSamplesFolder}"
            };
        }

        // Graph API and analyze usage in a single pass to avoid spawning the
        // engine process twice (once here and once inside AnalyzeUsageInternalAsync).
        if (!AnalyzerRegistry.TryGetValue(effectiveLanguage.Value, out var factory))
        {
            return new CoverageAnalysisResult
            {
                Success = false,
                ErrorCode = "ENGINE_NOT_FOUND",
                ErrorMessage = $"No engine available for language: {effectiveLanguage}"
            };
        }

        var (engine, analyzer) = factory();
        var engineInput = BuildEngineInputFromSdkInfo(sdkInfo, effectiveLanguage.Value);

        if (!engine.IsAvailable())
        {
            return new CoverageAnalysisResult
            {
                Success = false,
                ErrorCode = "ENGINE_UNAVAILABLE",
                ErrorMessage = engine.UnavailableReason ?? $"Engine for {effectiveLanguage} is not available"
            };
        }

        var engineResult = await engine.GraphAsyncCore(engineInput, null, ct).ConfigureAwait(false);
        if (!engineResult.IsSuccess)
        {
            var failure = (EngineResult.Failure)engineResult;
            return new CoverageAnalysisResult
            {
                Success = false,
                ErrorCode = "ENGINE_FAILED",
                ErrorMessage = failure.Error
            };
        }

        var apiIndex = engineResult.GetValueOrThrow();

        // Analyze usage with the already-graphed API surface
        var usage = await analyzer.AnalyzeAsyncCore(effectiveSamplesPath, apiIndex, ct).ConfigureAwait(false);
        var deprecatedOps = GetDeprecatedOperations(apiIndex);
        var uncoveredFiltered = usage.UncoveredOperations
            .Where(o => !deprecatedOps.Contains((o.ClientType, o.Operation)))
            .ToList();
        var totalOperations = usage.CoveredOperations.Count + uncoveredFiltered.Count;

        var covered = usage.CoveredOperations
            .Select(o => new CoveredOperationInfo
            {
                ClientType = o.ClientType,
                Operation = o.Operation,
                File = o.File,
                Line = o.Line
            })
            .ToList();

        var uncovered = uncoveredFiltered
            .Select(o => new UncoveredOperationInfo
            {
                ClientType = o.ClientType,
                Operation = o.Operation,
                Signature = o.Signature
            })
            .ToList();

        var coveragePercent = totalOperations > 0 ? (covered.Count * 100.0 / totalOperations) : 0;

        return new CoverageAnalysisResult
        {
            Success = true,
            SourceFolder = sdkInfo.SourceFolder,
            SamplesFolder = effectiveSamplesPath,
            Language = effectiveLanguage.Value.ToString(),
            TotalOperations = totalOperations,
            CoveredCount = covered.Count,
            UncoveredCount = uncovered.Count,
            CoveragePercent = Math.Round(coveragePercent, 1),
            CoveredOperations = covered.ToArray(),
            UncoveredOperations = uncovered.ToArray()
        };
    }

    private static HashSet<(string ClientType, string Operation)> GetDeprecatedOperations(IApiIndex apiIndex)
    {
        HashSet<(string ClientType, string Operation)> result = [];

        switch (apiIndex)
        {
            case PublicApiGraphEngine.DotNet.ApiIndex dotNetIndex:
                foreach (var type in dotNetIndex.GetAllTypes())
                {
                    foreach (var member in type.Members?.Where(m => m.Kind == "method" && m.IsDeprecated == true) ?? [])
                    {
                        result.Add((type.Name, member.Name));
                    }
                }
                break;

            case PublicApiGraphEngine.TypeScript.ApiIndex typeScriptIndex:
                foreach (var cls in typeScriptIndex.Modules.SelectMany(m => m.Classes ?? []))
                {
                    foreach (var method in cls.Methods?.Where(m => m.IsDeprecated == true) ?? [])
                    {
                        result.Add((cls.Name, method.Name));
                    }
                }
                break;

            case PublicApiGraphEngine.Python.ApiIndex pythonIndex:
                foreach (var cls in pythonIndex.GetAllClasses())
                {
                    foreach (var method in cls.Methods?.Where(m => m.IsDeprecated == true) ?? [])
                    {
                        result.Add((cls.Name, method.Name));
                    }
                }
                break;

            case PublicApiGraphEngine.Java.ApiIndex javaIndex:
                foreach (var type in javaIndex.GetAllTypes())
                {
                    foreach (var method in type.Methods?.Where(m => m.IsDeprecated == true) ?? [])
                    {
                        result.Add((type.Name, method.Name));
                    }
                }
                break;

            case PublicApiGraphEngine.Go.ApiIndex goIndex:
                foreach (var st in goIndex.GetAllStructs())
                {
                    foreach (var method in st.Methods?.Where(m => m.IsDeprecated == true) ?? [])
                    {
                        result.Add((st.Name, method.Name));
                    }
                }
                break;
        }

        return result;
    }

    /// <summary>
    /// Registry of language-specific engine and analyzer factories.
    /// Adding a new language requires only adding an entry here.
    /// Factories (not singletons) because engines hold mutable per-run state
    /// (e.g. Java's static typeCollector/importMap, Go's engineContext) and
    /// concurrent calls would corrupt shared state.
    /// </summary>
    private static readonly Dictionary<SdkLanguage, Func<(IPublicApiGraphEngine Engine, IUsageAnalyzer Analyzer)>> AnalyzerRegistry = new()
    {
        [SdkLanguage.DotNet] = () => (new CSharpPublicApiGraphEngine(), new CSharpUsageAnalyzer()),
        [SdkLanguage.Python] = () => (new PythonPublicApiGraphEngine(), new PythonUsageAnalyzer()),
        [SdkLanguage.Go] = () => (new GoPublicApiGraphEngine(), new GoUsageAnalyzer()),
        [SdkLanguage.TypeScript] = () => (new TypeScriptPublicApiGraphEngine(), new TypeScriptUsageAnalyzer()),
        [SdkLanguage.JavaScript] = () => (new TypeScriptPublicApiGraphEngine(), new TypeScriptUsageAnalyzer()), // JS uses TS tooling
        [SdkLanguage.Java] = () => (new JavaPublicApiGraphEngine(), new JavaUsageAnalyzer()),
    };

    private static IPublicApiGraphEngine? CreateEngine(SdkLanguage language)
    {
        if (AnalyzerRegistry.TryGetValue(language, out var factory))
            return factory().Engine;
        return null;
    }

    private static (EngineInput Input, ApiDiagnostic? Warning) BuildEngineInputFromArtifactOptions(ArtifactOptions opts, SdkLanguage language, string sourceFolder)
    {
        var input = language switch
        {
            SdkLanguage.DotNet when opts.CsprojPath is { } cp => new EngineInput.DotNetProject(cp),
            SdkLanguage.TypeScript or SdkLanguage.JavaScript when opts.TsconfigPath is { } tp => new EngineInput.TypeScriptProject(tp, opts.PackageJsonPath),
            SdkLanguage.TypeScript or SdkLanguage.JavaScript when opts.PackageJsonPath is { } pj => new EngineInput.TypeScriptProject(null, pj),
            SdkLanguage.Java when opts.PomPath is { } pm => new EngineInput.JavaMavenProject(pm),
            SdkLanguage.Java when opts.GradlePath is { } gp => new EngineInput.JavaGradleProject(gp),
            SdkLanguage.Python when opts.ImportName is { } im => (EngineInput)new EngineInput.PythonPackage(im, sourceFolder),
            _ => (EngineInput)new EngineInput.SourceDirectory(sourceFolder)
        };

        // Warn when artifact options were provided but none matched the detected language
        ApiDiagnostic? warning = input is EngineInput.SourceDirectory
            ? new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Warning,
                Text = $"Artifact options were provided but none matched the detected language '{language}'. Falling back to source analysis."
            }
            : null;

        return (input, warning);
    }

    private static bool HasAnyArtifactOption(ArtifactOptions? opts)
        => opts is not null && (
            !string.IsNullOrWhiteSpace(opts.CsprojPath)
            || !string.IsNullOrWhiteSpace(opts.TsconfigPath)
            || !string.IsNullOrWhiteSpace(opts.PackageJsonPath)
            || !string.IsNullOrWhiteSpace(opts.PomPath)
            || !string.IsNullOrWhiteSpace(opts.GradlePath)
            || !string.IsNullOrWhiteSpace(opts.ImportName));

    private static EngineInput BuildEngineInputFromSdkInfo(SdkInfo sdkInfo, SdkLanguage language)
    {
        if (!string.IsNullOrWhiteSpace(sdkInfo.BuildFilePath))
        {
            var fileName = Path.GetFileName(sdkInfo.BuildFilePath);
            return language switch
            {
                SdkLanguage.DotNet when fileName.EndsWith(".csproj", StringComparison.OrdinalIgnoreCase) =>
                    new EngineInput.DotNetProject(sdkInfo.BuildFilePath),
                SdkLanguage.TypeScript or SdkLanguage.JavaScript when fileName.Equals("tsconfig.json", StringComparison.OrdinalIgnoreCase) =>
                    IsProjectReferencesOnlyTsconfig(sdkInfo.BuildFilePath)
                        ? new EngineInput.SourceDirectory(sdkInfo.SourceFolder)
                        : new EngineInput.TypeScriptProject(sdkInfo.BuildFilePath, null),
                SdkLanguage.TypeScript or SdkLanguage.JavaScript when fileName.Equals("package.json", StringComparison.OrdinalIgnoreCase) =>
                    new EngineInput.TypeScriptProject(null, sdkInfo.BuildFilePath),
                SdkLanguage.Java when fileName.Equals("pom.xml", StringComparison.OrdinalIgnoreCase) =>
                    new EngineInput.JavaMavenProject(sdkInfo.BuildFilePath),
                SdkLanguage.Java when (fileName.Equals("build.gradle", StringComparison.OrdinalIgnoreCase)
                    || fileName.Equals("build.gradle.kts", StringComparison.OrdinalIgnoreCase)) =>
                    new EngineInput.JavaGradleProject(sdkInfo.BuildFilePath),
                _ => new EngineInput.SourceDirectory(sdkInfo.SourceFolder)
            };
        }
        return new EngineInput.SourceDirectory(sdkInfo.SourceFolder);
    }

    /// <summary>
    /// Detects whether a tsconfig.json is a project-references root that doesn't compile
    /// source directly (has "references" array and "files": [] with no "include").
    /// Such configs should not be passed to the engine as artifact inputs.
    /// </summary>
    private static bool IsProjectReferencesOnlyTsconfig(string tsconfigPath)
    {
        try
        {
            var content = File.ReadAllText(tsconfigPath);
            using var doc = JsonDocument.Parse(content, new JsonDocumentOptions { AllowTrailingCommas = true, CommentHandling = JsonCommentHandling.Skip });
            var root = doc.RootElement;

            var hasReferences = root.TryGetProperty("references", out var refs)
                && refs.ValueKind == JsonValueKind.Array
                && refs.GetArrayLength() > 0;

            if (!hasReferences)
                return false;

            // "files": [] means this config compiles nothing directly
            var hasEmptyFiles = root.TryGetProperty("files", out var files)
                && files.ValueKind == JsonValueKind.Array
                && files.GetArrayLength() == 0;

            var hasInclude = root.TryGetProperty("include", out var include)
                && include.ValueKind == JsonValueKind.Array
                && include.GetArrayLength() > 0;

            return hasEmptyFiles && !hasInclude;
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException)
        {
            return false;
        }
    }

    public async Task<CoverageBatchResult> AnalyzeCoverageMonorepoAsync(
        string rootPath,
        string? samplesPath,
        string? language,
        IProgress<string>? progress,
        int maxParallelism = 1,
        CancellationToken ct = default)
    {
        if (!Directory.Exists(rootPath))
        {
            return new CoverageBatchResult
            {
                Success = false,
                ErrorCode = "ROOT_NOT_FOUND",
                ErrorMessage = $"Root path not found: {rootPath}",
                RootPath = rootPath,
            };
        }

        var packages = FindMonorepoPackages(rootPath).ToArray();
        if (packages.Length is 0)
        {
            return new CoverageBatchResult
            {
                Success = false,
                ErrorCode = "NO_PACKAGES_FOUND",
                ErrorMessage = "No SDK packages found under the monorepo root.",
                RootPath = rootPath,
            };
        }

        // Clamp parallelism: 1 = sequential, up to package count
        var effectiveParallelism = Math.Clamp(maxParallelism, 1, packages.Length);

        progress?.Report($"Found {packages.Length} packages under {rootPath}" +
            (effectiveParallelism > 1 ? $" (parallelism: {effectiveParallelism})" : ""));

        // Pre-allocate result slots so we can fill them from parallel tasks
        // while preserving the original package ordering in the output.
        var resultSlots = new CoverageBatchItem[packages.Length];
        var completed = 0;

        await Parallel.ForEachAsync(
            Enumerable.Range(0, packages.Length),
            new ParallelOptions
            {
                MaxDegreeOfParallelism = effectiveParallelism,
                CancellationToken = ct,
            },
            async (index, innerCt) =>
            {
                var packagePath = packages[index];
                var relativePath = Path.GetRelativePath(rootPath, packagePath).Replace("\\", "/", StringComparison.Ordinal);
                var samplesFolder = samplesPath;

                progress?.Report($"[{Interlocked.Increment(ref completed)}/{packages.Length}] {relativePath}: analyzing");

                if (string.IsNullOrWhiteSpace(samplesFolder))
                {
                    var samples = await DetectSamplesFolderAsync(packagePath, innerCt);
                    if (!samples.HasExistingSamples || string.IsNullOrWhiteSpace(samples.SamplesFolder))
                    {
                        progress?.Report($"  {relativePath}: skipped (no samples)");
                        resultSlots[index] = new CoverageBatchItem
                        {
                            PackagePath = packagePath,
                            RelativePath = relativePath,
                            SamplesFolder = samples.SamplesFolder,
                            SkippedNoSamples = true,
                            Success = true,
                        };
                        return;
                    }

                    samplesFolder = samples.SamplesFolder;
                }

                var analysis = await AnalyzeCoverageAsync(packagePath, samplesFolder, language, innerCt);
                if (!analysis.Success)
                {
                    progress?.Report($"  {relativePath}: failed ({analysis.ErrorCode})");
                    resultSlots[index] = new CoverageBatchItem
                    {
                        PackagePath = packagePath,
                        RelativePath = relativePath,
                        SamplesFolder = samplesFolder,
                        Success = false,
                        ErrorCode = analysis.ErrorCode,
                        ErrorMessage = analysis.ErrorMessage,
                    };
                    return;
                }

                progress?.Report($"  {relativePath}: {analysis.CoveredCount}/{analysis.TotalOperations} covered");
                resultSlots[index] = new CoverageBatchItem
                {
                    PackagePath = packagePath,
                    RelativePath = relativePath,
                    SamplesFolder = samplesFolder,
                    Success = true,
                    Result = analysis,
                };
            });

        // Aggregate stats from completed results
        var totalOperations = 0;
        var covered = 0;
        var uncovered = 0;
        var analyzed = 0;
        var skipped = 0;
        var failed = 0;

        foreach (var item in resultSlots)
        {
            if (item.SkippedNoSamples)
            {
                skipped++;
            }
            else if (!item.Success)
            {
                failed++;
            }
            else
            {
                analyzed++;
                totalOperations += item.Result!.TotalOperations;
                covered += item.Result!.CoveredCount;
                uncovered += item.Result!.UncoveredCount;
            }
        }

        var coveragePercent = totalOperations > 0
            ? (double)covered / totalOperations * 100.0
            : 0.0;

        return new CoverageBatchResult
        {
            Success = true,
            RootPath = rootPath,
            TotalPackages = packages.Length,
            AnalyzedPackages = analyzed,
            SkippedPackages = skipped,
            FailedPackages = failed,
            TotalOperations = totalOperations,
            CoveredCount = covered,
            UncoveredCount = uncovered,
            CoveragePercent = coveragePercent,
            Packages = resultSlots,
        };
    }

    /// <summary>
    /// Discovers SDK packages in a monorepo structure.
    /// Uses a smart, defensive approach that:
    /// 1. Searches multiple potential root directories (sdk/, packages/, libs/, src/, or root itself)
    /// 2. Identifies packages by language-specific project markers
    /// 3. Finds the package root by walking up from the project file
    /// 4. Filters out test projects, examples, and build artifacts using segment-based matching
    ///    (checks if any path segment equals a test/sample keyword, avoiding false positives
    ///    from names like "Attestation" or "TextAnalytics")
    /// 5. Uses SafeFileEnumerator.ExcludedFolders as the canonical excluded-folder set
    /// </summary>
    private static IEnumerable<string> FindMonorepoPackages(string rootPath)
    {
        // Track discovered packages to avoid duplicates
        var discovered = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // Use the canonical excluded-folder set from SafeFileEnumerator (issue #16)
        var skipDirs = SafeFileEnumerator.ExcludedFolders;

        // Path segments that indicate a test/sample project.
        // Uses exact segment matching (not substring) to avoid false positives
        // like "Attestation" (contains "test") or "TextAnalytics" (contains "test").
        var testSegments = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "test", "tests", "testing",
            "sample", "samples",
            "example", "examples",
            "demo", "demos",
            "benchmark", "benchmarks",
            "perf", "performance",
            "mock", "mocks",
            "fixture", "fixtures"
        };

        // Language-specific project file patterns
        var projectPatterns = new[]
        {
            "package.json",      // TypeScript/JavaScript
            "*.csproj",          // .NET C#
            "*.fsproj",          // .NET F#
            "pyproject.toml",    // Python (modern)
            "setup.py",          // Python (legacy)
            "go.mod",            // Go
            "pom.xml",           // Java Maven
            "build.gradle",      // Java Gradle
            "build.gradle.kts",  // Java Gradle Kotlin DSL
            "Cargo.toml",        // Rust
        };

        // Potential monorepo package roots to search
        List<string> searchRoots = [];

        // Check for common monorepo structures
        var sdkDir = Path.Combine(rootPath, "sdk");
        var packagesDir = Path.Combine(rootPath, "packages");
        var libsDir = Path.Combine(rootPath, "libs");
        var srcDir = Path.Combine(rootPath, "src");

        if (Directory.Exists(sdkDir))
            searchRoots.Add(sdkDir);
        if (Directory.Exists(packagesDir))
            searchRoots.Add(packagesDir);
        if (Directory.Exists(libsDir))
            searchRoots.Add(libsDir);

        // If none of the standard roots exist, search from the root itself
        if (searchRoots.Count is 0)
        {
            // Check if src/ contains multiple packages or is itself a package
            if (Directory.Exists(srcDir))
            {
                // If src/ has subdirectories with project files, treat src/ as monorepo root
                var srcSubdirs = Directory.GetDirectories(srcDir);
                if (srcSubdirs.Length > 1)
                    searchRoots.Add(srcDir);
            }

            // Fall back to root path
            if (searchRoots.Count is 0)
                searchRoots.Add(rootPath);
        }

        foreach (var searchRoot in searchRoots)
        {
            foreach (var pattern in projectPatterns)
            {
                // Use SafeFileEnumerator for depth-limited, excluded-folder-aware enumeration
                IEnumerable<string> projectFiles;
                try
                {
                    projectFiles = SafeFileEnumerator.EnumerateFiles(searchRoot, pattern, maxFiles: 5000, maxDepth: 6);
                }
                catch (Exception)
                {
                    // Permission denied or other IO error - skip this pattern
                    continue;
                }

                foreach (var projectFile in projectFiles)
                {
                    // Check path segments for test/sample patterns using exact segment matching
                    var relativePath = Path.GetRelativePath(searchRoot, projectFile);
                    var pathSegments = relativePath.Split(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);

                    // Skip if any segment is an excluded directory (redundant with SafeFileEnumerator
                    // but guards against edge cases like the root itself being named "test")
                    if (pathSegments.Any(seg => skipDirs.Contains(seg)))
                        continue;

                    // Skip test/sample projects by checking if any path segment exactly matches
                    // a test keyword. This avoids false positives from substring matches like
                    // "Attestation" containing "test" or "Performance" containing "perf".
                    if (IsTestOrSampleProject(pathSegments, testSegments))
                    {
                        continue;
                    }

                    // Find the package root directory
                    var packageDir = FindPackageRoot(projectFile, searchRoot, pattern);
                    if (packageDir is null || discovered.Contains(packageDir))
                        continue;

                    // Validate it's a real package directory
                    if (!Directory.Exists(packageDir))
                        continue;

                    // Skip if it's the search root itself (avoid treating entire repo as one package)
                    if (string.Equals(packageDir, searchRoot, StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(packageDir, rootPath, StringComparison.OrdinalIgnoreCase))
                    {
                        continue;
                    }

                    discovered.Add(packageDir);
                    yield return packageDir;
                }
            }
        }
    }

    /// <summary>
    /// Determines if a project is a test/sample project by checking if any path segment
    /// (directory name or file name without extension) exactly matches a known test keyword.
    /// This avoids false positives from substring matching (e.g., "Attestation" does not match "test").
    /// </summary>
    private static bool IsTestOrSampleProject(string[] pathSegments, HashSet<string> testSegments)
    {
        foreach (var segment in pathSegments)
        {
            // Strip file extension for the last segment (the file name)
            var name = Path.GetExtension(segment).Length > 0
                ? Path.GetFileNameWithoutExtension(segment)
                : segment;

            // Check if the segment exactly matches a test keyword
            if (testSegments.Contains(name))
                return true;

            // Also check if the segment ends with a test suffix (e.g., "MyProject.Tests", "sdk-test")
            // Split on common separators and check each part
            var parts = name.Split('.', '-', '_');
            foreach (var part in parts)
            {
                if (testSegments.Contains(part))
                    return true;
            }
        }
        return false;
    }

    /// <summary>
    /// Finds the package root directory from a project file.
    /// Walks up from the project file to find the logical package boundary.
    /// </summary>
    private static string? FindPackageRoot(string projectFile, string searchRoot, string pattern)
    {
        var projectDir = Path.GetDirectoryName(projectFile);
        if (projectDir is null)
            return null;

        // For most project types, the project file is at the package root
        // Exception: .NET projects are often in src/ subdirectory
        if (pattern.EndsWith(".csproj", StringComparison.Ordinal) || pattern.EndsWith(".fsproj", StringComparison.Ordinal))
        {
            // Check if we're in a src/ subdirectory
            var parentDir = Path.GetDirectoryName(projectDir);
            if (parentDir != null)
            {
                var parentName = Path.GetFileName(projectDir);
                if (string.Equals(parentName, "src", StringComparison.OrdinalIgnoreCase))
                {
                    // The package root is one level up from src/
                    return parentDir;
                }
            }
        }

        // For package.json, check if this is a workspace root using JSON parsing
        if (pattern == "package.json")
        {
            try
            {
                using var doc = System.Text.Json.JsonDocument.Parse(File.ReadAllBytes(projectFile));
                var rootObj = doc.RootElement;

                // Skip workspace root package.json files that don't export anything
                var hasWorkspaces = rootObj.TryGetProperty("workspaces", out _);
                var isPrivate = rootObj.TryGetProperty("private", out var privateProp) &&
                                privateProp.ValueKind == System.Text.Json.JsonValueKind.True;

                if (hasWorkspaces || isPrivate)
                {
                    // Could be a workspace root — check if it has meaningful library exports
                    var hasMain = rootObj.TryGetProperty("main", out _);
                    var hasExports = rootObj.TryGetProperty("exports", out _);
                    var hasTypes = rootObj.TryGetProperty("types", out _) ||
                                   rootObj.TryGetProperty("typings", out _);
                    var hasModule = rootObj.TryGetProperty("module", out _);

                    if (!hasMain && !hasExports && !hasTypes && !hasModule)
                    {
                        return null;
                    }
                }
            }
            catch
            {
                // Ignore parse/read errors — treat as non-workspace
            }
        }

        // The project directory is the package root
        return projectDir;
    }
}

/// <summary>Result of source folder detection.</summary>
public sealed record SourceFolderResult
{
    public required string SourceFolder { get; init; }
    public string? Language { get; init; }
    public string? LanguageName { get; init; }
    public string? FileExtension { get; init; }
    public required string RootPath { get; init; }
    public required string SdkName { get; init; }
    public bool IsValid { get; init; }
}

/// <summary>Result of samples folder detection.</summary>
public sealed record SamplesFolderResult
{
    public string? SamplesFolder { get; init; }
    public required string SuggestedSamplesFolder { get; init; }
    public required string[] AllCandidates { get; init; }
    public bool HasExistingSamples { get; init; }
    public string? Language { get; init; }
    public required string RootPath { get; init; }
}

/// <summary>Result of API graphing.</summary>
public sealed record ApiGraphResult
{
    public required bool Success { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
    public string? SourceFolder { get; init; }
    public string? Language { get; init; }
    public string? Package { get; init; }
    public string? ApiSurface { get; init; }
    public string? Format { get; init; }
    public ApiDiagnostic[]? Diagnostics { get; init; }
}

/// <summary>Result of coverage analysis.</summary>
public sealed record CoverageAnalysisResult
{
    public required bool Success { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
    public string? SourceFolder { get; init; }
    public string? SamplesFolder { get; init; }
    public string? Language { get; init; }
    public int TotalOperations { get; init; }
    public int CoveredCount { get; init; }
    public int UncoveredCount { get; init; }
    public double CoveragePercent { get; init; }
    public CoveredOperationInfo[]? CoveredOperations { get; init; }
    public UncoveredOperationInfo[]? UncoveredOperations { get; init; }
}

/// <summary>Result of monorepo coverage analysis.</summary>
public sealed record CoverageBatchResult
{
    public required bool Success { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
    public string? RootPath { get; init; }
    public int TotalPackages { get; init; }
    public int AnalyzedPackages { get; init; }
    public int SkippedPackages { get; init; }
    public int FailedPackages { get; init; }
    public int TotalOperations { get; init; }
    public int CoveredCount { get; init; }
    public int UncoveredCount { get; init; }
    public double CoveragePercent { get; init; }
    public CoverageBatchItem[]? Packages { get; init; }
}

/// <summary>Per-package coverage analysis result.</summary>
public sealed record CoverageBatchItem
{
    public required string PackagePath { get; init; }
    public required string RelativePath { get; init; }
    public string? SamplesFolder { get; init; }
    public bool SkippedNoSamples { get; init; }
    public bool Success { get; init; }
    public string? ErrorCode { get; init; }
    public string? ErrorMessage { get; init; }
    public CoverageAnalysisResult? Result { get; init; }
}

/// <summary>A covered API operation.</summary>
public sealed record CoveredOperationInfo
{
    public required string ClientType { get; init; }
    public required string Operation { get; init; }
    public required string File { get; init; }
    public required int Line { get; init; }
}

/// <summary>An uncovered API operation.</summary>
public sealed record UncoveredOperationInfo
{
    public required string ClientType { get; init; }
    public required string Operation { get; init; }
    public required string Signature { get; init; }
}

/// <summary>
/// Source-generated JSON context for package info result types.
/// Used by CLI commands and MCP tools for serialization.
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    WriteIndented = true)]
[JsonSerializable(typeof(SourceFolderResult))]
[JsonSerializable(typeof(SamplesFolderResult))]
[JsonSerializable(typeof(ApiGraphResult))]
[JsonSerializable(typeof(CoverageAnalysisResult))]
[JsonSerializable(typeof(CoverageBatchResult))]
[JsonSerializable(typeof(CoverageBatchItem))]
[JsonSerializable(typeof(CoveredOperationInfo[]))]
[JsonSerializable(typeof(UncoveredOperationInfo[]))]
[JsonSerializable(typeof(ApiDiagnostic[]))]
public sealed partial class PackageInfoJsonContext : JsonSerializerContext
{
}
