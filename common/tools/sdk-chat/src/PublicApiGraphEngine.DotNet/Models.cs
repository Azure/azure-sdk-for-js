// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.DotNet;

/// <summary>
/// Output model for graphed API surface.
/// Minimal schema - only what AI needs to understand the SDK.
/// </summary>
public sealed record ApiIndex : IApiIndex
{
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    [JsonPropertyName("version")]
    public string? Version { get; init; }

    [JsonPropertyName("crossLanguagePackageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguagePackageId { get; init; }

    [JsonPropertyName("namespaces")]
    public IReadOnlyList<NamespaceInfo> Namespaces { get; init; } = [];

    /// <summary>Types from external dependencies that are referenced in the public API.</summary>
    [JsonPropertyName("dependencies")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<DependencyInfo>? Dependencies { get; init; }

    [JsonPropertyName("diagnostics")]
    public IReadOnlyList<ApiDiagnostic> Diagnostics { get; init; } = [];

    public string ToJson(bool pretty = false) => pretty
        ? JsonSerializer.Serialize(this, JsonContext.Indented.ApiIndex)
        : JsonSerializer.Serialize(this, JsonContext.Default.ApiIndex);

    public string ToStubs() => CSharpFormatter.Format(this);

    /// <summary>
    /// Gets a flattened list of all types in the API.
    /// </summary>
    public IEnumerable<TypeInfo> GetAllTypes() =>
        Namespaces.SelectMany(ns => ns.Types);

    /// <summary>
    /// Gets client types (entry-point classes that have operations).
    /// </summary>
    public IEnumerable<TypeInfo> GetClientTypes() =>
        GetAllTypes().Where(t => t.IsClientType);

    private static readonly HashSet<string> OperationKinds = new(StringComparer.OrdinalIgnoreCase) { "method", "ctor", "operator" };

    public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() =>
        GetAllTypes().Select(t => new DiagnosticTypeInfo
        {
            Name = t.Name,
            Id = t.Id,
            Doc = t.Doc,
            EntryPoint = t.EntryPoint == true,
            IsDeprecated = t.IsDeprecated == true,
            Callables = (t.Members ?? [])
                .Where(m => m.Kind is not null && OperationKinds.Contains(m.Kind))
                .Select(m => new DiagnosticCallableInfo
                {
                    Name = m.Name,
                    Id = m.Id,
                    ParameterTypes = (m.Params ?? []).Select(p => p.Type).ToList(),
                }).ToList(),
        });

    public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => [];
}

/// <summary>Information about types from a dependency package/assembly.</summary>
public sealed record DependencyInfo
{
    /// <summary>The package name (e.g., "Sdk.Core").</summary>
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    /// <summary>Whether this dependency is from the .NET base class library.</summary>
    [JsonPropertyName("isStdlib")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool IsStdlib { get; init; }

    /// <summary>Types from this package that are referenced in the API.</summary>
    [JsonPropertyName("types")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<TypeInfo>? Types { get; init; }
}

public record NamespaceInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("types")]
    public IReadOnlyList<TypeInfo> Types { get; init; } = [];
}

public record TypeInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("kind")]
    public string Kind { get; init; } = ""; // class, interface, struct, enum, record, delegate

    [JsonPropertyName("entryPoint")]
    public bool? EntryPoint { get; init; }

    [JsonPropertyName("isError")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsError { get; init; }

    /// <summary>External package/assembly this type is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("base")]
    public string? Base { get; init; }

    [JsonPropertyName("interfaces")]
    public IReadOnlyList<string>? Interfaces { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    [JsonPropertyName("members")]
    public IReadOnlyList<MemberInfo>? Members { get; init; }

    [JsonPropertyName("values")]
    public IReadOnlyList<string>? Values { get; init; } // For enums

    /// <summary>
    /// Returns true if this is a client type (entry point for SDK operations).
    /// A client type must be an entry point AND have methods (operations).
    /// Allows class, struct, and record kinds — not just class.
    /// </summary>
    [JsonIgnore]
    public bool IsClientType =>
        EntryPoint == true &&
        (Members?.Any(m => m.Kind == "method") ?? false);

    /// <summary>
    /// Returns true if this is a model/DTO type (no methods, just properties).
    /// </summary>
    [JsonIgnore]
    public bool IsModelType =>
        (Kind == "class" || Kind == "record" || Kind == "struct") &&
        !(Members?.Any(m => m.Kind == "method") ?? false) &&
        (Members?.Any(m => m.Kind == "property") ?? false);

    /// <summary>
    /// Returns true if this type inherits from System.Exception.
    /// Set structurally by the Roslyn-based engine via inheritance chain analysis.
    /// </summary>
    [JsonIgnore]
    public bool IsErrorType => IsError == true;

    /// <summary>
    /// Gets the priority for smart truncation.
    /// Lower = more important, include first.
    /// Aligned across all language engines: client=0, error=1, model=2, other=3.
    /// </summary>
    [JsonIgnore]
    public int TruncationPriority
    {
        get
        {
            if (IsClientType) return 0;        // Clients are most important
            if (IsErrorType) return 1;         // Error types for error handling
            if (IsModelType) return 2;         // Models are common but secondary
            return 3;                          // Everything else (enums, delegates, etc.)
        }
    }

    /// <summary>
    /// Gets all type names referenced by this type's members.
    /// </summary>
    public HashSet<string> GetReferencedTypes(HashSet<string> allTypeNames)
    {
        HashSet<string> tokens = [];
        CollectReferencedTypes(allTypeNames, tokens);
        return tokens;
    }

    /// <summary>
    /// Populates <paramref name="result"/> with referenced type names.
    /// Clears the set first so callers can reuse it across iterations.
    /// </summary>
    public void CollectReferencedTypes(HashSet<string> allTypeNames, HashSet<string> result)
    {
        result.Clear();

        if (!string.IsNullOrEmpty(Base))
        {
            var baseName = IApiIndex.NormalizeTypeName(Base);
            if (allTypeNames.Contains(baseName))
                result.Add(baseName);
        }

        foreach (var iface in Interfaces ?? [])
        {
            var ifaceName = IApiIndex.NormalizeTypeName(iface);
            if (allTypeNames.Contains(ifaceName))
                result.Add(ifaceName);
        }

        foreach (var member in Members ?? [])
        {
            SignatureTokenizer.TokenizeInto(member.Signature, result);
        }

        result.IntersectWith(allTypeNames);
    }
}

public record MemberInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("kind")]
    public string Kind { get; init; } = ""; // ctor, method, property, field, event, indexer

    [JsonPropertyName("sig")]
    public string Signature { get; init; } = ""; // Compressed signature

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ParameterInfo>? Params { get; init; }

    [JsonPropertyName("results")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ResultInfo>? Results { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("static")]
    public bool? IsStatic { get; init; }

    [JsonPropertyName("async")]
    public bool? IsAsync { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

public sealed record ParameterInfo
{
    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("type")]
    public required string Type { get; init; }

    [JsonPropertyName("default")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Default { get; init; }

    [JsonPropertyName("modifier")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Modifier { get; init; }
}

public sealed record ResultInfo
{
    [JsonPropertyName("name")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Name { get; init; }

    [JsonPropertyName("type")]
    public required string Type { get; init; }
}

[JsonSerializable(typeof(ApiIndex))]
[JsonSourceGenerationOptions(
    WriteIndented = false,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
internal sealed partial class JsonContext : JsonSerializerContext
{
    private static readonly Lazy<JsonContext> _indented = new(
        () => new JsonContext(
            new JsonSerializerOptions(Default!.Options!) { WriteIndented = true }));

    /// <summary>Context configured for indented (pretty) output.</summary>
    public static JsonContext Indented => _indented.Value;
}
