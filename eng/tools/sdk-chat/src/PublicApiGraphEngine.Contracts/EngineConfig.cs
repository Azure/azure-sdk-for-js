// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Immutable configuration for a language-specific Public API Graph Engine.
/// Defines all parameters needed for availability detection across
/// both the engine and its paired usage analyzer.
/// </summary>
/// <remarks>
/// Each language defines one static <see cref="EngineConfig"/> instance,
/// eliminating the duplicated candidates arrays, field names, and
/// <see cref="EngineAvailability.Check"/> call sites that were
/// previously copy-pasted across every engine + analyzer pair.
/// </remarks>
public sealed record EngineConfig
{
    /// <summary>Language identifier (e.g., "python", "java", "go", "typescript").</summary>
    public required string Language { get; init; }

    /// <summary>Name of the precompiled native binary (e.g., "python_engine").</summary>
    public required string NativeBinaryName { get; init; }

    /// <summary>Name of the runtime tool (e.g., "python", "jbang", "node", "go").</summary>
    public required string RuntimeToolName { get; init; }

    /// <summary>Candidate paths for the runtime tool.</summary>
    public required string[] RuntimeCandidates { get; init; }

    /// <summary>Arguments passed to the native binary for validation (default: "--help").</summary>
    public string NativeValidationArgs { get; init; } = "--help";

    /// <summary>Arguments passed to the runtime tool for validation (default: "--version").</summary>
    public string RuntimeValidationArgs { get; init; } = "--version";
}

/// <summary>
/// Provides cached engine availability from an <see cref="EngineConfig"/>.
/// Shared between an engine and its paired usage analyzer to ensure
/// a single availability check per language, with consistent configuration.
/// </summary>
public sealed class EngineAvailabilityProvider
{
    private readonly EngineConfig _config;
    private EngineAvailabilityResult? _cached;

    public EngineAvailabilityProvider(EngineConfig config)
    {
        _config = config;
    }

    /// <summary>Gets the language identifier.</summary>
    public string Language => _config.Language;

    /// <summary>Checks if the engine is available.</summary>
    public bool IsAvailable => GetAvailability().IsAvailable;

    /// <summary>Gets a message describing why the engine is unavailable.</summary>
    public string? UnavailableReason => GetAvailability().UnavailableReason;

    /// <summary>Warning message from tool resolution (if any).</summary>
    public string? Warning => GetAvailability().Warning;

    /// <summary>Gets the current execution mode.</summary>
    public EngineMode Mode => GetAvailability().Mode;

    /// <summary>Gets the full availability result with caching.</summary>
    public EngineAvailabilityResult GetAvailability()
    {
        return _cached ??= EngineAvailability.Check(
            language: _config.Language,
            nativeBinaryName: _config.NativeBinaryName,
            runtimeToolName: _config.RuntimeToolName,
            runtimeCandidates: _config.RuntimeCandidates,
            nativeValidationArgs: _config.NativeValidationArgs,
            runtimeValidationArgs: _config.RuntimeValidationArgs);
    }
}
