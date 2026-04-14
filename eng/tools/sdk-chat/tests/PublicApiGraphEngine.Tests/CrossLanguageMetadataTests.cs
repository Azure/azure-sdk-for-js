// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class CrossLanguageMetadataTests : IDisposable
{
    private readonly string _tempDir;

    public CrossLanguageMetadataTests()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), $"CrossLangTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_tempDir);
    }

    public void Dispose()
    {
        try { Directory.Delete(_tempDir, true); } catch { }
        GC.SuppressFinalize(this);
    }

    [Fact]
    public void Load_ValidFile_ReturnsMap()
    {
        var path = Path.Combine(_tempDir, "map.json");
        File.WriteAllText(path, """
        {
            "packageId": "Example.Storage.Blobs",
            "ids": {
                "BlobClient": "cross-id-1",
                "ContainerClient": "cross-id-2"
            }
        }
        """);

        var result = CrossLanguageMetadata.Load(path);

        Assert.NotNull(result);
        Assert.Equal("Example.Storage.Blobs", result.PackageId);
        Assert.Equal(2, result.Ids.Count);
        Assert.Equal("cross-id-1", result.Ids["BlobClient"]);
        Assert.Equal("cross-id-2", result.Ids["ContainerClient"]);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Load_NullOrWhitespacePath_ReturnsNull(string? path)
    {
        Assert.Null(CrossLanguageMetadata.Load(path!));
    }

    [Fact]
    public void Load_NonexistentFile_ReturnsNull()
    {
        Assert.Null(CrossLanguageMetadata.Load(Path.Combine(_tempDir, "missing.json")));
    }

    [Fact]
    public void Load_MissingPackageId_ReturnsNull()
    {
        var path = Path.Combine(_tempDir, "no-pkg.json");
        File.WriteAllText(path, """{ "ids": { "A": "B" } }""");

        Assert.Null(CrossLanguageMetadata.Load(path));
    }

    [Fact]
    public void Load_MissingIds_ReturnsNull()
    {
        var path = Path.Combine(_tempDir, "no-ids.json");
        File.WriteAllText(path, """{ "packageId": "test" }""");

        Assert.Null(CrossLanguageMetadata.Load(path));
    }

    [Fact]
    public void Load_EmptyIds_ReturnsMapWithEmptyDict()
    {
        var path = Path.Combine(_tempDir, "empty-ids.json");
        File.WriteAllText(path, """{ "packageId": "test", "ids": {} }""");

        var result = CrossLanguageMetadata.Load(path);

        Assert.NotNull(result);
        Assert.Equal("test", result.PackageId);
        Assert.Empty(result.Ids);
    }
}
