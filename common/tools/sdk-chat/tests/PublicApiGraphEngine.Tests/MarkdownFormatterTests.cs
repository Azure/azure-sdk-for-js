// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class MarkdownFormatterTests
{
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    private sealed class MockApiIndex : IApiIndex
    {
        private readonly List<DiagnosticTypeInfo> _types;
        private readonly List<DiagnosticCallableInfo> _topLevel;

        public string Package { get; }
        public string ToJson(bool pretty = false) => "{}";
        public string ToStubs() => "";

        public MockApiIndex(
            string package = "test-package",
            IEnumerable<DiagnosticTypeInfo>? types = null,
            IEnumerable<DiagnosticCallableInfo>? topLevel = null)
        {
            Package = package;
            _types = [.. (types ?? [])];
            _topLevel = [.. (topLevel ?? [])];
        }

        public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() => _types;
        public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => _topLevel;
    }

    private static DiagnosticTypeInfo MakeType(
        string name,
        string? doc = null,
        IReadOnlyList<DiagnosticCallableInfo>? callables = null,
        IReadOnlyList<DiagnosticPropertyInfo>? properties = null) =>
        new()
        {
            Name = name,
            Doc = doc,
            Callables = callables ?? [],
            Properties = properties ?? [],
        };

    private static DiagnosticCallableInfo MakeCallable(string name, string[]? paramTypes = null) =>
        new() { Name = name, ParameterTypes = paramTypes ?? [] };

    // ---------------------------------------------------------------------------
    // Tests
    // ---------------------------------------------------------------------------

    [Fact]
    public void EmptyIndex_ReturnsHeader()
    {
        var index = new MockApiIndex("my-package");

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("# my-package API Reference", output);
    }

    [Fact]
    public void ClassWithConstructor_GroupedUnderClasses()
    {
        // A type whose name matches a callable name is treated as a class.
        var index = new MockApiIndex(types:
        [
            MakeType("Client", callables: [MakeCallable("Client", ["string"])]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("## Classes", output);
        Assert.Contains("### Client", output);
    }

    [Fact]
    public void InterfaceWithMethods_GroupedUnderInterfaces()
    {
        // A type with callables but no constructor callable is treated as an interface.
        var index = new MockApiIndex(types:
        [
            MakeType("IService", callables: [MakeCallable("Execute")]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("## Interfaces", output);
        Assert.Contains("### IService", output);
    }

    [Fact]
    public void SimpleTypeWithNoCallables_GroupedUnderTypes()
    {
        var index = new MockApiIndex(types:
        [
            MakeType("StatusCode"),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("## Types", output);
        Assert.Contains("### StatusCode", output);
    }

    [Fact]
    public void MethodTable_HasCorrectColumns()
    {
        var index = new MockApiIndex(types:
        [
            MakeType("IService", callables: [MakeCallable("Run", ["string", "int"])]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("| Method |", output);
        Assert.Contains("| Parameters |", output);
        Assert.Contains("| Returns |", output);
        Assert.Contains("| Run |", output);
    }

    [Fact]
    public void TypeCrossLinks_KnownTypeLinked()
    {
        // When a parameter type is a known type in the index, it should be cross-linked.
        var index = new MockApiIndex(types:
        [
            MakeType("Client", callables:
            [
                MakeCallable("Client"),          // constructor
                MakeCallable("Create", ["Options"]),
            ]),
            MakeType("Options"),
        ]);

        var output = MarkdownFormatter.Format(index);

        // Options should appear as a Markdown link
        Assert.Contains("[Options](#options)", output);
    }

    [Fact]
    public void PipeEscaping_PipesInTypeNamesEscaped()
    {
        // A parameter type name containing | should be escaped as \|
        var index = new MockApiIndex(types:
        [
            MakeType("IService", callables:
            [
                MakeCallable("Execute", ["string|int"]),
            ]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains(@"\|", output);
        Assert.DoesNotContain("| string|int |", output);
    }

    [Fact]
    public void NonEmpty_HasSubstantialContent()
    {
        var index = new MockApiIndex("azure-sdk", types:
        [
            MakeType("BlobClient", doc: "Azure Blob client.", callables:
            [
                MakeCallable("BlobClient", ["string", "BlobClientOptions"]),
                MakeCallable("Upload", ["string", "Stream"]),
                MakeCallable("Download", ["string"]),
            ]),
            MakeType("BlobClientOptions"),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.True(output.Length > 200, "Expected substantial markdown output");
        Assert.Contains("azure-sdk", output);
        Assert.Contains("BlobClient", output);
        Assert.Contains("Upload", output);
    }

    [Fact]
    public void DocComment_RenderedAsBlockquote()
    {
        var index = new MockApiIndex(types:
        [
            MakeType("Client", doc: "Main entry point.", callables:
            [
                MakeCallable("Client"),  // constructor so it's a class
            ]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("> Main entry point.", output);
    }

    [Fact]
    public void TopLevelCallables_GroupedUnderFunctions()
    {
        var index = new MockApiIndex(topLevel:
        [
            new DiagnosticCallableInfo { Name = "Parse", ParameterTypes = ["string"] },
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("## Functions", output);
        Assert.Contains("| Parse |", output);
    }

    [Fact]
    public void TableOfContents_EmittedAfterH1()
    {
        var index = new MockApiIndex("my-pkg", types:
        [
            MakeType("Client", callables: [MakeCallable("Client")]),
            MakeType("IService", callables: [MakeCallable("Execute")]),
            MakeType("StatusEnum"),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("## Table of Contents", output);
        // ToC should appear before the type sections
        Assert.True(output.IndexOf("## Table of Contents", StringComparison.Ordinal) <
                    output.IndexOf("## Classes", StringComparison.Ordinal));
        Assert.Contains("[Client](#client)", output);
        Assert.Contains("[IService](#iservice)", output);
        Assert.Contains("[StatusEnum](#statusenum)", output);
    }

    [Fact]
    public void PropertyTable_EmittedAfterMethods()
    {
        var index = new MockApiIndex(types:
        [
            MakeType("Config",
                callables: [MakeCallable("Config")],
                properties: [new DiagnosticPropertyInfo { Name = "Timeout", TypeName = "number" }]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("#### Properties", output);
        Assert.Contains("| Property |", output);
        Assert.Contains("| Type |", output);
        Assert.Contains("| Timeout |", output);
        Assert.Contains("number", output);
    }

    [Fact]
    public void PropertyType_CrossLinked_WhenKnown()
    {
        var index = new MockApiIndex(types:
        [
            MakeType("Client",
                callables: [MakeCallable("Client")],
                properties: [new DiagnosticPropertyInfo { Name = "Options", TypeName = "ClientOptions" }]),
            MakeType("ClientOptions"),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("[ClientOptions](#clientoptions)", output);
    }

    [Fact]
    public void ReturnType_ShownInMethodTable()
    {
        var callable = new DiagnosticCallableInfo
        {
            Name = "GetToken",
            ParameterTypes = ["string[]"],
            ReturnType = "AccessToken",
        };
        var index = new MockApiIndex(types:
        [
            MakeType("ICredential", callables: [callable]),
        ]);

        var output = MarkdownFormatter.Format(index);

        Assert.Contains("| Returns |", output);
        Assert.Contains("AccessToken", output);
    }
}
