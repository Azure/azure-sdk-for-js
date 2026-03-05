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
using GoFuncApi = PublicApiGraphEngine.Go.FuncApi;
using GoPackageApi = PublicApiGraphEngine.Go.PackageApi;
using GoStructApi = PublicApiGraphEngine.Go.StructApi;
using JavaApiIndex = PublicApiGraphEngine.Java.ApiIndex;
using JavaClassInfo = PublicApiGraphEngine.Java.ClassInfo;
using JavaMethodInfo = PublicApiGraphEngine.Java.MethodInfo;
using JavaPackageInfo = PublicApiGraphEngine.Java.PackageInfo;
using PyApiIndex = PublicApiGraphEngine.Python.ApiIndex;
using PyClassInfo = PublicApiGraphEngine.Python.ClassInfo;
using PyModuleInfo = PublicApiGraphEngine.Python.ModuleInfo;
using TsApiIndex = PublicApiGraphEngine.TypeScript.ApiIndex;
using TsClassInfo = PublicApiGraphEngine.TypeScript.ClassInfo;
using TsDependencyInfo = PublicApiGraphEngine.TypeScript.DependencyInfo;
using TsFunctionInfo = PublicApiGraphEngine.TypeScript.FunctionInfo;
using TsInterfaceInfo = PublicApiGraphEngine.TypeScript.InterfaceInfo;
using TsModuleInfo = PublicApiGraphEngine.TypeScript.ModuleInfo;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests that stdlib and builtin types are correctly excluded from dependencies
/// by the dynamic detection logic in each language engine.
/// .NET: Roslyn assembly metadata
/// TypeScript: ts-morph type resolution
/// Go: go/types.Universe + GOROOT/src scan
/// Java: ModuleLayer.boot() + JRT filesystem
/// Python: sys.stdlib_module_names
/// </summary>
public class StdlibDetectionTests
{
    private static readonly string TestFixturesBase = Path.Combine(AppContext.BaseDirectory, "TestFixtures");

    // =========================================================================
    // Go — Integration Tests
    // =========================================================================

    /// <summary>
    /// The Go test fixture imports context and time (stdlib packages).
    /// The engine now tracks stdlib packages in dependencies since they
    /// are important type references in the public API surface (e.g., context.Context
    /// parameters, io.Writer returns). Verify they ARE included.
    /// </summary>
    [Fact]
    public async Task Go_Extract_StdlibPackages_IncludedInDependencies()
    {
        var engine = new GoPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "Go not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "Go"));

        Assert.NotNull(api);

        // The fixture uses context.Context and time.Time — both stdlib.
        // They should appear in dependencies since they're part of the public API surface.
        Assert.NotNull(api.Dependencies);
        Assert.True(api.Dependencies.Count > 0, "Expected dependencies to be non-empty");

        var depPackages = api.Dependencies.Select(d => d.Package).ToList();
        Assert.Contains("context", depPackages);

        // Stdlib deps should be flagged as IsStdlib
        var stdlibDeps = api.Dependencies.Where(d => d.Package == "context").ToList();
        Assert.All(stdlibDeps, d => Assert.True(d.IsStdlib, $"Expected {d.Package} to be marked as stdlib"));
    }

    // =========================================================================
    // Go — Unit Tests (in-memory, no runtime needed)
    // =========================================================================

    [Theory]
    [InlineData("context.Context")]
    [InlineData("time.Time")]
    [InlineData("time.Duration")]
    [InlineData("io.Reader")]
    [InlineData("io.Writer")]
    [InlineData("net.Conn")]
    [InlineData("http.Request")]
    [InlineData("os.File")]
    [InlineData("sync.Mutex")]
    [InlineData("fmt.Stringer")]
    public void Go_StdlibQualifiedTypes_ExcludedFromStubs(string stdlibType)
    {
        // A method returning a stdlib-qualified type should not create a
        // "Dependency Types" section in the stubs output.
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
                                new GoFuncApi { Name = "Do", Sig = "ctx context.Context", Ret = stdlibType }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        // The stdlib package alias (e.g., "time" from "time.Time") must not appear
        // as a dependency header "// From: time"
        var pkgAlias = stdlibType.Split('.')[0];
        Assert.DoesNotContain($"// From: {pkgAlias}", stubs);
    }

    [Theory]
    [InlineData("bool")]
    [InlineData("int")]
    [InlineData("int64")]
    [InlineData("float64")]
    [InlineData("string")]
    [InlineData("error")]
    [InlineData("any")]
    [InlineData("byte")]
    [InlineData("rune")]
    [InlineData("uint")]
    [InlineData("uintptr")]
    [InlineData("complex128")]
    public void Go_BuiltinPrimitives_ExcludedFromStubs(string builtinType)
    {
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
                                new GoFuncApi { Name = "Do", Ret = builtinType }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Fact]
    public void Go_ExternalPackage_IncludedInStubs()
    {
        // Verify that non-stdlib packages DO appear in dependencies.
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
                        new GoStructApi { Name = "Client" }
                    ]
                }
            ],
            Dependencies =
            [
                new Go.DependencyInfo
                {
                    Package = "github.com/example/sdk-for-go/sdk/azcore",
                    Structs = [new GoStructApi { Name = "Policy" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("azcore", stubs);
    }

    [Fact]
    public void Go_StdlibDependency_ExcludedFromStubs()
    {
        // Stdlib deps with IsStdlib=true should be filtered by the formatter
        var api = new GoApiIndex
        {
            Package = "test",
            Packages =
            [
                new GoPackageApi
                {
                    Name = "test",
                    Structs = [new GoStructApi { Name = "Client" }]
                }
            ],
            Dependencies =
            [
                new Go.DependencyInfo
                {
                    Package = "context",
                    IsStdlib = true,
                    Interfaces = [new Go.IfaceApi { Name = "Context" }]
                },
                new Go.DependencyInfo
                {
                    Package = "github.com/example/sdk-for-go/sdk/azcore",
                    Structs = [new GoStructApi { Name = "Policy" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        // Stdlib dep should be filtered from output
        Assert.DoesNotContain("// From: context", stubs);
        // External dep should remain
        Assert.Contains("// From: github.com/example/sdk-for-go/sdk/azcore", stubs);
    }

    // =========================================================================
    // Java — Integration Tests
    // =========================================================================

    /// <summary>
    /// The Java test fixture imports java.time, java.util, and java.util.concurrent.
    /// Stdlib packages are now included in dependencies but marked with IsStdlib=true.
    /// </summary>
    [Fact]
    public async Task Java_Extract_StdlibPackages_IncludedInDependencies()
    {
        var engine = new JavaPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "Java not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "Java"));

        Assert.NotNull(api);

        // Stdlib packages should be in dependencies, marked with IsStdlib=true
        if (api.Dependencies is { Count: > 0 })
        {
            var stdlibDeps = api.Dependencies
                .Where(d => d.Package.StartsWith("java.", StringComparison.Ordinal) ||
                            d.Package.StartsWith("javax.", StringComparison.Ordinal) ||
                            d.Package.StartsWith("jdk.", StringComparison.Ordinal))
                .ToList();

            foreach (var dep in stdlibDeps)
            {
                Assert.True(dep.IsStdlib, $"Expected {dep.Package} to be marked as stdlib");
            }
        }
    }

    // =========================================================================
    // Java — Unit Tests (in-memory, no runtime needed)
    // =========================================================================

    [Theory]
    [InlineData("String")]
    [InlineData("Integer")]
    [InlineData("Long")]
    [InlineData("Boolean")]
    [InlineData("Object")]
    [InlineData("List")]
    [InlineData("Map")]
    [InlineData("Set")]
    [InlineData("Optional")]
    [InlineData("CompletableFuture")]
    [InlineData("InputStream")]
    [InlineData("OutputStream")]
    [InlineData("Throwable")]
    [InlineData("Exception")]
    [InlineData("Iterable")]
    [InlineData("Iterator")]
    public void Java_BuiltinSimpleNames_ExcludedFromStubs(string builtinType)
    {
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
                                new JavaMethodInfo { Name = "doWork", Ret = builtinType }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        // Builtin-only return types should not produce a dependency section
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Theory]
    [InlineData("Map<String, List<Integer>>")]
    [InlineData("CompletableFuture<Void>")]
    [InlineData("Optional<String>")]
    [InlineData("List<Map<String, Object>>")]
    public void Java_GenericBuiltinCombinations_ExcludedFromStubs(string genericType)
    {
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
                                new JavaMethodInfo { Name = "getData", Ret = genericType }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Theory]
    [InlineData("int")]
    [InlineData("long")]
    [InlineData("double")]
    [InlineData("boolean")]
    [InlineData("char")]
    [InlineData("byte")]
    [InlineData("float")]
    [InlineData("short")]
    [InlineData("void")]
    public void Java_Primitives_ExcludedFromStubs(string primitive)
    {
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
                                new JavaMethodInfo { Name = "compute", Ret = primitive }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Fact]
    public void Java_ExternalPackage_IncludedInStubs()
    {
        var api = new JavaApiIndex
        {
            Package = "test",
            Packages =
            [
                new JavaPackageInfo
                {
                    Name = "test",
                    Classes = [new JavaClassInfo { Name = "Client" }]
                }
            ],
            Dependencies =
            [
                new Java.DependencyInfo
                {
                    Package = "com.example.core",
                    Classes = [new JavaClassInfo { Name = "HttpPipeline" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("com.example.core", stubs);
    }

    [Fact]
    public void Java_StdlibDependency_ExcludedFromStubs()
    {
        var api = new JavaApiIndex
        {
            Package = "test",
            Packages =
            [
                new JavaPackageInfo
                {
                    Name = "test",
                    Classes = [new JavaClassInfo { Name = "Client" }]
                }
            ],
            Dependencies =
            [
                new Java.DependencyInfo
                {
                    Package = "java.util",
                    IsStdlib = true,
                    Classes = [new JavaClassInfo { Name = "List" }]
                },
                new Java.DependencyInfo
                {
                    Package = "com.example.core",
                    Classes = [new JavaClassInfo { Name = "HttpPipeline" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.DoesNotContain("// From: java.util", stubs);
        Assert.Contains("// From: com.example.core", stubs);
    }

    // =========================================================================
    // Python — Integration Tests
    // =========================================================================

    /// <summary>
    /// The Python test fixture imports typing, datetime, enum, and dataclasses.
    /// Verify these don't appear in graphed dependencies.
    /// </summary>
    [Fact]
    public async Task Python_Extract_StdlibPackages_NotInDependencies()
    {
        var engine = new PythonPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "Python not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "Python"));

        Assert.NotNull(api);

        if (api.Dependencies is { Count: > 0 })
        {
            var depPackages = api.Dependencies.Select(d => d.Package).ToList();
            // These are all stdlib packages — must not be in dependencies
            Assert.DoesNotContain("typing", depPackages);
            Assert.DoesNotContain("datetime", depPackages);
            Assert.DoesNotContain("enum", depPackages);
            Assert.DoesNotContain("dataclasses", depPackages);
            Assert.DoesNotContain("collections", depPackages);
            Assert.DoesNotContain("abc", depPackages);
            Assert.DoesNotContain("os", depPackages);
            Assert.DoesNotContain("sys", depPackages);
            Assert.DoesNotContain("json", depPackages);
            Assert.DoesNotContain("io", depPackages);
        }
    }

    // =========================================================================
    // Python — Unit Tests (in-memory, no runtime needed)
    // =========================================================================

    [Fact]
    public void Python_StdlibModules_NotInFormattedStubs()
    {
        // Create an API that references only stdlib-qualified types
        var api = new PyApiIndex(
            Package: "test-pkg",
            Modules:
            [
                new PyModuleInfo("client",
                    [
                        new PyClassInfo
                        {
                            Name = "Client",
                            Methods =
                            [
                                new Python.MethodInfo("get", "(self)", null, null, null, null, "Optional[str]"),
                                new Python.MethodInfo("list", "(self)", null, null, null, null, "List[Dict[str, Any]]"),
                                new Python.MethodInfo("created_at", "(self)", null, null, null, null, "datetime.datetime")
                            ]
                        }
                    ],
                    null)
            ]
        );

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Fact]
    public void Python_ExternalPackage_IncludedInStubs()
    {
        var api = new PyApiIndex(
            Package: "test-pkg",
            Modules:
            [
                new PyModuleInfo("client",
                    [new PyClassInfo { Name = "Client" }],
                    null)
            ],
            Dependencies:
            [
                new Python.DependencyInfo
                {
                    Package = "example-core",
                    Classes = [new PyClassInfo { Name = "PipelinePolicy" }]
                }
            ]
        );

        var stubs = api.ToStubs();
        Assert.Contains("Dependency Types", stubs);
        Assert.Contains("example-core", stubs);
    }

    [Fact]
    public void Python_StdlibDependency_ExcludedFromStubs()
    {
        var api = new PyApiIndex(
            Package: "test-pkg",
            Modules:
            [
                new PyModuleInfo("client",
                    [new PyClassInfo { Name = "Client" }],
                    null)
            ],
            Dependencies:
            [
                new Python.DependencyInfo
                {
                    Package = "os",
                    IsStdlib = true,
                    Classes = [new PyClassInfo { Name = "PathLike" }]
                },
                new Python.DependencyInfo
                {
                    Package = "example-core",
                    Classes = [new PyClassInfo { Name = "PipelinePolicy" }]
                }
            ]
        );

        var stubs = api.ToStubs();
        Assert.DoesNotContain("# From: os", stubs);
        Assert.Contains("# From: example-core", stubs);
    }

    // =========================================================================
    // .NET — Integration Tests
    // =========================================================================

    /// <summary>
    /// The .NET test fixture uses Task, CancellationToken, string, IAsyncEnumerable, etc.
    /// System types are now included in dependencies but marked with IsStdlib=true.
    /// </summary>
    [Fact]
    public async Task DotNet_Extract_StdlibTypes_IncludedInDependencies()
    {
        var engine = new CSharpPublicApiGraphEngine();
        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "DotNet"));

        Assert.NotNull(api);

        // System types should be in dependencies, marked with IsStdlib=true
        if (api.Dependencies is { Count: > 0 })
        {
            var systemDeps = api.Dependencies
                .Where(d => d.Package.StartsWith("System", StringComparison.Ordinal) ||
                            d.Package.StartsWith("Microsoft.Extensions", StringComparison.Ordinal))
                .ToList();

            foreach (var dep in systemDeps)
            {
                Assert.True(dep.IsStdlib, $"Expected {dep.Package} to be marked as stdlib");
            }
        }
    }

    // =========================================================================
    // .NET — Unit Tests (in-memory, no runtime needed)
    // =========================================================================

    [Theory]
    [InlineData("Task<string> GetAsync(CancellationToken ct)")]
    [InlineData("IAsyncEnumerable<int> ListAsync()")]
    [InlineData("ValueTask<bool> TryGetAsync(string id)")]
    [InlineData("Dictionary<string, List<int>> GetAll()")]
    [InlineData("IReadOnlyList<string> GetNames()")]
    [InlineData("Action<EventArgs> Handler { get; }")]
    [InlineData("Func<string, Task<bool>> Predicate { get; }")]
    [InlineData("Memory<byte> GetBuffer()")]
    [InlineData("ReadOnlySpan<char> GetSpan()")]
    [InlineData("DateTimeOffset CreatedAt { get; }")]
    [InlineData("TimeSpan Timeout { get; }")]
    [InlineData("Uri Endpoint { get; }")]
    [InlineData("Guid Id { get; }")]
    [InlineData("Stream Content { get; }")]
    public void DotNet_BuiltinSignatures_ExcludedFromStubs(string signature)
    {
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
                            Members = [new DotNetMemberInfo { Name = "Member", Kind = "method", Signature = signature }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("// From: System", stubs);
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Theory]
    [InlineData("string")]
    [InlineData("int")]
    [InlineData("bool")]
    [InlineData("long")]
    [InlineData("double")]
    [InlineData("float")]
    [InlineData("decimal")]
    [InlineData("byte")]
    [InlineData("char")]
    [InlineData("object")]
    [InlineData("void")]
    public void DotNet_PrimitiveAliases_ExcludedFromStubs(string primitive)
    {
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
                            Members = [new DotNetMemberInfo { Name = "Get", Kind = "method", Signature = $"{primitive} Get()" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependency Types", stubs);
    }

    [Fact]
    public void DotNet_ExternalPackage_IncludedInStubs()
    {
        var api = new DotNetApiIndex
        {
            Package = "Test",
            Namespaces =
            [
                new DotNetNamespaceInfo
                {
                    Name = "Test",
                    Types = [new DotNetTypeInfo { Name = "Client", Kind = "class" }]
                }
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
    }

    [Fact]
    public void DotNet_StdlibDependency_ExcludedFromStubs()
    {
        var api = new DotNetApiIndex
        {
            Package = "Test",
            Namespaces =
            [
                new DotNetNamespaceInfo
                {
                    Name = "Test",
                    Types = [new DotNetTypeInfo { Name = "Client", Kind = "class" }]
                }
            ],
            Dependencies =
            [
                new DotNetDependencyInfo
                {
                    Package = "System.Runtime",
                    IsStdlib = true,
                    Types = [new DotNetTypeInfo { Name = "Task", Kind = "class" }]
                },
                new DotNetDependencyInfo
                {
                    Package = "Example.Core",
                    Types = [new DotNetTypeInfo { Name = "Response", Kind = "class" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.DoesNotContain("// From: System.Runtime", stubs);
        Assert.Contains("// From: Example.Core", stubs);
    }

    // =========================================================================
    // TypeScript — Integration Tests
    // =========================================================================

    /// <summary>
    /// The TypeScript test fixture uses Promise, string, number, Record, etc.
    /// Verify these built-in types don't appear as external dependencies.
    /// </summary>
    [Fact]
    public async Task TypeScript_Extract_BuiltinTypes_NotInDependencies()
    {
        var engine = new TypeScriptPublicApiGraphEngine();
        if (!engine.IsAvailable()) Assert.Skip(engine.UnavailableReason ?? "TypeScript not available");

        var api = await engine.GraphAsync(Path.Combine(TestFixturesBase, "TypeScript"));

        Assert.NotNull(api);

        if (api.Dependencies is { Count: > 0 })
        {
            var depPackages = api.Dependencies.Select(d => d.Package).ToList();
            // Built-in globals must not be listed as dependencies
            Assert.DoesNotContain("Promise", depPackages);
            Assert.DoesNotContain("Record", depPackages);
            Assert.DoesNotContain("Map", depPackages);
            Assert.DoesNotContain("Set", depPackages);
            Assert.DoesNotContain("Array", depPackages);
            Assert.DoesNotContain("Error", depPackages);
        }
    }

    // =========================================================================
    // TypeScript — Unit Tests (in-memory, no runtime needed)
    // =========================================================================

    [Theory]
    [InlineData("(id: string) => Promise<void>")]
    [InlineData("(ids: string[]) => Promise<Record<string, number>>")]
    [InlineData("(items: Array<string>) => Map<string, number>")]
    [InlineData("(data: Uint8Array) => ArrayBuffer")]
    [InlineData("(signal: AbortSignal) => Promise<boolean>")]
    [InlineData("() => AsyncIterable<string>")]
    [InlineData("(err: Error) => void")]
    [InlineData("() => Date")]
    [InlineData("() => RegExp")]
    [InlineData("() => Set<string>")]
    public void TypeScript_BuiltinSignatures_ExcludedFromStubs(string signature)
    {
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
                        new TsFunctionInfo { Name = "doWork", ExportPath = ".", Sig = signature }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependencies", stubs);
    }

    [Theory]
    [InlineData("string")]
    [InlineData("number")]
    [InlineData("boolean")]
    [InlineData("void")]
    [InlineData("undefined")]
    [InlineData("null")]
    [InlineData("any")]
    [InlineData("unknown")]
    [InlineData("never")]
    [InlineData("bigint")]
    [InlineData("symbol")]
    [InlineData("object")]
    public void TypeScript_PrimitiveTypes_ExcludedFromStubs(string primitive)
    {
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
                        new TsFunctionInfo { Name = "get", ExportPath = ".", Sig = $"() => {primitive}" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.NotNull(stubs);
        Assert.DoesNotContain("Dependencies", stubs);
    }

    [Fact]
    public void TypeScript_ExternalPackage_IncludedInStubs()
    {
        var api = new TsApiIndex
        {
            Package = "test",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "test",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@example/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "PipelinePolicy" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        Assert.Contains("Dependencies", stubs);
        Assert.Contains("@example/core-rest-pipeline", stubs);
    }

    [Fact]
    public void TypeScript_StdlibDependency_ExcludedFromStubs()
    {
        var api = new TsApiIndex
        {
            Package = "test",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "test",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@types/node",
                    IsNode = true,
                    Interfaces = [new TsInterfaceInfo { Name = "IncomingMessage" }]
                },
                new TsDependencyInfo
                {
                    Package = "@example/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "PipelinePolicy" }]
                }
            ]
        };

        var stubs = api.ToStubs();
        // @types/node types should appear as import references, not declare module blocks
        Assert.Contains("import { IncomingMessage } from \"@types/node\"", stubs);
        Assert.DoesNotContain("declare module \"@types/node\"", stubs);
        Assert.Contains("@example/core-rest-pipeline", stubs);
    }
}
