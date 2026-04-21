// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for <see cref="TypeScriptModelHelpers.ParseSignatureParams"/> covering
/// parameter type extraction and optional-count logic.
/// </summary>
public class ParseSignatureParamsTests
{
    // ─── Empty / whitespace ───

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public void EmptyOrWhitespace_ReturnsEmptyTypesAndZeroOptional(string? sig)
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(sig!);

        Assert.Empty(types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Single required param ───

    [Fact]
    public void SingleRequiredParam_ReturnsSingleTypeZeroOptional()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams("x: string");

        Assert.Equal(["string"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Single optional param ───

    [Fact]
    public void SingleOptionalParam_ReturnsSingleTypeOneOptional()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams("x?: string");

        Assert.Equal(["string"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Param with default value ───

    [Fact]
    public void ParamWithDefault_StripsDefaultAndCountsAsOptional()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams("x: string = \"hello\"");

        Assert.Equal(["string"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Rest param ───

    [Fact]
    public void RestParam_StripsEllipsisAndReturnsType()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams("...args: string[]");

        Assert.Equal(["string[]"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Multiple mixed params ───

    [Fact]
    public void MultipleParams_ExtractsAllTypesAndCountsOptional()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "a: string, b: number, c?: boolean");

        Assert.Equal(["string", "number", "boolean"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Nested generic type ───

    [Fact]
    public void NestedGeneric_DoesNotSplitOnInnerComma()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "options: Map<string, Array<number>>");

        Assert.Equal(["Map<string, Array<number>>"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Destructured param ───

    [Fact]
    public void DestructuredParam_DoesNotCrash()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "{ a, b }: Options");

        // The colon after "}" is found; type extracted is "Options"
        Assert.Equal(["Options"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Arrow function type in param ───

    [Fact]
    public void ArrowFunctionType_PreservesArrowSyntax()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "fn: (x: string) => void");

        // The "=>" inside the type should not be treated as a default-value "="
        Assert.Equal(["(x: string) => void"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Multiple optional and required params ───

    [Fact]
    public void MixedOptionalAndDefault_CountsBothAsOptional()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "a: string, b?: number, c: boolean = true");

        Assert.Equal(["string", "number", "boolean"], types);
        Assert.Equal(2, optionalCount);
    }

    // ─── Param with no type annotation (edge case) ───

    [Fact]
    public void NoTypeAnnotation_UsesWholeStringAsType()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams("x");

        // No colon found, so the whole trimmed string becomes the type
        Assert.Equal(["x"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Complex real-world signature (generics, multiple params) ───

    [Fact]
    public void ComplexSignature_HandlesMultipleGenerics()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "items: Array<T>, mapper: Record<string, number>, options?: SortOptions<T>");

        Assert.Equal(["Array<T>", "Record<string, number>", "SortOptions<T>"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Rest param with optional before it ───

    [Fact]
    public void RestParamWithOptionalBefore_CountsOptionalCorrectly()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "sep?: string, ...parts: string[]");

        Assert.Equal(["string", "string[]"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── String literal default containing comma ───

    [Fact]
    public void StringLiteralDefaultWithComma_DoesNotSplitInsideString()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "x: string = \"a,b\", y: number");

        Assert.Equal(["string", "number"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Template literal type containing comma ───

    [Fact]
    public void TemplateLiteralType_DoesNotSplitInsideBackticks()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "x: `${string},${string}`, y: number");

        Assert.Equal(["`${string},${string}`", "number"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Escaped quotes inside string literal ───

    [Fact]
    public void EscapedQuotesInStringLiteral_DoesNotEndStringEarly()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "x: string = \"say \\\"hello\\\"\", y: number");

        Assert.Equal(["string", "number"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Template literal type containing colon ───

    [Fact]
    public void TemplateLiteralTypeWithColon_DoesNotSplitAtColonInsideBackticks()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "x: `key:${string}`");

        Assert.Equal(["`key:${string}`"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── String default containing equals ───

    [Fact]
    public void StringDefaultWithEquals_CorrectlyIdentifiesOptionalParam()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "x: string = \"a=b\"");

        Assert.Equal(["string"], types);
        Assert.Equal(1, optionalCount);
    }

    // ─── Backtick with nested expression containing generics ───

    [Fact]
    public void BacktickWithNestedGenericExpression_DoesNotSplitInsideTemplate()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "x: `${A<B,C>}`, y: number");

        Assert.Equal(["`${A<B,C>}`", "number"], types);
        Assert.Equal(0, optionalCount);
    }

    // ─── Arrow function parameters with defaults ───

    [Fact]
    public void ArrowCallbackWithDefault_DetectsOptionalParam()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "fn: (x: string) => void = undefined, y: number");

        Assert.Equal(["(x: string) => void", "number"], types);
        Assert.Equal(1, optionalCount);
    }

    [Fact]
    public void ArrowCallback_NoDefault_NotOptional()
    {
        var (types, optionalCount) = TypeScriptModelHelpers.ParseSignatureParams(
            "callback: () => boolean, next: string");

        Assert.Equal(["() => boolean", "string"], types);
        Assert.Equal(0, optionalCount);
    }
}
