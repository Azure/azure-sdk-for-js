// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Stream;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests.Stream;

public class NdJsonStreamTests
{
    [Fact]
    public async Task WriteAsync_WritesNewlineDelimitedJson()
    {
        using var outputWriter = new StringWriter();
        using var inputReader = new StringReader("");

        var ndJson = new NdJsonStream(inputReader, outputWriter);

        var message = new JsonRpcRequest
        {
            Id = 1,
            Method = "test"
        };

        await ndJson.WriteAsync(message);

        var written = outputWriter.ToString();

        Assert.EndsWith("\n", written);
        Assert.Contains("\"method\":\"test\"", written);
    }

    [Fact]
    public async Task ReadAsync_ReadsNewlineDelimitedJson()
    {
        var jsonLine = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\"}\n";
        using var inputReader = new StringReader(jsonLine);
        using var outputWriter = new StringWriter();

        var ndJson = new NdJsonStream(inputReader, outputWriter);

        var message = await ndJson.ReadAsync();

        Assert.NotNull(message);
        var request = Assert.IsType<JsonRpcRequest>(message);
        Assert.Equal("initialize", request.Method);
    }

    [Fact]
    public async Task ReadAsync_ReturnsNull_OnEndOfStream()
    {
        using var inputReader = new StringReader("");
        using var outputWriter = new StringWriter();

        var ndJson = new NdJsonStream(inputReader, outputWriter);

        var message = await ndJson.ReadAsync();

        Assert.Null(message);
    }

    [Fact]
    public async Task ReadAsync_HandlesMultipleMessages()
    {
        var json = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"first\"}\n{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"second\"}\n";
        using var inputReader = new StringReader(json);
        using var outputWriter = new StringWriter();

        var ndJson = new NdJsonStream(inputReader, outputWriter);

        var first = await ndJson.ReadAsync() as JsonRpcRequest;
        var second = await ndJson.ReadAsync() as JsonRpcRequest;

        Assert.Equal("first", first?.Method);
        Assert.Equal("second", second?.Method);
    }

    [Fact]
    public async Task ReadAsync_SkipsEmptyLines()
    {
        var json = "\n{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"test\"}\n\n";
        using var inputReader = new StringReader(json);
        using var outputWriter = new StringWriter();

        var ndJson = new NdJsonStream(inputReader, outputWriter);

        var message = await ndJson.ReadAsync() as JsonRpcRequest;

        Assert.Equal("test", message?.Method);
    }
}
