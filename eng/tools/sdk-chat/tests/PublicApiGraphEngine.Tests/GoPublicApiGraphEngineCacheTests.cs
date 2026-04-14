// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Go;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for GoPublicApiGraphEngine cache eviction behavior.
/// Validates that stale cached binaries are cleaned up after compilation.
/// </summary>
public class GoPublicApiGraphEngineCacheTests
{
    [Fact]
    public void EvictStaleCacheEntries_RemovesOldBinaries()
    {
        // Arrange: create a temp cache directory with multiple engine binaries
        var cacheDir = Path.Combine(Path.GetTempPath(), $"sdk-chat-test-cache-{Guid.NewGuid():N}");
        Directory.CreateDirectory(cacheDir);

        try
        {
            var currentHash = "abc123";
            var staleHash1 = "old111";
            var staleHash2 = "old222";

            // Create current and stale binaries
            File.WriteAllText(Path.Combine(cacheDir, $"engine_{currentHash}"), "current");
            File.WriteAllText(Path.Combine(cacheDir, $"engine_{staleHash1}"), "stale1");
            File.WriteAllText(Path.Combine(cacheDir, $"engine_{staleHash2}"), "stale2");

            // Also create a non-engine file that should be untouched
            File.WriteAllText(Path.Combine(cacheDir, "readme.txt"), "keep me");

            Assert.Equal(4, Directory.GetFiles(cacheDir).Length);

            // Act: invoke the private eviction method via the public API surface
            // Since EvictStaleCacheEntries is private, we test through the observable behavior
            // by calling the static method via reflection
            var method = typeof(GoPublicApiGraphEngine).GetMethod(
                "EvictStaleCacheEntries",
                System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);
            Assert.NotNull(method);
            method!.Invoke(null, [cacheDir, currentHash]);

            // Assert: only the current binary and non-engine file remain
            var remaining = Directory.GetFiles(cacheDir).Select(Path.GetFileName).ToHashSet();
            Assert.Contains($"engine_{currentHash}", remaining);
            Assert.Contains("readme.txt", remaining);
            Assert.DoesNotContain($"engine_{staleHash1}", remaining);
            Assert.DoesNotContain($"engine_{staleHash2}", remaining);
            Assert.Equal(2, remaining.Count);
        }
        finally
        {
            Directory.Delete(cacheDir, recursive: true);
        }
    }

    [Fact]
    public void EvictStaleCacheEntries_HandlesEmptyDirectory()
    {
        var cacheDir = Path.Combine(Path.GetTempPath(), $"sdk-chat-test-cache-{Guid.NewGuid():N}");
        Directory.CreateDirectory(cacheDir);

        try
        {
            var method = typeof(GoPublicApiGraphEngine).GetMethod(
                "EvictStaleCacheEntries",
                System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);
            Assert.NotNull(method);

            // Should not throw on empty directory
            method!.Invoke(null, [cacheDir, "somehash"]);

            Assert.Empty(Directory.GetFiles(cacheDir));
        }
        finally
        {
            Directory.Delete(cacheDir, recursive: true);
        }
    }

    [Fact]
    public void EvictStaleCacheEntries_HandlesNonExistentDirectory()
    {
        var fakePath = Path.Combine(Path.GetTempPath(), $"nonexistent-{Guid.NewGuid():N}");

        var method = typeof(GoPublicApiGraphEngine).GetMethod(
            "EvictStaleCacheEntries",
            System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);
        Assert.NotNull(method);

        // Should not throw on nonexistent directory (best-effort)
        method!.Invoke(null, [fakePath, "somehash"]);
    }

    [Fact]
    public void EvictStaleCacheEntries_KeepsCurrentBinaryWithExeExtension()
    {
        var cacheDir = Path.Combine(Path.GetTempPath(), $"sdk-chat-test-cache-{Guid.NewGuid():N}");
        Directory.CreateDirectory(cacheDir);

        try
        {
            var currentHash = "win123";
            // Simulate Windows-style naming
            File.WriteAllText(Path.Combine(cacheDir, $"engine_{currentHash}.exe"), "current");
            File.WriteAllText(Path.Combine(cacheDir, $"engine_oldhash.exe"), "stale");

            var method = typeof(GoPublicApiGraphEngine).GetMethod(
                "EvictStaleCacheEntries",
                System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);
            Assert.NotNull(method);
            method!.Invoke(null, [cacheDir, currentHash]);

            var remaining = Directory.GetFiles(cacheDir).Select(Path.GetFileName).ToArray();
            Assert.Single(remaining);
            Assert.Equal($"engine_{currentHash}.exe", remaining[0]);
        }
        finally
        {
            Directory.Delete(cacheDir, recursive: true);
        }
    }
}
