// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

// ============================================================================
// FIXTURE — TypeScript package exercising private/protected visibility filtering
// ============================================================================

/// <summary>
/// Shared fixture for a TypeScript package that tests type reference collection
/// only follows public API signatures, not private/protected implementation details.
///
/// Models the @azure/storage-blob pattern:
/// - PublicClient extends BaseClient
/// - BaseClient has a protected GeneratedContext member (implementation detail)
/// - GeneratedContext has InternalOperations → InternalResponseModel chain
/// - Only types reachable from PUBLIC signatures should appear in referencedTypes
/// </summary>
public class TypeScriptVisibilityFixture : IAsyncLifetime
{
    private static readonly string TestFixturesPath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "TypeScriptVisibility");

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
// Tests: referencedTypes should only include types from public signatures
// ============================================================================

/// <summary>
/// Verifies that the TypeScript engine's type reference collection does NOT
/// leak types reachable only through private or protected members.
///
/// Root cause pattern (from @azure/storage-blob):
/// BlobClient extends StorageClient
///   → StorageClient.storageClientContext (protected) : GeneratedStorageClient
///     → GeneratedStorageClient.blob : Blob (operations interface)
///       → Blob.download() returns BlobDownloadResponse (generated type alias)
/// The generated BlobDownloadResponse type alias should NOT appear in
/// BlobClient's referencedTypes because it's only reachable via a protected member.
/// </summary>
public class TypeScriptVisibilityTests : IClassFixture<TypeScriptVisibilityFixture>
{
    private readonly TypeScriptVisibilityFixture _f;
    public TypeScriptVisibilityTests(TypeScriptVisibilityFixture f) => _f = f;
    private ApiIndex Api { get { if (_f.SkipReason != null) Assert.Skip(_f.SkipReason); return _f.Api!; } }

    [Fact]
    public void Api_IsSuccessfullyExtracted()
    {
        Assert.NotNull(Api);
        Assert.True(Api.Modules.Count > 0, "Expected at least one module");
    }

    [Fact]
    public void PublicClient_IsExtracted()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).FirstOrDefault(c => c.Name == "PublicClient");
        Assert.NotNull(cls);
    }

    [Fact]
    public void BaseClient_IsExtracted()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).FirstOrDefault(c => c.Name == "BaseClient");
        Assert.NotNull(cls);
    }

    // ----- Public types SHOULD be in referencedTypes -----

    [Fact]
    public void PublicClient_References_BaseClient_ViaExtends()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.Contains("BaseClient", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void PublicClient_References_PublicResponse_ViaReturnType()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.Contains("PublicResponse", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void PublicClient_References_PublicOptions_ViaParameterType()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.Contains("PublicOptions", cls.ReferencedTypes ?? []);
    }

    // ----- Internal types should NOT be in referencedTypes -----

    [Fact]
    public void PublicClient_DoesNotReference_GeneratedContext_ViaProtectedMember()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.DoesNotContain("GeneratedContext", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void PublicClient_DoesNotReference_InternalOperations_ViaProtectedChain()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.DoesNotContain("InternalOperations", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void PublicClient_DoesNotReference_InternalResponseModel_ViaProtectedChain()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.DoesNotContain("InternalResponseModel", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void PublicClient_DoesNotReference_PrivateHelperConfig_ViaPrivateMember()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "PublicClient");
        Assert.DoesNotContain("PrivateHelperConfig", cls.ReferencedTypes ?? []);
    }

    // ----- BaseClient should also respect visibility -----

    [Fact]
    public void BaseClient_DoesNotReference_GeneratedContext_ViaProtectedMember()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "BaseClient");
        Assert.DoesNotContain("GeneratedContext", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void BaseClient_DoesNotReference_PrivateHelperConfig_ViaPrivateMember()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "BaseClient");
        Assert.DoesNotContain("PrivateHelperConfig", cls.ReferencedTypes ?? []);
    }

    [Fact]
    public void BaseClient_DoesNotReference_InternalOperations()
    {
        var cls = Api.Modules.SelectMany(m => m.Classes ?? []).First(c => c.Name == "BaseClient");
        Assert.DoesNotContain("InternalOperations", cls.ReferencedTypes ?? []);
    }

}
