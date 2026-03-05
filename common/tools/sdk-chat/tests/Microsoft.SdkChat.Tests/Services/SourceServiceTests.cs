// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for source detection functionality in PackageInfoService.
/// Entity group: source
/// </summary>
public class SourceServiceTests : PackageInfoTestBase
{
    [Fact]
    public async Task DetectSourceFolderAsync_DotNetProject_ReturnsCorrectInfo()
    {
        // Arrange
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "MyProject.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "Program.cs"), "class Program { }");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert
        Assert.True(result.IsValid);
        Assert.Equal("DotNet", result.Language);
        Assert.Equal("dotnet", result.LanguageName);
        Assert.Equal(".cs", result.FileExtension);
        Assert.Equal(srcDir, result.SourceFolder);
        Assert.Equal(TestRoot, result.RootPath);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_PythonProject_ReturnsCorrectInfo()
    {
        // Arrange
        File.WriteAllText(Path.Combine(TestRoot, "pyproject.toml"), "[project]");
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "main.py"), "print('hello')");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert
        Assert.True(result.IsValid);
        Assert.Equal("Python", result.Language);
        Assert.Equal("python", result.LanguageName);
        Assert.Equal(".py", result.FileExtension);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_TypeScriptProject_ReturnsCorrectInfo()
    {
        // Arrange
        File.WriteAllText(Path.Combine(TestRoot, "package.json"), "{}");
        File.WriteAllText(Path.Combine(TestRoot, "tsconfig.json"), "{}");
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "index.ts"), "export const x = 1;");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert
        Assert.True(result.IsValid);
        Assert.Equal("TypeScript", result.Language);
        Assert.Equal(".ts", result.FileExtension);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_GoProject_ReturnsCorrectInfo()
    {
        // Arrange
        File.WriteAllText(Path.Combine(TestRoot, "go.mod"), "module example.com/test");
        File.WriteAllText(Path.Combine(TestRoot, "main.go"), "package main");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert
        Assert.True(result.IsValid);
        Assert.Equal("Go", result.Language);
        Assert.Equal(".go", result.FileExtension);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_JavaProject_ReturnsCorrectInfo()
    {
        // Arrange
        File.WriteAllText(Path.Combine(TestRoot, "pom.xml"), "<project></project>");
        var srcDir = Path.Combine(TestRoot, "src", "main", "java");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "Main.java"), "public class Main {}");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert
        Assert.True(result.IsValid);
        Assert.Equal("Java", result.Language);
        Assert.Equal(".java", result.FileExtension);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_WithLanguageOverride_UsesOverride()
    {
        // Arrange - Create a project that looks like Python but override to DotNet
        File.WriteAllText(Path.Combine(TestRoot, "pyproject.toml"), "[project]");
        File.WriteAllText(Path.Combine(TestRoot, "main.py"), "print('hello')");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot, language: "dotnet");

        // Assert
        Assert.Equal("DotNet", result.Language);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_UnknownProject_ReturnsInvalid()
    {
        // Arrange - Empty directory with no recognizable project files
        // Just create a random file
        File.WriteAllText(Path.Combine(TestRoot, "readme.txt"), "hello");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert
        Assert.Null(result.Language);
        Assert.Null(result.LanguageName);
    }

    [Fact]
    public async Task DetectSourceFolderAsync_Cancellation_ThrowsOperationCanceled()
    {
        // Arrange
        var cts = new CancellationTokenSource();
        cts.Cancel();

        // Act & Assert - TaskCanceledException is a subclass of OperationCanceledException
        await Assert.ThrowsAnyAsync<OperationCanceledException>(
            () => Service.DetectSourceFolderAsync(TestRoot, ct: cts.Token));
    }

    [Fact]
    public async Task DetectSourceFolderAsync_TypeScript_PrefersRootOverSamplesSubproject()
    {
        // Arrange - Root has a tsconfig.json + package.json with src/ containing fewer files
        File.WriteAllText(Path.Combine(TestRoot, "package.json"), """{"name":"@test/sdk"}""");
        File.WriteAllText(Path.Combine(TestRoot, "tsconfig.json"), """{"references":[]}""");
        var rootSrc = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(rootSrc);
        for (int i = 0; i < 5; i++)
            File.WriteAllText(Path.Combine(rootSrc, $"file{i}.ts"), $"export const x{i} = {i};");

        // samples/ subdirectory has its own tsconfig with MORE .ts files
        var sampleDir = Path.Combine(TestRoot, "samples", "v2-beta", "typescript");
        var sampleSrc = Path.Combine(sampleDir, "src");
        Directory.CreateDirectory(sampleSrc);
        File.WriteAllText(Path.Combine(sampleDir, "tsconfig.json"), """{"include":["./src"]}""");
        for (int i = 0; i < 20; i++)
            File.WriteAllText(Path.Combine(sampleSrc, $"sample{i}.ts"), $"async function main{i}() {{}}");

        // Act
        var result = await Service.DetectSourceFolderAsync(TestRoot);

        // Assert - Should pick root src/, not samples/v2-beta/typescript/src
        Assert.True(result.IsValid);
        Assert.Equal("TypeScript", result.Language);
        Assert.Equal(rootSrc, result.SourceFolder);
    }
}
