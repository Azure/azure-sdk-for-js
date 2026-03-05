// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.SdkChat.Helpers;
using Xunit;

namespace Microsoft.SdkChat.Tests.Helpers;

/// <summary>
/// Tests for FileHelper large file handling - verifies long file size support.
/// </summary>
public class FileHelperLargeFileTests : IDisposable
{
    private readonly string _testDir;
    private readonly FileHelper _fileHelper;

    public FileHelperLargeFileTests()
    {
        _testDir = Path.Combine(Path.GetTempPath(), $"FileHelperLargeFileTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testDir);
        _fileHelper = new FileHelper(NullLogger<FileHelper>.Instance);
    }

    public void Dispose()
    {
        if (Directory.Exists(_testDir))
        {
            Directory.Delete(_testDir, recursive: true);
        }
    }

    [Fact]
    public void FileMetadata_CanStoreLargeFileSize()
    {
        // Arrange - simulate a file larger than int.MaxValue (> 2GB)
        long largeSize = (long)int.MaxValue + 1000;

        // Act
        var metadata = new FileMetadata(
            FilePath: "/path/to/large/file.bin",
            RelativePath: "file.bin",
            FileSize: largeSize,
            Priority: 0
        );

        // Assert
        Assert.Equal(largeSize, metadata.FileSize);
        Assert.True(metadata.FileSize > int.MaxValue);
    }

    [Fact]
    public void FileLoadingItem_CanStoreLargeFileSize()
    {
        // Arrange
        long largeSize = (long)int.MaxValue + 5000;

        // Act
        var item = new FileLoadingItem(
            FilePath: "/path/to/large/file.bin",
            RelativePath: "file.bin",
            FileSize: largeSize,
            ContentToLoad: 10000, // Budget-constrained, always fits in int
            EstimatedTokens: 2500,
            IsTruncated: true
        );

        // Assert
        Assert.Equal(largeSize, item.FileSize);
        Assert.Equal(10000, item.ContentToLoad);
    }

    [Fact]
    public void DiscoverFiles_ReportsCorrectFileSize()
    {
        // Arrange
        var testFile = Path.Combine(_testDir, "test.txt");
        var content = new string('x', 10000);
        File.WriteAllText(testFile, content);

        // Act
        var files = _fileHelper.DiscoverFiles(
            _testDir,
            includeExtensions: [".txt"],
            excludeGlobPatterns: [],
            relativeTo: _testDir,
            priorityFunc: _ => 0);

        // Assert
        Assert.Single(files);
        Assert.Equal(10000, files[0].FileSize);
    }

    [Fact]
    public void CreateLoadingPlan_ClampsLargeFilesToBudget()
    {
        // Arrange - simulate a very large file
        long largeSize = (long)int.MaxValue + 1000;
        var files = new List<FileMetadata>
        {
            new(
                FilePath: "/large.bin",
                RelativePath: "large.bin",
                FileSize: largeSize,
                Priority: 0
            )
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 50000, perFileLimit: 10000);

        // Assert - should clamp to budget, not overflow
        Assert.Single(plan.Items);
        Assert.Equal(10000, plan.Items[0].ContentToLoad); // Clamped to perFileLimit
        Assert.True(plan.Items[0].IsTruncated);
        Assert.Equal(largeSize, plan.Items[0].FileSize); // Original size preserved
    }

    [Fact]
    public void CreateLoadingPlan_SmallFiles_NotTruncated()
    {
        // Arrange
        var files = new List<FileMetadata>
        {
            new(
                FilePath: "/small.txt",
                RelativePath: "small.txt",
                FileSize: 500,
                Priority: 0
            )
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 10000, perFileLimit: 5000);

        // Assert
        Assert.Single(plan.Items);
        Assert.Equal(500, plan.Items[0].ContentToLoad);
        Assert.False(plan.Items[0].IsTruncated);
    }

    [Fact]
    public void CreateLoadingPlan_BudgetExhausted_StopsIncludingFiles()
    {
        // Arrange - files larger than budget allows for all
        var files = new List<FileMetadata>
        {
            new("/file1.txt", "file1.txt", 1000, Priority: 0),
            new("/file2.txt", "file2.txt", 1000, Priority: 1),
            new("/file3.txt", "file3.txt", 1000, Priority: 2)
        };

        // Act - budget of 1500 with header overhead of 50 each
        // First file: 1000 + 50 = 1050, remaining: 450
        // Second file: would need 1000 + 50 = 1050, but only 450 available
        // So second file gets truncated to 400 chars
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 1500, perFileLimit: 5000);

        // Assert - only 2 files fit (first full, second partial)
        Assert.Equal(2, plan.TotalFilesIncluded);
        Assert.Equal(3, plan.TotalFilesFound);
    }

    [Fact]
    public async Task StreamFilesAsync_WithGroups_IncludesSectionTags()
    {
        // Arrange
        var testFile = Path.Combine(_testDir, "test.cs");
        File.WriteAllText(testFile, "public class Test { }");

        var groups = new[]
        {
            new SourceInputGroup(
                SectionName: "source-code",
                Inputs: [new SourceInputSpec(_testDir, IncludeExtensions: [".cs"])],
                Budget: 10000
            )
        };

        // Act
        var chunks = new List<FileChunk>();
        await foreach (var chunk in _fileHelper.StreamFilesAsync(groups, _testDir))
        {
            chunks.Add(chunk);
        }

        // Assert - should have section open, file content, section close
        Assert.True(chunks.Count >= 3);
        Assert.Contains(chunks, c => c.Content.Contains("<source-code>", StringComparison.Ordinal));
        Assert.Contains(chunks, c => c.Content.Contains("</source-code>", StringComparison.Ordinal));
        Assert.Contains(chunks, c => c.Content.Contains("public class Test", StringComparison.Ordinal));
    }
}
