// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for samples detection functionality in PackageInfoService.
/// Entity group: samples
/// </summary>
public class SamplesServiceTests : PackageInfoTestBase
{
    [Fact]
    public async Task DetectSamplesFolderAsync_WithSamplesFolder_DetectsIt()
    {
        // Arrange
        var samplesDir = Path.Combine(TestRoot, "samples");
        Directory.CreateDirectory(samplesDir);
        File.WriteAllText(Path.Combine(samplesDir, "example.cs"), "class Example {}");

        // Act
        var result = await Service.DetectSamplesFolderAsync(TestRoot);

        // Assert
        Assert.True(result.HasExistingSamples);
        Assert.Equal(samplesDir, result.SamplesFolder);
        Assert.Contains(samplesDir, result.AllCandidates);
    }

    [Fact]
    public async Task DetectSamplesFolderAsync_WithExamplesFolder_DetectsIt()
    {
        // Arrange
        var examplesDir = Path.Combine(TestRoot, "examples");
        Directory.CreateDirectory(examplesDir);
        File.WriteAllText(Path.Combine(examplesDir, "demo.py"), "print('demo')");

        // Act
        var result = await Service.DetectSamplesFolderAsync(TestRoot);

        // Assert
        Assert.True(result.HasExistingSamples);
        Assert.Equal(examplesDir, result.SamplesFolder);
    }

    [Fact]
    public async Task DetectSamplesFolderAsync_WithDemoFolder_DetectsIt()
    {
        // Arrange
        var demoDir = Path.Combine(TestRoot, "demo");
        Directory.CreateDirectory(demoDir);
        File.WriteAllText(Path.Combine(demoDir, "demo.go"), "package main");

        // Act
        var result = await Service.DetectSamplesFolderAsync(TestRoot);

        // Assert
        Assert.True(result.HasExistingSamples);
        Assert.Equal(demoDir, result.SamplesFolder);
    }

    [Fact]
    public async Task DetectSamplesFolderAsync_NoSamplesFolder_ReturnsSuggested()
    {
        // Arrange - No samples folder, just a source folder
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "code.cs"), "class Code {}");

        // Act
        var result = await Service.DetectSamplesFolderAsync(TestRoot);

        // Assert
        Assert.False(result.HasExistingSamples);
        Assert.Null(result.SamplesFolder);
        Assert.NotNull(result.SuggestedSamplesFolder);
        Assert.EndsWith("examples", result.SuggestedSamplesFolder);
    }

    [Fact]
    public async Task DetectSamplesFolderAsync_MultipleCandidates_ReturnsAll()
    {
        // Arrange
        var samplesDir = Path.Combine(TestRoot, "samples");
        var examplesDir = Path.Combine(TestRoot, "examples");
        Directory.CreateDirectory(samplesDir);
        Directory.CreateDirectory(examplesDir);
        File.WriteAllText(Path.Combine(samplesDir, "sample1.cs"), "class S1 {}");
        File.WriteAllText(Path.Combine(examplesDir, "example1.cs"), "class E1 {}");

        // Act
        var result = await Service.DetectSamplesFolderAsync(TestRoot);

        // Assert
        Assert.True(result.HasExistingSamples);
        Assert.True(result.AllCandidates.Length >= 2);
    }
}
