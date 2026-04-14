// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.DotNet;
using PublicApiGraphEngine.Go;
using PublicApiGraphEngine.Java;
using PublicApiGraphEngine.Python;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for the smart truncation feature across all Public API Graph Engines.
/// Ensures that priority-based truncation preserves semantic completeness.
/// </summary>
public class SmartTruncationTests
{
    #region DotNet Smart Truncation Tests

    [Fact]
    public void DotNet_TypeInfo_IsClientType_DetectsClientClasses()
    {
        var clientType = new DotNet.TypeInfo
        {
            Name = "ChatClient",
            Kind = "class",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "SendAsync", Kind = "method", Signature = "() -> Task" }]
        };

        var modelType = new DotNet.TypeInfo
        {
            Name = "ChatMessage",
            Kind = "class",
            Members = [new MemberInfo { Name = "Content", Kind = "property", Signature = "string" }]
        };

        Assert.True(clientType.IsClientType);
        Assert.False(modelType.IsClientType);
    }

    [Fact]
    public void DotNet_TypeInfo_IsModelType_DetectsModelClasses()
    {
        var modelType = new DotNet.TypeInfo
        {
            Name = "ChatMessage",
            Kind = "class",
            Members = [new MemberInfo { Name = "Content", Kind = "property", Signature = "string" }]
        };

        var clientType = new DotNet.TypeInfo
        {
            Name = "ChatClient",
            Kind = "class",
            Members = [new MemberInfo { Name = "SendAsync", Kind = "method", Signature = "() -> Task" }]
        };

        Assert.True(modelType.IsModelType);
        Assert.False(clientType.IsModelType);
    }

    [Fact]
    public void DotNet_TypeInfo_TruncationPriority_ClientsHaveHighestPriority()
    {
        var clientType = new DotNet.TypeInfo
        {
            Name = "ChatClient",
            Kind = "class",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "SendAsync", Kind = "method", Signature = "() -> Task" }]
        };

        var errorType = new DotNet.TypeInfo
        {
            Name = "ChatException",
            Kind = "class",
            Base = "Exception",
            IsError = true
        };

        var modelType = new DotNet.TypeInfo
        {
            Name = "ChatMessage",
            Kind = "class",
            Members = [new MemberInfo { Name = "Content", Kind = "property", Signature = "string" }]
        };

        Assert.True(clientType.TruncationPriority < errorType.TruncationPriority);
        Assert.True(errorType.TruncationPriority < modelType.TruncationPriority);
    }

    [Fact]
    public void DotNet_TypeInfo_GetReferencedTypes_GraphsTypesFromSignatures()
    {
        var clientType = new DotNet.TypeInfo
        {
            Name = "ChatClient",
            Kind = "class",
            Base = "BaseClient",
            Members =
            [
                new MemberInfo { Name = "SendAsync", Kind = "method", Signature = "(ChatMessage message) -> Task<ChatResponse>" },
                new MemberInfo { Name = "Options", Kind = "property", Signature = "ChatOptions" }
            ]
        };

        var allTypes = new HashSet<string> { "ChatClient", "BaseClient", "ChatMessage", "ChatResponse", "ChatOptions", "UnrelatedType" };
        var refs = clientType.GetReferencedTypes(allTypes);

        Assert.Contains("BaseClient", refs);
        Assert.Contains("ChatMessage", refs);
        Assert.Contains("ChatResponse", refs);
        Assert.Contains("ChatOptions", refs);
        Assert.DoesNotContain("UnrelatedType", refs);
    }

    [Fact]
    public void DotNet_CSharpFormatter_Format_WithBudget_TruncatesAtLimit()
    {
        var api = CreateLargeDotNetApi(50); // 50 types

        // Format with a small budget
        var result = CSharpFormatter.Format(api, 2000);

        Assert.True(result.Length <= 2100); // Allow some margin for truncation message
        Assert.Contains("truncated", result);
    }

    [Fact]
    public void DotNet_CSharpFormatter_Format_WithBudget_PrioritizesClients()
    {
        var api = CreateDotNetApiWithClientAndModels();

        // Small budget - should include client but truncate models
        var result = CSharpFormatter.Format(api, 1000);

        Assert.Contains("ChatClient", result);
    }

    [Fact]
    public void DotNet_CSharpFormatter_Format_IncludesClientDependencies()
    {
        var api = CreateDotNetApiWithClientAndDependency();

        // Budget enough for client + one dependency
        var result = CSharpFormatter.Format(api, 1500);

        // Should include both client and its dependency
        Assert.Contains("ChatClient", result);
        Assert.Contains("ChatMessage", result);
    }

    private static DotNet.ApiIndex CreateLargeDotNetApi(int typeCount)
    {
        var types = new List<DotNet.TypeInfo>();

        // Add one client
        types.Add(new DotNet.TypeInfo
        {
            Name = "SampleClient",
            Kind = "class",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "DoSomething", Kind = "method", Signature = "() -> void" }]
        });

        // Add many model types
        for (int i = 0; i < typeCount - 1; i++)
        {
            types.Add(new DotNet.TypeInfo
            {
                Name = $"Model{i}",
                Kind = "class",
                Members = [new MemberInfo { Name = "Property", Kind = "property", Signature = "string" }]
            });
        }

        return new DotNet.ApiIndex
        {
            Package = "TestPackage",
            Namespaces = [new NamespaceInfo { Name = "TestNamespace", Types = types }]
        };
    }

    private static DotNet.ApiIndex CreateDotNetApiWithClientAndModels()
    {
        return new DotNet.ApiIndex
        {
            Package = "TestPackage",
            Namespaces = [new NamespaceInfo
            {
                Name = "TestNamespace",
                Types =
                [
                    new DotNet.TypeInfo
                    {
                        Name = "ChatClient",
                        Kind = "class",
                        EntryPoint = true,
                        Members = [new MemberInfo { Name = "Send", Kind = "method", Signature = "() -> void" }]
                    },
                    new DotNet.TypeInfo
                    {
                        Name = "Model1",
                        Kind = "class",
                        Members = [new MemberInfo { Name = "Prop", Kind = "property", Signature = "string" }]
                    },
                    new DotNet.TypeInfo
                    {
                        Name = "Model2",
                        Kind = "class",
                        Members = [new MemberInfo { Name = "Prop", Kind = "property", Signature = "string" }]
                    }
                ]
            }]
        };
    }

    private static DotNet.ApiIndex CreateDotNetApiWithClientAndDependency()
    {
        return new DotNet.ApiIndex
        {
            Package = "TestPackage",
            Namespaces = [new NamespaceInfo
            {
                Name = "TestNamespace",
                Types =
                [
                    new DotNet.TypeInfo
                    {
                        Name = "ChatClient",
                        Kind = "class",
                        EntryPoint = true,
                        Members = [new MemberInfo { Name = "Send", Kind = "method", Signature = "(ChatMessage msg) -> void" }]
                    },
                    new DotNet.TypeInfo
                    {
                        Name = "ChatMessage",
                        Kind = "class",
                        Members = [new MemberInfo { Name = "Content", Kind = "property", Signature = "string" }]
                    }
                ]
            }]
        };
    }

    #endregion

    #region Python Smart Truncation Tests

    [Fact]
    public void Python_ClassInfo_IsClientType_DetectsClientClasses()
    {
        var clientClass = new Python.ClassInfo
        {
            Name = "ChatClient",
            EntryPoint = true,
            Base = null,
            Doc = null,
            Methods = [new Python.MethodInfo("send", "self, message", null, null, null, null)],
            Properties = null
        };

        var modelClass = new Python.ClassInfo
        {
            Name = "ChatMessage",
            Base = null,
            Doc = null,
            Methods = null,
            Properties = [new Python.PropertyInfo("content", "str", null)]
        };

        Assert.True(clientClass.IsClientType);
        Assert.False(modelClass.IsClientType);
    }

    [Fact]
    public void Python_ClassInfo_TruncationPriority_ClientsFirst()
    {
        var clientClass = new Python.ClassInfo
        {
            Name = "ChatClient",
            EntryPoint = true,
            Base = null,
            Doc = null,
            Methods = [new Python.MethodInfo("send", "self", null, null, null, null)],
            Properties = null
        };

        var modelClass = new Python.ClassInfo
        {
            Name = "ChatMessage",
            Base = null,
            Doc = null,
            Methods = null,
            Properties = [new Python.PropertyInfo("content", "str", null)]
        };

        Assert.True(clientClass.TruncationPriority < modelClass.TruncationPriority);
    }

    [Fact]
    public void Python_ClassInfo_GetReferencedTypes_GraphsFromAnnotations()
    {
        var clientClass = new Python.ClassInfo
        {
            Name = "ChatClient",
            Base = "BaseClient",
            Doc = null,
            Methods = [new Python.MethodInfo("send", "self, message: ChatMessage -> ChatResponse", null, null, null, null)],
            Properties = null
        };

        var allTypes = new HashSet<string> { "ChatClient", "BaseClient", "ChatMessage", "ChatResponse", "Unrelated" };
        var refs = clientClass.GetReferencedTypes(allTypes);

        Assert.Contains("BaseClient", refs);
        Assert.Contains("ChatMessage", refs);
        Assert.Contains("ChatResponse", refs);
        Assert.DoesNotContain("Unrelated", refs);
    }

    [Fact]
    public void Python_PythonFormatter_Format_WithBudget_TruncatesAtLimit()
    {
        var api = CreateLargePythonApi(50);

        var result = PythonFormatter.Format(api, 2000);

        Assert.True(result.Length <= 2100);
        Assert.Contains("truncated", result);
    }

    private static Python.ApiIndex CreateLargePythonApi(int classCount)
    {
        var classes = new List<Python.ClassInfo>();

        classes.Add(new Python.ClassInfo
        {
            Name = "SampleClient",
            EntryPoint = true,
            Base = null,
            Doc = null,
            Methods = [new Python.MethodInfo("do_something", "self, param1: str, param2: int", null, null, null, null)],
            Properties = null
        });

        for (int i = 0; i < classCount - 1; i++)
        {
            // Create more substantial model classes to trigger truncation
            classes.Add(new Python.ClassInfo
            {
                Name = $"Model{i}WithLongNameToTakeUpSpace",
                Base = null,
                Doc = $"This is a documentation comment for Model{i}.",
                Methods = null,
                Properties = [
                    new Python.PropertyInfo($"property_one_{i}", "str", null),
                    new Python.PropertyInfo($"property_two_{i}", "int", null),
                    new Python.PropertyInfo($"property_three_{i}", "bool", null)
                ]
            });
        }

        return new Python.ApiIndex(
            Package: "test_package",
            Modules: [new Python.ModuleInfo("test_module", classes, null)]
        );
    }

    #endregion

    #region Java Smart Truncation Tests

    [Fact]
    public void Java_ClassInfo_IsClientType_DetectsClientAndBuilderClasses()
    {
        var clientClass = new Java.ClassInfo
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new Java.MethodInfo { Name = "send", Sig = "()", Ret = "void" }]
        };

        var builderClass = new Java.ClassInfo
        {
            Name = "ChatClientBuilder",
            EntryPoint = true,
            Methods = [new Java.MethodInfo { Name = "build", Sig = "()", Ret = "ChatClient" }]
        };

        Assert.True(clientClass.IsClientType);
        Assert.True(builderClass.IsClientType);
    }

    [Fact]
    public void Java_ClassInfo_GetReferencedTypes_GraphsFromSignatures()
    {
        var clientClass = new Java.ClassInfo
        {
            Name = "ChatClient",
            Extends = "BaseClient",
            Methods = [new Java.MethodInfo { Name = "send", Sig = "(ChatMessage message)", Ret = "ChatResponse" }]
        };

        var allTypes = new HashSet<string> { "ChatClient", "BaseClient", "ChatMessage", "ChatResponse" };
        var refs = clientClass.GetReferencedTypes(allTypes);

        Assert.Contains("BaseClient", refs);
        Assert.Contains("ChatMessage", refs);
        Assert.Contains("ChatResponse", refs);
    }

    [Fact]
    public void Java_JavaFormatter_Format_WithBudget_TruncatesAtLimit()
    {
        var api = CreateLargeJavaApi(50);

        var result = JavaFormatter.Format(api, 2000);

        Assert.True(result.Length <= 2100);
        Assert.Contains("truncated", result);
    }

    private static Java.ApiIndex CreateLargeJavaApi(int classCount)
    {
        var classes = new List<Java.ClassInfo>();

        classes.Add(new Java.ClassInfo
        {
            Name = "SampleClient",
            EntryPoint = true,
            Methods = [new Java.MethodInfo { Name = "doSomething", Sig = "(String param1, int param2)", Ret = "void" }]
        });

        for (int i = 0; i < classCount - 1; i++)
        {
            // Create more substantial model classes to trigger truncation
            classes.Add(new Java.ClassInfo
            {
                Name = $"Model{i}WithLongNameToTakeUpSpace",
                Doc = $"This is a documentation comment for Model{i}.",
                Fields = [
                    new Java.FieldInfo { Name = $"propertyOne{i}", Type = "String" },
                    new Java.FieldInfo { Name = $"propertyTwo{i}", Type = "int" },
                    new Java.FieldInfo { Name = $"propertyThree{i}", Type = "boolean" }
                ]
            });
        }

        return new Java.ApiIndex
        {
            Package = "com.test",
            Packages = [new Java.PackageInfo { Name = "com.test", Classes = classes }]
        };
    }

    #endregion

    #region Go Smart Truncation Tests

    [Fact]
    public void Go_StructApi_IsClientType_DetectsClientStructs()
    {
        var clientStruct = new Go.StructApi
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new Go.FuncApi { Name = "Send", Sig = "(ctx context.Context)", Ret = "error" }]
        };

        var modelStruct = new Go.StructApi
        {
            Name = "ChatMessage",
            Fields = [new Go.FieldApi { Name = "Content", Type = "string" }]
        };

        Assert.True(clientStruct.IsClientType);
        Assert.False(modelStruct.IsClientType);
    }

    [Fact]
    public void Go_StructApi_TruncationPriority_ClientsFirst()
    {
        var clientStruct = new Go.StructApi
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new Go.FuncApi { Name = "Send", Sig = "()", Ret = "error" }]
        };

        var optionsStruct = new Go.StructApi
        {
            Name = "ChatClientOptions",
            Fields = [new Go.FieldApi { Name = "MaxTokens", Type = "int" }]
        };

        Assert.True(clientStruct.TruncationPriority < optionsStruct.TruncationPriority);
    }

    [Fact]
    public void Go_GoFormatter_Format_WithBudget_TruncatesAtLimit()
    {
        var api = CreateLargeGoApi(50);

        var result = GoFormatter.Format(api, 2000);

        Assert.True(result.Length <= 2100);
        Assert.Contains("truncated", result);
    }

    private static Go.ApiIndex CreateLargeGoApi(int structCount)
    {
        var structs = new List<Go.StructApi>();

        structs.Add(new Go.StructApi
        {
            Name = "SampleClient",
            EntryPoint = true,
            Methods = [new Go.FuncApi { Name = "DoSomething", Sig = "()", Ret = "error" }]
        });

        for (int i = 0; i < structCount - 1; i++)
        {
            structs.Add(new Go.StructApi
            {
                Name = $"Model{i}",
                Fields = [new Go.FieldApi { Name = "Prop", Type = "string" }]
            });
        }

        return new Go.ApiIndex
        {
            Package = "testpkg",
            Packages = [new Go.PackageApi { Name = "testpkg", Structs = structs }]
        };
    }

    #endregion

    #region TypeScript Smart Truncation Tests

    [Fact]
    public void TypeScript_ClassInfo_IsClientType_DetectsClientClasses()
    {
        var clientClass = new TypeScript.ClassInfo
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new TypeScript.MethodInfo { Name = "send", Sig = "message: string", Ret = "Promise<void>" }]
        };

        var modelClass = new TypeScript.ClassInfo
        {
            Name = "ChatMessage",
            Properties = [new TypeScript.PropertyInfo { Name = "content", Type = "string" }]
        };

        Assert.True(clientClass.IsClientType);
        Assert.False(modelClass.IsClientType);
    }

    [Fact]
    public void TypeScript_ClassInfo_GetReferencedTypes_GraphsFromSignatures()
    {
        var clientClass = new TypeScript.ClassInfo
        {
            Name = "ChatClient",
            Extends = "BaseClient",
            Methods = [new TypeScript.MethodInfo { Name = "send", Sig = "message: ChatMessage", Ret = "Promise<ChatResponse>" }],
            ReferencedTypes = ["BaseClient", "ChatMessage", "ChatResponse"]
        };

        var allTypes = new HashSet<string> { "ChatClient", "BaseClient", "ChatMessage", "ChatResponse" };
        var refs = clientClass.GetReferencedTypes(allTypes);

        Assert.Contains("BaseClient", refs);
        Assert.Contains("ChatMessage", refs);
        Assert.Contains("ChatResponse", refs);
    }

    [Fact]
    public void TypeScript_TypeScriptFormatter_Format_WithBudget_TruncatesAtLimit()
    {
        var api = CreateLargeTypeScriptApi(50);

        var result = TypeScriptFormatter.Format(api, 2000);

        Assert.True(result.Length <= 2100);
        Assert.Contains("truncated", result);
    }

    private static TypeScript.ApiIndex CreateLargeTypeScriptApi(int classCount)
    {
        var classes = new List<TypeScript.ClassInfo>();

        classes.Add(new TypeScript.ClassInfo
        {
            Name = "SampleClient",
            EntryPoint = true,
            Methods = [new TypeScript.MethodInfo { Name = "doSomething", Sig = "", Ret = "void" }]
        });

        for (int i = 0; i < classCount - 1; i++)
        {
            classes.Add(new TypeScript.ClassInfo
            {
                Name = $"Model{i}",
                Properties = [new TypeScript.PropertyInfo { Name = "prop", Type = "string" }]
            });
        }

        return new TypeScript.ApiIndex
        {
            Package = "@test/package",
            Modules = [new TypeScript.ModuleInfo { Name = "index", Classes = classes }]
        };
    }

    #endregion

    #region Cross-Language Consistency Tests

    [Fact]
    public void AllLanguages_ClientPatternDetection_ConsistentAcrossLanguages()
    {
        // All languages should detect EntryPoint = true as client types

        var dotnetClient = new DotNet.TypeInfo
        {
            Name = "ChatService",
            Kind = "class",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "Send", Kind = "method", Signature = "() -> void" }]
        };

        var pythonClient = new Python.ClassInfo
        {
            Name = "ChatManager",
            EntryPoint = true,
            Base = null,
            Doc = null,
            Methods = [new Python.MethodInfo("send", "self", null, null, null, null)],
            Properties = null
        };

        var javaClient = new Java.ClassInfo
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new Java.MethodInfo { Name = "send", Sig = "()", Ret = "void" }]
        };

        var goClient = new Go.StructApi
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new Go.FuncApi { Name = "Send", Sig = "()", Ret = "error" }]
        };

        var tsClient = new TypeScript.ClassInfo
        {
            Name = "ChatClient",
            EntryPoint = true,
            Methods = [new TypeScript.MethodInfo { Name = "send", Sig = "", Ret = "void" }]
        };

        Assert.True(dotnetClient.IsClientType);
        Assert.True(pythonClient.IsClientType);
        Assert.True(javaClient.IsClientType);
        Assert.True(goClient.IsClientType);
        Assert.True(tsClient.IsClientType);
    }

    [Fact]
    public void AllLanguages_TruncationMessage_ConsistentFormat()
    {
        // All formatters should include "truncated" in their output when over budget

        var dotnetResult = CSharpFormatter.Format(CreateLargeDotNetApi(50), 1000);
        var pythonResult = PythonFormatter.Format(CreateLargePythonApi(50), 1000);
        var javaResult = JavaFormatter.Format(CreateLargeJavaApi(50), 1000);
        var goResult = GoFormatter.Format(CreateLargeGoApi(50), 1000);
        var tsResult = TypeScriptFormatter.Format(CreateLargeTypeScriptApi(50), 1000);

        Assert.Contains("truncated", dotnetResult);
        Assert.Contains("truncated", pythonResult);
        Assert.Contains("truncated", javaResult);
        Assert.Contains("truncated", goResult);
        Assert.Contains("truncated", tsResult);
    }

    #endregion

    #region FormatWithCoverage Budget Tests

    [Fact]
    public void Java_FormatWithCoverage_TruncatesWithMultipleClients()
    {
        var classes = Enumerable.Range(0, 4).Select(c =>
            new Java.ClassInfo
            {
                Name = $"Client{c}",
                EntryPoint = true,
                Methods = Enumerable.Range(0, 10).Select(i =>
                    new Java.MethodInfo { Name = $"method{i}", Sig = $"(String arg{i})", Ret = "void" }
                ).ToList()
            }).ToList();

        var api = new Java.ApiIndex
        {
            Package = "com.test",
            Packages = [new Java.PackageInfo { Name = "com.test", Classes = classes }]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = classes.SelectMany(c => c.Methods!.Select(m =>
                new UncoveredOperation { ClientType = c.Name, Operation = m.Name, Signature = $"{m.Name}(...)" }
            )).ToList()
        };

        var fullResult = JavaFormatter.FormatWithCoverage(api, coverage, int.MaxValue);
        var budget = fullResult.Length / 2;
        var truncated = JavaFormatter.FormatWithCoverage(api, coverage, budget);

        Assert.True(truncated.Length < fullResult.Length,
            $"Truncated ({truncated.Length}) should be shorter than full ({fullResult.Length})");
        Assert.Contains("truncated", truncated);
    }

    [Fact]
    public void Go_FormatWithCoverage_TruncatesWithMultipleClients()
    {
        var structs = Enumerable.Range(0, 4).Select(c =>
            new Go.StructApi
            {
                Name = $"Client{c}",
                EntryPoint = true,
                Methods = Enumerable.Range(0, 10).Select(i =>
                    new Go.FuncApi { Name = $"Method{i}", Sig = $"(arg{i} string)", Ret = "error" }
                ).ToList()
            }).ToList();

        var api = new Go.ApiIndex
        {
            Package = "testpkg",
            Packages = [new Go.PackageApi { Name = "testpkg", Structs = structs }]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = structs.SelectMany(s => s.Methods!.Select(m =>
                new UncoveredOperation { ClientType = s.Name, Operation = m.Name, Signature = $"{m.Name}(...)" }
            )).ToList()
        };

        var fullResult = GoFormatter.FormatWithCoverage(api, coverage, int.MaxValue);
        var budget = fullResult.Length / 2;
        var truncated = GoFormatter.FormatWithCoverage(api, coverage, budget);

        Assert.True(truncated.Length < fullResult.Length,
            $"Truncated ({truncated.Length}) should be shorter than full ({fullResult.Length})");
        Assert.Contains("truncated", truncated);
    }

    [Fact]
    public void TypeScript_FormatWithCoverage_TruncatesWithMultipleClients()
    {
        var classes = Enumerable.Range(0, 4).Select(c =>
            new TypeScript.ClassInfo
            {
                Name = $"Client{c}",
                EntryPoint = true,
                Methods = Enumerable.Range(0, 10).Select(i =>
                    new TypeScript.MethodInfo { Name = $"method{i}", Sig = $"(arg{i}: string)", Ret = "void" }
                ).ToList()
            }).ToList();

        var api = new TypeScript.ApiIndex
        {
            Package = "@test/pkg",
            Modules = [new TypeScript.ModuleInfo { Name = "index", Classes = classes }]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = classes.SelectMany(c => c.Methods!.Select(m =>
                new UncoveredOperation { ClientType = c.Name, Operation = m.Name, Signature = $"{m.Name}(...)" }
            )).ToList()
        };

        var fullResult = TypeScriptFormatter.FormatWithCoverage(api, coverage, int.MaxValue);
        var budget = fullResult.Length / 2;
        var truncated = TypeScriptFormatter.FormatWithCoverage(api, coverage, budget);

        Assert.True(truncated.Length < fullResult.Length,
            $"Truncated ({truncated.Length}) should be shorter than full ({fullResult.Length})");
        Assert.Contains("truncated", truncated);
    }

    #endregion

    #region Java Interface Keyword Tests

    [Fact]
    public void Java_Format_InterfaceAndClassMixed_CorrectKeywords()
    {
        var iface = new Java.ClassInfo
        {
            Name = "ServiceInterface",
            EntryPoint = true,
            Methods = [new Java.MethodInfo { Name = "execute", Sig = "()", Ret = "void" }]
        };

        var cls = new Java.ClassInfo
        {
            Name = "ServiceImpl",
            EntryPoint = true,
            Methods = [new Java.MethodInfo { Name = "process", Sig = "()", Ret = "void" }]
        };

        var api = new Java.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test",
                    Interfaces = [iface],
                    Classes = [iface, cls]
                }
            ]
        };

        var result = JavaFormatter.Format(api);

        Assert.Contains("interface ServiceInterface", result);
        Assert.Contains("class ServiceImpl", result);
    }

    #endregion

    #region TypeScript ExportPath Tests

    [Fact]
    public void TypeScript_Format_ExportPathWithoutDotSlash_NoException()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "ClientA",
                            EntryPoint = true,
                            ExportPath = ".",
                            Methods = [new TypeScript.MethodInfo { Name = "execute", Sig = "()", Ret = "void" }]
                        },
                        new TypeScript.ClassInfo
                        {
                            Name = "ClientB",
                            EntryPoint = true,
                            ExportPath = "subclient",
                            Methods = [new TypeScript.MethodInfo { Name = "run", Sig = "()", Ret = "void" }]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.Format(api);

        Assert.Contains("@example/test", result);
        Assert.Contains("ClientA", result);
        Assert.Contains("ClientB", result);
        Assert.Contains("@example/test/subclient", result);
    }

    [Fact]
    public void TypeScript_Format_ExportPathWithDotSlash_StripsCorrectly()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "ClientA",
                            EntryPoint = true,
                            ExportPath = ".",
                            Methods = [new TypeScript.MethodInfo { Name = "execute", Sig = "()", Ret = "void" }]
                        },
                        new TypeScript.ClassInfo
                        {
                            Name = "ClientB",
                            EntryPoint = true,
                            ExportPath = "./models",
                            Methods = [new TypeScript.MethodInfo { Name = "run", Sig = "()", Ret = "void" }]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.Format(api);

        Assert.Contains("@example/test/models", result);
        Assert.DoesNotContain("@example/test/./models", result);
    }

    #endregion

    #region Go Case Sensitivity Tests

    [Fact]
    public void Go_Format_CaseSensitiveTypeNames()
    {
        var api = new Go.ApiIndex
        {
            Package = "testpkg",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "testpkg",
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "Client",
                            EntryPoint = true,
                            Methods = [new Go.FuncApi { Name = "Send", Sig = "()", Ret = "error" }]
                        }
                    ]
                }
            ]
        };

        var stubs = GoFormatter.Format(api);
        Assert.Contains("Client", stubs);
    }

    #endregion

    #region FormatWithCoverage Dependency Inclusion Tests

    [Fact]
    public void Java_FormatWithCoverage_IncludesDependencyModels()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new Java.ClassInfo
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new Java.MethodInfo
                                {
                                    Name = "upload",
                                    Sig = "(BlobUploadOptions options)",
                                    Ret = "BlobResponse"
                                }
                            ]
                        },
                        new Java.ClassInfo
                        {
                            Name = "BlobUploadOptions",
                            Fields = [new Java.FieldInfo { Name = "size", Type = "int" }]
                        },
                        new Java.ClassInfo
                        {
                            Name = "BlobResponse",
                            Fields = [new Java.FieldInfo { Name = "etag", Type = "String" }]
                        }
                    ]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "BlobClient", Operation = "upload", Signature = "upload(...)" }
            ]
        };

        var result = JavaFormatter.FormatWithCoverage(api, coverage, 10000);

        Assert.Contains("BlobClient", result);
        Assert.Contains("BlobUploadOptions", result);
        Assert.Contains("BlobResponse", result);
    }

    [Fact]
    public void Go_FormatWithCoverage_IncludesDependencyModels()
    {
        var api = new Go.ApiIndex
        {
            Package = "testpkg",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "testpkg",
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new Go.FuncApi
                                {
                                    Name = "Upload",
                                    Sig = "(opts UploadOptions)",
                                    Ret = "UploadResponse"
                                }
                            ]
                        },
                        new Go.StructApi
                        {
                            Name = "UploadOptions",
                            Fields = [new Go.FieldApi { Name = "Size", Type = "int64" }]
                        },
                        new Go.StructApi
                        {
                            Name = "UploadResponse",
                            Fields = [new Go.FieldApi { Name = "ETag", Type = "string" }]
                        }
                    ]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "BlobClient", Operation = "Upload", Signature = "Upload(...)" }
            ]
        };

        var result = GoFormatter.FormatWithCoverage(api, coverage, 10000);

        Assert.Contains("BlobClient", result);
        Assert.Contains("UploadOptions", result);
        Assert.Contains("UploadResponse", result);
    }

    [Fact]
    public void TypeScript_FormatWithCoverage_IncludesDependencyTypes()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@test/storage",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TypeScript.MethodInfo
                                {
                                    Name = "upload",
                                    Sig = "(options: UploadOptions)",
                                    Ret = "Promise<UploadResult>"
                                }
                            ]
                        },
                        new TypeScript.ClassInfo
                        {
                            Name = "UploadOptions",
                            Properties = [new TypeScript.PropertyInfo { Name = "size", Type = "number" }]
                        }
                    ],
                    Interfaces =
                    [
                        new TypeScript.InterfaceInfo
                        {
                            Name = "UploadResult",
                            Properties = [new TypeScript.PropertyInfo { Name = "etag", Type = "string" }]
                        }
                    ]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 1,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new UncoveredOperation { ClientType = "BlobClient", Operation = "upload", Signature = "upload(...)" }
            ]
        };

        var result = TypeScriptFormatter.FormatWithCoverage(api, coverage, 10000);

        Assert.Contains("BlobClient", result);
        Assert.Contains("UploadOptions", result);
        Assert.Contains("UploadResult", result);
    }

    #endregion

    #region Format Includes Dependencies Tests

    [Fact]
    public void TypeScript_Format_IncludesClientDependencies()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@test/sdk",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "MyClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new TypeScript.MethodInfo { Name = "getConfig", Sig = "()", Ret = "ClientConfig" }
                            ]
                        },
                        new TypeScript.ClassInfo
                        {
                            Name = "ClientConfig",
                            Properties = [new TypeScript.PropertyInfo { Name = "timeout", Type = "number" }]
                        }
                    ],
                    Interfaces =
                    [
                        new TypeScript.InterfaceInfo
                        {
                            Name = "ServiceOptions",
                            Properties = [new TypeScript.PropertyInfo { Name = "retries", Type = "number" }]
                        }
                    ],
                    Enums =
                    [
                        new TypeScript.EnumInfo { Name = "LogLevel", Values = ["Debug", "Info", "Error"] }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.Format(api);

        Assert.Contains("MyClient", result);
        Assert.Contains("ClientConfig", result);
        Assert.Contains("ServiceOptions", result);
        Assert.Contains("LogLevel", result);
    }

    [Fact]
    public void Java_Format_IncludesClientDependencies()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new Java.ClassInfo
                        {
                            Name = "MyClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new Java.MethodInfo { Name = "getConfig", Sig = "()", Ret = "ClientConfig" }
                            ]
                        },
                        new Java.ClassInfo
                        {
                            Name = "ClientConfig",
                            Fields = [new Java.FieldInfo { Name = "timeout", Type = "int" }]
                        }
                    ]
                }
            ]
        };

        var result = JavaFormatter.Format(api);

        Assert.Contains("MyClient", result);
        Assert.Contains("ClientConfig", result);
    }

    #endregion

    #region Regression: PythonFormatter Docstring Placement

    [Fact]
    public void Python_PythonFormatter_DocstringAppearsInsideClassBody()
    {
        // Regression: docstring was emitted BEFORE the class declaration, generating invalid Python.
        var api = new Python.ApiIndex(
            Package: "test_package",
            Modules: [new Python.ModuleInfo("test_module", [
                new Python.ClassInfo
                {
                    Name = "MyClient",
                    EntryPoint = true,
                    Base = "BaseClient",
                    Doc = "This is a client for something.",
                    Methods = [new Python.MethodInfo("do_thing", "self", null, null, null, null)],
                    Properties = null
                }
            ], null)]
        );

        var result = PythonFormatter.Format(api);

        // The class declaration must come BEFORE the docstring
        var classIdx = result.IndexOf("class MyClient(BaseClient):", StringComparison.Ordinal);
        var docIdx = result.IndexOf("\"\"\"This is a client for something.\"\"\"", StringComparison.Ordinal);
        Assert.True(classIdx >= 0, "class declaration not found in output");
        Assert.True(docIdx >= 0, "docstring not found in output");
        Assert.True(classIdx < docIdx,
            $"class declaration (pos {classIdx}) must appear before docstring (pos {docIdx})");
    }

    [Fact]
    public void Python_PythonFormatter_ClassWithoutDocstring_NoCrash()
    {
        var api = new Python.ApiIndex(
            Package: "test_package",
            Modules: [new Python.ModuleInfo("test_module", [
                new Python.ClassInfo
                {
                    Name = "SimpleModel",
                    Base = null,
                    Doc = null,
                    Methods = null,
                    Properties = [new Python.PropertyInfo("value", "str", null)]
                }
            ], null)]
        );

        var result = PythonFormatter.Format(api);

        Assert.Contains("class SimpleModel:", result);
        Assert.DoesNotContain("\"\"\"", result);
    }

    #endregion

    #region Regression: CSharpFormatter Namespace Mapping

    [Fact]
    public void DotNet_CSharpFormatter_MultipleNamespaces_TypesGroupedCorrectly()
    {
        // Regression: GetNamespace was O(n²) via linear scan; now uses pre-built map.
        // Verify formatting still groups types by namespace correctly.
        var api = new DotNet.ApiIndex
        {
            Package = "MultiNsPackage",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "Namespace.One",
                    Types =
                    [
                        new DotNet.TypeInfo
                        {
                            Name = "ClientA",
                            Kind = "class",
                            EntryPoint = true,
                            Members = [new MemberInfo { Name = "RunAsync", Kind = "method", Signature = "() -> Task" }]
                        }
                    ]
                },
                new NamespaceInfo
                {
                    Name = "Namespace.Two",
                    Types =
                    [
                        new DotNet.TypeInfo
                        {
                            Name = "ModelB",
                            Kind = "class",
                            Members = [new MemberInfo { Name = "Value", Kind = "property", Signature = "string" }]
                        }
                    ]
                }
            ]
        };

        var result = CSharpFormatter.Format(api);

        // Both namespaces should appear
        Assert.Contains("namespace Namespace.One", result);
        Assert.Contains("namespace Namespace.Two", result);
        // Types should be present
        Assert.Contains("ClientA", result);
        Assert.Contains("ModelB", result);
    }

    [Fact]
    public void DotNet_CSharpFormatter_FormatWithCoverage_UsesNamespaceMapCorrectly()
    {
        // Ensures FormatWithCoverage (which also uses BuildNamespaceMap) groups types correctly.
        var api = new DotNet.ApiIndex
        {
            Package = "CoverageNsPackage",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "MyNamespace",
                    Types =
                    [
                        new DotNet.TypeInfo
                        {
                            Name = "ChatClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new MemberInfo { Name = "SendAsync", Kind = "method", Signature = "(string msg) -> Task" },
                                new MemberInfo { Name = "ListAsync", Kind = "method", Signature = "() -> Task<List>" }
                            ]
                        }
                    ]
                }
            ]
        };

        var coverage = new Contracts.UsageIndex
        {
            FileCount = 1,
            CoveredOperations = [],
            UncoveredOperations =
            [
                new() { ClientType = "ChatClient", Operation = "SendAsync", Signature = "(string msg) -> Task" },
                new() { ClientType = "ChatClient", Operation = "ListAsync", Signature = "() -> Task<List>" }
            ]
        };

        var result = CSharpFormatter.FormatWithCoverage(api, coverage, int.MaxValue);

        Assert.Contains("namespace MyNamespace", result);
        Assert.Contains("ChatClient", result);
        Assert.Contains("UNCOVERED API", result);
    }

    #endregion

    #region Issue 3e: Version Field Consistency Tests

    [Fact]
    public void AllLanguages_ApiIndex_HasVersionProperty()
    {
        // All ApiIndex types should support a Version property
        var dotnet = new DotNet.ApiIndex { Package = "Test", Version = "1.0.0" };
        var python = new Python.ApiIndex("test-pkg", [], Version: "2.0.0");
        var ts = new TypeScript.ApiIndex { Package = "@test/pkg", Version = "3.0.0" };
        var go = new Go.ApiIndex { Package = "testpkg", Version = "4.0.0" };
        var java = new Java.ApiIndex { Package = "com.test", Version = "5.0.0" };

        Assert.Equal("1.0.0", dotnet.Version);
        Assert.Equal("2.0.0", python.Version);
        Assert.Equal("3.0.0", ts.Version);
        Assert.Equal("4.0.0", go.Version);
        Assert.Equal("5.0.0", java.Version);
    }

    [Fact]
    public void AllLanguages_ApiIndex_VersionDefaultsToNull()
    {
        var dotnet = new DotNet.ApiIndex { Package = "Test" };
        var python = new Python.ApiIndex("test-pkg", []);
        var ts = new TypeScript.ApiIndex { Package = "@test/pkg" };
        var go = new Go.ApiIndex { Package = "testpkg" };
        var java = new Java.ApiIndex { Package = "com.test" };

        Assert.Null(dotnet.Version);
        Assert.Null(python.Version);
        Assert.Null(ts.Version);
        Assert.Null(go.Version);
        Assert.Null(java.Version);
    }

    [Fact]
    public void AllLanguages_ApiIndex_VersionSerializesToJson()
    {
        var dotnet = new DotNet.ApiIndex { Package = "Test", Version = "1.0.0" };
        var python = new Python.ApiIndex("test-pkg", [], Version: "2.0.0");
        var ts = new TypeScript.ApiIndex { Package = "@test/pkg", Version = "3.0.0" };
        var go = new Go.ApiIndex { Package = "testpkg", Version = "4.0.0" };
        var java = new Java.ApiIndex { Package = "com.test", Version = "5.0.0" };

        Assert.Contains("\"version\"", dotnet.ToJson());
        Assert.Contains("\"1.0.0\"", dotnet.ToJson());
        Assert.Contains("\"version\"", python.ToJson());
        Assert.Contains("\"version\"", ts.ToJson());
        Assert.Contains("\"version\"", go.ToJson());
        Assert.Contains("\"version\"", java.ToJson());
    }

    [Fact]
    public void AllLanguages_ApiIndex_NullVersionOmittedFromJson()
    {
        var dotnet = new DotNet.ApiIndex { Package = "Test" };
        var python = new Python.ApiIndex("test-pkg", []);
        var ts = new TypeScript.ApiIndex { Package = "@test/pkg" };
        var go = new Go.ApiIndex { Package = "testpkg" };
        var java = new Java.ApiIndex { Package = "com.test" };

        Assert.DoesNotContain("\"version\"", dotnet.ToJson());
        Assert.DoesNotContain("\"version\"", python.ToJson());
        Assert.DoesNotContain("\"version\"", ts.ToJson());
        Assert.DoesNotContain("\"version\"", go.ToJson());
        Assert.DoesNotContain("\"version\"", java.ToJson());
    }

    #endregion

    #region Issue 3c: IsClientType Allows Struct/Record Tests

    [Fact]
    public void DotNet_IsClientType_AcceptsStructEntryPoint()
    {
        var structClient = new DotNet.TypeInfo
        {
            Name = "StructClient",
            Kind = "struct",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "Execute", Kind = "method", Signature = "() -> void" }]
        };

        Assert.True(structClient.IsClientType);
    }

    [Fact]
    public void DotNet_IsClientType_AcceptsRecordEntryPoint()
    {
        var recordClient = new DotNet.TypeInfo
        {
            Name = "RecordClient",
            Kind = "record",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "Process", Kind = "method", Signature = "() -> Task" }]
        };

        Assert.True(recordClient.IsClientType);
    }

    [Fact]
    public void DotNet_IsClientType_StillWorksForClass()
    {
        var classClient = new DotNet.TypeInfo
        {
            Name = "ClassClient",
            Kind = "class",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "Run", Kind = "method", Signature = "() -> void" }]
        };

        Assert.True(classClient.IsClientType);
    }

    [Fact]
    public void DotNet_IsClientType_RejectsNonEntryPoint()
    {
        var nonEntry = new DotNet.TypeInfo
        {
            Name = "Helper",
            Kind = "struct",
            EntryPoint = false,
            Members = [new MemberInfo { Name = "Help", Kind = "method", Signature = "() -> void" }]
        };

        Assert.False(nonEntry.IsClientType);
    }

    [Fact]
    public void DotNet_IsClientType_RejectsEntryPointWithoutMethods()
    {
        var noMethods = new DotNet.TypeInfo
        {
            Name = "Config",
            Kind = "struct",
            EntryPoint = true,
            Members = [new MemberInfo { Name = "Value", Kind = "property", Signature = "string" }]
        };

        Assert.False(noMethods.IsClientType);
    }

    #endregion

    #region Issue 3d: TruncationPriority Error/Exception Consistency Tests

    [Fact]
    public void DotNet_TruncationPriority_RecognizesErrorTypesStructurally()
    {
        var exception = new DotNet.TypeInfo { Name = "SomeException", Kind = "class", Base = "InvalidOperationException", IsError = true };
        var error = new DotNet.TypeInfo { Name = "SomeError", Kind = "class", Base = "Exception", IsError = true };
        var notError = new DotNet.TypeInfo { Name = "SomeError", Kind = "class" };

        Assert.Equal(1, exception.TruncationPriority);
        Assert.Equal(1, error.TruncationPriority);
        Assert.NotEqual(1, notError.TruncationPriority); // No IsError → not an error type
    }

    [Fact]
    public void Python_TruncationPriority_RecognizesErrorTypesStructurally()
    {
        var exception = new Python.ClassInfo { Name = "SomeException", Base = "ValueError" };
        var error = new Python.ClassInfo { Name = "SomeError", Base = "Exception" };
        var notError = new Python.ClassInfo { Name = "SomeError" };

        Assert.Equal(1, exception.TruncationPriority);
        Assert.Equal(1, error.TruncationPriority);
        Assert.NotEqual(1, notError.TruncationPriority);
    }

    [Fact]
    public void TypeScript_TruncationPriority_RecognizesErrorTypesStructurally()
    {
        var error = new TypeScript.ClassInfo { Name = "SomeError", Extends = "Error" };
        var exception = new TypeScript.ClassInfo { Name = "SomeException", Extends = "RestError" };
        var notError = new TypeScript.ClassInfo { Name = "SomeError" };

        Assert.Equal(1, error.TruncationPriority);
        Assert.Equal(1, exception.TruncationPriority);
        Assert.NotEqual(1, notError.TruncationPriority);
    }

    [Fact]
    public void Go_TruncationPriority_RecognizesErrorTypesStructurally()
    {
        var error = new Go.StructApi
        {
            Name = "SomeError",
            Methods = [new Go.FuncApi { Name = "Error", Sig = "()", Ret = "string" }]
        };
        var notError = new Go.StructApi { Name = "SomeError" };

        Assert.Equal(1, error.TruncationPriority);
        Assert.NotEqual(1, notError.TruncationPriority);
    }

    [Fact]
    public void Java_TruncationPriority_RecognizesErrorTypesStructurally()
    {
        var exception = new Java.ClassInfo { Name = "SomeException", Extends = "RuntimeException" };
        var error = new Java.ClassInfo { Name = "SomeError", Extends = "Error" };
        var notError = new Java.ClassInfo { Name = "SomeError" };

        Assert.Equal(1, exception.TruncationPriority);
        Assert.Equal(1, error.TruncationPriority);
        Assert.NotEqual(1, notError.TruncationPriority);
    }

    [Fact]
    public void AllLanguages_TruncationPriority_ErrorTypesDetectedStructurally()
    {
        // Verify all 5 languages detect error types via base type, not name
        var dotnetEx = new DotNet.TypeInfo { Name = "FooException", Kind = "class", Base = "Exception", IsError = true };
        var dotnetErr = new DotNet.TypeInfo { Name = "FooError", Kind = "class", Base = "HttpRequestException", IsError = true };
        var pyEx = new Python.ClassInfo { Name = "FooException", Base = "Exception" };
        var pyErr = new Python.ClassInfo { Name = "FooError", Base = "RuntimeError" };
        var tsEx = new TypeScript.ClassInfo { Name = "FooException", Extends = "Error" };
        var tsErr = new TypeScript.ClassInfo { Name = "FooError", Extends = "RestError" };
        var goErr = new Go.StructApi { Name = "FooError", Methods = [new Go.FuncApi { Name = "Error", Sig = "()", Ret = "string" }] };
        var javaEx = new Java.ClassInfo { Name = "FooException", Extends = "Exception" };
        var javaErr = new Java.ClassInfo { Name = "FooError", Extends = "Error" };

        Assert.Equal(dotnetEx.TruncationPriority, dotnetErr.TruncationPriority);
        Assert.Equal(pyEx.TruncationPriority, pyErr.TruncationPriority);
        Assert.Equal(tsEx.TruncationPriority, tsErr.TruncationPriority);
        Assert.Equal(javaEx.TruncationPriority, javaErr.TruncationPriority);
        // Go error detection is structural (Error() method), so only one variant
        Assert.Equal(1, goErr.TruncationPriority);
    }

    #endregion

    #region Structural IsErrorType Edge Cases

    [Fact]
    public void DotNet_IsErrorType_NamespacedBase_Detected()
    {
        // IsError is set structurally by Roslyn during engine run
        var t = new DotNet.TypeInfo { Name = "MyError", Kind = "class", Base = "System.InvalidOperationException", IsError = true };
        Assert.True(t.IsErrorType);
        Assert.Equal(1, t.TruncationPriority);
    }

    [Fact]
    public void DotNet_IsErrorType_GenericBase_Detected()
    {
        // IsError is set structurally by Roslyn during engine run
        var t = new DotNet.TypeInfo { Name = "WrappedException", Kind = "class", Base = "ServiceException<ErrorDetail>", IsError = true };
        Assert.True(t.IsErrorType);
    }

    [Fact]
    public void DotNet_IsErrorType_FalsePositivePrevention_BaseContainingException()
    {
        // Base that *contains* "Exception" but doesn't end with it should NOT match
        var t = new DotNet.TypeInfo { Name = "MyHandler", Kind = "class", Base = "ExceptionHandler" };
        Assert.False(t.IsErrorType);
    }

    [Fact]
    public void DotNet_IsErrorType_EmptyBase_NotDetected()
    {
        var t = new DotNet.TypeInfo { Name = "SomeException", Kind = "class", Base = "" };
        Assert.False(t.IsErrorType);
    }

    [Fact]
    public void DotNet_IsErrorType_NamedExceptionButNoBase_NotDetected()
    {
        // A type *named* "FooException" with no base should NOT be an error type
        var t = new DotNet.TypeInfo { Name = "FooException", Kind = "class" };
        Assert.False(t.IsErrorType);
    }

    [Fact]
    public void Go_IsErrorType_WrongReturnType_NotDetected()
    {
        // Error method returning int instead of string should not match
        var s = new Go.StructApi
        {
            Name = "BadError",
            Methods = [new Go.FuncApi { Name = "Error", Sig = "()", Ret = "int" }]
        };
        Assert.False(s.IsErrorType);
    }

    [Fact]
    public void Go_IsErrorType_MethodWithParams_NotDetected()
    {
        // Error method with parameters doesn't implement the error interface
        var s = new Go.StructApi
        {
            Name = "NotAnError",
            Methods = [new Go.FuncApi { Name = "Error", Sig = "(ctx context.Context)", Ret = "string" }]
        };
        Assert.False(s.IsErrorType);
    }

    [Fact]
    public void Go_IsErrorType_NullSig_Detected()
    {
        // Null Sig is treated as no parameters (valid error interface)
        var s = new Go.StructApi
        {
            Name = "SimpleError",
            Methods = [new Go.FuncApi { Name = "Error", Sig = null!, Ret = "string" }]
        };
        Assert.True(s.IsErrorType);
    }

    [Fact]
    public void Go_IsErrorType_NamedError_NoMethod_NotDetected()
    {
        // Struct named "Error" but without Error() method is not an error type
        var s = new Go.StructApi
        {
            Name = "Error",
            Fields = [new Go.FieldApi { Name = "Message", Type = "string" }]
        };
        Assert.False(s.IsErrorType);
    }

    [Fact]
    public void Java_IsErrorType_Throwable_Detected()
    {
        var c = new Java.ClassInfo { Name = "CriticalFailure", Extends = "Throwable" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Java_IsErrorType_FullyQualifiedBase_Detected()
    {
        var c = new Java.ClassInfo { Name = "MyException", Extends = "java.lang.RuntimeException" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Java_IsErrorType_GenericBase_Detected()
    {
        var c = new Java.ClassInfo { Name = "TypedError", Extends = "ServiceException<ErrorInfo>" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Java_IsErrorType_FalsePositivePrevention_ErrorHandlerBase()
    {
        // Extends "ErrorHandler" should NOT be detected — doesn't end with "Error" or "Exception"
        var c = new Java.ClassInfo { Name = "MyHandler", Extends = "ErrorHandler" };
        Assert.False(c.IsErrorType);
    }

    [Fact]
    public void Java_IsErrorType_ExtendsError_Detected()
    {
        // "Error" is in Java's exception hierarchy (java.lang.Error)
        var c = new Java.ClassInfo { Name = "OutOfMemory", Extends = "Error" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Python_IsErrorType_BaseException_Detected()
    {
        var c = new Python.ClassInfo { Name = "CriticalError", Base = "BaseException" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Python_IsErrorType_Warning_Detected()
    {
        var c = new Python.ClassInfo { Name = "DeprecationNotice", Base = "Warning" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Python_IsErrorType_QualifiedBase_Detected()
    {
        var c = new Python.ClassInfo { Name = "MyError", Base = "builtins.ValueError" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Python_IsErrorType_GenericLikeBase_Detected()
    {
        // Python uses [] for generics, e.g. Exception[T]
        var c = new Python.ClassInfo { Name = "TypedError", Base = "Exception[ErrorDetail]" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void Python_IsErrorType_FalsePositivePrevention_ErrorUtilBase()
    {
        // Base containing "Error" in middle but not ending with it
        var c = new Python.ClassInfo { Name = "Helper", Base = "ErrorProcessor" };
        Assert.False(c.IsErrorType);
    }

    [Fact]
    public void Python_IsErrorType_NamedError_NoBase_NotDetected()
    {
        var c = new Python.ClassInfo { Name = "ValidationError" };
        Assert.False(c.IsErrorType);
    }

    [Fact]
    public void TypeScript_IsErrorType_GenericExtends_Detected()
    {
        var c = new TypeScript.ClassInfo { Name = "RestError", Extends = "Error<ErrorResponse>" };
        Assert.True(c.IsErrorType);
    }

    [Fact]
    public void TypeScript_IsErrorType_FalsePositivePrevention_ErrorHandlerBase()
    {
        var c = new TypeScript.ClassInfo { Name = "MyHandler", Extends = "ErrorHandler" };
        Assert.False(c.IsErrorType);
    }

    [Fact]
    public void TypeScript_IsErrorType_NamedError_NoExtends_NotDetected()
    {
        // Named "FooError" but no extends → not an error type
        var c = new TypeScript.ClassInfo { Name = "FooError" };
        Assert.False(c.IsErrorType);
    }

    #endregion

    #region Options Name Heuristic Removed Edge Cases

    [Fact]
    public void DotNet_TruncationPriority_OptionsNameNoLongerSpecial()
    {
        // Types named "Options" should no longer get a special priority level
        var options = new DotNet.TypeInfo
        {
            Name = "ChatOptions",
            Kind = "class",
            Members = [new MemberInfo { Name = "MaxTokens", Kind = "property", Signature = "int" }]
        };

        // Should be a model type (properties only), priority 2 — not special priority 1
        Assert.True(options.IsModelType);
        Assert.Equal(2, options.TruncationPriority);
    }

    [Fact]
    public void DotNet_TruncationPriority_SettingsNameNoLongerSpecial()
    {
        var settings = new DotNet.TypeInfo
        {
            Name = "AppSettings",
            Kind = "class",
            Members = [new MemberInfo { Name = "Endpoint", Kind = "property", Signature = "string" }]
        };

        Assert.True(settings.IsModelType);
        Assert.Equal(2, settings.TruncationPriority);
    }

    [Fact]
    public void Go_TruncationPriority_OptionsNameNoLongerSpecial()
    {
        var opts = new Go.StructApi
        {
            Name = "ClientOptions",
            Fields = [new Go.FieldApi { Name = "MaxRetries", Type = "int" }]
        };

        Assert.True(opts.IsModelType);
        Assert.Equal(2, opts.TruncationPriority);
    }

    [Fact]
    public void Java_TruncationPriority_ConfigNameNoLongerSpecial()
    {
        var config = new Java.ClassInfo
        {
            Name = "ConnectionConfig",
            Fields = [new Java.FieldInfo { Name = "endpoint", Type = "String" }]
        };

        Assert.True(config.IsModelType);
        Assert.Equal(2, config.TruncationPriority);
    }

    [Fact]
    public void Python_TruncationPriority_OptionsNameNoLongerSpecial()
    {
        var opts = new Python.ClassInfo
        {
            Name = "RequestOptions",
            Properties = [new Python.PropertyInfo("timeout", "float", null)]
        };

        Assert.True(opts.IsModelType);
        Assert.Equal(2, opts.TruncationPriority);
    }

    [Fact]
    public void TypeScript_TruncationPriority_ConfigNameNoLongerSpecial()
    {
        var config = new TypeScript.ClassInfo
        {
            Name = "ServiceConfig",
            Properties = [new TypeScript.PropertyInfo { Name = "endpoint", Type = "string" }]
        };

        Assert.True(config.IsModelType);
        Assert.Equal(2, config.TruncationPriority);
    }

    #endregion

    #region Issue 3b: Case Sensitivity Tests

    [Fact]
    public void TypeScript_BuildSignatureLookup_IsCaseSensitive()
    {
        var apiIndex = new TypeScript.ApiIndex
        {
            Package = "@test/pkg",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "MyClient",
                            Methods =
                            [
                                new TypeScript.MethodInfo { Name = "send", Sig = "(msg: string)", Ret = "void" },
                                new TypeScript.MethodInfo { Name = "Send", Sig = "(msg: string)", Ret = "void" }
                            ]
                        }
                    ]
                }
            ]
        };

        var lookup = TypeScriptUsageAnalyzer.BuildSignatureLookup(apiIndex);

        // Both "send" and "Send" should be separate entries (case-sensitive)
        Assert.True(lookup.ContainsKey("MyClient.send"));
        Assert.True(lookup.ContainsKey("MyClient.Send"));
        Assert.NotEqual(lookup["MyClient.send"], lookup["MyClient.Send"]);
    }

    [Fact]
    public void TypeScript_BuildSignatureLookup_DoesNotMatchWrongCase()
    {
        var apiIndex = new TypeScript.ApiIndex
        {
            Package = "@test/pkg",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "MyClient",
                            Methods =
                            [
                                new TypeScript.MethodInfo { Name = "send", Sig = "(msg: string)", Ret = "void" }
                            ]
                        }
                    ]
                }
            ]
        };

        var lookup = TypeScriptUsageAnalyzer.BuildSignatureLookup(apiIndex);

        Assert.True(lookup.ContainsKey("MyClient.send"));
        Assert.False(lookup.ContainsKey("MyClient.SEND"));
        Assert.False(lookup.ContainsKey("myclient.send"));
    }

    [Fact]
    public void Java_BuildSignatureLookup_IsCaseSensitive()
    {
        var apiIndex = new Java.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new Java.ClassInfo
                        {
                            Name = "MyClient",
                            Methods =
                            [
                                new Java.MethodInfo { Name = "send", Sig = "(String msg)", Ret = "void" },
                                new Java.MethodInfo { Name = "Send", Sig = "(String msg)", Ret = "Response" }
                            ]
                        }
                    ]
                }
            ]
        };

        var lookup = JavaUsageAnalyzer.BuildSignatureLookup(apiIndex);

        Assert.True(lookup.ContainsKey("MyClient.send"));
        Assert.True(lookup.ContainsKey("MyClient.Send"));
    }

    [Fact]
    public void Java_BuildSignatureLookup_DoesNotMatchWrongCase()
    {
        var apiIndex = new Java.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new Java.ClassInfo
                        {
                            Name = "MyClient",
                            Methods =
                            [
                                new Java.MethodInfo { Name = "send", Sig = "(String msg)", Ret = "void" }
                            ]
                        }
                    ]
                }
            ]
        };

        var lookup = JavaUsageAnalyzer.BuildSignatureLookup(apiIndex);

        Assert.True(lookup.ContainsKey("MyClient.send"));
        Assert.False(lookup.ContainsKey("MyClient.SEND"));
        Assert.False(lookup.ContainsKey("myclient.send"));
    }

    #endregion

    #region Issue 2e: FormatWithCoverage Dependency Inclusion Tests

    [Fact]
    public void TypeScript_FormatWithCoverage_IncludesExternalDependencyTypes()
    {
        var api = new TypeScript.ApiIndex
        {
            Package = "@test/storage",
            Modules =
            [
                new TypeScript.ModuleInfo
                {
                    Name = "index",
                    Classes =
                    [
                        new TypeScript.ClassInfo
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods = [new TypeScript.MethodInfo { Name = "upload", Sig = "(data: Uint8Array)", Ret = "Promise<void>" }]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new TypeScript.DependencyInfo
                {
                    Package = "@example/core-client",
                    Classes = [new TypeScript.ClassInfo { Name = "ServiceClient", Properties = [new TypeScript.PropertyInfo { Name = "endpoint", Type = "string" }] }],
                    Interfaces = [new TypeScript.InterfaceInfo { Name = "OperationOptions", Properties = [new TypeScript.PropertyInfo { Name = "abortSignal", Type = "AbortSignal" }] }]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = [new UncoveredOperation { ClientType = "BlobClient", Operation = "upload", Signature = "upload(...)" }]
        };

        var result = TypeScriptFormatter.FormatWithCoverage(api, coverage, 10000);

        Assert.Contains("BlobClient", result);
        Assert.Contains("ServiceClient", result);
        Assert.Contains("OperationOptions", result);
    }

    [Fact]
    public void Go_FormatWithCoverage_IncludesExternalDependencyTypes()
    {
        var api = new Go.ApiIndex
        {
            Package = "testpkg",
            Packages =
            [
                new Go.PackageApi
                {
                    Name = "testpkg",
                    Structs =
                    [
                        new Go.StructApi
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods = [new Go.FuncApi { Name = "Upload", Sig = "(data []byte)", Ret = "error" }]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new Go.DependencyInfo
                {
                    Package = "github.com/example/sdk-for-go/sdk/azcore",
                    Structs = [new Go.StructApi { Name = "ClientOptions", Fields = [new Go.FieldApi { Name = "Retry", Type = "RetryOptions" }] }]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = [new UncoveredOperation { ClientType = "BlobClient", Operation = "Upload", Signature = "Upload(...)" }]
        };

        var result = GoFormatter.FormatWithCoverage(api, coverage, 10000);

        Assert.Contains("BlobClient", result);
        Assert.Contains("ClientOptions", result);
    }

    [Fact]
    public void Java_FormatWithCoverage_IncludesExternalDependencyTypes()
    {
        var api = new Java.ApiIndex
        {
            Package = "com.test",
            Packages =
            [
                new Java.PackageInfo
                {
                    Name = "com.test",
                    Classes =
                    [
                        new Java.ClassInfo
                        {
                            Name = "BlobClient",
                            EntryPoint = true,
                            Methods = [new Java.MethodInfo { Name = "upload", Sig = "(byte[] data)", Ret = "void" }]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new Java.DependencyInfo
                {
                    Package = "com.example:example-core",
                    Classes = [new Java.ClassInfo { Name = "HttpClient", Fields = [new Java.FieldInfo { Name = "baseUrl", Type = "String" }] }],
                    Interfaces = [new Java.ClassInfo { Name = "TokenCredential", Methods = [new Java.MethodInfo { Name = "getToken", Sig = "()", Ret = "AccessToken" }] }]
                }
            ]
        };

        var coverage = new UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = [new UncoveredOperation { ClientType = "BlobClient", Operation = "upload", Signature = "upload(...)" }]
        };

        var result = JavaFormatter.FormatWithCoverage(api, coverage, 10000);

        Assert.Contains("BlobClient", result);
        Assert.Contains("HttpClient", result);
        Assert.Contains("TokenCredential", result);
    }

    #endregion

    #region Issue 2d: Consistent GraphAsync Return Type Tests

    [Fact]
    public void AllLanguages_PublicGraphAsync_ReturnsNonNullableSignature()
    {
        // Verify all 5 engines' public GraphAsync return Task<ApiIndex> (non-nullable)
        // by checking the method info via reflection
        var tsMethod = typeof(TypeScriptPublicApiGraphEngine).GetMethod("GraphAsync", [typeof(string), typeof(CancellationToken)]);
        var goMethod = typeof(GoPublicApiGraphEngine).GetMethod("GraphAsync", [typeof(string), typeof(CancellationToken)]);
        var javaMethod = typeof(JavaPublicApiGraphEngine).GetMethod("GraphAsync", [typeof(string), typeof(CancellationToken)]);
        var csMethod = typeof(CSharpPublicApiGraphEngine).GetMethod("GraphAsync", [typeof(string), typeof(CancellationToken)]);
        var pyMethod = typeof(PythonPublicApiGraphEngine).GetMethod("GraphAsync", [typeof(string), typeof(CancellationToken)]);

        Assert.NotNull(tsMethod);
        Assert.NotNull(goMethod);
        Assert.NotNull(javaMethod);
        Assert.NotNull(csMethod);
        Assert.NotNull(pyMethod);

        // All should return Task<ApiIndex> (not Task<ApiIndex?>)
        // The generic argument of the Task should be a non-nullable reference type
        static void AssertNonNullableReturn(System.Reflection.MethodInfo method, string lang)
        {
            var returnType = method.ReturnType;
            Assert.True(returnType.IsGenericType, $"{lang} GraphAsync should return generic Task<T>");
            var typeArg = returnType.GetGenericArguments()[0];
            // If the return type were nullable, the NullabilityInfoContext would show it
            var nullCtx = new System.Reflection.NullabilityInfoContext();
            var nullInfo = nullCtx.Create(method.ReturnParameter);
            // For Task<T>, check the generic type argument nullability
            Assert.NotEmpty(nullInfo.GenericTypeArguments);
            Assert.Equal(System.Reflection.NullabilityState.NotNull, nullInfo.GenericTypeArguments[0].ReadState);
        }

        AssertNonNullableReturn(tsMethod, "TypeScript");
        AssertNonNullableReturn(goMethod, "Go");
        AssertNonNullableReturn(javaMethod, "Java");
        AssertNonNullableReturn(csMethod, "C#");
        AssertNonNullableReturn(pyMethod, "Python");
    }

    #endregion

    #region Issue 2a: CSharpFormatter Property Ordering Tests

    [Fact]
    public void DotNet_CSharpFormatter_StaticPropsBeforeInstanceProps()
    {
        var api = new DotNet.ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestNs",
                    Types =
                    [
                        new DotNet.TypeInfo
                        {
                            Name = "MyClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new MemberInfo { Name = "InstanceProp", Kind = "property", Signature = "string InstanceProp { get; set; }", IsStatic = false },
                                new MemberInfo { Name = "StaticProp", Kind = "property", Signature = "int StaticProp { get; }", IsStatic = true },
                                new MemberInfo { Name = "DoWork", Kind = "method", Signature = "() -> void" }
                            ]
                        }
                    ]
                }
            ]
        };

        var result = CSharpFormatter.Format(api);

        // Static property should appear before instance property
        var staticIdx = result.IndexOf("StaticProp", StringComparison.Ordinal);
        var instanceIdx = result.IndexOf("InstanceProp", StringComparison.Ordinal);
        Assert.True(staticIdx >= 0, "StaticProp not found");
        Assert.True(instanceIdx >= 0, "InstanceProp not found");
        Assert.True(staticIdx < instanceIdx,
            $"StaticProp (pos {staticIdx}) should appear before InstanceProp (pos {instanceIdx})");
    }

    #endregion
}
