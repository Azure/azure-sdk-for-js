// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Shared fixture that graphs TypeScript API once for all tests.
/// Dramatically reduces test time by avoiding repeated npm install and node invocations.
/// </summary>
public class TypeScriptEngineFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath = Path.Combine(AppContext.BaseDirectory, "TestFixtures", "TypeScript");

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
/// Tests for the TypeScript Public API Graph Engine.
/// Uses a shared fixture to graph API once, making tests ~10x faster.
/// </summary>
public class TypeScriptPublicApiGraphEngineTests : IClassFixture<TypeScriptEngineFixture>
{
    private readonly TypeScriptEngineFixture _fixture;

    public TypeScriptPublicApiGraphEngineTests(TypeScriptEngineFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    #region Basic Engine Tests

    [Fact]
    public void Extract_ReturnsApiIndex_WithPackageName()
    {
        var api = GetApi();
        Assert.NotNull(api);
        Assert.False(string.IsNullOrEmpty(api.Package));
    }

    [Fact]
    public void Extract_FindsModules()
    {
        var api = GetApi();
        Assert.NotNull(api);
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
    public void Extract_FindsConstructors()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Constructors);
        Assert.NotEmpty(sampleClient.Constructors);
    }

    [Fact]
    public void Extract_FindsMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.Name == "getResource");
    }

    [Fact]
    public void Extract_FindsInterfaces()
    {
        var api = GetApi();
        var interfaces = api.Modules.SelectMany(m => m.Interfaces ?? []).ToList();
        var resource = interfaces.FirstOrDefault(i => i.Name == "Resource");
        Assert.NotNull(resource);
    }

    [Fact]
    public void Extract_FindsEnums()
    {
        var api = GetApi();
        var enums = api.Modules.SelectMany(m => m.Enums ?? []).ToList();
        var resultStatus = enums.FirstOrDefault(e => e.Name == "ResultStatus");
        Assert.NotNull(resultStatus);
        Assert.NotNull(resultStatus.Values);
        Assert.NotEmpty(resultStatus.Values);
    }

    [Fact]
    public void Extract_FindsTypeAliases()
    {
        var api = GetApi();
        var types = api.Modules.SelectMany(m => m.Types ?? []).ToList();
        Assert.NotEmpty(types);
    }

    [Fact]
    public void Extract_FindsFunctions()
    {
        var api = GetApi();
        var functions = api.Modules.SelectMany(m => m.Functions ?? []).ToList();
        Assert.NotEmpty(functions);
        Assert.Contains(functions, f => f.Name == "createDefaultClient" || f.Name == "batchGetResources");
    }

    #endregion

    #region Method Attribute Tests

    [Fact]
    public void Extract_FindsAsyncMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.Async == true);
    }

    [Fact]
    public void Extract_FindsStaticMethods()
    {
        var api = GetApi();
        var classes = api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var sampleClient = classes.FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.NotNull(sampleClient.Methods);
        Assert.Contains(sampleClient.Methods, m => m.Static == true);
    }

    [Fact]
    public void Extract_FindsProperties()
    {
        var api = GetApi();
        var interfaces = api.Modules.SelectMany(m => m.Interfaces ?? []).ToList();
        var resource = interfaces.FirstOrDefault(i => i.Name == "Resource");
        Assert.NotNull(resource);
        Assert.NotNull(resource.Properties);
        Assert.Contains(resource.Properties, p => p.Name == "id");
    }

    [Fact]
    public void Extract_ExcludesPrivateMethods()
    {
        var api = GetApi();
        var allMethods = api.Modules
            .SelectMany(m => m.Classes ?? [])
            .SelectMany(c => c.Methods ?? [])
            .ToList();
        Assert.DoesNotContain(allMethods, m => m.Name.StartsWith('#'));
    }

    #endregion

    #region Entry Point and Client Detection Tests

    [Fact]
    public void Extract_SampleClient_IsMarkedAsEntryPoint()
    {
        var api = GetApi();
        var sampleClient = api.GetAllClasses().FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.True(sampleClient.EntryPoint, "SampleClient should be marked as entryPoint");
    }

    [Fact]
    public void Extract_SampleClient_IsClientType()
    {
        var api = GetApi();
        var sampleClient = api.GetAllClasses().FirstOrDefault(c => c.Name == "SampleClient");
        Assert.NotNull(sampleClient);
        Assert.True(sampleClient.IsClientType, "SampleClient (entryPoint + methods) should be IsClientType");
    }

    [Fact]
    public void Extract_WidgetClient_IsAlsoEntryPoint_BecauseExportedFromMainFile()
    {
        var api = GetApi();
        var widgetClient = api.GetAllClasses().FirstOrDefault(c => c.Name == "WidgetClient");
        Assert.NotNull(widgetClient);
        // WidgetClient is exported from the same main entry file, so the engine
        // marks it as entryPoint=true. Subclient status is a higher-level inference.
        Assert.True(widgetClient.EntryPoint == true);
    }

    [Fact]
    public void Extract_GetClientClasses_ReturnsOnlyEntryPoints()
    {
        var api = GetApi();
        var clients = api.GetClientClasses().ToList();
        Assert.NotEmpty(clients);
        Assert.All(clients, c => Assert.True(c.EntryPoint == true && (c.Methods?.Any() ?? false)));
    }

    #endregion

    #region Model and Error Type Detection Tests

    [Fact]
    public void ClassInfo_IsModelType_TrueForPropertyOnlyClasses()
    {
        var modelClass = new ClassInfo
        {
            Name = "TestModel",
            Properties = [new PropertyInfo { Name = "id", Type = "string" }]
        };
        Assert.True(modelClass.IsModelType);
    }

    [Fact]
    public void ClassInfo_IsModelType_FalseForClassesWithMethods()
    {
        var clientClass = new ClassInfo
        {
            Name = "TestClient",
            Properties = [new PropertyInfo { Name = "endpoint", Type = "string" }],
            Methods = [new MethodInfo { Name = "doWork", Sig = "()", Ret = "void" }]
        };
        Assert.False(clientClass.IsModelType);
    }

    [Fact]
    public void ClassInfo_IsErrorType_DetectsErrorBaseClass()
    {
        var errorClass = new ClassInfo { Name = "ServiceError", Extends = "Error" };
        Assert.True(errorClass.IsErrorType);
    }

    [Fact]
    public void ClassInfo_IsErrorType_DetectsExceptionBaseClass()
    {
        var exceptionClass = new ClassInfo { Name = "HttpException", Extends = "RestException" };
        Assert.True(exceptionClass.IsErrorType);
    }

    [Fact]
    public void ClassInfo_IsErrorType_FalseForRegularBaseClass()
    {
        var normalClass = new ClassInfo { Name = "Widget", Extends = "BaseModel" };
        Assert.False(normalClass.IsErrorType);
    }

    [Fact]
    public void ClassInfo_IsErrorType_FalseWhenNoBase()
    {
        var rootClass = new ClassInfo { Name = "SomeClass" };
        Assert.False(rootClass.IsErrorType);
    }

    #endregion

    #region TruncationPriority Tests

    [Fact]
    public void ClassInfo_TruncationPriority_ClientsAreHighest()
    {
        var client = new ClassInfo
        {
            Name = "TestClient",
            EntryPoint = true,
            Methods = [new MethodInfo { Name = "op", Sig = "()", Ret = "void" }]
        };
        Assert.Equal(0, client.TruncationPriority);
    }

    [Fact]
    public void ClassInfo_TruncationPriority_ErrorsBeforeModels()
    {
        var error = new ClassInfo { Name = "SvcError", Extends = "Error" };
        var model = new ClassInfo
        {
            Name = "Dto",
            Properties = [new PropertyInfo { Name = "x", Type = "string" }]
        };
        Assert.True(error.TruncationPriority < model.TruncationPriority);
    }

    [Fact]
    public void ClassInfo_TruncationPriority_ModelsBeforeOther()
    {
        var model = new ClassInfo
        {
            Name = "Dto",
            Properties = [new PropertyInfo { Name = "x", Type = "string" }]
        };
        var other = new ClassInfo { Name = "Helper" };
        Assert.True(model.TruncationPriority < other.TruncationPriority);
    }

    [Fact]
    public void ClassInfo_TruncationPriority_FourLevels_ConsistentWithOtherEngines()
    {
        var client = new ClassInfo
        {
            Name = "C",
            EntryPoint = true,
            Methods = [new MethodInfo { Name = "op", Sig = "()", Ret = "void" }]
        };
        var error = new ClassInfo { Name = "E", Extends = "Error" };
        var model = new ClassInfo
        {
            Name = "M",
            Properties = [new PropertyInfo { Name = "p", Type = "string" }]
        };
        var other = new ClassInfo { Name = "X" };

        Assert.Equal(0, client.TruncationPriority);
        Assert.Equal(1, error.TruncationPriority);
        Assert.Equal(2, model.TruncationPriority);
        Assert.Equal(3, other.TruncationPriority);
    }

    #endregion

    #region CollectReferencedTypes Tests

    [Fact]
    public void ClassInfo_CollectReferencedTypes_FindsExtends()
    {
        var allTypes = new HashSet<string> { "BaseClient", "ChildClient", "Unrelated" };
        var cls = new ClassInfo
        {
            Name = "ChildClient",
            Extends = "BaseClient",
            Methods = [new MethodInfo { Name = "op", Sig = "()", Ret = "void" }],
            ReferencedTypes = ["BaseClient"]
        };

        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("BaseClient", refs);
        Assert.DoesNotContain("Unrelated", refs);
    }

    [Fact]
    public void ClassInfo_CollectReferencedTypes_FindsImplements()
    {
        var allTypes = new HashSet<string> { "Disposable", "Serializable", "TestClass" };
        var cls = new ClassInfo
        {
            Name = "TestClass",
            Implements = ["Disposable", "Serializable"],
            ReferencedTypes = ["Disposable", "Serializable"]
        };

        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("Disposable", refs);
        Assert.Contains("Serializable", refs);
    }

    [Fact]
    public void ClassInfo_CollectReferencedTypes_FindsMethodSignatureTypes()
    {
        var allTypes = new HashSet<string> { "Request", "Response", "TestClient" };
        var cls = new ClassInfo
        {
            Name = "TestClient",
            Methods = [new MethodInfo { Name = "call", Sig = "(req: Request)", Ret = "Response" }],
            ReferencedTypes = ["Request", "Response"]
        };

        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("Request", refs);
        Assert.Contains("Response", refs);
    }

    [Fact]
    public void ClassInfo_CollectReferencedTypes_FindsPropertyTypes()
    {
        var allTypes = new HashSet<string> { "Options", "TestClass" };
        var cls = new ClassInfo
        {
            Name = "TestClass",
            Properties = [new PropertyInfo { Name = "opts", Type = "Options" }],
            ReferencedTypes = ["Options"]
        };

        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("Options", refs);
    }

    #endregion

    #region Formatter Tests

    [Fact]
    public void Extract_ToStubs_ProducesNonEmptyOutput()
    {
        var api = GetApi();
        var stubs = api.ToStubs();
        Assert.False(string.IsNullOrWhiteSpace(stubs));
    }

    [Fact]
    public void Extract_ToStubs_ContainsClassDeclarations()
    {
        var api = GetApi();
        var stubs = api.ToStubs();
        Assert.Contains("class SampleClient", stubs);
    }

    [Fact]
    public void Extract_ToStubs_ContainsInterfaceDeclarations()
    {
        var api = GetApi();
        var stubs = api.ToStubs();
        Assert.Contains("interface Resource", stubs);
    }

    [Fact]
    public void Extract_ToStubs_ContainsEnumDeclarations()
    {
        var api = GetApi();
        var stubs = api.ToStubs();
        Assert.Contains("ResultStatus", stubs);
    }

    #endregion

    #region Serialization Tests

    [Fact]
    public void Extract_ToJson_ProducesValidJson()
    {
        var api = GetApi();
        var json = api.ToJson();
        Assert.NotNull(json);
        var parsed = JsonSerializer.Deserialize<JsonElement>(json);
        Assert.Equal(JsonValueKind.Object, parsed.ValueKind);
    }

    [Fact]
    public void Extract_ToJson_Pretty_ProducesIndentedOutput()
    {
        var api = GetApi();
        var json = api.ToJson(pretty: true);
        Assert.Contains("\n", json);
    }


    #endregion
}

/// <summary>
/// Tests that verify the source parser's capabilities on the CompiledMode fixture.
/// Uses TypeScriptCompiledFixture with multi-target conditional exports (node/browser/default).
/// </summary>
public class TypeScriptCompiledFixtureTests : IClassFixture<TypeScriptCompiledFixture>
{
    private readonly TypeScriptCompiledFixture _fixture;

    public TypeScriptCompiledFixtureTests(TypeScriptCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    [Fact]
    public void SourceParser_ProducesModules_BasedOnFileStructure()
    {
        var api = GetApi();
        var moduleNames = api.Modules.Select(m => m.Name).ToList();

        // Source parser creates modules from file paths (src/node.ts → "node" module).
        // This coincidentally matches export condition names but is not condition-aware.
        var hasNodeModule = moduleNames.Any(n =>
            n.Contains("node", StringComparison.OrdinalIgnoreCase));
        var hasBrowserModule = moduleNames.Any(n =>
            n.Contains("browser", StringComparison.OrdinalIgnoreCase));

        Assert.True(hasNodeModule && hasBrowserModule,
            $"Expected modules for node and browser files, got: [{string.Join(", ", moduleNames)}]");
    }

    [Fact]
    public void SourceParser_PlacesClasses_InFileBasedModules()
    {
        var api = GetApi();
        var allClasses = api.Modules.SelectMany(m => m.Classes ?? []).ToList();

        var nodeClient = allClasses.FirstOrDefault(c => c.Name == "NodeClient");
        var browserClient = allClasses.FirstOrDefault(c => c.Name == "BrowserClient");

        Assert.NotNull(nodeClient);
        Assert.NotNull(browserClient);

        var nodeModule = api.Modules.FirstOrDefault(m =>
            (m.Classes ?? []).Any(c => c.Name == "NodeClient"));
        var browserModule = api.Modules.FirstOrDefault(m =>
            (m.Classes ?? []).Any(c => c.Name == "BrowserClient"));

        Assert.NotNull(nodeModule);
        Assert.NotNull(browserModule);

        // Different files → different modules (by file path, not by export condition)
        Assert.NotEqual(nodeModule.Name, browserModule.Name);
    }

    [Fact]
    public void SourceParser_PlacesInterfaces_InFileBasedModules()
    {
        var api = GetApi();
        var allInterfaces = api.Modules.SelectMany(m => m.Interfaces ?? []).ToList();

        var nodeOpts = allInterfaces.FirstOrDefault(i => i.Name == "NodeClientOptions");
        var browserOpts = allInterfaces.FirstOrDefault(i => i.Name == "BrowserClientOptions");

        Assert.NotNull(nodeOpts);
        Assert.NotNull(browserOpts);

        var nodeModule = api.Modules.FirstOrDefault(m =>
            (m.Interfaces ?? []).Any(i => i.Name == "NodeClientOptions"));
        var browserModule = api.Modules.FirstOrDefault(m =>
            (m.Interfaces ?? []).Any(i => i.Name == "BrowserClientOptions"));

        Assert.NotNull(nodeModule);
        Assert.NotNull(browserModule);
        Assert.NotEqual(nodeModule.Name, browserModule.Name);
    }

    [Fact]
    public void SourceParser_SeparatesNodeAndBrowserMethods_ByFile()
    {
        var api = GetApi();

        var browserModule = api.Modules.FirstOrDefault(m =>
            m.Name.Contains("browser", StringComparison.OrdinalIgnoreCase));

        Assert.NotNull(browserModule);

        var browserClasses = browserModule.Classes ?? [];
        var browserMethods = browserClasses.SelectMany(c => c.Methods ?? []).ToList();

        // Node-only methods should not appear in the browser file's module
        Assert.DoesNotContain(browserMethods, m => m.Name == "streamToFile");
        Assert.DoesNotContain(browserMethods, m => m.Name == "readFromFile");
    }

    [Fact]
    public void CompiledEngine_DeclarationFiles_Exist()
    {
        var fixture = _fixture.FixturePath;

        Assert.True(File.Exists(Path.Combine(fixture, "dist", "types", "index.d.ts")),
            "dist/types/index.d.ts should exist (main declaration entry)");
        Assert.True(File.Exists(Path.Combine(fixture, "dist", "types", "shared.d.ts")),
            "dist/types/shared.d.ts should exist (shared types)");
        Assert.True(File.Exists(Path.Combine(fixture, "dist", "types", "node", "index.d.ts")),
            "dist/types/node/index.d.ts should exist (node condition)");
        Assert.True(File.Exists(Path.Combine(fixture, "dist", "types", "browser", "index.d.ts")),
            "dist/types/browser/index.d.ts should exist (browser condition)");
    }

    /// <summary>
    /// The fixture references HttpPolicy, HttpRequest, and HttpResponse from
    /// "some-http-lib". The import-statement collector walks import declarations
    /// and records typeName→packageName mappings, enabling dependency tracking
    /// without node_modules installed.
    /// </summary>
    [Fact]
    public void SourceParser_ResolvesExternalPackageDependency_ViaImportDeclarations()
    {
        var api = GetApi();

        Assert.NotNull(api.Dependencies);
        Assert.Contains(api.Dependencies, d =>
            d.Package.Contains("some-http-lib", StringComparison.OrdinalIgnoreCase));
    }

    /// <summary>
    /// ClientOptions.policies has type HttpPolicy[] where HttpPolicy is from
    /// "some-http-lib". The raw type name collector graphs PascalCase names
    /// from type annotations and matches them against import declarations,
    /// enabling attribution to the source package.
    /// </summary>
    [Fact]
    public void SourceParser_AttributesExternalTypes_ViaImportDeclarations()
    {
        var api = GetApi();
        var allInterfaces = api.Modules.SelectMany(m => m.Interfaces ?? []).ToList();

        var clientOpts = allInterfaces.FirstOrDefault(i => i.Name == "ClientOptions");
        Assert.NotNull(clientOpts);

        var policiesProp = clientOpts.Properties?.FirstOrDefault(p => p.Name == "policies");
        Assert.NotNull(policiesProp);
        Assert.NotNull(policiesProp.Type);

        Assert.NotNull(api.Dependencies);
        var httpLibDep = api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("some-http-lib", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(httpLibDep);
        Assert.NotNull(httpLibDep.Types);
        Assert.Contains(httpLibDep.Types, t =>
            t.Name.Contains("HttpPolicy", StringComparison.Ordinal));
    }

    /// <summary>
    /// BaseClient.sendRequest takes HttpRequest and returns Promise&lt;HttpResponse&gt;.
    /// Both types are from "some-http-lib". The raw type name collector captures
    /// these from method parameter/return type annotations and matches them
    /// against import declarations for dependency resolution.
    /// </summary>
    [Fact]
    public void SourceParser_ResolvesExternalMethodTypes_ViaImportDeclarations()
    {
        var api = GetApi();
        var allClasses = api.Modules.SelectMany(m => m.Classes ?? []).ToList();

        var baseClient = allClasses.FirstOrDefault(c => c.Name == "BaseClient");
        Assert.NotNull(baseClient);

        var sendMethod = baseClient.Methods?.FirstOrDefault(m => m.Name == "sendRequest");
        Assert.NotNull(sendMethod);

        Assert.NotNull(api.Dependencies);
        var httpLibDep = api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("some-http-lib", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(httpLibDep);
        Assert.NotNull(httpLibDep.Types);
        Assert.Contains(httpLibDep.Types, t =>
            t.Name.Contains("HttpRequest", StringComparison.Ordinal));
        Assert.Contains(httpLibDep.Types, t =>
            t.Name.Contains("HttpResponse", StringComparison.Ordinal));
    }
}
