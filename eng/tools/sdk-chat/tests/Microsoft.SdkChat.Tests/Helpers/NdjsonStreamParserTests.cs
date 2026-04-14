// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using Microsoft.SdkChat.Helpers;
using Xunit;

namespace Microsoft.SdkChat.Tests.Helpers;

public class NdjsonStreamParserTests
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [Fact]
    public async Task ParseAsync_SingleLine_ReturnsItem()
    {
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("{\"value\": 1}\n"), Options));

        Assert.Single(items);
        Assert.Equal(1, items[0].Value);
    }

    [Fact]
    public async Task ParseAsync_MultipleLinesAcrossChunks_ReturnsItems()
    {
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("{\"value\": 1}", "\n{\"value\": 2}", "\n"), Options));

        Assert.Equal([1, 2], items.Select(i => i.Value).ToArray());
    }

    [Fact]
    public async Task ParseAsync_IgnoresEmptyLinesAndCodeFences()
    {
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("\n", "```json\n", "{\"value\": 1}\n", "```\n", "\n"), Options));

        Assert.Single(items);
        Assert.Equal(1, items[0].Value);
    }

    [Fact]
    public async Task ParseAsync_InvalidNonObjectLineBeforeFirstItem_IsIgnoredByDefault()
    {
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("I will follow the format.\n", "{\"value\": 1}\n"), Options));

        Assert.Single(items);
        Assert.Equal(1, items[0].Value);
    }

    #region Multi-line JSON Edge Cases

    [Fact]
    public async Task ParseAsync_MultiLineJsonObject_ParsesCorrectly()
    {
        // JSON object split across multiple lines (pretty-printed)
        var json = """
            {
              "value": 42,
              "name": "test"
            }
            """;

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithName>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal(42, items[0].Value);
        Assert.Equal("test", items[0].Name);
    }

    [Fact]
    public async Task ParseAsync_MultiLineJsonAcrossChunks_ParsesCorrectly()
    {
        // JSON object arriving in small chunks across network
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("{", "\"val", "ue\"", ": ", "99", "}"), Options));

        Assert.Single(items);
        Assert.Equal(99, items[0].Value);
    }

    [Fact]
    public async Task ParseAsync_NewlinesInsideStringValues_PreservesContent()
    {
        // Newlines inside JSON string values should be preserved
        var json = "{\"value\": 1, \"name\": \"line1\\nline2\\nline3\"}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithName>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal("line1\nline2\nline3", items[0].Name);
    }

    [Fact]
    public async Task ParseAsync_EscapedQuotesInStrings_ParsesCorrectly()
    {
        // Escaped quotes should not break brace tracking
        var json = "{\"value\": 1, \"name\": \"say \\\"hello\\\"\"}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithName>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal("say \"hello\"", items[0].Name);
    }

    [Fact]
    public async Task ParseAsync_NestedBraces_TracksDepthCorrectly()
    {
        // Nested objects with multiple brace levels
        var json = "{\"value\": 1, \"nested\": {\"inner\": {\"deep\": 42}}}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithNested>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal(1, items[0].Value);
        Assert.Equal(42, items[0].Nested?.Inner?.Deep);
    }

    [Fact]
    public async Task ParseAsync_BracesInsideStrings_DoesNotConfuseParser()
    {
        // Braces inside string values should not affect depth tracking
        var json = "{\"value\": 1, \"name\": \"contains {braces} inside\"}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithName>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal("contains {braces} inside", items[0].Name);
    }

    [Fact]
    public async Task ParseAsync_MultipleMultiLineObjects_ParsesAll()
    {
        var json = """
            {
              "value": 1
            }
            {
              "value": 2
            }
            {
              "value": 3
            }
            """;

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks(json), Options));

        Assert.Equal(3, items.Count);
        Assert.Equal([1, 2, 3], items.Select(i => i.Value).ToArray());
    }

    [Fact]
    public async Task ParseAsync_BackslashEscapeSequences_HandlesAllTypes()
    {
        // Various escape sequences: \n, \t, \\, \"
        var json = "{\"value\": 1, \"name\": \"tab\\there\\nnew\\\\slash\"}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithName>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal("tab\there\nnew\\slash", items[0].Name);
    }

    [Fact]
    public async Task ParseAsync_UnicodeInStrings_ParsesCorrectly()
    {
        var json = "{\"value\": 1, \"name\": \"emoji: 🚀 and ñ\"}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithName>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal("emoji: 🚀 and ñ", items[0].Name);
    }

    [Fact]
    public async Task ParseAsync_WhitespaceOnlyBetweenObjects_Skipped()
    {
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("{\"value\": 1}", "   \n\n\t\t\n   ", "{\"value\": 2}"), Options));

        Assert.Equal(2, items.Count);
        Assert.Equal([1, 2], items.Select(i => i.Value).ToArray());
    }

    [Fact]
    public async Task ParseAsync_IncompleteJsonAtEnd_SkipsGracefully()
    {
        // Incomplete JSON at end of stream should be skipped (not throw)
        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItem>(
            Chunks("{\"value\": 1}", "{\"value\":"), Options));

        // Should get the complete object, skip the incomplete one
        Assert.Single(items);
        Assert.Equal(1, items[0].Value);
    }

    [Fact]
    public async Task ParseAsync_RealWorldAiResponse_ParsesCorrectly()
    {
        // Simulates actual AI response with preamble text and pretty-printed JSON
        var response = """
            Here are the generated samples:
            
            ```json
            {
              "name": "Sample1",
              "code": "Console.WriteLine(\"Hello\");",
              "filePath": "samples/hello.cs"
            }
            {
              "name": "Sample2",
              "code": "var x = 42;",
              "filePath": "samples/vars.cs"
            }
            ```
            """;

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<SampleItem>(
            Chunks(response), Options));

        Assert.Equal(2, items.Count);
        Assert.Equal("Sample1", items[0].Name);
        Assert.Equal("samples/hello.cs", items[0].FilePath);
        Assert.Equal("Sample2", items[1].Name);
    }

    [Fact]
    public async Task ParseAsync_ArraysInObjects_ParsesCorrectly()
    {
        var json = "{\"value\": 1, \"items\": [1, 2, 3]}";

        var items = await CollectAsync(NdjsonStreamParser.ParseAsync<TestItemWithArray>(
            Chunks(json), Options));

        Assert.Single(items);
        Assert.Equal([1, 2, 3], items[0].Items ?? []);
    }

    #endregion

    private static async Task<List<T>> CollectAsync<T>(IAsyncEnumerable<T> stream)
    {
        var list = new List<T>();
        await foreach (var item in stream)
        {
            list.Add(item);
        }
        return list;
    }

    private static async IAsyncEnumerable<string> Chunks(params string[] chunks)
    {
        foreach (var chunk in chunks)
        {
            await Task.Yield();
            yield return chunk;
        }
    }

    private sealed record TestItem(int Value);
    private sealed record TestItemWithName(int Value, string? Name = null);
    private sealed record TestItemWithArray(int Value, int[]? Items = null);
    private sealed record TestItemWithNested(int Value, NestedItem? Nested = null);
    private sealed record NestedItem(InnerItem? Inner = null);
    private sealed record InnerItem(int Deep);
    private sealed record SampleItem(string? Name = null, string? Code = null, string? FilePath = null);
}
