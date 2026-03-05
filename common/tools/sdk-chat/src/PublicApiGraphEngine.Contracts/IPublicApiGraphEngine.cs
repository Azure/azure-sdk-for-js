// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Common interface for all API index types.
/// Enables polymorphic handling of different language engines.
/// </summary>
public interface IApiIndex : IDiagnosticsSource
{
    /// <summary>Gets the package name.</summary>
    string Package { get; }

    /// <summary>Formats the API index as JSON.</summary>
    string ToJson(bool pretty = false);

    /// <summary>Formats the API index as human-readable language-native stubs.</summary>
    string ToStubs();

    /// <summary>
    /// Canonical cross-language package identifier, when available.
    /// </summary>
    string? CrossLanguagePackageId => null;

    /// <summary>
    /// Structured diagnostics emitted during engine run and post-processing.
    /// </summary>
    IReadOnlyList<ApiDiagnostic> Diagnostics => [];

    /// <summary>
    /// Strips language-specific generic/type-parameter suffixes from a type name to produce
    /// a canonical form suitable for cross-engine comparison.
    /// C# uses <![CDATA[<T>]]>, Python uses [T], Java/Go/TypeScript have no suffix in names.
    /// </summary>
    static string NormalizeTypeName(string name) => name.Split('<', '[')[0];
}

/// <summary>
/// Non-generic base interface for language-agnostic Public API Graph Engine operations.
/// </summary>
public interface IPublicApiGraphEngine
{
    /// <summary>
    /// Gets the language this engine supports (e.g., "csharp", "python", "java", "go", "typescript").
    /// </summary>
    string Language { get; }

    /// <summary>
    /// Checks if the required runtime is available (e.g., Python interpreter, JBang, Node.js, Go).
    /// </summary>
    bool IsAvailable();

    /// <summary>
    /// Gets a message describing why the engine is unavailable.
    /// </summary>
    string? UnavailableReason { get; }

    /// <summary>
    /// Graphs the public API surface and returns a common result.
    /// </summary>
    Task<EngineResult> GraphAsyncCore(EngineInput input, CrossLanguageMap? crossLanguageMap = null, CancellationToken ct = default);
}

/// <summary>
/// Defines the contract for language-specific Public API Graph Engines.
/// All engines produce a JSON-serializable API index and can format as language-native stubs.
/// </summary>
/// <typeparam name="TIndex">The API index type specific to this language.</typeparam>
public interface IPublicApiGraphEngine<TIndex> : IPublicApiGraphEngine where TIndex : class, IApiIndex
{
    /// <summary>
    /// Graphs the public API surface from the specified input.
    /// </summary>
    Task<EngineResult<TIndex>> GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap = null, CancellationToken ct = default);

    /// <summary>
    /// Formats the API index as JSON.
    /// </summary>
    string ToJson(TIndex index, bool pretty = false);

    /// <summary>
    /// Formats the API index as human-readable language-native stubs.
    /// </summary>
    string ToStubs(TIndex index);

    /// <summary>
    /// Default implementation for non-generic engine.
    /// </summary>
    async Task<EngineResult> IPublicApiGraphEngine.GraphAsyncCore(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        var result = await GraphAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
        return result.ToBase();
    }
}

/// <summary>
/// Discriminated union result of an engine operation (non-generic base).
/// </summary>
public abstract record EngineResult
{
    private EngineResult() { }

    /// <summary>True if engine succeeded.</summary>
    public abstract bool IsSuccess { get; }

    /// <summary>Structured diagnostics encountered during engine run.</summary>
    public IReadOnlyList<ApiDiagnostic> Diagnostics { get; init; } = [];

    /// <summary>Gets the API index or throws if failed.</summary>
    public abstract IApiIndex GetValueOrThrow();

    /// <summary>Successful engine result.</summary>
    public sealed record Success(IApiIndex Value) : EngineResult
    {
        public override bool IsSuccess => true;
        public override IApiIndex GetValueOrThrow() => Value;
    }

    /// <summary>Failed engine result.</summary>
    public sealed record Failure(string Error) : EngineResult
    {
        public override bool IsSuccess => false;
        public override IApiIndex GetValueOrThrow() => throw new InvalidOperationException(Error);
    }
}

/// <summary>
/// Discriminated union result of an engine operation.
/// </summary>
/// <typeparam name="T">The API index type.</typeparam>
public abstract record EngineResult<T> where T : class, IApiIndex
{
    private EngineResult() { }

    /// <summary>True if engine succeeded.</summary>
    public abstract bool IsSuccess { get; }

    /// <summary>Structured diagnostics encountered during engine run.</summary>
    public IReadOnlyList<ApiDiagnostic> Diagnostics { get; init; } = [];

    /// <summary>Gets the value or throws if failed.</summary>
    public abstract T GetValueOrThrow();

    /// <summary>Converts to non-generic base result.</summary>
    public abstract EngineResult ToBase();

    /// <summary>Successful engine result.</summary>
    public sealed record Success(T Value) : EngineResult<T>
    {
        public override bool IsSuccess => true;
        public override T GetValueOrThrow() => Value;
        public override EngineResult ToBase() => new EngineResult.Success(Value) { Diagnostics = Diagnostics };
    }

    /// <summary>Failed engine result.</summary>
    public sealed record Failure(string Error) : EngineResult<T>
    {
        public override bool IsSuccess => false;
        public override T GetValueOrThrow() => throw new InvalidOperationException(Error);
        public override EngineResult ToBase() => new EngineResult.Failure(Error) { Diagnostics = Diagnostics };
    }

    /// <summary>Creates a successful result.</summary>
    public static EngineResult<T> CreateSuccess(T value, IReadOnlyList<ApiDiagnostic>? diagnostics = null)
        => new Success(value) { Diagnostics = diagnostics ?? [] };

    /// <summary>Creates a failure result.</summary>
    public static EngineResult<T> CreateFailure(string error)
        => new Failure(error);
}
