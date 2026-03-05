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
/// Client-side connection to an agent.
///
/// Provides the client's view of an ACP connection, allowing clients (IDEs)
/// to communicate with agents. Implements the IAgent interface to provide methods
/// for initializing sessions, sending prompts, and managing the agent lifecycle.
///
/// Uses compile-time generated dispatch tables for O(1) method lookup.
/// </summary>
[UnconditionalSuppressMessage("AOT", "IL2026:RequiresUnreferencedCode",
    Justification = "ACP protocol requires dynamic JSON-RPC dispatch for arbitrary params types")]
[UnconditionalSuppressMessage("AOT", "IL3050:RequiresDynamicCode",
    Justification = "ACP protocol requires dynamic JSON-RPC dispatch for arbitrary params types")]
public class ClientSideConnection : IAgent, IAsyncDisposable
{
    private readonly Connection _connection;

    // O(1) method dispatch using source-generated dispatch tables
    private readonly Dictionary<string, Func<IClient, JsonElement?, Task<object?>>> _requestHandlers;
    private readonly Dictionary<string, Func<IClient, JsonElement?, Task>> _notificationHandlers;

    public ClientSideConnection(IClient client, IAcpStream stream, ILogger? logger = null)
    {
        _connection = new Connection(stream, logger);

        // Use compile-time generated dispatch tables
        _requestHandlers = IClientDispatch.CreateRequestHandlers();
        _notificationHandlers = IClientDispatch.CreateNotificationHandlers();

        _connection.OnRequest(async (method, @params) =>
        {
            // Params is dynamic object - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
            var json = @params is JsonElement el ? el : JsonSerializer.SerializeToElement(@params, AcpJsonContext.FlexibleOptions);
#pragma warning restore IL2026, IL3050

            if (_requestHandlers.TryGetValue(method, out var handler))
                return await handler(client, json);

            throw RequestError.MethodNotFound(method);
        });

        _connection.OnNotification(async (method, @params) =>
        {
            // Params is dynamic object - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
            var json = @params is JsonElement el ? el : JsonSerializer.SerializeToElement(@params, AcpJsonContext.FlexibleOptions);
#pragma warning restore IL2026, IL3050

            if (_notificationHandlers.TryGetValue(method, out var handler))
                await handler(client, json);
        });
    }

    /// <summary>
    /// Start processing messages.
    /// </summary>
    public Task RunAsync(CancellationToken ct = default) => _connection.RunAsync(ct);

    // IAgent implementation - calls to the agent

    public Task<InitializeResponse> InitializeAsync(InitializeRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<InitializeResponse>(AgentMethods.Initialize, request, ct)!;

    public Task<AuthenticateResponse?> AuthenticateAsync(AuthenticateRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<AuthenticateResponse>(AgentMethods.Authenticate, request, ct);

    public Task<NewSessionResponse> NewSessionAsync(NewSessionRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<NewSessionResponse>(AgentMethods.SessionNew, request, ct)!;

    public Task<LoadSessionResponse?> LoadSessionAsync(LoadSessionRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<LoadSessionResponse>(AgentMethods.SessionLoad, request, ct);

    public Task<PromptResponse> PromptAsync(PromptRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<PromptResponse>(AgentMethods.SessionPrompt, request, ct)!;

    public Task<SetSessionModeResponse?> SetSessionModeAsync(SetSessionModeRequest request, CancellationToken ct = default) =>
        _connection.SendRequestAsync<SetSessionModeResponse>(AgentMethods.SessionSetMode, request, ct);

    public Task CancelAsync(CancelNotification notification, CancellationToken ct = default) =>
        _connection.SendNotificationAsync(AgentMethods.SessionCancel, notification, ct);

    public ValueTask DisposeAsync()
    {
        GC.SuppressFinalize(this);
        return _connection.DisposeAsync();
    }
}
