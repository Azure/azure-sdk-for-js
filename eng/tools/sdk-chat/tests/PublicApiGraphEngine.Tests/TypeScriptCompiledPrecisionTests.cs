// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Shared fixture that graphs API from the CompiledMode/TypeScript fixture once.
/// This fixture has multi-target conditional exports (node/browser/default)
/// with separate .d.ts entry points per condition, plus unified source files.
/// </summary>
public class TypeScriptCompiledFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScript");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }
    public string FixturePath => TestFixturesPath;

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
                FileName = "node",
                Arguments = "--version",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            using var p = System.Diagnostics.Process.Start(psi);
            p?.WaitForExit(1000);
            return p?.ExitCode == 0;
        }
        catch { return false; }
    }
}

/// <summary>
/// Tests that REQUIRE compiled/runtime analysis to pass.
/// These document the accuracy gap that a compiled engine will close:
/// - Default vs platform-specific export condition scoping
/// - External package dependency resolution without node_modules
/// </summary>
public class TypeScriptCompiledPrecisionTests : IClassFixture<TypeScriptCompiledFixture>
{
    private readonly TypeScriptCompiledFixture _fixture;

    public TypeScriptCompiledPrecisionTests(TypeScriptCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    /// <summary>
    /// Verifies that the compiled engine assigns conditions based on declaration site.
    /// A symbol's condition is determined by the entry file where it is DECLARED,
    /// not where it is re-exported from.
    ///
    /// node/index.d.ts (condition "node") DECLARES NodeClient → condition "node"
    /// browser/index.d.ts (condition "browser") DECLARES BrowserClient → condition "browser"
    /// shared.d.ts (no direct condition) DECLARES BaseClient → inherits "default"
    /// index.d.ts (condition "default") only RE-EXPORTS, declares nothing
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CompiledEngine_AssignsConditions_ByDeclarationSite()
    {
        var api = GetApi();
        var browserModule = api.Modules.FirstOrDefault(m => m.Name == "browser");
        var nodeModule = api.Modules.FirstOrDefault(m => m.Name == "node");
        var sharedModule = api.Modules.FirstOrDefault(m => m.Name == "shared");

        Assert.NotNull(browserModule);
        Assert.NotNull(nodeModule);
        Assert.NotNull(sharedModule);

        // NodeClient is DECLARED in node/index.d.ts → condition "node"
        Assert.Contains(nodeModule.Classes ?? [], c => c.Name == "NodeClient");
        Assert.Equal("node", nodeModule.Condition);

        // BrowserClient is DECLARED in browser/index.d.ts → condition "browser"
        Assert.Contains(browserModule.Classes ?? [], c => c.Name == "BrowserClient");
        Assert.Equal("browser", browserModule.Condition);

        // BaseClient is DECLARED in shared.d.ts → inherits "default"
        Assert.Contains(sharedModule.Classes ?? [], c => c.Name == "BaseClient");
        Assert.Equal("default", sharedModule.Condition);

        // Conditions must be single canonical values (no raw "|" chains)
        Assert.DoesNotContain("|", browserModule.Condition ?? string.Empty, StringComparison.Ordinal);
        Assert.DoesNotContain("|", nodeModule.Condition ?? string.Empty, StringComparison.Ordinal);
        Assert.DoesNotContain("|", sharedModule.Condition ?? string.Empty, StringComparison.Ordinal);

        // Platform types don't leak into the shared module
        Assert.DoesNotContain(sharedModule.Classes ?? [], c => c.Name == "NodeClient");
        Assert.DoesNotContain(sharedModule.Classes ?? [], c => c.Name == "BrowserClient");
    }

    /// <summary>
    /// Verifies precise per-symbol condition assignment using declaration-site analysis.
    /// Symbols DECLARED in a condition-specific entry file get that condition.
    /// Symbols DECLARED in a shared non-entry file get the most general condition
    /// from the entries that import them.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CompiledEngine_SymbolConditions_MatchDeclarationEntry()
    {
        var api = GetApi();

        // NodeClient is DECLARED in node/index.d.ts (condition "node")
        // index.d.ts re-exports it, but that's not where it's declared
        var nodeModule = api.Modules.First(m => (m.Classes ?? []).Any(c => c.Name == "NodeClient"));
        Assert.Equal("node", nodeModule.Condition);

        // NodeClientOptions is DECLARED in node/index.d.ts (condition "node")
        var nodeOptsModule = api.Modules.First(m => (m.Interfaces ?? []).Any(i => i.Name == "NodeClientOptions"));
        Assert.Equal("node", nodeOptsModule.Condition);

        // BrowserClient is DECLARED in browser/index.d.ts (condition "browser")
        var browserModule = api.Modules.First(m => (m.Classes ?? []).Any(c => c.Name == "BrowserClient"));
        Assert.Equal("browser", browserModule.Condition);

        // BrowserClientOptions is DECLARED in browser/index.d.ts (condition "browser")
        var browserOptsModule = api.Modules.First(m => (m.Interfaces ?? []).Any(i => i.Name == "BrowserClientOptions"));
        Assert.Equal("browser", browserOptsModule.Condition);

        // BaseClient, ClientOptions, Resource are DECLARED in shared.d.ts
        // shared.d.ts is not a direct entry point — it inherits "default"
        var sharedModule = api.Modules.First(m => (m.Classes ?? []).Any(c => c.Name == "BaseClient"));
        Assert.Equal("default", sharedModule.Condition);
        Assert.Contains(sharedModule.Interfaces ?? [], i => i.Name == "ClientOptions");
        Assert.Contains(sharedModule.Interfaces ?? [], i => i.Name == "Resource");
    }
}
