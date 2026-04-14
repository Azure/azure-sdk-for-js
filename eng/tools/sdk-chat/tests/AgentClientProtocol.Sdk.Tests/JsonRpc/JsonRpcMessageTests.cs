// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests.JsonRpc;

public class JsonRpcMessageTests
{
    [Fact]
    public void JsonRpcRequest_SerializesCorrectly()
    {
        var request = new JsonRpcRequest
        {
            Id = 1,
            Method = "initialize",
            Params = JsonSerializer.SerializeToElement(new { protocolVersion = "2024-11-05" })
        };

        var json = JsonSerializer.Serialize(request);

        Assert.Contains("\"jsonrpc\":\"2.0\"", json);
        Assert.Contains("\"id\":1", json);
        Assert.Contains("\"method\":\"initialize\"", json);
        Assert.Contains("\"protocolVersion\":\"2024-11-05\"", json);
    }

    [Fact]
    public void JsonRpcRequest_DeserializesCorrectly()
    {
        var json = """{"jsonrpc":"2.0","id":42,"method":"session/new","params":{"workspacePath":"/test"}}""";

        var request = JsonSerializer.Deserialize<JsonRpcRequest>(json);

        Assert.NotNull(request);
        Assert.Equal("2.0", request.JsonRpc);
        Assert.Equal(42, ((JsonElement)request.Id!).GetInt32());
        Assert.Equal("session/new", request.Method);
        Assert.True(request.Params.HasValue);
    }

    [Fact]
    public void JsonRpcResponse_SerializesWithResult()
    {
        var response = new JsonRpcResponse
        {
            Id = 1,
            Result = new { sessionId = "sess_123" }
        };

        var json = JsonSerializer.Serialize(response);

        Assert.Contains("\"jsonrpc\":\"2.0\"", json);
        Assert.Contains("\"id\":1", json);
        Assert.Contains("\"sessionId\":\"sess_123\"", json);
        Assert.DoesNotContain("\"error\"", json);
    }

    [Fact]
    public void JsonRpcResponse_SerializesWithError()
    {
        var response = new JsonRpcResponse
        {
            Id = 1,
            Error = new JsonRpcError
            {
                Code = -32600,
                Message = "Invalid Request"
            }
        };

        var json = JsonSerializer.Serialize(response);

        Assert.Contains("\"error\"", json);
        Assert.Contains("\"code\":-32600", json);
        Assert.Contains("\"message\":\"Invalid Request\"", json);
    }

    [Fact]
    public void JsonRpcNotification_SerializesWithoutId()
    {
        var notification = new JsonRpcNotification
        {
            Method = "session/update",
            Params = JsonSerializer.SerializeToElement(new { sessionId = "sess_123" })
        };

        var json = JsonSerializer.Serialize(notification);

        Assert.Contains("\"jsonrpc\":\"2.0\"", json);
        Assert.Contains("\"method\":\"session/update\"", json);
        Assert.DoesNotContain("\"id\"", json); // Notifications have no id field
    }
}
