// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Centralized timeout configuration for all Public API Graph Engines.
/// Reads from environment variable SDK_CHAT_ENGINE_TIMEOUT.
/// </summary>
public static class EngineTimeout
{
    /// <summary>
    /// Default timeout in seconds (5 minutes for large repos).
    /// </summary>
    public const int DefaultSeconds = 300;

    /// <summary>
    /// Environment variable name for timeout override.
    /// </summary>
    public const string EnvVarName = "SDK_CHAT_ENGINE_TIMEOUT";

    private static Lazy<TimeSpan> _lazy = new(ResolveTimeout);

    /// <summary>
    /// Gets the configured engine timeout.
    /// Thread-safe; reads SDK_CHAT_ENGINE_TIMEOUT once and caches the result.
    /// </summary>
    public static TimeSpan Value => _lazy.Value;

    /// <summary>
    /// Maximum allowed timeout in seconds (1 hour). Prevents env var misconfiguration
    /// from allowing external processes to run indefinitely.
    /// </summary>
    public const int MaxSeconds = 3600;

    private static TimeSpan ResolveTimeout()
    {
        var envValue = Environment.GetEnvironmentVariable(EnvVarName);
        if (int.TryParse(envValue, out var seconds) && seconds > 0)
        {
            return TimeSpan.FromSeconds(Math.Min(seconds, MaxSeconds));
        }
        return TimeSpan.FromSeconds(DefaultSeconds);
    }

    /// <summary>
    /// Resets the cached timeout. For testing only.
    /// </summary>
    internal static void Reset() => _lazy = new(ResolveTimeout);
}
