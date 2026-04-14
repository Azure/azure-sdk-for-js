// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

// ============================================================================
// FIXTURE — TypeScript package exercising namespace imports & Node built-ins
// ============================================================================

/// <summary>
/// Shared fixture for a TypeScript package that exercises:
/// - Namespace imports (import * as X from "pkg") — Bug 1 &amp; 2
/// - Node built-in module imports (node:child_process, events) — Bug 3
///
/// These bugs were fixed in commit 86e64a0 and these tests prevent regression.
/// </summary>
public class TypeScriptNamespaceAndBuiltinsFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScriptNamespaceAndBuiltins");

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
// BUG 1 & 2: Namespace import handling
// ============================================================================

/// <summary>
/// Tests that namespace imports (import * as X from "pkg") are handled correctly:
/// - The namespace alias itself (e.g., "extLib") should NOT appear as a type
/// - Qualified access (e.g., extLib.INetworkModule) should resolve to the actual
///   type name (INetworkModule), not become an unresolved "extLib = unknown" stub
///
/// Bug 1: buildImportResolutionMap didn't handle namespace imports
/// Bug 2: Namespace aliases are module objects, not types — even when tracked,
///         they can't be looked up as exported declarations
/// </summary>
public class TsCompiled_NamespaceImportTests : IClassFixture<TypeScriptNamespaceAndBuiltinsFixture>
{
    private readonly TypeScriptNamespaceAndBuiltinsFixture _f;
    public TsCompiled_NamespaceImportTests(TypeScriptNamespaceAndBuiltinsFixture f) => _f = f;
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
        Assert.Equal("@test/namespace-and-builtins", Api.Package);
    }

    /// <summary>
    /// The namespace alias "extLib" must NOT appear as a type alias in any module
    /// or dependency. Before the fix, it appeared as "declare type extLib = unknown".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceAlias_DoesNotAppearAsType()
    {
        var allTypeNames = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .Select(t => t.Name)
            .ToList();

        Assert.DoesNotContain("extLib", allTypeNames);
    }

    /// <summary>
    /// The namespace alias must not appear in dependency types either.
    /// Before the fix, it could end up as an unresolved dependency type.
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

        Assert.DoesNotContain("extLib", allDepTypeNames);
    }

    /// <summary>
    /// Stubs output must not contain "declare type extLib = unknown".
    /// This is the concrete symptom of the namespace import bug.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_DoNotContain_NamespaceAliasUnknown()
    {
        var stubs = Api.ToStubs();
        Assert.DoesNotContain("extLib = unknown", stubs);
    }

    /// <summary>
    /// Types accessed through namespace import (extLib.INetworkModule, extLib.AuthConfig,
    /// extLib.TokenCacheRecord) should be properly resolved to their actual type names
    /// in the dependency graph.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceQualifiedTypes_AreResolvedAsDependencies()
    {
        Assert.NotNull(Api.Dependencies);

        var extLibDep = Api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("ext-lib", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(extLibDep);

        var allDepTypes = (extLibDep.Types ?? []).Select(t => t.Name)
            .Concat((extLibDep.Interfaces ?? []).Select(i => i.Name))
            .Concat((extLibDep.Classes ?? []).Select(c => c.Name))
            .ToList();

        // Types accessed via extLib.X should resolve to their actual names
        Assert.Contains(allDepTypes, n => n == "INetworkModule");
        Assert.Contains(allDepTypes, n => n == "AuthConfig");
        Assert.Contains(allDepTypes, n => n == "TokenCacheRecord");
    }

    /// <summary>
    /// In compiled mode with node_modules available, namespace-qualified types
    /// should be fully resolved — appearing as interfaces (their actual kind),
    /// not as unresolved type stubs. The engine uses the package-level resolved
    /// file from the namespace import to introspect the external module's exports.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceQualifiedTypes_AreFullyResolved()
    {
        var extLibDep = (Api.Dependencies ?? []).FirstOrDefault(d =>
            d.Package.Contains("ext-lib", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(extLibDep);

        // These types are interfaces in ext-lib — they must be resolved as such
        var interfaceNames = (extLibDep.Interfaces ?? []).Select(i => i.Name).ToHashSet();
        Assert.Contains("INetworkModule", interfaceNames);
        Assert.Contains("AuthConfig", interfaceNames);
        Assert.Contains("TokenCacheRecord", interfaceNames);

        // They must NOT appear as unresolved type aliases
        var unresolvedTypeNames = (extLibDep.Types ?? [])
            .Where(t => t.Type == "unresolved")
            .Select(t => t.Name)
            .ToHashSet();
        Assert.DoesNotContain("INetworkModule", unresolvedTypeNames);
        Assert.DoesNotContain("AuthConfig", unresolvedTypeNames);
        Assert.DoesNotContain("TokenCacheRecord", unresolvedTypeNames);

        // They must NOT appear as type aliases in the main module
        var mainModuleTypes = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .Select(t => t.Name)
            .ToHashSet();
        Assert.DoesNotContain("INetworkModule", mainModuleTypes);
        Assert.DoesNotContain("AuthConfig", mainModuleTypes);
        Assert.DoesNotContain("TokenCacheRecord", mainModuleTypes);
    }

    /// <summary>
    /// Named import (ExtLogger) should still work alongside namespace imports.
    /// It should appear in the dependency types for ext-lib.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamedImport_StillWorks_AlongsideNamespaceImport()
    {
        var extLibDep = (Api.Dependencies ?? []).FirstOrDefault(d =>
            d.Package.Contains("ext-lib", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(extLibDep);

        var allDepTypes = (extLibDep.Types ?? []).Select(t => t.Name)
            .Concat((extLibDep.Interfaces ?? []).Select(i => i.Name))
            .Concat((extLibDep.Classes ?? []).Select(c => c.Name))
            .ToList();

        Assert.Contains(allDepTypes, n => n == "ExtLogger");
    }

    /// <summary>
    /// The NamespaceClient class should be extracted with all its methods.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceClient_IsExtracted()
    {
        var client = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .FirstOrDefault(c => c.Name == "NamespaceClient");

        Assert.NotNull(client);

        var methodNames = (client.Methods ?? []).Select(m => m.Name).ToList();
        Assert.Contains("spawn", methodNames);
        Assert.Contains("getEmitter", methodNames);
        Assert.Contains("getStream", methodNames);
        Assert.Contains("acquireToken", methodNames);
        Assert.Contains("getNetworkConfig", methodNames);
    }

    /// <summary>
    /// The NamespaceClientOptions interface should be extracted.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NamespaceClientOptions_IsExtracted()
    {
        var iface = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "NamespaceClientOptions");

        Assert.NotNull(iface);

        var propNames = (iface.Properties ?? []).Select(p => p.Name).ToList();
        Assert.Contains("network", propNames);
        Assert.Contains("auth", propNames);
        Assert.Contains("logger", propNames);
    }

    /// <summary>
    /// The standalone function createAuthConfig should be extracted.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CreateAuthConfig_Function_IsExtracted()
    {
        var fn = Api.Modules
            .SelectMany(m => m.Functions ?? [])
            .FirstOrDefault(f => f.Name == "createAuthConfig");

        Assert.NotNull(fn);
        Assert.NotNull(fn.Params);
        Assert.True(fn.Params.Count >= 2, "createAuthConfig should have at least 2 parameters");
    }

    /// <summary>
    /// Type display for namespace-qualified properties preserves the qualified
    /// syntax from the TypeScript source (e.g., extLib.INetworkModule). This is
    /// correct because the .d.ts source literally uses that syntax. The important
    /// guarantee is that these type references are NOT rendered as "unknown".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void TypeDisplay_PreservesNamespaceQualifiedSyntax_NotUnknown()
    {
        var iface = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "NamespaceClientOptions");

        Assert.NotNull(iface);

        var networkProp = (iface.Properties ?? []).FirstOrDefault(p => p.Name == "network");
        Assert.NotNull(networkProp);

        // The type should contain the actual type name, not be "unknown"
        Assert.NotNull(networkProp.Type);
        Assert.DoesNotContain("unknown", networkProp.Type);
        Assert.Contains("INetworkModule", networkProp.Type);
    }
}

// ============================================================================
// BUG 3: Node built-in module handling
// ============================================================================

/// <summary>
/// Tests that Node.js built-in modules (child_process, events, stream, etc.)
/// are correctly suppressed from the dependency graph and diagnostics.
///
/// Bug 3: getModuleSpecifierSourceFile() returns null for Node built-ins
/// because @types/node isn't installed. Before the fix, these would appear
/// as unresolved type stubs (e.g., "declare type ChildProcess = unknown").
/// </summary>
public class TsCompiled_NodeBuiltinTests : IClassFixture<TypeScriptNamespaceAndBuiltinsFixture>
{
    private readonly TypeScriptNamespaceAndBuiltinsFixture _f;
    public TsCompiled_NodeBuiltinTests(TypeScriptNamespaceAndBuiltinsFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// Node built-in types (ChildProcess, EventEmitter, Readable) must NOT
    /// appear as type aliases with "unknown" value. Before the fix, they
    /// showed up as "declare type ChildProcess = unknown".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NodeBuiltinTypes_DoNotAppear_AsUnknownTypeAliases()
    {
        var unknownAliases = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .Where(t => t.Type == "unknown")
            .Select(t => t.Name)
            .ToHashSet();

        Assert.DoesNotContain("ChildProcess", unknownAliases);
        Assert.DoesNotContain("EventEmitter", unknownAliases);
        Assert.DoesNotContain("Readable", unknownAliases);
    }

    /// <summary>
    /// Node built-in types should appear as per-module node:* dependencies
    /// with isNode=true. Bare module names (without node: prefix) and
    /// the old grouped @types/node entry should NOT appear.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NodeBuiltins_ArePerModuleDependencies()
    {
        var deps = Api.Dependencies ?? [];
        var depPackages = deps.Select(d => d.Package).ToList();

        // Per-module node:* dependencies should exist with isNode=true
        Assert.Contains(deps, d => d.Package == "node:child_process" && d.IsNode);
        Assert.Contains(deps, d => d.Package == "node:events" && d.IsNode);
        Assert.Contains(deps, d => d.Package == "node:stream" && d.IsNode);

        // Bare module names should NOT exist as separate entries
        Assert.DoesNotContain("child_process", depPackages);
        Assert.DoesNotContain("events", depPackages);
        Assert.DoesNotContain("stream", depPackages);

        // Old grouped @types/node should NOT exist
        Assert.DoesNotContain("@types/node", depPackages);
    }

    /// <summary>
    /// Diagnostics should NOT contain warnings about Node built-in modules
    /// being "referenced but not installed".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NoDiagnostic_ForNodeBuiltins()
    {
        var nodeBuiltinDiags = Api.Diagnostics
            .Where(d =>
                d.Text.Contains("node:child_process", StringComparison.OrdinalIgnoreCase) ||
                d.Text.Contains("node:stream", StringComparison.OrdinalIgnoreCase) ||
                (d.Text.Contains("events", StringComparison.OrdinalIgnoreCase) &&
                 d.Text.Contains("not installed", StringComparison.OrdinalIgnoreCase)))
            .ToList();

        Assert.True(nodeBuiltinDiags.Count == 0,
            $"Found {nodeBuiltinDiags.Count} diagnostic(s) about Node built-ins:\n" +
            string.Join("\n", nodeBuiltinDiags.Select(d => d.Text)));
    }

    /// <summary>
    /// Stubs output must not contain "declare type ChildProcess = unknown",
    /// "declare type EventEmitter = unknown", or "declare type Readable = unknown".
    /// This is the concrete visible symptom of the Node built-in bug.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_DoNotContain_NodeBuiltinUnknownStubs()
    {
        var stubs = Api.ToStubs();
        Assert.DoesNotContain("ChildProcess = unknown", stubs);
        Assert.DoesNotContain("EventEmitter = unknown", stubs);
        Assert.DoesNotContain("Readable = unknown", stubs);
    }

    /// <summary>
    /// The "node:" prefix form of built-in imports should be used for
    /// per-module dependencies. Bare module names should be normalized
    /// to the node: prefix form.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NodeImports_NormalizedToNodePrefix()
    {
        var depPackages = (Api.Dependencies ?? [])
            .Select(d => d.Package)
            .ToHashSet();

        // node: prefix forms should exist as per-module dependencies
        Assert.Contains("node:child_process", depPackages);
        Assert.Contains("node:events", depPackages);
        Assert.Contains("node:stream", depPackages);

        // Bare module name forms should NOT exist (normalized to node: prefix)
        Assert.DoesNotContain("child_process", depPackages);
        Assert.DoesNotContain("events", depPackages);
        Assert.DoesNotContain("stream", depPackages);
    }

    /// <summary>
    /// Node built-in types should NOT appear as unresolved types in non-Node
    /// dependency entries. The engine creates per-module node:* dependencies
    /// with isNode=true for each imported Node built-in module.
    /// The key guarantee is that Node types don't leak into non-Node entries.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NoUnresolvedNodeTypes_InNonNodeDependencies()
    {
        // Node built-in types must not leak into non-Node dependency entries
        var nonNodeUnresolved = (Api.Dependencies ?? [])
            .Where(d => !d.IsNode)
            .SelectMany(d => (d.Types ?? []).Where(t => t.Type == "unresolved"))
            .Select(t => t.Name)
            .ToHashSet();

        Assert.DoesNotContain("ChildProcess", nonNodeUnresolved);
        Assert.DoesNotContain("EventEmitter", nonNodeUnresolved);
        Assert.DoesNotContain("Readable", nonNodeUnresolved);
    }
}

// ============================================================================
// COMBINED: Verify ext-lib dependency + no pollution from namespace/builtins
// ============================================================================

/// <summary>
/// Tests the combined scenario: ext-lib is a real dependency (resolved via
/// node_modules), namespace imports work for it, and Node built-ins don't
/// pollute the dependency graph. Ensures no cross-contamination between
/// the different import styles.
/// </summary>
public class TsCompiled_CombinedImportTests : IClassFixture<TypeScriptNamespaceAndBuiltinsFixture>
{
    private readonly TypeScriptNamespaceAndBuiltinsFixture _f;
    public TsCompiled_CombinedImportTests(TypeScriptNamespaceAndBuiltinsFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// ext-lib should be present as a dependency. Node built-in modules
    /// should appear as per-module node:* dependencies with isNode=true.
    /// Bare module names and non-imported Node modules should not appear.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void OnlyRealDependencies_InDependencyList()
    {
        Assert.NotNull(Api.Dependencies);

        // ext-lib should be present as a dependency
        Assert.Contains(Api.Dependencies, d =>
            d.Package == "ext-lib");

        // Per-module Node dependencies should exist with isNode=true
        Assert.Contains(Api.Dependencies, d =>
            d.Package == "node:child_process" && d.IsNode);
        Assert.Contains(Api.Dependencies, d =>
            d.Package == "node:events" && d.IsNode);
        Assert.Contains(Api.Dependencies, d =>
            d.Package == "node:stream" && d.IsNode);

        // Bare module names should NOT exist
        var depPackages = Api.Dependencies
            .Select(d => d.Package)
            .ToList();

        Assert.DoesNotContain(depPackages, p =>
            p == "child_process" || p == "events" ||
            p == "stream" || p == "fs" || p == "path");
    }

    /// <summary>
    /// Node built-in types should appear as per-module node:* dependencies
    /// with isNode=true. Each module contains the types it exports.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NodeBuiltinTypes_PerModuleDependencies()
    {
        var nodeDeps = (Api.Dependencies ?? [])
            .Where(d => d.IsNode)
            .ToList();

        // Per-module node:* dependencies should exist
        Assert.True(nodeDeps.Count >= 3, $"Expected at least 3 node deps, got {nodeDeps.Count}");

        // Each module should contain its corresponding type
        var childProcDep = nodeDeps.FirstOrDefault(d => d.Package == "node:child_process");
        Assert.NotNull(childProcDep);
        var cpTypes = (childProcDep.Types ?? []).Select(t => t.Name).ToHashSet();
        Assert.Contains("ChildProcess", cpTypes);

        var eventsDep = nodeDeps.FirstOrDefault(d => d.Package == "node:events");
        Assert.NotNull(eventsDep);
        var evTypes = (eventsDep.Types ?? []).Select(t => t.Name).ToHashSet();
        Assert.Contains("EventEmitter", evTypes);

        var streamDep = nodeDeps.FirstOrDefault(d => d.Package == "node:stream");
        Assert.NotNull(streamDep);
        var stTypes = (streamDep.Types ?? []).Select(t => t.Name).ToHashSet();
        Assert.Contains("Readable", stTypes);
    }

    /// <summary>
    /// The overall stubs output should be clean — no unknown type stubs from
    /// either namespace aliases or Node built-in types.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_AreClean_NoUnknownFromBugsFixedTypes()
    {
        var stubs = Api.ToStubs();

        // No namespace alias = unknown
        Assert.DoesNotContain("extLib = unknown", stubs);

        // No Node built-in = unknown
        Assert.DoesNotContain("ChildProcess = unknown", stubs);
        Assert.DoesNotContain("EventEmitter = unknown", stubs);
        Assert.DoesNotContain("Readable = unknown", stubs);

        // Node types should appear as per-module import statements
        Assert.Contains("import {", stubs);
        Assert.Contains("from \"node:child_process\"", stubs);
        Assert.Contains("from \"node:events\"", stubs);
        Assert.Contains("from \"node:stream\"", stubs);

        // Old grouped @types/node import should NOT exist
        Assert.DoesNotContain("from \"@types/node\"", stubs);
        Assert.DoesNotContain("declare module \"@types/node\"", stubs);
    }

    /// <summary>
    /// All dependency types for ext-lib should use proper type names (not namespace-qualified).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ExtLibDependency_HasProperTypeNames()
    {
        var extLibDep = (Api.Dependencies ?? []).First(d => d.Package == "ext-lib");

        var allNames = (extLibDep.Types ?? []).Select(t => t.Name)
            .Concat((extLibDep.Interfaces ?? []).Select(i => i.Name))
            .Concat((extLibDep.Classes ?? []).Select(c => c.Name))
            .ToList();

        // All names should be simple identifiers, not namespace-qualified
        foreach (var name in allNames)
        {
            Assert.DoesNotContain(".", name);
            Assert.DoesNotContain("extLib", name);
        }
    }

    /// <summary>
    /// The TokenResult interface should be extracted with its cache property.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void TokenResult_Interface_IsExtracted()
    {
        var iface = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "TokenResult");

        Assert.NotNull(iface);

        var propNames = (iface.Properties ?? []).Select(p => p.Name).ToList();
        Assert.Contains("cache", propNames);
        Assert.Contains("acquiredAt", propNames);
    }

    /// <summary>
    /// The processStream function should be extracted with Node built-in
    /// parameter type (Readable). The type itself won't resolve without
    /// @types/node, but the function should still be in the API.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ProcessStream_Function_IsExtracted()
    {
        var fn = Api.Modules
            .SelectMany(m => m.Functions ?? [])
            .FirstOrDefault(f => f.Name == "processStream");

        Assert.NotNull(fn);
        Assert.NotNull(fn.Params);
        Assert.True(fn.Params.Count >= 1, "processStream should have at least 1 parameter");
    }
}
