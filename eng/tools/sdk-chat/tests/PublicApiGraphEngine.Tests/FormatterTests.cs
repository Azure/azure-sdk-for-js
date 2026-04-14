// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Python;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for formatter fixes across all language engines.
/// Uses in-memory model construction — no external runtimes required.
/// </summary>
public class FormatterTests
{
    #region Python Formatter

    [Fact]
    public void PythonFormatter_RendersReturnType_ForMethods()
    {
        var api = new Python.ApiIndex("test-pkg",
        [
            new Python.ModuleInfo("mod",
            [
                new Python.ClassInfo
                {
                    Name = "Client",
                    Methods =
                    [
                        new Python.MethodInfo("get_item", "self, id: str", null, false, null, null, "Item")
                    ]
                }
            ], null)
        ]);

        var stubs = Python.PythonFormatter.Format(api);
        Assert.Contains("-> Item", stubs);
        Assert.Contains("def get_item(self, id: str) -> Item: ...", stubs);
    }

    [Fact]
    public void PythonFormatter_RendersReturnType_ForFunctions()
    {
        var api = new Python.ApiIndex("test-pkg",
        [
            new Python.ModuleInfo("mod", null,
            [
                new Python.FunctionInfo
                {
                    Name = "create_client",
                    Signature = "endpoint: str",
                    Ret = "Client",
                    IsAsync = false
                }
            ])
        ]);

        var stubs = Python.PythonFormatter.Format(api);
        Assert.Contains("-> Client", stubs);
        Assert.Contains("def create_client(endpoint: str) -> Client: ...", stubs);
    }

    [Fact]
    public void PythonFormatter_OmitsReturnType_WhenNull()
    {
        var api = new Python.ApiIndex("test-pkg",
        [
            new Python.ModuleInfo("mod",
            [
                new Python.ClassInfo
                {
                    Name = "Client",
                    Methods =
                    [
                        new Python.MethodInfo("close", "self", null, false, null, null, null)
                    ]
                }
            ], null)
        ]);

        var stubs = Python.PythonFormatter.Format(api);
        Assert.Contains("def close(self): ...", stubs);
        Assert.DoesNotContain("->", stubs);
    }

    [Fact]
    public void PythonFormatter_RenderDecorators_BeforeDef()
    {
        var api = new Python.ApiIndex("test-pkg",
        [
            new Python.ModuleInfo("mod",
            [
                new Python.ClassInfo
                {
                    Name = "Client",
                    Methods =
                    [
                        new Python.MethodInfo("from_string", "cls, s: str", "Create from string.", false, true, null, "Client")
                    ]
                }
            ], null)
        ]);

        var stubs = Python.PythonFormatter.Format(api);
        var lines = stubs.Split('\n').Select(l => l.TrimEnd()).ToList();
        var decoratorIdx = lines.FindIndex(l => l.Contains("@classmethod"));
        var defIdx = lines.FindIndex(l => l.Contains("def from_string"));
        Assert.True(decoratorIdx >= 0, "@classmethod decorator not found");
        Assert.True(defIdx >= 0, "def from_string not found");
        Assert.True(decoratorIdx < defIdx, "@classmethod must appear before def");
    }

    [Fact]
    public void PythonFormatter_RenderDoc_AfterDef()
    {
        var api = new Python.ApiIndex("test-pkg",
        [
            new Python.ModuleInfo("mod",
            [
                new Python.ClassInfo
                {
                    Name = "Client",
                    Methods =
                    [
                        new Python.MethodInfo("do_work", "self", "Does work.", false, null, null, null)
                    ]
                }
            ], null)
        ]);

        var stubs = Python.PythonFormatter.Format(api);
        var lines = stubs.Split('\n').Select(l => l.TrimEnd()).ToList();
        var defIdx = lines.FindIndex(l => l.Contains("def do_work"));
        var docIdx = lines.FindIndex(l => l.Contains("\"\"\"Does work.\"\"\""));
        Assert.True(defIdx >= 0, "def do_work not found");
        Assert.True(docIdx >= 0, "docstring not found");
        Assert.True(docIdx > defIdx, "docstring must appear after def");
    }

    [Fact]
    public void PythonFormatter_RendersAsyncDef()
    {
        var api = new Python.ApiIndex("test-pkg",
        [
            new Python.ModuleInfo("mod",
            [
                new Python.ClassInfo
                {
                    Name = "Client",
                    Methods =
                    [
                        new Python.MethodInfo("fetch_async", "self", null, true, null, null, "str")
                    ]
                }
            ], null)
        ]);

        var stubs = Python.PythonFormatter.Format(api);
        Assert.Contains("async def fetch_async(self) -> str: ...", stubs);
    }

    #endregion

    #region Python ConvertToApiIndex (ret + dependencies)

    [Fact]
    public void PythonDeserialization_PreservesReturnType()
    {
        var json = """
        {
            "package": "test-pkg",
            "modules": [{
                "name": "mod",
                "classes": [{
                    "name": "Client",
                    "methods": [{
                        "name": "get_item",
                        "sig": "self, id: str",
                        "ret": "Item",
                        "async": false
                    }]
                }],
                "functions": [{
                    "name": "create_client",
                    "sig": "endpoint: str",
                    "ret": "Client",
                    "async": false
                }]
            }]
        }
        """;

        var raw = System.Text.Json.JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonApiIndex);
        Assert.NotNull(raw);
        Assert.Equal("Item", raw.Modules![0].Classes![0].Methods![0].Ret);
        Assert.Equal("Client", raw.Modules[0].Functions![0].Ret);
    }

    [Fact]
    public void PythonDeserialization_PreservesDependencies()
    {
        var json = """
        {
            "package": "test-pkg",
            "modules": [],
            "dependencies": [{
                "package": "example-core",
                "classes": [{
                    "name": "TokenCredential",
                    "methods": [{"name": "get_token", "sig": "self", "ret": "str"}]
                }]
            }]
        }
        """;

        var raw = System.Text.Json.JsonSerializer.Deserialize(json, RawPythonJsonContext.Default.RawPythonApiIndex);
        Assert.NotNull(raw);
        Assert.NotNull(raw.Dependencies);
        Assert.Single(raw.Dependencies);
        Assert.Equal("example-core", raw.Dependencies[0].Package);
        Assert.Equal("TokenCredential", raw.Dependencies[0].Classes![0].Name);
    }

    #endregion

    #region Go Formatter

    [Fact]
    public void GoFormatter_RendersConstructor_WithoutFakeReceiver()
    {
        var api = new Go.ApiIndex
        {
            Package = "azblob",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "azblob",
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "BlobClient",
                            Methods =
                            [
                                // Constructor: empty receiver
                                new Go.FuncApi
                                {
                                    Name = "NewBlobClient",
                                    Sig = "url string, cred TokenCredential",
                                    Receiver = "",
                                    Ret = "*BlobClient"
                                },
                                // Regular method: non-empty receiver
                                new Go.FuncApi
                                {
                                    Name = "Download",
                                    Sig = "ctx context.Context",
                                    Receiver = "*BlobClient",
                                    Ret = "DownloadResponse"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = Go.GoFormatter.Format(api);
        // Constructor should NOT have (receiver) syntax
        Assert.Contains("func NewBlobClient(url string, cred TokenCredential) *BlobClient", stubs);
        Assert.DoesNotContain("func (*BlobClient) NewBlobClient", stubs);
        // Regular method SHOULD have receiver
        Assert.Contains("func (*BlobClient) Download(ctx context.Context) DownloadResponse", stubs);
    }

    [Fact]
    public void GoFormatter_RendersVariables()
    {
        var api = new Go.ApiIndex
        {
            Package = "azblob",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "azblob",
                    Structs =
                    [
                        new Go.StructApi { Name = "BlobClient" }
                    ],
                    Variables =
                    [
                        new Go.VarApi { Name = "ErrBlobNotFound", Type = "error", Doc = "Returned when blob is not found." }
                    ]
                }
            ]
        };

        var stubs = Go.GoFormatter.Format(api);
        Assert.Contains("var (", stubs);
        Assert.Contains("ErrBlobNotFound error", stubs);
    }

    #endregion

    #region Java Formatter

    [Fact]
    public void JavaFormatter_IncludesInterfaces_InFormatOutput()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.example",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.example",
                    Classes =
                    [
                        new Java.ClassInfo { Name = "ServiceClient", Methods = [new Java.MethodInfo { Name = "list", Sig = "()", Ret = "List<Item>" }] }
                    ],
                    Interfaces =
                    [
                        new Java.ClassInfo { Name = "Closeable", Methods = [new Java.MethodInfo { Name = "close", Sig = "()", Ret = "void" }] }
                    ]
                }
            ]
        };

        var stubs = Java.JavaFormatter.Format(api);
        Assert.Contains("interface Closeable", stubs);
        Assert.Contains("class ServiceClient", stubs);
    }

    [Fact]
    public void JavaFormatter_LabelsInterfacesCorrectly_InMixedBatch()
    {
        var iface = new Java.ClassInfo { Name = "TokenCredential", Methods = [new Java.MethodInfo { Name = "getToken", Sig = "()", Ret = "Token" }] };
        var cls = new Java.ClassInfo { Name = "DefaultCredential", Methods = [new Java.MethodInfo { Name = "getToken", Sig = "()", Ret = "Token" }] };

        var api = new Java.ApiIndex
        {
            Package = "com.example",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.example",
                    Classes = [cls],
                    Interfaces = [iface]
                }
            ]
        };

        var stubs = Java.JavaFormatter.Format(api);
        Assert.Contains("interface TokenCredential", stubs);
        Assert.Contains("class DefaultCredential", stubs);
        // Should NOT mislabel class as interface
        Assert.DoesNotContain("interface DefaultCredential", stubs);
    }

    [Fact]
    public void JavaModel_GetAllTypes_IncludesInterfaces()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.example",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.example",
                    Classes = [new Java.ClassInfo { Name = "Foo" }],
                    Interfaces = [new Java.ClassInfo { Name = "IFoo" }]
                }
            ]
        };

        var allTypes = api.GetAllTypes().ToList();
        Assert.Equal(2, allTypes.Count);
        Assert.Contains(allTypes, t => t.Name == "Foo");
        Assert.Contains(allTypes, t => t.Name == "IFoo");
    }

    #endregion

    #region TypeScript Formatter

    [Fact]
    public void TypeScriptFormatter_HandlesDuplicateNames_AcrossModules()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "moduleA",
                    Classes = [new TypeScript.ClassInfo { Name = "Client", Methods = [new TypeScript.MethodInfo { Name = "doA", Sig = "()" }] }],
                    Interfaces = [new TypeScript.InterfaceInfo { Name = "Options" }]
                },
                new TypeScript.ModuleInfo
                {
                    Name = "moduleB",
                    Classes = [new TypeScript.ClassInfo { Name = "Client", Methods = [new TypeScript.MethodInfo { Name = "doB", Sig = "()" }] }],
                    Interfaces = [new TypeScript.InterfaceInfo { Name = "Options" }]
                }
            ]
        };

        // This should NOT throw ArgumentException from ToDictionary duplicate key
        var exception = Record.Exception(() => TypeScript.TypeScriptFormatter.Format(api));
        Assert.Null(exception);
    }

    [Fact]
    public void TypeScriptFormatter_FormatWithCoverage_HandlesDuplicateNames()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "moduleA",
                    Classes = [new TypeScript.ClassInfo { Name = "Client", EntryPoint = true, Methods = [new TypeScript.MethodInfo { Name = "doA", Sig = "()" }] }]
                },
                new TypeScript.ModuleInfo
                {
                    Name = "moduleB",
                    Classes = [new TypeScript.ClassInfo { Name = "Client", EntryPoint = true, Methods = [new TypeScript.MethodInfo { Name = "doB", Sig = "()" }] }]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations = [new OperationUsage { ClientType = "Client", Operation = "doA", File = "test.ts", Line = 1 }],
            UncoveredOperations = [new UncoveredOperation { ClientType = "Client", Operation = "doB", Signature = "()" }]
        };

        // Should NOT throw
        var exception = Record.Exception(() => TypeScript.TypeScriptFormatter.FormatWithCoverage(api, coverage, int.MaxValue));
        Assert.Null(exception);
    }

    #endregion

    #region Go Formatter — TypeParams

    [Fact]
    public void GoFormatter_RendersTypeParams_OnStructs()
    {
        var api = new Go.ApiIndex
        {
            Package = "collections",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "collections",
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "Stack",
                            TypeParams = ["T comparable"],
                            Fields =
                            [
                                new Go.FieldApi { Name = "items", Type = "[]T" }
                            ],
                            Methods =
                            [
                                new Go.FuncApi
                                {
                                    Name = "Push",
                                    Sig = "item T",
                                    Receiver = "*Stack[T]"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = Go.GoFormatter.Format(api);
        Assert.Contains("type Stack[T comparable] struct {", stubs);
        Assert.Contains("items []T", stubs);
    }

    [Fact]
    public void GoFormatter_RendersTypeParams_OnFunctions()
    {
        var api = new Go.ApiIndex
        {
            Package = "collections",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "collections",
                    Functions =
                    [
                        new Go.FuncApi
                        {
                            Name = "Map",
                            TypeParams = ["T", "U"],
                            Sig = "items []T, fn func(T) U",
                            Ret = "[]U"
                        }
                    ]
                }
            ]
        };

        var stubs = Go.GoFormatter.Format(api);
        Assert.Contains("func Map[T, U](items []T, fn func(T) U) []U", stubs);
    }

    [Fact]
    public void GoFormatter_RendersTypeParams_OnMethods()
    {
        var api = new Go.ApiIndex
        {
            Package = "utils",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "utils",
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "Converter",
                            Methods =
                            [
                                new Go.FuncApi
                                {
                                    Name = "Convert",
                                    TypeParams = ["T"],
                                    Sig = "input interface{}",
                                    Ret = "T",
                                    Receiver = "*Converter",
                                    IsMethod = true
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = Go.GoFormatter.Format(api);
        Assert.Contains("func (*Converter) Convert[T](input interface{}) T", stubs);
    }

    #endregion

    #region Go Formatter — Budget Tracking

    [Fact]
    public void GoFormatter_BudgetTracking_IncludesAllSections()
    {
        var api = new Go.ApiIndex
        {
            Package = "test",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "test",
                    Constants =
                    [
                        new Go.ConstApi { Name = "Version", Type = "string", Value = "\"1.0\"" },
                        new Go.ConstApi { Name = "MaxRetries", Type = "int", Value = "3" }
                    ],
                    Variables =
                    [
                        new Go.VarApi { Name = "ErrNotFound", Type = "error" }
                    ],
                    Interfaces =
                    [
                        new Go.IfaceApi
                        {
                            Name = "Handler",
                            Methods =
                            [
                                new Go.FuncApi { Name = "Handle", Sig = "ctx context.Context", Ret = "error" }
                            ]
                        }
                    ],
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "Client",
                            EntryPoint = true,
                            Methods =
                            [
                                new Go.FuncApi { Name = "Do", Sig = "ctx context.Context", Ret = "error", Receiver = "*Client" }
                            ]
                        }
                    ]
                }
            ]
        };

        var fullOutput = Go.GoFormatter.Format(api);
        var tightBudget = Go.GoFormatter.Format(api, 200);

        Assert.Contains("const (", fullOutput);
        Assert.Contains("var (", fullOutput);
        Assert.Contains("type Handler interface", fullOutput);
        Assert.True(tightBudget.Length <= fullOutput.Length);
    }

    [Fact]
    public void GoFormatter_TruncatesCorrectly_WithManyStructs()
    {
        var largeStructs = Enumerable.Range(0, 20).Select(i =>
            new Go.StructApi
            {
                Name = $"Model{i}",
                Fields =
                [
                    new Go.FieldApi { Name = "ID", Type = "string", Doc = "The identifier" },
                    new Go.FieldApi { Name = "Value", Type = "int64", Doc = "The value" }
                ],
                Methods =
                [
                    new Go.FuncApi { Name = "GetID", Sig = "", Ret = "string", Receiver = $"*Model{i}" }
                ]
            }).ToList();

        largeStructs.Insert(0, new Go.StructApi
        {
            Name = "BigClient",
            EntryPoint = true,
            Methods =
            [
                new Go.FuncApi { Name = "Do", Sig = "ctx context.Context", Ret = "error", Receiver = "*BigClient" }
            ]
        });

        var api = new Go.ApiIndex
        {
            Package = "big",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "big",
                    Structs = largeStructs
                }
            ]
        };

        var fullOutput = Go.GoFormatter.Format(api, int.MaxValue);
        var output = Go.GoFormatter.Format(api, 500);
        Assert.True(output.Length < fullOutput.Length, $"Truncated output ({output.Length}) should be shorter than full ({fullOutput.Length})");
        Assert.Contains("truncated", output);
    }

    #endregion

    #region Java Formatter — Record and Annotation Kinds

    [Fact]
    public void JavaFormatter_RendersRecordKind()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.example",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.example",
                    Classes =
                    [
                        new Java.ClassInfo
                        {
                            Name = "Point",
                            Kind = "record",
                            Fields =
                            [
                                new Java.FieldInfo { Name = "x", Type = "int" },
                                new Java.FieldInfo { Name = "y", Type = "int" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = Java.JavaFormatter.Format(api);
        Assert.Contains("record Point", stubs);
    }

    [Fact]
    public void JavaFormatter_RendersAnnotationKind()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.example",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.example",
                    Annotations =
                    [
                        new Java.ClassInfo
                        {
                            Name = "MyAnnotation",
                            Kind = "annotation",
                            Methods =
                            [
                                new Java.MethodInfo { Name = "value", Sig = "()", Ret = "String" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = Java.JavaFormatter.Format(api);
        Assert.Contains("@interface MyAnnotation", stubs);
    }

    #endregion

    #region Python Formatter — FormatWithCoverage Dependency Inclusion

    [Fact]
    public void PythonFormatter_FormatWithCoverage_IncludesReferencedClasses()
    {
        var api = new ApiIndex("test-sdk",
        [
            new ModuleInfo("mod",
            [
                new ClassInfo
                {
                    Name = "MyClient",
                    EntryPoint = true,
                    Methods =
                    [
                        new MethodInfo("get_item", "self, id: str, opts: Item", null, false, null, null, null)
                    ]
                },
                new ClassInfo
                {
                    Name = "Item",
                    Properties =
                    [
                        new PropertyInfo("Name", "str", null)
                    ]
                }
            ], null)
        ]);

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "MyClient", Operation = "get_item", Signature = "get_item(self, id: str)" }
            ]
        };

        var result = PythonFormatter.FormatWithCoverage(api, coverage, int.MaxValue);
        Assert.Contains("class MyClient", result);
        Assert.Contains("class Item", result);
    }

    [Fact]
    public void PythonFormatter_FormatWithCoverage_IncludesExternalDeps()
    {
        var api = new ApiIndex("test-sdk",
        [
            new ModuleInfo("mod",
            [
                new ClassInfo
                {
                    Name = "MyClient",
                    EntryPoint = true,
                    Methods =
                    [
                        new MethodInfo("create", "self", null, false, null, null, "Response")
                    ]
                }
            ], null)
        ],
        [
            new DependencyInfo
            {
                Package = "example-core",
                Classes =
                [
                    new ClassInfo { Name = "TokenCredential" }
                ]
            }
        ]);

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "MyClient", Operation = "create", Signature = "create(self)" }
            ]
        };

        var result = PythonFormatter.FormatWithCoverage(api, coverage, int.MaxValue);
        Assert.Contains("class MyClient", result);
        Assert.Contains("TokenCredential", result);
    }

    [Fact]
    public void PythonFormatter_Format_IncludesDependencies()
    {
        var api = new ApiIndex("test-sdk",
        [
            new ModuleInfo("mod",
            [
                new ClassInfo { Name = "MyClient" }
            ], null)
        ],
        [
            new DependencyInfo
            {
                Package = "example-core",
                Classes =
                [
                    new ClassInfo
                    {
                        Name = "TokenCredential",
                        Methods = [new MethodInfo("get_token", "self", null, false, null, null, "str")]
                    }
                ]
            }
        ]);

        var stubs = PythonFormatter.Format(api);
        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("example-core", stubs);
        Assert.Contains("TokenCredential", stubs);
    }

    #endregion

    #region TypeScript Formatter — FormatWithCoverage Dependency Inclusion

    [Fact]
    public void TypeScriptFormatter_FormatWithCoverage_IncludesDependencyTypes()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "main",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "TestClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TypeScript.MethodInfo { Name = "getWidget", Sig = "(id: string)", Ret = "Widget" }
                            ]
                        }
                    ],
                    Interfaces =
                    [
                        new TypeScript.InterfaceInfo
                        {
                            Name = "Widget",
                            Properties =
                            [
                                new TypeScript.PropertyInfo { Name = "name", Type = "string" }
                            ]
                        }
                    ]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "TestClient", Operation = "getWidget", Signature = "getWidget(id: string)" }
            ]
        };

        var result = TypeScript.TypeScriptFormatter.FormatWithCoverage(api, coverage, int.MaxValue);
        Assert.Contains("TestClient", result);
    }

    #endregion
}

/// <summary>
/// Tests for <see cref="CoverageFormatter"/> shared scaffolding.
/// </summary>
public class CoverageFormatterTests
{
    [Fact]
    public void AppendCoverageSummary_WithCoveredOps_RendersSummarySection()
    {
        var coverage = new UsageIndex
        {
            FileCount = 3,
            CoveredOperations =
            [
                new OperationUsage { ClientType = "BlobClient", Operation = "Download", File = "a.cs", Line = 1 },
                new OperationUsage { ClientType = "BlobClient", Operation = "Upload", File = "b.cs", Line = 5 },
            ],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "BlobClient", Operation = "Delete", Signature = "Delete(string name)" },
            ]
        };

        var sb = new StringBuilder();
        var result = CoverageFormatter.AppendCoverageSummary(sb, coverage, "//");

        Assert.NotNull(result);
        var text = sb.ToString();
        Assert.Contains("ALREADY COVERED (2 calls across 3 files)", text);
        Assert.Contains("BlobClient: Download, Upload", text);
        Assert.Contains("UNCOVERED API (1 operations)", text);
    }

    [Fact]
    public void AppendCoverageSummary_AllCovered_ReturnsNull()
    {
        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations =
            [
                new OperationUsage { ClientType = "Client", Operation = "Do", File = "a.cs", Line = 1 },
            ],
            UncoveredOperations = []
        };

        var sb = new StringBuilder();
        var result = CoverageFormatter.AppendCoverageSummary(sb, coverage);

        Assert.Null(result);
        Assert.Contains("All operations are covered", sb.ToString());
    }

    [Fact]
    public void AppendCoverageSummary_NoCoveredOps_SkipsCoveredSection()
    {
        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "Client", Operation = "Do", Signature = "Do()" },
            ]
        };

        var sb = new StringBuilder();
        var result = CoverageFormatter.AppendCoverageSummary(sb, coverage);

        Assert.NotNull(result);
        Assert.DoesNotContain("ALREADY COVERED", sb.ToString());
        Assert.Contains("UNCOVERED API", sb.ToString());
    }

    [Fact]
    public void AppendCoverageSummary_PythonCommentPrefix_UsesHash()
    {
        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations =
            [
                new OperationUsage { ClientType = "Client", Operation = "Do", File = "a.py", Line = 1 },
            ],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "Client", Operation = "Do2", Signature = "Do2()" },
            ]
        };

        var sb = new StringBuilder();
        CoverageFormatter.AppendCoverageSummary(sb, coverage, "#");
        var text = sb.ToString();

        Assert.Contains("# ALREADY COVERED", text);
        Assert.Contains("# UNCOVERED API", text);
        Assert.DoesNotContain("//", text);
    }

    [Fact]
    public void AppendCoverageSummary_ManyOps_TruncatesAfterTen()
    {
        var ops = Enumerable.Range(1, 15)
            .Select(i => new OperationUsage { ClientType = "Client", Operation = $"Op{i}", File = "a.cs", Line = i })
            .ToList();
        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations = ops,
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "Client", Operation = "X", Signature = "X()" }
            ]
        };

        var sb = new StringBuilder();
        CoverageFormatter.AppendCoverageSummary(sb, coverage);
        Assert.Contains("(+5 more)", sb.ToString());
    }
}
