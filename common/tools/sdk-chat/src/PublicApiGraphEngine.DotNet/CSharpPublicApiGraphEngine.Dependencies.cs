// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.Collections.Frozen;
using System.Diagnostics;
using System.Xml;
using System.Xml.Linq;
using PublicApiGraphEngine.Contracts;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PublicApiGraphEngine.DotNet;

/// <summary>
/// Transitive dependency resolution using Roslyn semantic analysis.
/// Identifies external package dependencies from the public API surface.
/// </summary>
public partial class CSharpPublicApiGraphEngine
{
    /// <summary>
    /// Cached metadata references from the last engine run, including NuGet package DLLs.
    /// The usage analyzer can reuse these for richer type resolution in sample code.
    /// Volatile for safe cross-thread visibility (engine runs before usage analysis).
    /// </summary>
    private static volatile IReadOnlyList<MetadataReference>? s_cachedMetadataReferences;

    /// <summary>
    /// Returns the metadata references loaded during the last <see cref="GraphAsync(EngineInput, CrossLanguageMap?, CancellationToken)"/> call,
    /// or <c>null</c> if engine has not run yet. Includes runtime assemblies and NuGet
    /// package DLLs, giving the usage analyzer full type resolution for SDK types.
    /// </summary>
    internal static IReadOnlyList<MetadataReference>? CachedMetadataReferences => s_cachedMetadataReferences;

    /// <summary>
    /// .NET system assemblies that should be excluded from dependencies.
    /// These are part of the runtime/BCL and not external packages.
    /// Uses FrozenSet for zero-cost concurrent reads.
    /// </summary>
    private static readonly FrozenSet<string> SystemAssemblyPrefixes = new[]
    {
        "System", "mscorlib", "netstandard", "Microsoft.CSharp",
        "Microsoft.VisualBasic", "Microsoft.Win32", "WindowsBase",
    }.ToFrozenSet(StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// Checks if an assembly is a system/runtime assembly (not an external dependency).
    /// </summary>
    private static bool IsSystemAssembly(string? assemblyName)
    {
        if (string.IsNullOrEmpty(assemblyName)) return true;

        // Exact match via FrozenSet O(1) lookup
        if (SystemAssemblyPrefixes.Contains(assemblyName)) return true;

        // Prefix match: check if assemblyName starts with any known prefix + "."
        // Span-based comparison avoids string concatenation allocation on every iteration
        // in the hot semantic-analysis path
        var nameSpan = assemblyName.AsSpan();
        foreach (var prefix in SystemAssemblyPrefixes)
        {
            if (nameSpan.Length > prefix.Length &&
                nameSpan[prefix.Length] == '.' &&
                nameSpan.StartsWith(prefix.AsSpan(), StringComparison.OrdinalIgnoreCase))
                return true;
        }
        return false;
    }

    /// <summary>
    /// Single-pass Roslyn traversal that:
    /// 1. Marks error types (System.Exception subtypes) in the type map
    /// 2. Resolves transitive dependencies from the public API surface
    /// Merging these two operations halves syntax-tree walking cost for large repos.
    /// </summary>
    private static IReadOnlyList<DependencyInfo>? ResolveTransitiveDependenciesAndMarkErrors(
        ConcurrentDictionary<string, MergedType> typeMap,
        CSharpCompilation compilation,
        IReadOnlyList<SyntaxTree> syntaxTrees,
        CancellationToken ct)
    {
        if (syntaxTrees.Count is 0) return null;

        // Resolve System.Exception for error type marking
        var exceptionType = compilation.GetTypeByMetadataName("System.Exception");

        // Collect all defined type names from typeMap (to exclude from dependencies)
        var definedTypes = new HashSet<string>(StringComparer.Ordinal);
        foreach (var mt in typeMap.Values)
        {
            definedTypes.Add(IApiIndex.NormalizeTypeName(mt.Name));
            if (!string.IsNullOrEmpty(mt.Namespace))
                definedTypes.Add($"{mt.Namespace}.{IApiIndex.NormalizeTypeName(mt.Name)}");
        }

        // Collect external type symbols from all public API surfaces
        var externalTypes = new Dictionary<string, (ITypeSymbol Symbol, string AssemblyName)>(StringComparer.Ordinal);

        // Process syntax trees in batches to limit memory consumption
        // Roslyn semantic models can consume significant memory for large repos
        // Direct index-based loop avoids LINQ Skip/Take iterator allocations per batch
        var batchCount = (syntaxTrees.Count + MaxSyntaxTreesPerBatch - 1) / MaxSyntaxTreesPerBatch;

        for (int batchIndex = 0; batchIndex < batchCount; batchIndex++)
        {
            ct.ThrowIfCancellationRequested();

            var batchStart = batchIndex * MaxSyntaxTreesPerBatch;
            var batchEnd = Math.Min(batchStart + MaxSyntaxTreesPerBatch, syntaxTrees.Count);

            for (int i = batchStart; i < batchEnd; i++)
            {
                ct.ThrowIfCancellationRequested();
                var tree = syntaxTrees[i];

                var semanticModel = compilation.GetSemanticModel(tree);
                var root = tree.GetRoot(ct);

                // Collect type references and mark error types in a single traversal
                foreach (var typeDecl in root.DescendantNodes().OfType<TypeDeclarationSyntax>())
                {
                    // --- Error type marking (merged from MarkErrorTypes) ---
                    // Check if this type inherits from System.Exception
                    if (exceptionType is not null)
                    {
                        var symbol = semanticModel.GetDeclaredSymbol(typeDecl);
                        if (symbol is not null)
                        {
                            var baseType = symbol.BaseType;
                            while (baseType is not null)
                            {
                                if (SymbolEqualityComparer.Default.Equals(baseType, exceptionType))
                                {
                                    var name = GetTypeName(typeDecl);
                                    var ns = symbol.ContainingNamespace is { IsGlobalNamespace: false } cns
                                        ? cns.ToDisplayString()
                                        : "";
                                    var key = $"{ns}.{name}";
                                    if (typeMap.TryGetValue(key, out var errorType))
                                        errorType.IsError = true;
                                    break;
                                }
                                baseType = baseType.BaseType;
                            }
                        }
                    }

                    // --- Dependency resolution ---
                    if (!typeDecl.Modifiers.Any(SyntaxKind.PublicKeyword)) continue;

                    // Base types and interfaces
                    if (typeDecl.BaseList != null)
                    {
                        foreach (var baseType in typeDecl.BaseList.Types)
                        {
                            CollectExternalTypeSymbol(baseType.Type, semanticModel, definedTypes, externalTypes);
                        }
                    }

                    // Members
                    foreach (var member in typeDecl.Members)
                    {
                        if (!member.Modifiers.Any(SyntaxKind.PublicKeyword)) continue;

                        CollectTypesFromMember(member, semanticModel, definedTypes, externalTypes);
                    }
                }
            }
        }

        if (externalTypes.Count is 0) return null;

        // Group by assembly (package) name
        var byPackage = externalTypes
            .GroupBy(kv => kv.Value.AssemblyName, StringComparer.Ordinal)
            .OrderBy(g => g.Key)
            .Select(g => new DependencyInfo
            {
                Package = g.Key,
                IsStdlib = IsSystemAssembly(g.Key),
                Types = g.Select(kv => new TypeInfo
                {
                    Name = kv.Key,
                    Kind = GetTypeKindFromSymbol(kv.Value.Symbol)
                }).OrderBy(t => t.Name).ToList()
            })
            .ToList();

        return byPackage.Count > 0 ? byPackage : null;
    }

    /// <summary>
    /// Collects type symbols from a member declaration (method, property, etc.)
    /// </summary>
    private static void CollectTypesFromMember(
        MemberDeclarationSyntax member,
        SemanticModel semanticModel,
        HashSet<string> definedTypes,
        Dictionary<string, (ITypeSymbol, string)> externalTypes)
    {
        switch (member)
        {
            case MethodDeclarationSyntax method:
                CollectExternalTypeSymbol(method.ReturnType, semanticModel, definedTypes, externalTypes);
                foreach (var param in method.ParameterList.Parameters)
                {
                    if (param.Type != null)
                        CollectExternalTypeSymbol(param.Type, semanticModel, definedTypes, externalTypes);
                }
                // Collect from type constraints
                foreach (var constraint in method.ConstraintClauses)
                    foreach (var typeConstraint in constraint.Constraints.OfType<TypeConstraintSyntax>())
                    {
                        CollectExternalTypeSymbol(typeConstraint.Type, semanticModel, definedTypes, externalTypes);
                    }
                break;

            case PropertyDeclarationSyntax prop:
                CollectExternalTypeSymbol(prop.Type, semanticModel, definedTypes, externalTypes);
                break;

            case IndexerDeclarationSyntax indexer:
                CollectExternalTypeSymbol(indexer.Type, semanticModel, definedTypes, externalTypes);
                foreach (var param in indexer.ParameterList.Parameters)
                {
                    if (param.Type != null)
                        CollectExternalTypeSymbol(param.Type, semanticModel, definedTypes, externalTypes);
                }
                break;

            case EventDeclarationSyntax evt:
                CollectExternalTypeSymbol(evt.Type, semanticModel, definedTypes, externalTypes);
                break;

            case FieldDeclarationSyntax field:
                CollectExternalTypeSymbol(field.Declaration.Type, semanticModel, definedTypes, externalTypes);
                break;

            case ConstructorDeclarationSyntax ctor:
                foreach (var param in ctor.ParameterList.Parameters)
                {
                    if (param.Type != null)
                        CollectExternalTypeSymbol(param.Type, semanticModel, definedTypes, externalTypes);
                }
                break;
        }
    }

    /// <summary>
    /// Collects an external type symbol if it's from an external assembly.
    /// Recursively collects generic type arguments.
    /// </summary>
    private static void CollectExternalTypeSymbol(
        TypeSyntax typeSyntax,
        SemanticModel semanticModel,
        HashSet<string> definedTypes,
        Dictionary<string, (ITypeSymbol, string)> externalTypes)
    {
        var typeInfo = semanticModel.GetTypeInfo(typeSyntax);
        var typeSymbol = typeInfo.Type;

        if (typeSymbol == null) return;

        CollectExternalTypeSymbolRecursive(typeSymbol, definedTypes, externalTypes);
    }

    /// <summary>
    /// Recursively collects external type symbols, including generic type arguments.
    /// </summary>
    private static void CollectExternalTypeSymbolRecursive(
        ITypeSymbol typeSymbol,
        HashSet<string> definedTypes,
        Dictionary<string, (ITypeSymbol, string)> externalTypes)
    {
        if (typeSymbol is INamedTypeSymbol { OriginalDefinition.SpecialType: SpecialType.System_Nullable_T } nullable)
        {
            var underlyingType = nullable.TypeArguments.FirstOrDefault();
            if (underlyingType != null)
                CollectExternalTypeSymbolRecursive(underlyingType, definedTypes, externalTypes);
            return;
        }

        if (typeSymbol is IArrayTypeSymbol arrayType)
        {
            CollectExternalTypeSymbolRecursive(arrayType.ElementType, definedTypes, externalTypes);
            return;
        }

        // Skip type parameters (generics)
        if (typeSymbol.TypeKind == TypeKind.TypeParameter) return;

        // Skip special types (primitives, etc.)
        if (typeSymbol.SpecialType != SpecialType.None) return;

        // Record error types (unresolvable from source) — derive package from namespace
        if (typeSymbol.TypeKind == TypeKind.Error)
        {
            var errorTypeName = typeSymbol.Name;
            if (!string.IsNullOrEmpty(errorTypeName) && !definedTypes.Contains(errorTypeName)
                && !externalTypes.ContainsKey(errorTypeName))
            {
                // Derive package name from containing namespace or qualified display name
                var packageName = GetErrorTypePackageName(typeSymbol);
                externalTypes[errorTypeName] = (typeSymbol, packageName);
            }
            return;
        }

        // Get the containing assembly
        var assembly = typeSymbol.ContainingAssembly;
        if (assembly == null) return;

        var assemblyName = assembly.Name;

        // Get the type name
        var typeName = typeSymbol.Name;
        var fullName = IApiIndex.NormalizeTypeName(typeSymbol.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat));

        // Skip if it's a locally defined type
        if (definedTypes.Contains(typeName) || definedTypes.Contains(fullName)) return;

        // Add to external types — prefer resolved types over error type entries
        if (!externalTypes.TryGetValue(typeName, out var existing) ||
            existing.Item1.TypeKind == TypeKind.Error)
        {
            externalTypes[typeName] = (typeSymbol, assemblyName);
        }

        // Recursively process generic type arguments
        if (typeSymbol is INamedTypeSymbol namedType && namedType.TypeArguments.Length > 0)
        {
            foreach (var typeArg in namedType.TypeArguments)
            {
                CollectExternalTypeSymbolRecursive(typeArg, definedTypes, externalTypes);
            }
        }
    }

    /// <summary>
    /// Gets the kind string for a type symbol.
    /// </summary>
    private static string GetTypeKindFromSymbol(ITypeSymbol symbol) => symbol.TypeKind switch
    {
        TypeKind.Class => symbol.IsRecord ? "record" : "class",
        TypeKind.Interface => "interface",
        TypeKind.Struct => symbol.IsRecord ? "record struct" : "struct",
        TypeKind.Enum => "enum",
        TypeKind.Delegate => "delegate",
        TypeKind.Error => "unresolved",
        _ => "type"
    };

    /// <summary>
    /// Derives a package name for an error type from its namespace or display string.
    /// For example, Sdk.Response -> "Sdk", Sdk.Core.Pipeline.HttpPipeline -> "Sdk.Core.Pipeline".
    /// </summary>
    private static string GetErrorTypePackageName(ITypeSymbol typeSymbol)
    {
        // Try containing namespace first
        var ns = typeSymbol.ContainingNamespace;
        if (ns != null && !ns.IsGlobalNamespace)
        {
            return ns.ToDisplayString();
        }

        // Fall back to qualified display name — strip generic arguments first
        // to avoid "Dictionary<string, System.Text.Json.JsonElement>" being misinterpreted
        var displayName = typeSymbol.ToDisplayString(SymbolDisplayFormat.FullyQualifiedFormat)
            .Replace("global::", "");
        var angleBracket = displayName.IndexOf('<');
        if (angleBracket > 0)
            displayName = displayName[..angleBracket];
        var lastDot = displayName.LastIndexOf('.');
        return lastDot > 0 ? displayName[..lastDot] : "unresolved";
    }

    /// <summary>
    /// Loads runtime metadata references (BCL assemblies). Cached for the process lifetime.
    /// Uses the actual .NET shared framework directory (where typeof(object) lives)
    /// rather than AppContext.BaseDirectory, which may not contain framework assemblies
    /// in framework-dependent deployments.
    /// </summary>
    private static IReadOnlyList<MetadataReference> LoadRuntimeReferences()
    {
        List<MetadataReference> references = [];

        // Use TPA (trusted platform assemblies) to reliably resolve runtime assemblies.
        // This works in both regular and single-file deployments where Assembly.Location
        // may be empty.
        var tpa = AppContext.GetData("TRUSTED_PLATFORM_ASSEMBLIES") as string;
        if (!string.IsNullOrWhiteSpace(tpa))
        {
            foreach (var dll in tpa.Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries))
            {
                if (!dll.EndsWith(".dll", StringComparison.OrdinalIgnoreCase))
                    continue;

                try { references.Add(MetadataReference.CreateFromFile(dll)); }
                catch (Exception ex) { Trace.TraceWarning("Failed to load runtime assembly '{0}': {1}", dll, ex.Message); }
            }

            if (references.Count > 0)
                return references;
        }

        var runtimeDir = AppContext.BaseDirectory;
        if (Directory.Exists(runtimeDir))
        {
            foreach (var dll in Directory.EnumerateFiles(runtimeDir, "*.dll"))
            {
                try { references.Add(MetadataReference.CreateFromFile(dll)); }
                catch (Exception ex) { Trace.TraceWarning("Failed to load runtime assembly '{0}': {1}", dll, ex.Message); }
            }
        }
        return references;
    }

    /// <summary>
    /// Loads metadata references from cached runtime assemblies and project-specific NuGet packages.
    /// Skips NuGet packages whose assemblies are already loaded from the runtime to avoid
    /// version conflicts (e.g., System.Text.Json 9.x from NuGet vs 10.x from runtime).
    /// </summary>
    private static IReadOnlyList<MetadataReference> LoadMetadataReferences(string rootPath)
    {
        var references = new List<MetadataReference>(s_runtimeReferences.Value);

        // Collect assembly file names already loaded from the runtime to skip duplicates
        var loadedAssemblyNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var r in s_runtimeReferences.Value)
        {
            if (r is PortableExecutableReference peRef && peRef.FilePath != null)
            {
                loadedAssemblyNames.Add(Path.GetFileNameWithoutExtension(peRef.FilePath));
            }
        }

        // Look for NuGet packages in common locations
        var nugetPackagesDir = FindNuGetPackagesDirectory(rootPath);
        if (nugetPackagesDir != null)
        {
            // Parse project file to find package references
            var packageRefs = ParseProjectPackageReferences(rootPath);

            foreach (var (packageName, version) in packageRefs)
            {
                var packageDir = Path.Combine(nugetPackagesDir, packageName.ToLowerInvariant(), version);
                if (!Directory.Exists(packageDir))
                {
                    // Try without version for floating versions
                    var packageBaseDir = Path.Combine(nugetPackagesDir, packageName.ToLowerInvariant());
                    if (Directory.Exists(packageBaseDir))
                    {
                        // Get the latest version
                        var versions = Directory.GetDirectories(packageBaseDir)
                            .Select(Path.GetFileName)
                            .OrderByDescending(v => ParseSemVerPrefix(v))
                            .FirstOrDefault();
                        if (versions != null)
                        {
                            packageDir = Path.Combine(packageBaseDir, versions);
                        }
                    }
                }

                if (Directory.Exists(packageDir))
                {
                    // Find the lib folder with the appropriate target framework
                    var libDir = FindBestTargetFramework(packageDir);
                    if (libDir != null)
                    {
                        foreach (var dll in Directory.GetFiles(libDir, "*.dll"))
                        {
                            // Skip assemblies already loaded from the runtime to avoid version conflicts
                            var assemblyName = Path.GetFileNameWithoutExtension(dll);
                            if (loadedAssemblyNames.Contains(assemblyName))
                                continue;

                            try { references.Add(MetadataReference.CreateFromFile(dll)); }
                            catch (Exception ex) { Trace.TraceWarning("Failed to load NuGet assembly '{0}': {1}", dll, ex.Message); }
                        }
                    }
                }
            }
        }

        return references;
    }

    /// <summary>
    /// Finds the NuGet packages directory.
    /// </summary>
    private static string? FindNuGetPackagesDirectory(string rootPath)
    {
        // Check for local packages folder
        var localPackages = Path.Combine(rootPath, "packages");
        if (Directory.Exists(localPackages)) return localPackages;

        // Check NUGET_PACKAGES environment variable
        var envPackages = Environment.GetEnvironmentVariable("NUGET_PACKAGES");
        if (!string.IsNullOrEmpty(envPackages) && Directory.Exists(envPackages))
            return envPackages;

        // Default locations
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var defaultDir = Path.Combine(homeDir, ".nuget", "packages");
        if (Directory.Exists(defaultDir)) return defaultDir;

        return null;
    }

    /// <summary>
    /// Parses package references from the project file.
    /// </summary>
    private static IReadOnlyList<(string Name, string Version)> ParseProjectPackageReferences(string rootPath)
    {
        List<(string, string)> results = [];

        var csproj = Directory.EnumerateFiles(rootPath, "*.csproj", SearchOption.TopDirectoryOnly).FirstOrDefault()
                  ?? Directory.EnumerateFiles(rootPath, "*.csproj", SearchOption.AllDirectories).FirstOrDefault();

        if (csproj == null) return results;

        try
        {
            var doc = LoadXmlSecure(csproj);
            var packageRefs = doc.Descendants()
                .Where(e => e.Name.LocalName == "PackageReference");

            foreach (var pr in packageRefs)
            {
                var name = pr.Attribute("Include")?.Value;
                var version = pr.Attribute("Version")?.Value ?? pr.Element(XName.Get("Version", pr.Name.NamespaceName))?.Value;

                if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(version))
                {
                    results.Add((name, version));
                }
            }
        }
        catch (Exception ex) when (ex is XmlException or IOException)
        {
            Trace.TraceWarning("Failed to parse package references from '{0}': {1}", csproj, ex.Message);
        }

        return results;
    }

    /// <summary>
    /// Finds the best target framework folder in a NuGet package.
    /// </summary>
    private static string? FindBestTargetFramework(string packageDir)
    {
        var libDir = Path.Combine(packageDir, "lib");
        if (!Directory.Exists(libDir)) return null;

        // Prefer newer frameworks
        var preferredFrameworks = new[]
        {
            "net10.0", "net9.0", "net8.0", "net7.0", "net6.0", "net5.0",
            "netstandard2.1", "netstandard2.0", "netstandard1.6", "netstandard1.0",
            "netcoreapp3.1", "netcoreapp3.0", "netcoreapp2.1", "netcoreapp2.0",
            "net48", "net472", "net471", "net47", "net462", "net461", "net46", "net45"
        };

        foreach (var fw in preferredFrameworks)
        {
            var fwDir = Path.Combine(libDir, fw);
            if (Directory.Exists(fwDir)) return fwDir;
        }

        // Fall back to any framework folder
        return Directory.GetDirectories(libDir).FirstOrDefault();
    }

    /// <summary>
    /// Parses a NuGet version string into a comparable <see cref="Version"/>, stripping pre-release suffixes.
    /// Handles SemVer correctly (e.g., "10.0.0" sorts after "9.0.0", unlike lexicographic sort).
    /// </summary>
    internal static Version ParseSemVerPrefix(string? version)
    {
        if (string.IsNullOrEmpty(version)) return new Version(0, 0);
        var dashIdx = version.IndexOf('-');
        var versionPart = dashIdx >= 0 ? version[..dashIdx] : version;
        return Version.TryParse(versionPart, out var v) ? v : new Version(0, 0);
    }
}
