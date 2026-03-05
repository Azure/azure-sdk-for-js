// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Buffers;
using System.Buffers.Binary;
using System.Security.Cryptography;
using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Computes a fingerprint for a directory based on file metadata (paths, sizes, timestamps).
/// Used for incremental processing — skip re-processing when source files haven't changed.
/// </summary>
public static class DirectoryFingerprint
{
    private static readonly HashSet<string> ExcludedDirectories = new(StringComparer.OrdinalIgnoreCase)
    {
        ".git", "node_modules", "vendor", "__pycache__", "obj", "bin",
        "target", "build", ".tox", ".mypy_cache", ".venv", "venv"
    };

    /// <summary>
    /// Computes a fingerprint based on file paths, sizes, and last-write-times.
    /// Returns a hex string that changes when any matching file is added, removed, or modified.
    /// </summary>
    /// <param name="rootPath">The root directory to scan.</param>
    /// <param name="extensions">File extensions to include (e.g., ".py", ".cs"). Must include the leading period.</param>
    /// <returns>A 32-character hex fingerprint, or empty string if no matching files found.</returns>
    public static string Compute(string rootPath, string[] extensions)
    {
        if (!Directory.Exists(rootPath))
            return "";

        var extensionSet = new HashSet<string>(extensions, StringComparer.OrdinalIgnoreCase);
        List<(string RelativePath, long Size, long Ticks)> entries = [];

        CollectEntries(new DirectoryInfo(rootPath), rootPath, extensionSet, entries, isRoot: true);

        if (entries.Count is 0)
            return "";

        // Sort for deterministic ordering
        entries.Sort((a, b) => string.Compare(a.RelativePath, b.RelativePath, StringComparison.Ordinal));

        // Hash file metadata (not content — metadata is sufficient and much faster)
        using var hasher = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
        Span<byte> longBuffer = stackalloc byte[8];

        // Reuse a single pooled buffer for UTF-8 encoding to avoid per-path byte[] allocations
        var pathBuffer = ArrayPool<byte>.Shared.Rent(1024);
        try
        {
            foreach (var (path, size, ticks) in entries)
            {
                var byteCount = Encoding.UTF8.GetByteCount(path);
                if (byteCount > pathBuffer.Length)
                {
                    ArrayPool<byte>.Shared.Return(pathBuffer);
                    pathBuffer = ArrayPool<byte>.Shared.Rent(byteCount);
                }

                var written = Encoding.UTF8.GetBytes(path.AsSpan(), pathBuffer);
                hasher.AppendData(pathBuffer.AsSpan(0, written));

                BinaryPrimitives.WriteInt64LittleEndian(longBuffer, size);
                hasher.AppendData(longBuffer);

                BinaryPrimitives.WriteInt64LittleEndian(longBuffer, ticks);
                hasher.AppendData(longBuffer);
            }
        }
        finally
        {
            ArrayPool<byte>.Shared.Return(pathBuffer);
        }

        var hash = hasher.GetHashAndReset();
        return Convert.ToHexString(hash)[..32].ToLowerInvariant();
    }

    private static void CollectEntries(
        DirectoryInfo dir,
        string rootPath,
        HashSet<string> extensionSet,
        List<(string, long, long)> entries,
        bool isRoot = false)
    {
        // Skip common non-source directories (but never skip the root itself)
        if (!isRoot && ExcludedDirectories.Contains(dir.Name))
            return;

        foreach (var file in dir.EnumerateFiles())
        {
            if (extensionSet.Contains(file.Extension))
            {
                var relative = Path.GetRelativePath(rootPath, file.FullName).Replace('\\', '/');
                entries.Add((relative, file.Length, file.LastWriteTimeUtc.Ticks));
            }
        }

        foreach (var subDir in dir.EnumerateDirectories())
        {
            CollectEntries(subDir, rootPath, extensionSet, entries);
        }
    }
}
