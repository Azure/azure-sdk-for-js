// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.DotNet;
using System.Text.Json;
using Xunit;

using GoModels = PublicApiGraphEngine.Go;
using JavaModels = PublicApiGraphEngine.Java;
using PyModels = PublicApiGraphEngine.Python;
using TsModels = PublicApiGraphEngine.TypeScript;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for PublicApiGraphEngine model immutability - verifies IReadOnlyList usage,
/// sealed records, and thread-safe serialization.
/// </summary>
public class ApiModelImmutabilityTests
{
    [Fact]
    public void DotNetApiIndex_Namespaces_IsIReadOnlyList()
    {
        // Arrange
        var index = new ApiIndex
        {
            Package = "Test.Package",
            Namespaces = [new NamespaceInfo { Name = "Test" }]
        };

        // Assert - verify it's IReadOnlyList (cannot cast to List and mutate)
        Assert.IsAssignableFrom<IReadOnlyList<NamespaceInfo>>(index.Namespaces);
    }

    [Fact]
    public void DotNetNamespaceInfo_Types_IsIReadOnlyList()
    {
        var ns = new NamespaceInfo
        {
            Name = "Test.Namespace",
            Types = [new TypeInfo { Name = "TestClass", Kind = "class" }]
        };

        Assert.IsAssignableFrom<IReadOnlyList<TypeInfo>>(ns.Types);
    }

    [Fact]
    public void DotNetTypeInfo_Members_IsIReadOnlyList()
    {
        var type = new TypeInfo
        {
            Name = "TestClass",
            Kind = "class",
            Members = [new MemberInfo { Name = "Method1", Kind = "method", Signature = "void Method1()" }],
            Interfaces = ["IDisposable"],
            Values = ["Value1", "Value2"]
        };

        Assert.IsAssignableFrom<IReadOnlyList<MemberInfo>>(type.Members);
        Assert.IsAssignableFrom<IReadOnlyList<string>>(type.Interfaces);
        Assert.IsAssignableFrom<IReadOnlyList<string>>(type.Values);
    }

    [Fact]
    public void DotNetApiIndex_CanBeCreatedWithArrayInitializer()
    {
        // Verify collection expressions work with IReadOnlyList
        var index = new ApiIndex
        {
            Package = "Test",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "NS1",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "Class1",
                            Kind = "class",
                            Members =
                            [
                                new MemberInfo { Name = "M1", Kind = "method", Signature = "void M1()" }
                            ]
                        }
                    ]
                }
            ]
        };

        Assert.Single(index.Namespaces);
        Assert.Single(index.Namespaces[0].Types);
        Assert.Single(index.Namespaces[0].Types[0].Members!);
    }

    [Fact]
    public void DotNetApiIndex_EmptyCollections_Work()
    {
        var index = new ApiIndex
        {
            Package = "Empty",
            Namespaces = []
        };

        Assert.Empty(index.Namespaces);
    }

    [Fact]
    public void DotNetTypeInfo_GetAllTypes_WorksWithIReadOnlyList()
    {
        var index = new ApiIndex
        {
            Package = "Test",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "NS1",
                    Types = [new TypeInfo { Name = "T1", Kind = "class" }]
                },
                new NamespaceInfo
                {
                    Name = "NS2",
                    Types = [new TypeInfo { Name = "T2", Kind = "interface" }]
                }
            ]
        };

        var allTypes = index.GetAllTypes().ToList();

        Assert.Equal(2, allTypes.Count);
        Assert.Contains(allTypes, t => t.Name == "T1");
        Assert.Contains(allTypes, t => t.Name == "T2");
    }

    [Fact]
    public void DotNetTypeInfo_GetClientTypes_WorksWithIReadOnlyList()
    {
        var index = new ApiIndex
        {
            Package = "Test",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "NS1",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "TestClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members = [new MemberInfo { Name = "DoSomething", Kind = "method", Signature = "Task DoSomething()" }]
                        },
                        new TypeInfo { Name = "TestModel", Kind = "class" }
                    ]
                }
            ]
        };

        var clients = index.GetClientTypes().ToList();

        Assert.Single(clients);
        Assert.Equal("TestClient", clients[0].Name);
    }

    #region Sealed Record Tests

    [Fact]
    public void Go_Records_AreSealed()
    {
        Assert.True(typeof(GoModels.IfaceApi).IsSealed);
        Assert.True(typeof(GoModels.FuncApi).IsSealed);
        Assert.True(typeof(GoModels.FieldApi).IsSealed);
        Assert.True(typeof(GoModels.TypeApi).IsSealed);
        Assert.True(typeof(GoModels.ConstApi).IsSealed);
        Assert.True(typeof(GoModels.VarApi).IsSealed);
    }

    [Fact]
    public void Java_Records_AreSealed()
    {
        Assert.True(typeof(JavaModels.EnumInfo).IsSealed);
        Assert.True(typeof(JavaModels.MethodInfo).IsSealed);
        Assert.True(typeof(JavaModels.FieldInfo).IsSealed);
    }

    [Fact]
    public void TypeScript_Records_AreSealed()
    {
        Assert.True(typeof(TsModels.InterfaceInfo).IsSealed);
        Assert.True(typeof(TsModels.EnumInfo).IsSealed);
        Assert.True(typeof(TsModels.TypeAliasInfo).IsSealed);
        Assert.True(typeof(TsModels.FunctionInfo).IsSealed);
        Assert.True(typeof(TsModels.MethodInfo).IsSealed);
        Assert.True(typeof(TsModels.PropertyInfo).IsSealed);
        Assert.True(typeof(TsModels.ConstructorInfo).IsSealed);
    }

    #endregion

    #region Thread-Safe Indented JSON Tests

    [Fact]
    public async Task DotNet_IndentedJson_ThreadSafe()
    {
        var api = new ApiIndex { Package = "Test" };

        var tasks = Enumerable.Range(0, 10).Select(_ => Task.Run(() =>
            api.ToJson(pretty: true)
        )).ToArray();

        await Task.WhenAll(tasks);

        var results = tasks.Select(t => t.Result).Distinct().ToList();
        Assert.Single(results);
        Assert.Contains("Test", results[0]);
    }

    [Fact]
    public async Task Java_IndentedJson_ThreadSafe()
    {
        var api = new JavaModels.ApiIndex { Package = "com.test" };

        var tasks = Enumerable.Range(0, 10).Select(_ => Task.Run(() =>
            api.ToJson(pretty: true)
        )).ToArray();

        await Task.WhenAll(tasks);

        var results = tasks.Select(t => t.Result).Distinct().ToList();
        Assert.Single(results);
        Assert.Contains("com.test", results[0]);
    }

    [Fact]
    public async Task Go_IndentedJson_ThreadSafe()
    {
        var api = new GoModels.ApiIndex { Package = "testpkg" };

        var tasks = Enumerable.Range(0, 10).Select(_ => Task.Run(() =>
            api.ToJson(pretty: true)
        )).ToArray();

        await Task.WhenAll(tasks);

        var results = tasks.Select(t => t.Result).Distinct().ToList();
        Assert.Single(results);
        Assert.Contains("testpkg", results[0]);
    }

    [Fact]
    public async Task TypeScript_IndentedJson_ThreadSafe()
    {
        var api = new TsModels.ApiIndex { Package = "@test/pkg" };

        var tasks = Enumerable.Range(0, 10).Select(_ => Task.Run(() =>
            api.ToJson(pretty: true)
        )).ToArray();

        await Task.WhenAll(tasks);

        var results = tasks.Select(t => t.Result).Distinct().ToList();
        Assert.Single(results);
        Assert.Contains("@test/pkg", results[0]);
    }

    #endregion

    #region Java Model — Kind and Annotation Support

    [Fact]
    public void Java_ClassInfo_HasKindProperty()
    {
        var cls = new JavaModels.ClassInfo { Name = "Foo", Kind = "class" };
        Assert.Equal("class", cls.Kind);

        var record = new JavaModels.ClassInfo { Name = "Bar", Kind = "record" };
        Assert.Equal("record", record.Kind);

        var annotation = new JavaModels.ClassInfo { Name = "Baz", Kind = "annotation" };
        Assert.Equal("annotation", annotation.Kind);
    }

    [Fact]
    public void Java_ClassInfo_EntryPoint_SetsIsClientType()
    {
        var classInfo = new JavaModels.ClassInfo
        {
            Name = "ServiceClient",
            EntryPoint = true,
            Methods = [new JavaModels.MethodInfo { Name = "list", Sig = "()", Ret = "void" }]
        };

        Assert.True(classInfo.EntryPoint);
        Assert.True(classInfo.IsClientType);
    }

    [Fact]
    public void Java_ClassInfo_NonEntryPoint_HasNoEntryPointFlag()
    {
        var classInfo = new JavaModels.ClassInfo
        {
            Name = "SomeModel",
            Methods = [new JavaModels.MethodInfo { Name = "get", Sig = "()", Ret = "String" }]
        };

        Assert.Null(classInfo.EntryPoint);
        Assert.False(classInfo.IsClientType);
    }

    [Fact]
    public void Java_RecordKind_IsSupported()
    {
        var record = new JavaModels.ClassInfo
        {
            Name = "Point",
            Kind = "record",
            Fields =
            [
                new JavaModels.FieldInfo { Name = "x", Type = "int" },
                new JavaModels.FieldInfo { Name = "y", Type = "int" }
            ]
        };

        Assert.Equal("record", record.Kind);
        Assert.Equal(2, record.Fields!.Count);
    }

    [Fact]
    public void Java_AnnotationKind_IsSupported()
    {
        var annotation = new JavaModels.ClassInfo
        {
            Name = "MyAnnotation",
            Kind = "annotation"
        };

        Assert.Equal("annotation", annotation.Kind);
    }

    #endregion

    #region Go Model — TypeParams

    [Fact]
    public void Go_TypeParams_DefaultsToNull()
    {
        var structApi = new GoModels.StructApi { Name = "Simple" };
        Assert.Null(structApi.TypeParams);

        var funcApi = new GoModels.FuncApi { Name = "DoThing" };
        Assert.Null(funcApi.TypeParams);
    }

    [Fact]
    public void Go_StructApi_TypeParams_RoundtripsViaJson()
    {
        var original = new GoModels.StructApi
        {
            Name = "Set",
            TypeParams = ["T comparable"]
        };

        var json = JsonSerializer.Serialize(original);
        Assert.Contains("\"typeParams\"", json);
        Assert.Contains("T comparable", json);
    }

    [Fact]
    public void Go_FuncApi_TypeParams_SerializesCorrectly()
    {
        var func = new GoModels.FuncApi
        {
            Name = "Transform",
            TypeParams = ["T", "U"],
            Sig = "input T",
            Ret = "U"
        };

        var json = JsonSerializer.Serialize(func);
        Assert.Contains("\"typeParams\"", json);
        Assert.Contains("\"T\"", json);
        Assert.Contains("\"U\"", json);
    }

    [Fact]
    public void Go_StructApi_TypeParams_OmittedWhenNull()
    {
        var structApi = new GoModels.StructApi { Name = "Simple" };
        var json = JsonSerializer.Serialize(structApi);
        Assert.DoesNotContain("typeParams", json);
    }

    #endregion

    #region Python Model — Case-Sensitive Names

    [Fact]
    public void Python_CaseSensitiveNames()
    {
        var api = new PyModels.ApiIndex("test-sdk",
        [
            new PyModels.ModuleInfo("mod",
            [
                new PyModels.ClassInfo
                {
                    Name = "MyClient",
                    EntryPoint = true,
                    Methods =
                    [
                        new PyModels.MethodInfo("get_data", "self", null, false, null, null, "Data")
                    ]
                },
                new PyModels.ClassInfo
                {
                    Name = "myclient",
                    Methods =
                    [
                        new PyModels.MethodInfo("other", "self", null, false, null, null, null)
                    ]
                }
            ], null)
        ]);

        var allClasses = api.GetAllClasses().ToList();
        Assert.Equal(2, allClasses.Count);
        var clients = api.GetClientClasses().ToList();
        Assert.Single(clients);
        Assert.Equal("MyClient", clients[0].Name);
    }

    #endregion

    #region TypeScript Model — InterfaceInfo EntryPoint

    [Fact]
    public void TypeScript_InterfaceInfo_HasEntryPoint()
    {
        var iface = new TsModels.InterfaceInfo
        {
            Name = "TestInterface",
            EntryPoint = true,
            Methods =
            [
                new TsModels.MethodInfo { Name = "doWork", Sig = "()" }
            ]
        };

        Assert.True(iface.EntryPoint);
    }

    [Fact]
    public void TypeScript_InterfaceInfo_IsClientType()
    {
        var iface = new TsModels.InterfaceInfo
        {
            Name = "ServiceClient",
            EntryPoint = true,
            Methods =
            [
                new TsModels.MethodInfo { Name = "listResources", Sig = "()" }
            ]
        };

        Assert.True(iface.EntryPoint);
        Assert.True(iface.Methods?.Any());
    }

    [Fact]
    public void TypeScript_InterfaceInfo_WithoutEntryPoint_IsNotClient()
    {
        var iface = new TsModels.InterfaceInfo
        {
            Name = "Options",
            Properties =
            [
                new TsModels.PropertyInfo { Name = "timeout", Type = "number" }
            ]
        };

        Assert.Null(iface.EntryPoint);
    }

    #endregion

    #region Fix #17: Go global state eliminated

    [Fact]
    public void Go_GraphApi_NoGlobalMutableState()
    {
        // Verify the Go engine script no longer uses module-level mutable variables
        // for typeCollector and importMap. They should only exist as fields in the
        // engineContext struct.
        var goScript = Path.Combine(
            AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "..",
            "src", "PublicApiGraphEngine.Go", "graph_api.go");

        if (!File.Exists(goScript))
        {
            // Fall back to workspace-relative path for CI environments
            goScript = Path.GetFullPath(Path.Combine(
                Directory.GetCurrentDirectory(), "..", "..", "..", "..", "..",
                "src", "PublicApiGraphEngine.Go", "graph_api.go"));
        }

        Assert.True(File.Exists(goScript), $"Go script not found: {goScript}");

        var lines = File.ReadAllLines(goScript);

        // There should be no "var typeCollector =" or "var importMap =" at global scope.
        // The only appearances should be as struct fields or inside newEngineContext().
        var globalVarLines = lines
            .Select((line, idx) => (line: line.Trim(), idx))
            .Where(x => x.line.StartsWith("var typeCollector ", StringComparison.Ordinal)
                     || x.line.StartsWith("var importMap ", StringComparison.Ordinal))
            .ToList();

        Assert.Empty(globalVarLines);

        // Verify engineContext struct exists
        Assert.Contains(lines, l => l.Contains("type engineContext struct"));

        // Verify newEngineContext function exists
        Assert.Contains(lines, l => l.Contains("func newEngineContext("));
    }

    #endregion
}
