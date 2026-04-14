// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.Schema;

namespace AgentClientProtocol.Sdk;

/// <summary>
/// Interface that ACP-compliant clients must implement.
///
/// Clients are typically code editors (IDEs) that provide the interface
/// between users and AI agents. They manage the environment, handle user interactions,
/// and control access to resources.
///
/// Methods are decorated with [RpcMethod] for compile-time dispatch table generation.
/// </summary>
[RpcDispatcher("Client")]
public interface IClient
{
    /// <summary>
    /// Handle permission request from agent.
    /// </summary>
    [RpcMethod(ClientMethods.SessionRequestPermission)]
    Task<RequestPermissionResponse> RequestPermissionAsync(RequestPermissionRequest request, CancellationToken ct = default);

    /// <summary>
    /// Handle session update from agent.
    /// </summary>
    [RpcMethod(ClientMethods.SessionUpdate, IsNotification = true)]
    Task SessionUpdateAsync(SessionNotification notification, CancellationToken ct = default);

    /// <summary>
    /// Read a text file (optional).
    /// </summary>
    [RpcMethod(ClientMethods.FsReadTextFile)]
    Task<ReadTextFileResponse?> ReadTextFileAsync(ReadTextFileRequest request, CancellationToken ct = default) =>
        Task.FromResult<ReadTextFileResponse?>(null);

    /// <summary>
    /// Write a text file (optional).
    /// </summary>
    [RpcMethod(ClientMethods.FsWriteTextFile)]
    Task<WriteTextFileResponse?> WriteTextFileAsync(WriteTextFileRequest request, CancellationToken ct = default) =>
        Task.FromResult<WriteTextFileResponse?>(null);

    /// <summary>
    /// Create a terminal (optional).
    /// </summary>
    [RpcMethod(ClientMethods.TerminalCreate)]
    Task<CreateTerminalResponse?> CreateTerminalAsync(CreateTerminalRequest request, CancellationToken ct = default) =>
        Task.FromResult<CreateTerminalResponse?>(null);

    /// <summary>
    /// Get terminal output (optional).
    /// </summary>
    [RpcMethod(ClientMethods.TerminalOutput)]
    Task<TerminalOutputResponse?> TerminalOutputAsync(TerminalOutputRequest request, CancellationToken ct = default) =>
        Task.FromResult<TerminalOutputResponse?>(null);

    /// <summary>
    /// Release a terminal (optional).
    /// </summary>
    [RpcMethod(ClientMethods.TerminalRelease)]
    Task<ReleaseTerminalResponse?> ReleaseTerminalAsync(ReleaseTerminalRequest request, CancellationToken ct = default) =>
        Task.FromResult<ReleaseTerminalResponse?>(null);

    /// <summary>
    /// Wait for terminal exit (optional).
    /// </summary>
    [RpcMethod(ClientMethods.TerminalWaitForExit)]
    Task<WaitForTerminalExitResponse?> WaitForTerminalExitAsync(WaitForTerminalExitRequest request, CancellationToken ct = default) =>
        Task.FromResult<WaitForTerminalExitResponse?>(null);

    /// <summary>
    /// Kill terminal command (optional).
    /// </summary>
    [RpcMethod(ClientMethods.TerminalKill)]
    Task<KillTerminalCommandResponse?> KillTerminalAsync(KillTerminalCommandRequest request, CancellationToken ct = default) =>
        Task.FromResult<KillTerminalCommandResponse?>(null);
}
