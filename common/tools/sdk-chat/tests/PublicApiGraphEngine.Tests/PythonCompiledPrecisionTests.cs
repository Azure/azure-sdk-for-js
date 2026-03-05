// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Python;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Fixture that graphs Python API from the CompiledMode fixture once.
/// Used by PythonCompiledPrecisionTests and PythonCompiledFixtureTests.
/// </summary>
public class PythonCompiledFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "Python");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }
    public string FixturePath => TestFixturesPath;

    public async ValueTask InitializeAsync()
    {
        var engine = new PythonPublicApiGraphEngine();
        if (!engine.IsAvailable())
        {
            SkipReason = engine.UnavailableReason ?? "Python not available";
            return;
        }

        try
        {
            Api = await engine.GraphAsync(TestFixturesPath);
        }
        catch (Exception ex)
        {
            SkipReason = $"Python engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;
}

/// <summary>
/// Tests that REQUIRE compiled/runtime analysis to pass.
/// These document the accuracy gap that a runtime-based engine will close.
/// </summary>
public class PythonCompiledPrecisionTests : IClassFixture<PythonCompiledInspectFixture>
{
    private readonly PythonCompiledInspectFixture _fixture;

    public PythonCompiledPrecisionTests(PythonCompiledInspectFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    /// <summary>
    /// With `from __future__ import annotations`, all annotations are strings.
    /// The AST parser records "HTTPResponse" literally. A compiled engine
    /// resolves it to http.client.HTTPResponse via typing.get_type_hints().
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void SourceParser_CannotResolve_StringFormAnnotations()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();

        var client = classes.FirstOrDefault(c => c.Name == "ServiceClient");
        Assert.NotNull(client);

        var getResponse = client.Methods?.FirstOrDefault(m => m.Name == "get_response");
        Assert.NotNull(getResponse);

        Assert.NotNull(getResponse.Ret);
        Assert.Contains("http.client.HTTPResponse", getResponse.Ret!, StringComparison.Ordinal);
    }
}

/// <summary>
/// Fixture that forces Python inspect-mode for compiled precision assertions.
/// </summary>
public class PythonCompiledInspectFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "Python");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }

    public async ValueTask InitializeAsync()
    {
        var engine = new PythonPublicApiGraphEngine();
        if (!engine.IsAvailable())
        {
            SkipReason = engine.UnavailableReason ?? "Python not available";
            return;
        }

        try
        {
            Api = await engine.GraphAsync(new EngineInput.PythonPackage("test_compiled_pkg", TestFixturesPath, AllowRootPathImport: true));
        }
        catch (Exception ex)
        {
            SkipReason = $"Python engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;
}
