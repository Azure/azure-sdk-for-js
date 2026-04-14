// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Non-generic base interface for language-agnostic usage analysis operations.
/// </summary>
public interface IUsageAnalyzer
{
    /// <summary>
    /// Gets the language this analyzer supports (e.g., "csharp", "python", "java", "go", "typescript").
    /// </summary>
    string Language { get; }

    /// <summary>
    /// Checks whether the analyzer's runtime dependencies are available.
    /// </summary>
    bool IsAvailable();

    /// <summary>
    /// Human-readable reason why the analyzer is unavailable, or null if available.
    /// </summary>
    string? UnavailableReason => IsAvailable() ? null : $"{Language} usage analyzer is not available";

    /// <summary>
    /// Analyzes code files to graph API usage patterns (non-generic version).
    /// </summary>
    /// <param name="codePath">Path to directory containing code to analyze.</param>
    /// <param name="apiIndex">The API surface to match usages against (must be compatible type).</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Graphed usage information.</returns>
    Task<UsageIndex> AnalyzeAsyncCore(string codePath, IApiIndex apiIndex, CancellationToken ct = default);

    /// <summary>
    /// Formats the usage index as a compact summary for LLM context.
    /// </summary>
    string Format(UsageIndex index);
}

/// <summary>
/// Analyzes code to graph which API operations are being used.
/// Generic across samples, tests, or any consumer code.
/// </summary>
/// <typeparam name="TApiIndex">The API index type to match against.</typeparam>
public interface IUsageAnalyzer<TApiIndex> : IUsageAnalyzer where TApiIndex : class, IApiIndex
{
    /// <summary>
    /// Analyzes code files to graph API usage patterns.
    /// </summary>
    /// <param name="codePath">Path to directory containing code to analyze.</param>
    /// <param name="apiIndex">The API surface to match usages against.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Graphed usage information.</returns>
    Task<UsageIndex> AnalyzeAsync(string codePath, TApiIndex apiIndex, CancellationToken ct = default);

    /// <summary>
    /// Default implementation for non-generic analysis.
    /// </summary>
    async Task<UsageIndex> IUsageAnalyzer.AnalyzeAsyncCore(string codePath, IApiIndex apiIndex, CancellationToken ct)
    {
        if (apiIndex is not TApiIndex typedIndex)
            throw new ArgumentException($"Expected {typeof(TApiIndex).Name} but got {apiIndex.GetType().Name}", nameof(apiIndex));

        return await AnalyzeAsync(codePath, typedIndex, ct).ConfigureAwait(false);
    }
}

/// <summary>
/// Graphed API usage information from consumer code.
/// </summary>
public sealed record UsageIndex
{
    /// <summary>Total number of files analyzed.</summary>
    public required int FileCount { get; init; }

    /// <summary>Operations that are covered (called) in the analyzed code.</summary>
    public List<OperationUsage> CoveredOperations { get; init; } = [];

    /// <summary>Operations from the API that are NOT used in the analyzed code.</summary>
    public List<UncoveredOperation> UncoveredOperations { get; init; } = [];
}

/// <summary>
/// A single API operation usage found in consumer code.
/// </summary>
public sealed record OperationUsage
{
    /// <summary>The client/service type being called.</summary>
    public required string ClientType { get; init; }

    /// <summary>The method/operation name.</summary>
    public required string Operation { get; init; }

    /// <summary>Relative path to the file containing this usage.</summary>
    public required string File { get; init; }

    /// <summary>Line number where the call occurs.</summary>
    public required int Line { get; init; }
}

/// <summary>
/// An API operation that exists but has no usage in analyzed code.
/// </summary>
public sealed record UncoveredOperation
{
    /// <summary>The client/service type.</summary>
    public required string ClientType { get; init; }

    /// <summary>The method/operation name.</summary>
    public required string Operation { get; init; }

    /// <summary>Brief signature for context.</summary>
    public required string Signature { get; init; }
}
