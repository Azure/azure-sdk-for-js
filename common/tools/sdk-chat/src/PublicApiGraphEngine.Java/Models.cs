// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Java;

/// <summary>Root container for graphed Java API.</summary>
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
    public IReadOnlyList<PackageInfo> Packages { get; init; } = [];

    /// <summary>Types from external dependencies that are referenced in the public API.</summary>
    [JsonPropertyName("dependencies")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<DependencyInfo>? Dependencies { get; init; }

    [JsonPropertyName("diagnostics")]
    public IReadOnlyList<ApiDiagnostic> Diagnostics { get; init; } = [];

    /// <summary>Gets all types (classes + interfaces + annotations) in the API.</summary>
    public IEnumerable<ClassInfo> GetAllTypes() =>
        Packages.SelectMany(p => (p.Classes ?? []).Concat(p.Interfaces ?? []).Concat(p.Annotations ?? []));

    /// <summary>Gets client classes (entry points for SDK operations).</summary>
    public IEnumerable<ClassInfo> GetClientClasses() =>
        GetAllTypes().Where(c => c.IsClientType);

    public string ToJson(bool pretty = false) => pretty
        ? JsonSerializer.Serialize(this, SourceGenerationContext.Indented.ApiIndex)
        : JsonSerializer.Serialize(this, SourceGenerationContext.Default.ApiIndex);

    public string ToStubs() => JavaFormatter.Format(this);

    public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes()
    {
        foreach (var pkg in Packages)
        {
            foreach (var c in (pkg.Classes ?? []).Concat(pkg.Interfaces ?? []).Concat(pkg.Annotations ?? []))
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = c.Name,
                    Id = c.Id,
                    Doc = c.Doc,
                    EntryPoint = c.EntryPoint == true,
                    IsDeprecated = c.IsDeprecated == true,
                    Callables = (c.Methods ?? []).Concat(c.Constructors ?? [])
                        .Select(m => new DiagnosticCallableInfo
                        {
                            Name = m.Name ?? c.Name,
                            Id = m.Id,
                            ParameterTypes = (m.Params ?? []).Select(p => p.Type).ToList(),
                        }).ToList(),
                };
            }

            foreach (var e in pkg.Enums ?? [])
            {
                yield return new DiagnosticTypeInfo
                {
                    Name = e.Name,
                    Id = e.Id,
                    Doc = e.Doc,
                    IsDeprecated = e.IsDeprecated == true,
                    Callables = (e.Methods ?? []).Select(m => new DiagnosticCallableInfo
                    {
                        Name = m.Name ?? e.Name,
                        Id = m.Id,
                        ParameterTypes = (m.Params ?? []).Select(p => p.Type).ToList(),
                    }).ToList(),
                };
            }
        }
    }

    public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => [];
}

/// <summary>Information about types from a dependency package.</summary>
public sealed record DependencyInfo
{
    /// <summary>The package/group ID (e.g., "com.example:example-core").</summary>
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    /// <summary>Whether this dependency is from the Java standard library.</summary>
    [JsonPropertyName("isStdlib")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool IsStdlib { get; init; }

    /// <summary>Classes from this dependency that are referenced in the API.</summary>
    [JsonPropertyName("classes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ClassInfo>? Classes { get; init; }

    /// <summary>Interfaces from this dependency that are referenced in the API.</summary>
    [JsonPropertyName("interfaces")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ClassInfo>? Interfaces { get; init; }

    /// <summary>Types from this dependency that could not be classified as class/interface from source alone.</summary>
    [JsonPropertyName("types")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ClassInfo>? Types { get; init; }
}

/// <summary>A Java package containing types.</summary>
public sealed record PackageInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("classes")]
    public IReadOnlyList<ClassInfo>? Classes { get; init; }

    [JsonPropertyName("interfaces")]
    public IReadOnlyList<ClassInfo>? Interfaces { get; init; }

    [JsonPropertyName("enums")]
    public IReadOnlyList<EnumInfo>? Enums { get; init; }

    [JsonPropertyName("annotations")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ClassInfo>? Annotations { get; init; }
}

/// <summary>A class, interface, record, or annotation type.</summary>
public sealed record ClassInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    /// <summary>The kind of type: "class", "record", or "annotation". Null for classes/interfaces.</summary>
    [JsonPropertyName("kind")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Kind { get; init; }

    [JsonPropertyName("entryPoint")]
    public bool? EntryPoint { get; init; }

    /// <summary>External package this type is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("extends")]
    public string? Extends { get; init; }

    [JsonPropertyName("implements")]
    public IReadOnlyList<string>? Implements { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    [JsonPropertyName("modifiers")]
    public IReadOnlyList<string>? Modifiers { get; init; }

    [JsonPropertyName("typeParams")]
    public string? TypeParams { get; init; }

    [JsonPropertyName("constructors")]
    public IReadOnlyList<MethodInfo>? Constructors { get; init; }

    [JsonPropertyName("methods")]
    public IReadOnlyList<MethodInfo>? Methods { get; init; }

    [JsonPropertyName("fields")]
    public IReadOnlyList<FieldInfo>? Fields { get; init; }

    /// <summary>Returns true if this is a client class (SDK entry point with operations).
    /// A client type must be an entry point AND have methods.</summary>
    [JsonIgnore]
    public bool IsClientType =>
        EntryPoint == true &&
        (Methods?.Any() ?? false);

    /// <summary>Returns true if this is a model/DTO class.
    /// A model type has no public methods and has fields.
    /// An empty class (no methods + no fields) or a type with unknown methods
    /// (Methods is null) and no fields is a marker type, not a model.</summary>
    [JsonIgnore]
    public bool IsModelType
    {
        get
        {
            var hasPublicMethods = Methods?.Any(m => m.Modifiers?.Contains("public") == true) ?? false;

            if (!hasPublicMethods)
            {
                return Fields?.Count > 0;
            }

            return false;
        }
    }

    /// <summary>Returns true if this type extends an exception/error base type.
    /// Checks the Extends field structurally rather than the type's own name.</summary>
    [JsonIgnore]
    public bool IsErrorType
    {
        get
        {
            if (string.IsNullOrEmpty(Extends)) return false;
            var baseName = IApiIndex.NormalizeTypeName(Extends);
            // Strip package prefix if present (e.g. "java.lang.Exception" → "Exception")
            var lastDot = baseName.LastIndexOf('.');
            if (lastDot >= 0) baseName = baseName[(lastDot + 1)..];
            return baseName.EndsWith("Exception", StringComparison.Ordinal)
                || baseName.EndsWith("Error", StringComparison.Ordinal)
                || baseName == "Throwable";
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

    /// <summary>Gets type names referenced in method signatures.</summary>
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

        if (!string.IsNullOrEmpty(Extends))
        {
            var baseName = IApiIndex.NormalizeTypeName(Extends);
            if (allTypeNames.Contains(baseName))
                result.Add(baseName);
        }

        foreach (var iface in Implements ?? [])
        {
            var ifaceName = IApiIndex.NormalizeTypeName(iface);
            if (allTypeNames.Contains(ifaceName))
                result.Add(ifaceName);
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

/// <summary>An enum type.</summary>
public sealed record EnumInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("values")]
    public IReadOnlyList<string>? Values { get; init; }

    [JsonPropertyName("methods")]
    public IReadOnlyList<MethodInfo>? Methods { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A method or constructor.</summary>
public sealed record MethodInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? JavaModelHelpers.BuildSignature(Params);
        init => _sig = value;
    }

    [JsonIgnore]
    private string? _sig;

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ParameterInfo>? Params { get; init; }

    [JsonPropertyName("ret")]
    public string? Ret { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("modifiers")]
    public IReadOnlyList<string>? Modifiers { get; init; }

    [JsonPropertyName("typeParams")]
    public string? TypeParams { get; init; }

    [JsonPropertyName("throws")]
    public IReadOnlyList<string>? Throws { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A field or constant.</summary>
public sealed record FieldInfo
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

    [JsonPropertyName("modifiers")]
    public IReadOnlyList<string>? Modifiers { get; init; }

    [JsonPropertyName("value")]
    public string? Value { get; init; }

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

    [JsonPropertyName("varargs")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsVarArgs { get; init; }
}

internal static class JavaModelHelpers
{
    internal static string BuildSignature(IReadOnlyList<ParameterInfo>? parameters)
        => parameters is null || parameters.Count is 0
            ? ""
            : string.Join(", ", parameters.Select(p => $"{p.Type}{(p.IsVarArgs == true ? "..." : "")} {p.Name}"));
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
