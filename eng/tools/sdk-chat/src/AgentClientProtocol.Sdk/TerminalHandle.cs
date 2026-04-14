// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.Schema;

namespace AgentClientProtocol.Sdk;

/// <summary>
/// Handle for controlling and monitoring a terminal created via CreateTerminal.
///
/// Provides methods to:
/// - Get current output without waiting
/// - Wait for command completion
/// - Kill the running command
/// - Release terminal resources
/// </summary>
public class TerminalHandle : IAsyncDisposable
{
    private readonly AgentSideConnection _connection;
    private readonly string _sessionId;
    private readonly string _terminalId;

    public string TerminalId => _terminalId;

    internal TerminalHandle(AgentSideConnection connection, string sessionId, string terminalId)
    {
        _connection = connection;
        _sessionId = sessionId;
        _terminalId = terminalId;
    }

    /// <summary>
    /// Create a terminal and return a handle.
    /// </summary>
    public static async Task<TerminalHandle> CreateAsync(
        AgentSideConnection connection,
        string sessionId,
        string command,
        string[]? args = null,
        string? cwd = null,
        EnvVariable[]? env = null,
        CancellationToken ct = default)
    {
        var response = await connection.CreateTerminalAsync(new CreateTerminalRequest
        {
            SessionId = sessionId,
            Command = command,
            Args = args,
            Cwd = cwd,
            Env = env
        }, ct);

        return new TerminalHandle(connection, sessionId, response.TerminalId);
    }

    /// <summary>
    /// Get current output without waiting.
    /// </summary>
    public async Task<(string output, TerminalExitStatus? exitStatus)> GetOutputAsync(CancellationToken ct = default)
    {
        var response = await _connection.GetTerminalOutputAsync(new TerminalOutputRequest
        {
            SessionId = _sessionId,
            TerminalId = _terminalId
        }, ct).ConfigureAwait(false);

        return (response.Output, response.ExitStatus);
    }

    /// <summary>
    /// Wait for terminal command to exit.
    /// </summary>
    public async Task<WaitForTerminalExitResponse> WaitForExitAsync(CancellationToken ct = default)
    {
        return await _connection.WaitForTerminalExitAsync(new WaitForTerminalExitRequest
        {
            SessionId = _sessionId,
            TerminalId = _terminalId
        }, ct).ConfigureAwait(false);
    }

    /// <summary>
    /// Kill the running command.
    /// </summary>
    public async Task KillAsync(CancellationToken ct = default)
    {
        await _connection.KillTerminalAsync(new KillTerminalCommandRequest
        {
            SessionId = _sessionId,
            TerminalId = _terminalId
        }, ct).ConfigureAwait(false);
    }

    /// <summary>
    /// Release terminal resources.
    /// </summary>
    public async Task ReleaseAsync(CancellationToken ct = default)
    {
        await _connection.ReleaseTerminalAsync(new ReleaseTerminalRequest
        {
            SessionId = _sessionId,
            TerminalId = _terminalId
        }, ct).ConfigureAwait(false);
    }

    public async ValueTask DisposeAsync()
    {
        GC.SuppressFinalize(this);
        try
        {
            await ReleaseAsync().ConfigureAwait(false);
        }
        catch
        {
            // Swallow release errors during disposal - terminal may already be gone
        }
    }
}
