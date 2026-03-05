// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

using DotNetModels = PublicApiGraphEngine.DotNet;
using GoModels = PublicApiGraphEngine.Go;
using JavaModels = PublicApiGraphEngine.Java;
using PyModels = PublicApiGraphEngine.Python;
using TsModels = PublicApiGraphEngine.TypeScript;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Regression tests for GetReferencedTypes across all language models.
/// These verify that the tokenized implementation produces the same (or better)
/// results as the original Contains-based implementation.
/// </summary>
public class GetReferencedTypesTests
{
    // -------------------------------------------------------------------------
    // TypeScript ClassInfo
    // -------------------------------------------------------------------------

    [Fact]
    public void TypeScript_ClassInfo_FindsTypeInMethodSignature()
    {
        var cls = new TsModels.ClassInfo
        {
            Name = "BlobClient",
            Methods =
            [
                new TsModels.MethodInfo { Name = "download", Sig = "download(options?: DownloadOptions)", Ret = "Promise<BlobDownloadResponse>" }
            ],
            ReferencedTypes = ["DownloadOptions", "BlobDownloadResponse"]
        };

        HashSet<string> allTypes = ["DownloadOptions", "BlobDownloadResponse", "UnrelatedType"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("DownloadOptions", refs);
        Assert.Contains("BlobDownloadResponse", refs);
        Assert.DoesNotContain("UnrelatedType", refs);
    }

    [Fact]
    public void TypeScript_ClassInfo_FindsTypeInProperty()
    {
        var cls = new TsModels.ClassInfo
        {
            Name = "BlobClient",
            Properties =
            [
                new TsModels.PropertyInfo { Name = "pipeline", Type = "Pipeline" }
            ],
            ReferencedTypes = ["Pipeline"]
        };

        HashSet<string> allTypes = ["Pipeline", "Other"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("Pipeline", refs);
        Assert.DoesNotContain("Other", refs);
    }

    [Fact]
    public void TypeScript_ClassInfo_FindsBaseClass()
    {
        var cls = new TsModels.ClassInfo
        {
            Name = "BlobClient",
            Extends = "StorageClient<BlobClientOptions>",
            ReferencedTypes = ["StorageClient"]
        };

        HashSet<string> allTypes = ["StorageClient", "BlobClientOptions"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("StorageClient", refs);
        // BlobClientOptions is inside the generic param of Extends — stripping <
        Assert.DoesNotContain("BlobClientOptions", refs);
    }

    [Fact]
    public void TypeScript_ClassInfo_FindsImplementedInterfaces()
    {
        var cls = new TsModels.ClassInfo
        {
            Name = "MyClient",
            Implements = ["Disposable", "AsyncIterable<Item>"],
            ReferencedTypes = ["Disposable", "AsyncIterable"]
        };

        HashSet<string> allTypes = ["Disposable", "AsyncIterable", "Item"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("Disposable", refs);
        Assert.Contains("AsyncIterable", refs);
        // Item is inside generic param — stripping <
        Assert.DoesNotContain("Item", refs);
    }

    [Fact]
    public void TypeScript_ClassInfo_EmptyClass_ReturnsEmpty()
    {
        var cls = new TsModels.ClassInfo { Name = "Empty" };
        HashSet<string> allTypes = ["SomeType"];
        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Empty(refs);
    }

    [Fact]
    public void TypeScript_ClassInfo_NoFalsePositiveOnSubstring()
    {
        // Key correctness improvement: "Error" should NOT match "ErrorHandler"
        var cls = new TsModels.ClassInfo
        {
            Name = "MyClient",
            Methods =
            [
                new TsModels.MethodInfo { Name = "handle", Sig = "handle(handler: ErrorHandler)", Ret = "void" }
            ],
            ReferencedTypes = ["ErrorHandler"]
        };

        HashSet<string> allTypes = ["Error", "ErrorHandler"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("ErrorHandler", refs);
        // With tokenized approach, "Error" should NOT match since "ErrorHandler" is a single token
        // The old Contains-based approach would include "Error" as a false positive.
        // We assert the new (correct) behavior:
        Assert.DoesNotContain("Error", refs);
    }

    // -------------------------------------------------------------------------
    // TypeScript InterfaceInfo (via UsageAnalyzer helper - tested indirectly)
    // -------------------------------------------------------------------------

    // InterfaceInfo doesn't have GetReferencedTypes on the model itself—
    // it's a static method in TypeScriptUsageAnalyzer. We test the model-level
    // methods here; the static helper will be updated to delegate.

    // -------------------------------------------------------------------------
    // Python ClassInfo
    // -------------------------------------------------------------------------

    [Fact]
    public void Python_ClassInfo_FindsTypeInMethodSignature()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "BlobClient",
            Methods =
            [
                new PyModels.MethodInfo("download_blob", "download_blob(self, offset: int) -> BlobProperties", null, null, null, null)
            ]
        };

        HashSet<string> allTypes = ["BlobProperties", "ContainerClient"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("BlobProperties", refs);
        Assert.DoesNotContain("ContainerClient", refs);
    }

    [Fact]
    public void Python_ClassInfo_FindsBaseClass()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "BlobClient",
            Base = "StorageClient"
        };

        HashSet<string> allTypes = ["StorageClient"];
        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("StorageClient", refs);
    }

    [Fact]
    public void Python_ClassInfo_FindsTypeInProperty()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "BlobClient",
            Properties =
            [
                new PyModels.PropertyInfo("pipeline", "Pipeline", null)
            ]
        };

        HashSet<string> allTypes = ["Pipeline"];
        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("Pipeline", refs);
    }

    [Fact]
    public void Python_ClassInfo_NullPropertyType_DoesNotThrow()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "Foo",
            Properties =
            [
                new PyModels.PropertyInfo("bar", null, null)
            ]
        };

        HashSet<string> allTypes = ["SomeType"];
        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Empty(refs);
    }

    [Fact]
    public void Python_ClassInfo_GenericBase_StripsGenericParam()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "BlobClient",
            Base = "AsyncIterator[BlobItem]"
        };

        HashSet<string> allTypes = ["AsyncIterator", "BlobItem"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("AsyncIterator", refs);
        // Python splits on '[', so BlobItem should NOT be found via Base
        Assert.DoesNotContain("BlobItem", refs);
    }

    [Fact]
    public void Python_ClassInfo_NoFalsePositiveOnSubstring()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "MyClient",
            Methods =
            [
                new PyModels.MethodInfo("handle", "handle(self, handler: ErrorHandler) -> None", null, null, null, null)
            ]
        };

        HashSet<string> allTypes = ["Error", "ErrorHandler"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);
    }

    // -------------------------------------------------------------------------
    // Go StructApi
    // -------------------------------------------------------------------------

    [Fact]
    public void Go_StructApi_FindsTypeInMethodSignature()
    {
        var strct = new GoModels.StructApi
        {
            Name = "BlobClient",
            Methods =
            [
                new GoModels.FuncApi { Name = "Download", Sig = "func (c *BlobClient) Download(ctx context.Context, opts *DownloadOptions)", Ret = "(*DownloadResponse, error)" }
            ]
        };

        HashSet<string> allTypes = ["DownloadOptions", "DownloadResponse", "ContainerClient"];
        var refs = strct.GetReferencedTypes(allTypes);

        Assert.Contains("DownloadOptions", refs);
        Assert.Contains("DownloadResponse", refs);
        Assert.DoesNotContain("ContainerClient", refs);
    }

    [Fact]
    public void Go_StructApi_FindsTypeInField()
    {
        var strct = new GoModels.StructApi
        {
            Name = "ClientOptions",
            Fields =
            [
                new GoModels.FieldApi { Name = "Pipeline", Type = "Pipeline" }
            ]
        };

        HashSet<string> allTypes = ["Pipeline"];
        var refs = strct.GetReferencedTypes(allTypes);
        Assert.Contains("Pipeline", refs);
    }

    [Fact]
    public void Go_StructApi_EmptyStruct_ReturnsEmpty()
    {
        var strct = new GoModels.StructApi { Name = "Empty" };
        HashSet<string> allTypes = ["Foo"];
        var refs = strct.GetReferencedTypes(allTypes);
        Assert.Empty(refs);
    }

    [Fact]
    public void Go_StructApi_NoFalsePositiveOnSubstring()
    {
        var strct = new GoModels.StructApi
        {
            Name = "MyClient",
            Methods =
            [
                new GoModels.FuncApi { Name = "Handle", Sig = "func Handle(h ErrorHandler)", Ret = "error" }
            ]
        };

        HashSet<string> allTypes = ["Error", "ErrorHandler", "error"];
        var refs = strct.GetReferencedTypes(allTypes);

        Assert.Contains("ErrorHandler", refs);
        Assert.Contains("error", refs);
        Assert.DoesNotContain("Error", refs);
    }

    // -------------------------------------------------------------------------
    // Cross-language: large-scale behavior
    // -------------------------------------------------------------------------

    [Fact]
    public void AllLanguages_ManyTypesAndSignatures_FindsCorrectReferences()
    {
        // Simulate a moderately-sized SDK: 50 types, class with 20 methods
        var typeNames = new HashSet<string>();
        for (int i = 0; i < 50; i++)
            typeNames.Add($"Type{i}");

        // TypeScript
        var tsMethods = new List<TsModels.MethodInfo>();
        for (int i = 0; i < 20; i++)
            tsMethods.Add(new TsModels.MethodInfo
            {
                Name = $"method{i}",
                Sig = $"method{i}(arg: Type{i % 50})",
                Ret = $"Type{(i + 1) % 50}"
            });

        var tsClass = new TsModels.ClassInfo
        {
            Name = "Client",
            Methods = tsMethods,
            ReferencedTypes = Enumerable.Range(0, 21).Select(i => $"Type{i}").ToList()
        };
        var tsRefs = tsClass.GetReferencedTypes(typeNames);

        // Should find Type0..Type20 (from sig) and Type1..Type20 (from ret)
        for (int i = 0; i <= 20; i++)
            Assert.Contains($"Type{i}", tsRefs);

        // Python
        var pyMethods = new List<PyModels.MethodInfo>();
        for (int i = 0; i < 20; i++)
            pyMethods.Add(new PyModels.MethodInfo(
                $"method{i}", $"method{i}(self, arg: Type{i % 50}) -> Type{(i + 1) % 50}", null, null, null, null));

        var pyClass = new PyModels.ClassInfo { Name = "Client", Methods = pyMethods };
        var pyRefs = pyClass.GetReferencedTypes(typeNames);

        for (int i = 0; i <= 20; i++)
            Assert.Contains($"Type{i}", pyRefs);

        // Go
        var goMethods = new List<GoModels.FuncApi>();
        for (int i = 0; i < 20; i++)
            goMethods.Add(new GoModels.FuncApi
            {
                Name = $"Method{i}",
                Sig = $"func Method{i}(arg Type{i % 50})",
                Ret = $"Type{(i + 1) % 50}"
            });

        var goStruct = new GoModels.StructApi { Name = "Client", Methods = goMethods };
        var goRefs = goStruct.GetReferencedTypes(typeNames);

        for (int i = 0; i <= 20; i++)
            Assert.Contains($"Type{i}", goRefs);
    }

    // -------------------------------------------------------------------------
    // Java ClassInfo
    // -------------------------------------------------------------------------

    [Fact]
    public void Java_ClassInfo_FindsTypeInMethodSignature()
    {
        var cls = new JavaModels.ClassInfo
        {
            Name = "WidgetClient",
            Methods =
            [
                new JavaModels.MethodInfo { Name = "create", Sig = "(WidgetOptions options)", Ret = "Widget" }
            ]
        };

        HashSet<string> allTypes = ["WidgetOptions", "Widget", "UnrelatedType"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("WidgetOptions", refs);
        Assert.Contains("Widget", refs);
        Assert.DoesNotContain("UnrelatedType", refs);
    }

    [Fact]
    public void Java_ClassInfo_FindsBaseAndInterfaces()
    {
        var cls = new JavaModels.ClassInfo
        {
            Name = "MyClient",
            Extends = "BaseClient",
            Implements = ["Closeable", "Iterable<Item>"]
        };

        HashSet<string> allTypes = ["BaseClient", "Closeable", "Iterable", "Item"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("BaseClient", refs);
        Assert.Contains("Closeable", refs);
        Assert.Contains("Iterable", refs);
        Assert.DoesNotContain("Item", refs); // stripped by Split('<')
    }

    [Fact]
    public void Java_ClassInfo_FindsTypeInField()
    {
        var cls = new JavaModels.ClassInfo
        {
            Name = "Config",
            Fields = [new JavaModels.FieldInfo { Name = "pipeline", Type = "Pipeline" }]
        };

        HashSet<string> allTypes = ["Pipeline"];
        var refs = cls.GetReferencedTypes(allTypes);
        Assert.Contains("Pipeline", refs);
    }

    [Fact]
    public void Java_ClassInfo_NoFalsePositiveOnSubstring()
    {
        var cls = new JavaModels.ClassInfo
        {
            Name = "MyClient",
            Methods =
            [
                new JavaModels.MethodInfo { Name = "handle", Sig = "(ErrorHandler handler)", Ret = "void" }
            ]
        };

        HashSet<string> allTypes = ["Error", "ErrorHandler"];
        var refs = cls.GetReferencedTypes(allTypes);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);
    }

    // -------------------------------------------------------------------------
    // DotNet TypeInfo
    // -------------------------------------------------------------------------

    [Fact]
    public void DotNet_TypeInfo_FindsTypeInMemberSignature()
    {
        var type = new DotNetModels.TypeInfo
        {
            Name = "WidgetClient",
            Kind = "class",
            Members =
            [
                new DotNetModels.MemberInfo { Name = "Create", Kind = "method", Signature = "Widget Create(WidgetOptions options)" }
            ]
        };

        HashSet<string> allTypes = ["Widget", "WidgetOptions", "Unrelated"];
        var refs = type.GetReferencedTypes(allTypes);

        Assert.Contains("Widget", refs);
        Assert.Contains("WidgetOptions", refs);
        Assert.DoesNotContain("Unrelated", refs);
    }

    [Fact]
    public void DotNet_TypeInfo_FindsBaseAndInterfaces()
    {
        var type = new DotNetModels.TypeInfo
        {
            Name = "BlobClient",
            Kind = "class",
            Base = "ServiceClient",
            Interfaces = ["IDisposable"]
        };

        HashSet<string> allTypes = ["ServiceClient", "IDisposable"];
        var refs = type.GetReferencedTypes(allTypes);

        Assert.Contains("ServiceClient", refs);
        Assert.Contains("IDisposable", refs);
    }

    [Fact]
    public void DotNet_TypeInfo_NoFalsePositiveOnSubstring()
    {
        var type = new DotNetModels.TypeInfo
        {
            Name = "MyClient",
            Kind = "class",
            Members =
            [
                new DotNetModels.MemberInfo { Name = "Handle", Kind = "method", Signature = "void Handle(ErrorHandler handler)" }
            ]
        };

        HashSet<string> allTypes = ["Error", "ErrorHandler"];
        var refs = type.GetReferencedTypes(allTypes);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);
    }

    [Fact]
    public void DotNet_TypeInfo_EmptyType_ReturnsEmpty()
    {
        var type = new DotNetModels.TypeInfo { Name = "Empty", Kind = "class" };
        HashSet<string> allTypes = ["SomeType"];
        var refs = type.GetReferencedTypes(allTypes);
        Assert.Empty(refs);
    }

    #region CollectReferencedTypes (reusable HashSet overload)

    [Fact]
    public void DotNet_CollectReferencedTypes_MatchesGetReferencedTypes()
    {
        var type = new DotNetModels.TypeInfo
        {
            Name = "BlobClient",
            Base = "ServiceClient",
            Members =
            [
                new DotNetModels.MemberInfo { Name = "Download", Kind = "method", Signature = "Download(BlobOptions options)" }
            ]
        };
        HashSet<string> allTypes = ["ServiceClient", "BlobOptions", "Irrelevant"];

        var fromGet = type.GetReferencedTypes(allTypes);
        var fromCollect = new HashSet<string>();
        type.CollectReferencedTypes(allTypes, fromCollect);

        Assert.Equal(fromGet.OrderBy(x => x), fromCollect.OrderBy(x => x));
    }

    [Fact]
    public void DotNet_CollectReferencedTypes_ClearsSetOnReuse()
    {
        var type1 = new DotNetModels.TypeInfo
        {
            Name = "A",
            Members = [new DotNetModels.MemberInfo { Name = "M", Kind = "method", Signature = "M(Foo x)" }]
        };
        var type2 = new DotNetModels.TypeInfo
        {
            Name = "B",
            Members = [new DotNetModels.MemberInfo { Name = "M", Kind = "method", Signature = "M(Bar x)" }]
        };
        HashSet<string> allTypes = ["Foo", "Bar"];
        var reusable = new HashSet<string>();

        type1.CollectReferencedTypes(allTypes, reusable);
        Assert.Contains("Foo", reusable);
        Assert.DoesNotContain("Bar", reusable);

        type2.CollectReferencedTypes(allTypes, reusable);
        Assert.Contains("Bar", reusable);
        Assert.DoesNotContain("Foo", reusable); // Cleared before second use
    }

    [Fact]
    public void Python_CollectReferencedTypes_MatchesGetReferencedTypes()
    {
        var cls = new PyModels.ClassInfo
        {
            Name = "Client",
            Base = "BaseClient",
            Methods = [new PyModels.MethodInfo("do_work", "self, opts: WorkOptions", null, false, null, null, "Result")]
        };
        HashSet<string> allTypes = ["BaseClient", "WorkOptions", "Result"];

        var fromGet = cls.GetReferencedTypes(allTypes);
        var fromCollect = new HashSet<string>();
        cls.CollectReferencedTypes(allTypes, fromCollect);

        Assert.Equal(fromGet.OrderBy(x => x), fromCollect.OrderBy(x => x));
    }

    [Fact]
    public void Go_CollectReferencedTypes_MatchesGetReferencedTypes()
    {
        var s = new GoModels.StructApi
        {
            Name = "Client",
            Embeds = ["*BaseClient"],
            Methods = [new GoModels.FuncApi { Name = "Do", Sig = "opts Options", Ret = "Result" }]
        };
        HashSet<string> allTypes = ["BaseClient", "Options", "Result"];

        var fromGet = s.GetReferencedTypes(allTypes);
        var fromCollect = new HashSet<string>();
        s.CollectReferencedTypes(allTypes, fromCollect);

        Assert.Equal(fromGet.OrderBy(x => x), fromCollect.OrderBy(x => x));
    }

    [Fact]
    public void Java_CollectReferencedTypes_MatchesGetReferencedTypes()
    {
        var cls = new JavaModels.ClassInfo
        {
            Name = "Client",
            Extends = "BaseClient",
            Methods = [new JavaModels.MethodInfo { Name = "do", Sig = "Options opts", Ret = "Result" }]
        };
        HashSet<string> allTypes = ["BaseClient", "Options", "Result"];

        var fromGet = cls.GetReferencedTypes(allTypes);
        var fromCollect = new HashSet<string>();
        cls.CollectReferencedTypes(allTypes, fromCollect);

        Assert.Equal(fromGet.OrderBy(x => x), fromCollect.OrderBy(x => x));
    }

    [Fact]
    public void TypeScript_CollectReferencedTypes_MatchesGetReferencedTypes()
    {
        var cls = new TsModels.ClassInfo
        {
            Name = "Client",
            Extends = "BaseClient",
            Methods = [new TsModels.MethodInfo { Name = "do", Sig = "opts: Options", Ret = "Promise<Result>" }],
            ReferencedTypes = ["BaseClient", "Options", "Result"]
        };
        HashSet<string> allTypes = ["BaseClient", "Options", "Result"];

        var fromGet = cls.GetReferencedTypes(allTypes);
        var fromCollect = new HashSet<string>();
        cls.CollectReferencedTypes(allTypes, fromCollect);

        Assert.Equal(fromGet.OrderBy(x => x), fromCollect.OrderBy(x => x));
    }

    #endregion
}
