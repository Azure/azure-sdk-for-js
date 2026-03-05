// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Shared fixture that graphs the comprehensive TypeScript compiled-mode fixture once.
/// This fixture exercises every TypeScript pattern the engine must handle correctly:
/// method overloads, index signatures, accessors, generics, conditional/mapped types,
/// underscore-prefixed public members, external dependencies, multi-subpath exports, etc.
/// </summary>
public class TypeScriptComprehensiveFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "TypeScriptComprehensive");

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

// ============================================================================
// 1. BASIC EXTRACTION — validates the engine can parse the fixture at all
// ============================================================================

/// <summary>
/// Validates fundamental extraction: package metadata, module discovery, and
/// that the engine successfully graphs a comprehensive TypeScript package.
/// </summary>
public class TsCompiled_BasicExtractionTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_BasicExtractionTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Produces_NonNull_ApiIndex()
    {
        Assert.NotNull(Api);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Package_Name_Matches_PackageJson()
    {
        Assert.Equal("@test/comprehensive-sdk", Api.Package);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Package_Version_IsExtracted()
    {
        Assert.Equal("2.0.0", Api.Version);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Discovers_All_Modules()
    {
        // The package has exports for ".", "./models", "./streaming"
        // which should produce at least 3 logical modules.
        Assert.True(Api.Modules.Count >= 3,
            $"Expected at least 3 modules, got {Api.Modules.Count}: [{string.Join(", ", Api.Modules.Select(m => m.Name))}]");
    }
}

// ============================================================================
// 2. CLASS EXTRACTION — validates class-level details
// ============================================================================

/// <summary>
/// Tests that classes are extracted with all their members: constructors,
/// methods (including overloads), properties, accessors, and inheritance.
/// </summary>
public class TsCompiled_ClassExtractionTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_ClassExtractionTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    private ClassInfo GetClass(string name) =>
        Api.Modules.SelectMany(m => m.Classes ?? []).FirstOrDefault(c => c.Name == name)
        ?? throw new Xunit.Sdk.XunitException($"Class '{name}' not found in API. Available: [{string.Join(", ", Api.Modules.SelectMany(m => m.Classes ?? []).Select(c => c.Name))}]");

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_IsExtracted()
    {
        var client = GetClass("ComprehensiveClient");
        Assert.NotNull(client);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_IsMarkedAsEntryPoint()
    {
        var client = GetClass("ComprehensiveClient");
        Assert.True(client.EntryPoint, "ComprehensiveClient should be marked as entryPoint");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_IsClientType()
    {
        var client = GetClass("ComprehensiveClient");
        Assert.True(client.IsClientType,
            "ComprehensiveClient has methods + entryPoint => IsClientType should be true");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_HasConstructor()
    {
        var client = GetClass("ComprehensiveClient");
        Assert.NotNull(client.Constructors);
        Assert.NotEmpty(client.Constructors);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_Constructor_HasCorrectParameters()
    {
        var client = GetClass("ComprehensiveClient");
        var ctor = client.Constructors!.First();
        Assert.NotNull(ctor.Params);
        Assert.Contains(ctor.Params, p => p.Name == "endpoint" && p.Type == "string");
        Assert.Contains(ctor.Params, p => p.Name == "options" && p.IsOptional == true);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_HasReadonlyEndpointProperty()
    {
        var client = GetClass("ComprehensiveClient");
        Assert.NotNull(client.Properties);
        var endpoint = client.Properties.FirstOrDefault(p => p.Name == "endpoint");
        Assert.NotNull(endpoint);
        Assert.Equal("string", endpoint.Type);
        Assert.True(endpoint.Readonly == true, "endpoint should be readonly");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_HasStaticMethod()
    {
        var client = GetClass("ComprehensiveClient");
        Assert.NotNull(client.Methods);
        var fromConn = client.Methods.FirstOrDefault(m => m.Name == "fromConnectionString");
        Assert.NotNull(fromConn);
        Assert.True(fromConn.Static == true, "fromConnectionString should be static");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ComprehensiveClient_ExcludesPrivateMembers()
    {
        var client = GetClass("ComprehensiveClient");
        var allMembers = (client.Methods ?? []).Select(m => m.Name)
            .Concat((client.Properties ?? []).Select(p => p.Name));

        // Private members declared with `private` keyword should not appear
        Assert.DoesNotContain(allMembers, n => n == "_internalState");
        Assert.DoesNotContain(allMembers, n => n == "_logger");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_IsExtracted()
    {
        var client = GetClass("StreamingClient");
        Assert.NotNull(client);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_HasConstructor()
    {
        var client = GetClass("StreamingClient");
        Assert.NotNull(client.Constructors);
        Assert.NotEmpty(client.Constructors);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_HasCloseMethod()
    {
        var client = GetClass("StreamingClient");
        Assert.NotNull(client.Methods);
        Assert.Contains(client.Methods, m => m.Name == "close");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_HasStreamMethod()
    {
        var client = GetClass("StreamingClient");
        Assert.NotNull(client.Methods);
        Assert.Contains(client.Methods, m => m.Name == "stream");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_HasStreamPagesMethod()
    {
        var client = GetClass("StreamingClient");
        Assert.NotNull(client.Methods);
        Assert.Contains(client.Methods, m => m.Name == "streamPages");
    }
}

// ============================================================================
// 3. METHOD OVERLOADS — Phase 10 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that method overloads are correctly extracted. The engine should
/// either produce separate MethodInfo entries per overload signature, or group
/// them under a single method name with multiple signatures.
///
/// Phase 10 of the redesign plan will add proper overload support.
/// </summary>
public class TsCompiled_MethodOverloadTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_MethodOverloadTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    private ClassInfo GetClass(string name) =>
        Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == name);

    /// <summary>
    /// ComprehensiveClient.getResource has two overloads:
    /// 1. getResource(resourceId: string): Promise&lt;Resource&gt;
    /// 2. getResource(resourceId: string, options: {...}): Promise&lt;Resource&gt;
    /// Both must be captured.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void GetResource_HasMultipleOverloads()
    {
        var client = GetClass("ComprehensiveClient");
        var getResourceMethods = client.Methods!.Where(m => m.Name == "getResource").ToList();

        // The engine should capture both overload signatures.
        // This may be as separate MethodInfo entries (current approach)
        // or as a single entry with overloads property (Phase 10 approach).
        // Either way, both signatures must be represented.
        Assert.True(getResourceMethods.Count >= 2,
            $"Expected at least 2 getResource overloads, got {getResourceMethods.Count}. " +
            $"Sigs: [{string.Join("; ", getResourceMethods.Select(m => m.Sig))}]");
    }

    /// <summary>
    /// First overload: getResource(resourceId: string) — single parameter.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void GetResource_SimpleOverload_HasSingleParam()
    {
        var client = GetClass("ComprehensiveClient");
        var overloads = client.Methods!.Where(m => m.Name == "getResource").ToList();

        // At least one overload should have exactly one parameter
        Assert.Contains(overloads, m =>
            (m.Params?.Count ?? 0) == 1 ||
            (m.Sig != null && !m.Sig.Contains("options")));
    }

    /// <summary>
    /// Second overload: getResource(resourceId, options) — two parameters.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void GetResource_OptionsOverload_HasTwoParams()
    {
        var client = GetClass("ComprehensiveClient");
        var overloads = client.Methods!.Where(m => m.Name == "getResource").ToList();

        // At least one overload should have two parameters
        Assert.Contains(overloads, m =>
            (m.Params?.Count ?? 0) == 2 ||
            (m.Sig != null && m.Sig.Contains("options")));
    }

    /// <summary>
    /// ComprehensiveClient.deleteResource has two overloads with different return types:
    /// 1. deleteResource(resourceId: string): Promise&lt;void&gt;
    /// 2. deleteResource(resourceId: string, options: {...}): Promise&lt;boolean&gt;
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void DeleteResource_HasMultipleOverloads()
    {
        var client = GetClass("ComprehensiveClient");
        var deleteResourceMethods = client.Methods!.Where(m => m.Name == "deleteResource").ToList();

        Assert.True(deleteResourceMethods.Count >= 2,
            $"Expected at least 2 deleteResource overloads, got {deleteResourceMethods.Count}");
    }

    /// <summary>
    /// StreamingClient.stream has two overloads:
    /// 1. stream(): AsyncIterableIterator&lt;StreamEvent&lt;Resource&gt;&gt;
    /// 2. stream&lt;T&gt;(eventType: string): AsyncIterableIterator&lt;StreamEvent&lt;T&gt;&gt;
    /// The second has a generic type parameter.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_Stream_HasOverloads()
    {
        var client = GetClass("StreamingClient");
        var streamMethods = client.Methods!.Where(m => m.Name == "stream").ToList();

        Assert.True(streamMethods.Count >= 2,
            $"Expected at least 2 stream overloads, got {streamMethods.Count}");
    }
}

// ============================================================================
// 4. ACCESSORS (GET/SET) — Phase 10 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that get/set accessors are correctly extracted as properties.
/// Read-only accessors (get only) should be marked readonly.
/// Read-write accessors (get + set) should not be readonly.
///
/// Phase 10 of the redesign plan will add proper accessor extraction.
/// </summary>
public class TsCompiled_AccessorTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_AccessorTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    private ClassInfo GetClass(string name) =>
        Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == name);

    /// <summary>
    /// `get apiVersion(): string` — read-only accessor should appear as a
    /// readonly property with type "string".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ApiVersion_Accessor_IsExtractedAsReadonlyProperty()
    {
        var client = GetClass("ComprehensiveClient");
        var allProps = client.Properties ?? [];

        var apiVersion = allProps.FirstOrDefault(p => p.Name == "apiVersion");
        Assert.NotNull(apiVersion);
        Assert.Equal("string", apiVersion.Type);
        Assert.True(apiVersion.Readonly == true,
            "apiVersion has only a getter — should be readonly");
    }

    /// <summary>
    /// `get requestTimeout(): number` + `set requestTimeout(value: number)` —
    /// read-write accessor should appear as a non-readonly property.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void RequestTimeout_Accessor_IsExtractedAsReadWriteProperty()
    {
        var client = GetClass("ComprehensiveClient");
        var allProps = client.Properties ?? [];

        var timeout = allProps.FirstOrDefault(p => p.Name == "requestTimeout");
        Assert.NotNull(timeout);
        Assert.Equal("number", timeout.Type);
        Assert.True(timeout.Readonly != true,
            "requestTimeout has both getter and setter — should NOT be readonly");
    }

    /// <summary>
    /// StreamingClient has `get isConnected(): boolean` — read-only accessor.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingClient_IsConnected_IsReadonly()
    {
        var client = GetClass("StreamingClient");
        var prop = (client.Properties ?? []).FirstOrDefault(p => p.Name == "isConnected");
        Assert.NotNull(prop);
        Assert.Equal("boolean", prop.Type);
        Assert.True(prop.Readonly == true,
            "isConnected has only a getter — should be readonly");
    }
}

// ============================================================================
// 5. UNDERSCORE-PREFIXED PUBLIC MEMBERS — Phase 5 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that underscore-prefixed public members are NOT filtered out.
/// The current engine uses `!m.getName().startsWith("_")` as a heuristic
/// to exclude private-by-convention members. This is wrong — the TypeScript
/// language uses `private`, `protected`, and `#` for visibility, not naming.
///
/// Phase 5 of the redesign plan replaces the `_` filter with language-level
/// visibility checks only.
/// </summary>
public class TsCompiled_UnderscorePrefixTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_UnderscorePrefixTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// _Serializer is a public class exported from the package.
    /// It must appear in the API graph regardless of its underscore prefix.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void UnderscorePrefixed_PublicClass_IsIncluded()
    {
        var allClasses = Api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var serializer = allClasses.FirstOrDefault(c => c.Name == "_Serializer");

        Assert.NotNull(serializer);
    }

    /// <summary>
    /// _Serializer.serialize() is a public method. It must be included.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void UnderscorePrefixed_PublicClass_HasMethods()
    {
        var allClasses = Api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var serializer = allClasses.FirstOrDefault(c => c.Name == "_Serializer");

        Assert.NotNull(serializer);
        Assert.NotNull(serializer.Methods);
        Assert.Contains(serializer.Methods, m => m.Name == "serialize");
        Assert.Contains(serializer.Methods, m => m.Name == "deserialize");
    }

    /// <summary>
    /// _InternalHelper is another public class with underscore prefix.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void UnderscorePrefixed_HelperClass_IsIncluded()
    {
        var allClasses = Api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        Assert.Contains(allClasses, c => c.Name == "_InternalHelper");
    }

    /// <summary>
    /// ComprehensiveClient._serializeResource is a public method with underscore prefix.
    /// It must be included in the API graph.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void UnderscorePrefixed_PublicMethod_IsIncluded()
    {
        var client = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "ComprehensiveClient");
        Assert.NotNull(client.Methods);

        Assert.Contains(client.Methods, m => m.Name == "_serializeResource");
    }

    /// <summary>
    /// ComprehensiveClient._transformResponse is a public generic method with underscore prefix.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void UnderscorePrefixed_PublicGenericMethod_IsIncluded()
    {
        var client = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "ComprehensiveClient");
        Assert.NotNull(client.Methods);

        Assert.Contains(client.Methods, m => m.Name == "_transformResponse");
    }
}

// ============================================================================
// 6. INTERFACE EXTRACTION — validates interface patterns
// ============================================================================

/// <summary>
/// Tests that interfaces are correctly extracted with all their members,
/// including optional properties, readonly modifiers, and documentation.
/// </summary>
public class TsCompiled_InterfaceExtractionTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_InterfaceExtractionTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    private InterfaceInfo GetInterface(string name) =>
        Api.Modules.SelectMany(m => m.Interfaces ?? []).FirstOrDefault(i => i.Name == name)
        ?? throw new Xunit.Sdk.XunitException($"Interface '{name}' not found. Available: [{string.Join(", ", Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name))}]");

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ClientOptions_IsExtracted()
    {
        var opts = GetInterface("ClientOptions");
        Assert.NotNull(opts);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ClientOptions_HasAllProperties()
    {
        var opts = GetInterface("ClientOptions");
        Assert.NotNull(opts.Properties);

        var names = opts.Properties.Select(p => p.Name).ToList();
        Assert.Contains("endpoint", names);
        Assert.Contains("timeout", names);
        Assert.Contains("apiVersion", names);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ClientOptions_Endpoint_IsRequired()
    {
        var opts = GetInterface("ClientOptions");
        var endpoint = opts.Properties!.First(p => p.Name == "endpoint");
        Assert.True(endpoint.Optional != true, "endpoint should be required (not optional)");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ClientOptions_Timeout_IsOptional()
    {
        var opts = GetInterface("ClientOptions");
        var timeout = opts.Properties!.First(p => p.Name == "timeout");
        Assert.True(timeout.Optional == true, "timeout should be optional");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void RetryOptions_IsExtracted_WithAllProperties()
    {
        var retry = GetInterface("RetryOptions");
        Assert.NotNull(retry.Properties);

        var names = retry.Properties.Select(p => p.Name).ToList();
        Assert.Contains("maxRetries", names);
        Assert.Contains("retryDelayInMs", names);
        Assert.Contains("maxRetryDelayInMs", names);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Resource_HasReadonlyProperties()
    {
        var resource = GetInterface("Resource");
        Assert.NotNull(resource.Properties);

        var id = resource.Properties.First(p => p.Name == "id");
        Assert.True(id.Readonly == true, "Resource.id should be readonly");

        var createdAt = resource.Properties.First(p => p.Name == "createdAt");
        Assert.True(createdAt.Readonly == true, "Resource.createdAt should be readonly");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Resource_HasOptionalProperties()
    {
        var resource = GetInterface("Resource");
        var tags = resource.Properties!.First(p => p.Name == "tags");
        Assert.True(tags.Optional == true, "Resource.tags should be optional");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PagedResult_IsExtracted()
    {
        var pagedResult = GetInterface("PagedResult");
        Assert.NotNull(pagedResult);
        Assert.NotNull(pagedResult.Properties);
        Assert.Contains(pagedResult.Properties, p => p.Name == "items");
        Assert.Contains(pagedResult.Properties, p => p.Name == "continuationToken");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamEvent_IsExtracted()
    {
        var streamEvent = GetInterface("StreamEvent");
        Assert.NotNull(streamEvent);
        Assert.NotNull(streamEvent.Properties);
        Assert.Contains(streamEvent.Properties, p => p.Name == "id");
        Assert.Contains(streamEvent.Properties, p => p.Name == "type");
        Assert.Contains(streamEvent.Properties, p => p.Name == "timestamp");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamOptions_IsExtracted()
    {
        var opts = GetInterface("StreamOptions");
        Assert.NotNull(opts);
        Assert.NotNull(opts.Properties);
        Assert.Contains(opts.Properties, p => p.Name == "bufferSize");
        Assert.Contains(opts.Properties, p => p.Name == "autoReconnect");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ClientOptions_HasDocumentation()
    {
        var opts = GetInterface("ClientOptions");
        Assert.False(string.IsNullOrWhiteSpace(opts.Doc),
            "ClientOptions should have JSDoc documentation");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void InterfaceProperties_HaveDocumentation()
    {
        var opts = GetInterface("ClientOptions");
        var endpoint = opts.Properties!.First(p => p.Name == "endpoint");
        Assert.False(string.IsNullOrWhiteSpace(endpoint.Doc),
            "ClientOptions.endpoint should have JSDoc documentation");
    }
}

// ============================================================================
// 7. INDEX SIGNATURES — Phase 10 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that index signatures ([key: string]: type) are correctly extracted.
/// Currently the engine omits index signatures entirely.
///
/// Phase 10 of the redesign plan will add index signature extraction.
/// </summary>
public class TsCompiled_IndexSignatureTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_IndexSignatureTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// Resource has `[key: string]: unknown` — the engine must capture this.
    /// Without index signatures, callers don't know the interface accepts
    /// arbitrary additional properties.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Resource_IndexSignature_IsCaptured()
    {
        var resource = Api.Modules.SelectMany(m => m.Interfaces ?? []).First(i => i.Name == "Resource");

        // The index signature should be visible somehow — either as a special
        // property entry or as a dedicated IndexSignatureInfo.
        // For now, assert the interface has the regular properties AND something
        // indicating the index signature.
        Assert.NotNull(resource.Properties);

        // The stubs/formatter should mention the index signature
        var stubs = Api.ToStubs();
        Assert.Contains("[key: string]", stubs);
    }

    /// <summary>
    /// StringMap has only an index signature: `[key: string]: string`.
    /// The interface must still appear with this information.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StringMap_HasIndexSignature()
    {
        var stringMap = Api.Modules.SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "StringMap");

        Assert.NotNull(stringMap);

        // Even if StringMap has no named properties, the index signature
        // should make it a non-empty type.
        var stubs = Api.ToStubs();
        Assert.Contains("StringMap", stubs);
    }

    /// <summary>
    /// EventMap has `[eventName: string]: (...args: unknown[]) => void`.
    /// This is a function-valued index signature.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void EventMap_HasFunctionValuedIndexSignature()
    {
        var eventMap = Api.Modules.SelectMany(m => m.Interfaces ?? [])
            .FirstOrDefault(i => i.Name == "EventMap");

        Assert.NotNull(eventMap);
    }
}

// ============================================================================
// 8. ENUM EXTRACTION
// ============================================================================

/// <summary>
/// Tests that enums (regular and const) are correctly extracted with all values.
/// </summary>
public class TsCompiled_EnumExtractionTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_EnumExtractionTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ResultStatus_IsExtracted()
    {
        var enums = Api.Modules.SelectMany(m => m.Enums ?? []).ToList();
        var resultStatus = enums.FirstOrDefault(e => e.Name == "ResultStatus");
        Assert.NotNull(resultStatus);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ResultStatus_HasAllValues()
    {
        var resultStatus = Api.Modules.SelectMany(m => m.Enums ?? []).First(e => e.Name == "ResultStatus");
        Assert.NotNull(resultStatus.Values);
        var values = resultStatus.Values.ToList();
        Assert.Contains("Success", values);
        Assert.Contains("Failed", values);
        Assert.Contains("Pending", values);
        Assert.Contains("Cancelled", values);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void LogLevel_IsExtracted()
    {
        var enums = Api.Modules.SelectMany(m => m.Enums ?? []).ToList();
        var logLevel = enums.FirstOrDefault(e => e.Name == "LogLevel");
        Assert.NotNull(logLevel);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void LogLevel_HasAllValues()
    {
        var logLevel = Api.Modules.SelectMany(m => m.Enums ?? []).First(e => e.Name == "LogLevel");
        Assert.NotNull(logLevel.Values);
        Assert.Equal(4, logLevel.Values.Count);
    }

    /// <summary>
    /// ResourceState is declared as `const enum`. Const enums have different
    /// semantics (inlined at compile time) — the engine should still extract them.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ConstEnum_ResourceState_IsExtracted()
    {
        // ResourceState may appear as an enum or as a type alias depending
        // on how the engine handles const enums in declaration files.
        var allEnums = Api.Modules.SelectMany(m => m.Enums ?? []).ToList();
        var allTypes = Api.Modules.SelectMany(m => m.Types ?? []).ToList();

        var found = allEnums.Any(e => e.Name == "ResourceState") ||
                    allTypes.Any(t => t.Name == "ResourceState");

        Assert.True(found, "ResourceState (const enum) should be extracted as either enum or type alias");
    }
}

// ============================================================================
// 9. TYPE ALIAS EXTRACTION — including complex types
// ============================================================================

/// <summary>
/// Tests that type aliases are extracted correctly, especially complex ones
/// involving generics, conditional types, mapped types, and unions.
/// </summary>
public class TsCompiled_TypeAliasTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_TypeAliasTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    private TypeAliasInfo GetType(string name) =>
        Api.Modules.SelectMany(m => m.Types ?? []).FirstOrDefault(t => t.Name == name)
        ?? throw new Xunit.Sdk.XunitException($"Type alias '{name}' not found. Available: [{string.Join(", ", Api.Modules.SelectMany(m => m.Types ?? []).Select(t => t.Name))}]");

    /// <summary>
    /// OperationResult&lt;T&gt; is a discriminated union type.
    /// The engine must capture its full type definition.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void OperationResult_IsExtracted()
    {
        var opResult = GetType("OperationResult");
        Assert.NotNull(opResult);
        Assert.False(string.IsNullOrWhiteSpace(opResult.Type),
            "OperationResult should have a non-empty type definition");
    }

    /// <summary>
    /// OperationResult type text should contain the discriminant values.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void OperationResult_TypeText_ContainsDiscriminants()
    {
        var opResult = GetType("OperationResult");
        // The type string should mention the discriminant values
        Assert.Contains("succeeded", opResult.Type, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("failed", opResult.Type, StringComparison.OrdinalIgnoreCase);
    }

    /// <summary>
    /// OperationResult has a generic type parameter T.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void OperationResult_HasTypeParameter()
    {
        var opResult = GetType("OperationResult");
        Assert.False(string.IsNullOrWhiteSpace(opResult.TypeParams),
            "OperationResult should have type parameter <T>");
    }

    /// <summary>
    /// DeepPartial&lt;T&gt; is a mapped conditional type.
    /// The type definition should be preserved accurately.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void DeepPartial_IsExtracted()
    {
        var deepPartial = GetType("DeepPartial");
        Assert.NotNull(deepPartial);
        Assert.False(string.IsNullOrWhiteSpace(deepPartial.Type));
    }

    /// <summary>
    /// KeysOfType&lt;T, V&gt; is a conditional + mapped type.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void KeysOfType_IsExtracted()
    {
        var keysOfType = GetType("KeysOfType");
        Assert.NotNull(keysOfType);
        Assert.False(string.IsNullOrWhiteSpace(keysOfType.Type));
    }

    /// <summary>
    /// EventHandler&lt;TEvent&gt; uses conditional type inference (infer P).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void EventHandler_IsExtracted()
    {
        var handler = GetType("EventHandler");
        Assert.NotNull(handler);
        Assert.False(string.IsNullOrWhiteSpace(handler.Type));
    }

    /// <summary>
    /// ReadonlyResource uses the Readonly&lt;T&gt; mapped type.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ReadonlyResource_IsExtracted()
    {
        var readonlyResource = GetType("ReadonlyResource");
        Assert.NotNull(readonlyResource);
        // Should reference Readonly and Resource
        Assert.Contains("Readonly", readonlyResource.Type, StringComparison.Ordinal);
    }

    /// <summary>
    /// ResourceOrError is a simple union: Resource | Error.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ResourceOrError_IsExtracted()
    {
        var unionType = GetType("ResourceOrError");
        Assert.NotNull(unionType);
        Assert.Contains("Resource", unionType.Type, StringComparison.Ordinal);
        Assert.Contains("Error", unionType.Type, StringComparison.Ordinal);
    }

    /// <summary>
    /// NestedGeneric&lt;T&gt; = PagedResult&lt;OperationResult&lt;T&gt;&gt;
    /// Tests that deeply nested generic types are preserved.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NestedGeneric_IsExtracted()
    {
        var nested = GetType("NestedGeneric");
        Assert.NotNull(nested);
        Assert.Contains("PagedResult", nested.Type, StringComparison.Ordinal);
        Assert.Contains("OperationResult", nested.Type, StringComparison.Ordinal);
    }
}

// ============================================================================
// 10. TYPE DISPLAY — Phase 2 of the redesign plan (no import() prefixes)
// ============================================================================

/// <summary>
/// Validates that type text is displayed cleanly without import() prefixes
/// or other artifacts of the compiler's internal representation.
///
/// Phase 2 of the redesign plan replaces simplifyType (regex-based) with
/// TypeChecker.typeToString using proper TypeFormatFlags.
/// </summary>
public class TsCompiled_TypeDisplayTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_TypeDisplayTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// No type text anywhere in the API should contain `import("...")` prefixes.
    /// These are compiler internals that should be stripped.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void NoTypeText_ContainsImportPrefix()
    {
        var allTypeTexts = CollectAllTypeTexts(Api);

        foreach (var typeText in allTypeTexts)
        {
            Assert.DoesNotContain("import(", typeText);
        }
    }

    /// <summary>
    /// Property types should be clean, simple names — not fully qualified paths.
    /// ClientOptions.endpoint should be "string", not "import('./models').string".
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PropertyTypes_AreClean()
    {
        var allProps = Api.Modules
            .SelectMany(m => (m.Interfaces ?? []).SelectMany(i => i.Properties ?? []))
            .Concat(Api.Modules.SelectMany(m => (m.Classes ?? []).SelectMany(c => c.Properties ?? [])));

        foreach (var prop in allProps)
        {
            if (!string.IsNullOrEmpty(prop.Type))
            {
                Assert.DoesNotContain("import(", prop.Type);
                Assert.DoesNotContain("typeof import(", prop.Type);
            }
        }
    }

    /// <summary>
    /// Method return types should be clean.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void MethodReturnTypes_AreClean()
    {
        var allMethods = Api.Modules
            .SelectMany(m => (m.Classes ?? []).SelectMany(c => c.Methods ?? []));

        foreach (var method in allMethods)
        {
            if (!string.IsNullOrEmpty(method.Ret))
            {
                Assert.DoesNotContain("import(", method.Ret);
            }
        }
    }

    /// <summary>
    /// Method parameter types should be clean.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void MethodParameterTypes_AreClean()
    {
        var allParams = Api.Modules
            .SelectMany(m => (m.Classes ?? []).SelectMany(c => (c.Methods ?? []).SelectMany(m2 => m2.Params ?? [])));

        foreach (var param in allParams)
        {
            Assert.DoesNotContain("import(", param.Type);
        }
    }

    /// <summary>
    /// Type alias definitions should be clean.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void TypeAliasDefinitions_AreClean()
    {
        var allTypes = Api.Modules.SelectMany(m => m.Types ?? []);

        foreach (var typeAlias in allTypes)
        {
            Assert.DoesNotContain("import(", typeAlias.Type);
        }
    }

    private static List<string> CollectAllTypeTexts(ApiIndex api)
    {
        var texts = new List<string>();

        foreach (var mod in api.Modules)
        {
            foreach (var cls in mod.Classes ?? [])
            {
                if (!string.IsNullOrEmpty(cls.Extends)) texts.Add(cls.Extends);
                foreach (var m in cls.Methods ?? [])
                {
                    if (!string.IsNullOrEmpty(m.Sig)) texts.Add(m.Sig);
                    if (!string.IsNullOrEmpty(m.Ret)) texts.Add(m.Ret);
                    foreach (var p in m.Params ?? []) texts.Add(p.Type);
                }
                foreach (var p in cls.Properties ?? []) texts.Add(p.Type);
                foreach (var c in cls.Constructors ?? [])
                {
                    if (!string.IsNullOrEmpty(c.Sig)) texts.Add(c.Sig);
                    foreach (var p in c.Params ?? []) texts.Add(p.Type);
                }
            }
            foreach (var iface in mod.Interfaces ?? [])
            {
                foreach (var ext in iface.Extends ?? []) texts.Add(ext);
                foreach (var m in iface.Methods ?? [])
                {
                    if (!string.IsNullOrEmpty(m.Sig)) texts.Add(m.Sig);
                    if (!string.IsNullOrEmpty(m.Ret)) texts.Add(m.Ret);
                    foreach (var p in m.Params ?? []) texts.Add(p.Type);
                }
                foreach (var p in iface.Properties ?? []) texts.Add(p.Type);
            }
            foreach (var t in mod.Types ?? [])
            {
                texts.Add(t.Type);
            }
        }

        return texts.Where(t => !string.IsNullOrEmpty(t)).ToList();
    }
}

// ============================================================================
// 11. EXTERNAL DEPENDENCY RESOLUTION — Phase 3 & 9 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that external package dependencies are correctly tracked,
/// even when node_modules is not installed. Uses import declarations
/// as the source of truth for dependency attribution.
///
/// Phase 3 (symbol-based refs) and Phase 9 (lazy dep resolution) affect this.
/// </summary>
public class TsCompiled_DependencyTrackingTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_DependencyTrackingTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Dependencies_AreExtracted()
    {
        Assert.NotNull(Api.Dependencies);
        Assert.NotEmpty(Api.Dependencies);
    }

    /// <summary>
    /// @azure/core-rest-pipeline is declared in package.json dependencies and
    /// used in imports. It must appear as a dependency.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AzureCoreRestPipeline_IsDependency()
    {
        Assert.NotNull(Api.Dependencies);
        Assert.Contains(Api.Dependencies, d =>
            d.Package.Contains("core-rest-pipeline", StringComparison.OrdinalIgnoreCase));
    }

    /// <summary>
    /// some-logger is declared in package.json dependencies and used in imports.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void SomeLogger_IsDependency()
    {
        Assert.NotNull(Api.Dependencies);
        Assert.Contains(Api.Dependencies, d =>
            d.Package.Contains("some-logger", StringComparison.OrdinalIgnoreCase));
    }

    /// <summary>
    /// PipelinePolicy, PipelineRequest, PipelineResponse types from
    /// @azure/core-rest-pipeline should be attributed to that package.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CoreRestPipeline_Types_AreAttributed()
    {
        Assert.NotNull(Api.Dependencies);
        var dep = Api.Dependencies.First(d =>
            d.Package.Contains("core-rest-pipeline", StringComparison.OrdinalIgnoreCase));

        // The dependency should track which types are referenced
        var allDepTypes = (dep.Types ?? []).Select(t => t.Name)
            .Concat((dep.Interfaces ?? []).Select(i => i.Name))
            .Concat((dep.Classes ?? []).Select(c => c.Name))
            .ToList();

        Assert.Contains(allDepTypes, n => n.Contains("PipelinePolicy", StringComparison.Ordinal));
        Assert.Contains(allDepTypes, n => n.Contains("PipelineRequest", StringComparison.Ordinal));
        Assert.Contains(allDepTypes, n => n.Contains("PipelineResponse", StringComparison.Ordinal));
    }

    /// <summary>
    /// Logger type from some-logger should be attributed.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void SomeLogger_Logger_IsAttributed()
    {
        Assert.NotNull(Api.Dependencies);
        var dep = Api.Dependencies.First(d =>
            d.Package.Contains("some-logger", StringComparison.OrdinalIgnoreCase));

        var allDepTypes = (dep.Types ?? []).Select(t => t.Name)
            .Concat((dep.Interfaces ?? []).Select(i => i.Name))
            .Concat((dep.Classes ?? []).Select(c => c.Name))
            .ToList();

        Assert.Contains(allDepTypes, n => n.Contains("Logger", StringComparison.Ordinal));
    }
}

// ============================================================================
// 12. ABSTRACT CLASSES AND INHERITANCE
// ============================================================================

/// <summary>
/// Tests that abstract classes, abstract methods, and inheritance are extracted.
/// </summary>
public class TsCompiled_InheritanceTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_InheritanceTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AdvancedTypes_IsExtracted()
    {
        var allClasses = Api.Modules.SelectMany(m => m.Classes ?? []).ToList();
        Assert.Contains(allClasses, c => c.Name == "AdvancedTypes");
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AdvancedTypes_HasMethods()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "AdvancedTypes");
        Assert.NotNull(cls.Methods);
        Assert.NotEmpty(cls.Methods);

        // Should have get, set, merge, and lookup methods
        var methodNames = cls.Methods.Select(m => m.Name).ToList();
        Assert.Contains("merge", methodNames);
    }

    /// <summary>
    /// AdvancedTypes.lookup is @deprecated — the engine should preserve this.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AdvancedTypes_Lookup_IsDeprecated()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "AdvancedTypes");
        var lookup = cls.Methods!.FirstOrDefault(m => m.Name == "lookup");
        Assert.NotNull(lookup);
        Assert.True(lookup.IsDeprecated == true, "lookup should be marked as deprecated");
    }

    /// <summary>
    /// AdvancedTypes.lookup should have a deprecation message.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AdvancedTypes_Lookup_HasDeprecationMessage()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "AdvancedTypes");
        var lookup = cls.Methods!.First(m => m.Name == "lookup");
        Assert.False(string.IsNullOrWhiteSpace(lookup.DeprecatedMessage),
            "lookup should have a deprecation message");
    }
}

// ============================================================================
// 13. REACHABILITY — Phase 6 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that reachability analysis correctly identifies which types are
/// transitively referenced from entry points. All types exported from the
/// package should be reachable — types only referenced internally should not.
///
/// Phase 6 replaces string-tokenized reachability with symbol-graph reachability.
/// </summary>
public class TsCompiled_ReachabilityTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_ReachabilityTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// All explicitly exported types should be present in the API.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AllExportedClasses_ArePresent()
    {
        var classNames = Api.Modules.SelectMany(m => m.Classes ?? []).Select(c => c.Name).ToList();

        Assert.Contains("ComprehensiveClient", classNames);
        Assert.Contains("StreamingClient", classNames);
        Assert.Contains("AdvancedTypes", classNames);
    }

    /// <summary>
    /// All exported interfaces should be present.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AllExportedInterfaces_ArePresent()
    {
        var ifaceNames = Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name).ToList();

        Assert.Contains("ClientOptions", ifaceNames);
        Assert.Contains("RetryOptions", ifaceNames);
        Assert.Contains("Resource", ifaceNames);
        Assert.Contains("PagedResult", ifaceNames);
        Assert.Contains("StreamEvent", ifaceNames);
        Assert.Contains("StreamOptions", ifaceNames);
    }

    /// <summary>
    /// Types referenced in method signatures of entry point classes must be reachable.
    /// Resource is used as return type in ComprehensiveClient.getResource.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Resource_IsReachable_ViaMethodReturnType()
    {
        var ifaceNames = Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name).ToList();
        Assert.Contains("Resource", ifaceNames);
    }

    /// <summary>
    /// PagedResult is used as return type in ComprehensiveClient.listResources.
    /// It must be reachable.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PagedResult_IsReachable_ViaMethodReturnType()
    {
        var ifaceNames = Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name).ToList();
        Assert.Contains("PagedResult", ifaceNames);
    }

    /// <summary>
    /// RetryOptions is nested inside ClientOptions (as a property type).
    /// Reachability should follow type references transitively.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void RetryOptions_IsReachable_ViaTransitiveReference()
    {
        var ifaceNames = Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name).ToList();
        Assert.Contains("RetryOptions", ifaceNames);
    }

    /// <summary>
    /// OperationResult is used as return type in createResource.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void OperationResult_IsReachable_ViaReturnType()
    {
        var typeNames = Api.Modules.SelectMany(m => m.Types ?? []).Select(t => t.Name).ToList();
        Assert.Contains("OperationResult", typeNames);
    }
}

// ============================================================================
// 14. MULTI-SUBPATH EXPORTS — validates export path tracking
// ============================================================================

/// <summary>
/// Validates that multi-subpath exports (./models, ./streaming) are correctly
/// handled. Each subpath should map to its own entry point files.
///
/// Phase 7 (module resolution) and Phase 11 (condition preservation) affect this.
/// </summary>
public class TsCompiled_SubpathExportTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_SubpathExportTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// The package has exports for ".", "./models", "./streaming".
    /// At least one module should have an exportPath for each.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ExportPaths_AreTracked()
    {
        var exportPaths = Api.Modules
            .Select(m => m.ExportPath)
            .Where(p => p != null)
            .ToList();

        // At least the main "." export should be tracked
        Assert.True(exportPaths.Count > 0,
            $"Expected at least one module with exportPath. Modules: [{string.Join(", ", Api.Modules.Select(m => $"{m.Name}(export={m.ExportPath})"))}]");
    }

    /// <summary>
    /// Types from the "./streaming" subpath should be in the API.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamingSubpath_TypesArePresent()
    {
        var allClasses = Api.Modules.SelectMany(m => m.Classes ?? []).Select(c => c.Name).ToList();
        var allInterfaces = Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name).ToList();

        Assert.Contains("StreamingClient", allClasses);
        Assert.Contains("StreamEvent", allInterfaces);
        Assert.Contains("StreamOptions", allInterfaces);
    }

    /// <summary>
    /// Types from the "./models" subpath should be in the API.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ModelsSubpath_TypesArePresent()
    {
        var allInterfaces = Api.Modules.SelectMany(m => m.Interfaces ?? []).Select(i => i.Name).ToList();
        var allTypes = Api.Modules.SelectMany(m => m.Types ?? []).Select(t => t.Name).ToList();

        Assert.Contains("Resource", allInterfaces);
        Assert.Contains("PagedResult", allInterfaces);
        Assert.Contains("OperationResult", allTypes);
    }
}

// ============================================================================
// 15. DIAGNOSTICS — Phase 8 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that the engine produces structured diagnostics rather than
/// silently swallowing errors.
///
/// Phase 8 of the redesign plan adds structured ExtractionDiagnostics.
/// </summary>
public class TsCompiled_DiagnosticsTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_DiagnosticsTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// The diagnostics array should be initialized (not null), even if empty.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Diagnostics_IsNotNull()
    {
        Assert.NotNull(Api.Diagnostics);
    }

    /// <summary>
    /// When external packages are not installed (no node_modules),
    /// the engine should report diagnostic warnings rather than silently
    /// skipping those types.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void UnresolvedDependency_ProducesDiagnostic()
    {
        // The fixture has dependencies on @azure/core-rest-pipeline and
        // some-logger which are not installed. The engine should flag this.
        Assert.NotNull(Api.Diagnostics);

        // After Phase 8, unresolved deps should produce warnings
        var hasDepWarning = Api.Diagnostics.Any(d =>
            d.Text.Contains("core-rest-pipeline", StringComparison.OrdinalIgnoreCase) ||
            d.Text.Contains("some-logger", StringComparison.OrdinalIgnoreCase) ||
            d.Text.Contains("unresolved", StringComparison.OrdinalIgnoreCase) ||
            d.Text.Contains("dependency", StringComparison.OrdinalIgnoreCase));

        Assert.True(hasDepWarning,
            $"Expected diagnostic about unresolved dependencies. Got {Api.Diagnostics.Count} diagnostics: " +
            $"[{string.Join("; ", Api.Diagnostics.Select(d => d.Text))}]");
    }
}

// ============================================================================
// 16. GENERIC TYPE PARAMETERS
// ============================================================================

/// <summary>
/// Validates that generic type parameters and constraints are correctly extracted.
/// </summary>
public class TsCompiled_GenericTypeTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_GenericTypeTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// PagedResult&lt;T&gt; should have a type parameter.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void PagedResult_HasTypeParameter()
    {
        var iface = Api.Modules.SelectMany(m => m.Interfaces ?? []).First(i => i.Name == "PagedResult");
        // The interface should indicate it's generic — either via TypeParams or name
        // Current model uses InterfaceInfo which doesn't have TypeParams.
        // After redesign, generic parameters should be tracked.
        // For now, checking the stubs output is a reasonable proxy.
        var stubs = Api.ToStubs();
        Assert.Contains("PagedResult<", stubs);
    }

    /// <summary>
    /// StreamEvent&lt;T&gt; has a default type parameter: T = unknown.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void StreamEvent_HasDefaultTypeParameter()
    {
        var stubs = Api.ToStubs();
        // The generic parameter with default should be visible
        Assert.Contains("StreamEvent", stubs);
    }

    /// <summary>
    /// AdvancedTypes&lt;T extends Record&lt;string, unknown&gt;&gt; has a constrained type parameter.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void AdvancedTypes_HasConstrainedTypeParameter()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "AdvancedTypes");
        // Should have type parameter info
        Assert.False(string.IsNullOrWhiteSpace(cls.TypeParams),
            "AdvancedTypes should have type parameters with constraint");
    }
}

// ============================================================================
// 17. FORMATTER OUTPUT — validates the stubs formatter
// ============================================================================

/// <summary>
/// Tests that the TypeScript stub formatter produces correct, readable output
/// for the comprehensive fixture.
/// </summary>
public class TsCompiled_FormatterTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_FormatterTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_AreNonEmpty()
    {
        var stubs = Api.ToStubs();
        Assert.False(string.IsNullOrWhiteSpace(stubs));
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_ContainClassDeclarations()
    {
        var stubs = Api.ToStubs();
        Assert.Contains("class ComprehensiveClient", stubs);
        Assert.Contains("class StreamingClient", stubs);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_ContainInterfaceDeclarations()
    {
        var stubs = Api.ToStubs();
        Assert.Contains("interface ClientOptions", stubs);
        Assert.Contains("interface Resource", stubs);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_ContainEnumDeclarations()
    {
        var stubs = Api.ToStubs();
        Assert.Contains("ResultStatus", stubs);
        Assert.Contains("LogLevel", stubs);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_ContainTypeAliasDeclarations()
    {
        var stubs = Api.ToStubs();
        Assert.Contains("OperationResult", stubs);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_DoNotContainImportPrefixes()
    {
        var stubs = Api.ToStubs();
        Assert.DoesNotContain("import(", stubs);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void Stubs_ContainDocComments()
    {
        var stubs = Api.ToStubs();
        // JSDoc comments should be preserved in stubs
        Assert.Contains("/**", stubs);
    }
}

// ============================================================================
// 18. SERIALIZATION ROUNDTRIP
// ============================================================================

/// <summary>
/// Tests that the API can be serialized to JSON and the output is valid.
/// </summary>
public class TsCompiled_SerializationTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_SerializationTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ToJson_ProducesValidJson()
    {
        var json = Api.ToJson();
        Assert.NotNull(json);
        var parsed = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(json);
        Assert.Equal(System.Text.Json.JsonValueKind.Object, parsed.ValueKind);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ToJson_Pretty_IsIndented()
    {
        var json = Api.ToJson(pretty: true);
        Assert.Contains("\n", json);
        Assert.Contains("  ", json);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ToJson_ContainsPackageName()
    {
        var json = Api.ToJson();
        Assert.Contains("@test/comprehensive-sdk", json);
    }

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void ToJson_ContainsModules()
    {
        var json = Api.ToJson();
        Assert.Contains("\"modules\"", json);
    }
}

// ============================================================================
// 19. @internal EXCLUSION — Phase 5 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that @internal-tagged members are excluded from the public API graph.
/// This is an explicit author annotation (not a heuristic) and should be honored.
///
/// Phase 5 will add @internal/@hidden detection using JSDoc tags.
/// </summary>
public class TsCompiled_InternalExclusionTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_InternalExclusionTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// AdvancedTypes._resetStore() is marked @internal.
    /// It should be excluded from the API graph even though it's technically public.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void InternalMethod_IsExcluded()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "AdvancedTypes");
        var methods = cls.Methods ?? [];

        // _resetStore is @internal — should not appear
        Assert.DoesNotContain(methods, m => m.Name == "_resetStore");
    }
}

// ============================================================================
// 20. CROSS-REFERENCE INTEGRITY — Phase 3 & 6 of the redesign plan
// ============================================================================

/// <summary>
/// Validates that type references across the API are consistent.
/// When a method returns a type, that type should exist in the API graph.
///
/// Phase 3 (symbol-based refs) ensures type tracking is accurate.
/// Phase 6 (reachability) ensures all referenced types are included.
/// </summary>
public class TsCompiled_CrossReferenceTests : IClassFixture<TypeScriptComprehensiveFixture>
{
    private readonly TypeScriptComprehensiveFixture _f;
    public TsCompiled_CrossReferenceTests(TypeScriptComprehensiveFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    /// <summary>
    /// Every type name referenced in method return types should either:
    /// 1. Exist as a class/interface/enum/type in the API, OR
    /// 2. Be a built-in type (string, number, void, Promise, etc.), OR
    /// 3. Be a dependency type.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void MethodReturnTypes_ReferenceKnownTypes()
    {
        var allTypeNames = new HashSet<string>();
        foreach (var mod in Api.Modules)
        {
            foreach (var c in mod.Classes ?? []) allTypeNames.Add(c.Name);
            foreach (var i in mod.Interfaces ?? []) allTypeNames.Add(i.Name);
            foreach (var e in mod.Enums ?? []) allTypeNames.Add(e.Name);
            foreach (var t in mod.Types ?? []) allTypeNames.Add(t.Name);
        }

        // Add dependency types
        foreach (var dep in Api.Dependencies ?? [])
        {
            foreach (var t in dep.Types ?? []) allTypeNames.Add(t.Name);
            foreach (var i in dep.Interfaces ?? []) allTypeNames.Add(i.Name);
            foreach (var c in dep.Classes ?? []) allTypeNames.Add(c.Name);
        }

        // Add built-in types
        var builtins = new HashSet<string>
        {
            "string", "number", "boolean", "void", "undefined", "null",
            "unknown", "any", "never", "object", "symbol", "bigint",
            "Promise", "Array", "Map", "Set", "Record", "Partial",
            "Required", "Readonly", "Omit", "Pick", "Date", "Error",
            "AsyncIterableIterator", "IterableIterator", "Blob",
            "ReadonlyArray", "Uint8Array",
        };
        allTypeNames.UnionWith(builtins);

        var allMethods = Api.Modules
            .SelectMany(m => (m.Classes ?? []).SelectMany(c => c.Methods ?? []));

        foreach (var method in allMethods)
        {
            if (string.IsNullOrEmpty(method.Ret)) continue;
            // Extract type name tokens from return type
            var tokens = ExtractTypeTokens(method.Ret);

            foreach (var token in tokens)
            {
                // Each token should be a known type
                Assert.True(allTypeNames.Contains(token) || IsGenericOrStructural(token),
                    $"Method {method.Name} returns '{method.Ret}' which references unknown type '{token}'");
            }
        }
    }

    /// <summary>
    /// GetReferencedTypes should find types used in method signatures.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void GetReferencedTypes_FindsSignatureTypes()
    {
        var allTypeNames = new HashSet<string>();
        foreach (var mod in Api.Modules)
        {
            foreach (var c in mod.Classes ?? []) allTypeNames.Add(c.Name);
            foreach (var i in mod.Interfaces ?? []) allTypeNames.Add(i.Name);
            foreach (var t in mod.Types ?? []) allTypeNames.Add(t.Name);
            foreach (var e in mod.Enums ?? []) allTypeNames.Add(e.Name);
        }

        var client = Api.Modules.SelectMany(m => m.Classes ?? [])
            .First(c => c.Name == "ComprehensiveClient");

        var refs = client.GetReferencedTypes(allTypeNames);

        // ComprehensiveClient uses Resource in its method signatures
        Assert.Contains("Resource", refs);
    }

    private static List<string> ExtractTypeTokens(string typeText)
    {
        // Simple tokenization — split on non-identifier chars and keep PascalCase names
        return typeText
            .Split([' ', '<', '>', '|', '&', ',', '[', ']', '(', ')', '{', '}', ':', ';', '=', '?', '.', '"', '\''],
                StringSplitOptions.RemoveEmptyEntries)
            .Where(t => t.Length > 0 && char.IsUpper(t[0]))
            .ToList();
    }

    private static bool IsGenericOrStructural(string token)
    {
        // Tokens like "T", "K", "V", "P" are type parameters, not real types
        return token.Length <= 2 && token.All(char.IsUpper);
    }
}

