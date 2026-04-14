// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using AgentClientProtocol.Sdk.Stream;
using Microsoft.Extensions.Logging;

namespace AgentClientProtocol.Sdk;

/// <summary>
/// Agent-side connection to a client.
///
/// Provides the agent's view of an ACP connection, allowing agents to
/// communicate with clients (IDEs). Implements methods for requesting permissions,
/// accessing the file system, and sending session updates.
///
/// Uses compile-time generated dispatch tables for O(1) method lookup.
/// </summary>
[UnconditionalSuppressMessage("AOT", "IL2026:RequiresUnreferencedCode",
    Justification = "ACP protocol requires dynamic JSON-RPC dispatch for arbitrary params types")]
[UnconditionalSuppressMessage("AOT", "IL3050:RequiresDynamicCode",
    Justification = "ACP protocol requires dynamic JSON-RPC dispatch for arbitrary params types")]
public class AgentSideConnection : IAsyncDisposable
{
    private readonly Connection _connection;

    // O(1) method dispatch using source-generated dispatch tables
    private readonly Dictionary<string, Func<IAgent, JsonElement?, Task<object?>>> _requestHandlers;
    private readonly Dictionary<string, Func<IAgent, JsonElement?, Task>> _notificationHandlers;

    public AgentSideConnection(IAgent agent, IAcpStream stream, ILogger? logger = null)
    {
        _connection = new Connection(stream, logger);

        // Use compile-time generated dispatch tables
        _requestHandlers = IAgentDispatch.CreateRequestHandlers();
        _notificationHandlers = IAgentDispatch.CreateNotificationHandlers();

        _connection.OnRequest(async (method, @params) =>
        {
            // Params is dynamic object - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
            var json = @params is JsonElement el ? el : JsonSerializer.SerializeToElement(@params, AcpJsonContext.FlexibleOptions);
#pragma warning restore IL2026, IL3050

            if (_requestHandlers.TryGetValue(method, out var handler))
                return await handler(agent, json);

            throw RequestError.MethodNotFound(method);
        });

        _connection.OnNotification(async (method, @params) =>
        {
            // Params is dynamic object - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
            var json = @params is JsonElement el ? el : JsonSerializer.SerializeToElement(@params, AcpJsonContext.FlexibleOptions);
#pragma warning restore IL2026, IL3050

            if (_notificationHandlers.TryGetValue(method, out var handler))
                await handler(agent, json);
        });
    }

    /// <summary>
    /// Start processing messages.
    /// </summary>
    public Task RunAsync(CancellationToken ct = default) => _connection.RunAsync(ct);

    /// <summary>
    /// Send session update to client.
    /// </summary>
    public Task SessionUpdateAsync(SessionNotification notification, CancellationToken ct = default) =>
        _connection.SendNotificationAsync(ClientMethods.SessionUpdate, notification, ct);

    /// <summary>
    /// Send text chunk to client.
    /// </summary>
    public Task SendTextAsync(string sessionId, string text, CancellationToken ct = default) =>
        SessionUpdateAsync(new SessionNotification
        {
            SessionId = sessionId,
            Update = new AgentMessageChunk { Content = new TextContent { Text = text } }
        }, ct);

    /// <summary>
    /// Send plan update to client.
    /// </summary>
    public Task SendPlanAsync(string sessionId, PlanEntry[] entries, CancellationToken ct = default) =>
        SessionUpdateAsync(new SessionNotification
        {
            SessionId = sessionId,
            Update = new Plan { Entries = entries }
        }, ct);

    /// <summary>
    /// Send tool call update to client.
    /// </summary>
    public Task SendToolCallAsync(
        string sessionId,
        string toolCallId,
        string title,
        string status,
        string? kind = null,
        ToolCallContent[]? content = null,
        ToolCallLocation[]? locations = null,
        object? rawInput = null,
        object? rawOutput = null,
        CancellationToken ct = default)
    {
        // Raw input/output are dynamic objects - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
        var serializedInput = rawInput != null ? JsonSerializer.SerializeToElement(rawInput, AcpJsonContext.FlexibleOptions) : (JsonElement?)null;
        var serializedOutput = rawOutput != null ? JsonSerializer.SerializeToElement(rawOutput, AcpJsonContext.FlexibleOptions) : (JsonElement?)null;
#pragma warning restore IL2026, IL3050

        return SessionUpdateAsync(new SessionNotification
        {
            SessionId = sessionId,
            Update = new ToolCallUpdate
            {
                ToolCallId = toolCallId,
                Title = title,
                Status = status,
                Kind = kind,
                Content = content,
                Locations = locations,
                RawInput = serializedInput,
                RawOutput = serializedOutput
            }
        }, ct);
    }

    /// <summary>
    /// Request permission from user.
    /// </summary>
    public Task<RequestPermissionResponse> RequestPermissionAsync(
        RequestPermissionRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<RequestPermissionResponse>(ClientMethods.SessionRequestPermission, request, ct)!;

    /// <summary>
    /// Read a text file from client.
    /// </summary>
    public Task<ReadTextFileResponse> ReadTextFileAsync(ReadTextFileRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<ReadTextFileResponse>(ClientMethods.FsReadTextFile, request, ct)!;

    /// <summary>
    /// Write a text file to client.
    /// </summary>
    public Task<WriteTextFileResponse> WriteTextFileAsync(WriteTextFileRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<WriteTextFileResponse>(ClientMethods.FsWriteTextFile, request, ct)!;

    /// <summary>
    /// Create a terminal on client.
    /// </summary>
    public Task<CreateTerminalResponse> CreateTerminalAsync(CreateTerminalRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<CreateTerminalResponse>(ClientMethods.TerminalCreate, request, ct)!;

    /// <summary>
    /// Get terminal output from client.
    /// </summary>
    public Task<TerminalOutputResponse> GetTerminalOutputAsync(TerminalOutputRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<TerminalOutputResponse>(ClientMethods.TerminalOutput, request, ct)!;

    /// <summary>
    /// Release terminal on client.
    /// </summary>
    public Task<ReleaseTerminalResponse> ReleaseTerminalAsync(ReleaseTerminalRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<ReleaseTerminalResponse>(ClientMethods.TerminalRelease, request, ct)!;

    /// <summary>
    /// Wait for terminal to exit.
    /// </summary>
    public Task<WaitForTerminalExitResponse> WaitForTerminalExitAsync(WaitForTerminalExitRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<WaitForTerminalExitResponse>(ClientMethods.TerminalWaitForExit, request, ct)!;

    /// <summary>
    /// Kill terminal command.
    /// </summary>
    public Task<KillTerminalCommandResponse> KillTerminalAsync(KillTerminalCommandRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<KillTerminalCommandResponse>(ClientMethods.TerminalKill, request, ct)!;

    public ValueTask DisposeAsync()
    {
        GC.SuppressFinalize(this);
        return _connection.DisposeAsync();
    }
}
