// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Frozen;
using System.Text.Json;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Unified SDK detection: language, source folder, and samples folder in one scan.
/// This is the single source of truth for SDK structure detection.
/// </summary>
public class SdkInfo
{
    /// <summary>
    /// Maximum number of SDK paths to cache. Prevents memory leaks when scanning many directories.
    /// </summary>
    public const int MaxCacheSize = 100;

    private static readonly LruCache<string, Lazy<SdkInfo>> _cache = new(MaxCacheSize, StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// All source file extensions recognized by the detection system.
    /// Used as a fallback when the language is not yet known.
    /// </summary>
    private static readonly FrozenSet<string> AllSourceExtensions =
        FrozenSet.ToFrozenSet([".cs", ".py", ".java", ".ts", ".js", ".go"], StringComparer.OrdinalIgnoreCase);

    // Samples folder candidates in priority order (searched at root and one level deep)
    private static readonly string[] SamplesFolderPatterns =
    [
        "samples",
        "examples",
        "example",
        "sample",
        "demo",
        "demos",
        "quickstarts",
        "tests/samples",
        "docs/samples",
        "*-example",     // For patterns like openai-java-example
        "*-examples",    // For patterns like sdk-examples
        "*-samples"      // For patterns like sdk-samples
    ];

    /// <summary>
    /// Build marker specifications for each language.
    /// <para>
    /// Each specification defines:
    /// - <b>BuildFilePatterns:</b> File patterns that identify a project (e.g., *.csproj, pom.xml)
    /// </para>
    /// <para>
    /// <b>Detection algorithm:</b>
    /// 1. Recursively find ALL build markers in the SDK
    /// 2. For each build marker, parse its contents for explicit source path configuration
    ///    (e.g., pyproject.toml's [tool.setuptools.packages.find] where, pom.xml's sourceDirectory)
    /// 3. If no explicit config, use the build marker's directory as the source folder
    /// 4. Rank projects by source file count (main project has most code)
    /// </para>
    /// </summary>
    private static readonly LanguageSpec[] LanguageSpecs =
    [
        new(SdkLanguage.DotNet, "dotnet", ".cs",
            ["*.csproj"],  // Note: .sln is metadata, .csproj is the actual project marker
            "examples"),

        new(SdkLanguage.Python, "python", ".py",
            ["pyproject.toml", "setup.py"],
            "examples"),

        new(SdkLanguage.Java, "java", ".java",
            ["pom.xml", "build.gradle", "build.gradle.kts"],
            "examples"),

        new(SdkLanguage.TypeScript, "typescript", ".ts",
            ["tsconfig.json"],
            "examples"),

        new(SdkLanguage.JavaScript, "javascript", ".js",
            ["package.json"],
            "examples"),

        new(SdkLanguage.Go, "go", ".go",
            ["go.mod"],
            "examples")
    ];

    /// <summary>
    /// Represents a discovered build marker in the SDK.
    /// </summary>
    private sealed record BuildMarker(
        string BuildFilePath,       // Full path to build file (e.g., /sdk/src/OpenAI.csproj)
        string ProjectRoot,         // Directory containing build file
        LanguageSpec Spec           // Language specification
    );

    /// <summary>
    /// Language specification for build marker detection.
    /// </summary>
    private sealed record LanguageSpec(
        SdkLanguage LanguageEnum,
        string Name,
        string FileExtension,
        string[] BuildFilePatterns,     // Patterns to find build markers
        string DefaultSamplesFolderName
    );

    /// <summary>
    /// Folders to exclude from source and samples enumeration.
    /// These are typically build artifacts, dependencies, or version control folders
    /// that should never be scanned (e.g., node_modules can contain 100K+ files).
    /// </summary>
    /// <remarks>Delegates to <see cref="SafeFileEnumerator.ExcludedFolders"/>.</remarks>
    public static FrozenSet<string> ExcludedFolders => SafeFileEnumerator.ExcludedFolders;

    /// <summary>
    /// Safe enumeration options that skip excluded folders.
    /// Use this when enumerating files to avoid scanning node_modules, .git, etc.
    /// </summary>
    /// <remarks>Delegates to <see cref="SafeFileEnumerator.SafeEnumerationOptions"/>.</remarks>
    public static EnumerationOptions SafeEnumerationOptions => SafeFileEnumerator.SafeEnumerationOptions;

    /// <summary>
    /// Safely enumerates files in a directory, skipping excluded folders like node_modules.
    /// This is the preferred method for file enumeration to avoid performance issues.
    /// </summary>
    /// <remarks>Delegates to <see cref="SafeFileEnumerator.EnumerateFiles"/>.</remarks>
    public static IEnumerable<string> EnumerateFilesSafely(
        string directory,
        string searchPattern = "*.*",
        int maxFiles = 10000) => SafeFileEnumerator.EnumerateFiles(directory, searchPattern, maxFiles);

    /// <summary>
    /// Safely counts files matching a pattern, skipping excluded folders.
    /// </summary>
    /// <remarks>Delegates to <see cref="SafeFileEnumerator.CountFiles"/>.</remarks>
    public static int CountFilesSafely(string directory, string searchPattern = "*.*", int maxCount = 10000)
        => SafeFileEnumerator.CountFiles(directory, searchPattern, maxCount);

    /// <summary>Root path of the SDK.</summary>
    public string RootPath { get; }

    /// <summary>Name of the SDK (derived from folder name).</summary>
    public string SdkName { get; }

    /// <summary>Detected language enum, or null if unknown.</summary>
    public SdkLanguage? Language { get; }

    /// <summary>Language name (e.g., "dotnet", "python").</summary>
    public string? LanguageName { get; }

    /// <summary>Primary file extension for this language.</summary>
    public string? FileExtension { get; }

    /// <summary>Path to the source code folder.</summary>
    public string SourceFolder { get; }

    /// <summary>
    /// Path to the primary build marker used for this SDK (e.g., .csproj, pom.xml, tsconfig.json).
    /// </summary>
    public string? BuildFilePath { get; }

    /// <summary>Path to existing samples folder, if found.</summary>
    public string? SamplesFolder { get; }

    /// <summary>Suggested path for samples folder (existing or default).</summary>
    public string SuggestedSamplesFolder { get; }

    /// <summary>All detected samples folder candidates.</summary>
    public IReadOnlyList<string> AllSamplesCandidates { get; }

    /// <summary>
    /// The library/package name graphed from build markers (e.g., "my-storage-sdk"
    /// from pyproject.toml, "@example/package" from package.json). Null if not determined.
    /// </summary>
    public string? LibraryName { get; }

    /// <summary>Whether the SDK was successfully detected.</summary>
    public bool IsValid => Language != null || SourceFolder != RootPath;

    private SdkInfo(
        string rootPath,
        SdkLanguage? language,
        string? languageName,
        string? fileExtension,
        string sourceFolder,
        string? buildFilePath,
        string? samplesFolder,
        string defaultSamplesFolderName,
        List<string> allSamplesCandidates,
        string? libraryName)
    {
        RootPath = rootPath;
        SdkName = Path.GetFileName(rootPath);
        Language = language;
        LanguageName = languageName;
        FileExtension = fileExtension;
        SourceFolder = sourceFolder;
        BuildFilePath = buildFilePath;
        SamplesFolder = samplesFolder;
        SuggestedSamplesFolder = samplesFolder ?? Path.Combine(rootPath, defaultSamplesFolderName);
        AllSamplesCandidates = allSamplesCandidates.AsReadOnly();
        LibraryName = libraryName;
    }

    /// <summary>
    /// Minimum allowed path length to prevent scanning root-level directories.
    /// On Windows: C:\ = 3 chars; on Unix: / = 1 char.
    /// We require at least 4 chars to ensure we're not at filesystem root.
    /// </summary>
    private const int MinPathLength = 4;

    /// <summary>
    /// Maximum build marker file size to read (10 MB). Guards against OOM from
    /// maliciously large or symlinked files.
    /// </summary>
    private const long MaxBuildFileSize = 10 * 1024 * 1024;



    /// <summary>Gradle build file names for group-ID parsing.</summary>
    private static readonly string[] GradleBuildFiles = ["build.gradle", "build.gradle.kts"];

    /// <summary>package.json fields to probe for source folder hints.</summary>
    private static readonly string[] PackageJsonSourceFields = ["main", "module", "source"];

    /// <summary>
    /// Paths that should never be scanned directly (but subdirectories may be allowed).
    /// These are system directories that could cause performance issues or security risks.
    /// </summary>
    private static readonly FrozenSet<string> BlockedRootPaths = FrozenSet.ToFrozenSet(
    [
        "/",
        "/bin",
        "/boot",
        "/dev",
        "/etc",
        "/lib",
        "/lib64",
        "/proc",
        "/root",
        "/sbin",
        "/sys",
        "/usr",
        "/var",
        "C:\\",
        "C:\\Windows",
        "C:\\Program Files",
        "C:\\Program Files (x86)",
        "C:\\ProgramData"
    ], StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// Validates that a path is safe to scan and returns its canonicalized form.
    /// Throws ArgumentException if the path is invalid or dangerous.
    /// </summary>
    /// <param name="path">The path to validate.</param>
    /// <returns>The canonicalized (fully-qualified) path.</returns>
    /// <exception cref="ArgumentException">Thrown if the path is unsafe to scan.</exception>
    private static string ValidateScanPath(string path)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(path);

        // Canonicalize the path
        var fullPath = Path.GetFullPath(path);

        // Check minimum length to prevent root scanning
        if (fullPath.Length < MinPathLength)
            throw new ArgumentException(
                $"Path '{fullPath}' is too short. SDK path must be at least {MinPathLength} characters to prevent root-level scanning.",
                nameof(path));

        // Check for blocked root paths (only exact match, not subdirectories)
        // This blocks scanning "/" or "/usr" directly, but allows "/tmp/myproject" or "/home/user/sdk"
        var normalizedPath = fullPath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        if (BlockedRootPaths.Contains(normalizedPath))
        {
            throw new ArgumentException(
                $"Scanning system directory '{fullPath}' is not allowed for security and performance reasons.",
                nameof(path));
        }

        return fullPath;
    }

    /// <summary>
    /// Scans the SDK root and returns detection results.
    /// Results are cached by path.
    /// </summary>
    /// <exception cref="ArgumentException">Thrown if the path is invalid or unsafe to scan.</exception>
    public static SdkInfo Scan(string sdkRoot)
    {
        // SECURITY: Validate path before scanning (also canonicalizes)
        sdkRoot = ValidateScanPath(sdkRoot);
        return _cache.GetOrAdd(sdkRoot, path => new Lazy<SdkInfo>(() => ScanInternal(path))).Value;
    }

    /// <summary>
    /// Asynchronously scans the SDK root and returns detection results.
    /// Uses Task.Run to offload I/O-bound work from the calling thread.
    /// Results are cached by path.
    /// </summary>
    /// <remarks>
    /// The <paramref name="ct"/> token prevents the scan from <em>starting</em> on the thread pool
    /// if cancelled before execution begins, but it does <b>not</b> interrupt an already-running
    /// <see cref="ScanInternal"/> call. For most SDK directories the scan completes in milliseconds,
    /// so cooperative cancellation inside the scan is unnecessary.
    /// </remarks>
    /// <exception cref="ArgumentException">Thrown if the path is invalid or unsafe to scan.</exception>
    public static async ValueTask<SdkInfo> ScanAsync(string sdkRoot, CancellationToken ct = default)
    {
        // SECURITY: Validate path before scanning (also canonicalizes)
        sdkRoot = ValidateScanPath(sdkRoot);
        var lazy = _cache.GetOrAdd(sdkRoot, path => new Lazy<SdkInfo>(() => ScanInternal(path)));

        // If already computed, return immediately
        if (lazy.IsValueCreated)
            return lazy.Value;

        // Otherwise, run on thread pool to avoid blocking
        return await Task.Run(() => lazy.Value, ct).ConfigureAwait(false);
    }

    /// <summary>
    /// Clears the detection cache.
    /// </summary>
    /// <remarks>
    /// The cache is keyed by path and never automatically invalidates on filesystem changes.
    /// If files are added/removed after scanning (e.g., via <c>git checkout</c>), stale results
    /// will be returned until this method is called. Callers that need fresh results after
    /// filesystem mutations should call <see cref="ClearCache"/> first.
    /// </remarks>
    public static void ClearCache() => _cache.Clear();

    /// <summary>
    /// Detects just the language without full folder scanning.
    /// Faster than full Scan() when you only need the language.
    /// </summary>
    /// <exception cref="ArgumentException">Thrown if the path is invalid or unsafe to scan.</exception>
    public static SdkLanguage? DetectLanguage(string sdkRoot)
    {
        if (!Directory.Exists(sdkRoot))
            return null;

        // SECURITY: Apply the same validation as Scan() (also canonicalizes)
        sdkRoot = ValidateScanPath(sdkRoot);

        // Check cache first
        if (_cache.TryGetValue(sdkRoot, out var cached) && cached is not null)
            return cached.Value.Language;

        // Quick detection: check root and one level deep for build markers
        foreach (var spec in LanguageSpecs)
        {
            if (HasBuildMarkerShallow(sdkRoot, spec.BuildFilePatterns))
            {
                var resolved = ResolveLanguageSpec(sdkRoot, spec);
                return resolved?.LanguageEnum;
            }
        }

        return null;
    }

    /// <summary>
    /// Checks whether any of the given build-file patterns exist at root or one level deep.
    /// Used for quick language detection without full recursive scan.
    /// </summary>
    private static bool HasBuildMarkerShallow(string root, string[] patterns)
    {
        foreach (var pattern in patterns)
        {
            // Check root
            if (pattern.Contains('*'))
            {
                try
                {
                    if (Directory.EnumerateFiles(root, pattern).Any())
                        return true;
                }
                catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
            }
            else if (File.Exists(Path.Combine(root, pattern)))
            {
                return true;
            }

            // Check one level deep
            try
            {
                foreach (var subdir in Directory.EnumerateDirectories(root))
                {
                    if (ExcludedFolders.Contains(Path.GetFileName(subdir)))
                        continue;

                    if (pattern.Contains('*'))
                    {
                        if (Directory.EnumerateFiles(subdir, pattern).Any())
                            return true;
                    }
                    else if (File.Exists(Path.Combine(subdir, pattern)))
                    {
                        return true;
                    }
                }
            }
            catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
        }

        return false;
    }

    /// <summary>
    /// Checks for tsconfig.json at root or in immediate subdirectories.
    /// </summary>
    private static bool HasTsConfig(string root)
    {
        if (File.Exists(Path.Combine(root, "tsconfig.json")))
            return true;

        // Check immediate subdirectories (for monorepo patterns)
        try
        {
            foreach (var dir in Directory.EnumerateDirectories(root))
            {
                if (ExcludedFolders.Contains(Path.GetFileName(dir)))
                    continue;
                if (File.Exists(Path.Combine(dir, "tsconfig.json")))
                    return true;
            }
        }
        catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }

        return false;
    }

    /// <summary>
    /// Validates that a package.json at <paramref name="root"/> represents a library
    /// or JS/TS project, not purely a tooling configuration file.
    /// <para>
    /// Returns false only when the package.json is explicitly marked as private AND lacks
    /// any library-export fields ("main", "exports", "module", "types", "typings").
    /// This conservatively avoids rejecting legitimate JS projects that simply don't
    /// declare "main" (e.g., those using module.exports in source files).
    /// </para>
    /// </summary>
    private static bool IsLibraryPackageJson(string root)
    {
        var packageJsonPath = Path.Combine(root, "package.json");
        if (!File.Exists(packageJsonPath))
            return true; // No package.json to validate

        // Guard against excessively large files
        if (!IsFileSafeToRead(packageJsonPath))
            return true; // Can't validate — benefit of the doubt

        try
        {
            using var doc = JsonDocument.Parse(File.ReadAllBytes(packageJsonPath));
            var rootObj = doc.RootElement;

            // Only reject if explicitly private with no library exports
            var isPrivate = rootObj.TryGetProperty("private", out var privateProp) &&
                            privateProp.ValueKind == JsonValueKind.True;

            if (!isPrivate)
                return true; // Not private — treat as library

            // Private package — check for library exports
            return rootObj.TryGetProperty("main", out _) ||
                   rootObj.TryGetProperty("exports", out _) ||
                   rootObj.TryGetProperty("module", out _) ||
                   rootObj.TryGetProperty("types", out _) ||
                   rootObj.TryGetProperty("typings", out _);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException)
        {
            return true; // Parse failure — benefit of the doubt
        }
    }

    private static SdkInfo ScanInternal(string root)
    {
        using var activity = Telemetry.SdkChatTelemetry.StartScan(root);
        try
        {
            // Detect language and source folder
            var (sourceFolder, languageEnum, languageName, fileExt, detectedPattern, buildFilePath) = DetectSourceFolder(root);

            // Extract library name for import-based samples detection
            string? libraryName = languageEnum.HasValue
                ? ExtractLibraryName(root, languageEnum.Value)
                : null;

            // Detect samples folders, scoring by import count when library name is known,
            // falling back to source-file count when it's not
            var (samplesFolder, allCandidates) = DetectSamplesFolder(root, fileExt, libraryName, languageEnum);

            // Determine language-aware default samples folder name
            var defaultSamplesName = detectedPattern?.DefaultSamplesFolderName ?? "examples";

            var result = new SdkInfo(
                rootPath: root,
                language: languageEnum,
                languageName: languageName,
                fileExtension: fileExt,
                sourceFolder: sourceFolder,
                buildFilePath: buildFilePath,
                samplesFolder: samplesFolder,
                defaultSamplesFolderName: defaultSamplesName,
                allSamplesCandidates: allCandidates,
                libraryName: libraryName
            );

            activity?.SetTag("sdk.language", languageName ?? "unknown");
            activity?.SetTag("sdk.has_samples", samplesFolder != null);
            activity?.SetTag("sdk.source_folder", sourceFolder);
            activity?.SetTag("sdk.samples_folder", samplesFolder ?? "(none)");
            activity?.SetTag("sdk.samples_candidates", allCandidates.Count);
            activity?.SetTag("sdk.library_name", libraryName ?? "(unknown)");

            return result;
        }
        catch (Exception ex) when (ex is UnauthorizedAccessException or IOException)
        {
            Telemetry.SdkChatTelemetry.RecordError(activity, ex);
            // Return minimal info if we can't access the directory
            return new SdkInfo(
                rootPath: root,
                language: null,
                languageName: null,
                fileExtension: null,
                sourceFolder: root,
                buildFilePath: null,
                samplesFolder: null,
                defaultSamplesFolderName: "examples",
                allSamplesCandidates: [],
                libraryName: null
            );
        }
    }

    private static (string SourceFolder, SdkLanguage? Language, string? LanguageName, string? FileExt, LanguageSpec? Spec, string? BuildFilePath) DetectSourceFolder(string root)
    {
        // Step 1: Find ALL build markers in the SDK (recursive scan)
        var markers = FindAllBuildMarkers(root);

        if (markers.Count is 0)
        {
            // No build markers found - return root with no language detected
            return (root, null, null, null, null, null);
        }

        // Step 2: For each marker, resolve the actual language (handle disambiguation)
        // and calculate source folder + file count
        List<(BuildMarker Marker, string SourceFolder, int FileCount, LanguageSpec ResolvedSpec)> projects = [];

        foreach (var marker in markers)
        {
            // Resolve language disambiguation (e.g., TypeScript vs JavaScript)
            var resolvedSpec = ResolveLanguageSpec(marker.ProjectRoot, marker.Spec);

            // Skip if disambiguation returned null (e.g., package.json without library markers)
            if (resolvedSpec == null)
                continue;

            // Find the best source folder relative to this project's build marker
            // Pass the build file path so we can parse its contents for explicit source configuration
            var (sourceFolder, fileCount) = FindSourceFolderForProject(marker.ProjectRoot, resolvedSpec, marker.BuildFilePath);

            if (fileCount > 0)
            {
                projects.Add((marker, sourceFolder, fileCount, resolvedSpec));
            }
        }

        if (projects.Count is 0)
        {
            // Build markers found but no source files - return root with no language detected
            return (root, null, null, null, null, null);
        }

        // Step 3: Rank projects, preferring root-level projects over those nested under
        // samples/test/docs directories (which are auxiliary, not the main SDK source).
        // Only fall back to nested projects when no root-level project has source files.
        var rootProjects = projects.Where(p => !IsNestedUnderNonSourceAncestor(p.Marker.ProjectRoot, root)).ToList();
        var mainProject = (rootProjects.Count > 0 ? rootProjects : projects).MaxBy(p => p.FileCount);

        return (
            mainProject.SourceFolder,
            mainProject.ResolvedSpec.LanguageEnum,
            mainProject.ResolvedSpec.Name,
            mainProject.ResolvedSpec.FileExtension,
            mainProject.ResolvedSpec,
            mainProject.Marker.BuildFilePath
        );
    }

    /// <summary>
    /// Maximum directory depth for build marker scanning.
    /// Matches <see cref="SafeFileEnumerator"/>'s default to maintain consistent bounded enumeration.
    /// </summary>
    private const int MaxBuildMarkerScanDepth = 10;

    /// <summary>
    /// Recursively finds all build markers in the SDK.
    /// Returns a list of discovered build markers with their project roots and language specs.
    /// </summary>
    private static List<BuildMarker> FindAllBuildMarkers(string root)
    {
        List<BuildMarker> markers = [];

        // Scan recursively for build markers, skipping excluded folders
        // Track (path, depth) to enforce a bounded scan consistent with SafeFileEnumerator
        Queue<(string Path, int Depth)> dirsToScan = [];
        dirsToScan.Enqueue((root, 0));

        // Track visited directories by canonical path to prevent symlink cycles
        var visited = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            GetCanonicalPath(root)
        };

        while (dirsToScan.Count > 0)
        {
            var (currentDir, depth) = dirsToScan.Dequeue();

            try
            {
                // Check for build markers in current directory
                foreach (var spec in LanguageSpecs)
                {
                    foreach (var pattern in spec.BuildFilePatterns)
                    {
                        IEnumerable<string> matchingFiles;

                        if (pattern.Contains('*'))
                        {
                            // Glob pattern (e.g., *.csproj)
                            try
                            {
                                matchingFiles = Directory.EnumerateFiles(currentDir, pattern);
                            }
                            catch (Exception ex) when (ex is UnauthorizedAccessException or IOException)
                            {
                                continue;
                            }
                        }
                        else
                        {
                            // Exact file name
                            var exactPath = Path.Combine(currentDir, pattern);
                            matchingFiles = File.Exists(exactPath) ? [exactPath] : [];
                        }

                        foreach (var buildFile in matchingFiles)
                        {
                            markers.Add(new BuildMarker(buildFile, currentDir, spec));
                        }
                    }
                }

                // Enqueue subdirectories (skip excluded folders, symlink cycles, and depth limit)
                if (depth < MaxBuildMarkerScanDepth)
                {
                    foreach (var subdir in Directory.EnumerateDirectories(currentDir))
                    {
                        var name = Path.GetFileName(subdir);
                        if (!ExcludedFolders.Contains(name))
                        {
                            var canonical = GetCanonicalPath(subdir);
                            if (visited.Add(canonical))
                            {
                                dirsToScan.Enqueue((subdir, depth + 1));
                            }
                        }
                    }
                }
            }
            catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
        }

        return markers;
    }

    /// <summary>
    /// Returns a canonical path for symlink cycle detection.
    /// Resolves symlinks on supported platforms; falls back to GetFullPath on others.
    /// </summary>
    private static string GetCanonicalPath(string path) => SafeFileEnumerator.GetCanonicalPath(path);

    /// <summary>
    /// Resolves the actual language specification, handling disambiguation.
    /// For example, when package.json is found, checks for tsconfig.json to determine TypeScript.
    /// Returns null if the build marker should be skipped (e.g., tooling-only package.json).
    /// </summary>
    private static LanguageSpec? ResolveLanguageSpec(string projectRoot, LanguageSpec spec)
    {
        if (spec.LanguageEnum == SdkLanguage.JavaScript)
        {
            // Check for tsconfig.json at project root or one level deep
            if (HasTsConfig(projectRoot))
            {
                return LanguageSpecs.First(s => s.LanguageEnum == SdkLanguage.TypeScript);
            }

            // Validate package.json is a library, not just tooling config
            if (!IsLibraryPackageJson(projectRoot))
            {
                return null; // Skip this marker
            }
        }

        return spec;
    }

    /// <summary>
    /// Finds the source folder for a project based on the build marker.
    /// Returns the source folder path and its file count.
    /// </summary>
    /// <remarks>
    /// <b>Strategy:</b>
    /// 1. Parse the build marker file for explicit source path configuration
    ///    (e.g., pyproject.toml's [tool.setuptools.packages.find] where, pom.xml's sourceDirectory)
    /// 2. Build markers with spec defaults (Maven's src/main/java, Gradle's src/main/java)
    ///    return the default if it exists, or null if it doesn't
    /// 3. For build markers without spec defaults (Go, Python without explicit config),
    ///    scan conventional source folders
    /// </remarks>
    private static (string SourceFolder, int FileCount) FindSourceFolderForProject(string projectRoot, LanguageSpec spec, string? buildFilePath = null)
    {
        // Step 1: Try to parse explicit source path (or spec default) from build marker
        if (buildFilePath != null)
        {
            var explicitSource = TryParseSourceFromBuildMarker(buildFilePath, projectRoot, spec);
            if (explicitSource != null && Directory.Exists(explicitSource))
            {
                var count = CountSourceFiles(explicitSource, spec.FileExtension);
                // For Java (Maven/Gradle), if the spec default exists, use it even if empty
                // This prevents parent POMs from claiming child module files
                if (count > 0 || IsJavaBuildMarker(buildFilePath))
                {
                    return (explicitSource, count);
                }
            }
            // For Java, if src/main/java doesn't exist, this project has no source
            // (it's likely a parent POM or aggregator project)
            if (IsJavaBuildMarker(buildFilePath))
            {
                return (projectRoot, 0);
            }
        }

        // Step 2: For languages without spec defaults (Go, Python, etc.),
        // scan conventional source folders
        var conventionalFolders = GetConventionalSourceFolders(spec.LanguageEnum);
        string? bestFolder = null;
        int bestCount = 0;

        // First-match strategy: if a folder spec finds files, it wins
        // Go: root package is the main code; subfolders are supporting
        // .NET: if csproj is at root, src/ should win over root; if csproj is in src/, src itself should win
        var useFirstMatch = spec.LanguageEnum == SdkLanguage.Go
                         || spec.LanguageEnum == SdkLanguage.DotNet;

        foreach (var folderSpec in conventionalFolders)
        {
            IEnumerable<string> candidates;
            bool isRootSpec = folderSpec == ".";

            if (isRootSpec)
            {
                candidates = [projectRoot];
            }
            else if (folderSpec.Contains('*'))
            {
                candidates = ExpandSourceFolderGlob(projectRoot, folderSpec);
            }
            else
            {
                var candidate = Path.Combine(projectRoot, folderSpec);
                candidates = Directory.Exists(candidate) ? [candidate] : [];
            }

            // Track the best within this spec (for first-match strategy)
            string? specBest = null;
            int specBestCount = 0;

            foreach (var candidate in candidates)
            {
                if (!Directory.Exists(candidate))
                    continue;

                // Counting strategy:
                // - Go: always shallow (Go packages are per-directory)
                // - .NET: always recursive (files can be in any subfolder like Generated/, Models/)
                // - Others: shallow for root "." to avoid claiming subdirectory files
                var useShallow = spec.LanguageEnum == SdkLanguage.Go
                              || (isRootSpec && spec.LanguageEnum != SdkLanguage.DotNet);
                var count = useShallow
                    ? CountSourceFilesShallow(candidate, spec.FileExtension)
                    : CountSourceFiles(candidate, spec.FileExtension);

                if (count > specBestCount)
                {
                    specBest = candidate;
                    specBestCount = count;
                }
            }

            // Update global best
            if (specBestCount > bestCount)
            {
                bestFolder = specBest;
                bestCount = specBestCount;
            }

            // First-match for Go: if this folder spec found files, return immediately
            if (useFirstMatch && specBestCount > 0)
            {
                return (bestFolder!, bestCount);
            }
        }

        return (bestFolder ?? projectRoot, bestCount);
    }

    /// <summary>
    /// Counts source files with the given extension directly in the folder (shallow - no recursion).
    /// Used for root folder counting to prevent root from claiming files in subdirectories.
    /// </summary>
    private static int CountSourceFilesShallow(string folder, string extension)
    {
        try
        {
            return Directory.EnumerateFiles(folder, $"*{extension}", SearchOption.TopDirectoryOnly).Count();
        }
        catch (Exception ex) when (ex is UnauthorizedAccessException or IOException or DirectoryNotFoundException)
        {
            return 0;
        }
    }

    /// <summary>
    /// Checks if the build marker is a Java build file (Maven or Gradle).
    /// </summary>
    private static bool IsJavaBuildMarker(string buildFilePath)
    {
        var fileName = Path.GetFileName(buildFilePath.AsSpan());
        return fileName.Equals("pom.xml", StringComparison.OrdinalIgnoreCase)
            || fileName.Equals("build.gradle", StringComparison.OrdinalIgnoreCase)
            || fileName.Equals("build.gradle.kts", StringComparison.OrdinalIgnoreCase);
    }

    /// <summary>
    /// Gets conventional source folder locations for each language.
    /// These are checked when the build marker doesn't specify an explicit source path.
    /// </summary>
    private static string[] GetConventionalSourceFolders(SdkLanguage language) => language switch
    {
        SdkLanguage.DotNet => ["src", "."],
        // Python: check PEP 517 src-layout, then nested namespace packages, then flat modules
        SdkLanguage.Python => ["src/*", "lib/*", "*/*/*", "*/*", "*", "."],
        SdkLanguage.Java => ["src/main/java", "src", "*/src/main/java"],
        SdkLanguage.TypeScript => ["src", "lib", "."],
        SdkLanguage.JavaScript => ["src", "lib", "."],
        // Go: root first (first-match wins if has files), then pkg, then pkg subpackages, then any subfolder
        SdkLanguage.Go => [".", "pkg", "pkg/*", "*"],
        _ => ["src", "."]
    };

    /// <summary>
    /// Expands a glob pattern like "*/src/main/java" to actual directories.
    /// </summary>
    private static IEnumerable<string> ExpandSourceFolderGlob(string root, string pattern)
    {
        var parts = pattern.Split('/', '\\');
        if (parts.Length is 0) yield break;

        IEnumerable<string> currentDirs = [root];

        foreach (var part in parts)
        {
            List<string> nextDirs = [];
            foreach (var dir in currentDirs)
            {
                if (part == "*")
                {
                    try
                    {
                        foreach (var subdir in Directory.EnumerateDirectories(dir))
                        {
                            if (!ExcludedFolders.Contains(Path.GetFileName(subdir)))
                                nextDirs.Add(subdir);
                        }
                    }
                    catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
                }
                else
                {
                    var candidate = Path.Combine(dir, part);
                    if (Directory.Exists(candidate))
                        nextDirs.Add(candidate);
                }
            }
            currentDirs = nextDirs;
        }

        foreach (var dir in currentDirs)
            yield return dir;
    }


    #region Build Marker Parsing

    /// <summary>
    /// Attempts to parse the build marker file to extract an explicit source directory configuration.
    /// Returns the absolute path to the source folder if found, or null to fall back to heuristics.
    /// </summary>
    private static string? TryParseSourceFromBuildMarker(string buildFilePath, string projectRoot, LanguageSpec spec)
    {
        var fileName = Path.GetFileName(buildFilePath).ToLowerInvariant();

        try
        {
            return fileName switch
            {
                "pyproject.toml" => TryParsePyprojectToml(buildFilePath, projectRoot),
                "setup.py" => null, // setup.py requires Python execution to parse reliably
                "pom.xml" => TryParsePomXml(buildFilePath, projectRoot),
                "build.gradle" or "build.gradle.kts" => TryParseBuildGradle(buildFilePath, projectRoot),
                "tsconfig.json" => TryParseTsconfig(buildFilePath, projectRoot),
                "package.json" => TryParsePackageJson(buildFilePath, projectRoot),
                _ => null
            };
        }
        catch (Exception ex) when (ex is not OutOfMemoryException)
        {
            // Record parsing failures for diagnostics — helps improve parsers over time
            var activity = System.Diagnostics.Activity.Current;
            activity?.AddEvent(new System.Diagnostics.ActivityEvent("build_marker_parse_failed",
                tags: new System.Diagnostics.ActivityTagsCollection
                {
                    { "build_marker.file", fileName },
                    { "build_marker.path", buildFilePath },
                    { "error.type", ex.GetType().FullName },
                    { "error.message", ex.Message }
                }));
            return null;
        }
    }

    /// <summary>
    /// Parses pyproject.toml for explicit source directory configuration.
    /// Uses a line-by-line state machine instead of regex for robustness.
    /// Looks for:
    /// <list type="bullet">
    /// <item>[tool.setuptools.packages.find] where = "src"</item>
    /// <item>[tool.setuptools] package-dir = {"" = "src"}</item>
    /// <item>[tool.poetry] packages = [{from = "src", ...}]</item>
    /// <item>[tool.hatch.*] packages = ["src/mypackage"]</item>
    /// </list>
    /// </summary>
    private static string? TryParsePyprojectToml(string filePath, string projectRoot)
    {
        // Guard against excessively large files (single-line files can OOM StreamReader)
        if (!IsFileSafeToRead(filePath))
            return null;

        string? currentSection = null;

        foreach (var rawLine in File.ReadLines(filePath))
        {
            var line = rawLine.Trim();

            // Skip empty lines and comments
            if (line.Length is 0 || line[0] == '#')
                continue;

            // Track section headers: [section.name] or [[array.of.tables]]
            if (line[0] == '[')
            {
                // Use IndexOf to find the first ']' — avoids corruption from ']' in trailing comments
                // e.g., [tool.setuptools]  # see PEP 517 (section 4.3])
                var isArrayTable = line.Length > 1 && line[1] == '[';
                var searchStart = isArrayTable ? 2 : 1;
                var closeBracket = line.IndexOf(']', searchStart);
                if (closeBracket > searchStart)
                {
                    var sectionContent = line[searchStart..closeBracket].Trim();
                    currentSection = sectionContent.ToLowerInvariant();
                }
                continue;
            }

            if (currentSection == null)
                continue;

            // [tool.setuptools.packages.find] where = "src"
            if (currentSection == "tool.setuptools.packages.find")
            {
                var value = TryParseTomlKeyValue(line, "where");
                if (value != null)
                    return NormalizeParsedPath(projectRoot, value);
            }

            // [tool.setuptools] package-dir = {"" = "src"}
            if (currentSection == "tool.setuptools")
            {
                if (line.StartsWith("package-dir", StringComparison.OrdinalIgnoreCase))
                {
                    var value = ExtractFirstInlineTableValue(line);
                    if (value != null)
                        return NormalizeParsedPath(projectRoot, value);
                }
            }

            // [tool.poetry] packages = [{from = "src", ...}]
            if (currentSection == "tool.poetry")
            {
                if (line.StartsWith("packages", StringComparison.OrdinalIgnoreCase))
                {
                    var fromValue = ExtractTomlKeyFromInlineArray(line, "from");
                    if (fromValue != null)
                        return NormalizeParsedPath(projectRoot, fromValue);
                }
            }

            // [tool.hatch.build.targets.wheel] or similar hatch sections
            if (currentSection.StartsWith("tool.hatch", StringComparison.Ordinal))
            {
                if (line.StartsWith("packages", StringComparison.OrdinalIgnoreCase))
                {
                    var packagePath = ExtractFirstArrayStringValue(line);
                    if (packagePath != null)
                    {
                        // Extract the root directory (e.g., "src/mypackage" -> "src")
                        var parts = packagePath.Split('/', '\\');
                        if (parts.Length > 0 && !string.IsNullOrEmpty(parts[0]))
                        {
                            return NormalizeParsedPath(projectRoot, parts[0]);
                        }
                    }
                }
            }
        }

        return null;
    }

    /// <summary>
    /// Parses a simple TOML key = "value" or key = 'value' line.
    /// Returns the value if the key matches, null otherwise.
    /// </summary>
    private static string? TryParseTomlKeyValue(string line, string key)
    {
        var eqIndex = line.IndexOf('=');
        if (eqIndex < 0)
            return null;

        var lineKey = line[..eqIndex].Trim();
        if (!lineKey.Equals(key, StringComparison.OrdinalIgnoreCase))
            return null;

        return ExtractQuotedString(line[(eqIndex + 1)..].Trim());
    }

    /// <summary>
    /// Graphs the first value from a TOML inline table on the same line.
    /// e.g., package-dir = {"" = "src"} → "src"
    /// </summary>
    private static string? ExtractFirstInlineTableValue(string line)
    {
        var braceStart = line.IndexOf('{');
        if (braceStart < 0)
            return null;

        var content = line[(braceStart + 1)..];
        // Find the value after the first =
        var eqIndex = content.IndexOf('=');
        if (eqIndex < 0)
            return null;

        return ExtractQuotedString(content[(eqIndex + 1)..].Trim());
    }

    /// <summary>
    /// Graphs a specific key's value from a TOML inline array of tables.
    /// e.g., packages = [{include = "pkg", from = "src"}] → "src" (for key "from")
    /// </summary>
    private static string? ExtractTomlKeyFromInlineArray(string line, string key)
    {
        // Find content after =
        var eqIndex = line.IndexOf('=');
        if (eqIndex < 0)
            return null;

        var content = line[(eqIndex + 1)..];

        // Search for key = "value" pattern within the inline content
        var searchKey = key + " ";
        var searchKeyEq = key + "=";
        var keyIndex = content.IndexOf(searchKey, StringComparison.OrdinalIgnoreCase);
        if (keyIndex < 0)
            keyIndex = content.IndexOf(searchKeyEq, StringComparison.OrdinalIgnoreCase);
        if (keyIndex < 0)
            return null;

        // Find the = after the key
        var valEqIndex = content.IndexOf('=', keyIndex + key.Length);
        if (valEqIndex < 0)
            return null;

        return ExtractQuotedString(content[(valEqIndex + 1)..].Trim());
    }

    /// <summary>
    /// Graphs the first string value from a TOML array.
    /// e.g., packages = ["src/mypackage"] → "src/mypackage"
    /// </summary>
    private static string? ExtractFirstArrayStringValue(string line)
    {
        var bracketStart = line.IndexOf('[');
        if (bracketStart < 0)
            return null;

        return ExtractQuotedString(line[(bracketStart + 1)..].Trim());
    }

    /// <summary>
    /// Graphs a quoted string value (single or double quotes) from the start of the input.
    /// Returns null if no quoted string is found.
    /// Handles backslash escapes in double-quoted strings (TOML basic strings).
    /// Single-quoted strings are literal (no escape processing, per TOML spec).
    /// </summary>
    private static string? ExtractQuotedString(string input)
    {
        if (input.Length < 2)
            return null;

        var quote = input[0];
        if (quote != '"' && quote != '\'')
            return null;

        var endQuote = FindClosingQuote(input, 1, quote);
        if (endQuote <= 1)
            return null;

        return input[1..endQuote];
    }

    /// <summary>
    /// Finds the index of the closing quote character, skipping backslash-escaped
    /// quotes in double-quoted strings. Single-quoted strings have no escape processing.
    /// </summary>
    private static int FindClosingQuote(string input, int startIndex, char quote)
    {
        for (var i = startIndex; i < input.Length; i++)
        {
            if (input[i] == '\\' && quote == '"' && i + 1 < input.Length)
            {
                i++; // Skip escaped character
                continue;
            }
            if (input[i] == quote)
                return i;
        }
        return -1;
    }

    /// <summary>
    /// Parses pom.xml for explicit source directory configuration using XML parsing.
    /// Looks for: &lt;build&gt;&lt;sourceDirectory&gt;path&lt;/sourceDirectory&gt;&lt;/build&gt;
    /// Default Maven convention is src/main/java, but projects can override this.
    /// For multi-module projects, also checks */src/main/java pattern.
    /// </summary>
    private static string? TryParsePomXml(string filePath, string projectRoot)
    {
        // Use proper XML parsing instead of regex
        try
        {
            var doc = LoadXmlSafely(filePath);
            var ns = doc.Root?.GetDefaultNamespace() ?? System.Xml.Linq.XNamespace.None;

            // Look for <build><sourceDirectory>...</sourceDirectory></build>
            var sourceDir = doc.Root?
                .Element(ns + "build")?
                .Element(ns + "sourceDirectory")?
                .Value?.Trim();

            if (!string.IsNullOrEmpty(sourceDir))
            {
                // Maven paths may use ${project.basedir} or ${basedir} - resolve them
                sourceDir = sourceDir.Replace("${project.basedir}", "", StringComparison.Ordinal)
                                     .Replace("${basedir}", "", StringComparison.Ordinal)
                                     .TrimStart('/', '\\');
                if (!string.IsNullOrEmpty(sourceDir))
                    return NormalizeParsedPath(projectRoot, sourceDir);
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or System.Xml.XmlException)
        {
            // XML parsing failed - fall through to defaults
        }

        // Maven default: src/main/java (per Maven Super POM specification)
        var mavenDefault = Path.Combine(projectRoot, "src", "main", "java");
        if (Directory.Exists(mavenDefault))
        {
            return mavenDefault;
        }

        // For multi-module projects (aggregator POM), check submodule pattern */src/main/java
        // and return the submodule with most source files
        return FindBestJavaSubmodule(projectRoot);
    }

    /// <summary>
    /// Parses build.gradle or build.gradle.kts for explicit source directory configuration.
    /// Uses line-by-line heuristic parsing (Groovy/Kotlin DSL is not statically parseable
    /// without evaluation, so this is best-effort for common patterns).
    /// Looks for: srcDirs = ['path'], srcDirs('path'), srcDir 'path', srcDir("path")
    /// For multi-module projects, also checks */src/main/java pattern.
    /// </summary>
    private static string? TryParseBuildGradle(string filePath, string projectRoot)
    {
        // Guard against excessively large files (single-line files can OOM StreamReader)
        if (!IsFileSafeToRead(filePath))
            return null;

        // Buffer for handling multiline srcDirs declarations
        // (e.g., srcDirs = [\n  'src/main/java'\n])
        string? pendingSrcDirLine = null;

        foreach (var rawLine in File.ReadLines(filePath))
        {
            var line = rawLine.Trim();

            // Skip empty lines and comments (// single-line and /* block */)
            if (line.Length is 0 || line[0] == '/' || line[0] == '*')
                continue;

            // If we have a pending srcDir line that didn't yield a quoted value,
            // check the next non-empty line for the quoted path
            if (pendingSrcDirLine != null)
            {
                var continuationPath = ExtractFirstQuotedValue(line);
                if (continuationPath != null && continuationPath.Length > 0)
                {
                    return NormalizeParsedPath(projectRoot, continuationPath);
                }
                pendingSrcDirLine = null; // Give up after one continuation line
            }

            // Look for srcDir or srcDirs assignments
            // Patterns: srcDirs = ['path'], srcDirs('path'), srcDir 'path', srcDir("path")
            var srcDirIndex = line.IndexOf("srcDir", StringComparison.OrdinalIgnoreCase);
            if (srcDirIndex < 0)
                continue;

            // Guard: ensure srcDir is a keyword, not part of a longer identifier
            // (e.g., val srcDirPath = ..., or mySrcDir = ...)
            if (srcDirIndex > 0 && char.IsLetterOrDigit(line[srcDirIndex - 1]))
                continue;

            // Extract the quoted path after srcDir/srcDirs
            var afterKeyword = line[(srcDirIndex + "srcDir".Length)..];
            // Skip the optional 's' in srcDirs
            if (afterKeyword.Length > 0 && (afterKeyword[0] == 's' || afterKeyword[0] == 'S'))
                afterKeyword = afterKeyword[1..];

            // Find the first quoted string in the remainder
            var path = ExtractFirstQuotedValue(afterKeyword);
            if (path != null && path.Length > 0)
            {
                return NormalizeParsedPath(projectRoot, path);
            }

            // No quoted value on this line — the value may be on the next line
            // (e.g., srcDirs = [\n  'src/main/java'\n])
            pendingSrcDirLine = line;
        }

        // Gradle default: src/main/java (per Gradle Java plugin convention)
        var gradleDefault = Path.Combine(projectRoot, "src", "main", "java");
        if (Directory.Exists(gradleDefault))
        {
            return gradleDefault;
        }

        // For multi-module projects, check submodule pattern */src/main/java
        return FindBestJavaSubmodule(projectRoot);
    }

    /// <summary>
    /// Graphs the first single or double quoted value from a string.
    /// e.g., " = ['src/main/java']" → "src/main/java"
    /// </summary>
    private static string? ExtractFirstQuotedValue(string input)
    {
        for (var i = 0; i < input.Length; i++)
        {
            var ch = input[i];
            if (ch == '"' || ch == '\'')
            {
                var endQuote = FindClosingQuote(input, i + 1, ch);
                if (endQuote > i + 1)
                {
                    return input[(i + 1)..endQuote];
                }
            }
        }
        return null;
    }

    /// <summary>
    /// Finds the best Java submodule source directory for multi-module Maven/Gradle projects.
    /// Scans for */src/main/java pattern and returns the one with most source files.
    /// </summary>
    private static string? FindBestJavaSubmodule(string projectRoot)
    {
        string? bestSubmodule = null;
        int bestCount = 0;

        try
        {
            foreach (var subdir in Directory.EnumerateDirectories(projectRoot))
            {
                if (ExcludedFolders.Contains(Path.GetFileName(subdir)))
                    continue;

                var srcMainJava = Path.Combine(subdir, "src", "main", "java");
                if (Directory.Exists(srcMainJava))
                {
                    var count = CountSourceFiles(srcMainJava, ".java");
                    if (count > bestCount)
                    {
                        bestSubmodule = srcMainJava;
                        bestCount = count;
                    }
                }
            }
        }
        catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }

        return bestSubmodule;
    }

    /// <summary>
    /// Parses tsconfig.json for explicit source directory configuration.
    /// Looks for: "rootDir": "src" or "include": ["src/**/*"]
    /// </summary>
    private static string? TryParseTsconfig(string filePath, string projectRoot)
    {
        // Guard against excessively large files
        if (!IsFileSafeToRead(filePath))
            return null;

        var content = File.ReadAllText(filePath);

        try
        {
            using var doc = JsonDocument.Parse(content, new JsonDocumentOptions { AllowTrailingCommas = true, CommentHandling = JsonCommentHandling.Skip });
            var root = doc.RootElement;

            // Check compilerOptions.rootDir first (most explicit)
            if (root.TryGetProperty("compilerOptions", out var compilerOptions) &&
                compilerOptions.TryGetProperty("rootDir", out var rootDir) &&
                rootDir.ValueKind == JsonValueKind.String)
            {
                var path = rootDir.GetString();
                if (!string.IsNullOrEmpty(path) && path != ".")
                {
                    return NormalizeParsedPath(projectRoot, path);
                }
            }

            // Check "include" array - extract common root from patterns
            if (root.TryGetProperty("include", out var include) && include.ValueKind == JsonValueKind.Array)
            {
                foreach (var item in include.EnumerateArray())
                {
                    if (item.ValueKind == JsonValueKind.String)
                    {
                        var pattern = item.GetString();
                        if (!string.IsNullOrEmpty(pattern))
                        {
                            // Extract folder from pattern like "src/**/*" -> "src"
                            var folder = ExtractFolderFromGlobPattern(pattern);
                            if (folder != null && folder != ".")
                            {
                                return NormalizeParsedPath(projectRoot, folder);
                            }
                        }
                    }
                }
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException)
        {
            // JSON parsing failed - fall back to heuristics
        }

        return null;
    }

    /// <summary>
    /// Parses package.json for source directory hints.
    /// Looks for: "main": "src/index.js" or "module": "src/index.mjs"
    /// </summary>
    private static string? TryParsePackageJson(string filePath, string projectRoot)
    {
        // Guard against excessively large files
        if (!IsFileSafeToRead(filePath))
            return null;

        var content = File.ReadAllText(filePath);

        try
        {
            using var doc = JsonDocument.Parse(content, new JsonDocumentOptions { AllowTrailingCommas = true, CommentHandling = JsonCommentHandling.Skip });
            var root = doc.RootElement;

            // Check "main" field: "src/index.js" -> "src"
            foreach (var field in PackageJsonSourceFields)
            {
                if (root.TryGetProperty(field, out var value) && value.ValueKind == JsonValueKind.String)
                {
                    var entryPoint = value.GetString();
                    if (!string.IsNullOrEmpty(entryPoint))
                    {
                        var folder = ExtractFolderFromPath(entryPoint);
                        if (folder != null && folder != "." && folder != "dist" && folder != "lib" && folder != "build")
                        {
                            return NormalizeParsedPath(projectRoot, folder);
                        }
                    }
                }
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException)
        {
            // JSON parsing failed - fall back to heuristics
        }

        return null;
    }

    /// <summary>
    /// Graphs the root folder from a glob pattern (e.g., "src/**/*" -> "src").
    /// Returns null if the pattern doesn't have a clear folder prefix.
    /// </summary>
    private static string? ExtractFolderFromGlobPattern(string pattern)
    {
        // Skip patterns starting with * or .
        if (pattern.StartsWith('*') || pattern.StartsWith('.'))
            return null;

        // Split by / and take first segment that's not a glob
        var parts = pattern.Split('/', '\\');
        if (parts.Length > 0 && !parts[0].Contains('*'))
        {
            return parts[0];
        }

        return null;
    }

    /// <summary>
    /// Graphs the root folder from a file path (e.g., "src/index.js" -> "src").
    /// Returns null if the path is just a filename without directory.
    /// </summary>
    private static string? ExtractFolderFromPath(string path)
    {
        var parts = path.Split('/', '\\');
        if (parts.Length > 1 && !string.IsNullOrEmpty(parts[0]))
        {
            return parts[0];
        }

        return null;
    }

    /// <summary>
    /// Normalizes a parsed path to an absolute path relative to project root.
    /// Handles leading ./, removes trailing slashes, and validates against path traversal.
    /// Returns null if the resolved path escapes the project root (security guard).
    /// </summary>
    private static string? NormalizeParsedPath(string projectRoot, string relativePath)
    {
        // Strip leading "./ " or ".\\ " prefixes (but preserve ".." for rejection below)
        while (relativePath.StartsWith("./", StringComparison.Ordinal) || relativePath.StartsWith(".\\", StringComparison.Ordinal))
            relativePath = relativePath[2..];
        relativePath = relativePath.TrimEnd('/', '\\');

        if (string.IsNullOrEmpty(relativePath) || relativePath == ".")
            return projectRoot;

        // Reject path traversal attempts (e.g., "../sibling-dir")
        if (relativePath.StartsWith("..", StringComparison.Ordinal))
            return null;

        // Security: reject if the cleaned path is still rooted (e.g., "C:\Windows" on Windows)
        if (Path.IsPathRooted(relativePath))
            return null;

        var fullPath = Path.GetFullPath(Path.Combine(projectRoot, relativePath));

        // Security: ensure the resolved path is within the project root
        // This guards against path traversal via symlinks or residual ".." segments
        var normalizedRoot = Path.GetFullPath(projectRoot);
        if (!normalizedRoot.EndsWith(Path.DirectorySeparatorChar))
            normalizedRoot += Path.DirectorySeparatorChar;

        if (!fullPath.StartsWith(normalizedRoot, StringComparison.OrdinalIgnoreCase)
            && !fullPath.Equals(Path.GetFullPath(projectRoot), StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        return fullPath;
    }

    /// <summary>
    /// Returns true if the file exists and is within the size limit for safe reading.
    /// Guards against OOM from maliciously large or symlinked files.
    /// </summary>
    private static bool IsFileSafeToRead(string path)
    {
        try
        {
            var info = new FileInfo(path);
            return info.Exists && info.Length <= MaxBuildFileSize;
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            return false;
        }
    }

    /// <summary>
    /// Loads an XML document with DTD processing explicitly prohibited for defense-in-depth.
    /// </summary>
    private static System.Xml.Linq.XDocument LoadXmlSafely(string filePath)
    {
        if (!IsFileSafeToRead(filePath))
            throw new IOException($"File '{filePath}' exceeds maximum allowed size ({MaxBuildFileSize} bytes) or is inaccessible.");

        var settings = new System.Xml.XmlReaderSettings { DtdProcessing = System.Xml.DtdProcessing.Prohibit };
        using var reader = System.Xml.XmlReader.Create(filePath, settings);
        return System.Xml.Linq.XDocument.Load(reader);
    }

    #endregion

    /// <summary>
    /// Detects samples folders using a two-phase approach:
    /// <list type="number">
    /// <item><b>Convention-based:</b> searches for folders matching <see cref="SamplesFolderPatterns"/>.</item>
    /// <item><b>Import-based (when library name is available):</b> scans all non-excluded top-level
    /// directories for source files that import the SDK library, discovering unconventionally-named
    /// samples folders (e.g., "quickstart", "tutorials", "getting-started").</item>
    /// </list>
    /// </summary>
    /// <remarks>
    /// Scoring: when a library name is available, candidates are ranked primarily by the number of
    /// files that import the library (strongest signal), with source-file count as a tiebreaker.
    /// When no library name is available, falls back to pure source-file-count scoring.
    /// </remarks>
    private static (string? SamplesFolder, List<string> AllCandidates) DetectSamplesFolder(
        string root, string? languageExtension, string? libraryName, SdkLanguage? language)
    {
        // Build import matcher if library name is available
        ImportMatcher? importMatcher = null;
        if (!string.IsNullOrEmpty(libraryName) && language.HasValue)
        {
            importMatcher = ImportMatcher.Create(libraryName, language.Value);
        }

        List<(string Path, int ImportScore, int FileScore)> candidates = [];
        // O(1) dedup set to avoid linear scans inside enumeration loops
        var seenPaths = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // Phase 1: Convention-based candidates from known folder name patterns
        foreach (var pattern in SamplesFolderPatterns)
        {
            // Check if pattern contains wildcards
            if (pattern.Contains('*'))
            {
                // Search root level
                SearchGlobSamplesCandidates(root, pattern, languageExtension, importMatcher, candidates, seenPaths);

                // Also search one level deep for monorepo patterns (e.g., sdk/*-examples)
                try
                {
                    foreach (var subdir in Directory.EnumerateDirectories(root))
                    {
                        if (ExcludedFolders.Contains(Path.GetFileName(subdir)))
                            continue;
                        SearchGlobSamplesCandidates(subdir, pattern, languageExtension, importMatcher, candidates, seenPaths);
                    }
                }
                catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
            }
            else
            {
                var candidate = Path.Combine(root, pattern);
                if (!Directory.Exists(candidate))
                    continue;

                if (!seenPaths.Add(candidate))
                    continue;

                var fileCount = CountSamplesSourceFiles(candidate, languageExtension);
                if (fileCount > 0)
                {
                    var importCount = importMatcher != null
                        ? CountImportingFiles(candidate, importMatcher, languageExtension)
                        : 0;
                    candidates.Add((candidate, importCount, fileCount));
                }
            }
        }

        // Phase 2: Import-based discovery — scan all non-excluded top-level directories
        // for files that import the library, regardless of folder naming conventions.
        // This discovers unconventionally-named samples like "quickstart/", "tutorials/", etc.
        if (importMatcher != null)
        {
            try
            {
                foreach (var dir in Directory.EnumerateDirectories(root))
                {
                    var name = Path.GetFileName(dir);

                    // Skip excluded folders (node_modules, .git, etc.)
                    if (ExcludedFolders.Contains(name))
                        continue;

                    // Skip if already discovered by convention matching
                    if (!seenPaths.Add(dir))
                        continue;

                    // Skip common source/build/test folders that shouldn't be samples
                    if (IsSourceOrBuildFolder(name))
                        continue;

                    var importCount = CountImportingFiles(dir, importMatcher, languageExtension);
                    if (importCount > 0)
                    {
                        var fileCount = CountSamplesSourceFiles(dir, languageExtension);
                        candidates.Add((dir, importCount, fileCount));
                    }
                }
            }
            catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
        }

        // Phase 3: Sort candidates
        if (importMatcher != null)
        {
            // Primary: import count descending, Secondary: file count descending
            candidates.Sort((a, b) =>
            {
                var cmp = b.ImportScore.CompareTo(a.ImportScore);
                return cmp != 0 ? cmp : b.FileScore.CompareTo(a.FileScore);
            });
        }
        else
        {
            // Fallback: file count descending (existing behavior when no library name)
            candidates.Sort((a, b) => b.FileScore.CompareTo(a.FileScore));
        }

        // Filter out the root path itself — samples folder is always a subdirectory
        var normalizedRoot = Path.TrimEndingDirectorySeparator(Path.GetFullPath(root));
        candidates.RemoveAll(c =>
            string.Equals(Path.TrimEndingDirectorySeparator(Path.GetFullPath(c.Path)),
                normalizedRoot, StringComparison.OrdinalIgnoreCase));

        var allPaths = candidates.ConvertAll(c => c.Path);
        var bestMatch = candidates.Count > 0 ? candidates[0].Path : null;

        return (bestMatch, allPaths);
    }

    /// <summary>
    /// Folders that are clearly source/build/test infrastructure and should not be
    /// considered as samples candidates during import-based discovery.
    /// </summary>
    private static bool IsSourceOrBuildFolder(string folderName)
    {
        return folderName is "src" or "lib" or "source" or "sdk" or "pkg" or "internal" or "cmd"
            or "build" or "dist" or "out" or "target" or "output" or "publish"
            or "test" or "tests" or "spec" or "specs" or "__tests__"
            or "docs" or "doc" or "documentation"
            or ".github" or ".vscode" or ".idea" or ".vs"
            or "scripts" or "tools" or "ci" or ".ci"
            or "generated" or "auto-generated";
    }

    /// <summary>
    /// Determines whether <paramref name="projectRoot"/> is nested under a non-source
    /// ancestor directory (samples, examples, test, docs, demo, etc.) relative to
    /// <paramref name="scanRoot"/>.
    /// Used to deprioritize build markers found inside sample/test/doc trees
    /// so that the main SDK project is preferred during source folder detection.
    /// </summary>
    private static bool IsNestedUnderNonSourceAncestor(string projectRoot, string scanRoot)
    {
        var normalizedProject = Path.TrimEndingDirectorySeparator(Path.GetFullPath(projectRoot));
        var normalizedRoot = Path.TrimEndingDirectorySeparator(Path.GetFullPath(scanRoot));

        if (string.Equals(normalizedProject, normalizedRoot, StringComparison.OrdinalIgnoreCase))
            return false;

        // Walk the relative path segments between scanRoot and projectRoot
        var relative = Path.GetRelativePath(normalizedRoot, normalizedProject);
        foreach (var segment in relative.Split(Path.DirectorySeparatorChar))
        {
            if (IsSamplesOrAuxiliaryFolder(segment))
                return true;
        }

        return false;
    }

    /// <summary>
    /// Folder names that indicate auxiliary (non-primary-source) content.
    /// Build markers found under these directories are deprioritized during
    /// source folder detection.
    /// </summary>
    private static bool IsSamplesOrAuxiliaryFolder(string folderName)
    {
        return folderName is "samples" or "sample" or "samples-dev"
            or "examples" or "example"
            or "demo" or "demos"
            or "test" or "tests" or "spec" or "specs" or "__tests__"
            or "docs" or "doc" or "documentation"
            or "quickstarts" or "tutorials";
    }

    /// <summary>
    /// Searches for directories matching a glob pattern and adds them as samples candidates.
    /// </summary>
    private static void SearchGlobSamplesCandidates(
        string searchDir, string pattern, string? languageExtension, ImportMatcher? importMatcher,
        List<(string Path, int ImportScore, int FileScore)> candidates,
        HashSet<string> seenPaths)
    {
        try
        {
            foreach (var dir in Directory.EnumerateDirectories(searchDir, pattern))
            {
                // Skip if already found (O(1) lookup)
                if (!seenPaths.Add(dir))
                    continue;

                var fileCount = CountSamplesSourceFiles(dir, languageExtension);
                if (fileCount > 0)
                {
                    var importCount = importMatcher != null
                        ? CountImportingFiles(dir, importMatcher, languageExtension)
                        : 0;
                    candidates.Add((dir, importCount, fileCount));
                }
            }
        }
        catch (Exception ex) when (ex is UnauthorizedAccessException or IOException) { }
    }

    /// <summary>
    /// Counts source files in a samples folder.
    /// If <paramref name="languageExtension"/> is provided, counts only files of that type.
    /// Otherwise counts all known source file types (.cs, .py, .java, .ts, .js, .go)
    /// with a single directory enumeration to avoid redundant I/O.
    /// Uses SafeFileEnumerator with a cap of 200 for accurate ranking.
    /// </summary>
    private static int CountSamplesSourceFiles(string folder, string? languageExtension)
    {
        if (!string.IsNullOrEmpty(languageExtension))
        {
            return SafeFileEnumerator.CountFiles(folder, $"*{languageExtension}", maxCount: 200);
        }

        // Enumerate once and filter in memory to avoid 6 separate directory traversals
        return SafeFileEnumerator.EnumerateFiles(folder, "*.*", maxFiles: 200)
            .Count(f => AllSourceExtensions.Contains(Path.GetExtension(f)));
    }

    /// <summary>
    /// Counts source files with the given extension in the folder.
    /// Uses SafeFileEnumerator to consistently skip excluded folders (node_modules, bin, etc.)
    /// and count recursively with a cap of 200 for performance.
    /// All candidates are scored on the same scale (total recursive count, not shallow-first).
    /// </summary>
    private static int CountSourceFiles(string folder, string extension)
    {
        return SafeFileEnumerator.CountFiles(folder, $"*{extension}", maxCount: 200);
    }

    /// <summary>
    /// Maximum number of lines to read per file when scanning for import statements.
    /// Import declarations appear near the top of source files in all supported languages.
    /// </summary>
    private const int MaxImportScanLines = 50;

    /// <summary>
    /// Maximum number of files to scan per candidate directory when checking for imports.
    /// Keeps the import-based detection bounded for large directories.
    /// </summary>
    private const int MaxImportScanFiles = 100;

    /// <summary>
    /// Graphs the library/package name from language-specific build markers.
    /// Returns null if the name cannot be determined.
    /// </summary>
    /// <remarks>
    /// Per-language engine:
    /// <list type="bullet">
    /// <item><b>Python:</b> <c>pyproject.toml</c> → <c>[project] name = "..."</c></item>
    /// <item><b>JS/TS:</b> <c>package.json</c> → <c>"name": "..."</c></item>
    /// <item><b>Java:</b> <c>pom.xml</c> → <c>&lt;groupId&gt;</c> (first unique segments)</item>
    /// <item><b>Go:</b> <c>go.mod</c> → <c>module</c> path</item>
    /// <item><b>.NET:</b> <c>*.csproj</c> → <c>&lt;RootNamespace&gt;</c> or project file name</item>
    /// </list>
    /// </remarks>
    internal static string? ExtractLibraryName(string root, SdkLanguage language)
    {
        try
        {
            return language switch
            {
                SdkLanguage.Python => ExtractPythonPackageName(root),
                SdkLanguage.JavaScript or SdkLanguage.TypeScript => ExtractNpmPackageName(root),
                SdkLanguage.Java => ExtractJavaGroupId(root),
                SdkLanguage.Go => ExtractGoModulePath(root),
                SdkLanguage.DotNet => ExtractDotNetNamespace(root),
                _ => null
            };
        }
        catch (Exception ex) when (ex is not OutOfMemoryException)
        {
            // Record library name parsing failures for diagnostics
            var activity = System.Diagnostics.Activity.Current;
            activity?.AddEvent(new System.Diagnostics.ActivityEvent("library_name_extract_failed",
                tags: new System.Diagnostics.ActivityTagsCollection
                {
                    { "sdk.language", language.ToString() },
                    { "sdk.root", root },
                    { "error.type", ex.GetType().FullName },
                    { "error.message", ex.Message }
                }));
            return null;
        }
    }

    /// <summary>
    /// Graphs the Python package name from pyproject.toml.
    /// Parses <c>[project] name = "my-sdk"</c> and transforms hyphens
    /// to underscores for the canonical Python import name.
    /// </summary>
    private static string? ExtractPythonPackageName(string root)
    {
        var pyprojectPath = Path.Combine(root, "pyproject.toml");
        if (!File.Exists(pyprojectPath))
            return null;

        // Guard against excessively large files (single-line files can OOM StreamReader)
        if (!IsFileSafeToRead(pyprojectPath))
            return null;

        // Simple TOML parsing: look for name = "..." in [project] section
        var inProjectSection = false;
        foreach (var line in File.ReadLines(pyprojectPath))
        {
            var trimmed = line.TrimStart();

            // Track section headers
            if (trimmed.StartsWith('['))
            {
                // Extract section name between brackets and compare.
                // Handles trailing whitespace/comments: "[project]  # metadata" → "project"
                var closeBracket = trimmed.IndexOf(']', 1);
                if (closeBracket > 1)
                {
                    var sectionName = trimmed[1..closeBracket].Trim();
                    inProjectSection = sectionName.Equals("project", StringComparison.OrdinalIgnoreCase);
                }
                else
                {
                    inProjectSection = false;
                }
                continue;
            }

            if (!inProjectSection)
                continue;

            // Match name = "value" or name = 'value'
            var value = TryParseTomlKeyValue(trimmed, "name");
            if (value != null)
            {
                return value;
            }
        }

        return null;
    }

    /// <summary>
    /// Graphs the npm package name from package.json → <c>"name"</c> field.
    /// </summary>
    private static string? ExtractNpmPackageName(string root)
    {
        var packageJsonPath = Path.Combine(root, "package.json");
        if (!File.Exists(packageJsonPath))
            return null;

        // Guard against excessively large files
        if (!IsFileSafeToRead(packageJsonPath))
            return null;

        try
        {
            using var doc = JsonDocument.Parse(File.ReadAllBytes(packageJsonPath));
            if (doc.RootElement.TryGetProperty("name", out var nameProp) &&
                nameProp.ValueKind == JsonValueKind.String)
            {
                var name = nameProp.GetString();
                return string.IsNullOrWhiteSpace(name) ? null : name;
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException) { }

        return null;
    }

    /// <summary>
    /// Graphs the Java group/package prefix from pom.xml → <c>&lt;groupId&gt;</c>,
    /// or from build.gradle → <c>group = '...'</c>.
    /// </summary>
    private static string? ExtractJavaGroupId(string root)
    {
        // Try pom.xml first
        var pomPath = Path.Combine(root, "pom.xml");
        if (File.Exists(pomPath))
        {
            try
            {
                var doc = LoadXmlSafely(pomPath);
                var ns = doc.Root?.GetDefaultNamespace() ?? System.Xml.Linq.XNamespace.None;
                var groupId = doc.Root?.Element(ns + "groupId")?.Value;
                if (!string.IsNullOrWhiteSpace(groupId))
                    return groupId;
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or System.Xml.XmlException) { }
        }

        // Try build.gradle / build.gradle.kts
        foreach (var gradleFile in GradleBuildFiles)
        {
            var gradlePath = Path.Combine(root, gradleFile);
            if (!File.Exists(gradlePath))
                continue;

            // Guard against excessively large files (single-line files can OOM StreamReader)
            if (!IsFileSafeToRead(gradlePath))
                continue;

            try
            {
                foreach (var line in File.ReadLines(gradlePath))
                {
                    var trimmedLine = line.Trim();
                    // Match: group = 'com.example' or group = "com.example"
                    if (!trimmedLine.StartsWith("group", StringComparison.OrdinalIgnoreCase))
                        continue;

                    // Find quoted value after 'group' keyword
                    var afterGroup = trimmedLine["group".Length..].TrimStart();
                    // Skip optional '='
                    if (afterGroup.Length > 0 && afterGroup[0] == '=')
                        afterGroup = afterGroup[1..].TrimStart();

                    var groupValue = ExtractQuotedString(afterGroup);
                    if (groupValue != null)
                        return groupValue;
                }
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException) { }
        }

        return null;
    }

    /// <summary>
    /// Graphs the Go module path from go.mod → <c>module github.com/org/repo/...</c>.
    /// </summary>
    private static string? ExtractGoModulePath(string root)
    {
        var goModPath = Path.Combine(root, "go.mod");
        if (!File.Exists(goModPath))
            return null;

        // Guard against excessively large files (single-line files can OOM StreamReader)
        if (!IsFileSafeToRead(goModPath))
            return null;

        try
        {
            foreach (var line in File.ReadLines(goModPath))
            {
                var trimmed = line.Trim();
                if (trimmed.StartsWith("module ", StringComparison.Ordinal))
                {
                    var modulePath = trimmed["module ".Length..].Trim();
                    return string.IsNullOrWhiteSpace(modulePath) ? null : modulePath;
                }
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException) { }

        return null;
    }

    /// <summary>
    /// Graphs the .NET root namespace from the first <c>*.csproj</c> found at root or in src/.
    /// Falls back to deriving the namespace from the project file name (e.g., <c>Example.Sdk</c>).
    /// </summary>
    private static string? ExtractDotNetNamespace(string root)
    {
        // Find the first .csproj
        string? csprojPath = null;
        try
        {
            // Check root
            csprojPath = Directory.EnumerateFiles(root, "*.csproj").FirstOrDefault();

            // Check src/
            if (csprojPath == null)
            {
                var srcDir = Path.Combine(root, "src");
                if (Directory.Exists(srcDir))
                {
                    csprojPath = Directory.EnumerateFiles(srcDir, "*.csproj").FirstOrDefault();
                    // Also check immediate subdirectories of src/
                    if (csprojPath == null)
                    {
                        foreach (var dir in Directory.EnumerateDirectories(srcDir))
                        {
                            csprojPath = Directory.EnumerateFiles(dir, "*.csproj").FirstOrDefault();
                            if (csprojPath != null)
                                break;
                        }
                    }
                }
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException) { }

        if (csprojPath == null)
            return null;

        // Try to extract RootNamespace from csproj XML
        try
        {
            var doc = LoadXmlSafely(csprojPath);
            var ns = doc.Root?.GetDefaultNamespace() ?? System.Xml.Linq.XNamespace.None;
            var rootNs = doc.Root?.Descendants(ns + "RootNamespace").FirstOrDefault()?.Value;
            if (!string.IsNullOrWhiteSpace(rootNs))
                return rootNs;
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or System.Xml.XmlException) { }

        // Fallback: derive from project file name (e.g., "Example.Sdk.csproj" → "Example.Sdk")
        return Path.GetFileNameWithoutExtension(csprojPath);
    }

    /// <summary>
    /// Provides string-based import statement matching without regex overhead.
    /// Each language has a simple set of import syntax patterns that can be
    /// matched with deterministic string operations — no backtracking or compilation cost.
    /// </summary>
    internal sealed class ImportMatcher
    {
        private readonly SdkLanguage _language;
        private readonly string _name;
        private readonly string? _altName;

        private ImportMatcher(SdkLanguage language, string name, string? altName)
        {
            _language = language;
            _name = name;
            _altName = altName;
        }

        /// <summary>
        /// Creates an <see cref="ImportMatcher"/> for the given library name and language.
        /// Returns null if the library name is empty.
        /// </summary>
        /// <remarks>
        /// Per-language matching:
        /// <list type="bullet">
        /// <item><b>Python:</b> <c>import name</c> / <c>from name import</c> (hyphens → underscores and dots)</item>
        /// <item><b>JS/TS:</b> <c>from 'name'</c> / <c>require('name')</c></item>
        /// <item><b>Java:</b> <c>import groupId.*</c></item>
        /// <item><b>Go:</b> <c>"module/path"</c> inside import blocks</item>
        /// <item><b>.NET:</b> <c>using Namespace;</c></item>
        /// </list>
        /// </remarks>
        internal static ImportMatcher? Create(string libraryName, SdkLanguage language)
        {
            if (string.IsNullOrWhiteSpace(libraryName))
                return null;

            string? altName = null;
            if (language == SdkLanguage.Python)
            {
                // "my-sdk" → "my_sdk" (import name) and "my.sdk" (dotted)
                altName = libraryName.Replace('-', '.');
                libraryName = libraryName.Replace('-', '_');
                if (altName == libraryName) altName = null;
            }

            return new ImportMatcher(language, libraryName, altName);
        }

        /// <summary>
        /// Returns true if the given source line contains an import of this library.
        /// </summary>
        public bool IsMatch(string line) => _language switch
        {
            SdkLanguage.Python => MatchPython(line),
            SdkLanguage.JavaScript or SdkLanguage.TypeScript => MatchJsTs(line),
            SdkLanguage.Java => MatchJava(line),
            SdkLanguage.Go => MatchGo(line),
            SdkLanguage.DotNet => MatchDotNet(line),
            _ => false,
        };

        // ── Python ──────────────────────────────────────────────────────────
        private bool MatchPython(string line)
        {
            var trimmed = line.AsSpan().TrimStart();
            return MatchesPythonImport(trimmed, _name)
                || (_altName != null && MatchesPythonImport(trimmed, _altName));
        }

        private static bool MatchesPythonImport(ReadOnlySpan<char> line, string name)
        {
            // "import name" or "import name.sub" or "import name,"
            if (line.StartsWith("import ", StringComparison.OrdinalIgnoreCase))
            {
                var after = line[7..].TrimStart();
                if (after.Length >= name.Length
                    && after[..name.Length].Equals(name, StringComparison.OrdinalIgnoreCase)
                    && (after.Length == name.Length || IsWordBoundary(after[name.Length])))
                    return true;
            }

            // "from name import ..." or "from name.sub import ..."
            if (line.StartsWith("from ", StringComparison.OrdinalIgnoreCase))
            {
                var after = line[5..].TrimStart();
                if (after.Length > name.Length
                    && after[..name.Length].Equals(name, StringComparison.OrdinalIgnoreCase)
                    && after[name.Length] is '.' or ' ' or '\t')
                    return true;
            }

            return false;
        }

        private static bool IsWordBoundary(char ch) =>
            ch is '.' or ' ' or ',' or ';' or '\t' or '\r' or '\n';

        // ── JavaScript / TypeScript ─────────────────────────────────────────
        private bool MatchJsTs(string line)
        {
            var trimmed = line.AsSpan().TrimStart();

            // Must contain a from or require keyword somewhere
            if (trimmed.IndexOf("from", StringComparison.OrdinalIgnoreCase) < 0
                && trimmed.IndexOf("require", StringComparison.OrdinalIgnoreCase) < 0)
                return false;

            // Look for the library name inside quotes (single or double)
            return ContainsQuotedName(line, _name, '\'')
                || ContainsQuotedName(line, _name, '"');
        }

        // ── Java ────────────────────────────────────────────────────────────
        private bool MatchJava(string line)
        {
            var trimmed = line.AsSpan().TrimStart();
            if (!trimmed.StartsWith("import ", StringComparison.Ordinal))
                return false;

            var after = trimmed[7..].TrimStart();
            // Skip optional "static "
            if (after.StartsWith("static ", StringComparison.Ordinal))
                after = after[7..].TrimStart();

            return after.Length > _name.Length
                && after[..(_name.Length)].Equals(_name, StringComparison.Ordinal)
                && after[_name.Length] == '.';
        }

        // ── Go ──────────────────────────────────────────────────────────────
        private bool MatchGo(string line)
        {
            // Go imports: "github.com/org/repo" or alias "github.com/org/repo/sub"
            return ContainsQuotedName(line, _name, '"');
        }

        // ── .NET ────────────────────────────────────────────────────────────
        private bool MatchDotNet(string line)
        {
            var trimmed = line.AsSpan().TrimStart();
            if (!trimmed.StartsWith("using ", StringComparison.Ordinal))
                return false;

            var after = trimmed[6..].TrimStart();
            // Skip optional "static "
            if (after.StartsWith("static ", StringComparison.Ordinal))
                after = after[7..].TrimStart();

            return after.Length > _name.Length
                && after[..(_name.Length)].Equals(_name, StringComparison.OrdinalIgnoreCase)
                && after[_name.Length] is '.' or ';' or ' ';
        }

        // ── Shared helper ───────────────────────────────────────────────────

        /// <summary>
        /// Scans <paramref name="line"/> for <paramref name="name"/> inside
        /// <paramref name="quote"/>-delimited strings. Matches the name as a prefix
        /// (allowing sub-path imports like "name/sub").
        /// </summary>
        private static bool ContainsQuotedName(string line, string name, char quote)
        {
            var searchFrom = 0;
            while (searchFrom < line.Length)
            {
                var quoteStart = line.IndexOf(quote, searchFrom);
                if (quoteStart < 0) break;

                var contentStart = quoteStart + 1;
                if (contentStart + name.Length > line.Length) break;

                // Skip relative path prefixes (../ or ./)
                var offset = contentStart;
                while (offset + 1 < line.Length)
                {
                    if (line[offset] == '.' && line[offset + 1] == '/')
                    { offset += 2; continue; }
                    if (offset + 2 < line.Length && line[offset] == '.' && line[offset + 1] == '.' && line[offset + 2] == '/')
                    { offset += 3; continue; }
                    break;
                }

                // Check if content starts with the name
                if (offset + name.Length <= line.Length
                    && line.AsSpan(offset, name.Length).Equals(name, StringComparison.OrdinalIgnoreCase))
                {
                    var nameEnd = offset + name.Length;
                    if (nameEnd < line.Length && (line[nameEnd] == quote || line[nameEnd] == '/'))
                        return true;
                }

                // Advance past this quoted string to avoid re-scanning
                var closeIdx = line.IndexOf(quote, contentStart);
                searchFrom = closeIdx > 0 ? closeIdx + 1 : line.Length;
            }
            return false;
        }
    }

    /// <summary>
    /// Builds an <see cref="ImportMatcher"/> for backward compatibility.
    /// Prefer <see cref="ImportMatcher.Create"/> directly.
    /// </summary>
    internal static ImportMatcher? BuildImportMatcher(string libraryName, SdkLanguage language)
        => ImportMatcher.Create(libraryName, language);

    /// <summary>
    /// Counts files in a directory whose first <see cref="MaxImportScanLines"/> lines
    /// contain an import statement matching the given matcher.
    /// Uses <see cref="SafeFileEnumerator"/> to stay within bounded enumeration constraints.
    /// </summary>
    internal static int CountImportingFiles(string folder, ImportMatcher importMatcher, string? fileExtension)
    {
        if (string.IsNullOrEmpty(fileExtension))
            return 0;

        var count = 0;
        var searchPattern = $"*{fileExtension}";

        foreach (var filePath in SafeFileEnumerator.EnumerateFiles(folder, searchPattern, MaxImportScanFiles))
        {
            if (FileContainsImport(filePath, importMatcher))
                count++;
        }

        return count;
    }

    /// <summary>
    /// Reads the first <see cref="MaxImportScanLines"/> lines of a file and returns
    /// true if any line matches the import matcher.
    /// </summary>
    private static bool FileContainsImport(string filePath, ImportMatcher importMatcher)
    {
        try
        {
            var linesRead = 0;
            foreach (var line in File.ReadLines(filePath))
            {
                if (++linesRead > MaxImportScanLines)
                    break;

                if (importMatcher.IsMatch(line))
                    return true;
            }
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException) { }

        return false;
    }
}
