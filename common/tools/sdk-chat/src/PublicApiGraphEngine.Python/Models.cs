// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Python;

// Reuse the same output models for consistency across languages
public sealed record ApiIndex(
    string Package,
    IReadOnlyList<ModuleInfo> Modules,
    IReadOnlyList<DependencyInfo>? Dependencies = null,
    string? Version = null,
    string? CrossLanguagePackageId = null,
    IReadOnlyList<ApiDiagnostic>? Diagnostics = null) : IApiIndex
{
    IReadOnlyList<ApiDiagnostic> IApiIndex.Diagnostics => Diagnostics ?? [];
    /// <summary>Gets all classes in the API.</summary>
    public IEnumerable<ClassInfo> GetAllClasses() =>
        Modules.SelectMany(m => m.Classes ?? []);

    /// <summary>Gets client classes (entry points for SDK operations).</summary>
    public IEnumerable<ClassInfo> GetClientClasses() =>
        GetAllClasses().Where(c => c.IsClientType);

    public string ToJson(bool pretty = false) => pretty
        ? JsonSerializer.Serialize(this, ApiIndexContext.Indented.ApiIndex)
        : JsonSerializer.Serialize(this, ApiIndexContext.Default.ApiIndex);

    public string ToStubs() => PythonFormatter.Format(this);

    public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() =>
        Modules.SelectMany(m => (m.Classes ?? []).Select(c => new DiagnosticTypeInfo
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
                ParameterTypes = (method.Params ?? []).Where(p => p.Type is not null).Select(p => p.Type!).ToList(),
            }).ToList(),
        }));

    public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() =>
        Modules.SelectMany(m => (m.Functions ?? []).Select(f => new DiagnosticCallableInfo
        {
            Name = f.Name,
            Id = f.Id,
            ParameterTypes = (f.Params ?? []).Where(p => p.Type is not null).Select(p => p.Type!).ToList(),
        }));
}

/// <summary>Information about types from a dependency package.</summary>
public sealed record DependencyInfo
{
    /// <summary>The package name (e.g., "example-core").</summary>
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";

    /// <summary>Whether this dependency is from the Python standard library.</summary>
    [JsonPropertyName("isStdlib")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool IsStdlib { get; init; }

    /// <summary>Classes from this package that are referenced in the API.</summary>
    [JsonPropertyName("classes")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ClassInfo>? Classes { get; init; }

    /// <summary>Functions from this package that are referenced in the API.</summary>
    [JsonPropertyName("functions")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<FunctionInfo>? Functions { get; init; }
}

public sealed record ModuleInfo(string Name, IReadOnlyList<ClassInfo>? Classes, IReadOnlyList<FunctionInfo>? Functions);

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
    /// <summary>External package this type is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }
    [JsonPropertyName("base")]
    public string? Base { get; init; }

    [JsonPropertyName("typeParams")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
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

    /// <summary>Returns true if this class inherits from an exception base type.
    /// Checks the Base field structurally rather than the type's own name.</summary>
    [JsonIgnore]
    public bool IsErrorType
    {
        get
        {
            if (string.IsNullOrEmpty(Base)) return false;
            var baseName = IApiIndex.NormalizeTypeName(Base);
            // Strip module prefix if present (e.g. "builtins.Exception" → "Exception")
            if (baseName.Contains('.'))
                baseName = baseName[(baseName.LastIndexOf('.') + 1)..];
            return baseName.EndsWith("Exception", StringComparison.Ordinal)
                || baseName.EndsWith("Error", StringComparison.Ordinal)
                || baseName == "BaseException"
                || baseName == "Warning";
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

        if (!string.IsNullOrEmpty(Base))
        {
            var baseName = IApiIndex.NormalizeTypeName(Base);
            if (allTypeNames.Contains(baseName))
                result.Add(baseName);
        }

        foreach (var method in Methods ?? [])
        {
            SignatureTokenizer.TokenizeInto(method.Signature, result);
            SignatureTokenizer.TokenizeInto(method.Ret, result);
        }

        foreach (var prop in Properties ?? [])
        {
            SignatureTokenizer.TokenizeInto(prop.Type, result);
        }

        result.IntersectWith(allTypeNames);
    }
}

public sealed record MethodInfo
{
    public MethodInfo()
    {
    }

    public MethodInfo(string Name, string Signature, string? Doc, bool? IsAsync, bool? IsClassMethod, bool? IsStaticMethod, string? Ret = null)
    {
        this.Name = Name;
        this.Signature = Signature;
        this.Doc = Doc;
        this.IsAsync = IsAsync;
        this.IsClassMethod = IsClassMethod;
        this.IsStaticMethod = IsStaticMethod;
        this.Ret = Ret;
    }

    [JsonPropertyName("name")]
    public string Name { get; init; } = "";

    [JsonPropertyName("id")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Id { get; init; }

    [JsonPropertyName("crossLanguageId")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CrossLanguageId { get; init; }

    [JsonPropertyName("sig")]
    public string Signature
    {
        get => _signature ?? PythonModelHelpers.BuildSignature(Params);
        init => _signature = value;
    }

    [JsonIgnore]
    private string? _signature;

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ParameterInfo>? Params { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("async")]
    public bool? IsAsync { get; init; }

    [JsonPropertyName("classmethod")]
    public bool? IsClassMethod { get; init; }

    [JsonPropertyName("staticmethod")]
    public bool? IsStaticMethod { get; init; }

    [JsonPropertyName("ret")]
    public string? Ret { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

public sealed record PropertyInfo
{
    public PropertyInfo()
    {
    }

    public PropertyInfo(string Name, string? Type, string? Doc)
    {
        this.Name = Name;
        this.Type = Type;
        this.Doc = Doc;
    }

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

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

    [JsonPropertyName("deprecated")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsDeprecated { get; init; }

    [JsonPropertyName("deprecatedMsg")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DeprecatedMessage { get; init; }
}

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

    /// <summary>External package this function is re-exported from.</summary>
    [JsonPropertyName("reExportedFrom")]
    public string? ReExportedFrom { get; init; }

    [JsonPropertyName("sig")]
    public string Signature
    {
        get => _signature ?? PythonModelHelpers.BuildSignature(Params);
        init => _signature = value;
    }

    [JsonIgnore]
    private string? _signature;

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IReadOnlyList<ParameterInfo>? Params { get; init; }

    [JsonPropertyName("ret")]
    public string? Ret { get; init; }

    [JsonPropertyName("doc")]
    public string? Doc { get; init; }

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
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Type { get; init; }

    [JsonPropertyName("default")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Default { get; init; }

    [JsonPropertyName("kind")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Kind { get; init; }
}

internal static class PythonModelHelpers
{
    internal static string BuildSignature(IReadOnlyList<ParameterInfo>? parameters)
        => parameters is null || parameters.Count is 0
            ? ""
            : string.Join(", ",
                parameters.Select(p =>
                {
                    var prefix = p.Kind switch
                    {
                        "var_positional" => "*",
                        "var_keyword" => "**",
                        _ => ""
                    };
                    var type = !string.IsNullOrWhiteSpace(p.Type) ? $": {p.Type}" : "";
                    var def = p.Default is not null ? $" = {p.Default}" : "";
                    return $"{prefix}{p.Name}{type}{def}";
                }));
}

[JsonSourceGenerationOptions(
    WriteIndented = false,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(ApiIndex))]
public partial class ApiIndexContext : JsonSerializerContext
{
    private static readonly Lazy<ApiIndexContext> _indented = new(
        () => new ApiIndexContext(
            new JsonSerializerOptions(Default!.Options) { WriteIndented = true }));

    /// <summary>Context configured for indented (pretty) output.</summary>
    public static ApiIndexContext Indented => _indented.Value;
}

public static class ApiIndexExtensions
{
    public static string ToJson(this ApiIndex index) =>
        JsonSerializer.Serialize(index, ApiIndexContext.Default.ApiIndex);
}
