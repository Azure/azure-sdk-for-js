// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.Extensions.FileSystemGlobbing;
using Microsoft.Extensions.Logging;

namespace Microsoft.SdkChat.Helpers;

public readonly record struct FileChunk(
    string Content,
    string RelativePath,
    bool IsHeader,
    bool IsFooter,
    bool IsTruncated
);

public record SourceInputSpec(
    string Path,
    string[]? IncludeExtensions = null,
    string[]? ExcludeGlobPatterns = null
);

/// <param name="SectionName">XML tag name for this section.</param>
/// <param name="Budget">Character budget for this group.</param>
public record SourceInputGroup(
    string SectionName,
    IEnumerable<SourceInputSpec> Inputs,
    int Budget = 100_000,
    int PerFileLimit = 50_000,
    Func<FileMetadata, int>? PriorityFunc = null
);

public record FileMetadata(
    string FilePath,
    string RelativePath,
    long FileSize,
    int Priority,
    string? GroupName = null
);

public record FileLoadingItem(
    string FilePath,
    string RelativePath,
    long FileSize,
    int ContentToLoad,
    int EstimatedTokens,
    bool IsTruncated,
    string? GroupName = null
);

public record FileLoadingPlan(
    List<FileLoadingItem> Items,
    int TotalFilesFound,
    int TotalFilesIncluded,
    int TotalEstimatedTokens,
    int BudgetUsed,
    int TotalBudget
);

/// <summary>Streaming file loader with priority-based budget management.</summary>
public class FileHelper
{
    private readonly ILogger<FileHelper>? _logger;
    private const int HeaderOverhead = 50;
    private const int FileBufferSize = 65536; // 64KB - optimal for modern SSDs

    public FileHelper(ILogger<FileHelper>? logger = null)
    {
        _logger = logger;
    }

    /// <summary>
    /// Streams files from multiple groups, each with its own budget.
    /// Groups appear in the order provided, with section wrappers.
    /// This is the main API for loading files with budget management.
    /// </summary>
    /// <param name="groups">The groups of source inputs, each with its own budget and priority function.</param>
    /// <param name="basePath">Base path for computing relative paths.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Async enumerable of file chunks for streaming consumption.</returns>
    public async IAsyncEnumerable<FileChunk> StreamFilesAsync(
        IEnumerable<SourceInputGroup> groups,
        string basePath,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        foreach (var group in groups)
        {
            List<FileMetadata> files = [];
            var priorityFunc = group.PriorityFunc ?? (_ => 0);

            foreach (var input in group.Inputs)
            {
                if (File.Exists(input.Path))
                {
                    var fileInfo = new FileInfo(input.Path);
                    var relativePath = Path.GetRelativePath(basePath, input.Path);
                    var metadata = new FileMetadata(
                        FilePath: fileInfo.FullName,
                        RelativePath: relativePath,
                        FileSize: fileInfo.Length,
                        Priority: 0,
                        GroupName: group.SectionName
                    );
                    metadata = metadata with { Priority = priorityFunc(metadata) };
                    files.Add(metadata);
                }
                else if (Directory.Exists(input.Path))
                {
                    var discovered = DiscoverFiles(
                        input.Path,
                        input.IncludeExtensions ?? [],
                        input.ExcludeGlobPatterns ?? [],
                        basePath,
                        priorityFunc);
                    files.AddRange(discovered);
                }
            }

            if (files.Count is 0)
                continue;

            files.Sort((a, b) =>
            {
                var priorityComparison = a.Priority.CompareTo(b.Priority);
                return priorityComparison != 0 ? priorityComparison : a.FileSize.CompareTo(b.FileSize);
            });

            var plan = CreateLoadingPlan(files, group.Budget, group.PerFileLimit);

            if (plan.Items.Count is 0)
                continue;

            yield return new FileChunk($"<{group.SectionName}>\n", "", IsHeader: true, IsFooter: false, IsTruncated: false);

            await foreach (var chunk in StreamFilesAsync(plan, ct))
            {
                yield return chunk;
            }

            yield return new FileChunk($"</{group.SectionName}>\n\n", "", IsHeader: false, IsFooter: true, IsTruncated: false);
        }
    }

    public List<FileMetadata> DiscoverFiles(
        string directory,
        string[] includeExtensions,
        string[] excludeGlobPatterns,
        string relativeTo,
        Func<FileMetadata, int> priorityFunc)
    {
        var extensionSet = includeExtensions.Length > 0
            ? new HashSet<string>(includeExtensions, StringComparer.OrdinalIgnoreCase)
            : null;

        Matcher? excludeMatcher = null;
        if (excludeGlobPatterns.Length > 0)
        {
            excludeMatcher = new Matcher(StringComparison.OrdinalIgnoreCase);
            excludeMatcher.AddIncludePatterns(excludeGlobPatterns);
        }

        List<FileMetadata> files = [];

        if (!Directory.Exists(directory))
        {
            _logger?.LogWarning("Directory does not exist: {directory}", directory);
            return files;
        }

        var enumerationOptions = new EnumerationOptions
        {
            RecurseSubdirectories = true,
            IgnoreInaccessible = true,
            AttributesToSkip = FileAttributes.Hidden | FileAttributes.System
        };

        foreach (var filePath in Directory.EnumerateFiles(directory, "*.*", enumerationOptions))
        {
            if (extensionSet != null)
            {
                var ext = Path.GetExtension(filePath);
                if (!extensionSet.Contains(ext))
                    continue;
            }

            if (excludeMatcher != null)
            {
                var globPath = Path.GetRelativePath(relativeTo, filePath).Replace(Path.DirectorySeparatorChar, '/');
                if (excludeMatcher.Match(globPath).HasMatches)
                    continue;
            }

            // Get file size without full FileInfo overhead
            var fileSize = new FileInfo(filePath).Length;
            var relativePath = Path.GetRelativePath(relativeTo, filePath);

            var metadata = new FileMetadata(
                FilePath: filePath,
                RelativePath: relativePath,
                FileSize: fileSize,
                Priority: 0
            );

            metadata = metadata with { Priority = priorityFunc(metadata) };
            files.Add(metadata);
        }

        files.Sort((a, b) =>
        {
            var priorityComparison = a.Priority.CompareTo(b.Priority);
            return priorityComparison != 0 ? priorityComparison : a.FileSize.CompareTo(b.FileSize);
        });

        _logger?.LogDebug("Discovered {count} files in {directory}", files.Count, directory);
        return files;
    }

    public FileLoadingPlan CreateLoadingPlan(
        List<FileMetadata> files,
        int totalBudget,
        int perFileLimit)
    {
        List<FileLoadingItem> planItems = [];
        int remainingBudget = totalBudget;

        foreach (var file in files)
        {
            if (remainingBudget <= HeaderOverhead)
                break;

            var availableBudget = remainingBudget - HeaderOverhead;
            // Safely clamp file size to int range for budget calculation
            var effectiveFileSize = (int)Math.Min(file.FileSize, int.MaxValue);
            var contentToLoad = Math.Min(Math.Min(effectiveFileSize, perFileLimit), availableBudget);

            if (contentToLoad <= 0)
                continue;

            // Rough token estimation: ~4 characters per token
            var estimatedTokens = contentToLoad / 4;

            planItems.Add(new FileLoadingItem(
                FilePath: file.FilePath,
                RelativePath: file.RelativePath,
                FileSize: file.FileSize,
                ContentToLoad: contentToLoad,
                EstimatedTokens: estimatedTokens,
                IsTruncated: contentToLoad < file.FileSize,
                GroupName: file.GroupName
            ));

            remainingBudget -= contentToLoad + HeaderOverhead;
        }

        _logger?.LogDebug("Loading plan: {included}/{total} files, {used}/{budget} chars",
            planItems.Count, files.Count, totalBudget - remainingBudget, totalBudget);

        return new FileLoadingPlan(
            Items: planItems,
            TotalFilesFound: files.Count,
            TotalFilesIncluded: planItems.Count,
            TotalEstimatedTokens: planItems.Sum(item => item.EstimatedTokens),
            BudgetUsed: totalBudget - remainingBudget,
            TotalBudget: totalBudget
        );
    }

    private static async IAsyncEnumerable<FileChunk> StreamFilesAsync(
        FileLoadingPlan plan,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        foreach (var item in plan.Items)
        {
            yield return new FileChunk(
                $"<file path=\"{item.RelativePath}\" size=\"{item.FileSize}\" tokens=\"~{item.EstimatedTokens}\">\n",
                item.RelativePath,
                IsHeader: true,
                IsFooter: false,
                IsTruncated: false);

            await foreach (var chunk in StreamFileContentAsync(item, ct))
            {
                yield return chunk;
            }

            yield return new FileChunk(
                "\n</file>\n\n",
                item.RelativePath,
                IsHeader: false,
                IsFooter: true,
                IsTruncated: item.IsTruncated);
        }

        if (plan.TotalFilesFound > plan.TotalFilesIncluded)
        {
            var omitted = plan.TotalFilesFound - plan.TotalFilesIncluded;
            yield return new FileChunk(
                $"<!-- {omitted} additional files omitted due to budget -->\n",
                "",
                IsHeader: false,
                IsFooter: true,
                IsTruncated: false);
        }
    }

    private static async IAsyncEnumerable<FileChunk> StreamFileContentAsync(
        FileLoadingItem item,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        const int ChunkSize = 8192; // 8KB chunks

        await using var stream = new FileStream(
            item.FilePath,
            FileMode.Open,
            FileAccess.Read,
            FileShare.Read,
            FileBufferSize,
            FileOptions.Asynchronous | FileOptions.SequentialScan);

        using var reader = new StreamReader(stream, Encoding.UTF8);

        var buffer = new char[ChunkSize];
        var totalRead = 0;
        var bytesToRead = item.ContentToLoad;

        while (totalRead < bytesToRead)
        {
            var remaining = bytesToRead - totalRead;
            var toRead = Math.Min(ChunkSize, remaining);

            var charsRead = await reader.ReadAsync(buffer.AsMemory(0, toRead), ct);
            if (charsRead == 0) break;

            totalRead += charsRead;
            yield return new FileChunk(
                new string(buffer.AsSpan(0, charsRead)),
                item.RelativePath,
                IsHeader: false,
                IsFooter: false,
                IsTruncated: false);
        }

        if (item.IsTruncated)
        {
            yield return new FileChunk(
                "\n// ... truncated ...",
                item.RelativePath,
                IsHeader: false,
                IsFooter: false,
                IsTruncated: true);
        }
    }

    public static string? ValidateEmptyDirectory(string dir)
    {
        if (string.IsNullOrWhiteSpace(dir))
            return "Directory must be defined";

        var fullDir = Path.GetFullPath(dir.Trim());
        if (!Directory.Exists(fullDir))
            return $"Directory '{fullDir}' does not exist";

        if (Directory.GetFileSystemEntries(fullDir).Length != 0)
            return $"Directory '{fullDir}' is not empty";

        return null;
    }
}
