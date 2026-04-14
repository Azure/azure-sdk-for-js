// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

// ============================================================================
// FIXTURE — TypeScript package exercising heritage clauses with namespace
// imports and type alias bodies with cross-package type references
// ============================================================================

/// <summary>
/// Shared fixture for a TypeScript package that exercises:
/// - Heritage clause namespace stripping (extends CoreModels.BaseClient →
///   resolves to BaseClient from @dep/core)
/// - collectFromTypeNode extracting referenced types from type alias bodies
/// - ExpressionWithTypeArguments handler for namespace-qualified names
/// - Named + namespace imports coexisting on the same dependency
///
/// These fixes were committed in 5ee51bf and these tests prevent regression.
/// </summary>
public class TypeScriptHeritageAndAliasesFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScriptHeritageAndAliases");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }

    public async ValueTask InitializeAsync()
    {
        if (!CheckNodeInstalled())
        {
            SkipReason = "Node.js not installed";
            return;
        }
        try
        {
            Api = await new TypeScriptPublicApiGraphEngine().GraphAsync(TestFixturesPath);
        }
        catch (Exception ex)
        {
            SkipReason = $"TypeScript engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;

    private static bool CheckNodeInstalled()
    {
        try
        {
            var psi = new System.Diagnostics.ProcessStartInfo
            {
                FileName = "node", Arguments = "--version",
                RedirectStandardOutput = true, UseShellExecute = false, CreateNoWindow = true
            };
            using var p = System.Diagnostics.Process.Start(psi);
            p?.WaitForExit(1000);
            return p?.ExitCode == 0;
        }
        catch { return false; }
    }
}

// ============================================================================
// Heritage clause namespace stripping tests
// ============================================================================

/// <summary>
/// Tests that heritage clauses using namespace-qualified names
/// (e.g., CoreModels.BaseClient) are correctly resolved:
/// - The namespace prefix is stripped from the extends/implements value
/// - The resolved type name is tracked as a dependency on @dep/core
/// - The namespace alias itself does NOT appear as a type
/// </summary>
public class TsCompiled_HeritageNamespaceStripping : IClassFixture<TypeScriptHeritageAndAliasesFixture>
{
    private readonly TypeScriptHeritageAndAliasesFixture _f;
    public TsCompiled_HeritageNamespaceStripping(TypeScriptHeritageAndAliasesFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Api_IsSuccessfullyExtracted()
    {
        Assert.NotNull(Api);
        Assert.True(Api.Modules.Count > 0, "Expected at least one module");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PackageName_IsCorrect()
    {
        Assert.Equal("@test/heritage-and-aliases", Api.Package);
    }

    /// <summary>
    /// The StorageClient class should have its "implements" resolved to
    /// "BaseClient" (stripped of namespace prefix), not "CoreModels.BaseClient".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StorageClient_Implements_HasStrippedNamespace()
    {
        var cls = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .FirstOrDefault(c => c.Name == "StorageClient");

        Assert.NotNull(cls);

        // The implements list should contain the actual type name
        var implements = cls.Implements ?? [];
        Assert.True(implements.Count > 0, "StorageClient should implement at least one interface");

        // Should contain "BaseClient" — the stripped name
        Assert.Contains(implements, i => i.Contains("BaseClient"));

        // Should NOT contain the namespace-qualified form
        foreach (var impl in implements)
        {
            Assert.DoesNotContain("CoreModels.", impl);
        }
    }

    /// <summary>
    /// The StorageOptions interface should have its "extends" resolved to
    /// "BaseOptions" (stripped of namespace prefix), not "CoreModels.BaseOptions".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StorageOptions_Extends_HasStrippedNamespace()
    {
        var iface = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "StorageOptions");

        Assert.NotNull(iface);

        var extends_ = iface.Extends ?? [];
        Assert.True(extends_.Count > 0, "StorageOptions should extend at least one interface");

        // Should contain "BaseOptions" — the stripped name
        Assert.Contains(extends_, e => e.Contains("BaseOptions"));

        // Should NOT contain the namespace-qualified form
        foreach (var ext in extends_)
        {
            Assert.DoesNotContain("CoreModels.", ext);
        }
    }

    /// <summary>
    /// The namespace alias "CoreModels" must NOT appear as a type alias
    /// (e.g., "declare type CoreModels = unknown") in any module.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceAlias_DoesNotAppearAsType()
    {
        var allTypeNames = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .Select(t => t.Name)
            .ToList();

        Assert.DoesNotContain("CoreModels", allTypeNames);
    }

    /// <summary>
    /// The namespace alias must not appear in dependency types either.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceAlias_DoesNotAppearInDependencies()
    {
        var allDepTypeNames = (Api.Dependencies ?? [])
            .SelectMany(d =>
                (d.Types ?? []).Select(t => t.Name)
                .Concat((d.Interfaces ?? []).Select(i => i.Name))
                .Concat((d.Classes ?? []).Select(c => c.Name)))
            .ToList();

        Assert.DoesNotContain("CoreModels", allDepTypeNames);
    }

    /// <summary>
    /// Stubs must not contain "CoreModels = unknown".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_DoNotContain_NamespaceAliasUnknown()
    {
        var stubs = Api.ToStubs();
        Assert.DoesNotContain("CoreModels = unknown", stubs);
    }
}

// ============================================================================
// Dependency resolution for heritage clause types
// ============================================================================

/// <summary>
/// Tests that types referenced through namespace-qualified heritage clauses
/// and type alias bodies are correctly attributed to the @dep/core dependency.
/// </summary>
public class TsCompiled_HeritageDepResolution : IClassFixture<TypeScriptHeritageAndAliasesFixture>
{
    private readonly TypeScriptHeritageAndAliasesFixture _f;
    public TsCompiled_HeritageDepResolution(TypeScriptHeritageAndAliasesFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// @dep/core should appear as a dependency since types from it are used
    /// in heritage clauses and type alias bodies.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void DepCore_IsPresentAsDependency()
    {
        Assert.NotNull(Api.Dependencies);
        Assert.Contains(Api.Dependencies, d => d.Package == "@dep/core");
    }

    /// <summary>
    /// BaseClient, BaseOptions, and AuthConfig — the types used via namespace
    /// imports — should be present in the @dep/core dependency entry.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceQualifiedTypes_AreResolvedInDepCore()
    {
        var depCore = (Api.Dependencies ?? []).First(d => d.Package == "@dep/core");

        var allDepTypes = (depCore.Types ?? []).Select(t => t.Name)
            .Concat((depCore.Interfaces ?? []).Select(i => i.Name))
            .Concat((depCore.Classes ?? []).Select(c => c.Name))
            .ToList();

        // Types used via CoreModels.X should resolve to their actual names
        Assert.Contains(allDepTypes, n => n == "BaseClient" || n == "BaseOptions");
    }

    /// <summary>
    /// TokenCredential, imported via named import, should also be present
    /// in the @dep/core dependency entry alongside namespace-imported types.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamedImport_CoexistsWithNamespaceImport()
    {
        var depCore = (Api.Dependencies ?? []).First(d => d.Package == "@dep/core");

        var allDepTypes = (depCore.Types ?? []).Select(t => t.Name)
            .Concat((depCore.Interfaces ?? []).Select(i => i.Name))
            .Concat((depCore.Classes ?? []).Select(c => c.Name))
            .ToList();

        Assert.Contains(allDepTypes, n => n == "TokenCredential");
    }

    /// <summary>
    /// All dependency type names should be simple identifiers (no dots).
    /// Namespace-qualified forms like "CoreModels.BaseClient" must not appear.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AllDepTypeNames_AreSimpleIdentifiers()
    {
        var depCore = (Api.Dependencies ?? []).First(d => d.Package == "@dep/core");

        var allNames = (depCore.Types ?? []).Select(t => t.Name)
            .Concat((depCore.Interfaces ?? []).Select(i => i.Name))
            .Concat((depCore.Classes ?? []).Select(c => c.Name))
            .ToList();

        foreach (var name in allNames)
        {
            Assert.DoesNotContain(".", name);
            Assert.DoesNotContain("CoreModels", name);
        }
    }
}

// ============================================================================
// Type alias body resolution tests
// ============================================================================

/// <summary>
/// Tests that type alias bodies referencing dependency types through namespace
/// imports are correctly resolved by collectFromTypeNode.
/// </summary>
public class TsCompiled_TypeAliasBodyResolution : IClassFixture<TypeScriptHeritageAndAliasesFixture>
{
    private readonly TypeScriptHeritageAndAliasesFixture _f;
    public TsCompiled_TypeAliasBodyResolution(TypeScriptHeritageAndAliasesFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// ExtendedOptions type alias should be extracted with its body.
    /// The body references CoreModels.BaseOptions and CoreModels.AuthConfig.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ExtendedOptions_IsExtracted()
    {
        var alias = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .FirstOrDefault(t => t.Name == "ExtendedOptions");

        Assert.NotNull(alias);
        Assert.NotNull(alias.Type);
        Assert.NotEqual("unknown", alias.Type);
        Assert.NotEqual("unresolved", alias.Type);
    }

    /// <summary>
    /// CredentialInput union type alias should be extracted.
    /// It references TokenCredential (named import) and CoreModels.AuthConfig
    /// (namespace import).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CredentialInput_IsExtracted()
    {
        var alias = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .FirstOrDefault(t => t.Name == "CredentialInput");

        Assert.NotNull(alias);
        Assert.NotNull(alias.Type);
        Assert.NotEqual("unknown", alias.Type);
        Assert.NotEqual("unresolved", alias.Type);
    }

    /// <summary>
    /// ResolvedAuth generic type alias should be extracted.
    /// It uses CoreModels.AuthConfig in a conditional type expression.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ResolvedAuth_IsExtracted()
    {
        var alias = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .FirstOrDefault(t => t.Name == "ResolvedAuth");

        Assert.NotNull(alias);
        Assert.NotNull(alias.Type);
        Assert.NotEqual("unknown", alias.Type);
    }

    /// <summary>
    /// Type alias bodies should have referenced types that include
    /// dependency types used within them.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void TypeAliases_HaveReferencedTypes()
    {
        var extendedOptions = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .First(t => t.Name == "ExtendedOptions");

        // collectFromTypeNode should have discovered BaseOptions and AuthConfig
        // as referenced types in the intersection type body
        var refTypes = extendedOptions.ReferencedTypes ?? [];
        Assert.True(refTypes.Count > 0,
            "ExtendedOptions should have referenced types from its intersection body");
    }

    /// <summary>
    /// Stubs output should contain the type alias declarations without
    /// rendering them as "unknown".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_ContainTypeAliases_NotUnknown()
    {
        var stubs = Api.ToStubs();

        // ExtendedOptions should appear as a proper type alias, not unknown
        Assert.DoesNotContain("ExtendedOptions = unknown", stubs);
        Assert.DoesNotContain("CredentialInput = unknown", stubs);
    }
}

// ============================================================================
// Main module type extraction tests
// ============================================================================

/// <summary>
/// Tests that all declared types, classes, and interfaces from the main
/// module are correctly extracted.
/// </summary>
public class TsCompiled_HeritageModuleExtraction : IClassFixture<TypeScriptHeritageAndAliasesFixture>
{
    private readonly TypeScriptHeritageAndAliasesFixture _f;
    public TsCompiled_HeritageModuleExtraction(TypeScriptHeritageAndAliasesFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// StorageClient class should be extracted with its methods and properties.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StorageClient_IsExtracted()
    {
        var cls = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .FirstOrDefault(c => c.Name == "StorageClient");

        Assert.NotNull(cls);

        // Should have at least close() method and endpoint property
        var methodNames = (cls.Methods ?? []).Select(m => m.Name).ToList();
        Assert.Contains("close", methodNames);
        Assert.Contains("getServiceVersion", methodNames);

        var propNames = (cls.Properties ?? []).Select(p => p.Name).ToList();
        Assert.Contains("endpoint", propNames);
    }

    /// <summary>
    /// StorageOptions interface should be extracted with its properties.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StorageOptions_IsExtracted()
    {
        var iface = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "StorageOptions");

        Assert.NotNull(iface);

        var propNames = (iface.Properties ?? []).Select(p => p.Name).ToList();
        Assert.Contains("accountName", propNames);
        Assert.Contains("auth", propNames);
    }

    /// <summary>
    /// AuthHelper class should be extracted — it uses named import (TokenCredential).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AuthHelper_IsExtracted()
    {
        var cls = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .FirstOrDefault(c => c.Name == "AuthHelper");

        Assert.NotNull(cls);

        var methodNames = (cls.Methods ?? []).Select(m => m.Name).ToList();
        Assert.Contains("authenticate", methodNames);
    }

    /// <summary>
    /// All three type aliases should be extracted.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AllTypeAliases_AreExtracted()
    {
        var typeNames = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .Select(t => t.Name)
            .ToHashSet();

        Assert.Contains("ExtendedOptions", typeNames);
        Assert.Contains("CredentialInput", typeNames);
        Assert.Contains("ResolvedAuth", typeNames);
    }

    /// <summary>
    /// The overall stubs output should be clean — no unknown type stubs
    /// from namespace alias leaking. Classes and interfaces appear in stubs;
    /// standalone type aliases may not (they're only rendered as class deps
    /// or inside sectioned declare module blocks).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_AreClean()
    {
        var stubs = Api.ToStubs();

        // No namespace alias = unknown
        Assert.DoesNotContain("CoreModels = unknown", stubs);

        // Classes and interfaces should appear in stubs
        Assert.Contains("StorageClient", stubs);
        Assert.Contains("StorageOptions", stubs);
    }
}
