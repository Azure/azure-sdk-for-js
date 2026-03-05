// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Helpers;
using Xunit;

namespace Microsoft.SdkChat.Tests.Helpers;

/// <summary>
/// Tests for the PathSanitizer utility.
/// </summary>
public class PathSanitizerTests
{
    #region SanitizeFileName Tests

    [Theory]
    [InlineData("ValidName", "ValidName")]
    [InlineData("Name With Spaces", "Name_With_Spaces")]
    [InlineData("Name:With:Colons", "Name_With_Colons")]
    [InlineData("", "Sample")]
    public void SanitizeFileName_HandlesVariousInputs(string? input, string expected)
    {
        var result = PathSanitizer.SanitizeFileName(input!);
        Assert.Equal(expected, result);
    }

    [Fact]
    public void SanitizeFileName_ReplacesSlashes()
    {
        // Forward slashes are always invalid in file names
        var result = PathSanitizer.SanitizeFileName("Name/With/Slashes");
        Assert.DoesNotContain("/", result);
    }

    [Fact]
    public void SanitizeFileName_PreservesValidCharacters()
    {
        var result = PathSanitizer.SanitizeFileName("Valid_Name-123.test");
        Assert.Equal("Valid_Name-123.test", result);
    }

    [Fact]
    public void SanitizeFileName_ReplacesInvalidPlatformChars()
    {
        // Test against actual platform-specific invalid chars
        var invalidChars = Path.GetInvalidFileNameChars();
        foreach (var c in invalidChars.Where(c => c != '\0')) // Skip null for easier testing
        {
            var input = $"Name{c}Test";
            var result = PathSanitizer.SanitizeFileName(input);
            Assert.DoesNotContain(c.ToString(), result);
        }
    }

    #endregion

    #region SanitizeFilePath Tests

    [Theory]
    [InlineData("simple.cs", ".cs", "simple.cs")]
    [InlineData("folder/file.cs", ".cs", "folder/file.cs")]
    [InlineData("folder\\file.cs", ".cs", "folder/file.cs")]
    [InlineData("a/b/c/file.cs", ".cs", "a/b/c/file.cs")]
    [InlineData("", ".cs", "Sample.cs")]
    [InlineData(null, ".cs", "Sample.cs")]
    public void SanitizeFilePath_HandlesVariousPaths(string? input, string ext, string expectedPattern)
    {
        var result = PathSanitizer.SanitizeFilePath(input!, ext);
        // Normalize for cross-platform comparison
        var normalized = result.Replace(Path.DirectorySeparatorChar, '/');
        Assert.Equal(expectedPattern, normalized);
    }

    [Fact]
    public void SanitizeFilePath_AddsExtensionIfMissing()
    {
        var result = PathSanitizer.SanitizeFilePath("NoExtension", ".py");
        Assert.EndsWith(".py", result);
    }

    [Fact]
    public void SanitizeFilePath_FixesIncorrectExtension()
    {
        var result = PathSanitizer.SanitizeFilePath("file.txt", ".cs");
        Assert.EndsWith(".cs", result);
    }

    [Fact]
    public void SanitizeFilePath_PreservesCorrectExtension()
    {
        var result = PathSanitizer.SanitizeFilePath("file.cs", ".cs");
        Assert.EndsWith(".cs", result);
        Assert.DoesNotContain(".cs.cs", result);
    }

    [Fact]
    public void SanitizeFilePath_SanitizesEachPathSegment()
    {
        var result = PathSanitizer.SanitizeFilePath("path:with/bad:chars/file.cs", ".cs");
        Assert.DoesNotContain(":", result);
    }

    [Fact]
    public void SanitizeFilePath_RemovesEmptySegments()
    {
        var result = PathSanitizer.SanitizeFilePath("a//b///c/file.cs", ".cs");
        Assert.DoesNotContain("//", result.Replace(Path.DirectorySeparatorChar, '/'));
    }

    [Fact]
    public void SanitizeFilePath_HandlesDeepNesting()
    {
        var result = PathSanitizer.SanitizeFilePath("a/b/c/d/e/f/g/file.cs", ".cs");
        var segments = result.Split(Path.DirectorySeparatorChar);
        Assert.Equal(8, segments.Length);
    }

    [Theory]
    [InlineData("../../../etc/passwd", ".cs")]
    [InlineData("..\\..\\Windows\\System32\\config", ".cs")]
    [InlineData("a/../b/../c/file.cs", ".cs")]
    [InlineData("./file.cs", ".cs")]
    [InlineData("a/./b/file.cs", ".cs")]
    public void SanitizeFilePath_BlocksPathTraversalAttempts(string maliciousPath, string ext)
    {
        var result = PathSanitizer.SanitizeFilePath(maliciousPath, ext);

        // Result should not contain any ".." or "." path components
        var normalizedResult = result.Replace(Path.DirectorySeparatorChar, '/');
        var parts = normalizedResult.Split('/');
        Assert.DoesNotContain("..", parts);
        Assert.DoesNotContain(".", parts);

        // Result should be a safe relative path
        Assert.False(Path.IsPathRooted(result), "Result should not be an absolute path");
    }

    [Fact]
    public void SanitizeFilePath_OnlyDotsReturnsDefault()
    {
        var result = PathSanitizer.SanitizeFilePath("../../../..", ".cs");
        Assert.Equal("Sample.cs", result);
    }

    #endregion
}
