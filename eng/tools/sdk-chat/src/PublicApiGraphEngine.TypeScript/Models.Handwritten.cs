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
                    Kind = "class",
                    EntryPoint = c.EntryPoint == true,
                    IsDeprecated = c.IsDeprecated == true,
                    Callables = (c.Methods ?? []).Select(method => new DiagnosticCallableInfo
                    {
                        Name = method.Name,
                        Id = method.Id,
                        IsDeprecated = method.IsDeprecated == true,
                        ParameterTypes = (method.Params ?? []).Select(p => p.Type).ToList(),
                        OptionalParameterCount = (method.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                        ReturnType = method.Ret,
                    }).Concat((c.Constructors ?? []).Select(ctor => new DiagnosticCallableInfo
                    {
                        Name = c.Name,
                        Id = ctor.Id,
                        IsDeprecated = ctor.IsDeprecated == true,
                        ParameterTypes = (ctor.Params ?? []).Select(p => p.Type).ToList(),
                        OptionalParameterCount = (ctor.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                    })).ToList(),
                    Properties = (c.Properties ?? []).Select(p => new DiagnosticPropertyInfo
                    {
                        Name = p.Name,
                        TypeName = p.Type,
                        IsDeprecated = p.IsDeprecated == true,
                        IsOptional = p.Optional == true,
                        IsReadOnly = p.Readonly == true,
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
                    Kind = "interface",
                    EntryPoint = i.EntryPoint == true,
                    IsDeprecated = i.IsDeprecated == true,
                    Callables = (i.Methods ?? []).Select(method => new DiagnosticCallableInfo
                    {
                        Name = method.Name,
                        Id = method.Id,
                        IsDeprecated = method.IsDeprecated == true,
                        ParameterTypes = (method.Params ?? []).Select(p => p.Type).ToList(),
                        OptionalParameterCount = (method.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                        ReturnType = method.Ret,
                    }).Concat((i.CallSignatures ?? []).Select(cs =>
                    {
                        var (types, optCount) = TypeScriptModelHelpers.ParseSignatureParams(cs.Sig);
                        return new DiagnosticCallableInfo
                        {
                            Name = "[[call]]",
                            ReturnType = cs.Ret,
                            IsDeprecated = false,
                            ParameterTypes = types,
                            OptionalParameterCount = optCount,
                        };
                    })).Concat((i.ConstructSignatures ?? []).Select(cs =>
                    {
                        var (types, optCount) = TypeScriptModelHelpers.ParseSignatureParams(cs.Sig);
                        return new DiagnosticCallableInfo
                        {
                            Name = "[[new]]",
                            ReturnType = cs.Ret,
                            IsDeprecated = false,
                            ParameterTypes = types,
                            OptionalParameterCount = optCount,
                        };
                    })).ToList(),
                    Properties = (i.Properties ?? []).Select(p => new DiagnosticPropertyInfo
                    {
                        Name = p.Name,
                        TypeName = p.Type,
                        IsDeprecated = p.IsDeprecated == true,
                        IsOptional = p.Optional == true,
                        IsReadOnly = p.Readonly == true,
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
                    Kind = "enum",
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
                    Kind = "type",
                    IsDeprecated = t.IsDeprecated == true,
                    EntryPoint = t.EntryPoint == true,
                };
            }

            // Recurse into namespaces to include types declared inside them
            foreach (var ns in m.Namespaces ?? [])
            {
                foreach (var item in GetDiagnosticTypesFromNamespace(ns))
                    yield return item;
            }
        }
    }

    private static IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypesFromNamespace(NamespaceInfo ns)
    {
        foreach (var c in ns.Classes ?? [])
        {
            yield return new DiagnosticTypeInfo
            {
                Name = $"{ns.Name}.{c.Name}",
                Id = c.Id,
                Doc = c.Doc,
                Kind = "class",
                IsDeprecated = c.IsDeprecated == true,
                Callables = (c.Methods ?? []).Select(method => new DiagnosticCallableInfo
                {
                    Name = method.Name,
                    Id = method.Id,
                    IsDeprecated = method.IsDeprecated == true,
                    ParameterTypes = (method.Params ?? []).Select(p => p.Type).ToList(),
                    OptionalParameterCount = (method.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                    ReturnType = method.Ret,
                }).Concat((c.Constructors ?? []).Select(ctor => new DiagnosticCallableInfo
                {
                    Name = c.Name,
                    Id = ctor.Id,
                    IsDeprecated = ctor.IsDeprecated == true,
                    ParameterTypes = (ctor.Params ?? []).Select(p => p.Type).ToList(),
                    OptionalParameterCount = (ctor.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                })).ToList(),
                Properties = (c.Properties ?? []).Select(p => new DiagnosticPropertyInfo
                {
                    Name = p.Name,
                    TypeName = p.Type,
                    IsDeprecated = p.IsDeprecated == true,
                    IsOptional = p.Optional == true,
                    IsReadOnly = p.Readonly == true,
                }).ToList(),
            };
        }
        foreach (var i in ns.Interfaces ?? [])
        {
            yield return new DiagnosticTypeInfo
            {
                Name = $"{ns.Name}.{i.Name}",
                Id = i.Id,
                Doc = i.Doc,
                Kind = "interface",
                IsDeprecated = i.IsDeprecated == true,
                Callables = (i.Methods ?? []).Select(method => new DiagnosticCallableInfo
                {
                    Name = method.Name,
                    Id = method.Id,
                    IsDeprecated = method.IsDeprecated == true,
                    ParameterTypes = (method.Params ?? []).Select(p => p.Type).ToList(),
                    OptionalParameterCount = (method.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                    ReturnType = method.Ret,
                }).Concat((i.CallSignatures ?? []).Select(cs =>
                {
                    var (types, optCount) = TypeScriptModelHelpers.ParseSignatureParams(cs.Sig);
                    return new DiagnosticCallableInfo
                    {
                        Name = "[[call]]",
                        ReturnType = cs.Ret,
                        IsDeprecated = false,
                        ParameterTypes = types,
                        OptionalParameterCount = optCount,
                    };
                })).Concat((i.ConstructSignatures ?? []).Select(cs =>
                {
                    var (types, optCount) = TypeScriptModelHelpers.ParseSignatureParams(cs.Sig);
                    return new DiagnosticCallableInfo
                    {
                        Name = "[[new]]",
                        ReturnType = cs.Ret,
                        IsDeprecated = false,
                        ParameterTypes = types,
                        OptionalParameterCount = optCount,
                    };
                })).ToList(),
                Properties = (i.Properties ?? []).Select(p => new DiagnosticPropertyInfo
                {
                    Name = p.Name,
                    TypeName = p.Type,
                    IsDeprecated = p.IsDeprecated == true,
                    IsOptional = p.Optional == true,
                    IsReadOnly = p.Readonly == true,
                }).ToList(),
            };
        }
        foreach (var e in ns.Enums ?? [])
        {
            yield return new DiagnosticTypeInfo
            {
                Name = $"{ns.Name}.{e.Name}",
                Id = e.Id,
                Doc = e.Doc,
                Kind = "enum",
                IsDeprecated = e.IsDeprecated == true,
            };
        }
        foreach (var t in ns.Types ?? [])
        {
            yield return new DiagnosticTypeInfo
            {
                Name = $"{ns.Name}.{t.Name}",
                Id = t.Id,
                Doc = t.Doc,
                Kind = "type",
                IsDeprecated = t.IsDeprecated == true,
            };
        }
        // Recurse into sub-namespaces
        foreach (var sub in ns.Namespaces ?? [])
        {
            foreach (var item in GetDiagnosticTypesFromNamespace(sub))
            {
                yield return item with { Name = $"{ns.Name}.{item.Name}" };
            }
        }
    }

    public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() =>
        Modules.SelectMany(m => (m.Functions ?? []).Select(f => new DiagnosticCallableInfo
        {
            Name = f.Name,
            Id = f.Id,
            ParameterTypes = (f.Params ?? []).Select(p => p.Type).ToList(),
            OptionalParameterCount = (f.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
            ReturnType = f.Ret,
            IsDeprecated = f.IsDeprecated == true,
        }).Concat(GetCallablesFromNamespaces(m.Namespaces)));

    private static IEnumerable<DiagnosticCallableInfo> GetCallablesFromNamespaces(IReadOnlyList<NamespaceInfo>? namespaces)
    {
        if (namespaces is null) yield break;
        foreach (var ns in namespaces)
        {
            foreach (var f in ns.Functions ?? [])
            {
                yield return new DiagnosticCallableInfo
                {
                    Name = $"{ns.Name}.{f.Name}",
                    Id = f.Id,
                    ParameterTypes = (f.Params ?? []).Select(p => p.Type).ToList(),
                    OptionalParameterCount = (f.Params ?? []).Count(p => p.IsOptional == true || p.Default is not null),
                    ReturnType = f.Ret,
                    IsDeprecated = f.IsDeprecated == true,
                };
            }
            foreach (var item in GetCallablesFromNamespaces(ns.Namespaces))
            {
                yield return item with { Name = $"{ns.Name}.{item.Name}" };
            }
        }
    }
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

    /// <summary>
    /// Parses a signature string (e.g. "x: string, y?: number") produced by
    /// <c>formatParameter</c> in the TypeScript extractor, returning the list
    /// of parameter type strings and the count of optional parameters.
    /// Handles nested angle brackets, parentheses, and square brackets so that
    /// commas inside generic types are not treated as parameter separators.
    /// </summary>
    internal static (List<string> Types, int OptionalCount) ParseSignatureParams(string sig)
    {
        if (string.IsNullOrWhiteSpace(sig))
            return ([], 0);

        var types = new List<string>();
        int optionalCount = 0;

        // Split by top-level commas (respecting <>, (), [], {})
        var parts = SplitTopLevelParams(sig);

        foreach (var part in parts)
        {
            var trimmed = part.Trim();
            if (trimmed.Length == 0)
                continue;

            // Strip leading "..." for rest params
            if (trimmed.StartsWith("..."))
                trimmed = trimmed[3..];

            // Format: name?: Type  or  name: Type  or  name?: Type = default
            // Find the first top-level ": " — the colon separating name from type.
            int colonIndex = FindNameTypeSeparator(trimmed);
            bool isOptional = false;

            if (colonIndex >= 0)
            {
                // Check if the character before ':' is '?' (optional marker)
                if (colonIndex > 0 && trimmed[colonIndex - 1] == '?')
                    isOptional = true;

                // Type starts after ": "
                string typeStr = trimmed[(colonIndex + 1)..].Trim();

                // Strip " = default" suffix if present
                int eqIndex = FindTopLevelEquals(typeStr);
                if (eqIndex >= 0)
                {
                    typeStr = typeStr[..eqIndex].TrimEnd();
                    isOptional = true;
                }

                types.Add(typeStr);
            }
            else
            {
                // No colon found — just use the whole thing as the type
                types.Add(trimmed);
            }

            if (isOptional)
                optionalCount++;
        }

        return (types, optionalCount);
    }

    /// <summary>Splits a signature string by top-level commas.</summary>
    private static List<string> SplitTopLevelParams(string sig)
    {
        var parts = new List<string>();
        int depth = 0;
        int start = 0;
        char inString = '\0'; // '\0' = not in string; otherwise '\'', '"', or '`'
        int templateBraceDepth = 0; // tracks ${...} nesting inside backtick strings
        bool inDefaultExpr = false; // inside a default value expression (after top-level '=')

        for (int i = 0; i < sig.Length; i++)
        {
            char c = sig[i];

            // Handle escape sequences inside strings
            if (inString != '\0' && c == '\\')
            {
                i++; // skip the escaped character
                continue;
            }

            if (inString != '\0')
            {
                if (inString == '`')
                {
                    // Inside a backtick string: handle ${...} template expressions
                    if (c == '$' && i + 1 < sig.Length && sig[i + 1] == '{')
                    {
                        templateBraceDepth++;
                        i++; // skip the '{'
                        continue;
                    }

                    if (templateBraceDepth > 0)
                    {
                        if (c == '{') templateBraceDepth++;
                        else if (c == '}') templateBraceDepth--;
                        continue;
                    }

                    if (c == '`')
                        inString = '\0';
                }
                else
                {
                    // Inside single or double quote
                    if (c == inString)
                        inString = '\0';
                }
                continue;
            }

            // Not inside a string
            if (c is '\'' or '"' or '`')
            {
                inString = c;
            }
            else if (c == '=' && i + 1 < sig.Length && sig[i + 1] == '>')
            {
                i++; // skip the '>' of '=>' to avoid depth--
            }
            else if (c == '=' && depth == 0 && !inDefaultExpr)
            {
                // Top-level '=' that is not '=>' — entering a default value expression
                // where '<' and '>' are comparison operators, not generic brackets.
                inDefaultExpr = true;
            }
            else if (inDefaultExpr && c is '<' or '>')
            {
                // Inside a default value expression, skip angle bracket depth tracking
                // because '<' and '>' are likely comparison operators, not generics.
            }
            else if (c is '<' or '(' or '[' or '{') depth++;
            else if (c is '>' or ')' or ']' or '}') depth--;
            else if (c == ',' && depth == 0)
            {
                parts.Add(sig[start..i]);
                start = i + 1;
                inDefaultExpr = false;
            }
        }

        parts.Add(sig[start..]);
        return parts;
    }

    /// <summary>
    /// Finds the index of the first top-level occurrence of <paramref name="target"/>
    /// that is not inside nested brackets or string literals (single, double, or backtick).
    /// When <paramref name="skipArrow"/> is true, '=' followed by '>' is ignored.
    /// </summary>
    private static int FindTopLevelChar(string text, char target, bool skipArrow = false)
    {
        int depth = 0;
        char inString = '\0';
        int templateBraceDepth = 0;
        // When searching for ',' (parameter splitting), track default value expressions
        // where '<' and '>' are comparison operators, not generic brackets.
        bool inDefaultExpr = false;
        bool trackDefaults = target == ',';

        for (int i = 0; i < text.Length; i++)
        {
            char c = text[i];

            // Handle escape sequences inside strings
            if (inString != '\0' && c == '\\')
            {
                i++; // skip the escaped character
                continue;
            }

            if (inString != '\0')
            {
                if (inString == '`')
                {
                    if (c == '$' && i + 1 < text.Length && text[i + 1] == '{')
                    {
                        templateBraceDepth++;
                        i++;
                        continue;
                    }

                    if (templateBraceDepth > 0)
                    {
                        if (c == '{') templateBraceDepth++;
                        else if (c == '}') templateBraceDepth--;
                        continue;
                    }

                    if (c == '`')
                        inString = '\0';
                }
                else
                {
                    if (c == inString)
                        inString = '\0';
                }
                continue;
            }

            // Not inside a string
            if (c is '\'' or '"' or '`')
            {
                inString = c;
            }
            // Handle => arrow tokens — skip both characters to prevent
            // the > from being treated as a bracket close
            else if (c == '=' && i + 1 < text.Length && text[i + 1] == '>')
            {
                i++; // skip '>'
                continue;
            }
            else if (trackDefaults && c == '=' && depth == 0 && !inDefaultExpr)
            {
                inDefaultExpr = true;
            }
            else if (inDefaultExpr && c is '<' or '>')
            {
                // Inside a default value expression, skip angle bracket depth tracking
            }
            else if (c is '<' or '(' or '[' or '{') depth++;
            else if (c is '>' or ')' or ']' or '}') depth--;
            else if (c == target && depth == 0)
            {
                if (trackDefaults)
                    inDefaultExpr = false;
                return i;
            }
        }
        return -1;
    }

    /// <summary>
    /// Finds the index of the first top-level ':' that separates the parameter
    /// name from its type annotation. Skips colons inside nested brackets and strings.
    /// </summary>
    private static int FindNameTypeSeparator(string param) =>
        FindTopLevelChar(param, ':');

    /// <summary>
    /// Finds the index of a top-level '=' in a type string (for default values).
    /// Skips '=' inside nested brackets, strings, and '=>' arrow tokens.
    /// </summary>
    private static int FindTopLevelEquals(string typeStr) =>
        FindTopLevelChar(typeStr, '=', skipArrow: true);
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
