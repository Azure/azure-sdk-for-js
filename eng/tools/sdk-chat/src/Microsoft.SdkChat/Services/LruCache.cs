// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Thread-safe LRU cache with configurable size limit.
/// When the cache exceeds the limit, the least recently accessed items are evicted.
/// </summary>
/// <typeparam name="TKey">The type of keys.</typeparam>
/// <typeparam name="TValue">The type of values.</typeparam>
public sealed class LruCache<TKey, TValue> where TKey : notnull
{
    private readonly ConcurrentDictionary<TKey, CacheEntry> _cache;
    private readonly int _maxSize;
    private readonly Lock _evictionLock = new();
    private long _accessCounter;

    /// <summary>
    /// Creates a new LRU cache with the specified maximum size.
    /// </summary>
    /// <param name="maxSize">Maximum number of entries before eviction occurs.</param>
    /// <param name="comparer">Optional key comparer.</param>
    public LruCache(int maxSize, IEqualityComparer<TKey>? comparer = null)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(maxSize, 1);
        _maxSize = maxSize;
        _cache = new ConcurrentDictionary<TKey, CacheEntry>(comparer ?? EqualityComparer<TKey>.Default);
    }

    /// <summary>Current number of items.</summary>
    public int Count => _cache.Count;

    /// <summary>Maximum cache size.</summary>
    public int MaxSize => _maxSize;

    /// <summary>
    /// Gets or adds a value using the specified factory.
    /// </summary>
    public TValue GetOrAdd(TKey key, Func<TKey, TValue> valueFactory)
    {
        if (_cache.TryGetValue(key, out var existing))
        {
            existing.LastAccess = Interlocked.Increment(ref _accessCounter);
            return existing.Value;
        }

        var value = valueFactory(key);
        var entry = new CacheEntry(value, Interlocked.Increment(ref _accessCounter));

        if (_cache.TryAdd(key, entry))
        {
            EvictIfNeeded();
            return value;
        }

        // Another thread added it first - use their value
        if (_cache.TryGetValue(key, out existing))
        {
            existing.LastAccess = Interlocked.Increment(ref _accessCounter);
            return existing.Value;
        }

        // Race with eviction: the winning entry was evicted between TryAdd and
        // TryGetValue. Return the locally computed value without forcing it into
        // the cache — a force-add here could overwrite a newer entry inserted by
        // a third concurrent thread, causing silent cache corruption.
        return value;
    }

    /// <summary>
    /// Tries to get a value from the cache.
    /// </summary>
    public bool TryGetValue(TKey key, out TValue? value)
    {
        if (_cache.TryGetValue(key, out var entry))
        {
            entry.LastAccess = Interlocked.Increment(ref _accessCounter);
            value = entry.Value;
            return true;
        }

        value = default;
        return false;
    }

    /// <summary>
    /// Clears all entries from the cache.
    /// </summary>
    public void Clear() => _cache.Clear();

    private void EvictIfNeeded()
    {
        if (_cache.Count <= _maxSize)
            return;

        lock (_evictionLock)
        {
            // Double-check after acquiring lock
            if (_cache.Count <= _maxSize)
                return;

            // Evict oldest 25% when over limit
            // Take a snapshot to avoid concurrent modification during enumeration
            var evictCount = Math.Max(1, _maxSize / 4);
            var snapshot = _cache.ToArray();
            var toEvict = snapshot
                .OrderBy(kvp => kvp.Value.LastAccess)
                .Take(evictCount)
                .Select(kvp => kvp.Key)
                .ToList();

            foreach (var key in toEvict)
            {
                _cache.TryRemove(key, out _);
            }
        }
    }

    private sealed class CacheEntry(TValue value, long lastAccess)
    {
        public TValue Value { get; } = value;

        /// <summary>
        /// Last access timestamp. Uses Volatile to ensure visibility across threads
        /// (prevents torn reads on ARM64 where long writes may not be atomic).
        /// </summary>
        private long _lastAccess = lastAccess;
        public long LastAccess
        {
            get => Volatile.Read(ref _lastAccess);
            set => Volatile.Write(ref _lastAccess, value);
        }
    }
}
