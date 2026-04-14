// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.DotNet;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Unit tests for CSharpFormatter.
/// Uses in-memory model construction — no external runtimes required.
/// </summary>
public class CSharpFormatterTests
{
    #region Namespace Grouping

    [Fact]
    public void Format_GroupsTypesByNamespace()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg.Models",
                    Types = [MakeClass("Foo", "property", "Bar Baz { get; }")]
                },
                new NamespaceInfo
                {
                    Name = "TestPkg.Clients",
                    Types = [MakeClass("TestClient", "method", "void DoWork()")]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("namespace TestPkg.Models", stubs);
        Assert.Contains("namespace TestPkg.Clients", stubs);
    }

    [Fact]
    public void Format_SingleNamespace_OmitsRedundantGrouping()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types = [MakeClass("Foo", "property", "string Name { get; }")]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("class Foo", stubs);
        Assert.Contains("Name", stubs);
    }

    #endregion

    #region Generic Types

    [Fact]
    public void Format_GenericClass_RendersTypeParameters()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "Response<T>",
                            Kind = "class",
                            Members =
                            [
                                new MemberInfo { Name = "Value", Kind = "property", Signature = "T Value { get; }" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("Response<T>", stubs);
        Assert.Contains("T Value { get; }", stubs);
    }

    #endregion

    #region Enum Formatting

    [Fact]
    public void Format_Enum_RendersValues()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "Color",
                            Kind = "enum",
                            Values = ["Red", "Green", "Blue"]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("enum Color", stubs);
        Assert.Contains("Red", stubs);
        Assert.Contains("Green", stubs);
        Assert.Contains("Blue", stubs);
    }

    #endregion

    #region Inheritance and Interfaces

    [Fact]
    public void Format_ClassWithBaseAndInterfaces_RendersInheritanceChain()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "MyClient",
                            Kind = "class",
                            Base = "BaseClient",
                            Interfaces = ["IDisposable"],
                            Members =
                            [
                                new MemberInfo { Name = "Send", Kind = "method", Signature = "void Send(string msg)" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("BaseClient", stubs);
        Assert.Contains("IDisposable", stubs);
    }

    #endregion

    #region Delegate Formatting

    [Fact]
    public void Format_Delegate_RendersCorrectly()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "MyHandler",
                            Kind = "delegate",
                            Members =
                            [
                                new MemberInfo { Name = "Invoke", Kind = "method", Signature = "void Invoke(object sender, EventArgs e)" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        // The delegate should at minimum include its name and signature
        Assert.Contains("MyHandler", stubs);
    }

    #endregion

    #region Static Members

    [Fact]
    public void Format_StaticMember_RendersStaticKeyword()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "Helper",
                            Kind = "class",
                            Members =
                            [
                                new MemberInfo
                                {
                                    Name = "Create",
                                    Kind = "method",
                                    Signature = "Helper Create(string name)",
                                    IsStatic = true
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("static", stubs);
        Assert.Contains("Create", stubs);
    }

    #endregion

    #region Async Methods

    [Fact]
    public void Format_AsyncMethod_RendersAsyncKeyword()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "Client",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new MemberInfo
                                {
                                    Name = "GetAsync",
                                    Kind = "method",
                                    Signature = "Task<Response> GetAsync(string id)",
                                    IsAsync = true
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("GetAsync", stubs);
        Assert.Contains("Task<Response>", stubs);
    }

    #endregion

    #region Smart Truncation

    [Fact]
    public void Format_ClientTypesFirst_InSmartTruncation()
    {
        var clientType = new TypeInfo
        {
            Name = "ImportantClient",
            Kind = "class",
            EntryPoint = true,
            Members =
            [
                new MemberInfo { Name = "DoWork", Kind = "method", Signature = "void DoWork()" }
            ]
        };

        var modelType = new TypeInfo
        {
            Name = "SomeModel",
            Kind = "class",
            Members =
            [
                new MemberInfo { Name = "Value", Kind = "property", Signature = "string Value { get; }" }
            ]
        };

        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    // Model declared first, client second
                    Types = [modelType, clientType]
                }
            ]
        };

        // Small budget — should prioritize client
        var stubs = CSharpFormatter.Format(index, 500);

        Assert.Contains("ImportantClient", stubs);
    }

    [Fact]
    public void Format_TruncatesWithMessage_WhenBudgetExceeded()
    {
        var types = Enumerable.Range(0, 50).Select(i =>
            new TypeInfo
            {
                Name = $"Model{i}",
                Kind = "class",
                Members =
                [
                    new MemberInfo { Name = "Prop", Kind = "property", Signature = $"string Prop{i} {{ get; set; }}" }
                ]
            }).ToList();

        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces = [new NamespaceInfo { Name = "TestPkg", Types = types }]
        };

        // Very small budget
        var stubs = CSharpFormatter.Format(index, 400);

        Assert.Contains("truncated", stubs);
    }

    #endregion

    #region Empty / Edge Cases

    [Fact]
    public void Format_EmptyNamespace_ProducesNoOutput()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces = [new NamespaceInfo { Name = "TestPkg", Types = [] }]
        };

        var stubs = CSharpFormatter.Format(index);

        // Should have the header but no type blocks
        Assert.Contains("TestPkg", stubs);
        Assert.DoesNotContain("class", stubs);
    }

    [Fact]
    public void Format_TypeWithDocComment_RendersDoc()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "Widget",
                            Kind = "class",
                            Doc = "A widget for doing things.",
                            Members =
                            [
                                new MemberInfo { Name = "Size", Kind = "property", Signature = "int Size { get; }" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = CSharpFormatter.Format(index);

        Assert.Contains("A widget for doing things", stubs);
    }

    #endregion

    #region FormatWithCoverage

    [Fact]
    public void FormatWithCoverage_ShowsOnlyUncoveredOperations()
    {
        var index = new ApiIndex
        {
            Package = "TestPkg",
            Namespaces =
            [
                new NamespaceInfo
                {
                    Name = "TestPkg",
                    Types =
                    [
                        new TypeInfo
                        {
                            Name = "MyClient",
                            Kind = "class",
                            EntryPoint = true,
                            Members =
                            [
                                new MemberInfo { Name = "Get", Kind = "method", Signature = "Item Get(string id)" },
                                new MemberInfo { Name = "Delete", Kind = "method", Signature = "void Delete(string id)" },
                                new MemberInfo { Name = "Name", Kind = "property", Signature = "string Name { get; }" }
                            ]
                        }
                    ]
                }
            ]
        };

        var coverage = new Contracts.UsageIndex
        {
            FileCount = 1,
            CoveredOperations = [new Contracts.OperationUsage { ClientType = "MyClient", Operation = "Get", File = "test.cs", Line = 1 }],
            UncoveredOperations = [new Contracts.UncoveredOperation { ClientType = "MyClient", Operation = "Delete", Signature = "Delete(string id)" }]
        };

        var stubs = CSharpFormatter.FormatWithCoverage(index, coverage, int.MaxValue);

        // Should contain the uncovered operation
        Assert.Contains("Delete", stubs);
    }

    #endregion

    #region Helpers

    private static TypeInfo MakeClass(string name, string memberKind, string signature)
    {
        return new TypeInfo
        {
            Name = name,
            Kind = "class",
            Members =
            [
                new MemberInfo { Name = name + "Member", Kind = memberKind, Signature = signature }
            ]
        };
    }

    #endregion
}
