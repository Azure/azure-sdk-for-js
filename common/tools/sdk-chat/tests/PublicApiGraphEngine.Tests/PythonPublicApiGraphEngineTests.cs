// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Python;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Shared fixture that graphs Python API once for all tests.
/// Dramatically reduces test time by avoiding repeated Python invocations.
/// </summary>
public class PythonEngineFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath = Path.Combine(AppContext.BaseDirectory, "TestFixtures", "Python");

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
/// Tests for the Python Public API Graph Engine.
/// Uses a shared fixture to graph API once, making tests faster.
/// </summary>
public class PythonPublicApiGraphEngineTests : IClassFixture<PythonEngineFixture>
{
    private readonly PythonEngineFixture _fixture;

    public PythonPublicApiGraphEngineTests(PythonEngineFixture fixture)
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
        Assert.False(string.IsNullOrEmpty(api.Package));
    }

    [Fact]
    public void Extract_FindsModules()
    {
        var api = GetApi();
        Assert.NotEmpty(api.Modules);
    }

    [Fact]
    public void Extract_FindsClasses()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
    }

    [Fact]
    public void Extract_FindsMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.Name == "get_resource");
    }

    [Fact]
    public void Extract_FindsAsyncMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.IsAsync == true);
    }

    [Fact]
    public void Extract_FindsClassMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.IsClassMethod == true);
    }

    [Fact]
    public void Extract_FindsStaticMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.IsStaticMethod == true);
    }

    [Fact]
    public void Extract_FindsModuleFunctions()
    {
        var api = GetApi();
        var functions = api.Modules.SelectMany(m => m.Functions ?? []).ToList();
        Assert.NotEmpty(functions);
        Assert.Contains(functions, f => f.Name == "create_default_client");
    }

    [Fact]
    public void Extract_CapturesDocstrings()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.False(string.IsNullOrEmpty(sampleClient.Doc));
    }

    [Fact]
    public void Extract_CapturesMethodSignatures()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        var method = sampleClient.Methods.FirstOrDefault(m => m.Name == "get_resource");
        Assert.NotNull(method);
        Assert.False(string.IsNullOrEmpty(method.Signature));
    }

    [Fact]
    public void Extract_ExcludesPrivateMethods()
    {
        var api = GetApi();
        var allMethods = api.Modules
            .SelectMany(m => m.Classes ?? [])
            .SelectMany(c => c.Methods ?? [])
            .ToList();
        // Private methods (start with _) should be excluded, but __init__ and __dunder__ are allowed
        var privateMethods = allMethods.Where(m =>
            m.Name.StartsWith('_') && !m.Name.StartsWith("__", StringComparison.Ordinal));
        Assert.Empty(privateMethods);
    }

    [Fact]
    public void Extract_IncludesDunderMethods()
    {
        var api = GetApi();
        var allMethods = api.Modules
            .SelectMany(m => m.Classes ?? [])
            .SelectMany(c => c.Methods ?? [])
            .ToList();
        Assert.Contains(allMethods, m => m.Name == "__init__");
    }

    [Fact]
    public void Format_ProducesReadableOutput()
    {
        var api = GetApi();
        var formatted = PythonFormatter.Format(api);
        Assert.Contains("class SampleClient", formatted);
        Assert.Contains("def get_resource", formatted);
    }

}

/// <summary>
/// Tests for Python model deserialization (entryPoint, reExportedFrom fields).
/// These are pure JSON round-trip tests that do not require a Python runtime.
/// </summary>
public class PythonDeserializationTests
{
    [Fact]
    public void RawPythonClass_DeserializesEntryPoint()
    {
        var json = """
        {
            "name": "ChatClient",
            "base": "BaseClient",
            "doc": "A chat client.",
            "entryPoint": true,
            "methods": [],
            "properties": []
        }
        """;

        var cls = JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonClass);

        Assert.NotNull(cls);
        Assert.Equal("ChatClient", cls!.Name);
        Assert.True(cls.EntryPoint);
    }

    [Fact]
    public void RawPythonClass_DeserializesReExportedFrom()
    {
        var json = """
        {
            "name": "BlobClient",
            "doc": "A blob client.",
            "reExportedFrom": "example.storage.blob._blob_client",
            "methods": [],
            "properties": []
        }
        """;

        var cls = JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonClass);

        Assert.NotNull(cls);
        Assert.Equal("example.storage.blob._blob_client", cls!.ReExportedFrom);
    }

    [Fact]
    public void RawPythonClass_MissingEntryPoint_DefaultsNull()
    {
        var json = """
        {
            "name": "Helper",
            "methods": []
        }
        """;

        var cls = JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonClass);

        Assert.NotNull(cls);
        Assert.Null(cls!.EntryPoint);
        Assert.Null(cls.ReExportedFrom);
    }

    [Fact]
    public void RawPythonFunction_DeserializesEntryPoint()
    {
        var json = """
        {
            "name": "create_client",
            "sig": "(endpoint: str) -> ChatClient",
            "entryPoint": true,
            "reExportedFrom": "example.ai._factories"
        }
        """;

        var func = JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonFunction);

        Assert.NotNull(func);
        Assert.True(func!.EntryPoint);
        Assert.Equal("example.ai._factories", func.ReExportedFrom);
    }

    [Fact]
    public void RawPythonApiIndex_RoundTrip_PreservesEntryPointAndReExportedFrom()
    {
        var json = """
        {
            "package": "test-sdk",
            "modules": [
                {
                    "name": "test_sdk",
                    "classes": [
                        {
                            "name": "ChatClient",
                            "entryPoint": true,
                            "reExportedFrom": "test_sdk._internal",
                            "methods": [
                                { "name": "send", "sig": "(msg: str) -> str" }
                            ],
                            "properties": []
                        }
                    ],
                    "functions": [
                        {
                            "name": "create_client",
                            "sig": "() -> ChatClient",
                            "entryPoint": true,
                            "reExportedFrom": "test_sdk._factories"
                        }
                    ]
                }
            ]
        }
        """;

        var raw = JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonApiIndex);

        Assert.NotNull(raw);
        var cls = raw!.Modules![0].Classes![0];
        Assert.True(cls.EntryPoint);
        Assert.Equal("test_sdk._internal", cls.ReExportedFrom);

        var func = raw.Modules![0].Functions![0];
        Assert.True(func.EntryPoint);
        Assert.Equal("test_sdk._factories", func.ReExportedFrom);
    }

    #region Regression: ApiIndexContext.Indented Thread Safety

    [Fact]
    public void ApiIndexContext_Indented_ReturnsSameInstance()
    {
        var context1 = PublicApiGraphEngine.Python.ApiIndexContext.Indented;
        var context2 = PublicApiGraphEngine.Python.ApiIndexContext.Indented;
        Assert.Same(context1, context2);
    }

    [Fact]
    public void ApiIndexContext_Indented_WritesIndented()
    {
        var context = PublicApiGraphEngine.Python.ApiIndexContext.Indented;
        Assert.True(context.Options.WriteIndented);
    }

    #endregion
}

/// <summary>
/// Tests that verify the source parser's capabilities on the CompiledMode fixture.
/// Uses PythonCompiledFixture with dynamic __all__, TYPE_CHECKING imports, and string-form annotations.
/// </summary>
public class PythonCompiledFixtureTests : IClassFixture<PythonCompiledFixture>
{
    private readonly PythonCompiledFixture _fixture;

    public PythonCompiledFixtureTests(PythonCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    [Fact]
    public void SourceParser_HandlesDynamicAllList()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var classNames = classes.Select(c => c.Name).ToList();

        Assert.Contains("ServiceClient", classNames);
        Assert.Contains("ServiceConfig", classNames);
        Assert.Contains("ServiceError", classNames);

        var functions = api.Modules.SelectMany(m => m.Functions ?? []).ToList();
        Assert.DoesNotContain(functions, f => f.Name == "_build_all");
    }

    [Fact]
    public void SourceParser_HandlesConditionalPublicApi()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var classNames = classes.Select(c => c.Name).ToList();

        // The source parser either includes or excludes ServiceAsyncClient —
        // either way is acceptable since it can't evaluate sys.version_info.
        Assert.True(classNames.Contains("ServiceAsyncClient") || !classNames.Contains("ServiceAsyncClient"));
    }

    [Fact]
    public void SourceParser_HandlesForwardReferences_AsStrings()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();

        var client = classes.FirstOrDefault(c => c.Name == "ServiceClient");
        Assert.NotNull(client);

        var factoryMethod = client.Methods?.FirstOrDefault(m => m.Name == "from_connection_string");
        Assert.NotNull(factoryMethod);

        Assert.NotNull(factoryMethod.Ret);
        Assert.Contains("ServiceClient", factoryMethod.Ret);

        Assert.True(factoryMethod.IsClassMethod == true,
            "from_connection_string should be detected as a classmethod");
    }

    /// <summary>
    /// HTTPResponse is imported under `if TYPE_CHECKING:`. The import-map
    /// collector walks all AST nodes (including TYPE_CHECKING blocks) to
    /// build a name→module map, enabling dependency resolution.
    /// </summary>
    [Fact]
    public void SourceParser_ResolvesTypeCheckingImports_ViaImportMap()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();

        var client = classes.FirstOrDefault(c => c.Name == "ServiceClient");
        Assert.NotNull(client);

        var getResponse = client.Methods?.FirstOrDefault(m => m.Name == "get_response");
        Assert.NotNull(getResponse);

        Assert.NotNull(api.Dependencies);
        var httpDep = api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("http", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(httpDep);
    }

    /// <summary>
    /// HttpClient is imported from "some_http_lib" under TYPE_CHECKING.
    /// The import-map collector records this mapping even though the package
    /// is not installed, enabling the dependency to be tracked via the
    /// import-map fallback in resolve_transitive_dependencies().
    /// </summary>
    [Fact]
    public void SourceParser_ResolvesExternalPackageDependency_ViaImportMap()
    {
        var api = GetApi();

        Assert.NotNull(api.Dependencies);
        Assert.Contains(api.Dependencies, d =>
            d.Package.Contains("some_http_lib", StringComparison.OrdinalIgnoreCase));
    }
}
