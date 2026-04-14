// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services.Languages.Samples;
using Xunit;

namespace Microsoft.SdkChat.Tests.Languages;

/// <summary>
/// Tests for all language-specific sample contexts.
/// Ensures all 6 languages are properly configured.
/// </summary>
public class SampleLanguageContextTests
{
    private readonly FileHelper _fileHelper = new();

    #region DotNet Tests

    [Fact]
    public void DotNetContext_HasCorrectLanguage()
    {
        var context = new DotNetSampleLanguageContext(_fileHelper);
        Assert.Equal(SdkLanguage.DotNet, context.Language);
    }

    [Fact]
    public void DotNetContext_HasCorrectExtension()
    {
        var context = new DotNetSampleLanguageContext(_fileHelper);
        Assert.Equal(".cs", context.FileExtension);
    }

    [Fact]
    public void DotNetContext_HasInstructions()
    {
        var context = new DotNetSampleLanguageContext(_fileHelper);
        var instructions = context.GetInstructions();
        Assert.Contains("C#", instructions);
        Assert.Contains("async/await", instructions);
    }

    #endregion

    #region Python Tests

    [Fact]
    public void PythonContext_HasCorrectLanguage()
    {
        var context = new PythonSampleLanguageContext(_fileHelper);
        Assert.Equal(SdkLanguage.Python, context.Language);
    }

    [Fact]
    public void PythonContext_HasCorrectExtension()
    {
        var context = new PythonSampleLanguageContext(_fileHelper);
        Assert.Equal(".py", context.FileExtension);
    }

    [Fact]
    public void PythonContext_HasInstructions()
    {
        var context = new PythonSampleLanguageContext(_fileHelper);
        var instructions = context.GetInstructions();
        Assert.Contains("Python", instructions);
        Assert.Contains("PEP 8", instructions);
    }

    #endregion

    #region Java Tests

    [Fact]
    public void JavaContext_HasCorrectLanguage()
    {
        var context = new JavaSampleLanguageContext(_fileHelper);
        Assert.Equal(SdkLanguage.Java, context.Language);
    }

    [Fact]
    public void JavaContext_HasCorrectExtension()
    {
        var context = new JavaSampleLanguageContext(_fileHelper);
        Assert.Equal(".java", context.FileExtension);
    }

    [Fact]
    public void JavaContext_HasInstructions()
    {
        var context = new JavaSampleLanguageContext(_fileHelper);
        var instructions = context.GetInstructions();
        Assert.Contains("Java", instructions);
        Assert.Contains("Javadoc", instructions);
    }

    #endregion

    #region TypeScript Tests

    [Fact]
    public void TypeScriptContext_HasCorrectLanguage()
    {
        var context = new TypeScriptSampleLanguageContext(_fileHelper);
        Assert.Equal(SdkLanguage.TypeScript, context.Language);
    }

    [Fact]
    public void TypeScriptContext_HasCorrectExtension()
    {
        var context = new TypeScriptSampleLanguageContext(_fileHelper);
        Assert.Equal(".ts", context.FileExtension);
    }

    [Fact]
    public void TypeScriptContext_HasInstructions()
    {
        var context = new TypeScriptSampleLanguageContext(_fileHelper);
        var instructions = context.GetInstructions();
        Assert.Contains("TypeScript", instructions);
        Assert.Contains("strict", instructions.ToLowerInvariant());
    }

    #endregion

    #region JavaScript Tests

    [Fact]
    public void JavaScriptContext_HasCorrectLanguage()
    {
        var context = new JavaScriptSampleLanguageContext(_fileHelper);
        Assert.Equal(SdkLanguage.JavaScript, context.Language);
    }

    [Fact]
    public void JavaScriptContext_HasCorrectExtension()
    {
        var context = new JavaScriptSampleLanguageContext(_fileHelper);
        Assert.Equal(".js", context.FileExtension);
    }

    [Fact]
    public void JavaScriptContext_HasInstructions()
    {
        var context = new JavaScriptSampleLanguageContext(_fileHelper);
        var instructions = context.GetInstructions();
        Assert.Contains("JavaScript", instructions);
        Assert.Contains("async/await", instructions);
    }

    #endregion

    #region Go Tests

    [Fact]
    public void GoContext_HasCorrectLanguage()
    {
        var context = new GoSampleLanguageContext(_fileHelper);
        Assert.Equal(SdkLanguage.Go, context.Language);
    }

    [Fact]
    public void GoContext_HasCorrectExtension()
    {
        var context = new GoSampleLanguageContext(_fileHelper);
        Assert.Equal(".go", context.FileExtension);
    }

    [Fact]
    public void GoContext_HasInstructions()
    {
        var context = new GoSampleLanguageContext(_fileHelper);
        var instructions = context.GetInstructions();
        Assert.Contains("Go", instructions);
        Assert.Contains("context.Context", instructions);
    }

    #endregion

    #region Cross-Language Consistency Tests

    [Theory]
    [InlineData(SdkLanguage.DotNet, ".cs")]
    [InlineData(SdkLanguage.Python, ".py")]
    [InlineData(SdkLanguage.Java, ".java")]
    [InlineData(SdkLanguage.TypeScript, ".ts")]
    [InlineData(SdkLanguage.JavaScript, ".js")]
    [InlineData(SdkLanguage.Go, ".go")]
    public void AllLanguages_HaveConsistentExtensions(SdkLanguage language, string expectedExtension)
    {
        // Verify SdkLanguageHelpers matches context
        Assert.Equal(expectedExtension, SdkLanguageHelpers.GetFileExtension(language));
    }

    [Theory]
    [InlineData("dotnet", SdkLanguage.DotNet)]
    [InlineData(".net", SdkLanguage.DotNet)]
    [InlineData("csharp", SdkLanguage.DotNet)]
    [InlineData("c#", SdkLanguage.DotNet)]
    [InlineData("python", SdkLanguage.Python)]
    [InlineData("py", SdkLanguage.Python)]
    [InlineData("java", SdkLanguage.Java)]
    [InlineData("typescript", SdkLanguage.TypeScript)]
    [InlineData("ts", SdkLanguage.TypeScript)]
    [InlineData("javascript", SdkLanguage.JavaScript)]
    [InlineData("js", SdkLanguage.JavaScript)]
    [InlineData("node", SdkLanguage.JavaScript)]
    [InlineData("go", SdkLanguage.Go)]
    [InlineData("golang", SdkLanguage.Go)]
    public void AllLanguages_ParseCorrectly(string input, SdkLanguage expected)
    {
        Assert.Equal(expected, SdkLanguageHelpers.Parse(input));
    }

    [Theory]
    [InlineData(SdkLanguage.DotNet, "csharp")]
    [InlineData(SdkLanguage.Python, "python")]
    [InlineData(SdkLanguage.Java, "java")]
    [InlineData(SdkLanguage.TypeScript, "typescript")]
    [InlineData(SdkLanguage.JavaScript, "javascript")]
    [InlineData(SdkLanguage.Go, "go")]
    public void AllLanguages_HaveLanguageId(SdkLanguage language, string expectedId)
    {
        Assert.Equal(expectedId, SdkLanguageHelpers.GetLanguageId(language));
    }

    [Fact]
    public void AllContexts_HaveNonEmptyInstructions()
    {
        var contexts = new SampleLanguageContext[]
        {
            new DotNetSampleLanguageContext(_fileHelper),
            new PythonSampleLanguageContext(_fileHelper),
            new JavaSampleLanguageContext(_fileHelper),
            new TypeScriptSampleLanguageContext(_fileHelper),
            new JavaScriptSampleLanguageContext(_fileHelper),
            new GoSampleLanguageContext(_fileHelper)
        };

        foreach (var context in contexts)
        {
            var instructions = context.GetInstructions();
            Assert.False(string.IsNullOrWhiteSpace(instructions),
                $"{context.Language} should have instructions");
            Assert.True(instructions.Length > 50,
                $"{context.Language} instructions should be substantial");
        }
    }

    #endregion
}
