// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This file contains C#-only extensions to the generated model records.
// JSON-serializable properties are in Models.Generated.cs (auto-generated from models.ts).
// Only put computed properties, helper methods, C#-only fields, and infrastructure here.

using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.TypeScript;

// ---------------------------------------------------------------------------
// ApiIndex — C#-only fields, computed properties, helper methods
// ---------------------------------------------------------------------------
public sealed partial record ApiIndex
{
    [JsonPropertyName("crossLanguagePackageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguagePackageId { get; init; }

    [JsonPropertyName("diagnostics")]
    public IReadOnlyList<ApiDiagnostic> Diagnostics { get; init; } = [];

    /// <summary>Gets all classes in the API.</summary>
    public IEnumerable<ClassInfo> GetAllClasses() =>
        Modules.SelectMany(m => m.Classes ?? []);

    /// <summary>Gets client classes (entry points for SDK operations).</summary>
    public IEnumerable<ClassInfo> GetClientClasses() =>
        GetAllClasses().Where(c => c.IsClientType);

    public string ToJson(bool pretty = false) => pretty
        ? JsonSerializer.Serialize(this, SourceGenerationContext.Indented.ApiIndex)
        : JsonSerializer.Serialize(this, SourceGenerationContext.Default.ApiIndex);

    public string ToStubs() => TypeScriptFormatter.Format(this);

    public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes()
    {
        foreach (var m in Modules)
        {
            foreach (var c in m.Classes ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = c.Name,
                    Id = c.Id,
                    Doc = c.Doc,
                    EntryPoint = c.EntryPoint == true,
                    IsDeprecated = c.IsDeprecated == true,
                    Callables = (c.Methods ?? []).Select(method => new DiagnosticCallableInfo
                    {
                        Name = method.Name,
                        Id = method.Id,
                        ParameterTypes = (method.Params ?? []).Select(p => p.Type).ToList(),
                        OptionalParameterCount = (method.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                        ReturnType = method.Ret,
                    }).Concat((c.Constructors ?? []).Select(ctor => new DiagnosticCallableInfo
                    {
                        Name = c.Name,
                        Id = ctor.Id,
                        ParameterTypes = (ctor.Params ?? []).Select(p => p.Type).ToList(),
                        OptionalParameterCount = (ctor.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                    })).ToList(),
                    Properties = (c.Properties ?? []).Select(p => new DiagnosticPropertyInfo
                    {
                        Name = p.Name,
                        TypeName = p.Type,
                        IsDeprecated = p.IsDeprecated == true,
                    }).ToList(),
                };
            }

            foreach (var i in m.Interfaces ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = i.Name,
                    Id = i.Id,
                    Doc = i.Doc,
                    EntryPoint = i.EntryPoint == true,
                    IsDeprecated = i.IsDeprecated == true,
                    Callables = (i.Methods ?? []).Select(method => new DiagnosticCallableInfo
                    {
                        Name = method.Name,
                        Id = method.Id,
                        ParameterTypes = (method.Params ?? []).Select(p => p.Type).ToList(),
                        OptionalParameterCount = (method.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                        ReturnType = method.Ret,
                    }).ToList(),
                    Properties = (i.Properties ?? []).Select(p => new DiagnosticPropertyInfo
                    {
                        Name = p.Name,
                        TypeName = p.Type,
                        IsDeprecated = p.IsDeprecated == true,
                    }).ToList(),
                };
            }

            foreach (var e in m.Enums ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = e.Name,
                    Id = e.Id,
                    Doc = e.Doc,
                    IsDeprecated = e.IsDeprecated == true,
                    EntryPoint = e.EntryPoint == true,
                };
            }

            foreach (var t in m.Types ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = t.Name,
                    Id = t.Id,
                    Doc = t.Doc,
                    IsDeprecated = t.IsDeprecated == true,
                    EntryPoint = t.EntryPoint == true,
                };
            }
        }
    }

    public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() =>
        Modules.SelectMany(m => (m.Functions ?? []).Select(f => new DiagnosticCallableInfo
        {
            Name = f.Name,
            Id = f.Id,
            ParameterTypes = (f.Params ?? []).Select(p => p.Type).ToList(),
            ReturnType = f.Ret,
        }));
}

// ---------------------------------------------------------------------------
// ClassInfo — C#-only fields and computed properties
// ---------------------------------------------------------------------------
public sealed partial record ClassInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    /// <summary>Returns true if this is a client class (SDK entry point with operations).
    /// A client type must be an entry point AND have methods.</summary>
    [JsonIgnore]
    public bool IsClientType =>
        EntryPoint == true &&
        (Methods?.Any() ?? false);

    /// <summary>Returns true if this is a model/DTO class.</summary>
    [JsonIgnore]
    public bool IsModelType =>
        !(Methods?.Any() ?? false) && (Properties?.Any() ?? false);

    /// <summary>Returns true if this class extends an error base type.
    /// Checks the Extends field structurally rather than the type's own name.</summary>
    [JsonIgnore]
    public bool IsErrorType
    {
        get
        {
            if (string.IsNullOrEmpty(Extends)) return false;
            var baseName = IApiIndex.NormalizeTypeName(Extends);
            return baseName.EndsWith("Error", StringComparison.Ordinal)
                || baseName.EndsWith("Exception", StringComparison.Ordinal);
        }
    }

    /// <summary>Gets the priority for smart truncation. Lower = more important.</summary>
    [JsonIgnore]
    public int TruncationPriority
    {
        get
        {
            if (IsClientType) return 0;
            if (IsErrorType) return 1;
            if (IsModelType) return 2;
            return 3;
        }
    }

    /// <summary>Gets type names referenced in method signatures and properties.</summary>
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

        foreach (var r in ReferencedTypes ?? [])
        {
            if (allTypeNames.Contains(r))
                result.Add(r);
        }
    }
}

// ---------------------------------------------------------------------------
// InterfaceInfo — C#-only fields and computed properties
// ---------------------------------------------------------------------------
public sealed partial record InterfaceInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    /// <summary>
    /// Populates <paramref name="result"/> with type names referenced in extends, method signatures, and properties.
    /// Clears the set first so callers can reuse it across iterations.
    /// </summary>
    public void CollectReferencedTypes(HashSet<string> allTypeNames, HashSet<string> result)
    {
        result.Clear();

        foreach (var r in ReferencedTypes ?? [])
        {
            if (allTypeNames.Contains(r))
                result.Add(r);
        }
    }

    /// <summary>Gets type names referenced in this interface's signatures.</summary>
    public HashSet<string> GetReferencedTypes(HashSet<string> allTypeNames)
    {
        HashSet<string> tokens = [];
        CollectReferencedTypes(allTypeNames, tokens);
        return tokens;
    }
}

// ---------------------------------------------------------------------------
// EnumInfo — C#-only fields
// ---------------------------------------------------------------------------
public sealed partial record EnumInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }
}

// ---------------------------------------------------------------------------
// TypeAliasInfo — C#-only fields and computed properties
// ---------------------------------------------------------------------------
public sealed partial record TypeAliasInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    /// <summary>Gets type names referenced in this type alias definition.</summary>
    public void CollectReferencedTypes(HashSet<string> allTypeNames, HashSet<string> result)
    {
        result.Clear();

        foreach (var r in ReferencedTypes ?? [])
        {
            if (allTypeNames.Contains(r))
                result.Add(r);
        }
    }
}

// ---------------------------------------------------------------------------
// FunctionInfo — C#-only fields and handwritten Sig property
// ---------------------------------------------------------------------------
public sealed partial record FunctionInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? TypeScriptModelHelpers.BuildSignature(Params);
        init => _sig = value;
    }

    [JsonIgnore]
    private string? _sig;
}

// ---------------------------------------------------------------------------
// MethodInfo — C#-only fields and handwritten Sig property
// ---------------------------------------------------------------------------
public sealed partial record MethodInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? TypeScriptModelHelpers.BuildSignature(Params);
        init => _sig = value;
    }

    [JsonIgnore]
    private string? _sig;
}

// ---------------------------------------------------------------------------
// PropertyInfo — C#-only fields
// ---------------------------------------------------------------------------
public sealed partial record PropertyInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }
}

// ---------------------------------------------------------------------------
// ConstructorInfo — C#-only fields and handwritten Sig property
// ---------------------------------------------------------------------------
public sealed partial record ConstructorInfo
{
    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? TypeScriptModelHelpers.BuildSignature(Params);
        init => _sig = value;
    }

    [JsonIgnore]
    private string? _sig;
}

// ---------------------------------------------------------------------------
// Helpers and JSON source generation
// ---------------------------------------------------------------------------
internal static class TypeScriptModelHelpers
{
    internal static string BuildSignature(IReadOnlyList<ParameterInfo>? parameters)
        => parameters is null || parameters.Count is 0
            ? ""
            : string.Join(", ",
                parameters.Select(p =>
                {
                    var rest = p.IsRest == true ? "..." : "";
                    var optional = p.IsOptional == true ? "?" : "";
                    var def = p.Default is not null ? $" = {p.Default}" : "";
                    return $"{rest}{p.Name}{optional}: {p.Type}{def}";
                }));
}

/// <summary>
/// Provides pre-configured <see cref="JsonTypeInfo{T}"/> instances for serializing
/// the source-generated model types. Replaces the STJ source generator because Roslyn
/// source generators cannot see each other's output — our model records are generated
/// by <c>TypeScriptModelsGenerator</c>, so the STJ generator would miss their properties.
/// Uses <see cref="System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver"/>
/// (reflection-based) which sees all properties at runtime.
/// </summary>
internal sealed class SourceGenerationContext
{
    private readonly Lazy<JsonTypeInfo<ApiIndex>> _apiIndex;

    private SourceGenerationContext(bool indented = false)
    {
#pragma warning disable IL2026, IL3050 // Dev tool, not AOT-deployed
        var options = new JsonSerializerOptions
        {
            TypeInfoResolver = new DefaultJsonTypeInfoResolver(),
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            WriteIndented = indented,
        };
#pragma warning restore IL2026, IL3050
        _apiIndex = new(() => (JsonTypeInfo<ApiIndex>)options.GetTypeInfo(typeof(ApiIndex)));
    }

    /// <summary>Context configured for compact (non-indented) output.</summary>
    public static SourceGenerationContext Default { get; } = new();

    /// <summary>Context configured for indented (pretty) output.</summary>
    public static SourceGenerationContext Indented { get; } = new(indented: true);

    /// <summary>Type info for <see cref="ApiIndex"/> serialization/deserialization.</summary>
    public JsonTypeInfo<ApiIndex> ApiIndex => _apiIndex.Value;
}
