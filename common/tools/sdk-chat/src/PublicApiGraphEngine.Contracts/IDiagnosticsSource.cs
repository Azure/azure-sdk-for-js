// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// AOT-safe abstraction exposing the minimal type/callable metadata
/// needed by <see cref="ApiDiagnosticsPostProcessor"/> without reflection.
/// Each language's <see cref="IApiIndex"/> implementation provides this.
/// </summary>
public interface IDiagnosticsSource
{
    /// <summary>All public types in the API surface.</summary>
    IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes();

    /// <summary>All top-level callable items (e.g., Go/Python/TS module-level functions).</summary>
    IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables();
}

/// <summary>Minimal type descriptor for diagnostics post-processing.</summary>
public sealed record DiagnosticTypeInfo
{
    public required string Name { get; init; }
    public string? Id { get; init; }
    public string? Doc { get; init; }
    public bool EntryPoint { get; init; }
    public bool IsDeprecated { get; init; }

    /// <summary>Methods, constructors, and other operations on this type.</summary>
    public IReadOnlyList<DiagnosticCallableInfo> Callables { get; init; } = [];
}

/// <summary>Minimal callable descriptor for diagnostics post-processing.</summary>
public sealed record DiagnosticCallableInfo
{
    public required string Name { get; init; }
    public string? Id { get; init; }

    /// <summary>Parameter type names (only the <c>Type</c> strings are needed for SDK003).</summary>
    public IReadOnlyList<string> ParameterTypes { get; init; } = [];
}
