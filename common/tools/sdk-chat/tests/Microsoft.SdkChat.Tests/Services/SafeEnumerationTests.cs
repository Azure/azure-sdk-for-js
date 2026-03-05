// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for SdkInfo.EnumerateFilesSafely to ensure dangerous folders are skipped.
/// </summary>
public class SafeEnumerationTests : IDisposable
{
    private readonly string _testDir;

    public SafeEnumerationTests()
    {
        _testDir = Path.Combine(Path.GetTempPath(), $"sdk-chat-test-{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testDir);
    }

    public void Dispose()
    {
        if (Directory.Exists(_testDir))
        {
            Directory.Delete(_testDir, recursive: true);
        }
    }

    [Fact]
    public void ExcludedFolders_ContainsNodeModules()
    {
        Assert.Contains("node_modules", (ISet<string>)SdkInfo.ExcludedFolders);
    }

    [Fact]
    public void ExcludedFolders_ContainsGit()
    {
        Assert.Contains(".git", (ISet<string>)SdkInfo.ExcludedFolders);
    }

    [Fact]
    public void ExcludedFolders_ContainsBuildArtifacts()
    {
        Assert.Contains("bin", (ISet<string>)SdkInfo.ExcludedFolders);
        Assert.Contains("obj", (ISet<string>)SdkInfo.ExcludedFolders);
        Assert.Contains("dist", (ISet<string>)SdkInfo.ExcludedFolders);
        Assert.Contains("build", (ISet<string>)SdkInfo.ExcludedFolders);
        Assert.Contains("target", (ISet<string>)SdkInfo.ExcludedFolders);
    }

    [Fact]
    public void EnumerateFilesSafely_ReturnsFilesInRoot()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testDir, "test.cs"), "// test");

        // Act
        var files = SdkInfo.EnumerateFilesSafely(_testDir, "*.cs").ToList();

        // Assert
        Assert.Single(files);
        Assert.EndsWith("test.cs", files[0]);
    }

    [Fact]
    public void EnumerateFilesSafely_SkipsNodeModules()
    {
        // Arrange
        var nodeModules = Path.Combine(_testDir, "node_modules");
        Directory.CreateDirectory(nodeModules);
        File.WriteAllText(Path.Combine(nodeModules, "package.js"), "// ignored");
        File.WriteAllText(Path.Combine(_testDir, "app.js"), "// included");

        // Act
        var files = SdkInfo.EnumerateFilesSafely(_testDir, "*.js").ToList();

        // Assert
        Assert.Single(files);
        Assert.EndsWith("app.js", files[0]);
    }

    [Fact]
    public void EnumerateFilesSafely_SkipsGitFolder()
    {
        // Arrange
        var gitDir = Path.Combine(_testDir, ".git");
        Directory.CreateDirectory(gitDir);
        File.WriteAllText(Path.Combine(gitDir, "config"), "# git config");
        File.WriteAllText(Path.Combine(_testDir, "readme.md"), "# readme");

        // Act
        var files = SdkInfo.EnumerateFilesSafely(_testDir, "*.*").ToList();

        // Assert
        Assert.Single(files);
        Assert.EndsWith("readme.md", files[0]);
    }

    [Fact]
    public void EnumerateFilesSafely_SkipsBinObj()
    {
        // Arrange
        var binDir = Path.Combine(_testDir, "bin");
        var objDir = Path.Combine(_testDir, "obj");
        Directory.CreateDirectory(binDir);
        Directory.CreateDirectory(objDir);
        File.WriteAllText(Path.Combine(binDir, "app.dll"), "binary");
        File.WriteAllText(Path.Combine(objDir, "temp.cs"), "temp");
        File.WriteAllText(Path.Combine(_testDir, "Program.cs"), "// main");

        // Act
        var files = SdkInfo.EnumerateFilesSafely(_testDir, "*.*").ToList();

        // Assert
        Assert.Single(files);
        Assert.EndsWith("Program.cs", files[0]);
    }

    [Fact]
    public void EnumerateFilesSafely_RespectsMaxFiles()
    {
        // Arrange
        for (int i = 0; i < 20; i++)
        {
            File.WriteAllText(Path.Combine(_testDir, $"file{i}.txt"), "content");
        }

        // Act
        var files = SdkInfo.EnumerateFilesSafely(_testDir, "*.txt", maxFiles: 5).ToList();

        // Assert
        Assert.Equal(5, files.Count);
    }

    [Fact]
    public void EnumerateFilesSafely_RecursesIntoSafeSubdirs()
    {
        // Arrange
        var srcDir = Path.Combine(_testDir, "src");
        var libDir = Path.Combine(srcDir, "lib");
        Directory.CreateDirectory(libDir);
        File.WriteAllText(Path.Combine(srcDir, "main.cs"), "// main");
        File.WriteAllText(Path.Combine(libDir, "helper.cs"), "// helper");

        // Act
        var files = SdkInfo.EnumerateFilesSafely(_testDir, "*.cs").ToList();

        // Assert
        Assert.Equal(2, files.Count);
    }

    [Fact]
    public void EnumerateFilesSafely_NonExistentDirectory_ReturnsEmpty()
    {
        // Act
        var files = SdkInfo.EnumerateFilesSafely("/nonexistent/path", "*.cs").ToList();

        // Assert
        Assert.Empty(files);
    }

    [Fact]
    public void CountFilesSafely_CountsCorrectly()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testDir, "a.cs"), "// a");
        File.WriteAllText(Path.Combine(_testDir, "b.cs"), "// b");
        var nodeModules = Path.Combine(_testDir, "node_modules");
        Directory.CreateDirectory(nodeModules);
        File.WriteAllText(Path.Combine(nodeModules, "c.cs"), "// ignored");

        // Act
        var count = SdkInfo.CountFilesSafely(_testDir, "*.cs");

        // Assert
        Assert.Equal(2, count);
    }
}
