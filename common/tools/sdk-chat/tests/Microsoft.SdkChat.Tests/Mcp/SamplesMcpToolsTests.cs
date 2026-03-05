// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Mcp;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.Mcp;

/// <summary>
/// Comprehensive tests for the MCP Samples tools (two-tool approach).
/// Tests build_samples_prompt and validate_samples tools.
/// </summary>
[Collection("SdkInfoCache")]
public class SamplesMcpToolsTests : IDisposable
{
    private readonly string _testRoot;
    private readonly FileHelper _fileHelper;
    private readonly SamplesMcpTools _tool;

    public SamplesMcpToolsTests()
    {
        _testRoot = Path.Combine(Path.GetTempPath(), $"McpToolTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testRoot);

        _fileHelper = new FileHelper();
        _tool = new SamplesMcpTools(_fileHelper, new PackageInfoService());
    }

    public void Dispose()
    {
        try
        {
            if (Directory.Exists(_testRoot))
                Directory.Delete(_testRoot, recursive: true);
        }
        catch { }
        SdkInfo.ClearCache();
        GC.SuppressFinalize(this);
    }

    /// <summary>
    /// Deserialize a build_samples_prompt result and assert success.
    /// </summary>
    private static SamplesPromptResult ParsePromptResult(string json)
    {
        var response = JsonSerializer.Deserialize(json, McpJsonContext.Default.McpResponseSamplesPromptResult);
        Assert.NotNull(response);
        Assert.True(response.Success, $"Expected success but got: {json}");
        Assert.NotNull(response.Data);
        return response.Data;
    }

    /// <summary>
    /// Deserialize a validate_samples result.
    /// </summary>
    private static ValidateSamplesResult ParseValidateResult(string json)
    {
        var result = JsonSerializer.Deserialize(json, McpJsonContext.Default.ValidateSamplesResult);
        Assert.NotNull(result);
        return result;
    }

    #region Language Detection Tests (build_samples_prompt)

    [Fact]
    public async Task BuildSamplesPromptAsync_WithDotNetProject_DetectsLanguage()
    {
        CreateDotNetProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Equal("DotNet", result.Language);
        Assert.Equal(".cs", result.FileExtension);
        Assert.Contains("C#", result.SystemPrompt);
        Assert.NotEmpty(result.UserPrompt);
        Assert.True(result.EstimatedTokens > 0);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithPythonProject_DetectsLanguage()
    {
        CreatePythonProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Equal("Python", result.Language);
        Assert.Equal(".py", result.FileExtension);
        Assert.Contains("Python", result.SystemPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithJavaProject_DetectsLanguage()
    {
        CreateJavaProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Equal("Java", result.Language);
        Assert.Equal(".java", result.FileExtension);
        Assert.Contains("Java", result.SystemPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithTypeScriptProject_DetectsLanguage()
    {
        CreateTypeScriptProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Equal("TypeScript", result.Language);
        Assert.Equal(".ts", result.FileExtension);
        Assert.Contains("TypeScript", result.SystemPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithJavaScriptProject_DetectsLanguage()
    {
        CreateJavaScriptProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Equal("JavaScript", result.Language);
        Assert.Equal(".js", result.FileExtension);
        Assert.Contains("JavaScript", result.SystemPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithGoProject_DetectsLanguage()
    {
        CreateGoProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Equal("Go", result.Language);
        Assert.Equal(".go", result.FileExtension);
        Assert.Contains("Go", result.SystemPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithUnknownProject_ReturnsError()
    {
        // Empty directory — no project files
        var json = await _tool.BuildSamplesPromptAsync(_testRoot);

        Assert.Contains("LANGUAGE_DETECTION_FAILED", json);
    }

    #endregion

    #region Prompt Content Tests

    [Fact]
    public async Task BuildSamplesPromptAsync_WithCustomPrompt_IncludesInUserPrompt()
    {
        CreateDotNetProject();

        var result = ParsePromptResult(
            await _tool.BuildSamplesPromptAsync(_testRoot, prompt: "Generate authentication examples"));

        Assert.Contains("authentication examples", result.UserPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithDefaultCount_UsesDefaultInPrompt()
    {
        CreateDotNetProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Contains("5", result.UserPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithCustomCount_UsesCountInPrompt()
    {
        CreateDotNetProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot, count: 3));

        Assert.Contains("3", result.UserPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_SystemPromptContainsJsonFormatInstructions()
    {
        CreateDotNetProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.Contains("JSON array", result.SystemPrompt);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_ReturnsSuggestedOutputPath()
    {
        CreateDotNetProject();

        var result = ParsePromptResult(await _tool.BuildSamplesPromptAsync(_testRoot));

        Assert.NotNull(result.SuggestedOutputPath);
        Assert.NotEmpty(result.SuggestedOutputPath);
    }

    #endregion

    #region Error Handling Tests (build_samples_prompt)

    [Fact]
    public async Task BuildSamplesPromptAsync_WithNonExistentPath_ReturnsError()
    {
        var nonExistentPath = Path.Combine(_testRoot, "does-not-exist");

        var json = await _tool.BuildSamplesPromptAsync(nonExistentPath);

        Assert.Contains("PATH_NOT_FOUND", json);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithNullPath_ReturnsError()
    {
        var json = await _tool.BuildSamplesPromptAsync(null!);

        Assert.Contains("error", json, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_WithEmptyPath_ReturnsError()
    {
        var json = await _tool.BuildSamplesPromptAsync("");

        Assert.Contains("error", json, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task BuildSamplesPromptAsync_Cancellation_ReturnsError()
    {
        CreateDotNetProject();
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        var json = await _tool.BuildSamplesPromptAsync(_testRoot, cancellationToken: cts.Token);

        Assert.Contains("error", json, StringComparison.OrdinalIgnoreCase);
    }

    #endregion

    #region ValidateSamples — Success Tests

    [Fact]
    public void ValidateSamples_WithValidJsonArray_ReturnsSuccess()
    {
        var samples = new[]
        {
            CreateSample("Sample1", "First", "// Code 1", "Sample1.cs"),
            CreateSample("Sample2", "Second", "// Code 2", "Sample2.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(2, result.Count);
        Assert.NotNull(result.Samples);
        Assert.Equal("Sample1", result.Samples[0].Name);
        Assert.Equal("Sample2", result.Samples[1].Name);
        Assert.Null(result.CorrectionPrompt);
    }

    [Fact]
    public void ValidateSamples_WithSingleSample_ReturnsSuccess()
    {
        var samples = new[] { CreateSample("OnlySample", "Desc", "// Code", "file.cs") };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(1, result.Count);
    }

    [Fact]
    public void ValidateSamples_FiltersEmptyNameSamples()
    {
        var samples = new[]
        {
            CreateSample("Good", "Good sample", "// Good", "Good.cs"),
            CreateSample("", "Empty name", "// Empty", null),
            CreateSample("AlsoGood", "Also good", "// Also", "AlsoGood.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public void ValidateSamples_FiltersEmptyCodeSamples()
    {
        var samples = new[]
        {
            CreateSample("Good", "Good sample", "// Good", "Good.cs"),
            CreateSample("NoCode", "No code", "", "NoCode.cs"),
            CreateSample("AlsoGood", "Also good", "// Also", "AlsoGood.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public void ValidateSamples_FiltersWhitespaceNameSamples()
    {
        var samples = new[]
        {
            CreateSample("  ", "Whitespace name", "// Code", "file.cs"),
            CreateSample("Good", "Good sample", "// Code", "Good.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(1, result.Count);
        Assert.Equal("Good", result.Samples![0].Name);
    }

    [Fact]
    public void ValidateSamples_FiltersWhitespaceCodeSamples()
    {
        var samples = new[]
        {
            CreateSample("EmptyCode", "Empty", "   \n\t  ", "empty.cs"),
            CreateSample("Good", "Good sample", "// Code", "Good.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(1, result.Count);
    }

    [Fact]
    public void ValidateSamples_PreservesUnicodeContent()
    {
        var unicodeCode = "// 你好世界 🌍 مرحبا العالم\nvar emoji = \"🎉\";";
        var samples = new[] { CreateSample("Unicode", "Unicode test", unicodeCode, "unicode.cs") };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(1, result.Count);
        Assert.Equal(unicodeCode, result.Samples![0].Code);
    }

    [Fact]
    public void ValidateSamples_PreservesSpecialCharactersInCode()
    {
        var codeWithSpecialChars = "var x = \"Hello\\nWorld\";\n// Special: @#$%^&*(){}[]|\\:\";<>?,./";
        var samples = new[] { CreateSample("Special", "Special chars", codeWithSpecialChars, "special.cs") };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(codeWithSpecialChars, result.Samples![0].Code);
    }

    [Fact]
    public void ValidateSamples_WithDuplicateNames_KeepsBoth()
    {
        var samples = new[]
        {
            CreateSample("Sample", "First version", "// First", "Sample.cs"),
            CreateSample("Sample", "Second version", "// Second", "Sample.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public void ValidateSamples_ReturnsEstimatedResponseTokens()
    {
        var samples = new[] { CreateSample("Sample", "Desc", "// Code", "file.cs") };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.EstimatedResponseTokens > 0);
    }

    #endregion

    #region ValidateSamples — Failure Tests

    [Fact]
    public void ValidateSamples_WithInvalidJson_ReturnsErrorAndCorrectionPrompt()
    {
        var result = ParseValidateResult(_tool.ValidateSamples("this is not JSON"));

        Assert.False(result.Success);
        Assert.NotNull(result.Error);
        Assert.NotNull(result.CorrectionPrompt);
        Assert.Contains("JSON", result.CorrectionPrompt);
    }

    [Fact]
    public void ValidateSamples_WithEmptyResponse_ReturnsError()
    {
        var result = ParseValidateResult(_tool.ValidateSamples(""));

        Assert.False(result.Success);
        Assert.NotNull(result.Error);
        Assert.Contains("Empty", result.Error);
        Assert.NotNull(result.CorrectionPrompt);
    }

    [Fact]
    public void ValidateSamples_WithWhitespaceResponse_ReturnsError()
    {
        var result = ParseValidateResult(_tool.ValidateSamples("   \n\t  "));

        Assert.False(result.Success);
        Assert.NotNull(result.Error);
    }

    [Fact]
    public void ValidateSamples_WithMarkdownCodeFence_ReturnsError()
    {
        // LLM wrapped response in markdown — should fail since ParseJsonArray expects raw JSON
        var markdown = "```json\n[{\"name\":\"Sample\",\"code\":\"// Code\"}]\n```";

        var result = ParseValidateResult(_tool.ValidateSamples(markdown));

        Assert.False(result.Success);
        Assert.NotNull(result.CorrectionPrompt);
    }

    [Fact]
    public void ValidateSamples_WithJsonObject_ReturnsError()
    {
        // LLM returned a single object instead of an array
        var json = "{\"name\":\"Sample\",\"code\":\"// Code\"}";

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.False(result.Success);
        Assert.NotNull(result.CorrectionPrompt);
    }

    [Fact]
    public void ValidateSamples_WithAllFilteredOut_ReturnsSuccessWithZero()
    {
        // All samples have empty names/code
        var samples = new[]
        {
            CreateSample("", "No name", "// Code", null),
            CreateSample("NoCode", "No code", "", "file.cs")
        };
        var json = SerializeSamples(samples);

        var result = ParseValidateResult(_tool.ValidateSamples(json));

        Assert.True(result.Success);
        Assert.Equal(0, result.Count);
    }

    #endregion

    #region Helper Methods

    private static GeneratedSample CreateSample(string name, string description, string code, string? filePath) =>
        new() { Name = name, Description = description, Code = code, FilePath = filePath };

    private static string SerializeSamples(params GeneratedSample[] samples) =>
        JsonSerializer.Serialize(samples.ToList(), AiStreamingJsonContext.CaseInsensitive.ListGeneratedSample);

    private void CreateDotNetProject()
    {
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "MyProject.csproj"), "<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup><TargetFramework>net8.0</TargetFramework></PropertyGroup></Project>");
        File.WriteAllText(Path.Combine(srcDir, "Client.cs"), @"
namespace TestSdk;
/// <summary>Test client.</summary>
public class Client
{
    /// <summary>Gets a resource.</summary>
    public string GetResource(int id) => ""test"";
}
");
    }

    private void CreatePythonProject()
    {
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"), "[project]\nname = \"test-sdk\"\nversion = \"1.0.0\"");
        File.WriteAllText(Path.Combine(srcDir, "__init__.py"), "");
        File.WriteAllText(Path.Combine(srcDir, "client.py"), @"
class Client:
    '''Test client for API operations.'''

    def get_resource(self, id: int) -> str:
        '''Gets a resource by ID.'''
        return 'test'
");
    }

    private void CreateJavaProject()
    {
        var srcDir = Path.Combine(_testRoot, "src", "main", "java", "com", "test");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(_testRoot, "pom.xml"), "<project><groupId>com.test</groupId><artifactId>test-sdk</artifactId></project>");
        File.WriteAllText(Path.Combine(srcDir, "Client.java"), @"
package com.test;
/** Test client. */
public class Client {
    /** Gets a resource. */
    public String getResource(int id) { return ""test""; }
}
");
    }

    private void CreateTypeScriptProject()
    {
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(_testRoot, "package.json"), "{\"name\": \"test-sdk\", \"version\": \"1.0.0\"}");
        File.WriteAllText(Path.Combine(_testRoot, "tsconfig.json"), "{\"compilerOptions\": {\"target\": \"ES2020\"}}");
        File.WriteAllText(Path.Combine(srcDir, "client.ts"), @"
/** Test client. */
export class Client {
    /** Gets a resource. */
    getResource(id: number): string { return 'test'; }
}
");
    }

    private void CreateJavaScriptProject()
    {
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(_testRoot, "package.json"), "{\"name\": \"test-sdk\", \"version\": \"1.0.0\"}");
        File.WriteAllText(Path.Combine(srcDir, "client.js"), @"
/** Test client. */
class Client {
    /** Gets a resource. */
    getResource(id) { return 'test'; }
}
module.exports = { Client };
");
    }

    private void CreateGoProject()
    {
        Directory.CreateDirectory(_testRoot);
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"), "module github.com/test/sdk\n\ngo 1.21");
        File.WriteAllText(Path.Combine(_testRoot, "client.go"), @"
// Package sdk provides test functionality.
package sdk

// Client is a test client.
type Client struct {}

// GetResource gets a resource by ID.
func (c *Client) GetResource(id int) string {
    return ""test""
}
");
    }

    #endregion
}
