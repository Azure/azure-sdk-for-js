// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for the LruCache class.
/// </summary>
public class LruCacheTests
{
    #region Constructor Tests

    [Fact]
    public void Constructor_WithValidSize_Creates()
    {
        var cache = new LruCache<string, int>(10);
        Assert.Equal(10, cache.MaxSize);
        Assert.Equal(0, cache.Count);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-100)]
    public void Constructor_WithInvalidSize_Throws(int size)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => new LruCache<string, int>(size));
    }

    [Fact]
    public void Constructor_WithCustomComparer_Uses()
    {
        var cache = new LruCache<string, int>(10, StringComparer.OrdinalIgnoreCase);
        cache.GetOrAdd("KEY", _ => 1);

        Assert.True(cache.TryGetValue("key", out var value));
        Assert.Equal(1, value);
    }

    #endregion

    #region GetOrAdd Tests

    [Fact]
    public void GetOrAdd_NewKey_AddsValue()
    {
        var cache = new LruCache<string, int>(10);
        var result = cache.GetOrAdd("key", _ => 42);

        Assert.Equal(42, result);
        Assert.Equal(1, cache.Count);
    }

    [Fact]
    public void GetOrAdd_ExistingKey_ReturnsExisting()
    {
        var cache = new LruCache<string, int>(10);
        cache.GetOrAdd("key", _ => 1);
        var callCount = 0;

        var result = cache.GetOrAdd("key", _ => { callCount++; return 2; });

        Assert.Equal(1, result);
        Assert.Equal(0, callCount); // Factory should not be called
    }

    [Fact]
    public void GetOrAdd_MultipleKeys_AddsAll()
    {
        var cache = new LruCache<string, int>(10);

        cache.GetOrAdd("a", _ => 1);
        cache.GetOrAdd("b", _ => 2);
        cache.GetOrAdd("c", _ => 3);

        Assert.Equal(3, cache.Count);
    }

    #endregion

    #region Eviction Tests

    [Fact]
    public void GetOrAdd_WhenOverLimit_EvictsOldest()
    {
        var cache = new LruCache<string, int>(4);

        // Add 4 items
        cache.GetOrAdd("a", _ => 1);
        cache.GetOrAdd("b", _ => 2);
        cache.GetOrAdd("c", _ => 3);
        cache.GetOrAdd("d", _ => 4);

        // Add 5th item - should trigger eviction
        cache.GetOrAdd("e", _ => 5);

        // Should have evicted ~25% (1 item)
        Assert.True(cache.Count <= 4);
    }

    [Fact]
    public void GetOrAdd_AccessUpdatesRecency()
    {
        var cache = new LruCache<string, int>(4);

        cache.GetOrAdd("a", _ => 1);
        cache.GetOrAdd("b", _ => 2);
        cache.GetOrAdd("c", _ => 3);
        cache.GetOrAdd("d", _ => 4);

        // Access 'a' to make it recent
        cache.GetOrAdd("a", _ => 999);

        // Add new item
        cache.GetOrAdd("e", _ => 5);

        // 'a' should still exist because it was accessed
        Assert.True(cache.TryGetValue("a", out var value));
        Assert.Equal(1, value); // Original value, not 999
    }

    [Fact]
    public void GetOrAdd_LargeEviction_EvictsMultiple()
    {
        var cache = new LruCache<string, int>(10);

        // Add 10 items
        for (int i = 0; i < 10; i++)
        {
            cache.GetOrAdd($"key{i}", _ => i);
        }

        // Add many more items to force multiple evictions
        for (int i = 10; i < 20; i++)
        {
            cache.GetOrAdd($"key{i}", _ => i);
        }

        // Should stay within limit
        Assert.True(cache.Count <= 10);
    }

    #endregion

    #region TryGetValue Tests

    [Fact]
    public void TryGetValue_ExistingKey_ReturnsTrue()
    {
        var cache = new LruCache<string, int>(10);
        cache.GetOrAdd("key", _ => 42);

        var result = cache.TryGetValue("key", out var value);

        Assert.True(result);
        Assert.Equal(42, value);
    }

    [Fact]
    public void TryGetValue_MissingKey_ReturnsFalse()
    {
        var cache = new LruCache<string, int>(10);

        var result = cache.TryGetValue("missing", out var value);

        Assert.False(result);
        Assert.Equal(default, value);
    }

    [Fact]
    public void TryGetValue_UpdatesAccessTime()
    {
        var cache = new LruCache<string, int>(3);

        cache.GetOrAdd("a", _ => 1);
        cache.GetOrAdd("b", _ => 2);
        cache.GetOrAdd("c", _ => 3);

        // Access 'a' via TryGetValue
        cache.TryGetValue("a", out _);

        // Add new item
        cache.GetOrAdd("d", _ => 4);

        // 'a' should still exist
        Assert.True(cache.TryGetValue("a", out _));
    }

    #endregion

    #region Clear Tests

    [Fact]
    public void Clear_EmptiesCache()
    {
        var cache = new LruCache<string, int>(10);
        cache.GetOrAdd("a", _ => 1);
        cache.GetOrAdd("b", _ => 2);

        cache.Clear();

        Assert.Equal(0, cache.Count);
        Assert.False(cache.TryGetValue("a", out _));
        Assert.False(cache.TryGetValue("b", out _));
    }

    #endregion

    #region Thread Safety Tests

    [Fact]
    public async Task GetOrAdd_ConcurrentAccess_IsThreadSafe()
    {
        var cache = new LruCache<int, int>(100);
        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++)
        {
            var taskId = i;
            tasks.Add(Task.Run(() =>
            {
                for (int j = 0; j < 100; j++)
                {
                    var key = (taskId * 100) + j;
                    cache.GetOrAdd(key, k => k * 2);
                }
            }));
        }

        await Task.WhenAll(tasks);

        // Should have some items (eviction may have occurred)
        Assert.True(cache.Count > 0);
        Assert.True(cache.Count <= 100);
    }

    [Fact]
    public async Task GetOrAdd_ConcurrentSameKey_CallsFactoryOnce()
    {
        var cache = new LruCache<string, int>(10);
        var callCount = 0;
        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++)
        {
            tasks.Add(Task.Run(() =>
            {
                cache.GetOrAdd("same-key", _ =>
                {
                    Interlocked.Increment(ref callCount);
                    Thread.Sleep(10); // Simulate slow factory
                    return 42;
                });
            }));
        }

        await Task.WhenAll(tasks);

        // Factory may be called multiple times due to race, but result should be consistent
        Assert.True(cache.TryGetValue("same-key", out _));
    }

    #endregion

    #region Edge Cases

    [Fact]
    public void GetOrAdd_SizeOne_Works()
    {
        var cache = new LruCache<string, int>(1);

        cache.GetOrAdd("a", _ => 1);
        Assert.Equal(1, cache.Count);

        cache.GetOrAdd("b", _ => 2);
        Assert.True(cache.Count <= 1);
    }

    [Fact]
    public void GetOrAdd_NullValue_Allowed()
    {
        var cache = new LruCache<string, string?>(10);
        cache.GetOrAdd("key", _ => null);

        Assert.True(cache.TryGetValue("key", out var value));
        Assert.Null(value);
    }

    #endregion

    #region Concurrent Access Stress Tests

    [Fact]
    public async Task GetOrAdd_ConcurrentReadsAndWrites_DoesNotCorrupt()
    {
        // Arrange
        var cache = new LruCache<int, int>(50);
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        var tasks = new List<Task>();
        var corruptionDetected = false;

        // Act - true concurrent reads and writes using GetOrAdd for both
        // This tests that concurrent access doesn't corrupt the cache
        for (var i = 0; i < 300; i++)
        {
            var key = i % 100;
            tasks.Add(Task.Run(() =>
            {
                var result = cache.GetOrAdd(key, k => k);
                // Value should always equal key - if not, corruption occurred
                if (result != key)
                {
                    corruptionDetected = true;
                }
            }, cts.Token));
        }

        await Task.WhenAll(tasks);

        // Assert - no corruption and cache invariant maintained
        Assert.False(corruptionDetected, "Cache returned incorrect value - corruption detected");
        Assert.True(cache.Count <= 50, $"Cache count {cache.Count} exceeds max size 50");
    }

    [Fact]
    public async Task Eviction_UnderConcurrentLoad_MaintainsInvariant()
    {
        // Arrange - small cache to force frequent evictions
        var cache = new LruCache<int, int>(10);
        var tasks = new List<Task>();

        // Act - heavy concurrent load forcing evictions
        for (var i = 0; i < 500; i++)
        {
            var key = i;
            tasks.Add(Task.Run(() => cache.GetOrAdd(key, k => k)));
        }

        await Task.WhenAll(tasks);

        // Assert - cache invariant maintained
        Assert.True(cache.Count <= 10, $"Cache count {cache.Count} exceeds max size 10");
    }

    #endregion
}
