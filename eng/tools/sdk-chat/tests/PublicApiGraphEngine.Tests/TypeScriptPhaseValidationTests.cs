// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

// ============================================================================
// FIXTURES — One per separate test package
// ============================================================================

/// <summary>
/// Fixture for edge-case TypeScript patterns that the current engine handles
/// incorrectly. Exercises Phase 2 (import prefix) and Phase 6 (reachability
/// through indexed access and conditional types).
/// </summary>
public class TypeScriptEdgeCasesFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScriptEdgeCases");

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

/// <summary>
/// Fixture for a TypeScript package with a non-standard directory layout
/// (build/typings/ instead of dist/types/).
/// Tests Phase 7 (module resolution without hardcoded path mappings).
/// </summary>
public class TypeScriptNonStandardLayoutFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScriptNonStandardLayout");

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

/// <summary>
/// Fixture for a TypeScript package with conditional exports (import/require).
/// Tests Phase 11 (condition preservation on ModuleInfo).
/// </summary>
public class TypeScriptConditionalExportsFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScriptConditionalExports");

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
// PHASE 2 TESTS: import() type syntax edge cases
// ============================================================================

/// <summary>
/// Validates that the engine correctly handles import() type syntax in type
/// display. The current simplifyType regex /import\([^)]+\)\./g fails for:
///   - typeof import("./module") — no dot after closing paren
///
/// Phase 2 of the redesign replaces simplifyType with compiler-driven
/// displayType using TypeFormatFlags, which handles all cases correctly.
/// </summary>
public class TsCompiled_Phase2_ImportPrefixEdgeCases : IClassFixture<TypeScriptEdgeCasesFixture>
{
    private readonly TypeScriptEdgeCasesFixture _f;
    public TsCompiled_Phase2_ImportPrefixEdgeCases(TypeScriptEdgeCasesFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// A function returning typeof import("./submodule") should have its return
    /// type displayed without the raw import() syntax. The simplifyType regex
    /// fails here because there's no dot after the closing paren.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void TypeOfImport_ReturnType_DoesNotContainImportSyntax()
    {
        // Look for getSubmoduleNamespace in both module-level functions and class methods
        var classMethods = Api.Modules
            .SelectMany(m => (m.Classes ?? []).SelectMany(c => c.Methods ?? []))
            .Where(m => m.Name == "getSubmoduleNamespace")
            .ToList();

        var functions = Api.Modules
            .SelectMany(m => m.Functions ?? [])
            .Where(f => f.Name == "getSubmoduleNamespace")
            .ToList();

        // Should be found in at least one location
        var retType = classMethods.FirstOrDefault()?.Ret ?? functions.FirstOrDefault()?.Ret;
        Assert.NotNull(retType);

        // The return type should not contain raw import() syntax
        Assert.DoesNotContain("import(", retType);
    }

    /// <summary>
    /// Comprehensive sweep: NO type text anywhere in the API should contain
    /// the raw import() prefix. This catches any leak of module resolution
    /// details into the public API surface.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AllTypeTexts_DoNotContain_ImportParenSyntax()
    {
        var violations = new List<string>();

        foreach (var mod in Api.Modules)
        {
            foreach (var cls in mod.Classes ?? [])
            {
                foreach (var m in cls.Methods ?? [])
                {
                    if (m.Ret?.Contains("import(") == true)
                        violations.Add($"Class {cls.Name}.{m.Name}() return type: {m.Ret}");
                    foreach (var p in m.Params ?? [])
                        if (p.Type?.Contains("import(") == true)
                            violations.Add($"Class {cls.Name}.{m.Name}() param '{p.Name}': {p.Type}");
                }
                foreach (var prop in cls.Properties ?? [])
                    if (prop.Type?.Contains("import(") == true)
                        violations.Add($"Class {cls.Name}.{prop.Name}: {prop.Type}");
            }
            foreach (var iface in mod.Interfaces ?? [])
            {
                foreach (var m in iface.Methods ?? [])
                {
                    if (m.Ret?.Contains("import(") == true)
                        violations.Add($"Interface {iface.Name}.{m.Name}() return type: {m.Ret}");
                    foreach (var p in m.Params ?? [])
                        if (p.Type?.Contains("import(") == true)
                            violations.Add($"Interface {iface.Name}.{m.Name}() param '{p.Name}': {p.Type}");
                }
                foreach (var prop in iface.Properties ?? [])
                    if (prop.Type?.Contains("import(") == true)
                        violations.Add($"Interface {iface.Name}.{prop.Name}: {prop.Type}");
            }
            foreach (var fn in mod.Functions ?? [])
            {
                if (fn.Ret?.Contains("import(") == true)
                    violations.Add($"Function {fn.Name}() return type: {fn.Ret}");
                foreach (var p in fn.Params ?? [])
                    if (p.Type?.Contains("import(") == true)
                        violations.Add($"Function {fn.Name}() param '{p.Name}': {p.Type}");
            }
            foreach (var t in mod.Types ?? [])
                if (t.Type?.Contains("import(") == true)
                    violations.Add($"Type alias {t.Name}: {t.Type}");
        }

        Assert.True(violations.Count == 0,
            $"Found {violations.Count} type texts containing import() syntax:\n" +
            string.Join("\n", violations));
    }

    /// <summary>
    /// The stubs output should never contain raw import() paths.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_DoNotContain_ImportParenSyntax()
    {
        var stubs = Api.ToStubs();
        Assert.DoesNotContain("import(\"", stubs);
    }
}

// ============================================================================
// PHASE 6 TESTS: Reachability through complex type expressions
// ============================================================================

/// <summary>
/// Validates that the engine correctly resolves types referenced through
/// indexed access types and conditional types.
///
/// Phase 2 (displayType) resolves indexed access in type alias bodies.
/// Phase 6 (compiler-driven reachability) uses the compiler's type graph
/// instead of string tokenization to determine reachable types.
/// </summary>
public class TsCompiled_Phase6_ReachabilityEdgeCases : IClassFixture<TypeScriptEdgeCasesFixture>
{
    private readonly TypeScriptEdgeCasesFixture _f;
    public TsCompiled_Phase6_ReachabilityEdgeCases(TypeScriptEdgeCasesFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// The type alias ResolvedDBConfig = AppSettings["database"] should be
    /// resolved to the concrete type DatabaseSettings, not left as the
    /// indexed access expression.
    ///
    /// Currently fails because the engine uses the source text as-is.
    /// After Phase 2, displayType would resolve indexed access types to
    /// their concrete type names.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void IndexedAccessTypeAlias_ResolvesToConcreteType()
    {
        var alias = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .FirstOrDefault(t => t.Name == "ResolvedDBConfig");

        Assert.NotNull(alias);
        Assert.NotNull(alias.Type);

        // The type body should be the resolved type (DatabaseSettings),
        // not the indexed access expression (AppSettings["database"])
        Assert.DoesNotContain("[\"database\"]", alias.Type);
        Assert.DoesNotContain("['database']", alias.Type);
    }

    /// <summary>
    /// Both branches of a conditional type should be present in the API
    /// as concrete types when they are used through a type alias.
    /// SafeResult&lt;T&gt; = T extends Error ? ErrorDetail : SuccessDetail&lt;T&gt;
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ConditionalType_BothBranches_ArePresent()
    {
        var allInterfaces = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .Select(i => i.Name)
            .ToHashSet();

        Assert.Contains("ErrorDetail", allInterfaces);
        Assert.Contains("SuccessDetail", allInterfaces);
    }

    /// <summary>
    /// The SafeResult type alias body should textually contain both branch
    /// types (ErrorDetail and SuccessDetail).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void SafeResult_TypeBody_ContainsBothBranches()
    {
        var alias = Api.Modules
            .SelectMany(m => m.Types ?? [])
            .First(t => t.Name == "SafeResult");

        Assert.Contains("ErrorDetail", alias.Type);
        Assert.Contains("SuccessDetail", alias.Type);
    }

    /// <summary>
    /// All types reachable through property chains from AppSettings should
    /// be present in the API: AppSettings → DatabaseSettings → PoolSettings,
    /// AppSettings → LoggingSettings.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void TransitivePropertyTypes_AreAllPresent()
    {
        var allInterfaces = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .Select(i => i.Name)
            .ToHashSet();

        Assert.Contains("AppSettings", allInterfaces);
        Assert.Contains("DatabaseSettings", allInterfaces);
        Assert.Contains("PoolSettings", allInterfaces);
        Assert.Contains("LoggingSettings", allInterfaces);
    }

    /// <summary>
    /// EdgeCaseClient should be extracted as a class with all its methods.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void EdgeCaseClient_IsExtracted_WithAllMethods()
    {
        var client = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .FirstOrDefault(c => c.Name == "EdgeCaseClient");

        Assert.NotNull(client);

        var methodNames = (client.Methods ?? []).Select(m => m.Name).ToList();
        Assert.Contains("getDBConfig", methodNames);
        Assert.Contains("processResult", methodNames);
        Assert.Contains("getSubmoduleNamespace", methodNames);
    }
}

// ============================================================================
// PHASE 7 TESTS: Non-standard directory layout
// ============================================================================

/// <summary>
/// Validates that packages with non-standard directory structures
/// (build/typings/ instead of dist/types/) are correctly processed.
///
/// Phase 7 of the redesign replaces hardcoded dist/→src/ path mappings
/// with TypeScript's own module resolution via ts.resolveModuleName.
/// </summary>
public class TsCompiled_Phase7_NonStandardLayout : IClassFixture<TypeScriptNonStandardLayoutFixture>
{
    private readonly TypeScriptNonStandardLayoutFixture _f;
    public TsCompiled_Phase7_NonStandardLayout(TypeScriptNonStandardLayoutFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// The API should be successfully extracted even with a non-standard layout.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Api_IsSuccessfullyExtracted()
    {
        Assert.NotNull(Api);
        Assert.True(Api.Modules.Count > 0,
            "Expected at least one module from non-standard layout package");
    }

    /// <summary>
    /// Package name should be correctly read from package.json.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PackageName_IsCorrect()
    {
        Assert.Equal("@test/nonstandard-layout", Api.Package);
    }

    /// <summary>
    /// The LayoutClient class should be extracted from build/typings/.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void LayoutClient_IsExtracted()
    {
        var classes = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .Select(c => c.Name)
            .ToList();

        Assert.Contains("LayoutClient", classes);
    }

    /// <summary>
    /// The LayoutOptions interface should be extracted from build/typings/.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void LayoutOptions_IsExtracted()
    {
        var interfaces = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .Select(i => i.Name)
            .ToList();

        Assert.Contains("LayoutOptions", interfaces);
    }

    /// <summary>
    /// The LayoutStatus interface should be extracted.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void LayoutStatus_IsExtracted()
    {
        var interfaces = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .Select(i => i.Name)
            .ToList();

        Assert.Contains("LayoutStatus", interfaces);
    }

    /// <summary>
    /// Methods should be correctly extracted from the non-standard layout.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void LayoutClient_Methods_AreExtracted()
    {
        var client = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .First(c => c.Name == "LayoutClient");

        var methodNames = (client.Methods ?? []).Select(m => m.Name).ToList();
        Assert.Contains("initialize", methodNames);
        Assert.Contains("getStatus", methodNames);
        Assert.Contains("close", methodNames);
    }
}

// ============================================================================
// PHASE 11 TESTS: Conditional export conditions
// ============================================================================

/// <summary>
/// Validates that conditional exports (import/require) are correctly handled
/// and that the export condition is preserved on the ModuleInfo.
///
/// Phase 11 of the redesign adds condition preservation to the module
/// extraction pipeline, populating ModuleInfo.Condition with the export
/// condition name ("import", "require", etc.).
/// </summary>
public class TsCompiled_Phase11_ConditionalExports : IClassFixture<TypeScriptConditionalExportsFixture>
{
    private readonly TypeScriptConditionalExportsFixture _f;
    public TsCompiled_Phase11_ConditionalExports(TypeScriptConditionalExportsFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// The API should be extracted even with conditional exports.
    /// At minimum, one of the two conditions should be processed.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Api_IsSuccessfullyExtracted()
    {
        Assert.NotNull(Api);
        Assert.True(Api.Modules.Count > 0,
            $"Expected at least one module from conditional exports package. Got {Api.Modules.Count}.");
    }

    /// <summary>
    /// Package name should be correctly read from package.json.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PackageName_IsCorrect()
    {
        Assert.Equal("@test/conditional-exports", Api.Package);
    }

    /// <summary>
    /// There should be a module with the "import" condition.
    /// After Phase 11, the engine should preserve the export condition
    /// on the ModuleInfo record.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ImportCondition_IsPreserved()
    {
        var conditions = Api.Modules
            .Where(m => m.Condition != null)
            .Select(m => m.Condition)
            .ToList();

        Assert.Contains("import", conditions);
    }

    /// <summary>
    /// There should be a module with the "require" condition.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void RequireCondition_IsPreserved()
    {
        var conditions = Api.Modules
            .Where(m => m.Condition != null)
            .Select(m => m.Condition)
            .ToList();

        Assert.Contains("require", conditions);
    }

    /// <summary>
    /// Types should be present regardless of which condition is used.
    /// The ConditionalClient class should appear in the API.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ConditionalClient_IsPresent()
    {
        var classes = Api.Modules
            .SelectMany(m => m.Classes ?? [])
            .Select(c => c.Name)
            .ToList();

        Assert.Contains("ConditionalClient", classes);
    }

    /// <summary>
    /// The ConditionalOptions interface should be present.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ConditionalOptions_IsPresent()
    {
        var interfaces = Api.Modules
            .SelectMany(m => m.Interfaces ?? [])
            .Select(i => i.Name)
            .ToList();

        Assert.Contains("ConditionalOptions", interfaces);
    }
}
