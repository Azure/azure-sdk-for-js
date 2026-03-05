// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Tests.Mocks;
using Microsoft.SdkChat.Tools.Package.Samples;
using Xunit;

namespace Microsoft.SdkChat.Tests.Tools;

/// <summary>
/// Tests for the SampleGeneratorTool CLI entry point.
/// Covers validation, error handling, dry-run mode, and output behavior.
/// </summary>
[Collection("SdkInfoCache")]
public class SampleGeneratorToolTests : IDisposable
{
    private readonly string _testRoot;
    private readonly string _validSdkPath;
    private readonly MockAiService _mockAiService;
    private readonly FileHelper _fileHelper;
    private readonly ILogger<SampleGeneratorTool> _logger;

    public SampleGeneratorToolTests()
    {
        _testRoot = Path.Combine(Path.GetTempPath(), $"SampleGeneratorToolTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testRoot);

        // Create a valid SDK structure for testing
        _validSdkPath = Path.Combine(_testRoot, "test-sdk");
        Directory.CreateDirectory(_validSdkPath);
        Directory.CreateDirectory(Path.Combine(_validSdkPath, "src"));
        File.WriteAllText(Path.Combine(_validSdkPath, "test-sdk.csproj"), @"<Project Sdk=""Microsoft.NET.Sdk""><PropertyGroup><TargetFramework>net8.0</TargetFramework></PropertyGroup></Project>");
        File.WriteAllText(Path.Combine(_validSdkPath, "src", "Client.cs"), @"namespace TestSdk { public class Client { public void Connect() { } } }");

        _mockAiService = new MockAiService();
        _fileHelper = new FileHelper();
        _logger = NullLogger<SampleGeneratorTool>.Instance;
    }

    public void Dispose()
    {
        SdkInfo.ClearCache();
        try
        {
            if (Directory.Exists(_testRoot))
                Directory.Delete(_testRoot, recursive: true);
        }
        catch { }
        GC.SuppressFinalize(this);
    }

    private SampleGeneratorTool CreateTool(IAiService? aiService = null)
    {
        return new SampleGeneratorTool(
            aiService ?? _mockAiService,
            _fileHelper,
            _logger);
    }

    #region Path Validation Tests

    [Fact]
    public async Task ExecuteAsync_NonexistentPath_ReturnsExitCode1()
    {
        var tool = CreateTool();
        var nonexistentPath = Path.Combine(_testRoot, "does-not-exist");

        var result = await tool.ExecuteAsync(
            sdkPath: nonexistentPath,
            outputPath: null,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.Equal(1, result);
    }

    [Fact]
    public async Task ExecuteAsync_EmptyDirectory_ReturnsExitCode1()
    {
        var tool = CreateTool();
        var emptyDir = Path.Combine(_testRoot, "empty");
        Directory.CreateDirectory(emptyDir);

        var result = await tool.ExecuteAsync(
            sdkPath: emptyDir,
            outputPath: null,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.Equal(1, result);
    }

    #endregion

    #region Dry Run Tests

    [Fact]
    public async Task ExecuteAsync_DryRun_DoesNotWriteFiles()
    {
        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "TestSample", Code = "// test code" }
        ]);

        var outputDir = Path.Combine(_testRoot, "output");

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: outputDir,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.False(Directory.Exists(outputDir), "Dry-run should not create output directory");
    }

    [Fact]
    public async Task ExecuteAsync_NotDryRun_WritesFiles()
    {
        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "TestSample", Code = "// test code", FilePath = "TestSample.cs" }
        ]);

        var outputDir = Path.Combine(_testRoot, "output-real");

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: outputDir,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: false,
            CancellationToken.None);

        Assert.Equal(0, result);
        Assert.True(Directory.Exists(outputDir), "Should create output directory");

        var files = Directory.GetFiles(outputDir, "*.cs", SearchOption.AllDirectories);
        Assert.Single(files);
    }

    #endregion

    #region Language Detection Tests

    [Fact]
    public async Task ExecuteAsync_LanguageOverride_UsesSpecifiedLanguage()
    {
        // Create a Python SDK structure for this test (the default _validSdkPath is .NET)
        var pythonSdkPath = Path.Combine(_testRoot, "python-sdk");
        Directory.CreateDirectory(pythonSdkPath);
        Directory.CreateDirectory(Path.Combine(pythonSdkPath, "src"));
        File.WriteAllText(Path.Combine(pythonSdkPath, "setup.py"), "from setuptools import setup\nsetup(name='test-sdk')");
        File.WriteAllText(Path.Combine(pythonSdkPath, "src", "client.py"), "class Client:\n    def connect(self):\n        pass");

        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "TestSample", Code = "# test code" }
        ]);

        var outputDir = Path.Combine(_testRoot, "output-python");

        var result = await tool.ExecuteAsync(
            sdkPath: pythonSdkPath,
            outputPath: outputDir,
            language: "python",
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.Equal(0, result);
    }

    [Fact]
    public async Task ExecuteAsync_InvalidLanguage_ReturnsExitCode1()
    {
        var tool = CreateTool();

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: null,
            language: "cobol",
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.Equal(1, result);
    }

    #endregion

    #region Output Path Tests

    [Fact]
    public async Task ExecuteAsync_OutputPath_WritesToSpecifiedFolder()
    {
        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "MySample", Code = "// code", FilePath = "MySample.cs" }
        ]);

        var customOutput = Path.Combine(_testRoot, "custom-output");

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: customOutput,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: false,
            CancellationToken.None);

        Assert.Equal(0, result);
        Assert.True(File.Exists(Path.Combine(customOutput, "MySample.cs")));
    }

    #endregion

    #region No Samples Generated Tests

    [Fact]
    public async Task ExecuteAsync_NoSamplesGenerated_ReturnsExitCode1()
    {
        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn<GeneratedSample>();

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: null,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.Equal(1, result);
    }

    [Fact]
    public async Task ExecuteAsync_SamplesWithEmptyCode_AreFiltered()
    {
        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "Good", Code = "// valid" },
            new GeneratedSample { Description = "Test", Name = "Bad", Code = "" },
            new GeneratedSample { Description = "Test", Name = null!, Code = "// also bad" }
        ]);

        var outputDir = Path.Combine(_testRoot, "filtered-output");

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: outputDir,
            language: null,
            prompt: null,
            count: 3,
            budget: null,
            model: null,
            dryRun: false,
            CancellationToken.None);

        Assert.Equal(0, result);
        var files = Directory.GetFiles(outputDir, "*", SearchOption.AllDirectories);
        Assert.Single(files);
    }

    #endregion

    #region AI Service Error Tests

    [Fact]
    public async Task ExecuteAsync_AiServiceThrows_ReturnsExitCode1()
    {
        var mockAi = MockAiServiceFactory.CreateThatThrows<GeneratedSample>(new InvalidOperationException("AI service failed"));
        var tool = CreateTool(mockAi.Object);

        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: null,
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: true,
            CancellationToken.None);

        Assert.Equal(1, result);
    }

    #endregion

    #region Cancellation Tests

    [Fact]
    public async Task ExecuteAsync_Cancellation_PropagatesException()
    {
        // Arrange
        var tool = CreateTool();

        // Set up mock to delay, simulating long AI operation
        _mockAiService.SetDelayBeforeResponse(TimeSpan.FromSeconds(10));
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "Sample", Code = "// code" }
        ]);

        using var cts = new CancellationTokenSource();
        cts.CancelAfter(TimeSpan.FromMilliseconds(100));

        // Act & Assert - Cancellation MUST propagate, not be swallowed
        await Assert.ThrowsAnyAsync<OperationCanceledException>(() =>
            tool.ExecuteAsync(
                sdkPath: _validSdkPath,
                outputPath: null,
                language: null,
                prompt: null,
                count: 1,
                budget: null,
                model: null,
                dryRun: true,
                cts.Token));
    }

    #endregion

    #region Auto-Detect Output Folder Tests

    [Fact]
    public async Task ExecuteAsync_NoOutputPath_UsesSamplesFolder()
    {
        // Arrange
        var tool = CreateTool();
        _mockAiService.SetSamplesToReturn([
            new GeneratedSample { Description = "Test", Name = "AutoSample", Code = "// code", FilePath = "AutoSample.cs" }
        ]);

        // Act
        var result = await tool.ExecuteAsync(
            sdkPath: _validSdkPath,
            outputPath: null, // Auto-detect
            language: null,
            prompt: null,
            count: 1,
            budget: null,
            model: null,
            dryRun: false,
            CancellationToken.None);

        // Assert: Should create samples in {sdkPath}/samples (default when no samples folder exists)
        Assert.Equal(0, result);
        var expectedSamplesDir = Path.Combine(_validSdkPath, "examples");
        Assert.True(Directory.Exists(expectedSamplesDir), $"Should create 'samples' folder at {expectedSamplesDir}");
        Assert.True(File.Exists(Path.Combine(expectedSamplesDir, "AutoSample.cs")));
    }

    #endregion
}
