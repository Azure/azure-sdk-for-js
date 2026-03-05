// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.TypeScript;

/// <summary>Root container for graphed TypeScript API.</summary>
public sealed record ApiIndex : IApiIndex
{
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    [JsonPropertyName("version")]
    public string? Version { get; init; }

    [JsonPropertyName("crossLanguagePackageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguagePackageId { get; init; }

    [JsonPropertyName("modules")]
    public IReadOnlyList<ModuleInfo> Modules { get; init; } = [];

    /// <summary>Types from dependency packages that appear in the public API.</summary>
    [JsonPropertyName("dependencies")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<DependencyInfo>? Dependencies { get; init; }

    /// <summary>Fully resolved dependency packages with proper modules/conditions.</summary>
    [JsonPropertyName("resolvedDependencies")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ApiIndex>? ResolvedDependencies { get; init; }

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
                    }).Concat((c.Constructors ?? []).Select(ctor => new DiagnosticCallableInfo
                    {
                        Name = c.Name,
                        Id = ctor.Id,
                        ParameterTypes = (ctor.Params ?? []).Select(p => p.Type).ToList(),
                    })).ToList(),
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
        }));
}

/// <summary>Information about types from a dependency package.</summary>
public sealed record DependencyInfo
{
    /// <summary>The npm package name.</summary>
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    /// <summary>Whether this dependency is from the Node.js runtime (@types/node).</summary>
    [JsonPropertyName("isNode")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool IsNode { get; init; }

    /// <summary>Classes from this package that are referenced in the API.</summary>
    [JsonPropertyName("classes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ClassInfo>? Classes { get; init; }

    /// <summary>Interfaces from this package that are referenced in the API.</summary>
    [JsonPropertyName("interfaces")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<InterfaceInfo>? Interfaces { get; init; }

    /// <summary>Enums from this package that are referenced in the API.</summary>
    [JsonPropertyName("enums")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<EnumInfo>? Enums { get; init; }

    /// <summary>Type aliases from this package that are referenced in the API.</summary>
    [JsonPropertyName("types")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<TypeAliasInfo>? Types { get; init; }

    /// <summary>Export conditions from the dependency's package.json (e.g. ["browser","import","require"]).</summary>
    [JsonPropertyName("conditions")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? Conditions { get; init; }
}

/// <summary>A TypeScript module/file.</summary>
public sealed record ModuleInfo
{
    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("condition")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Condition { get; init; }

    [JsonPropertyName("conditionChain")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? ConditionChain { get; init; }

    [JsonPropertyName("exportPath")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ExportPath { get; init; }

    [JsonPropertyName("classes")]
    public IReadOnlyList<ClassInfo>? Classes { get; init; }

    [JsonPropertyName("interfaces")]
    public IReadOnlyList<InterfaceInfo>? Interfaces { get; init; }

    [JsonPropertyName("enums")]
    public IReadOnlyList<EnumInfo>? Enums { get; init; }

    [JsonPropertyName("types")]
    public IReadOnlyList<TypeAliasInfo>? Types { get; init; }

    [JsonPropertyName("functions")]
    public IReadOnlyList<FunctionInfo>? Functions { get; init; }
}

/// <summary>A class declaration.</summary>
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

    [JsonPropertyName("entryPoint")]
    public bool? EntryPoint { get; init; }

    /// <summary>The subpath to import from (e.g., "." or "./client").</summary>
    [JsonPropertyName("exportPath")]
    public string? ExportPath { get; init; }

    /// <summary>External package this type is re-exported from (e.g., "@example/core-client").</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("extends")]
    public string? Extends { get; init; }

    [JsonPropertyName("implements")]
    public IReadOnlyList<string>? Implements { get; init; }

    [JsonPropertyName("typeParams")]
    public string? TypeParams { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    [JsonPropertyName("constructors")]
    public IReadOnlyList<ConstructorInfo>? Constructors { get; init; }

    [JsonPropertyName("methods")]
    public IReadOnlyList<MethodInfo>? Methods { get; init; }

    [JsonPropertyName("properties")]
    public IReadOnlyList<PropertyInfo>? Properties { get; init; }

    [JsonPropertyName("indexSignatures")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<IndexSignatureInfo>? IndexSignatures { get; init; }

    /// <summary>Type names referenced in signatures, computed by the extraction engine.</summary>
    [JsonPropertyName("referencedTypes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? ReferencedTypes { get; init; }

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

/// <summary>An index signature on a class or interface (e.g., [key: string]: unknown).</summary>
public sealed record IndexSignatureInfo
{
    [JsonPropertyName("keyName")]
    public string KeyName { get; init; } = "";

    [JsonPropertyName("keyType")]
    public string KeyType { get; init; } = "";

    [JsonPropertyName("valueType")]
    public string ValueType { get; init; } = "";

    [JsonPropertyName("readonly")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Readonly { get; init; }
}

/// <summary>An interface declaration.</summary>
public sealed record InterfaceInfo
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

    /// <summary>The subpath to import from (e.g., "." or "./client").</summary>
    [JsonPropertyName("exportPath")]
    public string? ExportPath { get; init; }

    /// <summary>External package this type is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("extends")]
    public IReadOnlyList<string>? Extends { get; init; }

    [JsonPropertyName("typeParams")]
    public string? TypeParams { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    [JsonPropertyName("methods")]
    public IReadOnlyList<MethodInfo>? Methods { get; init; }

    [JsonPropertyName("properties")]
    public IReadOnlyList<PropertyInfo>? Properties { get; init; }

    [JsonPropertyName("indexSignatures")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<IndexSignatureInfo>? IndexSignatures { get; init; }

    /// <summary>Type names referenced in signatures, computed by the extraction engine.</summary>
    [JsonPropertyName("referencedTypes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? ReferencedTypes { get; init; }

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

/// <summary>An enum declaration.</summary>
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
    /// <summary>External package this type is re-exported from.</summary>
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

    [JsonPropertyName("values")]
    public IReadOnlyList<string>? Values { get; init; }
}

/// <summary>A type alias.</summary>
public sealed record TypeAliasInfo
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

    [JsonPropertyName("typeParams")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? TypeParams { get; init; }

    /// <summary>External package this type is re-exported from.</summary>
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

    /// <summary>Type names referenced in this type alias, computed by the extraction engine.</summary>
    [JsonPropertyName("referencedTypes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? ReferencedTypes { get; init; }

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

/// <summary>A function declaration.</summary>
public sealed record FunctionInfo
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

    /// <summary>The subpath to import from (e.g., "." or "./client").</summary>
    [JsonPropertyName("exportPath")]
    public string? ExportPath { get; init; }

    /// <summary>External package this function is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("typeParams")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? TypeParams { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? TypeScriptModelHelpers.BuildSignature(Params);
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

    [JsonPropertyName("async")]
    public bool? Async { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }

    /// <summary>Type names referenced in signatures, computed by the extraction engine.</summary>
    [JsonPropertyName("referencedTypes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<string>? ReferencedTypes { get; init; }
}

/// <summary>A method declaration.</summary>
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

    [JsonPropertyName("typeParams")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? TypeParams { get; init; }

    [JsonPropertyName("sig")]
    public string Sig
    {
        get => _sig ?? TypeScriptModelHelpers.BuildSignature(Params);
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

    [JsonPropertyName("async")]
    public bool? Async { get; init; }

    [JsonPropertyName("static")]
    public bool? Static { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A property declaration.</summary>
public sealed record PropertyInfo
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

    [JsonPropertyName("readonly")]
    public bool? Readonly { get; init; }

    [JsonPropertyName("optional")]
    public bool? Optional { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

/// <summary>A constructor declaration.</summary>
public sealed record ConstructorInfo
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

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ParameterInfo>? Params { get; init; }

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

    [JsonPropertyName("optional")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsOptional { get; init; }

    [JsonPropertyName("rest")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsRest { get; init; }
}

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
