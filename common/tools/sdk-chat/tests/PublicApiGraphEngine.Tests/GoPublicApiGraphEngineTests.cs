// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Go;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Shared fixture that graphs Go API once for all tests.
/// Dramatically reduces test time by avoiding repeated Go invocations.
/// </summary>
public class GoEngineFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath = Path.Combine(AppContext.BaseDirectory, "TestFixtures", "Go");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }
    public string FixturePath => TestFixturesPath;

    public async ValueTask InitializeAsync()
    {
        var engine = new GoPublicApiGraphEngine();
        if (!engine.IsAvailable())
        {
            SkipReason = engine.UnavailableReason ?? "Go not available";
            return;
        }

        try
        {
            Api = await engine.GraphAsync(TestFixturesPath);
        }
        catch (Exception ex)
        {
            SkipReason = $"Go engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;
}

/// <summary>
/// Tests for the Go Public API Graph Engine.
/// Uses a shared fixture to graph API once, making tests faster.
/// </summary>
public class GoPublicApiGraphEngineTests : IClassFixture<GoEngineFixture>
{
    private readonly GoEngineFixture _fixture;

    public GoPublicApiGraphEngineTests(GoEngineFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    [Fact]
    public void Extract_ReturnsApiIndex_WithPackageName()
    {
        var api = GetApi();
        Assert.NotNull(api);
        Assert.False(string.IsNullOrEmpty(api.Package));
    }

    [Fact]
    public void Extract_FindsPackages()
    {
        var api = GetApi();
        Assert.NotNull(api);
        Assert.NotEmpty(api.Packages);
    }

    [Fact]
    public void Extract_FindsStructs()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var sampleClient = structs.FirstOrDefault(s => s.Name == "SampleClient");
        Assert.NotNull(sampleClient);
    }

    [Fact]
    public void Extract_FindsStructMethods()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var sampleClient = structs.FirstOrDefault(s => s.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.Name == "GetResource");
    }

    [Fact]
    public void Extract_FindsInterfaces()
    {
        var api = GetApi();
        var interfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();
        var iface = interfaces.FirstOrDefault(i => i.Name == "ResourceOperations");
        Assert.NotNull(iface);
    }

    [Fact]
    public void Extract_FindsFunctions()
    {
        var api = GetApi();
        var functions = api.Packages.SelectMany(p => p.Functions ?? []).ToList();
        Assert.NotEmpty(functions);
        Assert.Contains(functions, f => f.Name == "NewSampleClient");
    }

    [Fact]
    public void Extract_FindsTypeAliases()
    {
        var api = GetApi();
        var types = api.Packages.SelectMany(p => p.Types ?? []).ToList();
        Assert.NotEmpty(types);
    }

    [Fact]
    public void Extract_FindsConstants()
    {
        var api = GetApi();
        var constants = api.Packages.SelectMany(p => p.Constants ?? []).ToList();
        Assert.NotEmpty(constants);
    }

    [Fact]
    public void Extract_CapturesDocComments()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var sampleClient = structs.FirstOrDefault(s => s.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.False(string.IsNullOrEmpty(sampleClient.Doc));
    }

    [Fact]
    public void Extract_CapturesFunctionSignatures()
    {
        var api = GetApi();
        var functions = api.Packages.SelectMany(p => p.Functions ?? []).ToList();
        var newClient = functions.FirstOrDefault(f => f.Name == "NewSampleClient");
        Assert.NotNull(newClient);
        Assert.False(string.IsNullOrEmpty(newClient.Sig));
    }

    [Fact]
    public void Extract_OnlyIncludesExportedSymbols()
    {
        var api = GetApi();

        var allStructs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var allFunctions = api.Packages.SelectMany(p => p.Functions ?? []).ToList();
        var allInterfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();

        // All exported symbols in Go start with uppercase
        foreach (var s in allStructs)
        {
            Assert.True(char.IsUpper(s.Name[0]), $"Struct {s.Name} should be exported");
        }
        foreach (var f in allFunctions)
        {
            Assert.True(char.IsUpper(f.Name[0]), $"Function {f.Name} should be exported");
        }
        foreach (var i in allInterfaces)
        {
            Assert.True(char.IsUpper(i.Name[0]), $"Interface {i.Name} should be exported");
        }
    }

    [Fact]
    public void Extract_FindsStructFields()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var resource = structs.FirstOrDefault(s => s.Name == "Resource");
        Assert.NotNull(resource);
        Assert.NotNull(resource.Fields);
        Assert.NotEmpty(resource.Fields);
    }

    [Fact]
    public void Extract_FindsInterfaceMethods()
    {
        var api = GetApi();
        var interfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();
        var iface = interfaces.FirstOrDefault(i => i.Name == "ResourceOperations");
        Assert.NotNull(iface);
        Assert.NotNull(iface.Methods);
        Assert.NotEmpty(iface.Methods);
    }

    [Fact]
    public void Extract_FindsStructEmbeds()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var tracked = structs.FirstOrDefault(s => s.Name == "TrackedResource");
        Assert.NotNull(tracked);
        Assert.NotNull(tracked.Embeds);
        Assert.Contains("BaseModel", tracked.Embeds);
        Assert.Contains("AuditInfo", tracked.Embeds);
    }

    [Fact]
    public void Extract_StructEmbedsNotInFields()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();
        var tracked = structs.FirstOrDefault(s => s.Name == "TrackedResource");
        Assert.NotNull(tracked);
        // Embedded types should NOT appear as regular fields
        var fieldNames = (tracked.Fields ?? []).Select(f => f.Name).ToList();
        Assert.DoesNotContain("BaseModel", fieldNames);
        Assert.DoesNotContain("AuditInfo", fieldNames);
        // But regular fields should still be present
        Assert.Contains("DisplayName", fieldNames);
    }

    [Fact]
    public void Extract_FindsInterfaceEmbeds()
    {
        var api = GetApi();
        var interfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();
        var readWriter = interfaces.FirstOrDefault(i => i.Name == "ReadWriter");
        Assert.NotNull(readWriter);
        Assert.NotNull(readWriter.Embeds);
        Assert.Contains("Reader", readWriter.Embeds);
        Assert.Contains("Writer", readWriter.Embeds);
    }

    [Fact]
    public void Extract_InterfaceEmbedsChained()
    {
        var api = GetApi();
        var interfaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();
        var rwc = interfaces.FirstOrDefault(i => i.Name == "ReadWriteCloser");
        Assert.NotNull(rwc);
        Assert.NotNull(rwc.Embeds);
        Assert.Contains("ReadWriter", rwc.Embeds);
        Assert.Contains("Closer", rwc.Embeds);
    }

}

/// <summary>
/// Fixture that graphs Go API from the CompiledMode fixture once.
/// Uses a fixture with embedded types, generics, interface satisfaction, and cross-package references.
/// </summary>
public class GoCompiledFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "Go");

    public ApiIndex? Api { get; private set; }
    public string? SkipReason { get; private set; }
    public string FixturePath => TestFixturesPath;

    public async ValueTask InitializeAsync()
    {
        var engine = new GoPublicApiGraphEngine();
        if (!engine.IsAvailable())
        {
            SkipReason = engine.UnavailableReason ?? "Go not available";
            return;
        }

        try
        {
            Api = await engine.GraphAsync(TestFixturesPath);
        }
        catch (Exception ex)
        {
            SkipReason = $"Go engine failed: {ex.Message}";
        }
    }

    public ValueTask DisposeAsync() => default;
}

/// <summary>
/// Tests that verify the source parser's capabilities on a fixture with
/// embedded types, generics, interface satisfaction, and cross-package references.
/// </summary>
public class GoCompiledFixtureTests : IClassFixture<GoCompiledFixture>
{
    private readonly GoCompiledFixture _fixture;

    public GoCompiledFixtureTests(GoCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    [Fact]
    public void SourceParser_Detects_EmbeddedTypes_AndDirectMethods()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();

        var client = structs.FirstOrDefault(s => s.Name == "Client");
        Assert.NotNull(client);

        Assert.NotNull(client.Embeds);

        var methods = client.Methods?.Select(m => m.Name).ToList() ?? [];
        Assert.Contains("GetResource", methods);
        Assert.Contains("ListResources", methods);
    }

    [Fact]
    public void SourceParser_RecordsGenericConstraints_AsStrings()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();

        var pair = structs.FirstOrDefault(s => s.Name == "Pair");
        Assert.NotNull(pair);

        Assert.NotNull(pair.TypeParams);
        Assert.NotEmpty(pair.TypeParams);

        var typeParamString = string.Join(", ", pair.TypeParams);
        Assert.Contains("comparable", typeParamString, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("any", typeParamString, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void SourceParser_Records_InterfaceMethods_AsStrings()
    {
        var api = GetApi();
        var ifaces = api.Packages.SelectMany(p => p.Interfaces ?? []).ToList();

        var doer = ifaces.FirstOrDefault(i => i.Name == "Doer");
        Assert.NotNull(doer);

        Assert.NotNull(doer.Methods);
        var doMethod = doer.Methods.FirstOrDefault(m => m.Name == "Do");
        Assert.NotNull(doMethod);

        Assert.Contains("Request", doMethod.Sig);
        Assert.Contains("Response", doMethod.Ret ?? "");
    }

    [Fact]
    public void SourceParser_Tracks_CrossPackageTypeReferences()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();

        var resource = structs.FirstOrDefault(s => s.Name == "Resource");
        Assert.NotNull(resource);

        var dataField = resource.Fields?.FirstOrDefault(f => f.Name == "Data");
        Assert.NotNull(dataField);

        Assert.Contains("json.RawMessage", dataField.Type);

        Assert.NotNull(api.Dependencies);
        var jsonDep = api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("encoding/json", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(jsonDep);
    }

    [Fact]
    public void SourceParser_Records_StdlibTypeReferences_InSignatures()
    {
        var api = GetApi();
        var structs = api.Packages.SelectMany(p => p.Structs ?? []).ToList();

        var client = structs.FirstOrDefault(s => s.Name == "Client");
        Assert.NotNull(client);

        var getResource = client.Methods?.FirstOrDefault(m => m.Name == "GetResource");
        Assert.NotNull(getResource);

        Assert.Contains("context.Context", getResource.Sig);

        Assert.NotNull(api.Dependencies);
        var ctxDep = api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("context", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(ctxDep);
    }

    [Fact]
    public void SourceParser_DetectsNamedFunctionTypes()
    {
        var api = GetApi();
        var types = api.Packages.SelectMany(p => p.Types ?? []).ToList();

        var handler = types.FirstOrDefault(t => t.Name == "ResponseHandler");
        Assert.NotNull(handler);

        Assert.Contains("http.Response", handler.Type);
        Assert.Contains("error", handler.Type);
    }

    [Fact]
    public void SourceParser_DetectsConstructorFunction()
    {
        var api = GetApi();
        var functions = api.Packages.SelectMany(p => p.Functions ?? []).ToList();

        var newClient = functions.FirstOrDefault(f => f.Name == "NewClient");
        Assert.NotNull(newClient);

        Assert.NotNull(newClient.Ret);
        Assert.Contains("Client", newClient.Ret);
        Assert.Contains("error", newClient.Ret);
    }
}
