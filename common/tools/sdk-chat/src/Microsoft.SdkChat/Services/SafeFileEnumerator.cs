// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Frozen;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Safe file system operations that skip dangerous folders.
/// Graphed from SdkInfo for testability and single responsibility.
/// </summary>
public static class SafeFileEnumerator
{
    /// <summary>
    /// Canonical set of folders to exclude from all enumeration operations.
    /// This is the single source of truth for excluded folders — used by SdkInfo,
    /// FindMonorepoPackages, and all other file enumeration in the codebase.
    /// These are typically build artifacts, dependencies, or version control folders
    /// that should never be scanned (e.g., node_modules can contain 100K+ files).
    /// </summary>
    public static readonly FrozenSet<string> ExcludedFolders = FrozenSet.ToFrozenSet(
    [
        // Build artifacts
        "bin", "obj", "dist", "build", "target", "out", "artifacts",
        // Package managers / dependencies
        "node_modules", "vendor", "packages", ".nuget",
        // Python environments and caches
        "__pycache__", ".venv", "venv", "__pypackages__",
        ".mypy_cache", ".ruff_cache", ".eggs", ".tox", "htmlcov",
        // Version control / IDE
        ".git", ".vs", ".idea",
        // Framework-specific
        ".next", "coverage", ".cache",
        // Java/Gradle
        ".gradle",
        // pytest
        ".pytest_cache",
    ], StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// Safe enumeration options that skip excluded folders.
    /// Use this when enumerating files to avoid scanning node_modules, .git, etc.
    /// </summary>
    public static readonly EnumerationOptions SafeEnumerationOptions = new()
    {
        RecurseSubdirectories = true,
        IgnoreInaccessible = true,
        MaxRecursionDepth = 10,
        AttributesToSkip = FileAttributes.Hidden | FileAttributes.System
    };

    /// <summary>
    /// Safely enumerates files in a directory, skipping excluded folders like node_modules.
    /// This is the preferred method for file enumeration to avoid performance issues.
    /// Also guards against symlink cycles by tracking visited directories via canonical paths.
    /// </summary>
    /// <param name="directory">Root directory to enumerate.</param>
    /// <param name="searchPattern">File search pattern (e.g., "*.cs").</param>
    /// <param name="maxFiles">Maximum number of files to return (prevents runaway enumeration).</param>
    /// <param name="maxDepth">Maximum recursion depth (default: 10).</param>
    /// <returns>Enumerable of file paths, excluding files in dangerous folders.</returns>
    public static IEnumerable<string> EnumerateFiles(
        string directory,
        string searchPattern = "*.*",
        int maxFiles = 10000,
        int maxDepth = 10)
    {
        if (!Directory.Exists(directory))
            yield break;

        var count = 0;
        // Track visited directories by canonical path to prevent symlink cycles
        var visited = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        // Stack stores (path, depth) tuples
        var stack = new Stack<(string Path, int Depth)>();

        var canonicalRoot = GetCanonicalPath(directory);
        visited.Add(canonicalRoot);
        stack.Push((directory, 0));

        while (stack.Count > 0 && count < maxFiles)
        {
            var (currentDir, depth) = stack.Pop();

            // Enumerate files in current directory
            if (count < maxFiles)
            {
                // Manual enumeration to handle exceptions during lazy iteration
                // while permitting yield return (which cannot be in a try-catch block)
                IEnumerator<string>? fileEnumerator = null;
                try
                {
                    fileEnumerator = Directory.EnumerateFiles(currentDir, searchPattern, SearchOption.TopDirectoryOnly).GetEnumerator();
                }
                catch (Exception ex) when (IsFileSystemError(ex)) { }

                if (fileEnumerator != null)
                {
                    using (fileEnumerator)
                    {
                        while (true)
                        {
                            string file;
                            try
                            {
                                if (!fileEnumerator.MoveNext()) break;
                                file = fileEnumerator.Current;
                            }
                            catch (Exception ex) when (IsFileSystemError(ex))
                            {
                                break;
                            }

                            if (++count > maxFiles)
                                yield break;

                            yield return file;
                        }
                    }
                }
            }

            // Don't recurse deeper than maxDepth
            if (depth >= maxDepth)
                continue;

            // Add subdirectories (excluding dangerous ones)
            // Use eager evaluation (GetDirectories) for simplicity as we iterate all nested dirs anyway
            string[]? subdirs = null;
            try
            {
                subdirs = Directory.GetDirectories(currentDir);
            }
            catch (Exception ex) when (IsFileSystemError(ex)) { }

            if (subdirs != null)
            {
                foreach (var subdir in subdirs)
                {
                    var dirName = Path.GetFileName(subdir);
                    if (ExcludedFolders.Contains(dirName))
                        continue;

                    // Guard against symlink cycles
                    var canonical = GetCanonicalPath(subdir);
                    if (visited.Add(canonical))
                    {
                        stack.Push((subdir, depth + 1));
                    }
                }
            }
        }
    }

    private static bool IsFileSystemError(Exception ex)
        => ex is UnauthorizedAccessException or DirectoryNotFoundException or IOException;

    /// <summary>
    /// Safely counts files matching a pattern, skipping excluded folders.
    /// </summary>
    public static int CountFiles(string directory, string searchPattern = "*.*", int maxCount = 10000, int maxDepth = 10)
    {
        return EnumerateFiles(directory, searchPattern, maxCount, maxDepth).Count();
    }

    /// <summary>
    /// Checks if a directory name is in the excluded list.
    /// </summary>
    public static bool IsExcluded(string directoryName)
    {
        return ExcludedFolders.Contains(directoryName);
    }

    /// <summary>
    /// Returns a canonical path for symlink cycle detection.
    /// Resolves the full symlink chain on supported platforms; falls back to GetFullPath on others.
    /// </summary>
    internal static string GetCanonicalPath(string path)
    {
        try
        {
            // Optimization: avoid expensive DirectoryInfo/ResolveLinkTarget if not a reparse point
            // File.GetAttributes works for directories too and is a fast syscall
            var attributes = File.GetAttributes(path);
            if ((attributes & FileAttributes.ReparsePoint) == 0)
            {
                return Path.GetFullPath(path);
            }

            var info = new DirectoryInfo(path);
            // ResolveLinkTarget with returnFinalTarget: true follows the entire symlink chain (A→B→C → C)
            var resolved = info.ResolveLinkTarget(returnFinalTarget: true);
            if (resolved != null)
            {
                return resolved.FullName;
            }
        }
        catch (Exception ex) when (IsFileSystemError(ex))
        {
            // Fallback on expected filesystem errors (e.g., permission denied, broken symlinks)
        }

        return Path.GetFullPath(path);
    }
}
