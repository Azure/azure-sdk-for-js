// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Go;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class ApiDiagnosticsPostProcessorTests
{
    [Fact]
    public void Build_EmitsSdk001_ForUndocumentedTypes()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs = [new StructApi { Name = "Client" }],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.Contains(diagnostics, d => d.Id == "SDK001" && d.Level == DiagnosticLevel.Info);
    }

    [Fact]
    public void Build_EmitsSdk003_WhenMethodUsesDeprecatedType()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs =
                    [
                        new StructApi
                        {
                            Name = "OldOptions",
                            Doc = "deprecated type",
                            IsDeprecated = true,
                        },
                        new StructApi
                        {
                            Name = "Client",
                            Doc = "client doc",
                            Methods =
                            [
                                new FuncApi
                                {
                                    Name = "Create",
                                    Params = [new ParameterInfo { Name = "options", Type = "OldOptions" }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.Contains(diagnostics, d => d.Id == "SDK003" && d.Level == DiagnosticLevel.Warning);
    }

    [Fact]
    public void Build_SkipsSdk001_ForDocumentedTypes()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs = [new StructApi { Name = "Client", Doc = "A documented type." }],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.DoesNotContain(diagnostics, d => d.Id == "SDK001");
    }

    [Fact]
    public void Build_MergesUpstreamDiagnostics()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages = [new PackageApi { Name = "contoso" }],
        };

        var upstream = new List<ApiDiagnostic>
        {
            new() { Id = "EXT001", Text = "external warning", Level = DiagnosticLevel.Warning },
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index, upstream);

        Assert.Contains(diagnostics, d => d.Id == "EXT001");
    }

    [Fact]
    public void Build_DeduplicatesDiagnostics()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs = [new StructApi { Name = "Client" }],
                },
            ],
            Diagnostics =
            [
                new ApiDiagnostic
                {
                    Id = "SDK001",
                    Text = "Public type 'Client' is missing documentation.",
                    Level = DiagnosticLevel.Info,
                    TargetType = "Client",
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        // Should not have duplicates of SDK001 for Client
        Assert.Single(diagnostics, d => d.Id == "SDK001" && d.TargetType == "Client");
    }

    [Fact]
    public void Build_EmitsSdk003_ForQualifiedTypeName()
    {
        // Tests the dot-splitting path: deprecated type "pkg.OldOptions" should match param "pkg.OldOptions"
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs =
                    [
                        new StructApi
                        {
                            Name = "OldOpts",
                            Id = "pkg.OldOpts",
                            Doc = "old type",
                            IsDeprecated = true,
                        },
                        new StructApi
                        {
                            Name = "Client",
                            Doc = "client",
                            Methods =
                            [
                                new FuncApi
                                {
                                    Name = "Create",
                                    Params = [new ParameterInfo { Name = "opts", Type = "pkg.OldOpts" }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.Contains(diagnostics, d => d.Id == "SDK003" && d.Text.Contains("OldOpts"));
    }

    [Fact]
    public void Build_EmitsSdk003_ForTopLevelFunction()
    {
        // Tests the top-level callable path (e.g., Go/Python module-level functions)
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs =
                    [
                        new StructApi
                        {
                            Name = "OldConfig",
                            Doc = "deprecated config",
                            IsDeprecated = true,
                        },
                    ],
                    Functions =
                    [
                        new FuncApi
                        {
                            Name = "NewClient",
                            Params = [new ParameterInfo { Name = "cfg", Type = "OldConfig" }],
                        },
                    ],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.Contains(diagnostics, d => d.Id == "SDK003" && d.Text.Contains("NewClient"));
    }

    [Fact]
    public void Build_SkipsSdk003_WhenParamTypeNotDeprecated()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Structs =
                    [
                        new StructApi
                        {
                            Name = "Client",
                            Doc = "client",
                            Methods =
                            [
                                new FuncApi
                                {
                                    Name = "Get",
                                    Params = [new ParameterInfo { Name = "id", Type = "string" }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.DoesNotContain(diagnostics, d => d.Id == "SDK003");
    }

    [Fact]
    public void Build_HandlesEmptyIndex()
    {
        var index = new ApiIndex
        {
            Package = "empty",
            Packages = [],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        Assert.Empty(diagnostics);
    }

    [Fact]
    public void Build_HandlesInterfacesAndTypeAliases()
    {
        var index = new ApiIndex
        {
            Package = "contoso",
            Packages =
            [
                new PackageApi
                {
                    Name = "contoso",
                    Interfaces =
                    [
                        new IfaceApi { Name = "Doer", Doc = "interface doc" },
                    ],
                    Types =
                    [
                        new TypeApi { Name = "Alias", Type = "string" },
                    ],
                },
            ],
        };

        var diagnostics = ApiDiagnosticsPostProcessor.Build(index);

        // Alias has no doc → SDK001
        Assert.Contains(diagnostics, d => d.Id == "SDK001" && d.Text.Contains("Alias"));
        // Doer is documented → no SDK001 for it
        Assert.DoesNotContain(diagnostics, d => d.Id == "SDK001" && d.Text.Contains("Doer"));
    }
}

public class PythonDiagnosticsSourceTests
{
    [Fact]
    public void GetDiagnosticTypes_MapsClassesCorrectly()
    {
        var index = new Python.ApiIndex(
            Package: "test",
            Modules:
            [
                new Python.ModuleInfo("mod",
                    Classes:
                    [
                        new Python.ClassInfo
                        {
                            Name = "MyClient",
                            Id = "mod.MyClient",
                            Doc = "client doc",
                            EntryPoint = true,
                            IsDeprecated = true,
                            Methods =
                            [
                                new Python.MethodInfo
                                {
                                    Name = "get",
                                    Id = "mod.MyClient.get",
                                    Params = [new Python.ParameterInfo { Name = "id", Type = "str" }],
                                },
                            ],
                        },
                    ],
                    Functions: null),
            ]);

        var types = index.GetDiagnosticTypes().ToList();

        Assert.Single(types);
        var t = types[0];
        Assert.Equal("MyClient", t.Name);
        Assert.Equal("mod.MyClient", t.Id);
        Assert.Equal("client doc", t.Doc);
        Assert.True(t.EntryPoint);
        Assert.True(t.IsDeprecated);
        Assert.Single(t.Callables);
        Assert.Equal("get", t.Callables[0].Name);
        Assert.Equal("mod.MyClient.get", t.Callables[0].Id);
        Assert.Equal(["str"], t.Callables[0].ParameterTypes);
    }

    [Fact]
    public void GetDiagnosticTypes_FiltersNullParamTypes()
    {
        var index = new Python.ApiIndex(
            Package: "test",
            Modules:
            [
                new Python.ModuleInfo("mod",
                    Classes:
                    [
                        new Python.ClassInfo
                        {
                            Name = "Client",
                            Methods =
                            [
                                new Python.MethodInfo
                                {
                                    Name = "call",
                                    Params =
                                    [
                                        new Python.ParameterInfo { Name = "self" },
                                        new Python.ParameterInfo { Name = "x", Type = "int" },
                                    ],
                                },
                            ],
                        },
                    ],
                    Functions: null),
            ]);

        var types = index.GetDiagnosticTypes().ToList();
        var callable = types[0].Callables[0];

        // Only "int" should be included, "self" has null type
        Assert.Equal(["int"], callable.ParameterTypes);
    }

    [Fact]
    public void GetTopLevelCallables_MapsFunctionsCorrectly()
    {
        var index = new Python.ApiIndex(
            Package: "test",
            Modules:
            [
                new Python.ModuleInfo("mod",
                    Classes: null,
                    Functions:
                    [
                        new Python.FunctionInfo
                        {
                            Name = "helper",
                            Id = "mod.helper",
                            Params = [new Python.ParameterInfo { Name = "x", Type = "str" }],
                        },
                    ]),
            ]);

        var callables = index.GetTopLevelCallables().ToList();

        Assert.Single(callables);
        Assert.Equal("helper", callables[0].Name);
        Assert.Equal("mod.helper", callables[0].Id);
        Assert.Equal(["str"], callables[0].ParameterTypes);
    }

    [Fact]
    public void GetTopLevelCallables_FiltersNullParamTypes()
    {
        var index = new Python.ApiIndex(
            Package: "test",
            Modules:
            [
                new Python.ModuleInfo("mod",
                    Classes: null,
                    Functions:
                    [
                        new Python.FunctionInfo
                        {
                            Name = "f",
                            Params =
                            [
                                new Python.ParameterInfo { Name = "a" },
                                new Python.ParameterInfo { Name = "b", Type = "bool" },
                            ],
                        },
                    ]),
            ]);

        var callables = index.GetTopLevelCallables().ToList();
        Assert.Equal(["bool"], callables[0].ParameterTypes);
    }
}
