// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.Collections.Frozen;
using System.Collections.Immutable;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;
using PublicApiGraphEngine.Contracts;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PublicApiGraphEngine.DotNet;

/// <summary>
/// Graphs public API surface from C# source files using Roslyn.
/// Merges partial classes and only graphs public members.
/// </summary>
public partial class CSharpPublicApiGraphEngine : IPublicApiGraphEngine<ApiIndex>
{
    /// <summary>
    /// Maximum number of syntax trees to process per batch during semantic analysis.
    /// This limits memory consumption for very large repos (e.g., large SDKs with 10K+ files).
    /// Semantic models are released between batches to allow garbage collection.
    /// </summary>
    internal const int MaxSyntaxTreesPerBatch = 500;

    /// <summary>
    /// Cached runtime metadata references. These are the same for the lifetime of the process
    /// (same AppContext.BaseDirectory), so we load them once.
    /// </summary>
    private static readonly Lazy<IReadOnlyList<MetadataReference>> s_runtimeReferences = new(LoadRuntimeReferences);

    /// <inheritdoc />
    public string Language => "csharp";

    /// <inheritdoc />
    public bool IsAvailable() => true; // Roslyn is embedded, always available

    /// <inheritdoc />
    public string? UnavailableReason => null;

    /// <inheritdoc />
    public string ToJson(ApiIndex index, bool pretty = false)
        => pretty
            ? JsonSerializer.Serialize(index, JsonContext.Indented.ApiIndex)
            : JsonSerializer.Serialize(index, JsonContext.Default.ApiIndex);

    /// <inheritdoc />
    public string ToStubs(ApiIndex index) => CSharpFormatter.Format(index);

    /// <inheritdoc />
    async Task<EngineResult<ApiIndex>> IPublicApiGraphEngine<ApiIndex>.GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct)
    {
        try
        {
            var result = await GraphAsync(input, crossLanguageMap, ct).ConfigureAwait(false);
            return EngineResult<ApiIndex>.CreateSuccess(result, result.Diagnostics);
        }
        catch (Exception ex)
        {
            return EngineResult<ApiIndex>.CreateFailure($"{ex.Message}\n{ex.StackTrace}");
        }
    }

    public Task<ApiIndex> GraphAsync(string rootPath, CancellationToken ct = default)
        => GraphAsync(new EngineInput.SourceDirectory(rootPath), null, ct);

    public Task<ApiIndex> GraphAsync(EngineInput input, CancellationToken ct = default)
        => GraphAsync(input, null, ct);

    public async Task<ApiIndex> GraphAsync(EngineInput input, CrossLanguageMap? crossLanguageMap, CancellationToken ct = default)
    {
        string? csprojPath = input is EngineInput.DotNetProject dotNetProject ? dotNetProject.CsprojPath : null;
        var rootPath = ProcessSandbox.ValidateRootPath(csprojPath is not null
            ? (Path.GetDirectoryName(csprojPath) ?? csprojPath)
            : input.RootDirectory);
        List<ApiDiagnostic> engineInputDiagnostics = [];

        if (!string.IsNullOrWhiteSpace(csprojPath))
        {
            var compiled = await TryGraphFromCompiledArtifactsAsync(csprojPath, crossLanguageMap, engineInputDiagnostics, ct).ConfigureAwait(false);
            if (compiled is not null)
                return compiled;
        }

        var files = Directory.EnumerateFiles(rootPath, "*.cs", SearchOption.AllDirectories)
            .Where(f =>
            {
                // Filter out build output, version control, and common non-source directories.
                // ContainsSegment does boundary-aware matching (e.g. "bin" won't match "binary")
                // so this is safe against partial-name collisions.
                var relativePath = Path.GetRelativePath(rootPath, f);
                return !ContainsSegment(relativePath, "obj")
                    && !ContainsSegment(relativePath, "bin")
                    && !ContainsSegment(relativePath, ".git")
                    && !ContainsSegment(relativePath, ".vs")
                    && !ContainsSegment(relativePath, "node_modules");
            })
            .ToList();

        var typeMap = new ConcurrentDictionary<string, MergedType>();

        // Resolve entry point namespaces from project configuration
        var entryPointNamespaces = ResolveEntryPointNamespaces(rootPath);

        // Parse all files into syntax trees (parallel)
        var syntaxTrees = new ConcurrentBag<SyntaxTree>();

        await Parallel.ForEachAsync(
            files,
            new ParallelOptions
            {
                MaxDegreeOfParallelism = Math.Min(Environment.ProcessorCount, 8),
                CancellationToken = ct
            },
            async (file, token) =>
            {
                var code = await File.ReadAllTextAsync(file, token).ConfigureAwait(false);
                var tree = CSharpSyntaxTree.ParseText(code, path: file, cancellationToken: token);
                syntaxTrees.Add(tree);

                var root = await tree.GetRootAsync(token).ConfigureAwait(false);
                ExtractFromRoot(root, typeMap, entryPointNamespaces);
            }).ConfigureAwait(false);

        // Post-process: classify base types using locally-parsed type information
        // instead of relying on naming conventions.
        ClassifyBaseTypes(typeMap);

        var packageName = DetectPackageName(rootPath);

        // Create compilation for semantic analysis
        var treeList = syntaxTrees.ToList();
        var compilation = CreateCompilation(rootPath, treeList);

        // Single pass: resolve external dependencies AND mark error types (System.Exception subtypes).
        // Merges two full Roslyn tree traversals into one, halving syntax-tree walking cost.
        var dependencies = ResolveTransitiveDependenciesAndMarkErrors(typeMap, compilation, treeList, ct);

        // Group types by namespace using a dictionary (avoids LINQ GroupBy allocations)
        // Note: must happen after the merged pass so ToTypeInfo() reflects IsError
        var nsByName = new Dictionary<string, List<TypeInfo>>();
        foreach (var mt in typeMap.Values)
        {
            var ns = mt.Namespace;
            if (!nsByName.TryGetValue(ns, out var list))
            {
                list = [];
                nsByName[ns] = list;
            }
            list.Add(mt.ToTypeInfo());
        }

        // Sort in-place instead of LINQ OrderBy (avoids extra array allocation)
        var sortedKeys = nsByName.Keys.ToList();
        sortedKeys.Sort(StringComparer.Ordinal);
        List<NamespaceInfo> namespaces = [];
        foreach (var key in sortedKeys)
        {
            var types = nsByName[key];
            types.Sort((a, b) => string.Compare(a.Name, b.Name, StringComparison.Ordinal));
            namespaces.Add(new NamespaceInfo { Name = key, Types = types });
        }

        var apiIndex = new ApiIndex { Package = packageName, Namespaces = namespaces, Dependencies = dependencies };
        if (crossLanguageMap is not null)
        {
            apiIndex = ApplyCrossLanguageIds(apiIndex, crossLanguageMap);
        }

        var diagnostics = ApiDiagnosticsPostProcessor.Build(apiIndex, engineInputDiagnostics);
        return apiIndex with { Diagnostics = diagnostics };
    }

    // Transitive dependency resolution and error marking logic is in CSharpPublicApiGraphEngine.Dependencies.cs

    // Entry point detection logic is in CSharpPublicApiGraphEngine.EntryPoints.cs

    /// <summary>
    /// Thread-safe container for merging partial type definitions during parallel engine run.
    /// </summary>
    private sealed class MergedType
    {
        private readonly Lock _lock = new();

        public string Namespace { get; set; } = "";
        public string Name { get; set; } = "";
        public volatile string Kind = "";
        public volatile string? Base;
        public ConcurrentDictionary<string, byte> Interfaces { get; } = new(); // Using dict as concurrent hashset
        public volatile string? Doc;
        public ConcurrentDictionary<string, MemberInfo> Members { get; } = new(); // Key = signature for dedup
        private volatile List<string>? _values;
        public volatile bool IsEntryPoint;
        public volatile bool IsError;
        public volatile bool IsDeprecated;
        public volatile string? DeprecatedMessage;
        public ConcurrentBag<string> RawBaseTypes { get; } = [];

        public void AddInterface(string iface) => Interfaces.TryAdd(iface, 0);

        public void SetKindIfEmpty(string kind)
        {
            if (string.IsNullOrEmpty(Kind))
            {
                lock (_lock) { if (string.IsNullOrEmpty(Kind)) Kind = kind; }
            }
        }

        public void SetBaseIfNull(string @base)
        {
            if (Base == null)
            {
                lock (_lock) { Base ??= @base; }
            }
        }

        public void SetDocIfNull(string? doc)
        {
            if (Doc == null && doc != null)
            {
                lock (_lock) { Doc ??= doc; }
            }
        }

        public void SetValuesIfNull(List<string> values)
        {
            if (_values == null)
            {
                lock (_lock) { _values ??= values; }
            }
        }

        /// <summary>
        /// Produces an immutable snapshot. Called after Parallel.ForEachAsync completes,
        /// so all writes are sequenced before this read — no lock needed.
        /// </summary>
        public TypeInfo ToTypeInfo() => new()
        {
            Name = Name,
            Id = BuildTypeId(Namespace, Name),
            Kind = Kind,
            Base = Base,
            Interfaces = !Interfaces.IsEmpty ? Interfaces.Keys.OrderBy(i => i).ToList() : null,
            Doc = Doc,
            Members = !Members.IsEmpty ? Members.Values.ToList() : null,
            Values = _values,
            EntryPoint = IsEntryPoint ? true : null,
            IsError = IsError ? true : null,
            IsDeprecated = IsDeprecated ? true : null,
            DeprecatedMessage = DeprecatedMessage
        };
    }

    private void ExtractFromRoot(SyntaxNode root, ConcurrentDictionary<string, MergedType> typeMap, FrozenSet<string> entryPointNamespaces)
    {
        var fileScopedNs = root.DescendantNodes().OfType<FileScopedNamespaceDeclarationSyntax>().FirstOrDefault();
        if (fileScopedNs != null)
        {
            var nsName = fileScopedNs.Name.ToString();
            var isEntryPointNs = IsEntryPointNamespace(nsName, entryPointNamespaces);
            ExtractTypes(fileScopedNs, nsName, typeMap, isEntryPointNs);
            return;
        }

        foreach (var ns in root.DescendantNodes().OfType<NamespaceDeclarationSyntax>())
        {
            var nsName = ns.Name.ToString();
            var isEntryPointNs = IsEntryPointNamespace(nsName, entryPointNamespaces);
            ExtractTypes(ns, nsName, typeMap, isEntryPointNs);
        }

        foreach (var type in root.ChildNodes().OfType<TypeDeclarationSyntax>().Where(IsPublic))
            MergeType("", type, typeMap, false);
    }

    private void ExtractTypes(SyntaxNode container, string nsName, ConcurrentDictionary<string, MergedType> typeMap, bool isEntryPointNamespace)
    {
        foreach (var type in container.ChildNodes().OfType<BaseTypeDeclarationSyntax>().Where(IsPublic))
        {
            MergeType(nsName, type, typeMap, isEntryPointNamespace);

            // Recurse into nested types (e.g., ClientOptions.ServiceVersion enums,
            if (type is TypeDeclarationSyntax tds)
                ExtractTypes(tds, nsName, typeMap, isEntryPointNamespace);
        }

        // Delegate declarations inherit from MemberDeclarationSyntax, not BaseTypeDeclarationSyntax,
        // so they require a separate pass to avoid silently dropping public delegates from the API surface.
        foreach (var del in container.ChildNodes().OfType<DelegateDeclarationSyntax>().Where(d => d.Modifiers.Any(SyntaxKind.PublicKeyword)))
            MergeDelegate(nsName, del, typeMap, isEntryPointNamespace);
    }

    private void MergeType(string ns, BaseTypeDeclarationSyntax type, ConcurrentDictionary<string, MergedType> typeMap, bool isEntryPointNamespace)
    {
        var name = GetTypeName(type);
        var key = $"{ns}.{name}";

        var merged = typeMap.GetOrAdd(key, _ => new MergedType { Namespace = ns, Name = name });

        // Update kind (first non-empty wins) - thread-safe
        merged.SetKindIfEmpty(GetTypeKind(type));

        // Mark as entry point if in entry point namespace
        if (isEntryPointNamespace)
        {
            merged.IsEntryPoint = true;
        }

        // Merge base types - thread-safe
        if (type is TypeDeclarationSyntax tds && tds.BaseList != null)
        {
            foreach (var baseType in tds.BaseList.Types)
                merged.RawBaseTypes.Add(baseType.ToString());
        }

        // Take first doc - thread-safe
        merged.SetDocIfNull(GetXmlDoc(type));
        var (typeDeprecated, typeDeprecatedMessage) = GetDeprecationInfo(type.AttributeLists);
        if (typeDeprecated)
        {
            merged.IsDeprecated = true;
            merged.DeprecatedMessage ??= typeDeprecatedMessage;
        }

        if (type is EnumDeclarationSyntax e)
        {
            merged.SetValuesIfNull(e.Members.Select(m => m.Identifier.Text).ToList());
        }
        else if (type is TypeDeclarationSyntax typeSyntax)
        {
            foreach (var member in typeSyntax.Members.Where(IsPublicMember))
            {
                // Const field declarations may contain multiple variables
                // (e.g., public const int A = 1, B = 2). Unroll them into
                // separate MemberInfo entries so none are silently dropped.
                if (member is FieldDeclarationSyntax f && f.Modifiers.Any(SyntaxKind.ConstKeyword))
                {
                    foreach (var v in f.Declaration.Variables)
                    {
                        var (memberDeprecated, memberDeprecatedMessage) = GetDeprecationInfo(f.AttributeLists);
                        var constInfo = new MemberInfo
                        {
                            Name = v.Identifier.Text,
                            Kind = "const",
                            Signature = $"const {Simplify(f.Declaration.Type)} {v.Identifier.Text}" +
                                (v.Initializer != null && v.Initializer.Value.ToString().Length < 30 ? $" = {v.Initializer.Value}" : ""),
                            Doc = GetXmlDoc(f),
                            Id = BuildMemberId(ns, name, v.Identifier.Text),
                            IsDeprecated = memberDeprecated ? true : null,
                            DeprecatedMessage = memberDeprecatedMessage
                        };
                        merged.Members.TryAdd(constInfo.Signature, constInfo);
                    }
                    continue;
                }

                var info = ExtractMember(member);
                if (info != null)
                    merged.Members.TryAdd(info.Signature, info with { Id = BuildMemberId(ns, name, info.Name) });
            }
        }
    }

    /// <summary>
    /// Merges a delegate declaration into the type map.
    /// Delegates are modeled as a type with kind="delegate" and a single "Invoke" member
    /// whose signature captures the delegate's return type and parameter list.
    /// </summary>
    private void MergeDelegate(string ns, DelegateDeclarationSyntax del, ConcurrentDictionary<string, MergedType> typeMap, bool isEntryPointNamespace)
    {
        var name = del.Identifier.Text;
        if (del.TypeParameterList != null)
            name += $"<{string.Join(",", del.TypeParameterList.Parameters.Select(p => p.Identifier.Text))}>";

        var key = $"{ns}.{name}";
        var merged = typeMap.GetOrAdd(key, _ => new MergedType { Namespace = ns, Name = name });

        merged.SetKindIfEmpty("delegate");

        if (isEntryPointNamespace)
        {
            merged.IsEntryPoint = true;
        }

        merged.SetDocIfNull(GetXmlDoc(del));
        var (delegateDeprecated, delegateDeprecatedMessage) = GetDeprecationInfo(del.AttributeLists);
        if (delegateDeprecated)
        {
            merged.IsDeprecated = true;
            merged.DeprecatedMessage ??= delegateDeprecatedMessage;
        }

        var signature = $"{Simplify(del.ReturnType)} {del.Identifier.Text}({FormatParams(del.ParameterList)})";
        merged.Members.TryAdd(signature, new MemberInfo
        {
            Name = "Invoke",
            Kind = "method",
            Signature = signature,
            Doc = GetXmlDoc(del),
            Params = GetParameters(del.ParameterList),
            Results = GetResults(del.ReturnType),
            Id = BuildMemberId(ns, name, "Invoke")
        });
    }

    /// <summary>
    /// Classifies raw base type names collected during parsing into interfaces vs base classes.
    /// Uses locally-parsed type information (from typeMap) for definitive classification.
    /// For the declaring type's own kind:
    ///   - If the type is an interface, all base types are interfaces (C# language rule).
    ///   - If the type is a class/struct, check each base type against known local types.
    ///   - For external types not in our source tree, use the C# naming convention
    ///     (interface names start with 'I' + uppercase, enforced by CA1715).
    /// </summary>
    private static void ClassifyBaseTypes(ConcurrentDictionary<string, MergedType> typeMap)
    {
        // Build lookup: simple type name → kind from all locally-parsed types.
        // This gives us definitive classification for any type defined in the source tree.
        var knownKinds = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var mt in typeMap.Values)
        {
            var simpleName = StripGenericParams(mt.Name);
            knownKinds.TryAdd(simpleName, mt.Kind);
        }

        foreach (var mt in typeMap.Values)
        {
            foreach (var rawBase in mt.RawBaseTypes)
            {
                var baseName = StripGenericParams(rawBase);
                // Strip any namespace qualifier for lookup (e.g., "Foo.IBar" → "IBar")
                var simpleName = baseName.LastIndexOf('.') is >= 0 and var dotIdx
                    ? baseName[(dotIdx + 1)..]
                    : baseName;

                if (mt.Kind == "interface")
                {
                    // C# language rule: interfaces can only extend other interfaces.
                    mt.AddInterface(rawBase);
                }
                else if (knownKinds.TryGetValue(simpleName, out var kind))
                {
                    // Known locally-defined type: classify by its actual declared kind.
                    if (kind == "interface")
                        mt.AddInterface(rawBase);
                    else
                        mt.SetBaseIfNull(rawBase);
                }
                else
                {
                    // External type not in our source tree.
                    // Use the C# naming convention (CA1715): interfaces start with 'I' + uppercase.
                    // This is enforced by Roslyn analyzers and universally followed in .NET.
                    if (simpleName.Length >= 2 && simpleName[0] == 'I' && char.IsUpper(simpleName[1]))
                        mt.AddInterface(rawBase);
                    else
                        mt.SetBaseIfNull(rawBase);
                }
            }
        }
    }

    /// <summary>
    /// Creates a Roslyn compilation with NuGet package references for semantic analysis.
    /// </summary>
    private static CSharpCompilation CreateCompilation(string rootPath, IReadOnlyList<SyntaxTree> syntaxTrees)
    {
        var references = LoadMetadataReferences(rootPath);
        s_cachedMetadataReferences = references;

        return CSharpCompilation.Create(
            "ApiEngine",
            syntaxTrees,
            references,
            new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary)
                .WithNullableContextOptions(NullableContextOptions.Enable));
    }

    /// <summary>
    /// Strips generic type parameters from a type name.
    /// E.g., "IList&lt;T&gt;" → "IList", "Dictionary&lt;K,V&gt;" → "Dictionary"
    /// </summary>
    private static string StripGenericParams(string name)
    {
        var idx = name.IndexOf('<');
        return idx >= 0 ? name[..idx] : name;
    }

    /// <summary>
    /// Loads an XML document with DTD processing prohibited to prevent XXE attacks.
    /// </summary>
    private static XDocument LoadXmlSecure(string path)
    {
        var settings = new XmlReaderSettings
        {
            DtdProcessing = DtdProcessing.Prohibit,
            XmlResolver = null
        };
        using var reader = XmlReader.Create(path, settings);
        return XDocument.Load(reader);
    }

    private static string GetTypeKind(BaseTypeDeclarationSyntax type) => type switch
    {
        RecordDeclarationSyntax r when r.ClassOrStructKeyword.IsKind(SyntaxKind.StructKeyword) => "record struct",
        RecordDeclarationSyntax => "record",
        ClassDeclarationSyntax => "class",
        InterfaceDeclarationSyntax => "interface",
        StructDeclarationSyntax => "struct",
        EnumDeclarationSyntax => "enum",
        _ => "type"
    };

    private static string GetTypeName(BaseTypeDeclarationSyntax type)
    {
        var name = type.Identifier.Text;
        if (type is TypeDeclarationSyntax tds && tds.TypeParameterList != null)
            name += $"<{string.Join(",", tds.TypeParameterList.Parameters.Select(p => p.Identifier.Text))}>";
        return name;
    }

    private MemberInfo? ExtractMember(MemberDeclarationSyntax member)
    {
        switch (member)
        {
            case ConstructorDeclarationSyntax ctor:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(ctor.AttributeLists);
                return new MemberInfo
                {
                    Name = ctor.Identifier.Text,
                    Kind = "ctor",
                    Signature = $"({FormatParams(ctor.ParameterList)})",
                    Doc = GetXmlDoc(ctor),
                    Params = GetParameters(ctor.ParameterList),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case MethodDeclarationSyntax m:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(m.AttributeLists);
                return new MemberInfo
                {
                    Name = m.Identifier.Text,
                    Kind = "method",
                    Signature = $"{Simplify(m.ReturnType)} {m.Identifier.Text}{TypeParams(m)}({FormatParams(m.ParameterList)})",
                    Doc = GetXmlDoc(m),
                    IsStatic = m.Modifiers.Any(SyntaxKind.StaticKeyword) ? true : null,
                    IsAsync = IsAsyncMethod(m) ? true : null,
                    Params = GetParameters(m.ParameterList),
                    Results = GetResults(m.ReturnType),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case PropertyDeclarationSyntax p:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(p.AttributeLists);
                return new MemberInfo
                {
                    Name = p.Identifier.Text,
                    Kind = "property",
                    Signature = $"{Simplify(p.Type)} {p.Identifier.Text}{Accessors(p)}",
                    Doc = GetXmlDoc(p),
                    IsStatic = p.Modifiers.Any(SyntaxKind.StaticKeyword) ? true : null,
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case IndexerDeclarationSyntax idx:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(idx.AttributeLists);
                return new MemberInfo
                {
                    Name = "this[]",
                    Kind = "indexer",
                    Signature = $"{Simplify(idx.Type)} this[{FormatParams(idx.ParameterList)}]",
                    Doc = GetXmlDoc(idx),
                    Params = GetParameters(idx.ParameterList),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case EventDeclarationSyntax evt:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(evt.AttributeLists);
                return new MemberInfo
                {
                    Name = evt.Identifier.Text,
                    Kind = "event",
                    Signature = $"event {Simplify(evt.Type)} {evt.Identifier.Text}",
                    Doc = GetXmlDoc(evt),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case EventFieldDeclarationSyntax ef when ef.Declaration.Variables.FirstOrDefault() is { } ev:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(ef.AttributeLists);
                return new MemberInfo
                {
                    Name = ev.Identifier.Text,
                    Kind = "event",
                    Signature = $"event {Simplify(ef.Declaration.Type)} {ev.Identifier.Text}",
                    Doc = GetXmlDoc(ef),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case FieldDeclarationSyntax f when f.Modifiers.Any(SyntaxKind.ConstKeyword)
                && f.Declaration.Variables.FirstOrDefault() is { } v:
                return new MemberInfo
                {
                    Name = v.Identifier.Text,
                    Kind = "const",
                    Signature = $"const {Simplify(f.Declaration.Type)} {v.Identifier.Text}" +
                        (v.Initializer != null && v.Initializer.Value.ToString().Length < 30 ? $" = {v.Initializer.Value}" : ""),
                    Doc = GetXmlDoc(f)
                };
            case FieldDeclarationSyntax f when f.Modifiers.Any(SyntaxKind.StaticKeyword) && f.Modifiers.Any(SyntaxKind.ReadOnlyKeyword)
                && f.Declaration.Variables.FirstOrDefault() is { } sv:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(f.AttributeLists);
                return new MemberInfo
                {
                    Name = sv.Identifier.Text,
                    Kind = "field",
                    Signature = $"static readonly {Simplify(f.Declaration.Type)} {sv.Identifier.Text}",
                    Doc = GetXmlDoc(f),
                    IsStatic = true,
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case OperatorDeclarationSyntax op:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(op.AttributeLists);
                return new MemberInfo
                {
                    Name = $"operator {op.OperatorToken.Text}",
                    Kind = "operator",
                    Signature = $"static {Simplify(op.ReturnType)} operator {op.OperatorToken.Text}({FormatParams(op.ParameterList)})",
                    Doc = GetXmlDoc(op),
                    IsStatic = true,
                    Params = GetParameters(op.ParameterList),
                    Results = GetResults(op.ReturnType),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            case ConversionOperatorDeclarationSyntax conv:
            {
                var (deprecated, deprecatedMsg) = GetDeprecationInfo(conv.AttributeLists);
                return new MemberInfo
                {
                    Name = $"{conv.ImplicitOrExplicitKeyword.Text} operator {Simplify(conv.Type)}",
                    Kind = "operator",
                    Signature = $"static {conv.ImplicitOrExplicitKeyword.Text} operator {Simplify(conv.Type)}({FormatParams(conv.ParameterList)})",
                    Doc = GetXmlDoc(conv),
                    IsStatic = true,
                    Params = GetParameters(conv.ParameterList),
                    Results = GetResults(conv.Type),
                    IsDeprecated = deprecated ? true : null,
                    DeprecatedMessage = deprecatedMsg
                };
            }
            default:
                return null;
        }
    }

    private static string TypeParams(MethodDeclarationSyntax m) =>
        m.TypeParameterList != null
            ? $"<{string.Join(",", m.TypeParameterList.Parameters.Select(p => p.Identifier.Text))}>"
            : "";

    /// <summary>
    /// Determines whether a method is async by checking the async modifier
    /// or by inspecting the return type syntax for Task/ValueTask/IAsyncEnumerable.
    /// Uses Roslyn syntax tree walking instead of string matching.
    /// </summary>
    private static bool IsAsyncMethod(MethodDeclarationSyntax m)
    {
        if (m.Modifiers.Any(SyntaxKind.AsyncKeyword)) return true;
        var name = GetOutermostTypeName(m.ReturnType);
        return name is "Task" or "ValueTask" or "IAsyncEnumerable";
    }

    /// <summary>
    /// Graphs the outermost type identifier from a TypeSyntax node,
    /// stripping namespace qualifiers and ignoring generic type arguments.
    /// E.g., System.Threading.Tasks.Task&lt;int&gt; → "Task"
    /// </summary>
    private static string? GetOutermostTypeName(TypeSyntax type) => type switch
    {
        IdentifierNameSyntax id => id.Identifier.Text,
        GenericNameSyntax g => g.Identifier.Text,
        QualifiedNameSyntax q => GetOutermostTypeName(q.Right),
        AliasQualifiedNameSyntax a => GetOutermostTypeName(a.Name),
        _ => null
    };

    private static string Accessors(PropertyDeclarationSyntax p)
    {
        if (p.ExpressionBody != null) return " { get; }";
        if (p.AccessorList == null) return "";

        var hasGet = p.AccessorList.Accessors.Any(a => a.IsKind(SyntaxKind.GetAccessorDeclaration));
        var hasSet = p.AccessorList.Accessors.Any(a => a.IsKind(SyntaxKind.SetAccessorDeclaration));
        var hasInit = p.AccessorList.Accessors.Any(a => a.IsKind(SyntaxKind.InitAccessorDeclaration));

        return (hasGet, hasSet, hasInit) switch
        {
            (true, true, _) => " { get; set; }",
            (true, _, true) => " { get; init; }",
            (true, _, _) => " { get; }",
            (_, true, _) => " { set; }",
            _ => ""
        };
    }

    private string FormatParams(ParameterListSyntax? pl) =>
        pl == null ? "" : string.Join(", ", pl.Parameters.Select(FormatParam));

    private string FormatParams(BracketedParameterListSyntax? pl) =>
        pl == null ? "" : string.Join(", ", pl.Parameters.Select(FormatParam));

    private string FormatParam(ParameterSyntax p)
    {
        var mods = string.Join(" ", p.Modifiers.Select(m => m.Text));
        var type = Simplify(p.Type);
        var name = p.Identifier.Text;
        var def = p.Default is not null ? $" = {(p.Default.Value.ToString().Length < 20 ? p.Default.Value.ToString() : "...")}" : "";
        return string.IsNullOrEmpty(mods) ? $"{type} {name}{def}" : $"{mods} {type} {name}{def}";
    }

    private static IReadOnlyList<ParameterInfo>? GetParameters(ParameterListSyntax? parameterList)
        => parameterList is null ? null : parameterList.Parameters.Select(ToParameterInfo).ToList();

    private static IReadOnlyList<ParameterInfo>? GetParameters(BracketedParameterListSyntax? parameterList)
        => parameterList is null ? null : parameterList.Parameters.Select(ToParameterInfo).ToList();

    private static ParameterInfo ToParameterInfo(ParameterSyntax parameter)
        => new()
        {
            Name = parameter.Identifier.Text,
            Type = Simplify(parameter.Type),
            Default = parameter.Default?.Value.ToString(),
            Modifier = parameter.Modifiers.Count > 0 ? string.Join(" ", parameter.Modifiers.Select(m => m.Text)) : null,
        };

    private static IReadOnlyList<ResultInfo>? GetResults(TypeSyntax? returnType)
    {
        if (returnType is null)
            return null;

        if (returnType is PredefinedTypeSyntax predefined && predefined.Keyword.IsKind(SyntaxKind.VoidKeyword))
            return null;

        if (returnType is TupleTypeSyntax tuple)
        {
            return tuple.Elements
                .Select(e => new ResultInfo
                {
                    Name = string.IsNullOrWhiteSpace(e.Identifier.Text) ? null : e.Identifier.Text,
                    Type = Simplify(e.Type),
                })
                .ToList();
        }

        return
        [
            new ResultInfo
            {
                Type = Simplify(returnType),
            },
        ];
    }

    private static (bool IsDeprecated, string? DeprecatedMessage) GetDeprecationInfo(SyntaxList<AttributeListSyntax> attributes)
    {
        foreach (var attribute in attributes.SelectMany(a => a.Attributes))
        {
            var attributeName = attribute.Name.ToString();
            if (!attributeName.EndsWith("Obsolete", StringComparison.Ordinal) &&
                !attributeName.EndsWith("ObsoleteAttribute", StringComparison.Ordinal))
            {
                continue;
            }

            var message = attribute.ArgumentList?.Arguments.FirstOrDefault()?.ToString()?.Trim('"');
            return (true, string.IsNullOrWhiteSpace(message) ? null : message);
        }

        return (false, null);
    }

    private static string BuildTypeId(string namespaceName, string typeName)
        => string.IsNullOrWhiteSpace(namespaceName) ? typeName : $"{namespaceName}.{typeName}";

    private static string BuildMemberId(string namespaceName, string typeName, string memberName)
        => $"{BuildTypeId(namespaceName, typeName)}.{memberName}";

    private static ApiIndex ApplyCrossLanguageIds(ApiIndex index, CrossLanguageMap map)
        => index with
        {
            CrossLanguagePackageId = map.PackageId,
            Namespaces = index.Namespaces.Select(ns => ns with
            {
                Types = ns.Types.Select(type =>
                {
                    var typeCrossId = type.Id is not null && map.Ids.TryGetValue(type.Id, out var tid) ? tid : null;
                    var hasAnyMemberMatch = false;
                    List<MemberInfo>? updatedMembers = null;

                    if (type.Members is { Count: > 0 })
                    {
                        updatedMembers = type.Members.Select(member =>
                        {
                            if (member.Id is not null && map.Ids.TryGetValue(member.Id, out var mid))
                            {
                                hasAnyMemberMatch = true;
                                return member with { CrossLanguageId = mid };
                            }
                            return member;
                        }).ToList();
                    }

                    // Only clone the type record if something actually changed
                    if (typeCrossId is null && !hasAnyMemberMatch)
                        return type;

                    return type with
                    {
                        CrossLanguageId = typeCrossId,
                        Members = updatedMembers ?? type.Members,
                    };
                }).ToList(),
            }).ToList(),
        };

    /// <summary>
    /// Simplifies a type syntax by stripping well-known System namespace qualifiers.
    /// Uses Roslyn syntax tree walking to only strip leading namespace qualifiers
    /// from QualifiedNameSyntax nodes, never touching type names that happen to
    /// contain "System" as a substring.
    /// </summary>
    private static string Simplify(TypeSyntax? type)
    {
        if (type is null) return "";
        return SimplifyType(type);
    }

    /// <summary>
    /// Recursively walks a TypeSyntax tree, stripping System.* namespace qualifiers
    /// from QualifiedNameSyntax nodes while preserving all other structure.
    /// </summary>
    private static string SimplifyType(TypeSyntax type) => type switch
    {
        QualifiedNameSyntax q when IsSystemNamespace(q.Left.ToString())
            => SimplifyType(q.Right),
        GenericNameSyntax g
            => $"{g.Identifier.Text}<{string.Join(", ", g.TypeArgumentList.Arguments.Select(SimplifyType))}>",
        ArrayTypeSyntax a
            => SimplifyType(a.ElementType) + string.Join("", a.RankSpecifiers),
        NullableTypeSyntax n
            => SimplifyType(n.ElementType) + "?",
        _ => type.ToString()
    };

    /// <summary>
    /// Returns true if the given string represents a System namespace that should be stripped.
    /// Only called with the Left side of a QualifiedNameSyntax, so it always represents
    /// a complete namespace qualifier — never a substring of a type name.
    /// </summary>
    private static bool IsSystemNamespace(string ns) =>
        ns == "System" || ns.StartsWith("System.", StringComparison.Ordinal);

    private static string? GetXmlDoc(SyntaxNode node)
    {
        var trivia = node.GetLeadingTrivia()
            .FirstOrDefault(t => t.IsKind(SyntaxKind.SingleLineDocumentationCommentTrivia) ||
                                 t.IsKind(SyntaxKind.MultiLineDocumentationCommentTrivia));

        if (trivia == default) return null;

        var summary = trivia.GetStructure()?.DescendantNodes()
            .OfType<XmlElementSyntax>()
            .FirstOrDefault(e => e.StartTag.Name.ToString() == "summary");

        if (summary == null) return null;

        var text = string.Join(" ", summary.Content
            .OfType<XmlTextSyntax>()
            .SelectMany(t => t.TextTokens)
            .Select(t => t.Text.Trim())).Trim();

        return string.IsNullOrWhiteSpace(text) ? null : text.Length > 150 ? text[..147] + "..." : text;
    }

    private static bool IsPublic(BaseTypeDeclarationSyntax t) => t.Modifiers.Any(SyntaxKind.PublicKeyword);
    /// <summary>
    /// Interface members are implicitly public in C# (no explicit modifier needed).
    /// For classes/structs, the public keyword is required.
    /// Since C# 8 (DIM), interfaces can have private/protected/internal members — exclude those.
    /// </summary>
    private static bool IsPublicMember(MemberDeclarationSyntax m) =>
        m.Modifiers.Any(SyntaxKind.PublicKeyword) ||
        (m.Parent is InterfaceDeclarationSyntax &&
         !m.Modifiers.Any(SyntaxKind.PrivateKeyword) &&
         !m.Modifiers.Any(SyntaxKind.ProtectedKeyword) &&
         !m.Modifiers.Any(SyntaxKind.InternalKeyword));

    private static string DetectPackageName(string rootPath)
    {
        var csproj = Directory.EnumerateFiles(rootPath, "*.csproj", SearchOption.TopDirectoryOnly).FirstOrDefault()
                  ?? Directory.EnumerateFiles(rootPath, "*.csproj", SearchOption.AllDirectories).FirstOrDefault();
        return csproj != null ? Path.GetFileNameWithoutExtension(csproj) : Path.GetFileName(rootPath);
    }

    private async Task<ApiIndex?> TryGraphFromCompiledArtifactsAsync(
        string csprojPath,
        CrossLanguageMap? crossLanguageMap,
        List<ApiDiagnostic> diagnostics,
        CancellationToken ct)
    {
        if (!File.Exists(csprojPath))
        {
            diagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Warning,
                Text = $"C# artifact mode requested, but csproj file was not found: {csprojPath}. Falling back to source analysis."
            });
            return null;
        }

        var targetDll = await ResolveTargetDllPathAsync(csprojPath, ct).ConfigureAwait(false);
        if (targetDll is null)
        {
            diagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Warning,
                Text = $"Failed to resolve C# build output from '{csprojPath}'. Falling back to source analysis."
            });
            return null;
        }

        if (!File.Exists(targetDll))
        {
            diagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Warning,
                Text = $"Resolved DLL does not exist: {targetDll}. Falling back to source analysis. Run: dotnet build {csprojPath}"
            });
            return null;
        }

        var (compilation, targetReference) = CreateMetadataCompilation(targetDll);
        var assembly = compilation.GetAssemblyOrModuleSymbol(targetReference) as IAssemblySymbol;
        if (assembly is null)
        {
            diagnostics.Add(new ApiDiagnostic
            {
                Id = "ENGINE_INPUT",
                Level = DiagnosticLevel.Warning,
                Text = $"Failed to load assembly metadata from '{targetDll}'. Falling back to source analysis."
            });
            return null;
        }

        Dictionary<string, List<TypeInfo>> typesByNamespace = new(StringComparer.Ordinal);
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes = new(StringComparer.Ordinal);

        WalkNamespace(assembly.GlobalNamespace, assembly, typesByNamespace, dependencyTypes);

        var namespaces = typesByNamespace
            .OrderBy(pair => pair.Key, StringComparer.Ordinal)
            .Select(pair => new NamespaceInfo
            {
                Name = pair.Key,
                Types = pair.Value.OrderBy(type => type.Name, StringComparer.Ordinal).ToList()
            })
            .ToList();

        var dependencies = BuildDependenciesFromSymbols(dependencyTypes);
        var packageName = Path.GetFileNameWithoutExtension(csprojPath);

        var apiIndex = new ApiIndex
        {
            Package = packageName,
            Namespaces = namespaces,
            Dependencies = dependencies,
        };

        if (crossLanguageMap is not null)
        {
            apiIndex = ApplyCrossLanguageIds(apiIndex, crossLanguageMap);
        }

        diagnostics.Add(new ApiDiagnostic
        {
            Id = "ENGINE_INPUT",
            Level = DiagnosticLevel.Info,
            Text = $"Using compiled artifacts: DLL at {targetDll}"
        });

        var postProcessed = ApiDiagnosticsPostProcessor.Build(apiIndex, diagnostics);
        return apiIndex with { Diagnostics = postProcessed };
    }

    private static async Task<string?> ResolveTargetDllPathAsync(string csprojPath, CancellationToken ct)
    {
        var msbuildResult = await ProcessSandbox.ExecuteAsync(
            "dotnet",
            ["msbuild", csprojPath, "-getProperty:TargetPath", "-target:GetTargetPath"],
            timeout: TimeSpan.FromSeconds(30),
            cancellationToken: ct).ConfigureAwait(false);

        if (!msbuildResult.Success)
            return null;

        var firstLine = msbuildResult.StandardOutput
            .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .FirstOrDefault(line => line.EndsWith(".dll", StringComparison.OrdinalIgnoreCase));

        return string.IsNullOrWhiteSpace(firstLine) ? null : firstLine;
    }

    private static (CSharpCompilation Compilation, MetadataReference TargetReference) CreateMetadataCompilation(string targetDllPath)
    {
        var projectRoot = Path.GetDirectoryName(targetDllPath) ?? AppContext.BaseDirectory;
        var references = LoadMetadataReferences(projectRoot).ToList();
        var targetReference = MetadataReference.CreateFromFile(targetDllPath);
        references.Add(targetReference);

        var compilation = CSharpCompilation.Create(
            Path.GetFileNameWithoutExtension(targetDllPath),
            syntaxTrees: [],
            references: references,
            options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary)
                .WithNullableContextOptions(NullableContextOptions.Enable));

        return (compilation, targetReference);
    }

    private static void WalkNamespace(
        INamespaceSymbol namespaceSymbol,
        IAssemblySymbol rootAssembly,
        Dictionary<string, List<TypeInfo>> typesByNamespace,
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes)
    {
        foreach (var childNamespace in namespaceSymbol.GetNamespaceMembers())
        {
            WalkNamespace(childNamespace, rootAssembly, typesByNamespace, dependencyTypes);
        }

        foreach (var type in namespaceSymbol.GetTypeMembers())
        {
            CollectType(type, rootAssembly, typesByNamespace, dependencyTypes);
        }
    }

    private static void CollectType(
        INamedTypeSymbol typeSymbol,
        IAssemblySymbol rootAssembly,
        Dictionary<string, List<TypeInfo>> typesByNamespace,
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes)
    {
        if (typeSymbol.DeclaredAccessibility != Accessibility.Public)
            return;

        var namespaceName = typeSymbol.ContainingNamespace?.IsGlobalNamespace == false
            ? typeSymbol.ContainingNamespace.ToDisplayString()
            : "";

        var typeName = typeSymbol.Name + (typeSymbol.TypeParameters.Length > 0
            ? $"<{string.Join(",", typeSymbol.TypeParameters.Select(parameter => parameter.Name))}>"
            : "");

        var typeId = BuildTypeId(namespaceName, typeName);
        var members = CollectMembers(typeSymbol, rootAssembly, dependencyTypes, typeId);
        var enumValues = typeSymbol.TypeKind == TypeKind.Enum
            ? typeSymbol.GetMembers().OfType<IFieldSymbol>().Where(field => field.HasConstantValue && !field.IsImplicitlyDeclared).Select(field => field.Name).ToList()
            : null;

        var typeInfo = new TypeInfo
        {
            Name = typeName,
            Id = typeId,
            Kind = GetTypeKindFromSymbol(typeSymbol),
            Base = typeSymbol.BaseType is null || typeSymbol.BaseType.SpecialType == SpecialType.System_Object
                ? null
                : typeSymbol.BaseType.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat),
            Interfaces = typeSymbol.Interfaces.Length == 0
                ? null
                : typeSymbol.Interfaces.Select(iface => iface.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)).OrderBy(name => name, StringComparer.Ordinal).ToList(),
            Doc = ExtractSummaryFromDocXml(typeSymbol.GetDocumentationCommentXml()),
            IsDeprecated = HasObsoleteAttribute(typeSymbol) ? true : null,
            Members = members.Count == 0 ? null : members,
            Values = enumValues is { Count: > 0 } ? enumValues : null,
        };

        if (!typesByNamespace.TryGetValue(namespaceName, out var typeList))
        {
            typeList = [];
            typesByNamespace[namespaceName] = typeList;
        }

        typeList.Add(typeInfo);

        foreach (var nested in typeSymbol.GetTypeMembers())
        {
            CollectType(nested, rootAssembly, typesByNamespace, dependencyTypes);
        }
    }

    private static List<MemberInfo> CollectMembers(
        INamedTypeSymbol typeSymbol,
        IAssemblySymbol rootAssembly,
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes,
        string typeId)
    {
        List<MemberInfo> members = [];

        foreach (var symbol in typeSymbol.GetMembers())
        {
            if (symbol.DeclaredAccessibility != Accessibility.Public || symbol.IsImplicitlyDeclared)
                continue;

            switch (symbol)
            {
                case IMethodSymbol method when method.MethodKind == MethodKind.Constructor:
                    members.Add(new MemberInfo
                    {
                        Name = method.ContainingType.Name,
                        Kind = "ctor",
                        Signature = $"({FormatMethodParameters(method)})",
                        Params = CreateParameters(method.Parameters),
                        Doc = ExtractSummaryFromDocXml(method.GetDocumentationCommentXml()),
                        Id = $"{typeId}.{method.ContainingType.Name}",
                        IsDeprecated = HasObsoleteAttribute(method) ? true : null,
                    });
                    TrackDependencies(method, rootAssembly, dependencyTypes);
                    break;

                case IMethodSymbol method when method.MethodKind == MethodKind.Ordinary:
                    members.Add(new MemberInfo
                    {
                        Name = method.Name,
                        Kind = "method",
                        Signature = $"{method.ReturnType.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)} {method.Name}({FormatMethodParameters(method)})",
                        Params = CreateParameters(method.Parameters),
                        Results = [new ResultInfo { Type = method.ReturnType.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat) }],
                        Doc = ExtractSummaryFromDocXml(method.GetDocumentationCommentXml()),
                        IsStatic = method.IsStatic ? true : null,
                        IsAsync = IsAsyncReturnType(method.ReturnType) ? true : null,
                        Id = $"{typeId}.{method.Name}",
                        IsDeprecated = HasObsoleteAttribute(method) ? true : null,
                    });
                    TrackDependencies(method, rootAssembly, dependencyTypes);
                    break;

                case IPropertySymbol property:
                    members.Add(new MemberInfo
                    {
                        Name = property.Name,
                        Kind = "property",
                        Signature = $"{property.Type.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)} {property.Name}",
                        Doc = ExtractSummaryFromDocXml(property.GetDocumentationCommentXml()),
                        IsStatic = property.IsStatic ? true : null,
                        Id = $"{typeId}.{property.Name}",
                        IsDeprecated = HasObsoleteAttribute(property) ? true : null,
                    });
                    TrackTypeDependency(property.Type, rootAssembly, dependencyTypes);
                    break;

                case IFieldSymbol field:
                    members.Add(new MemberInfo
                    {
                        Name = field.Name,
                        Kind = field.IsConst ? "const" : "field",
                        Signature = $"{field.Type.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)} {field.Name}",
                        Doc = ExtractSummaryFromDocXml(field.GetDocumentationCommentXml()),
                        IsStatic = field.IsStatic ? true : null,
                        Id = $"{typeId}.{field.Name}",
                        IsDeprecated = HasObsoleteAttribute(field) ? true : null,
                    });
                    TrackTypeDependency(field.Type, rootAssembly, dependencyTypes);
                    break;

                case IEventSymbol eventSymbol:
                    members.Add(new MemberInfo
                    {
                        Name = eventSymbol.Name,
                        Kind = "event",
                        Signature = $"event {eventSymbol.Type.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)} {eventSymbol.Name}",
                        Doc = ExtractSummaryFromDocXml(eventSymbol.GetDocumentationCommentXml()),
                        Id = $"{typeId}.{eventSymbol.Name}",
                        IsDeprecated = HasObsoleteAttribute(eventSymbol) ? true : null,
                    });
                    TrackTypeDependency(eventSymbol.Type, rootAssembly, dependencyTypes);
                    break;
            }
        }

        return members;
    }

    private static IReadOnlyList<ParameterInfo>? CreateParameters(ImmutableArray<IParameterSymbol> parameters)
    {
        if (parameters.Length == 0)
            return null;

        return parameters.Select(parameter => new ParameterInfo
        {
            Name = parameter.Name,
            Type = parameter.Type.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat),
            Default = parameter.HasExplicitDefaultValue ? parameter.ExplicitDefaultValue?.ToString() : null,
            Modifier = parameter.RefKind switch
            {
                RefKind.In => "in",
                RefKind.Out => "out",
                RefKind.Ref => "ref",
                _ => null
            }
        }).ToList();
    }

    private static string FormatMethodParameters(IMethodSymbol method)
        => string.Join(", ", method.Parameters.Select(parameter =>
            $"{parameter.Type.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)} {parameter.Name}"));

    private static bool IsAsyncReturnType(ITypeSymbol returnType)
    {
        var displayName = returnType.ToDisplayString(SymbolDisplayFormat.FullyQualifiedFormat);
        return displayName.StartsWith("global::System.Threading.Tasks.Task", StringComparison.Ordinal)
            || displayName.StartsWith("global::System.Threading.Tasks.ValueTask", StringComparison.Ordinal)
            || displayName.StartsWith("global::System.Collections.Generic.IAsyncEnumerable", StringComparison.Ordinal);
    }

    private static bool HasObsoleteAttribute(ISymbol symbol)
        => symbol.GetAttributes().Any(attribute =>
            attribute.AttributeClass?.ToDisplayString(SymbolDisplayFormat.FullyQualifiedFormat)
                == "global::System.ObsoleteAttribute");

    private static string? ExtractSummaryFromDocXml(string? xml)
    {
        if (string.IsNullOrWhiteSpace(xml))
            return null;

        var start = xml.IndexOf("<summary>", StringComparison.OrdinalIgnoreCase);
        var end = xml.IndexOf("</summary>", StringComparison.OrdinalIgnoreCase);
        if (start < 0 || end < 0 || end <= start)
            return null;

        var content = xml[(start + "<summary>".Length)..end];
        content = XmlTagPattern().Replace(content, " ").Trim();
        content = string.Join(" ", content.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
        return string.IsNullOrWhiteSpace(content) ? null : content.Length > 150 ? content[..147] + "..." : content;
    }

    [GeneratedRegex("<.*?>", RegexOptions.None)]
    private static partial Regex XmlTagPattern();

    private static void TrackDependencies(
        IMethodSymbol method,
        IAssemblySymbol rootAssembly,
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes)
    {
        TrackTypeDependency(method.ReturnType, rootAssembly, dependencyTypes);
        foreach (var parameter in method.Parameters)
        {
            TrackTypeDependency(parameter.Type, rootAssembly, dependencyTypes);
        }
    }

    private static void TrackTypeDependency(
        ITypeSymbol typeSymbol,
        IAssemblySymbol rootAssembly,
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes)
    {
        if (typeSymbol is INamedTypeSymbol namedType && namedType.TypeArguments.Length > 0)
        {
            foreach (var typeArgument in namedType.TypeArguments)
            {
                TrackTypeDependency(typeArgument, rootAssembly, dependencyTypes);
            }
        }

        if (typeSymbol.TypeKind == TypeKind.Array && typeSymbol is IArrayTypeSymbol arrayType)
        {
            TrackTypeDependency(arrayType.ElementType, rootAssembly, dependencyTypes);
            return;
        }

        var assemblyName = typeSymbol.ContainingAssembly?.Name;
        if (string.IsNullOrWhiteSpace(assemblyName) || assemblyName == rootAssembly.Name)
            return;

        if (!dependencyTypes.TryGetValue(assemblyName, out var assemblyTypes))
        {
            assemblyTypes = new Dictionary<string, ITypeSymbol>(StringComparer.Ordinal);
            dependencyTypes[assemblyName] = assemblyTypes;
        }

        var displayName = typeSymbol.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat);
        assemblyTypes.TryAdd(displayName, typeSymbol);
    }

    private static IReadOnlyList<DependencyInfo>? BuildDependenciesFromSymbols(
        Dictionary<string, Dictionary<string, ITypeSymbol>> dependencyTypes)
    {
        if (dependencyTypes.Count == 0)
            return null;

        return dependencyTypes
            .OrderBy(pair => pair.Key, StringComparer.Ordinal)
            .Select(pair => new DependencyInfo
            {
                Package = pair.Key,
                IsStdlib = IsSystemAssembly(pair.Key),
                Types = pair.Value
                    .OrderBy(typePair => typePair.Key, StringComparer.Ordinal)
                    .Select(typePair => new TypeInfo
                    {
                        Name = typePair.Key,
                        Kind = GetTypeKindFromSymbol(typePair.Value),
                        ReExportedFrom = pair.Key,
                    }).ToList()
            })
            .ToList();
    }

    /// <summary>
    /// Returns true if the relative path contains a directory segment matching <paramref name="segment"/>.
    /// Zero-allocation: avoids per-call string interpolation by checking separator boundaries directly.
    /// </summary>
    internal static bool ContainsSegment(string relativePath, string segment)
    {
        var path = relativePath.AsSpan();
        var seg = segment.AsSpan();
        int searchFrom = 0;
        while (searchFrom <= path.Length - seg.Length)
        {
            var pos = path[searchFrom..].IndexOf(seg, StringComparison.Ordinal);
            if (pos < 0) return false;
            pos += searchFrom;

            var beforeOk = pos == 0 || path[pos - 1] is '/' or '\\';
            var afterPos = pos + seg.Length;
            var afterOk = afterPos >= path.Length || path[afterPos] is '/' or '\\';

            if (beforeOk && afterOk) return true;
            searchFrom = pos + 1;
        }

        return false;
    }
}
