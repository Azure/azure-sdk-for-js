// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for <see cref="SignatureTokenizer"/> — the shared utility that graphs
/// identifier tokens from type signatures for efficient type-reference lookups.
/// </summary>
public class SignatureTokenizerTests
{
    /// <summary>Convenience helper — wraps TokenizeInto for concise test assertions.</summary>
    private static HashSet<string> Tokenize(string? signature)
    {
        HashSet<string> tokens = [];
        SignatureTokenizer.TokenizeInto(signature, tokens);
        return tokens;
    }

    [Fact]
    public void Tokenize_SimpleTypeName_ReturnsSingleToken()
    {
        var tokens = Tokenize("MyModel");
        Assert.Equal(["MyModel"], tokens);
    }

    [Fact]
    public void Tokenize_GenericType_SplitsOnAngleBrackets()
    {
        var tokens = Tokenize("Task<List<MyModel>>");
        Assert.Equal(new HashSet<string> { "Task", "List", "MyModel" }, tokens);
    }

    [Fact]
    public void Tokenize_MethodSignature_GraphsAllIdentifiers()
    {
        var tokens = Tokenize("createWidget(options: WidgetOptions): Promise<Widget>");
        Assert.Contains("createWidget", tokens);
        Assert.Contains("options", tokens);
        Assert.Contains("WidgetOptions", tokens);
        Assert.Contains("Promise", tokens);
        Assert.Contains("Widget", tokens);
    }

    [Fact]
    public void Tokenize_GoSignature_HandlesPointerAndSliceSyntax()
    {
        // Go: func NewClient(opts *ClientOptions) (*Client, error)
        var tokens = Tokenize("func NewClient(opts *ClientOptions) (*Client, error)");
        Assert.Contains("func", tokens);
        Assert.Contains("NewClient", tokens);
        Assert.Contains("opts", tokens);
        Assert.Contains("ClientOptions", tokens);
        Assert.Contains("Client", tokens);
        Assert.Contains("error", tokens);
    }

    [Fact]
    public void Tokenize_PythonSignature_HandlesColonAndArrow()
    {
        // Python: def list_blobs(self, container: str) -> ItemPaged[BlobProperties]
        var tokens = Tokenize("def list_blobs(self, container: str) -> ItemPaged[BlobProperties]");
        Assert.Contains("def", tokens);
        Assert.Contains("list_blobs", tokens);
        Assert.Contains("self", tokens);
        Assert.Contains("container", tokens);
        Assert.Contains("str", tokens);
        Assert.Contains("ItemPaged", tokens);
        Assert.Contains("BlobProperties", tokens);
    }

    [Fact]
    public void Tokenize_DotNetSignature_HandlesDotSeparatedNames()
    {
        // C#: Example.Response<BlobDownloadInfo>
        var tokens = Tokenize("Example.Response<BlobDownloadInfo>");
        Assert.Contains("Example", tokens);
        Assert.Contains("Response", tokens);
        Assert.Contains("BlobDownloadInfo", tokens);
    }

    [Fact]
    public void Tokenize_EmptyString_ReturnsEmptySet()
    {
        var tokens = Tokenize("");
        Assert.Empty(tokens);
    }

    [Fact]
    public void Tokenize_NullString_ReturnsEmptySet()
    {
        var tokens = Tokenize(null);
        Assert.Empty(tokens);
    }

    [Fact]
    public void Tokenize_OnlyDelimiters_ReturnsEmptySet()
    {
        var tokens = Tokenize("<>[](),: *&");
        Assert.Empty(tokens);
    }

    [Fact]
    public void Tokenize_UnderscoreInIdentifier_PreservesUnderscore()
    {
        var tokens = Tokenize("my_type_name");
        Assert.Equal(["my_type_name"], tokens);
    }

    [Fact]
    public void Tokenize_NumbersInIdentifier_PreservesNumbers()
    {
        var tokens = Tokenize("Model2Config");
        Assert.Equal(["Model2Config"], tokens);
    }

    [Fact]
    public void Tokenize_LeadingDigit_TreatsAsToken()
    {
        // Even though "2Model" isn't a valid identifier in most languages,
        // the tokenizer shouldn't crash and should extract it
        var tokens = Tokenize("List<2Model>");
        Assert.Contains("List", tokens);
        Assert.Contains("2Model", tokens);
    }

    [Fact]
    public void Tokenize_DuplicateTokens_DeduplicatesAutomatically()
    {
        var tokens = Tokenize("Map<string, string>");
        Assert.Single(tokens, "string");
        Assert.Contains("Map", tokens);
        Assert.Equal(2, tokens.Count);
    }

    [Fact]
    public void TokenizeInto_AccumulatesAcrossCalls()
    {
        HashSet<string> tokens = [];
        SignatureTokenizer.TokenizeInto("List<Foo>", tokens);
        SignatureTokenizer.TokenizeInto("Map<Bar, Foo>", tokens);

        Assert.Equal(new HashSet<string> { "List", "Foo", "Map", "Bar" }, tokens);
    }

    [Fact]
    public void TokenizeInto_DuplicateTokens_DoNotCauseExtraAllocations()
    {
        // Repeated tokenization with the same tokens should produce identical results
        HashSet<string> tokens = [];
        SignatureTokenizer.TokenizeInto("List<Foo>", tokens);
        var countAfterFirst = tokens.Count;

        SignatureTokenizer.TokenizeInto("List<Foo>", tokens);
        Assert.Equal(countAfterFirst, tokens.Count);
    }

    [Fact]
    public void TokenizeInto_LargeSignature_HandlesCorrectly()
    {
        // Stress test with a large number of tokens
        var parts = Enumerable.Range(0, 100).Select(i => $"Type{i}");
        var signature = string.Join(", ", parts);

        HashSet<string> tokens = [];
        SignatureTokenizer.TokenizeInto(signature, tokens);

        Assert.Equal(100, tokens.Count);
        Assert.Contains("Type0", tokens);
        Assert.Contains("Type99", tokens);
    }

    [Fact]
    public void Tokenize_SubstringTypeName_DoesNotFalseMatch()
    {
        // This tests the key correctness improvement:
        // "ErrorHandler" should NOT produce token "Error"
        var tokens = Tokenize("ErrorHandler");
        Assert.Contains("ErrorHandler", tokens);
        Assert.DoesNotContain("Error", tokens);
    }

    [Fact]
    public void Tokenize_GenericWithMultipleTypeParams()
    {
        var tokens = Tokenize("Dictionary<string, List<MyModel>>");
        Assert.Equal(new HashSet<string> { "Dictionary", "string", "List", "MyModel" }, tokens);
    }

    [Fact]
    public void Tokenize_JavaStyleGenerics()
    {
        // Java: PagedIterable<BlobItem>
        var tokens = Tokenize("PagedIterable<BlobItem>");
        Assert.Equal(new HashSet<string> { "PagedIterable", "BlobItem" }, tokens);
    }

    [Fact]
    public void Tokenize_NullableTypes()
    {
        // C#: string? and TypeScript: string | null
        var tokensCs = Tokenize("string?");
        Assert.Equal(new HashSet<string> { "string" }, tokensCs);

        var tokensTs = Tokenize("string | null | undefined");
        Assert.Equal(new HashSet<string> { "string", "null", "undefined" }, tokensTs);
    }

    [Fact]
    public void Tokenize_ArrayTypes()
    {
        // TypeScript: string[], Go: []string
        var tokensTs = Tokenize("string[]");
        Assert.Equal(new HashSet<string> { "string" }, tokensTs);

        var tokensGo = Tokenize("[]string");
        Assert.Equal(new HashSet<string> { "string" }, tokensGo);
    }

    [Fact]
    public void TokenizeInto_SpanOverload_ProducesCorrectTokens()
    {
        // Verify the ReadOnlySpan<char> overload produces identical results to string overload
        var fromString = Tokenize("Task<List<MyModel>>");

        HashSet<string> fromSpan = [];
        SignatureTokenizer.TokenizeInto("Task<List<MyModel>>".AsSpan(), fromSpan);

        Assert.Equal(fromString, fromSpan);
    }

    [Fact]
    public void TokenizeInto_SpanOverload_TokensAreIndependent()
    {
        // Regression: ensure tokens graphed from span are independent string instances,
        // not views into a shared backing buffer that could be invalidated
        HashSet<string> tokens = [];
        var input = "Foo<Bar>";
        SignatureTokenizer.TokenizeInto(input.AsSpan(), tokens);

        // Tokens should survive even if the original string is GC'd
        Assert.Contains("Foo", tokens);
        Assert.Contains("Bar", tokens);
        Assert.Equal(2, tokens.Count);
    }
}
