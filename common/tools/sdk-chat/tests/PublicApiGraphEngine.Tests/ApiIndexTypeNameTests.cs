// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

using GoModels = PublicApiGraphEngine.Go;
using TsModels = PublicApiGraphEngine.TypeScript;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for CollectReferencedTypes on Go IfaceApi and TypeScript TypeAliasInfo.
/// </summary>
public class ApiIndexTypeNameTests
{
    [Fact]
    public void Go_IfaceApi_CollectReferencedTypes_FindsMethodReturnTypes()
    {
        var iface = new GoModels.IfaceApi
        {
            Name = "TokenProvider",
            Methods =
            [
                new GoModels.FuncApi { Name = "GetToken", Sig = "ctx context.Context, opts TokenRequestOptions", Ret = "AccessToken" }
            ]
        };

        var allTypeNames = new HashSet<string>(["TokenProvider", "TokenRequestOptions", "AccessToken", "Client"]);
        var result = new HashSet<string>();
        iface.CollectReferencedTypes(allTypeNames, result);

        Assert.Contains("TokenRequestOptions", result);
        Assert.Contains("AccessToken", result);
        Assert.DoesNotContain("Client", result); // Not referenced
    }

    [Fact]
    public void Go_IfaceApi_CollectReferencedTypes_FindsEmbeddedInterfaces()
    {
        var iface = new GoModels.IfaceApi
        {
            Name = "FullClient",
            Embeds = ["BaseClient", "io.Reader"],
        };

        var allTypeNames = new HashSet<string>(["FullClient", "BaseClient"]);
        var result = new HashSet<string>();
        iface.CollectReferencedTypes(allTypeNames, result);

        Assert.Contains("BaseClient", result);
        Assert.DoesNotContain("io.Reader", result); // Not in allTypeNames
    }

    [Fact]
    public void TypeScript_TypeAliasInfo_CollectReferencedTypes_FindsReferences()
    {
        var typeAlias = new TsModels.TypeAliasInfo
        {
            Name = "UnionType",
            Type = "ModelA | ModelB | string",
            ReferencedTypes = ["ModelA", "ModelB"]
        };

        var allTypeNames = new HashSet<string>(["ModelA", "ModelB", "UnionType", "Unrelated"]);
        var result = new HashSet<string>();
        typeAlias.CollectReferencedTypes(allTypeNames, result);

        Assert.Contains("ModelA", result);
        Assert.Contains("ModelB", result);
        Assert.DoesNotContain("Unrelated", result);
        Assert.DoesNotContain("string", result); // not in allTypeNames
    }
}
