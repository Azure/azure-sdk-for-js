// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;

namespace AgentClientProtocol.Sdk.JsonRpc;

/// <summary>
/// Base for all JSON-RPC messages.
/// </summary>
public abstract record JsonRpcMessageBase
{
    [JsonPropertyName("jsonrpc")]
    public string JsonRpc { get; init; } = "2.0";
}

/// <summary>
/// JSON-RPC 2.0 request message.
/// </summary>
public record JsonRpcRequest : JsonRpcMessageBase
{
    [JsonPropertyName("id")]
    public object? Id { get; init; }

    [JsonPropertyName("method")]
    public required string Method { get; init; }

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public JsonElement? Params { get; init; }
}

/// <summary>
/// JSON-RPC 2.0 response message.
/// </summary>
public record JsonRpcResponse : JsonRpcMessageBase
{
    [JsonPropertyName("id")]
    public object? Id { get; init; }

    [JsonPropertyName("result")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Result { get; init; }

    [JsonPropertyName("error")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public JsonRpcError? Error { get; init; }

    public static JsonRpcResponse Success(object? id, object? result) =>
        new() { Id = id, Result = result };

    public static JsonRpcResponse Failure(object? id, JsonRpcError error) =>
        new() { Id = id, Error = error };
}

/// <summary>
/// JSON-RPC 2.0 error object.
/// </summary>
public record JsonRpcError
{
    [JsonPropertyName("code")]
    public required int Code { get; init; }

    [JsonPropertyName("message")]
    public required string Message { get; init; }

    [JsonPropertyName("data")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Data { get; init; }
}

/// <summary>
/// JSON-RPC 2.0 notification message (request without id).
/// </summary>
public record JsonRpcNotification : JsonRpcMessageBase
{
    [JsonPropertyName("method")]
    public required string Method { get; init; }

    [JsonPropertyName("params")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public JsonElement? Params { get; init; }
}

/// <summary>
/// Union type for any JSON-RPC message.
/// </summary>
public abstract record AnyMessage;

public record RequestMessage(JsonRpcRequest Request) : AnyMessage;
public record ResponseMessage(JsonRpcResponse Response) : AnyMessage;
public record NotificationMessage(JsonRpcNotification Notification) : AnyMessage;
