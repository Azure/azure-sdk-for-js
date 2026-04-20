// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for <see cref="TypeNameParser"/> covering Parse, SplitAtTopLevel,
/// TryParseArrowFunction, and edge cases.
/// </summary>
public class TypeNameParserTests
{
    // ─── Parse: simple generic ───

    [Fact]
    public void Parse_SimpleGeneric_ExtractsBaseNameAndTypeArguments()
    {
        var result = TypeNameParser.Parse("Map<string, int>");

        Assert.Equal("Map", result.BaseName);
        Assert.Equal(["string", "int"], result.GenericParameters);
        Assert.True(result.IsGeneric);
    }

    // ─── Parse: nested generic ───

    [Fact]
    public void Parse_NestedGeneric_PreservesInnerGenericAsRawString()
    {
        var result = TypeNameParser.Parse("Map<string, List<int>>");

        Assert.Equal("Map", result.BaseName);
        Assert.Equal(2, result.GenericParameters.Count);
        Assert.Equal("string", result.GenericParameters[0]);
        Assert.Equal("List<int>", result.GenericParameters[1]);
    }

    // ─── Parse: deeply nested generic ───

    [Fact]
    public void Parse_DeeplyNestedGeneric_HandlesMultipleLevels()
    {
        var result = TypeNameParser.Parse("Promise<Map<string, Set<number>>>");

        Assert.Equal("Promise", result.BaseName);
        Assert.Single(result.GenericParameters);
        Assert.Equal("Map<string, Set<number>>", result.GenericParameters[0]);
    }

    // ─── Parse: bracket-style generics ───

    [Fact]
    public void Parse_BracketGenerics_ExtractsParametersFromSquareBrackets()
    {
        var result = TypeNameParser.Parse("Dict[str, int]");

        Assert.Equal("Dict", result.BaseName);
        Assert.Equal(["str", "int"], result.GenericParameters);
    }

    // ─── Parse: arrow function (not generic) ───

    [Fact]
    public void Parse_ArrowFunction_FallsBackToNonGeneric()
    {
        // Arrow functions start with '(' so there is no baseName before a delimiter
        var result = TypeNameParser.Parse("(a: string) => void");

        // Parse treats this as non-generic because '<' / '[' never appears after an identifier
        Assert.Equal("(a: string) => void", result.BaseName);
        Assert.Empty(result.GenericParameters);
        Assert.False(result.IsGeneric);
    }

    [Fact]
    public void TryParseArrowFunction_ValidArrow_ExtractsParameterTypesAndReturnType()
    {
        var result = TypeNameParser.TryParseArrowFunction("(a: string, b: number) => void");

        Assert.NotNull(result);
        Assert.Equal(["string", "number"], result.Value.ParameterTypes);
        Assert.Equal("void", result.Value.ReturnType);
    }

    // ─── Parse: no generics ───

    [Fact]
    public void Parse_NoGenerics_ReturnsBaseNameOnly()
    {
        var result = TypeNameParser.Parse("SimpleType");

        Assert.Equal("SimpleType", result.BaseName);
        Assert.Empty(result.GenericParameters);
        Assert.False(result.IsGeneric);
    }

    // ─── Parse: empty input ───

    [Fact]
    public void Parse_EmptyString_ReturnsEmptyBaseName()
    {
        var result = TypeNameParser.Parse("");

        Assert.Equal("", result.BaseName);
        Assert.Empty(result.GenericParameters);
    }

    [Fact]
    public void Parse_Null_ReturnsEmptyBaseName()
    {
        var result = TypeNameParser.Parse(null!);

        Assert.Equal("", result.BaseName);
        Assert.Empty(result.GenericParameters);
    }

    // ─── Parse: unbalanced brackets ───

    [Fact]
    public void Parse_UnbalancedBrackets_ReturnsBaseNameWithoutCrash()
    {
        var result = TypeNameParser.Parse("Foo<Bar");

        Assert.Equal("Foo", result.BaseName);
        Assert.Empty(result.GenericParameters);
    }

    // ─── SplitAtTopLevel: object literal type ───

    [Fact]
    public void SplitAtTopLevel_ObjectLiteralType_DoesNotSplitInsideBraces()
    {
        var result = TypeNameParser.SplitAtTopLevel("{ key: string; value: number }, Foo", ',');

        Assert.Equal(2, result.Count);
        Assert.Equal("{ key: string; value: number }", result[0]);
        Assert.Equal("Foo", result[1]);
    }

    // ─── SplitAtTopLevel: union in generic context ───

    [Fact]
    public void SplitAtTopLevel_UnionInGeneric_SplitsOnlyAtTopLevelComma()
    {
        var result = TypeNameParser.SplitAtTopLevel("string | number, boolean", ',');

        Assert.Equal(2, result.Count);
        Assert.Equal("string | number", result[0]);
        Assert.Equal("boolean", result[1]);
    }

    // ─── SplitAtTopLevel: nested braces ───

    [Fact]
    public void SplitAtTopLevel_NestedBraces_KeepsNestedObjectsIntact()
    {
        var result = TypeNameParser.SplitAtTopLevel("{ a: { b: string } }, Bar", ',');

        Assert.Equal(2, result.Count);
        Assert.Equal("{ a: { b: string } }", result[0]);
        Assert.Equal("Bar", result[1]);
    }

    // ─── TryParseArrowFunction: top-level colon inside braces ───

    [Fact]
    public void TryParseArrowFunction_ColonInsideBraces_SkippedByFindTopLevelColon()
    {
        // The colon inside the object type { key: string } should be skipped
        var result = TypeNameParser.TryParseArrowFunction("(opts: { key: string }) => void");

        Assert.NotNull(result);
        Assert.Single(result.Value.ParameterTypes);
        Assert.Equal("{ key: string }", result.Value.ParameterTypes[0]);
        Assert.Equal("void", result.Value.ReturnType);
    }

    [Fact]
    public void TryParseArrowFunction_NonArrow_ReturnsNull()
    {
        var result = TypeNameParser.TryParseArrowFunction("string");
        Assert.Null(result);
    }

    [Fact]
    public void TryParseArrowFunction_EmptyString_ReturnsNull()
    {
        var result = TypeNameParser.TryParseArrowFunction("");
        Assert.Null(result);
    }

    // ─── Parse: Theory-based parametric tests ───

    [Theory]
    [InlineData("Response<T>", "Response", new[] { "T" })]
    [InlineData("Array<string>", "Array", new[] { "string" })]
    [InlineData("Tuple[int, str, bool]", "Tuple", new[] { "int", "str", "bool" })]
    public void Parse_VariousGenerics_ExtractsCorrectly(
        string input, string expectedBase, string[] expectedParams)
    {
        var result = TypeNameParser.Parse(input);

        Assert.Equal(expectedBase, result.BaseName);
        Assert.Equal(expectedParams, result.GenericParameters);
    }
}
