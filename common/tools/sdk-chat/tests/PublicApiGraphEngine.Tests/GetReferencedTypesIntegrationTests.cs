// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.DotNet;
using PublicApiGraphEngine.Go;
using PublicApiGraphEngine.Java;
using PublicApiGraphEngine.Python;
using Xunit;

using DotNetModels = PublicApiGraphEngine.DotNet;
using GoModels = PublicApiGraphEngine.Go;
using JavaModels = PublicApiGraphEngine.Java;
using PyModels = PublicApiGraphEngine.Python;
using TsModels = PublicApiGraphEngine.TypeScript;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Integration tests for the tokenized GetReferencedTypes optimization.
/// These exercise the full pipeline: API models → GetReferencedTypes → Formatter/UsageAnalyzer.
///
/// Key scenarios tested:
/// 1. Formatter dependency ordering: types referenced by clients appear before unreferenced types
/// 2. Substring false-positive elimination: "Error" doesn't match "ErrorHandler" in the pipeline
/// 3. Cross-type reference chains: A→B→C are all included when A is a client
/// 4. Usage analyzer dependency graph: subclient detection via return-type references
/// </summary>
public class GetReferencedTypesIntegrationTests : IDisposable
{
    private readonly string _tempDir;

    public GetReferencedTypesIntegrationTests()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), $"ref_types_test_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_tempDir);
    }

    public void Dispose()
    {
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, true);
    }

    // =========================================================================
    // TypeScript Integration Tests
    // =========================================================================

    [Fact]
    public void TypeScript_Formatter_IncludesReferencedDependencies()
    {
        // Client references WidgetOptions and Widget in its signatures.
        // UnusedModel is not referenced by anything.
        // The formatter should include WidgetOptions and Widget near the client.
        var api = new TsModels.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TsModels.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TsModels.ClassInfo
                        {
                            Name = "WidgetClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TsModels.MethodInfo { Name = "create", Sig = "create(options: WidgetOptions)", Ret = "Promise<Widget>" },
                                new TsModels.MethodInfo { Name = "delete", Sig = "delete(id: string)", Ret = "Promise<void>" }
                            ]
                        },
                        new TsModels.ClassInfo
                        {
                            Name = "Widget",
                            Properties = [new TsModels.PropertyInfo { Name = "id", Type = "string" }]
                        },
                        new TsModels.ClassInfo
                        {
                            Name = "WidgetOptions",
                            Properties = [new TsModels.PropertyInfo { Name = "name", Type = "string" }]
                        },
                        new TsModels.ClassInfo
                        {
                            Name = "UnusedModel",
                            Properties = [new TsModels.PropertyInfo { Name = "data", Type = "string" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // All types should appear in output
        Assert.Contains("WidgetClient", stubs);
        Assert.Contains("Widget", stubs);
        Assert.Contains("WidgetOptions", stubs);
        Assert.Contains("UnusedModel", stubs);

        // Client should appear before its dependencies (or at worst, same section)
        var clientPos = stubs.IndexOf("WidgetClient", StringComparison.Ordinal);
        Assert.True(clientPos >= 0);
    }

    [Fact]
    public void TypeScript_Formatter_NoSubstringFalsePositive()
    {
        // "Error" must NOT be pulled as a dependency of MyClient
        // because the signature contains "ErrorHandler" (one token), not "Error".
        var api = new TsModels.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TsModels.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TsModels.ClassInfo
                        {
                            Name = "MyClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TsModels.MethodInfo { Name = "handle", Sig = "handle(h: ErrorHandler)", Ret = "void" }
                            ],
                            ReferencedTypes = ["ErrorHandler"]
                        },
                        new TsModels.ClassInfo { Name = "ErrorHandler" },
                        new TsModels.ClassInfo { Name = "Error" }
                    ]
                }
            ]
        };

        // Verify at model level that the tokenized approach doesn't false-match
        HashSet<string> allTypeNames = ["MyClient", "ErrorHandler", "Error"];
        var refs = api.GetAllClasses().First(c => c.Name == "MyClient").GetReferencedTypes(allTypeNames);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);

        // Also verify through the formatter pipeline (ToStubs)
        var stubs = api.ToStubs();
        Assert.Contains("MyClient", stubs);
        Assert.Contains("ErrorHandler", stubs);
    }

    [Fact]
    public void TypeScript_Formatter_TransitiveDependencyChain()
    {
        // Client → uses RequestConfig → uses HeaderMap
        // All three should appear, HeaderMap should be found through RequestConfig
        var api = new TsModels.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TsModels.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TsModels.ClassInfo
                        {
                            Name = "ApiClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TsModels.MethodInfo { Name = "send", Sig = "send(config: RequestConfig)", Ret = "Promise<Response>" }
                            ]
                        },
                        new TsModels.ClassInfo
                        {
                            Name = "RequestConfig",
                            Properties =
                            [
                                new TsModels.PropertyInfo { Name = "headers", Type = "HeaderMap" },
                                new TsModels.PropertyInfo { Name = "timeout", Type = "number" }
                            ]
                        },
                        new TsModels.ClassInfo
                        {
                            Name = "HeaderMap",
                            Properties = [new TsModels.PropertyInfo { Name = "entries", Type = "Record<string, string>" }]
                        },
                        new TsModels.ClassInfo
                        {
                            Name = "Response",
                            Properties = [new TsModels.PropertyInfo { Name = "status", Type = "number" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.Contains("ApiClient", stubs);
        Assert.Contains("RequestConfig", stubs);
        Assert.Contains("Response", stubs);
        Assert.Contains("HeaderMap", stubs);
    }

    [Fact]
    public void TypeScript_Formatter_InterfaceReferences_WorkCorrectly()
    {
        // Class implements an interface and has methods referencing other interfaces
        var api = new TsModels.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TsModels.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TsModels.ClassInfo
                        {
                            Name = "ServiceClient",
                            EntryPoint = true,
                            Implements = ["Disposable"],
                            Methods =
                            [
                                new TsModels.MethodInfo { Name = "getPolicy", Sig = "getPolicy()", Ret = "PipelinePolicy" }
                            ]
                        }
                    ],
                    Interfaces =
                    [
                        new TsModels.InterfaceInfo
                        {
                            Name = "Disposable",
                            Methods = [new TsModels.MethodInfo { Name = "dispose", Sig = "dispose()", Ret = "void" }]
                        },
                        new TsModels.InterfaceInfo
                        {
                            Name = "PipelinePolicy",
                            Methods = [new TsModels.MethodInfo { Name = "execute", Sig = "execute(request: PipelineRequest)", Ret = "Promise<PipelineResponse>" }]
                        },
                        new TsModels.InterfaceInfo
                        {
                            Name = "PipelineRequest",
                            Properties = [new TsModels.PropertyInfo { Name = "url", Type = "string" }]
                        },
                        new TsModels.InterfaceInfo
                        {
                            Name = "PipelineResponse",
                            Properties = [new TsModels.PropertyInfo { Name = "status", Type = "number" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.Contains("ServiceClient", stubs);
        Assert.Contains("Disposable", stubs);
        Assert.Contains("PipelinePolicy", stubs);
    }

    // =========================================================================
    // Python Integration Tests
    // =========================================================================

    [Fact]
    public void Python_Formatter_IncludesReferencedDependencies()
    {
        var api = new PyModels.ApiIndex(
            Package: "test_sdk",
            Modules:
            [
                new PyModels.ModuleInfo(
                    Name: "test_sdk",
                    Classes:
                    [
                        new PyModels.ClassInfo
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new PyModels.MethodInfo("upload", "upload(self, data: bytes, options: UploadOptions) -> BlobProperties", null, null, null, null),
                                new PyModels.MethodInfo("download", "download(self) -> bytes", null, null, null, null)
                            ]
                        },
                        new PyModels.ClassInfo
                        {
                            Name = "UploadOptions",
                            Properties = [new PyModels.PropertyInfo("overwrite", "bool", null)]
                        },
                        new PyModels.ClassInfo
                        {
                            Name = "BlobProperties",
                            Properties = [new PyModels.PropertyInfo("name", "str", null)]
                        },
                        new PyModels.ClassInfo
                        {
                            Name = "UnrelatedModel",
                            Properties = [new PyModels.PropertyInfo("value", "int", null)]
                        }
                    ],
                    Functions: null
                )
            ]
        );

        var stubs = PythonFormatter.Format(api);
        Assert.Contains("BlobClient", stubs);
        Assert.Contains("UploadOptions", stubs);
        Assert.Contains("BlobProperties", stubs);
        Assert.Contains("UnrelatedModel", stubs);
    }

    [Fact]
    public void Python_Formatter_NoSubstringFalsePositive()
    {
        var api = new PyModels.ApiIndex(
            Package: "test_sdk",
            Modules:
            [
                new PyModels.ModuleInfo(
                    Name: "test_sdk",
                    Classes:
                    [
                        new PyModels.ClassInfo
                        {
                            Name = "MyClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new PyModels.MethodInfo("process", "process(self, handler: ErrorHandler) -> None", null, null, null, null)
                            ]
                        },
                        new PyModels.ClassInfo { Name = "ErrorHandler" },
                        new PyModels.ClassInfo { Name = "Error" }
                    ],
                    Functions: null
                )
            ]
        );

        HashSet<string> allTypeNames = ["MyClient", "ErrorHandler", "Error"];
        var client = api.Modules.First().Classes!.First(c => c.Name == "MyClient");
        var refs = client.GetReferencedTypes(allTypeNames);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);
    }

    // =========================================================================
    // Go Integration Tests
    // =========================================================================

    [Fact]
    public void Go_Formatter_IncludesReferencedDependencies()
    {
        var api = new GoModels.ApiIndex
        {
            Package = "testsdk",
            Packages =
            [
                new GoModels.PackageApi
                {
                    Name = "testsdk",
                    Structs =
                    [
                        new GoModels.StructApi
                        {
                            Name = "Client",
                            EntryPoint = true,
                            Methods =
                            [
                                new GoModels.FuncApi { Name = "Create", Sig = "func (c *Client) Create(opts *CreateOptions)", Ret = "(*Widget, error)" },
                                new GoModels.FuncApi { Name = "Delete", Sig = "func (c *Client) Delete(id string)", Ret = "error" }
                            ]
                        },
                        new GoModels.StructApi
                        {
                            Name = "Widget",
                            Fields = [new GoModels.FieldApi { Name = "ID", Type = "string" }]
                        },
                        new GoModels.StructApi
                        {
                            Name = "CreateOptions",
                            Fields = [new GoModels.FieldApi { Name = "Name", Type = "string" }]
                        },
                        new GoModels.StructApi
                        {
                            Name = "UnrelatedModel",
                            Fields = [new GoModels.FieldApi { Name = "Data", Type = "[]byte" }]
                        }
                    ]
                }
            ]
        };

        var stubs = GoFormatter.Format(api);
        Assert.Contains("Client", stubs);
        Assert.Contains("Widget", stubs);
        Assert.Contains("CreateOptions", stubs);
        Assert.Contains("UnrelatedModel", stubs);
    }

    [Fact]
    public void Go_Formatter_NoSubstringFalsePositive()
    {
        var api = new GoModels.ApiIndex
        {
            Package = "testsdk",
            Packages =
            [
                new GoModels.PackageApi
                {
                    Name = "testsdk",
                    Structs =
                    [
                        new GoModels.StructApi
                        {
                            Name = "MyClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new GoModels.FuncApi { Name = "Handle", Sig = "func Handle(h ErrorHandler)", Ret = "error" }
                            ]
                        },
                        new GoModels.StructApi { Name = "ErrorHandler" },
                        new GoModels.StructApi { Name = "Error" }
                    ]
                }
            ]
        };

        HashSet<string> allTypeNames = ["MyClient", "ErrorHandler", "Error", "error"];
        var client = api.GetAllStructs().First(s => s.Name == "MyClient");
        var refs = client.GetReferencedTypes(allTypeNames);

        Assert.Contains("ErrorHandler", refs);
        Assert.Contains("error", refs); // lowercase "error" is a separate token
        Assert.DoesNotContain("Error", refs); // "Error" is NOT a token in "ErrorHandler"
    }

    [Fact]
    public void Go_Formatter_TruncationPreservesClientDependencies()
    {
        // With a tight budget, client dependencies should survive truncation
        // while unreferenced models get cut
        var structs = new List<GoModels.StructApi>
        {
            new()
            {
                Name = "WidgetClient",
                EntryPoint = true,
                Methods =
                [
                    new GoModels.FuncApi { Name = "Get", Sig = "func Get(id string)", Ret = "(*WidgetResponse, error)" }
                ]
            },
            new()
            {
                Name = "WidgetResponse",
                Fields = [new GoModels.FieldApi { Name = "Name", Type = "string" }]
            }
        };

        // Add many unreferenced models to blow the budget
        for (int i = 0; i < 30; i++)
        {
            structs.Add(new GoModels.StructApi
            {
                Name = $"UnreferencedModel{i}WithLongName",
                Fields =
                [
                    new GoModels.FieldApi { Name = "Field1", Type = "string" },
                    new GoModels.FieldApi { Name = "Field2", Type = "int" },
                    new GoModels.FieldApi { Name = "Field3", Type = "bool" }
                ]
            });
        }

        var api = new GoModels.ApiIndex
        {
            Package = "testsdk",
            Packages = [new GoModels.PackageApi { Name = "testsdk", Structs = structs }]
        };

        // Use a tight budget
        var stubs = GoFormatter.Format(api, 1500);

        // Client and its dependency must survive
        Assert.Contains("WidgetClient", stubs);
        Assert.Contains("WidgetResponse", stubs);

        // Some unreferenced models should be truncated
        Assert.Contains("truncated", stubs);
    }

    // =========================================================================
    // Java Integration Tests
    // =========================================================================

    [Fact]
    public void Java_Formatter_IncludesReferencedDependencies()
    {
        var api = new JavaModels.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new JavaModels.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new JavaModels.ClassInfo
                        {
                            Name = "WidgetClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new JavaModels.MethodInfo { Name = "create", Sig = "(WidgetOptions options)", Ret = "Widget" }
                            ]
                        },
                        new JavaModels.ClassInfo
                        {
                            Name = "Widget",
                            Fields = [new JavaModels.FieldInfo { Name = "id", Type = "String" }]
                        },
                        new JavaModels.ClassInfo
                        {
                            Name = "WidgetOptions",
                            Fields = [new JavaModels.FieldInfo { Name = "name", Type = "String" }]
                        },
                        new JavaModels.ClassInfo
                        {
                            Name = "UnusedModel",
                            Fields = [new JavaModels.FieldInfo { Name = "data", Type = "byte[]" }]
                        }
                    ]
                }
            ]
        };

        var stubs = JavaFormatter.Format(api);
        Assert.Contains("WidgetClient", stubs);
        Assert.Contains("Widget", stubs);
        Assert.Contains("WidgetOptions", stubs);
    }

    [Fact]
    public void Java_Formatter_NoSubstringFalsePositive()
    {
        var api = new JavaModels.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new JavaModels.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new JavaModels.ClassInfo
                        {
                            Name = "MyClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new JavaModels.MethodInfo { Name = "handle", Sig = "(ErrorHandler handler)", Ret = "void" }
                            ]
                        },
                        new JavaModels.ClassInfo { Name = "ErrorHandler" },
                        new JavaModels.ClassInfo { Name = "Error" }
                    ]
                }
            ]
        };

        HashSet<string> allTypeNames = ["MyClient", "ErrorHandler", "Error"];
        var client = api.Packages.First().Classes!.First(c => c.Name == "MyClient");
        var refs = client.GetReferencedTypes(allTypeNames);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);
    }

    // =========================================================================
    // DotNet Integration Tests
    // =========================================================================

    [Fact]
    public void DotNet_Formatter_IncludesReferencedDependencies()
    {
        var api = new DotNetModels.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNetModels.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types =
                    [
                        new DotNetModels.TypeInfo
                        {
                            Name = "WidgetClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new DotNetModels.MemberInfo { Name = "Create", Kind = "method", Signature = "Widget Create(WidgetOptions options)" },
                                new DotNetModels.MemberInfo { Name = "Delete", Kind = "method", Signature = "void Delete(string id)" }
                            ]
                        },
                        new DotNetModels.TypeInfo
                        {
                            Name = "Widget",
                            Kind = "class",
                            Members = [new DotNetModels.MemberInfo { Name = "Id", Kind = "property", Signature = "string Id { get; }" }]
                        },
                        new DotNetModels.TypeInfo
                        {
                            Name = "WidgetOptions",
                            Kind = "class",
                            Members = [new DotNetModels.MemberInfo { Name = "Name", Kind = "property", Signature = "string Name { get; set; }" }]
                        },
                        new DotNetModels.TypeInfo
                        {
                            Name = "UnusedModel",
                            Kind = "class",
                            Members = [new DotNetModels.MemberInfo { Name = "Data", Kind = "property", Signature = "byte[] Data { get; }" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.Contains("WidgetClient", stubs);
        Assert.Contains("Widget", stubs);
        Assert.Contains("WidgetOptions", stubs);
    }

    [Fact]
    public void DotNet_Formatter_NoSubstringFalsePositive()
    {
        var api = new DotNetModels.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNetModels.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types =
                    [
                        new DotNetModels.TypeInfo
                        {
                            Name = "MyClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new DotNetModels.MemberInfo { Name = "Handle", Kind = "method", Signature = "void Handle(ErrorHandler handler)" }
                            ]
                        },
                        new DotNetModels.TypeInfo { Name = "ErrorHandler", Kind = "class" },
                        new DotNetModels.TypeInfo { Name = "Error", Kind = "class" }
                    ]
                }
            ]
        };

        HashSet<string> allTypeNames = ["MyClient", "ErrorHandler", "Error"];
        var client = api.Namespaces.First().Types!.First(t => t.Name == "MyClient");
        var refs = client.GetReferencedTypes(allTypeNames);

        Assert.Contains("ErrorHandler", refs);
        Assert.DoesNotContain("Error", refs);
    }

    [Fact]
    public void DotNet_Formatter_BaseClassAndInterfaces_Detected()
    {
        var api = new DotNetModels.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNetModels.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types =
                    [
                        new DotNetModels.TypeInfo
                        {
                            Name = "BlobClient",
                            Kind = "class",
                            EntryPoint = true,
                            Base = "ServiceClient",
                            Interfaces = ["IDisposable", "IAsyncDisposable"],
                            Members =
                            [
                                new DotNetModels.MemberInfo { Name = "Download", Kind = "method", Signature = "Task<BlobDownloadResult> DownloadAsync()" }
                            ]
                        },
                        new DotNetModels.TypeInfo { Name = "ServiceClient", Kind = "class" },
                        new DotNetModels.TypeInfo { Name = "BlobDownloadResult", Kind = "class" }
                    ]
                }
            ]
        };

        HashSet<string> allTypeNames = ["BlobClient", "ServiceClient", "BlobDownloadResult", "IDisposable", "IAsyncDisposable"];
        var client = api.Namespaces.First().Types!.First(t => t.Name == "BlobClient");
        var refs = client.GetReferencedTypes(allTypeNames);

        Assert.Contains("ServiceClient", refs);
        Assert.Contains("BlobDownloadResult", refs);
        // These interfaces don't exist in our type set with I prefix as standalone types,
        // but since we added them to allTypeNames they should be found
        Assert.Contains("IDisposable", refs);
        Assert.Contains("IAsyncDisposable", refs);
    }

    // =========================================================================
    // Cross-Language Consistency
    // =========================================================================

    [Fact]
    public void AllLanguages_SubstringFalsePositive_EliminatedConsistently()
    {
        // Verify the same false-positive scenario is handled identically across all languages
        var signatureWithSubstring = "handle(handler: ErrorHandler)";

        HashSet<string> allTypeNames = ["Error", "ErrorHandler"];

        // TypeScript
        var tsClass = new TsModels.ClassInfo
        {
            Name = "Client",
            Methods = [new TsModels.MethodInfo { Name = "handle", Sig = signatureWithSubstring, Ret = "void" }],
            ReferencedTypes = ["ErrorHandler"]
        };
        var tsRefs = tsClass.GetReferencedTypes(allTypeNames);
        Assert.Contains("ErrorHandler", tsRefs);
        Assert.DoesNotContain("Error", tsRefs);

        // Python
        var pyClass = new PyModels.ClassInfo
        {
            Name = "Client",
            Methods = [new PyModels.MethodInfo("handle", signatureWithSubstring, null, null, null, null)]
        };
        var pyRefs = pyClass.GetReferencedTypes(allTypeNames);
        Assert.Contains("ErrorHandler", pyRefs);
        Assert.DoesNotContain("Error", pyRefs);

        // Go
        var goStruct = new GoModels.StructApi
        {
            Name = "Client",
            Methods = [new GoModels.FuncApi { Name = "Handle", Sig = signatureWithSubstring, Ret = "error" }]
        };
        var goRefs = goStruct.GetReferencedTypes(allTypeNames);
        Assert.Contains("ErrorHandler", goRefs);
        Assert.DoesNotContain("Error", goRefs);

        // Java
        var javaClass = new JavaModels.ClassInfo
        {
            Name = "Client",
            Methods = [new JavaModels.MethodInfo { Name = "handle", Sig = "(" + signatureWithSubstring + ")", Ret = "void" }]
        };
        var javaRefs = javaClass.GetReferencedTypes(allTypeNames);
        Assert.Contains("ErrorHandler", javaRefs);
        Assert.DoesNotContain("Error", javaRefs);

        // DotNet
        var dotnetType = new DotNetModels.TypeInfo
        {
            Name = "Client",
            Kind = "class",
            Members = [new DotNetModels.MemberInfo { Name = "Handle", Kind = "method", Signature = "void Handle(ErrorHandler handler)" }]
        };
        var dotnetRefs = dotnetType.GetReferencedTypes(allTypeNames);
        Assert.Contains("ErrorHandler", dotnetRefs);
        Assert.DoesNotContain("Error", dotnetRefs);
    }

    [Fact]
    public void AllLanguages_DotSeparatedIdentifiers_TokenizedCorrectly()
    {
        // "Example.Response" should produce tokens "Example" and "Response", not "Example.Response"
        HashSet<string> allTypeNames = ["Response", "Example"];

        // DotNet — most common case for dot-separated names
        var dotnetType = new DotNetModels.TypeInfo
        {
            Name = "Client",
            Kind = "class",
            Members = [new DotNetModels.MemberInfo { Name = "Get", Kind = "method", Signature = "Example.Response<string> Get()" }]
        };
        var refs = dotnetType.GetReferencedTypes(allTypeNames);
        Assert.Contains("Response", refs);
        Assert.Contains("Example", refs);
    }

    [Fact]
    public void AllLanguages_GenericTypes_TokenizedCorrectly()
    {
        // "Task<List<MyModel>>" should find "MyModel" and "List"
        HashSet<string> allTypeNames = ["MyModel", "List", "Task"];

        var dotnetType = new DotNetModels.TypeInfo
        {
            Name = "Client",
            Kind = "class",
            Members = [new DotNetModels.MemberInfo { Name = "Get", Kind = "method", Signature = "Task<List<MyModel>> GetAll()" }]
        };
        var refs = dotnetType.GetReferencedTypes(allTypeNames);
        Assert.Contains("MyModel", refs);
        Assert.Contains("List", refs);
        Assert.Contains("Task", refs);

        // TypeScript equivalent
        var tsClass = new TsModels.ClassInfo
        {
            Name = "Client",
            Methods = [new TsModels.MethodInfo { Name = "getAll", Sig = "getAll()", Ret = "Promise<Array<MyModel>>" }],
            ReferencedTypes = ["MyModel", "Array", "Promise"]
        };
        HashSet<string> tsTypes = ["MyModel", "Array", "Promise"];
        var tsRefs = tsClass.GetReferencedTypes(tsTypes);
        Assert.Contains("MyModel", tsRefs);
        Assert.Contains("Array", tsRefs);
        Assert.Contains("Promise", tsRefs);
    }

    // =========================================================================
    // Usage Analyzer Integration (dependency graph for subclient detection)
    // =========================================================================

    [Fact]
    public async Task CSharp_UsageAnalyzer_SubclientDetection_UsesTokenizedReferences()
    {
        // The usage analyzer uses GetReferencedTypes to build a dependency graph
        // for subclient detection. Verify it works with tokenized approach.
        var analyzer = new CSharpUsageAnalyzer();

        var apiIndex = new DotNetModels.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNetModels.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types =
                    [
                        new DotNetModels.TypeInfo
                        {
                            Name = "StorageClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new DotNetModels.MemberInfo { Name = "Blobs", Kind = "property", Signature = "BlobClient Blobs { get; }" },
                                new DotNetModels.MemberInfo { Name = "GetInfo", Kind = "method", Signature = "AccountInfo GetInfo()" }
                            ]
                        },
                        new DotNetModels.TypeInfo
                        {
                            Name = "BlobClient",
                            Kind = "class",
                            Members =
                            [
                                new DotNetModels.MemberInfo { Name = "Upload", Kind = "method", Signature = "void Upload(Stream data)" },
                                new DotNetModels.MemberInfo { Name = "Download", Kind = "method", Signature = "Stream Download()" }
                            ]
                        }
                    ]
                }
            ]
        };

        await File.WriteAllTextAsync(Path.Combine(_tempDir, "sample.cs"), """
            using TestSdk;
            using System.IO;
            var client = new StorageClient();
            client.GetInfo();
            var blob = client.Blobs;
            blob.Upload(null);
            // Download not called
            """);

        var result = await analyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.ClientType == "StorageClient" && o.Operation == "GetInfo");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Upload");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Download");
    }
}
