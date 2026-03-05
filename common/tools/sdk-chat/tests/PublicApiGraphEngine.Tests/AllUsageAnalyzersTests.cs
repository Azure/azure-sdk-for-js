// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.DotNet;
using PublicApiGraphEngine.Go;
using PublicApiGraphEngine.Java;
using PublicApiGraphEngine.Python;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Comprehensive tests for all usage analyzers across languages.
/// Tests direct method matching, subclients, and top-level functions.
/// </summary>
public class AllUsageAnalyzersTests : IDisposable
{
    private readonly string _tempDir;

    // Analyzers for availability checking and testing
    // Note: These are used both for availability checks and in cross-language consistency tests
    private readonly CSharpUsageAnalyzer _csharpAnalyzer = new();
    private readonly PythonUsageAnalyzer _pythonAnalyzer = new();
    private readonly TypeScriptUsageAnalyzer _tsAnalyzer = new();
    private readonly JavaUsageAnalyzer _javaAnalyzer = new();
    private readonly GoUsageAnalyzer _goAnalyzer = new();

    public AllUsageAnalyzersTests()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), $"usage_test_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_tempDir);
    }

    public void Dispose()
    {
        if (Directory.Exists(_tempDir))
        {
            Directory.Delete(_tempDir, true);
        }
    }

    #region C# Usage Analyzer Tests

    [Fact]
    public async Task CSharp_DirectMethodMatch_ExactNameRequired()
    {
        // Arrange - API has GetData, sample calls GetData
        // Use class-level analyzer
        var apiIndex = CreateCSharpApiIndex(
            ("DataClient", ["GetData", "GetDataAsync", "ProcessData"]));

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            var client = new DataClient();
            client.GetData();
            await client.GetDataAsync();
            // ProcessData is not called
            """);

        // Act
        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert - only exact matches
        Assert.Equal(2, result.CoveredOperations.Count);
        Assert.Contains(result.CoveredOperations, o => o.Operation == "GetData");
        Assert.Contains(result.CoveredOperations, o => o.Operation == "GetDataAsync");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "ProcessData");
    }

    [Fact]
    public async Task CSharp_Subclient_MethodsTrackedSeparately()
    {
        // Arrange - main client with subclient properties that have proper return types
        // Use class-level analyzer
        var apiIndex = CreateCSharpApiIndexWithProperties(
            ("StorageClient", ["GetBlob"], [("Blobs", "BlobClient"), ("Containers", "ContainerClient")]),
            ("BlobClient", ["Upload", "Download", "Delete"], []),
            ("ContainerClient", ["Create", "List"], []));

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            var storage = new StorageClient();
            storage.GetBlob();

            var blob = storage.Blobs;
            blob.Upload();
            blob.Download();
            // Delete not called

            var container = storage.Containers;
            container.Create();
            // List not called
            """);

        // Act
        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "StorageClient" && o.Operation == "GetBlob");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Upload");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Download");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "Create");

        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Delete");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "List");
    }

    [Fact]
    public async Task CSharp_PreciseInference_RejectsNonClientReceivers()
    {
        // Arrange - method exists in API, but called on non-SDK receiver
        // With precise type inference, arbitrary receivers should NOT match
        // Use class-level analyzer
        var apiIndex = CreateCSharpApiIndex(
            ("ChatClient", ["Send", "Receive"]));

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            // These should NOT match - receivers are not SDK client types
            var x = new object();
            x.Send();  // Send is in API but x is not ChatClient

            var _helper = new object();
            _helper.Receive();  // Receive is in API but _helper is not ChatClient

            // This should NOT match - method not in API
            x.DoSomethingElse();
            """);

        // Act
        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert - precise type inference rejects non-SDK receivers
        Assert.Empty(result.CoveredOperations);
    }

    [Fact]
    public async Task CSharp_TopLevelFunctions_NotSupportedInCSharp()
    {
        // C# doesn't have top-level functions in the same way as Python/Go
        // Static methods on classes are tracked as class methods
        // Use class-level analyzer
        var apiIndex = new DotNet.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNet.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types =
                    [
                        new DotNet.TypeInfo
                        {
                            Name = "Helpers",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new DotNet.MemberInfo { Name = "CreateClient", Kind = "method", Signature = "void CreateClient()", IsStatic = true },
                                new DotNet.MemberInfo { Name = "ParseResponse", Kind = "method", Signature = "void ParseResponse()", IsStatic = true }
                            ]
                        }
                    ]
                }
            ]
        };

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            Helpers.CreateClient();
            // ParseResponse not called
            """);

        // Act
        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Single(result.CoveredOperations);
        Assert.Equal("CreateClient", result.CoveredOperations[0].Operation);
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "ParseResponse");
    }

    private static DotNet.ApiIndex CreateCSharpApiIndex(params (string TypeName, string[] Methods)[] types)
    {
        return CreateCSharpApiIndexWithProperties(
            types.Select(t => (t.TypeName, t.Methods, Array.Empty<(string Name, string ReturnType)>())).ToArray());
    }

    private static DotNet.ApiIndex CreateCSharpApiIndexWithProperties(
        params (string TypeName, string[] Methods, (string Name, string ReturnType)[] Properties)[] types)
    {
        return new DotNet.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNet.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types = types.Select(t => new DotNet.TypeInfo
                    {
                        Name = t.TypeName,
                        Kind = "class",
                        Members = t.Methods.Select(m => new DotNet.MemberInfo
                        {
                            Name = m,
                            Kind = "method",
                            Signature = $"void {m}()"
                        }).Concat(t.Properties.Select(p => new DotNet.MemberInfo
                        {
                            Name = p.Name,
                            Kind = "property",
                            Signature = $"{p.ReturnType} {p.Name} {{ get; }}"
                        })).ToList()
                    }).ToList()
                }
            ]
        };
    }

    [Fact]
    public async Task CSharp_EmptyContainerClient_SubclientOperationsDetected()
    {
        // Container has no methods, only a property pointing to subclient
        var apiIndex = CreateCSharpApiIndexWithProperties(
            ("ContainerClient", [], [("Widgets", "WidgetClient")]),
            ("WidgetClient", ["ListWidgets", "GetWidget"], []));

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            var client = new ContainerClient();
            var widgets = client.Widgets;
            widgets.ListWidgets();
            // GetWidget not called
            """);

        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // ContainerClient has no methods so it shouldn't appear in operations
        Assert.DoesNotContain(result.CoveredOperations, o => o.ClientType == "ContainerClient");
        Assert.DoesNotContain(result.UncoveredOperations, o => o.ClientType == "ContainerClient");
        // Subclient operations are tracked
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "ListWidgets");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "GetWidget");
    }

    [Fact]
    public async Task CSharp_InterfaceSubclient_CoverageDetected()
    {
        // Property typed as interface, implementation class has the methods
        var apiIndex = CreateCSharpApiIndexFull(
            ("MainClient", "class", [], [("Service", "IServiceClient")], null),
            ("IServiceClient", "interface", ["Process", "Validate"], [], null),
            ("ServiceClientImpl", "class", ["Process", "Validate"], [], ["IServiceClient"]));

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            var client = new MainClient();
            var svc = client.Service;
            svc.Process();
            // Validate not called
            """);

        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "Process");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "Validate");
    }

    [Fact]
    public async Task CSharp_DirectPropertyChain_NoIntermediateVariable()
    {
        // client.Widgets.ListWidgets() without intermediate variable assignment
        var apiIndex = CreateCSharpApiIndexWithProperties(
            ("MainClient", ["GetResource"], [("Widgets", "WidgetClient")]),
            ("WidgetClient", ["ListWidgets", "GetWidget"], []));

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            var client = new MainClient();
            client.Widgets.ListWidgets();
            // GetWidget not called via chain
            """);

        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "ListWidgets");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "GetWidget");
    }

    [Fact]
    public async Task CSharp_SelfReferencingType_StillDetectedAsRoot()
    {
        // A type where one method returns itself (fluent API pattern)
        // EntryPoint=true ensures self-referencing doesn't prevent root detection
        var apiIndex = new DotNet.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNet.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types =
                    [
                        new DotNet.TypeInfo
                        {
                            Name = "FluentClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new DotNet.MemberInfo { Name = "Send", Kind = "method", Signature = "void Send()" },
                                new DotNet.MemberInfo { Name = "WithRetry", Kind = "method", Signature = "FluentClient WithRetry()" }
                            ]
                        }
                    ]
                }
            ]
        };

        await WriteFileAsync("sample.cs", """
            using TestSdk;
            var client = new FluentClient();
            client.Send();
            """);

        var result = await _csharpAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Self-referencing type should still be detected
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "Send");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "WithRetry");
    }

    private static DotNet.ApiIndex CreateCSharpApiIndexFull(
        params (string TypeName, string Kind, string[] Methods, (string Name, string ReturnType)[] Properties, string[]? Interfaces)[] types)
    {
        return new DotNet.ApiIndex
        {
            Package = "TestSdk",
            Namespaces =
            [
                new DotNet.NamespaceInfo
                {
                    Name = "TestSdk",
                    Types = types.Select(t => new DotNet.TypeInfo
                    {
                        Name = t.TypeName,
                        Kind = t.Kind,
                        EntryPoint = true,
                        Interfaces = t.Interfaces?.ToList(),
                        Members = t.Methods.Select(m => new DotNet.MemberInfo
                        {
                            Name = m,
                            Kind = "method",
                            Signature = $"void {m}()"
                        }).Concat(t.Properties.Select(p => new DotNet.MemberInfo
                        {
                            Name = p.Name,
                            Kind = "property",
                            Signature = $"{p.ReturnType} {p.Name} {{ get; }}"
                        })).ToList()
                    }).ToList()
                }
            ]
        };
    }

    #endregion

    #region Python Usage Analyzer Tests

    [Fact]
    public async Task Python_DirectMethodMatch_ExactNameRequired()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        var apiIndex = CreatePythonApiIndex(
            classes: [("DataClient", ["get_data", "get_data_async", "process_data"])],
            functions: []);

        await WriteFileAsync("sample.py", """
def main():
    client = DataClient()
    client.get_data()
    client.get_data_async()
# process_data is not called
""");

        // Act
        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Equal(2, result.CoveredOperations.Count);
        Assert.Contains(result.CoveredOperations, o => o.Operation == "get_data");
        Assert.Contains(result.CoveredOperations, o => o.Operation == "get_data_async");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "process_data");
    }

    [Fact]
    public async Task Python_Subclient_MethodsTrackedSeparately()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        var apiIndex = CreatePythonApiIndex(
            classes:
            [
                ("StorageClient", ["get_blob"]),
                ("BlobClient", ["upload", "download", "delete"]),
                ("ContainerClient", ["create", "list_blobs"])
            ],
            functions: []);

        await WriteFileAsync("sample.py", """
storage = StorageClient()
storage.get_blob()

blob = storage.blobs
blob.upload()
blob.download()
# delete not called

container = storage.containers
container.create()
# list_blobs not called
""");

        // Act
        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "StorageClient" && o.Operation == "get_blob");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "upload");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "download");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "create");

        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "delete");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "list_blobs");
    }

    [Fact]
    public async Task Python_TopLevelFunctions_TrackedCorrectly()
    {

        var apiIndex = CreatePythonApiIndex(
            classes: [("Client", ["send"])],
            functions: [("create_client", "def create_client() -> Client"), ("parse_response", "def parse_response(data: str) -> dict")]);

        await WriteFileAsync("sample.py", """
from sdk import create_client, Client

client = create_client()  # top-level function
client.send()
# parse_response not called
""");

        // Act
        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert - note: Python analyzer may track functions differently
        // This test documents expected behavior
        Assert.Contains(result.CoveredOperations, o => o.Operation == "send");
    }

    private static Python.ApiIndex CreatePythonApiIndex(
        (string ClassName, string[] Methods)[] classes,
        (string FuncName, string Sig)[] functions)
    {
        return new Python.ApiIndex(
            Package: "test_sdk",
            Modules:
            [
                new Python.ModuleInfo(
                    Name: "test_sdk",
                    Classes: classes.Select(c => new Python.ClassInfo
                    {
                        Name = c.ClassName,
                        EntryPoint = true,
                        Methods = c.Methods.Select(m => new Python.MethodInfo(
                            Name: m,
                            Signature: "(self)",
                            Doc: null,
                            IsAsync: null,
                            IsClassMethod: null,
                            IsStaticMethod: null
                        )).ToList()
                    }).ToList(),
                    Functions: functions.Select(f => new Python.FunctionInfo
                    {
                        Name = f.FuncName,
                        Signature = f.Sig.Replace($"def {f.FuncName}", "").Trim()
                    }).ToList()
                )
            ]
        );
    }

    [Fact]
    public async Task Python_EmptyContainerClient_SubclientOperationsDetected()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        var apiIndex = CreatePythonApiIndexWithProperties(
            classes:
            [
                ("ContainerClient", [], [("widgets", "WidgetClient")], null),
                ("WidgetClient", ["list_widgets", "get_widget"], [], null)
            ],
            functions: []);

        await WriteFileAsync("sample.py", """
client = ContainerClient()
widgets = client.widgets
widgets.list_widgets()
# get_widget not called
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.DoesNotContain(result.CoveredOperations, o => o.ClientType == "ContainerClient");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "list_widgets");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "get_widget");
    }

    [Fact]
    public async Task Python_InheritedSubclient_CoverageDetected()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        // Python uses inheritance (Base) instead of interfaces
        var apiIndex = CreatePythonApiIndexWithProperties(
            classes:
            [
                ("MainClient", [], [("service", "ServiceBase")], null),
                ("ServiceBase", ["process", "validate"], [], null),
                ("ServiceImpl", ["process", "validate"], [], "ServiceBase")
            ],
            functions: []);

        await WriteFileAsync("sample.py", """
client = MainClient()
svc = client.service
svc.process()
# validate not called
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "process");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "validate");
    }

    [Fact]
    public async Task Python_DirectPropertyChain_NoIntermediateVariable()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        var apiIndex = CreatePythonApiIndexWithProperties(
            classes:
            [
                ("MainClient", ["get_resource"], [("widgets", "WidgetClient")], null),
                ("WidgetClient", ["list_widgets", "get_widget"], [], null)
            ],
            functions: []);

        await WriteFileAsync("sample.py", """
client = MainClient()
client.widgets.list_widgets()
# get_widget not called
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "list_widgets");
    }

    [Fact]
    public async Task Python_SelfReferencingType_StillDetectedAsRoot()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        // Single type with method returning itself - fallback ensures it's a root
        var apiIndex = new Python.ApiIndex(
            Package: "test_sdk",
            Modules:
            [
                new Python.ModuleInfo(
                    Name: "test_sdk",
                    Classes:
                    [
                        new Python.ClassInfo
                        {
                            Name = "FluentClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new Python.MethodInfo(Name: "send", Signature: "(self)", Doc: null, IsAsync: null, IsClassMethod: null, IsStaticMethod: null),
                                new Python.MethodInfo(Name: "with_retry", Signature: "(self)", Doc: null, IsAsync: null, IsClassMethod: null, IsStaticMethod: null, Ret: "FluentClient")
                            ]
                        }
                    ],
                    Functions: []
                )
            ]
        );

        await WriteFileAsync("sample.py", """
client = FluentClient()
client.send()
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "send");
    }

    private static Python.ApiIndex CreatePythonApiIndexWithProperties(
        (string ClassName, string[] Methods, (string Name, string? Type)[] Properties, string? Base)[] classes,
        (string FuncName, string Sig)[] functions)
    {
        return new Python.ApiIndex(
            Package: "test_sdk",
            Modules:
            [
                new Python.ModuleInfo(
                    Name: "test_sdk",
                    Classes: classes.Select(c => new Python.ClassInfo
                    {
                        Name = c.ClassName,
                        EntryPoint = true,
                        Base = c.Base,
                        Methods = c.Methods.Select(m => new Python.MethodInfo(
                            Name: m,
                            Signature: "(self)",
                            Doc: null,
                            IsAsync: null,
                            IsClassMethod: null,
                            IsStaticMethod: null
                        )).ToList(),
                        Properties = c.Properties.Length > 0
                            ? c.Properties.Select(p => new Python.PropertyInfo(p.Name, p.Type, null)).ToList()
                            : null
                    }).ToList(),
                    Functions: functions.Select(f => new Python.FunctionInfo
                    {
                        Name = f.FuncName,
                        Signature = f.Sig.Replace($"def {f.FuncName}", "").Trim()
                    }).ToList()
                )
            ]
        );
    }

    private static Python.ApiIndex CreatePythonApiIndexWithBase(
        (string ClassName, string[] Methods, string? Base)[] classes)
    {
        return CreatePythonApiIndexWithProperties(
            classes: classes.Select(c =>
                (c.ClassName, c.Methods, Array.Empty<(string Name, string? Type)>(), c.Base)
            ).ToArray(),
            functions: []);
    }

    [Fact]
    public async Task Python_Strategy2_UniqueMethodName_MatchesSingleCandidate()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        // "process" only exists on ServiceClient — should match via Strategy 2
        // even when the receiver ("x") can't be resolved to a known client type
        var apiIndex = CreatePythonApiIndexWithBase(
            classes:
            [
                ("MainClient", ["connect"], null),
                ("ServiceClient", ["process"], null)
            ]);

        await WriteFileAsync("sample.py", """
x = unknown_factory()
x.process()
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o =>
            o.ClientType == "ServiceClient" && o.Operation == "process");
    }

    [Fact]
    public async Task Python_Strategy2_AmbiguousMethodName_RejectsMatch()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        // "send" exists on both ClientA and ClientB (unrelated) — should NOT match
        var apiIndex = CreatePythonApiIndexWithBase(
            classes:
            [
                ("ClientA", ["send", "connect"], null),
                ("ClientB", ["send", "disconnect"], null)
            ]);

        await WriteFileAsync("sample.py", """
x = unknown_factory()
x.send()
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.DoesNotContain(result.CoveredOperations, o => o.Operation == "send");
    }

    [Fact]
    public async Task Python_Strategy2_InheritedMethod_MatchesBaseClass()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        // "process" exists on both ServiceBase and ServiceImpl (child),
        // but they share an inheritance chain — should match the root (ServiceBase)
        var apiIndex = CreatePythonApiIndexWithBase(
            classes:
            [
                ("MainClient", ["connect"], null),
                ("ServiceBase", ["process", "validate"], null),
                ("ServiceImpl", ["process", "validate"], "ServiceBase")
            ]);

        await WriteFileAsync("sample.py", """
x = unknown_factory()
x.process()
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "process");
    }

    [Fact]
    public async Task Python_Strategy2_DiamondInheritance_MatchesSingleRoot()
    {
        if (!_pythonAnalyzer.IsAvailable()) Assert.Skip("Python not available");

        // Both ChildA and ChildB inherit "run" from BaseClient.
        // All three have "run" — but there's a single root: BaseClient
        var apiIndex = CreatePythonApiIndexWithBase(
            classes:
            [
                ("BaseClient", ["run"], null),
                ("ChildA", ["run"], "BaseClient"),
                ("ChildB", ["run"], "BaseClient")
            ]);

        await WriteFileAsync("sample.py", """
x = unknown_factory()
x.run()
""");

        var result = await _pythonAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o =>
            o.ClientType == "BaseClient" && o.Operation == "run");
    }

    #endregion

    #region TypeScript Usage Analyzer Tests

    [Fact]
    public async Task TypeScript_DirectMethodMatch_ExactNameRequired()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        var apiIndex = CreateTypeScriptApiIndex(
            classes: [("DataClient", ["getData", "getDataAsync", "processData"])],
            functions: []);

        await WriteFileAsync("sample.ts", """
            const client = new DataClient();
            client.getData();
            await client.getDataAsync();
            // processData is not called
            """);

        // Act
        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Equal(2, result.CoveredOperations.Count);
        Assert.Contains(result.CoveredOperations, o => o.Operation == "getData");
        Assert.Contains(result.CoveredOperations, o => o.Operation == "getDataAsync");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "processData");
    }

    [Fact]
    public async Task TypeScript_Subclient_MethodsTrackedSeparately()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        var apiIndex = CreateTypeScriptApiIndexWithProperties(
            classes:
            [
                ("StorageClient", ["getBlob"], [("blobs", "BlobClient"), ("containers", "ContainerClient")]),
                ("BlobClient", ["upload", "download", "delete"], []),
                ("ContainerClient", ["create", "listBlobs"], [])
            ],
            functions: []);

        await WriteFileAsync("sample.ts", """
            const storage = new StorageClient();
            storage.getBlob();

            const blob = storage.blobs;
            blob.upload();
            blob.download();
            // delete not called

            const container = storage.containers;
            container.create();
            // listBlobs not called
            """);

        // Act
        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "StorageClient" && o.Operation == "getBlob");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "upload");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "download");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "create");

        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "delete");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "listBlobs");
    }

    [Fact]
    public async Task TypeScript_TopLevelFunctions_TrackedCorrectly()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        var apiIndex = CreateTypeScriptApiIndex(
            classes: [("Client", ["send"])],
            functions: [("createClient", "(): Client"), ("parseResponse", "(data: string): object")]);

        await WriteFileAsync("sample.ts", """
            import { createClient, Client } from 'sdk';

            const client = createClient();  // top-level function
            client.send();
            // parseResponse not called
            """);

        // Act
        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.Operation == "send");
    }

    private static TypeScript.ApiIndex CreateTypeScriptApiIndex(
        (string ClassName, string[] Methods)[] classes,
        (string FuncName, string Sig)[] functions)
    {
        return CreateTypeScriptApiIndexWithProperties(
            classes.Select(c => (c.ClassName, c.Methods, Array.Empty<(string Name, string Type)>())).ToArray(),
            functions);
    }

    private static TypeScript.ApiIndex CreateTypeScriptApiIndexWithProperties(
        (string ClassName, string[] Methods, (string Name, string Type)[] Properties)[] classes,
        (string FuncName, string Sig)[] functions)
    {
        return new TypeScript.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes = classes.Select(c => new TypeScript.ClassInfo
                    {
                        Name = c.ClassName,
                        EntryPoint = true,
                        Methods = c.Methods.Select(m => new TypeScript.MethodInfo
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList(),
                        Properties = c.Properties.Length > 0
                            ? c.Properties.Select(p => new TypeScript.PropertyInfo
                            {
                                Name = p.Name,
                                Type = p.Type
                            }).ToList()
                            : null,
                        ReferencedTypes = c.Properties.Select(p => p.Type).ToList()
                    }).ToList(),
                    Functions = functions.Select(f =>
                    {
                        // Parse return type from signature like "(): Client"
                        string? ret = null;
                        var colonIdx = f.Sig.LastIndexOf(')');
                        if (colonIdx >= 0)
                        {
                            var afterParen = f.Sig[(colonIdx + 1)..].Trim();
                            if (afterParen.StartsWith(':'))
                            {
                                ret = afterParen[1..].Trim();
                            }
                        }
                        return new TypeScript.FunctionInfo
                        {
                            Name = f.FuncName,
                            Sig = f.Sig,
                            Ret = ret
                        };
                    }).ToList()
                }
            ]
        };
    }

    [Fact]
    public async Task TypeScript_EmptyContainerClient_SubclientOperationsDetected()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        var apiIndex = CreateTypeScriptApiIndexWithProperties(
            classes:
            [
                ("ContainerClient", [], [("widgets", "WidgetClient")]),
                ("WidgetClient", ["listWidgets", "getWidget"], [])
            ],
            functions: []);

        await WriteFileAsync("sample.ts", """
            const client = new ContainerClient();
            const widgets = client.widgets;
            widgets.listWidgets();
            // getWidget not called
            """);

        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.DoesNotContain(result.CoveredOperations, o => o.ClientType == "ContainerClient");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "listWidgets");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "WidgetClient" && o.Operation == "getWidget");
    }

    [Fact]
    public async Task TypeScript_InterfaceSubclient_CoverageDetected()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        // Property typed as interface, implementation has the methods
        var apiIndex = CreateTypeScriptApiIndexFull(
            classes:
            [
                ("MainClient", [], [("service", "IServiceClient")], null),
                ("ServiceClientImpl", ["process", "validate"], [], ["IServiceClient"])
            ],
            interfaces: [("IServiceClient", ["process", "validate"])],
            functions: []);

        await WriteFileAsync("sample.ts", """
            const client = new MainClient();
            const svc = client.service;
            svc.process();
            // validate not called
            """);

        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "process");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "validate");
    }

    [Fact]
    public async Task TypeScript_DirectPropertyChain_NoIntermediateVariable()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        var apiIndex = CreateTypeScriptApiIndexWithProperties(
            classes:
            [
                ("MainClient", ["getResource"], [("widgets", "WidgetClient")]),
                ("WidgetClient", ["listWidgets", "getWidget"], [])
            ],
            functions: []);

        await WriteFileAsync("sample.ts", """
            const client = new MainClient();
            client.widgets.listWidgets();
            // getWidget not called
            """);

        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "listWidgets");
    }

    [Fact]
    public async Task TypeScript_SelfReferencingType_StillDetectedAsRoot()
    {
        if (!_tsAnalyzer.IsAvailable()) Assert.Skip("Node.js not available");

        // Two independent types: FluentClient references itself via withRetry return type
        // Self-ref exclusion ensures FluentClient is still detected as a root
        var apiIndex = new TypeScript.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "FluentClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TypeScript.MethodInfo { Name = "send", Sig = "()" },
                                new TypeScript.MethodInfo { Name = "withRetry", Sig = "()", Ret = "FluentClient" }
                            ]
                        },
                        new TypeScript.ClassInfo
                        {
                            Name = "IndependentClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TypeScript.MethodInfo { Name = "process", Sig = "()" }
                            ]
                        }
                    ]
                }
            ]
        };

        await WriteFileAsync("sample.ts", """
            const client = new FluentClient();
            client.send();
            const other = new IndependentClient();
            other.process();
            """);

        var result = await _tsAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Both types should have their operations detected
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "send");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "IndependentClient" && o.Operation == "process");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "withRetry");
    }

    private static TypeScript.ApiIndex CreateTypeScriptApiIndexFull(
        (string ClassName, string[] Methods, (string Name, string Type)[] Properties, string[]? Implements)[] classes,
        (string InterfaceName, string[] Methods)[] interfaces,
        (string FuncName, string Sig)[] functions)
    {
        return new TypeScript.ApiIndex
        {
            Package = "test-sdk",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes = classes.Select(c => new TypeScript.ClassInfo
                    {
                        Name = c.ClassName,
                        EntryPoint = true,
                        Implements = c.Implements?.ToList(),
                        Methods = c.Methods.Select(m => new TypeScript.MethodInfo
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList(),
                        Properties = c.Properties.Length > 0
                            ? c.Properties.Select(p => new TypeScript.PropertyInfo
                            {
                                Name = p.Name,
                                Type = p.Type
                            }).ToList()
                            : null,
                        ReferencedTypes = (c.Implements ?? []).Concat(c.Properties.Select(p => p.Type)).ToList()
                    }).ToList(),
                    Interfaces = interfaces.Length > 0
                        ? interfaces.Select(i => new TypeScript.InterfaceInfo
                        {
                            Name = i.InterfaceName,
                            EntryPoint = true,
                            Methods = i.Methods.Select(m => new TypeScript.MethodInfo
                            {
                                Name = m,
                                Sig = "()"
                            }).ToList()
                        }).ToList()
                        : null,
                    Functions = functions.Select(f =>
                    {
                        string? ret = null;
                        var colonIdx = f.Sig.LastIndexOf(')');
                        if (colonIdx >= 0)
                        {
                            var afterParen = f.Sig[(colonIdx + 1)..].Trim();
                            if (afterParen.StartsWith(':'))
                                ret = afterParen[1..].Trim();
                        }
                        return new TypeScript.FunctionInfo
                        {
                            Name = f.FuncName,
                            Sig = f.Sig,
                            Ret = ret
                        };
                    }).ToList()
                }
            ]
        };
    }

    #endregion

    #region Java Usage Analyzer Tests

    [Fact]
    public async Task Java_DirectMethodMatch_ExactNameRequired()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        var apiIndex = CreateJavaApiIndex(
            classes: [("DataClient", ["getData", "getDataAsync", "processData"])],
            interfaces: []);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    DataClient client = new DataClient();
                    client.getData();
                    client.getDataAsync();
                    // processData is not called
                }
            }
            """);

        // Act
        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Equal(2, result.CoveredOperations.Count);
        Assert.Contains(result.CoveredOperations, o => o.Operation == "getData");
        Assert.Contains(result.CoveredOperations, o => o.Operation == "getDataAsync");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "processData");
    }

    [Fact]
    public async Task Java_Subclient_MethodsTrackedSeparately()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        var apiIndex = CreateJavaApiIndex(
            classes:
            [
                ("StorageClient", ["getBlob"]),
                ("BlobClient", ["upload", "download", "delete"]),
                ("ContainerClient", ["create", "listBlobs"])
            ],
            interfaces: []);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    StorageClient storage = new StorageClient();
                    storage.getBlob();

                    BlobClient blob = storage.getBlobs();
                    blob.upload();
                    blob.download();
                    // delete not called

                    ContainerClient container = storage.getContainers();
                    container.create();
                    // listBlobs not called
                }
            }
            """);

        // Act
        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "StorageClient" && o.Operation == "getBlob");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "upload");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "download");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "create");

        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "delete");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "listBlobs");
    }

    [Fact]
    public async Task Java_InterfaceMethods_TrackedCorrectly()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        var apiIndex = CreateJavaApiIndex(
            classes: [("ClientImpl", ["send"])],
            interfaces: [("Client", ["send", "receive"])]);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    Client client = new ClientImpl();
                    client.send();
                    // receive not called
                }
            }
            """);

        // Act
        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.Operation == "send");
    }

    private static Java.ApiIndex CreateJavaApiIndex(
        (string ClassName, string[] Methods)[] classes,
        (string InterfaceName, string[] Methods)[] interfaces)
    {
        return new Java.ApiIndex
        {
            Package = "com.test.sdk",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test.sdk",
                    Classes = classes.Select(c => new Java.ClassInfo
                    {
                        Name = c.ClassName,
                        EntryPoint = true,
                        Methods = c.Methods.Select(m => new Java.MethodInfo
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList()
                    }).ToList(),
                    Interfaces = interfaces.Select(i => new Java.ClassInfo
                    {
                        Name = i.InterfaceName,
                        EntryPoint = true,
                        Methods = i.Methods.Select(m => new Java.MethodInfo
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList()
                    }).ToList()
                }
            ]
        };
    }

    [Fact]
    public async Task Java_EmptyContainerClient_SubclientOperationsDetected()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        var apiIndex = CreateJavaApiIndexFull(
            classes:
            [
                ("ContainerClient", [], [("widgetsClient", "WidgetsClient")], []),
                ("WidgetsClient", [("listWidgets", null), ("getWidget", null)], [], [])
            ],
            interfaces: []);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    ContainerClient client = new ContainerClient();
                    WidgetsClient widgets = client.widgetsClient;
                    widgets.listWidgets();
                    // getWidget not called
                }
            }
            """);

        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.DoesNotContain(result.CoveredOperations, o => o.ClientType == "ContainerClient");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "WidgetsClient" && o.Operation == "listWidgets");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "WidgetsClient" && o.Operation == "getWidget");
    }

    [Fact]
    public async Task Java_InterfaceSubclient_CoverageDetected()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        var apiIndex = CreateJavaApiIndexFull(
            classes:
            [
                ("MainClient", [], [("service", "IServiceClient")], []),
                ("ServiceClientImpl", [("process", null), ("validate", null)], [], ["IServiceClient"])
            ],
            interfaces: [("IServiceClient", ["process", "validate"])]);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    MainClient client = new MainClient();
                    IServiceClient svc = client.service;
                    svc.process();
                    // validate not called
                }
            }
            """);

        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "process");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "validate");
    }

    [Fact]
    public async Task Java_ChainedMethodCall_NoIntermediateVariable()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        // client.getWidgets().listWidgets() without intermediate variable
        var apiIndex = CreateJavaApiIndexFull(
            classes:
            [
                ("MainClient", [("getWidgets", "WidgetsClient")], [], []),
                ("WidgetsClient", [("listWidgets", null), ("getWidget", null)], [], [])
            ],
            interfaces: []);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    MainClient client = new MainClient();
                    client.getWidgets().listWidgets();
                    // getWidget not called
                }
            }
            """);

        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "listWidgets");
    }

    [Fact]
    public async Task Java_SelfReferencingType_StillDetectedAsRoot()
    {
        if (!_javaAnalyzer.IsAvailable()) Assert.Skip("JBang not available");

        // Single type with method returning itself - fallback ensures it's a root
        var apiIndex = CreateJavaApiIndexFull(
            classes: [("FluentClient", [("send", null), ("withRetry", "FluentClient")], [], [])],
            interfaces: []);

        await WriteFileAsync("Sample.java", """
            public class Sample {
                public static void main(String[] args) {
                    FluentClient client = new FluentClient();
                    client.send();
                }
            }
            """);

        var result = await _javaAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "send");
    }

    private static Java.ApiIndex CreateJavaApiIndexFull(
        (string ClassName, (string Name, string? Ret)[] Methods, (string Name, string Type)[] Fields, string[] Implements)[] classes,
        (string InterfaceName, string[] Methods)[] interfaces)
    {
        return new Java.ApiIndex
        {
            Package = "com.test.sdk",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test.sdk",
                    Classes = classes.Select(c => new Java.ClassInfo
                    {
                        Name = c.ClassName,
                        EntryPoint = true,
                        Methods = c.Methods.Select(m => new Java.MethodInfo
                        {
                            Name = m.Name,
                            Sig = "()",
                            Ret = m.Ret
                        }).ToList(),
                        Fields = c.Fields.Length > 0
                            ? c.Fields.Select(f => new Java.FieldInfo
                            {
                                Name = f.Name,
                                Type = f.Type
                            }).ToList()
                            : null,
                        Implements = c.Implements.Length > 0
                            ? c.Implements.ToList()
                            : null
                    }).ToList(),
                    Interfaces = interfaces.Select(i => new Java.ClassInfo
                    {
                        Name = i.InterfaceName,
                        EntryPoint = true,
                        Methods = i.Methods.Select(m => new Java.MethodInfo
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList()
                    }).ToList()
                }
            ]
        };
    }

    #endregion

    #region Go Usage Analyzer Tests

    [Fact]
    public async Task Go_DirectMethodMatch_ExactNameRequired()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        var apiIndex = CreateGoApiIndex(
            structs: [("DataClient", ["GetData", "GetDataAsync", "ProcessData"])],
            functions: []);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                client := &DataClient{}
                client.GetData()
                client.GetDataAsync()
                // ProcessData is not called
            }
            """);

        // Act
        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Equal(2, result.CoveredOperations.Count);
        Assert.Contains(result.CoveredOperations, o => o.Operation == "GetData");
        Assert.Contains(result.CoveredOperations, o => o.Operation == "GetDataAsync");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "ProcessData");
    }

    [Fact]
    public async Task Go_Subclient_MethodsTrackedSeparately()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        // StorageClient has methods that return subclient types (Blobs→BlobClient, Containers→ContainerClient)
        var apiIndex = CreateGoApiIndexWithMethodRets(
            structs:
            [
                ("StorageClient", [("GetBlob", (string?)null), ("Blobs", "*BlobClient"), ("Containers", "*ContainerClient")]),
                ("BlobClient", [("Upload", null), ("Download", null), ("Delete", null)]),
                ("ContainerClient", [("Create", null), ("ListBlobs", null)])
            ],
            functions: []);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                storage := &StorageClient{}
                storage.GetBlob()

                blob := storage.Blobs()
                blob.Upload()
                blob.Download()
                // Delete not called

                container := storage.Containers()
                container.Create()
                // ListBlobs not called
            }
            """);

        // Act
        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "StorageClient" && o.Operation == "GetBlob");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Upload");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Download");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "Create");

        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "BlobClient" && o.Operation == "Delete");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "ContainerClient" && o.Operation == "ListBlobs");
    }

    [Fact]
    public async Task Go_TopLevelFunctions_TrackedCorrectly()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        var apiIndex = CreateGoApiIndex(
            structs: [("Client", ["Send"])],
            functions: [("NewClient", "func NewClient() *Client"), ("ParseResponse", "func ParseResponse(data string) map[string]interface{}")]);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                client := NewClient()  // top-level function
                client.Send()
                // ParseResponse not called
            }
            """);

        // Act
        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.Operation == "Send");
    }

    [Fact]
    public async Task Go_InterfaceMethods_TrackedCorrectly()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        var apiIndex = CreateGoApiIndex(
            structs: [("ClientImpl", ["Send"])],
            functions: [],
            interfaces: [("Client", ["Send", "Receive"])]);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                var client Client = &ClientImpl{}
                client.Send()
                // Receive not called
            }
            """);

        // Act
        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Assert
        Assert.Contains(result.CoveredOperations, o => o.Operation == "Send");
    }

    private static Go.ApiIndex CreateGoApiIndex(
        (string StructName, string[] Methods)[] structs,
        (string FuncName, string Sig)[] functions,
        (string InterfaceName, string[] Methods)[]? interfaces = null)
    {
        return CreateGoApiIndexWithMethodRets(
            structs.Select(s => (s.StructName, s.Methods.Select(m => (m, (string?)null)).ToArray())).ToArray(),
            functions,
            interfaces);
    }

    private static Go.ApiIndex CreateGoApiIndexWithMethodRets(
        (string StructName, (string Name, string? Ret)[] Methods)[] structs,
        (string FuncName, string Sig)[] functions,
        (string InterfaceName, string[] Methods)[]? interfaces = null)
    {
        return new Go.ApiIndex
        {
            Package = "testsdk",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "testsdk",
                    Structs = structs.Select(s => new Go.StructApi
                    {
                        Name = s.StructName,
                        EntryPoint = true,
                        Methods = s.Methods.Select(m => new Go.FuncApi
                        {
                            Name = m.Name,
                            Sig = "()",
                            Ret = m.Ret
                        }).ToList()
                    }).ToList(),
                    Functions = functions.Select(f =>
                    {
                        // Parse return type from signature like "() *Client"
                        var sig = f.Sig.Replace($"func {f.FuncName}", "").Trim();
                        string? ret = null;
                        var parenClose = sig.LastIndexOf(')');
                        if (parenClose >= 0 && parenClose < sig.Length - 1)
                        {
                            ret = sig[(parenClose + 1)..].Trim();
                        }
                        return new Go.FuncApi
                        {
                            Name = f.FuncName,
                            Sig = sig,
                            Ret = ret
                        };
                    }).ToList(),
                    Interfaces = interfaces?.Select(i => new Go.IfaceApi
                    {
                        Name = i.InterfaceName,
                        Methods = i.Methods.Select(m => new Go.FuncApi
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList()
                    }).ToList()
                }
            ]
        };
    }

    [Fact]
    public async Task Go_EmptyContainerClient_SubclientOperationsDetected()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        var apiIndex = CreateGoApiIndexFull(
            structs:
            [
                ("ContainerClient", [], [("Widgets", "*WidgetsClient")]),
                ("WidgetsClient", [("ListWidgets", (string?)null), ("GetWidget", (string?)null)], [])
            ],
            functions: []);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                client := &ContainerClient{}
                client.Widgets.ListWidgets()
                // GetWidget not called
            }
            """);

        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.DoesNotContain(result.CoveredOperations, o => o.ClientType == "ContainerClient");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "WidgetsClient" && o.Operation == "ListWidgets");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "WidgetsClient" && o.Operation == "GetWidget");
    }

    [Fact]
    public async Task Go_InterfaceSubclient_CoverageDetected()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        // Field typed as interface, implementation struct has the methods (duck typing)
        var apiIndex = CreateGoApiIndexFull(
            structs:
            [
                ("MainClient", [], [("Service", "ServiceClient")]),
                ("ServiceClientImpl", [("Process", (string?)null), ("Validate", (string?)null)], [])
            ],
            functions: [],
            interfaces: [("ServiceClient", ["Process", "Validate"])]);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                client := &MainClient{}
                client.Service.Process()
            }
            """);

        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "Process");
        Assert.Contains(result.UncoveredOperations, o => o.Operation == "Validate");
    }

    [Fact]
    public async Task Go_DirectFieldChain_NoIntermediateVariable()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        // client.Widgets.ListWidgets() without intermediate variable (Strategy 1c)
        var apiIndex = CreateGoApiIndexFull(
            structs:
            [
                ("MainClient", [("GetResource", (string?)null)], [("Widgets", "*WidgetsClient")]),
                ("WidgetsClient", [("ListWidgets", (string?)null), ("GetWidget", (string?)null)], [])
            ],
            functions: []);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                client := &MainClient{}
                client.Widgets.ListWidgets()
                // GetWidget not called via chain
            }
            """);

        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        Assert.Contains(result.CoveredOperations, o => o.Operation == "ListWidgets");
    }

    [Fact]
    public async Task Go_SelfReferencingType_StillDetectedAsRoot()
    {
        if (!_goAnalyzer.IsAvailable()) Assert.Skip("Go not available");

        // Two independent types: FluentClient references itself via WithRetry return type
        // Self-ref exclusion ensures FluentClient is still detected as a root
        var apiIndex = CreateGoApiIndexWithMethodRets(
            structs:
            [
                ("FluentClient", [("Send", (string?)null), ("WithRetry", "*FluentClient")]),
                ("IndependentClient", [("Process", (string?)null)])
            ],
            functions: []);

        await WriteFileAsync("sample.go", """
            package main

            func main() {
                client := &FluentClient{}
                client.Send()
                other := &IndependentClient{}
                other.Process()
            }
            """);

        var result = await _goAnalyzer.AnalyzeAsync(_tempDir, apiIndex);

        // Both types should have their operations detected
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "Send");
        Assert.Contains(result.CoveredOperations, o => o.ClientType == "IndependentClient" && o.Operation == "Process");
        Assert.Contains(result.UncoveredOperations, o => o.ClientType == "FluentClient" && o.Operation == "WithRetry");
    }

    private static Go.ApiIndex CreateGoApiIndexFull(
        (string StructName, (string Name, string? Ret)[] Methods, (string Name, string Type)[] Fields)[] structs,
        (string FuncName, string Sig)[] functions,
        (string InterfaceName, string[] Methods)[]? interfaces = null)
    {
        return new Go.ApiIndex
        {
            Package = "testsdk",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "testsdk",
                    Structs = structs.Select(s => new Go.StructApi
                    {
                        Name = s.StructName,
                        EntryPoint = true,
                        Methods = s.Methods.Select(m => new Go.FuncApi
                        {
                            Name = m.Name,
                            Sig = "()",
                            Ret = m.Ret
                        }).ToList(),
                        Fields = s.Fields.Length > 0
                            ? s.Fields.Select(f => new Go.FieldApi
                            {
                                Name = f.Name,
                                Type = f.Type
                            }).ToList()
                            : null
                    }).ToList(),
                    Functions = functions.Select(f =>
                    {
                        var sig = f.Sig.Replace($"func {f.FuncName}", "").Trim();
                        string? ret = null;
                        var parenClose = sig.LastIndexOf(')');
                        if (parenClose >= 0 && parenClose < sig.Length - 1)
                            ret = sig[(parenClose + 1)..].Trim();
                        return new Go.FuncApi
                        {
                            Name = f.FuncName,
                            Sig = sig,
                            Ret = ret
                        };
                    }).ToList(),
                    Interfaces = interfaces?.Select(i => new Go.IfaceApi
                    {
                        Name = i.InterfaceName,
                        Methods = i.Methods.Select(m => new Go.FuncApi
                        {
                            Name = m,
                            Sig = "()"
                        }).ToList()
                    }).ToList()
                }
            ]
        };
    }

    #endregion

    #region Cross-Language Consistency Tests

    [Fact]
    public async Task AllAnalyzers_EmptyDirectory_ReturnsEmptyIndex()
    {
        var emptyDir = Path.Combine(_tempDir, "empty");
        Directory.CreateDirectory(emptyDir);

        // C#

        var csharpApi = CreateCSharpApiIndex(("Client", ["Method"]));
        var csharpResult = await _csharpAnalyzer.AnalyzeAsync(emptyDir, csharpApi);
        Assert.Equal(0, csharpResult.FileCount);
        Assert.Empty(csharpResult.CoveredOperations);

        // Python

        if (_pythonAnalyzer.IsAvailable())
        {
            var pythonApi = CreatePythonApiIndex([("Client", ["method"])], []);
            var pythonResult = await _pythonAnalyzer.AnalyzeAsync(emptyDir, pythonApi);
            Assert.Equal(0, pythonResult.FileCount);
            Assert.Empty(pythonResult.CoveredOperations);
        }

        // TypeScript

        if (_tsAnalyzer.IsAvailable())
        {
            var tsApi = CreateTypeScriptApiIndex([("Client", ["method"])], []);
            var tsResult = await _tsAnalyzer.AnalyzeAsync(emptyDir, tsApi);
            Assert.Equal(0, tsResult.FileCount);
            Assert.Empty(tsResult.CoveredOperations);
        }

        // Java

        if (_javaAnalyzer.IsAvailable())
        {
            var javaApi = CreateJavaApiIndex([("Client", ["method"])], []);
            var javaResult = await _javaAnalyzer.AnalyzeAsync(emptyDir, javaApi);
            Assert.Equal(0, javaResult.FileCount);
            Assert.Empty(javaResult.CoveredOperations);
        }

        // Go

        if (_goAnalyzer.IsAvailable())
        {
            var goApi = CreateGoApiIndex([("Client", ["Method"])], []);
            var goResult = await _goAnalyzer.AnalyzeAsync(emptyDir, goApi);
            Assert.Equal(0, goResult.FileCount);
            Assert.Empty(goResult.CoveredOperations);
        }
    }

    [Fact]
    public async Task AllAnalyzers_EmptyApi_ReturnsEmptyOperations()
    {
        // Write sample files
        await WriteFileAsync("sample.cs", "client.Method();");
        await WriteFileAsync("sample.py", "client.method()");
        await WriteFileAsync("sample.ts", "client.method();");
        await WriteFileAsync("Sample.java", "class S { void m() { client.method(); }}");
        await WriteFileAsync("sample.go", "package main\nfunc main() { client.Method() }");

        // C#

        var csharpApi = new DotNet.ApiIndex { Package = "Empty" };
        var csharpResult = await _csharpAnalyzer.AnalyzeAsync(_tempDir, csharpApi);
        Assert.Empty(csharpResult.CoveredOperations);
        Assert.Empty(csharpResult.UncoveredOperations);

        // Python

        if (_pythonAnalyzer.IsAvailable())
        {
            var pythonApi = new Python.ApiIndex("Empty", []);
            var pythonResult = await _pythonAnalyzer.AnalyzeAsync(_tempDir, pythonApi);
            Assert.Empty(pythonResult.CoveredOperations);
            Assert.Empty(pythonResult.UncoveredOperations);
        }

        // TypeScript

        if (_tsAnalyzer.IsAvailable())
        {
            var tsApi = new TypeScript.ApiIndex { Package = "empty" };
            var tsResult = await _tsAnalyzer.AnalyzeAsync(_tempDir, tsApi);
            Assert.Empty(tsResult.CoveredOperations);
            Assert.Empty(tsResult.UncoveredOperations);
        }

        // Java

        if (_javaAnalyzer.IsAvailable())
        {
            var javaApi = new Java.ApiIndex { Package = "empty" };
            var javaResult = await _javaAnalyzer.AnalyzeAsync(_tempDir, javaApi);
            Assert.Empty(javaResult.CoveredOperations);
            Assert.Empty(javaResult.UncoveredOperations);
        }

        // Go

        if (_goAnalyzer.IsAvailable())
        {
            var goApi = new Go.ApiIndex { Package = "empty" };
            var goResult = await _goAnalyzer.AnalyzeAsync(_tempDir, goApi);
            Assert.Empty(goResult.CoveredOperations);
            Assert.Empty(goResult.UncoveredOperations);
        }
    }

    #endregion

    #region Test Helpers

    private async Task WriteFileAsync(string fileName, string content)
    {
        var path = Path.Combine(_tempDir, fileName);
        var dir = Path.GetDirectoryName(path);
        if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
        await File.WriteAllTextAsync(path, content);
    }

    #endregion
}
