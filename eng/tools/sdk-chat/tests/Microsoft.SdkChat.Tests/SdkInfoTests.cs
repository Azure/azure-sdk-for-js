// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests;

[Collection("SdkInfoCache")]
public class SdkInfoTests : IDisposable
{
    private readonly string _testRoot;

    public SdkInfoTests()
    {
        // Clear cache before each test to ensure isolation
        SdkInfo.ClearCache();

        _testRoot = Path.Combine(Path.GetTempPath(), $"SdkInfoTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testRoot);
    }

    public void Dispose()
    {
        // Clear cache after each test
        SdkInfo.ClearCache();

        try
        {
            if (Directory.Exists(_testRoot))
                Directory.Delete(_testRoot, recursive: true);
        }
        catch { }

        GC.SuppressFinalize(this);
    }

    ~SdkInfoTests()
    {
        try
        {
            if (Directory.Exists(_testRoot))
                Directory.Delete(_testRoot, recursive: true);
        }
        catch { }
    }

    [Fact]
    public void Scan_DotNetProject_DetectsLanguageAndSourceFolder()
    {
        // Arrange
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "MyProject.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "Program.cs"), "class Program { }");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal("dotnet", info.LanguageName);
        Assert.Equal(".cs", info.FileExtension);
        Assert.Equal(srcDir, info.SourceFolder);
        Assert.True(info.IsValid);
    }

    [Fact]
    public void Scan_DotNetProject_WithNestedSourceFiles_DetectsLanguage()
    {
        // Arrange - openai-dotnet style: .csproj in src, .cs files in src/Generated
        var srcDir = Path.Combine(_testRoot, "src");
        var generatedDir = Path.Combine(srcDir, "Generated");
        Directory.CreateDirectory(generatedDir);
        File.WriteAllText(Path.Combine(srcDir, "OpenAI.csproj"), "<Project />");
        // No .cs files at src level, all in Generated subfolder
        File.WriteAllText(Path.Combine(generatedDir, "Client.cs"), "class Client { }");
        File.WriteAllText(Path.Combine(generatedDir, "Models.cs"), "class Models { }");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should still detect as dotnet
        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(srcDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_PythonProject_DetectsLanguageAndSourceFolder()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"), "[project]");
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "main.py"), "print('hello')");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal("python", info.LanguageName);
        Assert.Equal(".py", info.FileExtension);
        Assert.Equal(srcDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_PythonFlatModule_PrefersRootWithMostFiles()
    {
        // Arrange - Python flat module: .py files at root (like openai-python)
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"), "[project]");

        // Create multiple .py files at root
        File.WriteAllText(Path.Combine(_testRoot, "__init__.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "client.py"), "class Client: pass");
        File.WriteAllText(Path.Combine(_testRoot, "models.py"), "class Model: pass");
        File.WriteAllText(Path.Combine(_testRoot, "api.py"), "def call(): pass");

        // Create src folder with fewer files
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "helper.py"), "def help(): pass");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should pick root (4 files) over src (1 file)
        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    [Fact]
    public void Scan_JavaProject_DetectsLanguageAndSourceFolder()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "pom.xml"), "<project />");
        var srcDir = Path.Combine(_testRoot, "src", "main", "java");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "Main.java"), "class Main { }");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal("java", info.LanguageName);
        Assert.Equal(".java", info.FileExtension);
        Assert.Equal(srcDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_JavaMultiModuleGradle_DetectsLanguage()
    {
        // Arrange - Multi-module Gradle project like openai-java
        // Structure: root/build.gradle.kts, root/module-core/src/main/java/*.java
        File.WriteAllText(Path.Combine(_testRoot, "build.gradle.kts"), "plugins { }");
        File.WriteAllText(Path.Combine(_testRoot, "settings.gradle.kts"), "include(\":module-core\")");

        // Create module-core with Java source
        var moduleCore = Path.Combine(_testRoot, "module-core");
        var srcDir = Path.Combine(moduleCore, "src", "main", "java");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(moduleCore, "build.gradle.kts"), "plugins { java }");
        File.WriteAllText(Path.Combine(srcDir, "Client.java"), "public class Client { }");
        File.WriteAllText(Path.Combine(srcDir, "Model.java"), "public class Model { }");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should detect Java and find source in submodule
        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal("java", info.LanguageName);
        Assert.Equal(".java", info.FileExtension);
        Assert.Equal(srcDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_JavaMultiModuleMaven_DetectsLanguage()
    {
        // Arrange - Multi-module Maven project
        // Structure: root/pom.xml, root/sdk-core/src/main/java/*.java
        File.WriteAllText(Path.Combine(_testRoot, "pom.xml"), "<project><modules><module>sdk-core</module></modules></project>");

        // Create sdk-core module with Java source
        var sdkCore = Path.Combine(_testRoot, "sdk-core");
        var srcDir = Path.Combine(sdkCore, "src", "main", "java");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(sdkCore, "pom.xml"), "<project />");
        File.WriteAllText(Path.Combine(srcDir, "Api.java"), "public class Api { }");
        File.WriteAllText(Path.Combine(srcDir, "Service.java"), "public class Service { }");
        File.WriteAllText(Path.Combine(srcDir, "Config.java"), "public class Config { }");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should detect Java and find source in submodule
        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal(srcDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_JavaMultiModule_PicksModuleWithMostFiles()
    {
        // Arrange - Multi-module project with multiple source modules
        File.WriteAllText(Path.Combine(_testRoot, "build.gradle.kts"), "");

        // Create module-a with 2 files
        var moduleA = Path.Combine(_testRoot, "module-a");
        var srcDirA = Path.Combine(moduleA, "src", "main", "java");
        Directory.CreateDirectory(srcDirA);
        File.WriteAllText(Path.Combine(srcDirA, "A1.java"), "class A1 {}");
        File.WriteAllText(Path.Combine(srcDirA, "A2.java"), "class A2 {}");

        // Create module-b with 5 files (should be picked)
        var moduleB = Path.Combine(_testRoot, "module-b");
        var srcDirB = Path.Combine(moduleB, "src", "main", "java");
        Directory.CreateDirectory(srcDirB);
        for (int i = 1; i <= 5; i++)
            File.WriteAllText(Path.Combine(srcDirB, $"B{i}.java"), $"class B{i} {{}}");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - module-b has more files, should be picked
        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal(srcDirB, info.SourceFolder);
    }

    [Fact]
    public void Scan_TypeScriptProject_DetectsLanguageAndSourceFolder()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "tsconfig.json"), "{}");
        File.WriteAllText(Path.Combine(_testRoot, "package.json"), "{}");
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "index.ts"), "export {}");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal("typescript", info.LanguageName);
        Assert.Equal(".ts", info.FileExtension);
    }

    [Fact]
    public void Scan_JavaScriptProject_WithoutTsConfig_DetectsJavaScript()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "package.json"), "{}");
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "index.js"), "module.exports = {}");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.JavaScript, info.Language);
        Assert.Equal("javascript", info.LanguageName);
        Assert.Equal(".js", info.FileExtension);
    }

    [Fact]
    public void Scan_GoProject_DetectsLanguageAndSourceFolder()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"), "module test");
        var pkgDir = Path.Combine(_testRoot, "pkg");
        Directory.CreateDirectory(pkgDir);
        File.WriteAllText(Path.Combine(pkgDir, "main.go"), "package main");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal("go", info.LanguageName);
        Assert.Equal(".go", info.FileExtension);
    }

    [Fact]
    public void Scan_GoFlatModule_PrefersRootOverInternal()
    {
        // Arrange - go-openai style: most .go files at root, internal folder exists
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"), "module github.com/example/sdk");

        // Create many .go files at root (simulating flat module pattern)
        File.WriteAllText(Path.Combine(_testRoot, "client.go"), "package sdk");
        File.WriteAllText(Path.Combine(_testRoot, "chat.go"), "package sdk");
        File.WriteAllText(Path.Combine(_testRoot, "completion.go"), "package sdk");
        File.WriteAllText(Path.Combine(_testRoot, "embeddings.go"), "package sdk");
        File.WriteAllText(Path.Combine(_testRoot, "models.go"), "package sdk");

        // Create internal folder with fewer files
        var internalDir = Path.Combine(_testRoot, "internal");
        Directory.CreateDirectory(internalDir);
        File.WriteAllText(Path.Combine(internalDir, "helper.go"), "package internal");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should pick root (5 files) over internal (1 file)
        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    [Fact]
    public void Scan_GoFlatModule_WithExamples_FindsSamplesFolder()
    {
        // Arrange - flat module with examples folder
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"), "module github.com/example/sdk");
        File.WriteAllText(Path.Combine(_testRoot, "client.go"), "package sdk");
        File.WriteAllText(Path.Combine(_testRoot, "chat.go"), "package sdk");

        var examplesDir = Path.Combine(_testRoot, "examples");
        Directory.CreateDirectory(examplesDir);
        File.WriteAllText(Path.Combine(examplesDir, "basic.go"), "package main");
        File.WriteAllText(Path.Combine(examplesDir, "advanced.go"), "package main");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(_testRoot, info.SourceFolder);
        Assert.Equal(examplesDir, info.SamplesFolder);
    }

    [Fact]
    public void Scan_GoWithOnlyInternal_UsesInternal()
    {
        // Arrange - Go project with only internal folder (no root .go files)
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"), "module test");

        var internalDir = Path.Combine(_testRoot, "internal");
        Directory.CreateDirectory(internalDir);
        File.WriteAllText(Path.Combine(internalDir, "helper.go"), "package internal");
        File.WriteAllText(Path.Combine(internalDir, "utils.go"), "package internal");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should use internal since no root .go files
        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(internalDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_GoPkgPattern_UsesPkg()
    {
        // Arrange - Go project with pkg folder (SDK style)
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"), "module test");

        var pkgDir = Path.Combine(_testRoot, "pkg");
        Directory.CreateDirectory(pkgDir);
        File.WriteAllText(Path.Combine(pkgDir, "client.go"), "package sdk");
        File.WriteAllText(Path.Combine(pkgDir, "models.go"), "package sdk");
        File.WriteAllText(Path.Combine(pkgDir, "operations.go"), "package sdk");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(pkgDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_WithExamplesFolder_FindsSamplesFolder()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"), "[project]");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");
        var examplesDir = Path.Combine(_testRoot, "examples");
        Directory.CreateDirectory(examplesDir);
        File.WriteAllText(Path.Combine(examplesDir, "sample.py"), "print('sample')");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(examplesDir, info.SamplesFolder);
        Assert.Equal(examplesDir, info.SuggestedSamplesFolder);
        Assert.Contains(examplesDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_WithSamplesFolder_FindsSamplesFolder()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");
        var samplesDir = Path.Combine(_testRoot, "examples");
        Directory.CreateDirectory(samplesDir);
        File.WriteAllText(Path.Combine(samplesDir, "sample.py"), "print('sample')");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(samplesDir, info.SamplesFolder);
    }

    [Fact]
    public void Scan_WithoutSamplesFolder_SuggestsExamples()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Null(info.SamplesFolder);
        Assert.Equal(Path.Combine(_testRoot, "examples"), info.SuggestedSamplesFolder);
    }

    [Fact]
    public void Scan_CachesResults()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");

        // Act
        var info1 = SdkInfo.Scan(_testRoot);
        var info2 = SdkInfo.Scan(_testRoot);

        // Assert - same reference means cached
        Assert.Same(info1, info2);
    }

    [Fact]
    public void ClearCache_RemovesCachedResults()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");
        var info1 = SdkInfo.Scan(_testRoot);

        // Act
        SdkInfo.ClearCache();
        var info2 = SdkInfo.Scan(_testRoot);

        // Assert - different reference means not cached
        Assert.NotSame(info1, info2);
        // But should have same values
        Assert.Equal(info1.Language, info2.Language);
    }

    [Fact]
    public void DetectLanguage_QuickDetection_ReturnsCorrectLanguage()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");

        // Act
        var lang = SdkInfo.DetectLanguage(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.Python, lang);
    }

    [Fact]
    public void DetectLanguage_NonExistentDirectory_ReturnsNull()
    {
        // Act
        var lang = SdkInfo.DetectLanguage("/nonexistent/path/to/sdk");

        // Assert
        Assert.Null(lang);
    }

    [Fact]
    public void DetectLanguage_EmptyDirectory_ReturnsNull()
    {
        // Act
        var lang = SdkInfo.DetectLanguage(_testRoot);

        // Assert
        Assert.Null(lang);
    }

    [Fact]
    public void Scan_BuildFileInSubdir_DetectsLanguage()
    {
        // Arrange - openai-dotnet style: .csproj in src folder
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "OpenAI.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "Client.cs"), "class Client { }");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(srcDir, info.SourceFolder);
    }

    [Fact]
    public void Scan_MultipleSamplesFolders_PicksBestByFileCount()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "");

        // Create samples folder with 1 file
        var samplesDir = Path.Combine(_testRoot, "examples");
        Directory.CreateDirectory(samplesDir);
        File.WriteAllText(Path.Combine(samplesDir, "sample1.py"), "");

        // Create examples folder with 5 files
        var examplesDir = Path.Combine(_testRoot, "examples");
        Directory.CreateDirectory(examplesDir);
        for (int i = 1; i <= 5; i++)
            File.WriteAllText(Path.Combine(examplesDir, $"example{i}.py"), "");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - examples has more files, should be picked
        Assert.Equal(examplesDir, info.SamplesFolder);
        Assert.Contains(samplesDir, info.AllSamplesCandidates);
        Assert.Contains(examplesDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_GlobPatternSamplesFolder_FindsModulePrefixedExample()
    {
        // Arrange - Java multi-module project with "sdk-name-example" folder pattern
        File.WriteAllText(Path.Combine(_testRoot, "build.gradle.kts"), "");

        // Create sdk-java-example folder (matches *-example pattern)
        var exampleDir = Path.Combine(_testRoot, "sdk-java-example");
        var srcDir = Path.Combine(exampleDir, "src", "main", "java");
        Directory.CreateDirectory(srcDir);
        for (int i = 1; i <= 10; i++)
            File.WriteAllText(Path.Combine(srcDir, $"Example{i}.java"), $"class Example{i} {{}}");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert - should find sdk-java-example as samples folder
        Assert.Contains("sdk-java-example", info.SamplesFolder!);
    }

    // ── Import-based Samples Detection ──────────────────────────────────────

    [Fact]
    public void ExtractLibraryName_Python_GraphsFromPyprojectToml()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[project]\nname = \"example-storage-blob\"\nversion = \"1.0.0\"\n");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.Python);

        // Assert
        Assert.Equal("example-storage-blob", name);
    }

    [Fact]
    public void ExtractLibraryName_Python_IgnoresNonProjectSections()
    {
        // Arrange — name field in [tool.poetry] should NOT match
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[tool.poetry]\nname = \"wrong-name\"\n\n[project]\nname = \"correct-name\"\n");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.Python);

        // Assert
        Assert.Equal("correct-name", name);
    }

    [Fact]
    public void ExtractLibraryName_Python_ReturnsNull_WhenNoProjectSection()
    {
        // Arrange — no [project] section
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[tool.black]\nline-length = 88\n");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.Python);

        // Assert
        Assert.Null(name);
    }

    [Fact]
    public void ExtractLibraryName_JavaScript_GraphsFromPackageJson()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "package.json"),
            "{\"name\": \"@example/openai\", \"version\": \"1.0.0\"}");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.JavaScript);

        // Assert
        Assert.Equal("@example/openai", name);
    }

    [Fact]
    public void ExtractLibraryName_TypeScript_GraphsFromPackageJson()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "package.json"),
            "{\"name\": \"@example/core-rest-pipeline\"}");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.TypeScript);

        // Assert
        Assert.Equal("@example/core-rest-pipeline", name);
    }

    [Fact]
    public void ExtractLibraryName_Java_GraphsGroupIdFromPom()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "pom.xml"),
            "<project xmlns=\"http://maven.apache.org/POM/4.0.0\">" +
            "<groupId>com.example</groupId><artifactId>example-ai-openai</artifactId>" +
            "</project>");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.Java);

        // Assert
        Assert.Equal("com.example", name);
    }

    [Fact]
    public void ExtractLibraryName_Java_GraphsGroupFromGradle()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "build.gradle"),
            "plugins { id 'java' }\ngroup = 'com.openai'\nversion = '1.0'\n");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.Java);

        // Assert
        Assert.Equal("com.openai", name);
    }

    [Fact]
    public void ExtractLibraryName_Go_GraphsModulePath()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"),
            "module github.com/example/sdk-for-go/sdk/ai/azopenai\n\ngo 1.21\n");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.Go);

        // Assert
        Assert.Equal("github.com/example/sdk-for-go/sdk/ai/azopenai", name);
    }

    [Fact]
    public void ExtractLibraryName_DotNet_GraphsRootNamespace()
    {
        // Arrange
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "MyLib.csproj"),
            "<Project Sdk=\"Microsoft.NET.Sdk\">" +
            "<PropertyGroup><RootNamespace>Example.Storage.Blobs</RootNamespace></PropertyGroup>" +
            "</Project>");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.DotNet);

        // Assert
        Assert.Equal("Example.Storage.Blobs", name);
    }

    [Fact]
    public void ExtractLibraryName_DotNet_FallsBackToProjectFileName()
    {
        // Arrange — no RootNamespace, derives from file name
        File.WriteAllText(Path.Combine(_testRoot, "OpenAI.csproj"),
            "<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup></PropertyGroup></Project>");

        // Act
        var name = SdkInfo.ExtractLibraryName(_testRoot, SdkLanguage.DotNet);

        // Assert
        Assert.Equal("OpenAI", name);
    }

    [Fact]
    public void BuildImportPattern_Python_MatchesUnderscoreAndDottedImports()
    {
        // Arrange
        var matcher = SdkInfo.BuildImportMatcher("example-storage-blob", SdkLanguage.Python);
        Assert.NotNull(matcher);

        // Act & Assert
        Assert.True(matcher.IsMatch("from example_storage_blob import BlobClient"));
        Assert.True(matcher.IsMatch("from example.storage.blob import BlobServiceClient"));
        Assert.True(matcher.IsMatch("import example_storage_blob"));
        Assert.True(matcher.IsMatch("import example.storage.blob"));
        Assert.False(matcher.IsMatch("from unrelated import something"));
        Assert.False(matcher.IsMatch("# example_storage_blob is cool"));
    }

    [Fact]
    public void BuildImportPattern_JavaScript_MatchesFromAndRequire()
    {
        // Arrange
        var matcher = SdkInfo.BuildImportMatcher("@example/openai", SdkLanguage.JavaScript);
        Assert.NotNull(matcher);

        // Act & Assert
        Assert.True(matcher.IsMatch("import { OpenAI } from '@example/openai'"));
        Assert.True(matcher.IsMatch("import { OpenAI } from \"@example/openai\""));
        Assert.True(matcher.IsMatch("const openai = require('@example/openai')"));
        Assert.True(matcher.IsMatch("import { foo } from '@example/openai/sub'"));
        Assert.False(matcher.IsMatch("import { foo } from 'other-package'"));
    }

    [Fact]
    public void BuildImportPattern_Java_MatchesImportStatement()
    {
        // Arrange
        var matcher = SdkInfo.BuildImportMatcher("com.example", SdkLanguage.Java);
        Assert.NotNull(matcher);

        // Act & Assert
        Assert.True(matcher.IsMatch("import com.example.ai.openai.OpenAIClient;"));
        Assert.True(matcher.IsMatch("import com.example.core.util.Context;"));
        Assert.False(matcher.IsMatch("import org.junit.Test;"));
    }

    [Fact]
    public void BuildImportPattern_Go_MatchesImportPath()
    {
        // Arrange
        var matcher = SdkInfo.BuildImportMatcher(
            "github.com/example/sdk-for-go/sdk/ai/azopenai", SdkLanguage.Go);
        Assert.NotNull(matcher);

        // Act & Assert
        Assert.True(matcher.IsMatch("\t\"github.com/example/sdk-for-go/sdk/ai/azopenai\""));
        Assert.True(matcher.IsMatch("\"github.com/example/sdk-for-go/sdk/ai/azopenai/internal\""));
        Assert.False(matcher.IsMatch("\"github.com/stretchr/testify\""));
    }

    [Fact]
    public void BuildImportPattern_DotNet_MatchesUsingStatement()
    {
        // Arrange
        var matcher = SdkInfo.BuildImportMatcher("Example.Storage.Blobs", SdkLanguage.DotNet);
        Assert.NotNull(matcher);

        // Act & Assert
        Assert.True(matcher.IsMatch("using Example.Storage.Blobs;"));
        Assert.True(matcher.IsMatch("using Example.Storage.Blobs.Models;"));
        Assert.True(matcher.IsMatch("using static Example.Storage.Blobs.BlobExtensions;"));
        Assert.False(matcher.IsMatch("using System.Text;"));
    }

    [Fact]
    public void CountImportingFiles_FindsFilesWithImports()
    {
        // Arrange
        var sampleDir = Path.Combine(_testRoot, "quickstart");
        Directory.CreateDirectory(sampleDir);

        // Two files that import the library
        File.WriteAllText(Path.Combine(sampleDir, "basic.py"),
            "from example_storage import BlobClient\n\nclient = BlobClient()\n");
        File.WriteAllText(Path.Combine(sampleDir, "advanced.py"),
            "import example_storage\n\nblob = example_storage.BlobClient()\n");
        // One file that doesn't import it
        File.WriteAllText(Path.Combine(sampleDir, "helper.py"),
            "import os\nimport sys\n\ndef helper(): pass\n");

        var matcher = SdkInfo.BuildImportMatcher("example-storage", SdkLanguage.Python)!;

        // Act
        var count = SdkInfo.CountImportingFiles(sampleDir, matcher, ".py");

        // Assert
        Assert.Equal(2, count);
    }

    [Fact]
    public void Scan_Python_DiscoversSamplesByImport_InUnconventionalFolder()
    {
        // Arrange — Python project with a "quickstart" folder containing files
        // that import the library. This tests import-based discovery beyond conventions.
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[project]\nname = \"my-sdk\"\nversion = \"1.0.0\"\n");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");

        // Unconventionally-named folder with files importing the library
        var quickstartDir = Path.Combine(_testRoot, "quickstart");
        Directory.CreateDirectory(quickstartDir);
        File.WriteAllText(Path.Combine(quickstartDir, "getting_started.py"),
            "from my_sdk import Client\n\nclient = Client()\nclient.run()\n");
        File.WriteAllText(Path.Combine(quickstartDir, "advanced_usage.py"),
            "import my_sdk\n\nresult = my_sdk.process()\nprint(result)\n");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert — quickstart should be discovered via import detection
        Assert.Contains(quickstartDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_TypeScript_DiscoversSamplesByImport()
    {
        // Arrange — TypeScript project with "tutorials" folder
        File.WriteAllText(Path.Combine(_testRoot, "tsconfig.json"), "{}");
        File.WriteAllText(Path.Combine(_testRoot, "package.json"),
            "{\"name\": \"@my-org/my-sdk\"}");
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "index.ts"), "export class Client {}");

        var tutorialsDir = Path.Combine(_testRoot, "tutorials");
        Directory.CreateDirectory(tutorialsDir);
        File.WriteAllText(Path.Combine(tutorialsDir, "tutorial1.ts"),
            "import { Client } from '@my-org/my-sdk'\n\nconst c = new Client();\n");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Contains(tutorialsDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_Go_DiscoversSamplesByImport()
    {
        // Arrange — Go project with "cmd" as source, "getting-started" with imports
        File.WriteAllText(Path.Combine(_testRoot, "go.mod"),
            "module github.com/example/my-sdk\n\ngo 1.21\n");

        // Source folder
        File.WriteAllText(Path.Combine(_testRoot, "client.go"), "package mysdk\n");
        File.WriteAllText(Path.Combine(_testRoot, "models.go"), "package mysdk\n");

        // Unconventional samples folder
        var gettingStartedDir = Path.Combine(_testRoot, "getting-started");
        Directory.CreateDirectory(gettingStartedDir);
        File.WriteAllText(Path.Combine(gettingStartedDir, "main.go"),
            "package main\n\nimport \"github.com/example/my-sdk\"\n\nfunc main() {\n\tmysdk.NewClient()\n}\n");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Contains(gettingStartedDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_Java_DiscoversSamplesByImport()
    {
        // Arrange — Java project with "usage" folder
        File.WriteAllText(Path.Combine(_testRoot, "pom.xml"),
            "<project xmlns=\"http://maven.apache.org/POM/4.0.0\">" +
            "<groupId>com.example</groupId><artifactId>my-sdk</artifactId></project>");
        var srcDir = Path.Combine(_testRoot, "src", "main", "java");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "Client.java"), "public class Client {}");

        // Unconventional samples folder
        var usageDir = Path.Combine(_testRoot, "usage");
        Directory.CreateDirectory(usageDir);
        File.WriteAllText(Path.Combine(usageDir, "BasicUsage.java"),
            "import com.example.sdk.Client;\n\npublic class BasicUsage {\n  public static void main(String[] args) {}\n}\n");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Contains(usageDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_DotNet_DiscoversSamplesByImport()
    {
        // Arrange — .NET project with "snippets" folder
        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "MyLib.csproj"),
            "<Project Sdk=\"Microsoft.NET.Sdk\">" +
            "<PropertyGroup><RootNamespace>MyOrg.MyLib</RootNamespace></PropertyGroup></Project>");
        File.WriteAllText(Path.Combine(srcDir, "Client.cs"), "namespace MyOrg.MyLib;\npublic class Client {}");

        // Unconventional samples folder
        var snippetsDir = Path.Combine(_testRoot, "snippets");
        Directory.CreateDirectory(snippetsDir);
        File.WriteAllText(Path.Combine(snippetsDir, "Example1.cs"),
            "using MyOrg.MyLib;\n\nvar client = new Client();\n");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Contains(snippetsDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_ImportBasedDetection_PrefersHigherImportCount()
    {
        // Arrange — Python project with two non-conventional folders;
        // folder with more imports should rank higher
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[project]\nname = \"test-lib\"\n");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('src')");

        // Folder A: 1 file importing the library
        var folderA = Path.Combine(_testRoot, "tutorials");
        Directory.CreateDirectory(folderA);
        File.WriteAllText(Path.Combine(folderA, "tut1.py"),
            "from test_lib import Foo\n");
        File.WriteAllText(Path.Combine(folderA, "helper.py"),
            "import os\n");

        // Folder B: 3 files importing the library
        var folderB = Path.Combine(_testRoot, "cookbook");
        Directory.CreateDirectory(folderB);
        for (int i = 1; i <= 3; i++)
        {
            File.WriteAllText(Path.Combine(folderB, $"recipe{i}.py"),
                $"from test_lib import Thing{i}\n");
        }

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert — cookbook (3 imports) should rank above tutorials (1 import)
        var cookbookIdx = info.AllSamplesCandidates.ToList()
            .FindIndex(c => c.Contains("cookbook", StringComparison.Ordinal));
        var tutorialsIdx = info.AllSamplesCandidates.ToList()
            .FindIndex(c => c.Contains("tutorials", StringComparison.Ordinal));

        Assert.True(cookbookIdx >= 0, "cookbook should be a candidate");
        Assert.True(tutorialsIdx >= 0, "tutorials should be a candidate");
        Assert.True(cookbookIdx < tutorialsIdx,
            $"cookbook (idx={cookbookIdx}) should rank higher than tutorials (idx={tutorialsIdx})");
    }

    [Fact]
    public void Scan_ImportBasedDetection_SkipsSourceAndBuildFolders()
    {
        // Arrange — Python project where source folder also imports own library
        // (e.g., internal imports). It should NOT be listed as a samples candidate.
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[project]\nname = \"my-pkg\"\n");

        var srcDir = Path.Combine(_testRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "core.py"),
            "from my_pkg import utils\n");

        var buildDir = Path.Combine(_testRoot, "build");
        Directory.CreateDirectory(buildDir);
        File.WriteAllText(Path.Combine(buildDir, "gen.py"),
            "from my_pkg import gen\n");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert — src and build should NOT appear as samples candidates
        Assert.DoesNotContain(srcDir, info.AllSamplesCandidates);
        Assert.DoesNotContain(buildDir, info.AllSamplesCandidates);
    }

    [Fact]
    public void Scan_Python_ExposesLibraryName()
    {
        // Arrange
        File.WriteAllText(Path.Combine(_testRoot, "pyproject.toml"),
            "[project]\nname = \"example-identity\"\n");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert
        Assert.Equal("example-identity", info.LibraryName);
    }

    [Fact]
    public void Scan_ConventionFolder_StillWorksWithoutLibraryName()
    {
        // Arrange — project without a parseable library name should still
        // detect samples via convention (folder named "examples")
        File.WriteAllText(Path.Combine(_testRoot, "setup.py"), "");
        File.WriteAllText(Path.Combine(_testRoot, "main.py"), "print('hello')");

        var examplesDir = Path.Combine(_testRoot, "examples");
        Directory.CreateDirectory(examplesDir);
        File.WriteAllText(Path.Combine(examplesDir, "sample.py"), "print('sample')");

        // Act
        var info = SdkInfo.Scan(_testRoot);

        // Assert — convention-based detection still works
        Assert.Equal(examplesDir, info.SamplesFolder);
    }
}
