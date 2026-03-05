// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using Microsoft.SdkChat.Helpers;
using Xunit;

namespace Microsoft.SdkChat.Tests.Helpers;

public class FileHelperTests : IDisposable
{
    private readonly string _testDir;
    private readonly FileHelper _fileHelper;

    public FileHelperTests()
    {
        _testDir = Path.Combine(Path.GetTempPath(), $"FileHelperTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testDir);
        _fileHelper = new FileHelper();
    }

    public void Dispose()
    {
        if (Directory.Exists(_testDir))
        {
            Directory.Delete(_testDir, recursive: true);
        }
    }

    #region DiscoverFiles Tests

    [Fact]
    public void DiscoverFiles_WithValidDirectory_ReturnsMatchingFiles()
    {
        // Arrange
        CreateFile("src/Client.cs", "public class Client { }");
        CreateFile("src/Models/User.cs", "public class User { }");
        CreateFile("src/readme.txt", "Documentation");
        CreateFile("tests/ClientTests.cs", "public class ClientTests { }");

        // Act
        var files = _fileHelper.DiscoverFiles(
            _testDir,
            includeExtensions: [".cs"],
            excludeGlobPatterns: [],
            relativeTo: _testDir,
            priorityFunc: _ => 0);

        // Assert
        Assert.Equal(3, files.Count);
        Assert.All(files, f => Assert.EndsWith(".cs", f.RelativePath));
    }

    [Fact]
    public void DiscoverFiles_WithExcludePatterns_FiltersOutMatchingFiles()
    {
        // Arrange
        CreateFile("src/Client.cs", "public class Client { }");
        CreateFile("src/obj/Debug/Client.g.cs", "// Generated");
        CreateFile("src/bin/Client.dll.cs", "// Binary");

        // Act
        var files = _fileHelper.DiscoverFiles(
            _testDir,
            includeExtensions: [".cs"],
            excludeGlobPatterns: ["**/obj/**", "**/bin/**"],
            relativeTo: _testDir,
            priorityFunc: _ => 0);

        // Assert
        Assert.Single(files);
        Assert.Contains("Client.cs", files[0].RelativePath);
    }

    [Fact]
    public void DiscoverFiles_SortsByPriorityThenSize()
    {
        // Arrange
        CreateFile("small_high.cs", "x");           // size 1, priority 1
        CreateFile("large_high.cs", new string('y', 100));  // size 100, priority 1
        CreateFile("small_low.cs", "z");            // size 1, priority 10
        CreateFile("large_low.cs", new string('w', 100));   // size 100, priority 10

        // Act
        var files = _fileHelper.DiscoverFiles(
            _testDir,
            includeExtensions: [".cs"],
            excludeGlobPatterns: [],
            relativeTo: _testDir,
            priorityFunc: f => f.RelativePath.Contains("high", StringComparison.Ordinal) ? 1 : 10);

        // Assert
        Assert.Equal(4, files.Count);
        // High priority first, smaller files first within same priority
        Assert.Contains("small_high", files[0].RelativePath);
        Assert.Contains("large_high", files[1].RelativePath);
        Assert.Contains("small_low", files[2].RelativePath);
        Assert.Contains("large_low", files[3].RelativePath);
    }

    [Fact]
    public void DiscoverFiles_WithNonExistentDirectory_ReturnsEmptyList()
    {
        // Act
        var files = _fileHelper.DiscoverFiles(
            Path.Combine(_testDir, "nonexistent"),
            includeExtensions: [".cs"],
            excludeGlobPatterns: [],
            relativeTo: _testDir,
            priorityFunc: _ => 0);

        // Assert
        Assert.Empty(files);
    }

    [Fact]
    public void DiscoverFiles_WithNoExtensionFilter_ReturnsAllFiles()
    {
        // Arrange
        CreateFile("file.cs", "code");
        CreateFile("file.js", "script");
        CreateFile("file.txt", "text");

        // Act
        var files = _fileHelper.DiscoverFiles(
            _testDir,
            includeExtensions: [],
            excludeGlobPatterns: [],
            relativeTo: _testDir,
            priorityFunc: _ => 0);

        // Assert
        Assert.Equal(3, files.Count);
    }

    #endregion

    #region CreateLoadingPlan Tests

    [Fact]
    public void CreateLoadingPlan_WithinBudget_IncludesAllFiles()
    {
        // Arrange
        var files = new List<FileMetadata>
        {
            new("file1.cs", "file1.cs", 100, 1),
            new("file2.cs", "file2.cs", 200, 2),
            new("file3.cs", "file3.cs", 150, 3)
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 1000, perFileLimit: 500);

        // Assert
        Assert.Equal(3, plan.TotalFilesIncluded);
        Assert.Equal(3, plan.TotalFilesFound);
        Assert.True(plan.BudgetUsed < 1000);
    }

    [Fact]
    public void CreateLoadingPlan_ExceedsBudget_TruncatesFileList()
    {
        // Arrange
        var files = new List<FileMetadata>
        {
            new("file1.cs", "file1.cs", 100, 1),
            new("file2.cs", "file2.cs", 200, 2),
            new("file3.cs", "file3.cs", 1000, 3)  // This should push over budget
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 400, perFileLimit: 500);

        // Assert
        Assert.True(plan.TotalFilesIncluded < 3);
        Assert.Equal(3, plan.TotalFilesFound);
    }

    [Fact]
    public void CreateLoadingPlan_LargeFile_TruncatesToPerFileLimit()
    {
        // Arrange
        var files = new List<FileMetadata>
        {
            new("large.cs", "large.cs", 10000, 1)
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 50000, perFileLimit: 500);

        // Assert
        Assert.Single(plan.Items);
        Assert.Equal(500, plan.Items[0].ContentToLoad);
        Assert.True(plan.Items[0].IsTruncated);
    }

    [Fact]
    public void CreateLoadingPlan_PreservesGroupName()
    {
        // Arrange
        var files = new List<FileMetadata>
        {
            new("sample.cs", "sample.cs", 100, 1, "samples"),
            new("source.cs", "source.cs", 200, 10, "source")
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 1000, perFileLimit: 500);

        // Assert
        Assert.Equal("samples", plan.Items[0].GroupName);
        Assert.Equal("source", plan.Items[1].GroupName);
    }

    [Fact]
    public void CreateLoadingPlan_EstimatesTokensCorrectly()
    {
        // Arrange
        var files = new List<FileMetadata>
        {
            new("file.cs", "file.cs", 400, 1)
        };

        // Act
        var plan = _fileHelper.CreateLoadingPlan(files, totalBudget: 1000, perFileLimit: 500);

        // Assert
        // 400 chars / 4 = 100 tokens
        Assert.Equal(100, plan.Items[0].EstimatedTokens);
    }

    #endregion

    #region StreamFilesAsync Tests

    [Fact]
    public async Task StreamFilesAsync_SingleGroup_StreamsContent()
    {
        // Arrange
        CreateFile("src/Client.cs", "public class Client { }");
        CreateFile("src/Service.cs", "public class Service { }");

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(Path.Combine(_testDir, "src"), [".cs"])],
                Budget: 10000,
                PerFileLimit: 5000)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        Assert.Contains("Client.cs", result);
        Assert.Contains("Service.cs", result);
        Assert.Contains("<source-code>", result);
        Assert.Contains("</source-code>", result);
    }

    [Fact]
    public async Task StreamFilesAsync_MultipleGroups_StreamsInOrder()
    {
        // Arrange
        CreateFile("samples/sample.cs", "// sample");
        CreateFile("src/source.cs", "// source");

        var groups = new[]
        {
            new SourceInputGroup(
                "existing-samples",
                [new SourceInputSpec(Path.Combine(_testDir, "samples"), [".cs"])],
                Budget: 5000),
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(Path.Combine(_testDir, "src"), [".cs"])],
                Budget: 5000)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert - sections appear in order provided
        var samplesIndex = result.IndexOf("<existing-samples>", StringComparison.Ordinal);
        var sourceIndex = result.IndexOf("<source-code>", StringComparison.Ordinal);
        Assert.True(samplesIndex < sourceIndex, "Samples section should appear before source section");
    }

    [Fact]
    public async Task StreamFilesAsync_WithPriorityFunc_OrdersCorrectly()
    {
        // Arrange
        CreateFile("low.cs", "low priority");
        CreateFile("high.cs", "high priority");

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(_testDir, [".cs"])],
                Budget: 10000,
                PerFileLimit: 5000,
                PriorityFunc: f => f.RelativePath.Contains("high", StringComparison.Ordinal) ? 1 : 10)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        var highIndex = result.IndexOf("high.cs", StringComparison.Ordinal);
        var lowIndex = result.IndexOf("low.cs", StringComparison.Ordinal);
        Assert.True(highIndex < lowIndex, "High priority file should appear first");
    }

    [Fact]
    public async Task StreamFilesAsync_EmptyGroup_OmitsSection()
    {
        // Arrange
        CreateFile("src/source.cs", "// source");
        // No samples directory

        var groups = new[]
        {
            new SourceInputGroup(
                "existing-samples",
                [new SourceInputSpec(Path.Combine(_testDir, "samples"), [".cs"])],
                Budget: 5000),
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(Path.Combine(_testDir, "src"), [".cs"])],
                Budget: 5000)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        Assert.DoesNotContain("<existing-samples>", result);
        Assert.Contains("<source-code>", result);
    }

    [Fact]
    public async Task StreamFilesAsync_EachGroupHasOwnBudget()
    {
        // Arrange
        var largeContent = new string('x', 500);
        CreateFile("samples/s1.cs", largeContent);
        CreateFile("samples/s2.cs", largeContent);
        CreateFile("src/source.cs", largeContent);

        var groups = new[]
        {
            new SourceInputGroup(
                "existing-samples",
                [new SourceInputSpec(Path.Combine(_testDir, "samples"), [".cs"])],
                Budget: 400,  // Tight budget - may truncate
                PerFileLimit: 300),
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(Path.Combine(_testDir, "src"), [".cs"])],
                Budget: 1000,  // More generous budget
                PerFileLimit: 800)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert - both sections should appear since each has its own budget
        Assert.Contains("<existing-samples>", result);
        Assert.Contains("<source-code>", result);
    }

    [Fact]
    public async Task StreamFilesAsync_MultipleInputsPerGroup_CombinesCorrectly()
    {
        // Arrange
        CreateFile("src/client/Client.cs", "// client");
        CreateFile("src/models/Model.cs", "// model");

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [
                    new SourceInputSpec(Path.Combine(_testDir, "src", "client"), [".cs"]),
                    new SourceInputSpec(Path.Combine(_testDir, "src", "models"), [".cs"])
                ],
                Budget: 10000)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        Assert.Contains("Client.cs", result);
        Assert.Contains("Model.cs", result);
        // Both files should be in the same source-code section
        var sourceCodeCount = result.Split("<source-code>").Length - 1;
        Assert.Equal(1, sourceCodeCount);  // Should only have one source-code section
    }

    [Fact]
    public async Task StreamFilesAsync_TruncatesLargeFiles()
    {
        // Arrange
        var largeContent = new string('x', 1000);
        CreateFile("large.cs", largeContent);

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(_testDir, [".cs"])],
                Budget: 200,
                PerFileLimit: 100)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        Assert.Contains("// ... truncated ...", result);
    }

    [Fact]
    public async Task StreamFilesAsync_YieldsChunks()
    {
        // Arrange
        CreateFile("test.cs", "public class Test { }");

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(_testDir, [".cs"])],
                Budget: 10000)
        };

        // Act
        var chunks = new List<FileChunk>();
        await foreach (var chunk in _fileHelper.StreamFilesAsync(groups, _testDir))
        {
            chunks.Add(chunk);
        }

        // Assert
        Assert.True(chunks.Count >= 3);
        Assert.Contains(chunks, c => c.IsHeader);
        Assert.Contains(chunks, c => c.IsFooter);
    }

    [Fact]
    public async Task StreamFilesAsync_StreamsContentInChunks()
    {
        // Arrange - Large file to ensure multiple chunks
        var content = new string('x', 20000); // 20KB
        CreateFile("large.cs", content);

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(_testDir, [".cs"])],
                Budget: 25000)
        };

        // Act
        var chunks = new List<FileChunk>();
        await foreach (var chunk in _fileHelper.StreamFilesAsync(groups, _testDir))
        {
            chunks.Add(chunk);
        }

        // Assert
        var contentChunks = chunks.Where(c => !c.IsHeader && !c.IsFooter && !c.IsTruncated).ToList();
        Assert.True(contentChunks.Count >= 2); // Should be chunked
    }

    [Fact]
    public async Task StreamFilesAsync_OmittedFilesMessage_WhenOverBudget()
    {
        // Arrange - Create more files than budget allows
        for (int i = 0; i < 10; i++)
        {
            CreateFile($"file{i}.cs", new string('x', 100));
        }

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(_testDir, [".cs"])],
                Budget: 400,  // Only room for a few files
                PerFileLimit: 200)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        Assert.Contains("additional files omitted due to budget", result);
    }

    [Fact]
    public async Task StreamFilesAsync_ChunkSize_DoesNotExceed8KB()
    {
        // Arrange - Very large file
        var content = new string('y', 50000); // 50KB
        CreateFile("huge.cs", content);

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(_testDir, [".cs"])],
                Budget: 60000)
        };

        // Act
        var chunks = new List<FileChunk>();
        await foreach (var chunk in _fileHelper.StreamFilesAsync(groups, _testDir))
        {
            chunks.Add(chunk);
        }

        // Assert
        var contentChunks = chunks.Where(c => !c.IsHeader && !c.IsFooter && !c.IsTruncated).ToList();
        Assert.True(contentChunks.Count >= 6); // 50KB / 8KB = at least 6 chunks
        Assert.All(contentChunks, c => Assert.True(c.Content.Length <= 8192,
            $"Chunk size {c.Content.Length} exceeds 8KB limit"));
    }

    [Fact]
    public async Task StreamFilesAsync_TracksRelativePath()
    {
        // Arrange
        CreateFile("src/deep/nested/file.cs", "content");

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(Path.Combine(_testDir, "src"), [".cs"])],
                Budget: 10000)
        };

        // Act
        var chunks = new List<FileChunk>();
        await foreach (var chunk in _fileHelper.StreamFilesAsync(groups, _testDir))
        {
            chunks.Add(chunk);
        }

        // Assert
        var contentChunks = chunks.Where(c => !c.IsHeader && !c.IsFooter).ToList();
        Assert.Contains(contentChunks, c => c.RelativePath.Contains("nested", StringComparison.Ordinal));
    }

    [Fact]
    public async Task StreamFilesAsync_SingleFile_WorksCorrectly()
    {
        // Arrange
        CreateFile("single.cs", "// single file content");

        var groups = new[]
        {
            new SourceInputGroup(
                "source-code",
                [new SourceInputSpec(Path.Combine(_testDir, "single.cs"))],  // Direct file path
                Budget: 10000)
        };

        // Act
        var result = await CollectStreamedContent(groups);

        // Assert
        Assert.Contains("single file content", result);
        Assert.Contains("<source-code>", result);
    }

    #endregion

    #region Edge Cases

    [Fact]
    public void ValidateEmptyDirectory_NonExistent_ReturnsError()
    {
        // Act
        var result = FileHelper.ValidateEmptyDirectory(Path.Combine(_testDir, "nonexistent"));

        // Assert
        Assert.NotNull(result);
        Assert.Contains("does not exist", result);
    }

    [Fact]
    public void ValidateEmptyDirectory_NotEmpty_ReturnsError()
    {
        // Arrange
        CreateFile("file.txt", "content");

        // Act
        var result = FileHelper.ValidateEmptyDirectory(_testDir);

        // Assert
        Assert.NotNull(result);
        Assert.Contains("is not empty", result);
    }

    [Fact]
    public void ValidateEmptyDirectory_EmptyDirectory_ReturnsNull()
    {
        // Arrange
        var emptyDir = Path.Combine(_testDir, "empty");
        Directory.CreateDirectory(emptyDir);

        // Act
        var result = FileHelper.ValidateEmptyDirectory(emptyDir);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void ValidateEmptyDirectory_NullOrWhitespace_ReturnsError()
    {
        // Act & Assert
        Assert.NotNull(FileHelper.ValidateEmptyDirectory(""));
        Assert.NotNull(FileHelper.ValidateEmptyDirectory("   "));
        Assert.NotNull(FileHelper.ValidateEmptyDirectory(null!));
    }

    [Fact]
    public void FileChunk_RecordEquality_Works()
    {
        // Arrange
        var chunk1 = new FileChunk("content", "file.cs", false, false, false);
        var chunk2 = new FileChunk("content", "file.cs", false, false, false);
        var chunk3 = new FileChunk("different", "file.cs", false, false, false);

        // Assert
        Assert.Equal(chunk1, chunk2);
        Assert.NotEqual(chunk1, chunk3);
    }

    #endregion

    #region Helper Methods

    private void CreateFile(string relativePath, string content)
    {
        var fullPath = Path.Combine(_testDir, relativePath);
        var directory = Path.GetDirectoryName(fullPath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }
        File.WriteAllText(fullPath, content);
    }

    private async Task<string> CollectStreamedContent(IEnumerable<SourceInputGroup> groups)
    {
        var sb = new StringBuilder();
        await foreach (var chunk in _fileHelper.StreamFilesAsync(groups, _testDir))
        {
            sb.Append(chunk.Content);
        }
        return sb.ToString();
    }

    #endregion
}
