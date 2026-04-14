// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Services;
using PublicApiGraphEngine.Contracts;
using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for API graphing and coverage analysis in PackageInfoService.
/// Entity group: api
/// </summary>
public class ApiServiceTests : PackageInfoTestBase
{
    #region GraphPublicApiAsync Tests

    [Fact]
    public async Task GraphPublicApiAsync_DotNetProject_GraphsApi()
    {
        // Arrange
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(TestRoot, "Test.csproj"), "<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup><TargetFramework>net8.0</TargetFramework></PropertyGroup></Project>");
        File.WriteAllText(Path.Combine(srcDir, "MyClient.cs"), @"
namespace TestSdk;

/// <summary>Test client for API operations.</summary>
public class MyClient
{
    /// <summary>Gets a resource by ID.</summary>
    public string GetResource(int id) => ""test"";

    /// <summary>Creates a new resource.</summary>
    public void CreateResource(string name) { }
}
");

        // Act
        var result = await Service.GraphPublicApiAsync(TestRoot);

        // Assert
        Assert.True(result.Success);
        Assert.Equal("DotNet", result.Language);
        Assert.NotNull(result.ApiSurface);
        Assert.Equal("stubs", result.Format);
        Assert.Contains("MyClient", result.ApiSurface);
        Assert.Contains("GetResource", result.ApiSurface);
    }

    [Fact]
    public async Task GraphPublicApiAsync_WithJsonFormat_ReturnsJson()
    {
        // Arrange
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(TestRoot, "Test.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "MyClient.cs"), @"
public class MyClient { public void DoWork() { } }
");

        // Act
        var result = await Service.GraphPublicApiAsync(TestRoot, asJson: true);

        // Assert
        Assert.True(result.Success);
        Assert.Equal("json", result.Format);
        Assert.Contains("{", result.ApiSurface); // JSON format
    }

    [Fact]
    public async Task GraphPublicApiAsync_UnknownLanguage_ReturnsError()
    {
        // Arrange - Empty directory
        File.WriteAllText(Path.Combine(TestRoot, "readme.txt"), "nothing here");

        // Act
        var result = await Service.GraphPublicApiAsync(TestRoot);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("LANGUAGE_DETECTION_FAILED", result.ErrorCode);
    }

    [Fact]
    public async Task GraphPublicApiAsync_WithLanguageOverride_UsesOverride()
    {
        // Arrange - Python project but force dotnet engine
        File.WriteAllText(Path.Combine(TestRoot, "pyproject.toml"), "[project]");
        File.WriteAllText(Path.Combine(TestRoot, "main.py"), "class Foo: pass");

        // Act - Force dotnet, which will fail to find .cs files
        var result = await Service.GraphPublicApiAsync(TestRoot, language: "dotnet");

        // Assert - Should succeed but find nothing (or minimal)
        Assert.True(result.Success);
        Assert.Equal("DotNet", result.Language);
    }

    [Fact]
    public async Task GraphPublicApiAsync_WithEmptyArtifactOptions_PreservesAutoDetectedInputBehavior()
    {
        // Arrange
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(TestRoot, "Test.csproj"), "<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup><TargetFramework>net8.0</TargetFramework></PropertyGroup></Project>");
        File.WriteAllText(Path.Combine(srcDir, "MyClient.cs"), @"
namespace TestSdk;
public class MyClient
{
    public string GetResource(int id) => ""test"";
}
");

        // Act
        var result = await Service.GraphPublicApiAsync(
            TestRoot,
            artifactOptions: new ArtifactOptions());

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Diagnostics);
        Assert.Contains(result.Diagnostics, d => d.Id == "ENGINE_INPUT");
        Assert.Contains("MyClient", result.ApiSurface);
    }

    #endregion

    #region AnalyzeCoverageAsync Tests

    [Fact]
    public async Task AnalyzeCoverageAsync_NoSamplesFolder_ReturnsError()
    {
        // Arrange - SDK with no samples
        var srcDir = Path.Combine(TestRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(TestRoot, "Test.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "Client.cs"), "public class Client { }");

        // Act
        var result = await Service.AnalyzeCoverageAsync(TestRoot);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("NO_SAMPLES_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task AnalyzeCoverageAsync_WithSamples_AnalyzesCoverage()
    {
        // Arrange - SDK with source and samples
        var srcDir = Path.Combine(TestRoot, "src");
        var samplesDir = Path.Combine(TestRoot, "samples");
        Directory.CreateDirectory(srcDir);
        Directory.CreateDirectory(samplesDir);

        File.WriteAllText(Path.Combine(TestRoot, "Test.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "MyClient.cs"), @"
namespace TestSdk;
public class MyClient
{
    public string GetResource(int id) => ""test"";
    public void CreateResource(string name) { }
    public void DeleteResource(int id) { }
}
");
        // Sample that uses GetResource
        File.WriteAllText(Path.Combine(samplesDir, "GetResourceSample.cs"), @"
using TestSdk;
class Sample
{
    void Run()
    {
        var client = new MyClient();
        client.GetResource(1);
    }
}
");

        // Act
        var result = await Service.AnalyzeCoverageAsync(TestRoot);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(TestRoot + "/src", result.SourceFolder?.Replace('\\', '/'));
        Assert.Equal(samplesDir, result.SamplesFolder);
        Assert.True(result.TotalOperations > 0);
    }

    [Fact]
    public async Task AnalyzeCoverageAsync_WithCustomSamplesPath_UsesIt()
    {
        // Arrange
        var srcDir = Path.Combine(TestRoot, "src");
        var customSamplesDir = Path.Combine(TestRoot, "my-samples");
        Directory.CreateDirectory(srcDir);
        Directory.CreateDirectory(customSamplesDir);

        File.WriteAllText(Path.Combine(TestRoot, "Test.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "Client.cs"), "public class Client { public void Work() {} }");
        File.WriteAllText(Path.Combine(customSamplesDir, "Sample.cs"), "class S { void Run() { new Client().Work(); } }");

        // Act
        var result = await Service.AnalyzeCoverageAsync(TestRoot, samplesPath: customSamplesDir);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(customSamplesDir, result.SamplesFolder);
    }

    [Fact]
    public async Task AnalyzeCoverageAsync_UnknownLanguage_ReturnsError()
    {
        // Arrange
        var samplesDir = Path.Combine(TestRoot, "samples");
        Directory.CreateDirectory(samplesDir);
        File.WriteAllText(Path.Combine(samplesDir, "readme.txt"), "samples");

        // Act
        var result = await Service.AnalyzeCoverageAsync(TestRoot);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("LANGUAGE_DETECTION_FAILED", result.ErrorCode);
    }

    #endregion

    #region Interface Tests

    [Fact]
    public void PackageInfoService_ImplementsInterface()
    {
        // Assert
        Assert.IsAssignableFrom<IPackageInfoService>(Service);
    }

    #endregion

    #region AnalyzeCoverageMonorepoAsync Tests

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_NonExistentPath_ReturnsError()
    {
        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(
            Path.Combine(TestRoot, "nonexistent"), null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("ROOT_NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_NoSdkFolder_ReturnsError()
    {
        // Arrange - Empty directory with no sdk/ folder
        File.WriteAllText(Path.Combine(TestRoot, "readme.txt"), "empty");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("NO_PACKAGES_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_TypeScriptPackages_FindsPackages()
    {
        // Arrange - TypeScript monorepo structure
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "storage-blob");
        var pkg2 = Path.Combine(TestRoot, "sdk", "keyvault", "keyvault-secrets");
        Directory.CreateDirectory(Path.Combine(pkg1, "src"));
        Directory.CreateDirectory(Path.Combine(pkg2, "src"));

        File.WriteAllText(Path.Combine(pkg1, "package.json"), "{\"name\": \"@example/storage-blob\", \"main\": \"dist/index.js\"}");
        File.WriteAllText(Path.Combine(pkg1, "src", "index.ts"), "export class BlobClient {}");

        File.WriteAllText(Path.Combine(pkg2, "package.json"), "{\"name\": \"@example/keyvault-secrets\", \"main\": \"dist/index.js\"}");
        File.WriteAllText(Path.Combine(pkg2, "src", "index.ts"), "export class SecretClient {}");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success, $"Expected Success=true but got ErrorCode={result.ErrorCode}, ErrorMessage={result.ErrorMessage}");
        Assert.Equal(TestRoot, result.RootPath);
        Assert.Equal(2, result.TotalPackages);
        // Both will be skipped (no samples)
        Assert.Equal(2, result.SkippedPackages);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_DotNetPackages_FindsPackages()
    {
        // Arrange - .NET monorepo structure
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "Acme.Storage.Blobs");
        var pkg1Src = Path.Combine(pkg1, "src");
        Directory.CreateDirectory(pkg1Src);

        File.WriteAllText(Path.Combine(pkg1Src, "Acme.Storage.Blobs.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(pkg1Src, "BlobClient.cs"), "public class BlobClient {}");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(1, result.TotalPackages);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_PythonPackages_FindsPackages()
    {
        // Arrange - Python monorepo structure
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "acme-storage-blob");
        Directory.CreateDirectory(Path.Combine(pkg1, "acme", "storage", "blob"));

        File.WriteAllText(Path.Combine(pkg1, "pyproject.toml"), "[project]\nname = \"acme-storage-blob\"");
        File.WriteAllText(Path.Combine(pkg1, "acme", "storage", "blob", "__init__.py"), "");
        File.WriteAllText(Path.Combine(pkg1, "acme", "storage", "blob", "_blob_client.py"), "class BlobClient: pass");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(1, result.TotalPackages);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_GoPackages_FindsPackages()
    {
        // Arrange - Go monorepo structure
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "azblob");
        Directory.CreateDirectory(pkg1);

        File.WriteAllText(Path.Combine(pkg1, "go.mod"), "module github.com/example/sdk-for-go/sdk/storage/azblob");
        File.WriteAllText(Path.Combine(pkg1, "client.go"), "package azblob\n\ntype Client struct {}");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(1, result.TotalPackages);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_JavaPackages_FindsPackages()
    {
        // Arrange - Java Maven monorepo structure
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "acme-storage-blob");
        var pkg1Src = Path.Combine(pkg1, "src", "main", "java", "com", "acme", "storage", "blob");
        Directory.CreateDirectory(pkg1Src);

        File.WriteAllText(Path.Combine(pkg1, "pom.xml"), "<project></project>");
        File.WriteAllText(Path.Combine(pkg1Src, "BlobClient.java"), "package com.acme.storage.blob;\npublic class BlobClient {}");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(1, result.TotalPackages);
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_WithProgress_ReportsProgress()
    {
        // Arrange
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "storage-blob");
        Directory.CreateDirectory(Path.Combine(pkg1, "src"));
        File.WriteAllText(Path.Combine(pkg1, "package.json"), "{\"name\": \"@example/storage-blob\", \"main\": \"dist/index.js\"}");
        File.WriteAllText(Path.Combine(pkg1, "src", "index.ts"), "export class Client {}");

        // Use a synchronous IProgress<T> implementation to avoid race conditions.
        // Progress<T> posts callbacks to the thread pool asynchronously, so messages
        // may not be delivered by the time assertions run after await.
        var progressMessages = new System.Collections.Concurrent.ConcurrentBag<string>();
        var progress = new SynchronousProgress<string>(msg => progressMessages.Add(msg));

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, progress, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success, $"Expected Success=true but got ErrorCode={result.ErrorCode}");
        Assert.NotEmpty(progressMessages);
        Assert.Contains(progressMessages, m => m.Contains("Found", StringComparison.Ordinal));
        Assert.Contains(progressMessages, m => m.Contains("[1/1]", StringComparison.Ordinal));
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_SkipsNodeModules()
    {
        // Arrange - Package with node_modules
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "storage-blob");
        var nodeModules = Path.Combine(pkg1, "node_modules", "some-dep");
        Directory.CreateDirectory(Path.Combine(pkg1, "src"));
        Directory.CreateDirectory(nodeModules);

        File.WriteAllText(Path.Combine(pkg1, "package.json"), "{\"name\": \"@example/storage-blob\", \"main\": \"dist/index.js\"}");
        File.WriteAllText(Path.Combine(pkg1, "src", "index.ts"), "export class Client {}");
        File.WriteAllText(Path.Combine(nodeModules, "package.json"), "{\"name\": \"some-dep\"}"); // Should be ignored

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success, $"Expected Success=true but got ErrorCode={result.ErrorCode}");
        Assert.Equal(1, result.TotalPackages); // Only the real package, not node_modules
    }

    [Fact]
    public async Task AnalyzeCoverageMonorepoAsync_AggregatesStats()
    {
        // Arrange - Two packages, one with samples
        var pkg1 = Path.Combine(TestRoot, "sdk", "storage", "storage-blob");
        var pkg1Samples = Path.Combine(pkg1, "samples");
        var pkg2 = Path.Combine(TestRoot, "sdk", "keyvault", "keyvault-secrets");

        Directory.CreateDirectory(Path.Combine(pkg1, "src"));
        Directory.CreateDirectory(pkg1Samples);
        Directory.CreateDirectory(Path.Combine(pkg2, "src"));

        File.WriteAllText(Path.Combine(pkg1, "package.json"), "{\"name\": \"@example/storage-blob\", \"main\": \"dist/index.js\"}");
        File.WriteAllText(Path.Combine(pkg1, "src", "index.ts"), @"
export class BlobClient {
    upload(): void {}
    download(): void {}
}
");
        File.WriteAllText(Path.Combine(pkg1Samples, "uploadSample.ts"), @"
import { BlobClient } from '../src';
const client = new BlobClient();
client.upload();
");

        File.WriteAllText(Path.Combine(pkg2, "package.json"), "{\"name\": \"@example/keyvault-secrets\", \"main\": \"dist/index.js\"}");
        File.WriteAllText(Path.Combine(pkg2, "src", "index.ts"), "export class SecretClient {}");

        // Act
        var result = await Service.AnalyzeCoverageMonorepoAsync(TestRoot, null, null, null, ct: CancellationToken.None);

        // Assert
        Assert.True(result.Success, $"Expected Success=true but got ErrorCode={result.ErrorCode}");
        Assert.Equal(2, result.TotalPackages);
        Assert.NotNull(result.Packages);
        Assert.Equal(2, result.Packages.Length);

        // pkg2 should be skipped (no samples)
        var pkg2Result = result.Packages.FirstOrDefault(p => p.RelativePath?.Contains("keyvault", StringComparison.Ordinal) == true);
        Assert.NotNull(pkg2Result);
        Assert.True(pkg2Result.SkippedNoSamples, "pkg2 should be skipped because it has no samples");

        // pkg1 has samples - it should either be analyzed or failed (depends on engine availability)
        var pkg1Result = result.Packages.FirstOrDefault(p => p.RelativePath?.Contains("storage", StringComparison.Ordinal) == true);
        Assert.NotNull(pkg1Result);
        Assert.False(pkg1Result.SkippedNoSamples, "pkg1 should not be skipped - it has samples");
    }

    #endregion

    /// <summary>
    /// Synchronous IProgress implementation for tests.
    /// Unlike <see cref="Progress{T}"/> which posts callbacks to the thread pool
    /// (causing race conditions in tests), this invokes the callback inline.
    /// </summary>
    private sealed class SynchronousProgress<T>(Action<T> handler) : IProgress<T>
    {
        public void Report(T value) => handler(value);
    }
}
