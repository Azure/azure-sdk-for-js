// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Go;

/// <summary>Root container for graphed Go API.</summary>
public sealed record ApiIndex : IApiIndex
{
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    [JsonPropertyName("version")]
    public string? Version { get; init; }

    [JsonPropertyName("crossLanguagePackageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguagePackageId { get; init; }

    [JsonPropertyName("packages")]
    public IReadOnlyList<PackageApi> Packages { get; init; } = [];

    /// <summary>Types from external dependencies that are referenced in the public API.</summary>
    [JsonPropertyName("dependencies")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<DependencyInfo>? Dependencies { get; init; }

    [JsonPropertyName("diagnostics")]
    public IReadOnlyList<ApiDiagnostic> Diagnostics { get; init; } = [];

    /// <summary>Gets all structs in the API.</summary>
    public IEnumerable<StructApi> GetAllStructs() =>
        Packages.SelectMany(p => p.Structs ?? []);

    /// <summary>Gets client structs (entry points for SDK operations).</summary>
    public IEnumerable<StructApi> GetClientStructs() =>
        GetAllStructs().Where(s => s.IsClientType);

    public string ToJson(bool pretty = false) => pretty
        ? JsonSerializer.Serialize(this, SourceGenerationContext.Indented.ApiIndex)
        : JsonSerializer.Serialize(this, SourceGenerationContext.Default.ApiIndex);

    public string ToStubs() => GoFormatter.Format(this);

    public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes()
    {
        foreach (var pkg in Packages)
        {
            foreach (var s in pkg.Structs ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = s.Name,
                    Id = s.Id,
                    Doc = s.Doc,
                    EntryPoint = s.EntryPoint == true,
                    IsDeprecated = s.IsDeprecated == true,
                    Callables = (s.Methods ?? []).Select(m => new DiagnosticCallableInfo
                    {
                        Name = m.Name,
                        Id = m.Id,
                        ParameterTypes = (m.Params ?? []).Select(p => p.Type).ToList(),
                    }).ToList(),
                };
            }

            foreach (var i in pkg.Interfaces ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = i.Name,
                    Id = i.Id,
                    Doc = i.Doc,
                    EntryPoint = i.EntryPoint == true,
                    IsDeprecated = i.IsDeprecated == true,
                    Callables = (i.Methods ?? []).Select(m => new DiagnosticCallableInfo
                    {
                        Name = m.Name,
                        Id = m.Id,
                        ParameterTypes = (m.Params ?? []).Select(p => p.Type).ToList(),
                    }).ToList(),
                };
            }

            foreach (var t in pkg.Types ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = t.Name,
                    Id = t.Id,
                    Doc = t.Doc,
                    IsDeprecated = t.IsDeprecated == true,
                };
            }
        }
    }

    public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() =>
        Packages.SelectMany(p => (p.Functions ?? []).Select(f => new DiagnosticCallableInfo
        {
            Name = f.Name,
            Id = f.Id,
            ParameterTypes = (f.Params ?? []).Select(p2 => p2.Type).ToList(),
        }));
}

/// <summary>Information about types from a dependency module.</summary>
public sealed record DependencyInfo
{
    /// <summary>The module path (e.g., "github.com/example/sdk-for-go/sdk/core").</summary>
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    /// <summary>Whether this dependency is from the language standard library.</summary>
    [JsonPropertyName("isStdlib")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool IsStdlib { get; init; }

    /// <summary>Structs from this module that are referenced in the API.</summary>
    [JsonPropertyName("structs")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<StructApi>? Structs { get; init; }

    /// <summary>Interfaces from this module that are referenced in the API.</summary>
    [JsonPropertyName("interfaces")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<IfaceApi>? Interfaces { get; init; }

    /// <summary>Type aliases from this module that are referenced in the API.</summary>
    [JsonPropertyName("types")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<TypeApi>? Types { get; init; }
}

/// <summary>A Go package.</summary>
public sealed record PackageApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("structs")]
    public IReadOnlyList<StructApi>? Structs { get; init; }

    [JsonPropertyName("interfaces")]
    public IReadOnlyList<IfaceApi>? Interfaces { get; init; }

    [JsonPropertyName("functions")]
    public IReadOnlyList<FuncApi>? Functions { get; init; }

    [JsonPropertyName("types")]
    public IReadOnlyList<TypeApi>? Types { get; init; }

    [JsonPropertyName("constants")]
    public IReadOnlyList<ConstApi>? Constants { get; init; }

    [JsonPropertyName("variables")]
    public IReadOnlyList<VarApi>? Variables { get; init; }
}

/// <summary>A struct type.</summary>
public sealed record StructApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("entryPoint")]
    public bool? EntryPoint { get; init; }
    /// <summary>External module this type is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }
    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    /// <summary>Type parameters for generic structs (Go 1.18+).</summary>
    [JsonPropertyName("typeParams")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? TypeParams { get; init; }

    /// <summary>Embedded struct/interface names (Go composition pattern).</summary>
    [JsonPropertyName("embeds")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? Embeds { get; init; }

    [JsonPropertyName("fields")]
    public IReadOnlyList<FieldApi>? Fields { get; init; }

    [JsonPropertyName("methods")]
    public IReadOnlyList<FuncApi>? Methods { get; init; }

    /// <summary>Returns true if this is a client struct (SDK entry point with operations).
    /// A client type must be an entry point AND have methods.</summary>
    [JsonIgnore]
    public bool IsClientType =>
        EntryPoint == true &&
        (Methods?.Any() ?? false);

    /// <summary>Returns true if this is a model/DTO struct.</summary>
    [JsonIgnore]
    public bool IsModelType =>
        !(Methods?.Any() ?? false) && (Fields?.Any() ?? false);

    /// <summary>Returns true if this struct implements the error interface (has Error() string method).</summary>
    [JsonIgnore]
    public bool IsErrorType =>
        Methods?.Any(m => m.Name == "Error" && m.Ret == "string" && (m.Sig is null or "" or "()")) ?? false;

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

    /// <summary>Gets type names referenced in method signatures, fields, and embeds.</summary>
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

        foreach (var embed in Embeds ?? [])
        {
            var embedName = IApiIndex.NormalizeTypeName(embed).TrimStart('*');
            if (allTypeNames.Contains(embedName))
                result.Add(embedName);
        }

        foreach (var method in Methods ?? [])
        {
            SignatureTokenizer.TokenizeInto(method.Sig, result);
            SignatureTokenizer.TokenizeInto(method.Ret, result);
        }

        foreach (var field in Fields ?? [])
        {
            SignatureTokenizer.TokenizeInto(field.Type, result);
        }

        result.IntersectWith(allTypeNames);
    }
}

/// <summary>An interface type.</summary>
public sealed record IfaceApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("entryPoint")]
    public bool? EntryPoint { get; init; }
    /// <summary>External module this type is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }
    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    /// <summary>Embedded interface names (Go interface composition).</summary>
    [JsonPropertyName("embeds")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? Embeds { get; init; }

    [JsonPropertyName("methods")]
    public IReadOnlyList<FuncApi>? Methods { get; init; }

    /// <summary>Gets type names referenced in method signatures and embeds.</summary>
    public void CollectReferencedTypes(HashSet<string> allTypeNames, HashSet<string> result)
    {
        result.Clear();
        foreach (var embed in Embeds ?? [])
        {
            if (allTypeNames.Contains(embed))
                result.Add(embed);
        }
        foreach (var method in Methods ?? [])
        {
            SignatureTokenizer.TokenizeInto(method.Sig, result);
            SignatureTokenizer.TokenizeInto(method.Ret, result);
        }
        result.IntersectWith(allTypeNames);
    }
}

/// <summary>A function or method.</summary>
public sealed record FuncApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("entryPoint")]
    public bool? EntryPoint { get; init; }

    /// <summary>External module this function is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    /// <summary>Type parameters for generic functions (Go 1.18+).</summary>
    [JsonPropertyName("typeParams")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? TypeParams { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? GoModelHelpers.BuildSignature(Params);
        init => _sig = value;
    }

    [JsonIgnore]
    private string? _sig;

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ParameterInfo>? Params { get; init; }

    [JsonPropertyName("results")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ResultInfo>? Results { get; init; }

    [JsonPropertyName("ret")]
    public string? Ret { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("method")]
    public bool? IsMethod { get; init; }

    [JsonPropertyName("recv")]
    public string? Receiver { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A struct field.</summary>
public sealed record FieldApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("type")]
    public string Type { get; init; } = "";

    [JsonPropertyName("tag")]
    public string? Tag { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A type alias.</summary>
public sealed record TypeApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("type")]
    public string Type { get; init; } = "";

    /// <summary>External module this type alias references.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A constant.</summary>
public sealed record ConstApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("type")]
    public string? Type { get; init; }

    [JsonPropertyName("value")]
    public string? Value { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A variable.</summary>
public sealed record VarApi
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("type")]
    public string Type { get; init; } = "";

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

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
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Name { get; init; }

    [JsonPropertyName("type")]
    public required string Type { get; init; }

    [JsonPropertyName("variadic")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsVariadic { get; init; }
}

public sealed record ResultInfo
{
    [JsonPropertyName("name")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Name { get; init; }

    [JsonPropertyName("type")]
    public required string Type { get; init; }
}

internal static class GoModelHelpers
{
    internal static string BuildSignature(IReadOnlyList<ParameterInfo>? parameters)
        => parameters is null || parameters.Count is 0
            ? ""
            : string.Join(", ",
                parameters.Select(p =>
                {
                    var variadic = p.IsVariadic == true ? "..." : "";
                    return string.IsNullOrWhiteSpace(p.Name)
                        ? $"{variadic}{p.Type}"
                        : $"{p.Name} {variadic}{p.Type}";
                }));
}

[JsonSourceGenerationOptions(
    WriteIndented = false,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(ApiIndex))]
internal sealed partial class SourceGenerationContext : JsonSerializerContext
{
    private static readonly Lazy<SourceGenerationContext> _indented = new(
        () => new SourceGenerationContext(
            new JsonSerializerOptions(Default!.Options!) { WriteIndented = true }));

    /// <summary>Context configured for indented (pretty) output.</summary>
    public static SourceGenerationContext Indented => _indented.Value;
}
