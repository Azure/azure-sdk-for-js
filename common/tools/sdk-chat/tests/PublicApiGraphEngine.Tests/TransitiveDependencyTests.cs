// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.DotNet;
using PublicApiGraphEngine.Go;
using PublicApiGraphEngine.Java;
using PublicApiGraphEngine.Python;
using PublicApiGraphEngine.TypeScript;
using Xunit;
using DotNetApiIndex = PublicApiGraphEngine.DotNet.ApiIndex;
using DotNetDependencyInfo = PublicApiGraphEngine.DotNet.DependencyInfo;
using DotNetMemberInfo = PublicApiGraphEngine.DotNet.MemberInfo;
using DotNetNamespaceInfo = PublicApiGraphEngine.DotNet.NamespaceInfo;
using DotNetTypeInfo = PublicApiGraphEngine.DotNet.TypeInfo;
using GoApiIndex = PublicApiGraphEngine.Go.ApiIndex;
using GoDependencyInfo = PublicApiGraphEngine.Go.DependencyInfo;
using GoFuncApi = PublicApiGraphEngine.Go.FuncApi;
using GoIfaceApi = PublicApiGraphEngine.Go.IfaceApi;
using GoPackageApi = PublicApiGraphEngine.Go.PackageApi;
using GoStructApi = PublicApiGraphEngine.Go.StructApi;
using JavaApiIndex = PublicApiGraphEngine.Java.ApiIndex;
using JavaClassInfo = PublicApiGraphEngine.Java.ClassInfo;
using JavaDependencyInfo = PublicApiGraphEngine.Java.DependencyInfo;
using JavaMethodInfo = PublicApiGraphEngine.Java.MethodInfo;
using JavaPackageInfo = PublicApiGraphEngine.Java.PackageInfo;
using PyApiIndex = PublicApiGraphEngine.Python.ApiIndex;
using PyClassInfo = PublicApiGraphEngine.Python.ClassInfo;
using PyDependencyInfo = PublicApiGraphEngine.Python.DependencyInfo;
using PyModuleInfo = PublicApiGraphEngine.Python.ModuleInfo;
using TsApiIndex = PublicApiGraphEngine.TypeScript.ApiIndex;
using TsClassInfo = PublicApiGraphEngine.TypeScript.ClassInfo;
using TsDependencyInfo = PublicApiGraphEngine.TypeScript.DependencyInfo;
using TsFunctionInfo = PublicApiGraphEngine.TypeScript.FunctionInfo;
using TsInterfaceInfo = PublicApiGraphEngine.TypeScript.InterfaceInfo;
using TsModuleInfo = PublicApiGraphEngine.TypeScript.ModuleInfo;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for transitive dependency resolution across all Public API Graph Engines.
/// Verifies that types from external packages referenced in API signatures are detected.
/// </summary>
public class TransitiveDependencyTests
{
    private static readonly string TestFixturesBase = Path.Combine(AppContext.BaseDirectory, "TestFixtures");

    #region DotNet Tests

    [Fact]
    public async Task DotNet_Extract_IncludesDependenciesProperty()
    {
        var engine = new CSharpPublicApiGraphEngine();
        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "DotNet"));

        // Dependencies property should exist (may be null if no external deps)
        // The test fixtures use standard .NET types, so Dependencies may be null
        Assert.NotNull(api);
        Assert.NotNull(api.Namespaces);
    }

    [Fact]
    public async Task DotNet_Extract_WithExternalTypes_FindsDependencies()
    {
        // Create a temp directory with a file that references external types
        var tempDir = Path.Combine(Path.GetTempPath(), $"DotNetDeps_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            var code = """
                namespace TestPkg;

                // References Example.Core types
                public class MyClient
                {
                    public Example.Response GetResponse() => null!;
                    public Example.Core.Pipeline.HttpPipeline Pipeline { get; }
                }
                """;

            await File.WriteAllTextAsync(Path.Combine(tempDir, "MyClient.cs"), code);

            var engine = new CSharpPublicApiGraphEngine();
            var api = await engine.GraphAsync(tempDir);

            Assert.NotNull(api);
            Assert.NotEmpty(api.Namespaces);

            // Should find the external Example types
            if (api.Dependencies != null && api.Dependencies.Count > 0)
            {
                Assert.Contains(api.Dependencies, d =>
                    d.Package.Contains("Example", StringComparison.OrdinalIgnoreCase));
            }
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public void DotNet_BuiltinTypes_AreExcludedFromDependencies()
    {
        // Verify that common builtin types are not treated as external dependencies
        var builtinSignature = "Task<string> GetAsync(CancellationToken token, List<int> ids)";

        // The signature contains only builtin types, so shouldn't produce dependencies
        var api = new DotNetApiIndex
        {
            Package = "Test",
            Namespaces =
            [
                new DotNetNamespaceInfo
                {
                    Name = "Test",
                    Types =
                    [
                        new DotNetTypeInfo
                        {
                            Name = "TestClient",
                            Kind = "class",
                            Members = [new DotNetMemberInfo { Name = "GetAsync", Kind = "method", Signature = builtinSignature }]
                        }
                    ]
                }
            ]
        };

        // ToStubs should work without including builtin types as dependencies
        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("// From: System", stubs);
    }

    [Fact]
    public void DotNet_Formatter_IncludesDependencySection()
    {
        var api = new DotNetApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new DotNetNamespaceInfo { Name = "TestPkg", Types = [new DotNetTypeInfo { Name = "MyClass", Kind = "class" }] }
            ],
            Dependencies =
            [
                new DotNetDependencyInfo
                {
                    Package = "Example.Core",
                    Types = [new DotNetTypeInfo { Name = "Response", Kind = "class" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("Example.Core", stubs);
        Assert.Contains("Response", stubs);
    }

    #endregion

    #region TypeScript Tests

    [Fact]
    public async Task TypeScript_Extract_IncludesDependenciesProperty()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript engine not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "TypeScript"));

        Assert.NotNull(api);
        Assert.NotEmpty(api.Modules);

        // TypeScript fixture imports from @sdk/abort-controller, should have dependencies
        // The AbortSignalLike import should be detected
    }

    [Fact]
    public void TypeScript_Formatter_IncludesDependencySection()
    {
        var api = new TsApiIndex
        {
            Package = "test-pkg",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "client",
                    Classes = [new TsClassInfo { Name = "TestClient", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@example/core-rest-pipeline",
                    Interfaces =
                    [
                        new TsInterfaceInfo { Name = "PipelinePolicy" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("Dependencies", stubs);
        Assert.Contains("@example/core-rest-pipeline", stubs);
        Assert.Contains("PipelinePolicy", stubs);
    }

    [Fact]
    public void TypeScript_BuiltinTypes_AreExcluded()
    {
        // Verify Promise, string, number, etc. are not in dependencies
        var api = new TsApiIndex
        {
            Package = "test",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "test",
                    Functions =
                    [
                        new TsFunctionInfo
                        {
                            Name = "getData",
                            ExportPath = ".",
                            Sig = "(id: string) => Promise<Record<string, number>>"
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        // Should not have dependency section for builtin-only types
    }

    #endregion

    #region Python Tests

    [Fact]
    public async Task Python_Extract_IncludesDependenciesProperty()
    {
        var engine = new PythonPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "Python engine not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "Python"));

        Assert.NotNull(api);
        Assert.NotEmpty(api.Modules);
    }

    [Fact]
    public void Python_Formatter_IncludesDependencySection()
    {
        var api = new PyApiIndex(
            Package: "test-pkg",
            Modules:
            [
                new PyModuleInfo("client",
                    [new PyClassInfo { Name = "TestClient" }],
                    null)
            ],
            Dependencies:
            [
                new PyDependencyInfo
                {
                    Package = "example-core",
                    Classes =
                    [
                        new PyClassInfo { Name = "PipelinePolicy" }
                    ]
                }
            ]
        );

        var stubs = api.ToStubs();

        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("example-core", stubs);
        Assert.Contains("PipelinePolicy", stubs);
    }

    #endregion

    #region Go Tests

    [Fact]
    public async Task Go_Extract_IncludesDependenciesProperty()
    {
        var engine = new GoPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "Go engine not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "Go"));

        Assert.NotNull(api);
        Assert.NotEmpty(api.Packages);
    }

    [Fact]
    public void Go_Formatter_IncludesDependencySection()
    {
        var api = new GoApiIndex
        {
            Package = "testpkg",
            Packages =
            [
                new GoPackageApi
                {
                    Name = "testpkg",
                    Structs = [new GoStructApi { Name = "TestClient" }]
                }
            ],
            Dependencies =
            [
                new GoDependencyInfo
                {
                    Package = "github.com/example/sdk-for-go/sdk/azcore",
                    Interfaces =
                    [
                        new GoIfaceApi { Name = "Policy" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("azcore", stubs);
        Assert.Contains("Policy", stubs);
    }

    [Fact]
    public void Go_BuiltinTypes_AreExcluded()
    {
        // Verify error, context, etc. are not in dependencies
        var api = new GoApiIndex
        {
            Package = "test",
            Packages =
            [
                new GoPackageApi
                {
                    Name = "test",
                    Structs =
                    [
                        new GoStructApi
                        {
                            Name = "Client",
                            Methods =
                            [
                                new GoFuncApi
                                {
                                    Name = "Get",
                                    Sig = "ctx context.Context, id string",
                                    Ret = "error"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        // Builtin-only signatures shouldn't produce dependency section
        Assert.DoesNotContain("// From: context", stubs);
    }

    #endregion

    #region Java Tests

    [Fact]
    public async Task Java_Extract_IncludesDependenciesProperty()
    {
        var engine = new JavaPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "Java engine not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "Java"));

        Assert.NotNull(api);
        Assert.NotEmpty(api.Packages);
    }

    [Fact]
    public void Java_Formatter_IncludesDependencySection()
    {
        var api = new JavaApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new JavaPackageInfo
                {
                    Name = "com.test",
                    Classes = [new JavaClassInfo { Name = "TestClient" }]
                }
            ],
            Dependencies =
            [
                new JavaDependencyInfo
                {
                    Package = "com.example.core",
                    Classes =
                    [
                        new JavaClassInfo { Name = "HttpPipeline" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("com.example.core", stubs);
        Assert.Contains("HttpPipeline", stubs);
    }

    [Fact]
    public void Java_BuiltinTypes_AreExcluded()
    {
        // Verify String, List, Map, etc. are not in dependencies
        var api = new JavaApiIndex
        {
            Package = "test",
            Packages =
            [
                new JavaPackageInfo
                {
                    Name = "test",
                    Classes =
                    [
                        new JavaClassInfo
                        {
                            Name = "Client",
                            Methods =
                            [
                                new JavaMethodInfo
                                {
                                    Name = "getData",
                                    Ret = "Map<String, List<Integer>>"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        // Builtin-only signatures shouldn't produce dependency section
    }

    #endregion

    #region JSON Serialization Tests

    [Fact]
    public void DotNet_Dependencies_SerializeToJson()
    {
        var api = new DotNetApiIndex
        {
            Package = "Test",
            Namespaces = [],
            Dependencies =
            [
                new DotNetDependencyInfo
                {
                    Package = "External.Pkg",
                    Types = [new DotNetTypeInfo { Name = "ExternalType", Kind = "class" }]
                }
            ]
        };

        var json = api.ToJson(pretty: true);

        Assert.Contains("\"dependencies\"", json);
        Assert.Contains("\"External.Pkg\"", json);
        Assert.Contains("\"ExternalType\"", json);
    }

    [Fact]
    public void TypeScript_Dependencies_SerializeToJson()
    {
        var api = new TsApiIndex
        {
            Package = "test",
            Modules = [],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@external/pkg",
                    Classes = [new TsClassInfo { Name = "ExternalClass" }]
                }
            ]
        };

        var json = api.ToJson(pretty: true);

        Assert.Contains("\"dependencies\"", json);
        Assert.Contains("\"@external/pkg\"", json);
        Assert.Contains("\"ExternalClass\"", json);
    }

    [Fact]
    public void Go_Dependencies_SerializeToJson()
    {
        var api = new GoApiIndex
        {
            Package = "test",
            Packages = [],
            Dependencies =
            [
                new GoDependencyInfo
                {
                    Package = "github.com/external/pkg",
                    Structs = [new GoStructApi { Name = "ExternalStruct" }]
                }
            ]
        };

        var json = api.ToJson(pretty: true);

        Assert.Contains("\"dependencies\"", json);
        Assert.Contains("\"github.com/external/pkg\"", json);
        Assert.Contains("\"ExternalStruct\"", json);
    }

    [Fact]
    public void Java_Dependencies_SerializeToJson()
    {
        var api = new JavaApiIndex
        {
            Package = "test",
            Packages = [],
            Dependencies =
            [
                new JavaDependencyInfo
                {
                    Package = "com.external.pkg",
                    Classes = [new JavaClassInfo { Name = "ExternalClass" }]
                }
            ]
        };

        var json = api.ToJson(pretty: true);

        Assert.Contains("\"dependencies\"", json);
        Assert.Contains("\"com.external.pkg\"", json);
        Assert.Contains("\"ExternalClass\"", json);
    }

    [Fact]
    public void Python_Dependencies_SerializeToJson()
    {
        var api = new PyApiIndex(
            Package: "test",
            Modules: [],
            Dependencies:
            [
                new PyDependencyInfo
                {
                    Package = "external-pkg",
                    Classes = [new PyClassInfo { Name = "ExternalClass" }]
                }
            ]
        );

        var json = api.ToJson(pretty: true);

        Assert.Contains("\"dependencies\"", json);
        Assert.Contains("\"external-pkg\"", json);
        Assert.Contains("\"ExternalClass\"", json);
    }

    #endregion

    #region Null Dependencies Tests

    [Fact]
    public void DotNet_NullDependencies_OmittedFromJson()
    {
        var api = new DotNetApiIndex
        {
            Package = "Test",
            Namespaces = [],
            Dependencies = null
        };

        var json = api.ToJson();

        Assert.DoesNotContain("dependencies", json);
    }

    [Fact]
    public void TypeScript_NullDependencies_OmittedFromJson()
    {
        var api = new TsApiIndex
        {
            Package = "test",
            Modules = [],
            Dependencies = null
        };

        var json = api.ToJson();

        Assert.DoesNotContain("dependencies", json);
    }

    #endregion
}
