// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.Schema;

namespace AgentClientProtocol.Sdk;

/// <summary>
/// Interface that all ACP-compliant agents must implement.
///
/// Agents are programs that use generative AI to autonomously modify code.
/// They handle requests from clients (IDEs) and execute tasks using language models and tools.
///
/// Methods are decorated with [RpcMethod] for compile-time dispatch table generation.
/// </summary>
[RpcDispatcher("Agent")]
public interface IAgent : IAsyncDisposable
{
    /// <summary>
    /// Establishes the connection and negotiates protocol capabilities.
    /// </summary>
    [RpcMethod(AgentMethods.Initialize)]
    Task<InitializeResponse> InitializeAsync(InitializeRequest request, CancellationToken ct = default);

    /// <summary>
    /// Creates a new conversation session.
    /// </summary>
    [RpcMethod(AgentMethods.SessionNew)]
    Task<NewSessionResponse> NewSessionAsync(NewSessionRequest request, CancellationToken ct = default);

    /// <summary>
    /// Processes a user prompt within a session.
    /// </summary>
    [RpcMethod(AgentMethods.SessionPrompt)]
    Task<PromptResponse> PromptAsync(PromptRequest request, CancellationToken ct = default);

    /// <summary>
    /// Handles session cancellation.
    /// </summary>
    [RpcMethod(AgentMethods.SessionCancel, IsNotification = true)]
    Task CancelAsync(CancelNotification notification, CancellationToken ct = default);

    /// <summary>
    /// Authenticates the client (optional).
    /// </summary>
    [RpcMethod(AgentMethods.Authenticate)]
    Task<AuthenticateResponse?> AuthenticateAsync(AuthenticateRequest request, CancellationToken ct = default) =>
        Task.FromResult<AuthenticateResponse?>(null);

    /// <summary>
    /// Loads an existing session (optional).
    /// </summary>
    [RpcMethod(AgentMethods.SessionLoad)]
    Task<LoadSessionResponse?> LoadSessionAsync(LoadSessionRequest request, CancellationToken ct = default) =>
        Task.FromResult<LoadSessionResponse?>(null);

    /// <summary>
    /// Sets the current session mode (optional).
    /// </summary>
    [RpcMethod(AgentMethods.SessionSetMode)]
    Task<SetSessionModeResponse?> SetSessionModeAsync(SetSessionModeRequest request, CancellationToken ct = default) =>
        Task.FromResult<SetSessionModeResponse?>(null);

    /// <summary>
    /// Default disposal implementation - no-op for interfaces.
    /// Implementing classes should override if they hold resources.
    /// </summary>
    ValueTask IAsyncDisposable.DisposeAsync()
    {
        GC.SuppressFinalize(this);
        return ValueTask.CompletedTask;
    }
}
