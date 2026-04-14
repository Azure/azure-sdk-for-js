// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class MermaidFormatterTests
{
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    private sealed class MockApiIndex : IApiIndex
    {
        private readonly List<DiagnosticTypeInfo> _types;
        private readonly List<DiagnosticCallableInfo> _topLevel;

        public string Package => "test-package";
        public string ToJson(bool pretty = false) => "{}";
        public string ToStubs() => "";

        public MockApiIndex(
            IEnumerable<DiagnosticTypeInfo>? types = null,
            IEnumerable<DiagnosticCallableInfo>? topLevel = null)
        {
            _types = [.. (types ?? [])];
            _topLevel = [.. (topLevel ?? [])];
        }

        public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() => _types;
        public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => _topLevel;
    }

    private static DiagnosticTypeInfo MakeType(
        string name,
        IReadOnlyList<DiagnosticCallableInfo>? callables = null,
        IReadOnlyList<DiagnosticPropertyInfo>? properties = null) =>
        new()
        {
            Name = name,
            Callables = callables ?? [],
            Properties = properties ?? [],
        };

    private static DiagnosticCallableInfo MakeCallable(string name, string[]? paramTypes = null) =>
        new() { Name = name, ParameterTypes = paramTypes ?? [] };

    private static DiagnosticPropertyInfo MakeProp(string name, string? typeName = null) =>
        new() { Name = name, TypeName = typeName };

    // ---------------------------------------------------------------------------
    // Tests
    // ---------------------------------------------------------------------------

    [Fact]
    public void EmptyIndex_ReturnsMinimalDiagram()
    {
        var index = new MockApiIndex();

        var output = MermaidFormatter.Format(index);

        Assert.Contains("classDiagram", output);
        // Should start with fenced code block marker
        Assert.StartsWith("```mermaid", output.TrimStart());
    }

    [Fact]
    public void FencedCodeBlock_StartsAndEnds()
    {
        var index = new MockApiIndex([MakeType("MyClass")]);

        var output = MermaidFormatter.Format(index);

        Assert.StartsWith("```mermaid", output.TrimStart());
        Assert.Contains("```", output[3..]); // ends with closing fence
    }

    [Fact]
    public void SingleClass_EmitsClassBlock()
    {
        var index = new MockApiIndex(
        [
            MakeType("Client", [MakeCallable("GetItem", ["string"])]),
        ]);

        var output = MermaidFormatter.Format(index);

        Assert.Contains("class Client", output);
        Assert.Contains("GetItem", output);
    }

    [Fact]
    public void Relationship_EmitsEdge_WhenParamTypeIsKnown()
    {
        // TypeA.Process takes TypeB → should emit A --> B edge
        var index = new MockApiIndex(
        [
            MakeType("TypeA", [MakeCallable("Process", ["TypeB"])]),
            MakeType("TypeB"),
        ]);

        var output = MermaidFormatter.Format(index);

        Assert.Contains("TypeA --> TypeB", output);
        Assert.Contains("uses", output);
    }

    [Fact]
    public void SelfReference_Excluded()
    {
        // Method returning its own type should NOT produce a self-edge
        var index = new MockApiIndex(
        [
            MakeType("Builder", [MakeCallable("WithName", ["Builder"])]),
        ]);

        var output = MermaidFormatter.Format(index);

        Assert.DoesNotContain("Builder --> Builder", output);
    }

    [Fact]
    public void UnknownParamType_NoEdge()
    {
        // External/unknown types should not produce relationship edges
        var index = new MockApiIndex(
        [
            MakeType("Client", [MakeCallable("Load", ["System.IO.Stream"])]),
        ]);

        var output = MermaidFormatter.Format(index);

        Assert.DoesNotContain("-->", output);
    }

    [Fact]
    public void SpecialCharacters_SanitizedInClassName()
    {
        // Generic type names with < > should be sanitized
        var index = new MockApiIndex(
        [
            MakeType("Response<T>"),
        ]);

        var output = MermaidFormatter.Format(index);

        // The class name in the diagram should not contain raw < or >
        Assert.DoesNotContain("class Response<T>", output);
        Assert.Contains("class Response", output);
    }

    [Fact]
    public void Properties_EmittedInClassBlock()
    {
        var index = new MockApiIndex(
        [
            MakeType("Config", properties: [MakeProp("Timeout", "int")]),
        ]);

        var output = MermaidFormatter.Format(index);

        Assert.Contains("Timeout", output);
    }

    [Fact]
    public void PropertyRelationship_EmitsHasEdge()
    {
        // Config has a property of known type Options → should emit Config --> Options : has
        var index = new MockApiIndex(
        [
            MakeType("Config", properties: [MakeProp("Opts", "Options")]),
            MakeType("Options"),
        ]);

        var output = MermaidFormatter.Format(index);

        Assert.Contains("Config --> Options", output);
        Assert.Contains("has", output);
    }

    [Fact]
    public void ReturnType_AppendedToMethodSignature()
    {
        var callable = new DiagnosticCallableInfo
        {
            Name = "GetToken",
            ParameterTypes = ["string[]"],
            ReturnType = "AccessToken",
        };
        var index = new MockApiIndex(
        [
            MakeType("Client", [callable]),
        ]);

        var output = MermaidFormatter.Format(index);

        // Return type should follow the parameter list
        Assert.Contains("GetToken(string[])", output);
        Assert.Contains("AccessToken", output);
    }

    [Fact]
    public void ArrowFunctionType_SanitizedToReadableForm()
    {
        // TypeScript arrow-function types like "(a: string) => void" break Mermaid syntax
        // and should be converted to a readable fn_... form.
        var callable = MakeCallable("Register", ["(a: string) => void"]);
        var index = new MockApiIndex(
        [
            MakeType("EventBus", [callable]),
        ]);

        var output = MermaidFormatter.Format(index);

        // The raw arrow function syntax must not appear
        Assert.DoesNotContain("(a: string) => void", output);
        // The sanitized form should appear somewhere inside the method signature
        Assert.Contains("fn_", output);
    }

    [Fact]
    public void ColonAndSemicolon_SanitizedInTypeNames()
    {
        // Type names with : or ; should not appear verbatim in the output.
        var callable = MakeCallable("Load", ["key: string; value: number"]);
        var index = new MockApiIndex([MakeType("Loader", [callable])]);

        var output = MermaidFormatter.Format(index);

        Assert.DoesNotContain("key: string; value: number", output);
    }
}
