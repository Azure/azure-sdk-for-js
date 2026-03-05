// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using System.Text;
using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using AgentClientProtocol.Sdk.Stream;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests;

/// <summary>
/// Cross-language interoperability tests for the Agent Client Protocol.
///
/// Tests communication between:
///   - TypeScript ACP agent ↔ .NET ACP client  (Scenario 1)
///   - .NET ACP agent ↔ TypeScript ACP client  (Scenario 2)
///
/// Requires: tsx (TypeScript runner) installed on the system.
/// </summary>
public class AcpInteropTests : IDisposable
{
    private static readonly string FixturesDir = Path.GetFullPath(
        Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "Fixtures"));

    private readonly ITestOutputHelper _output;
    private readonly List<Process> _processes = [];

    public AcpInteropTests(ITestOutputHelper output)
    {
        _output = output;
    }

    public void Dispose()
    {
        foreach (var p in _processes)
        {
            try
            {
                if (!p.HasExited)
                {
                    p.Kill(entireProcessTree: true);
                    p.WaitForExit(1000);
                }
            }
            catch { /* best effort cleanup */ }
            p.Dispose();
        }
        GC.SuppressFinalize(this);
    }

    private static bool TsxAvailable()
    {
        try
        {
            using var p = Process.Start(new ProcessStartInfo
            {
                FileName = "tsx",
                Arguments = "--version",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            });
            p?.WaitForExit(5000);
            return p?.ExitCode == 0;
        }
        catch
        {
            return false;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // Scenario 1: TypeScript Agent ↔ .NET Client
    // ═══════════════════════════════════════════════════════════════

    /// <summary>
    /// .NET client connects to a TypeScript agent process and performs
    /// the ACP initialize handshake.
    /// </summary>
    [Fact]
    public async Task DotNetClient_TypeScriptAgent_Initialize()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetClientContext("test-server.ts");

        var initResponse = await ctx.Connection.InitializeAsync(new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities(),
            ClientInfo = new Implementation { Name = "dotnet-test-client", Version = "1.0.0" }
        }, ctx.Ct);

        Assert.NotNull(initResponse);
        Assert.Equal(Protocol.Version, initResponse.ProtocolVersion);
        Assert.NotNull(initResponse.AgentInfo);
        Assert.Equal("ts-test-agent", initResponse.AgentInfo.Name);
        Assert.Equal("1.0.0", initResponse.AgentInfo.Version);
    }

    /// <summary>
    /// .NET client creates a session on the TypeScript agent.
    /// </summary>
    [Fact]
    public async Task DotNetClient_TypeScriptAgent_NewSession()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetClientContext("test-server.ts");

        await ctx.Connection.InitializeAsync(new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities()
        }, ctx.Ct);

        var sessionResponse = await ctx.Connection.NewSessionAsync(new NewSessionRequest
        {
            Cwd = "/test/workspace",
            McpServers = []
        }, ctx.Ct);

        Assert.NotNull(sessionResponse);
        Assert.StartsWith("ts-session-", sessionResponse.SessionId);
    }

    /// <summary>
    /// .NET client sends a prompt and receives a response + session update
    /// notifications from the TypeScript agent.
    /// </summary>
    [Fact]
    public async Task DotNetClient_TypeScriptAgent_PromptAndSessionUpdates()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetClientContext("test-server.ts");

        await ctx.Connection.InitializeAsync(new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities()
        }, ctx.Ct);

        var session = await ctx.Connection.NewSessionAsync(new NewSessionRequest
        {
            Cwd = "/test",
            McpServers = []
        }, ctx.Ct);

        var promptResponse = await ctx.Connection.PromptAsync(new PromptRequest
        {
            SessionId = session.SessionId,
            Prompt = [new TextContent { Text = "Hello from .NET!" }]
        }, ctx.Ct);

        Assert.NotNull(promptResponse);
        Assert.Equal(StopReason.EndTurn, promptResponse.StopReason);

        // Give time for in-flight session/update notifications
        await Task.Delay(200, ctx.Ct);

        Assert.NotEmpty(ctx.Client.ReceivedUpdates);
        var lastUpdate = ctx.Client.ReceivedUpdates.Last();
        Assert.Equal(session.SessionId, lastUpdate.SessionId);
    }

    /// <summary>
    /// .NET client sends a cancel notification. Verifies the agent doesn't crash.
    /// </summary>
    [Fact]
    public async Task DotNetClient_TypeScriptAgent_CancelNotification()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetClientContext("test-server.ts");

        await ctx.Connection.InitializeAsync(new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities()
        }, ctx.Ct);

        var session = await ctx.Connection.NewSessionAsync(new NewSessionRequest
        {
            Cwd = "/test",
            McpServers = []
        }, ctx.Ct);

        // Send cancel (fire-and-forget notification)
        await ctx.Connection.CancelAsync(new CancelNotification
        {
            SessionId = session.SessionId
        }, ctx.Ct);

        // Verify agent is still alive by sending another request
        var session2 = await ctx.Connection.NewSessionAsync(new NewSessionRequest
        {
            Cwd = "/test2",
            McpServers = []
        }, ctx.Ct);

        Assert.NotNull(session2);
        Assert.NotEqual(session.SessionId, session2.SessionId);
    }

    /// <summary>
    /// Verifies JSON-RPC error handling for unknown methods.
    /// </summary>
    [Fact]
    public async Task DotNetClient_TypeScriptAgent_UnknownMethodReturnsError()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetClientContext("test-server.ts");

        // session/set_mode is not implemented by the TS agent
        await Assert.ThrowsAsync<RequestError>(async () =>
        {
            await ctx.Connection.SetSessionModeAsync(new SetSessionModeRequest
            {
                SessionId = "nonexistent",
                ModeId = "test"
            }, ctx.Ct);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // Scenario 2: .NET Agent ↔ TypeScript Client
    // ═══════════════════════════════════════════════════════════════

    /// <summary>
    /// TypeScript client connects to a .NET agent and performs the full
    /// ACP handshake. The TS client reports results via a JSON object
    /// written to stdout with "__RESULT__" prefix.
    /// </summary>
    [Fact]
    public async Task TypeScriptClient_DotNetAgent_FullHandshake()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetAgentContext("test-client.ts");

        // Wait for the TS client process to finish its test sequence
        await WaitForTsClientExit(ctx);

        _output.WriteLine($"TS client stderr:\n{ctx.Stderr}");

        // Parse the result from stderr (stdout is used for ACP transport)
        var resultLine = ctx.Stderr.ToString().Split('\n')
            .FirstOrDefault(l => l.StartsWith("__RESULT__", StringComparison.Ordinal));

        Assert.NotNull(resultLine);

        var resultJson = resultLine["__RESULT__".Length..];
        using var doc = JsonDocument.Parse(resultJson);
        var root = doc.RootElement;

        Assert.True(root.GetProperty("success").GetBoolean(),
            $"TS client failed. Errors: {root.GetProperty("errors")}. Stderr:\n{ctx.Stderr}");

        // Verify initialize
        var initResp = root.GetProperty("initializeResponse");
        Assert.Equal(Protocol.Version, initResp.GetProperty("protocolVersion").GetUInt16());
        Assert.Equal("dotnet-test-agent",
            initResp.GetProperty("agentInfo").GetProperty("name").GetString());

        // Verify session
        var sessionId = root.GetProperty("sessionId").GetString();
        Assert.NotNull(sessionId);
        Assert.StartsWith("dotnet-session-", sessionId);

        // Verify prompt response
        var promptResp = root.GetProperty("promptResponse");
        Assert.Equal("end_turn", promptResp.GetProperty("stopReason").GetString());

        // Verify session updates were received by TS client
        var updates = root.GetProperty("sessionUpdates");
        Assert.True(updates.GetArrayLength() > 0, "Expected session update notifications");
    }

    /// <summary>
    /// Verifies the .NET agent received all expected method calls from
    /// the TypeScript client.
    /// </summary>
    [Fact]
    public async Task TypeScriptClient_DotNetAgent_AgentReceivedAllRequests()
    {
        if (!TsxAvailable()) return;

        await using var ctx = await CreateDotNetAgentContext("test-client.ts");

        await WaitForTsClientExit(ctx);

        Assert.True(ctx.Agent.InitializeCalled, "Agent should have received initialize");
        Assert.True(ctx.Agent.NewSessionCalled, "Agent should have received session/new");
        Assert.True(ctx.Agent.PromptCalled, "Agent should have received session/prompt");
    }

    // ═══════════════════════════════════════════════════════════════
    // Infrastructure
    // ═══════════════════════════════════════════════════════════════

    /// <summary>
    /// Context for Scenario 1 tests (.NET client ↔ TS agent).
    /// </summary>
    private sealed class DotNetClientContext : IAsyncDisposable
    {
        public required Process AgentProcess { get; init; }
        public required ClientSideConnection Connection { get; init; }
        public required TestClient Client { get; init; }
        public required CancellationTokenSource Cts { get; init; }
        public required Task RunTask { get; init; }

        public CancellationToken Ct => Cts.Token;

        public async ValueTask DisposeAsync()
        {
            try { AgentProcess.StandardInput.Close(); }
            catch { /* ignore */ }

            await Cts.CancelAsync();

            try { await Connection.DisposeAsync(); }
            catch { /* ignore */ }

            try
            {
                if (!AgentProcess.HasExited)
                    await AgentProcess.WaitForExitAsync(new CancellationTokenSource(2000).Token);
            }
            catch { /* ignore */ }

            Cts.Dispose();
        }
    }

    /// <summary>
    /// Context for Scenario 2 tests (.NET agent ↔ TS client).
    /// </summary>
    private sealed class DotNetAgentContext : IAsyncDisposable
    {
        public required Process Process { get; init; }
        public required AgentSideConnection Connection { get; init; }
        public required TestAgent Agent { get; init; }
        public required CancellationTokenSource Cts { get; init; }
        public required Task RunTask { get; init; }
        public StringBuilder Stderr { get; init; } = new();

        public async ValueTask DisposeAsync()
        {
            await Cts.CancelAsync();

            try { await Connection.DisposeAsync(); }
            catch { /* ignore */ }

            try
            {
                if (!Process.HasExited)
                {
                    Process.Kill(entireProcessTree: true);
                    await Process.WaitForExitAsync(new CancellationTokenSource(2000).Token);
                }
            }
            catch { /* ignore */ }

            Cts.Dispose();
        }
    }

    private async Task<DotNetClientContext> CreateDotNetClientContext(string tsScript)
    {
        var agentProcess = StartTsProcess(tsScript);

        // Wait for tsx process to be ready (it writes to stderr on startup)
        await WaitForProcessReady(agentProcess);

        var stream = NdJsonStream.FromStreams(
            agentProcess.StandardOutput.BaseStream,
            agentProcess.StandardInput.BaseStream);

        var client = new TestClient();
        var connection = new ClientSideConnection(client, stream);

        var cts = new CancellationTokenSource(TimeSpan.FromSeconds(15));
        var runTask = Task.Run(() => connection.RunAsync(cts.Token), cts.Token);

        // Give the run loop time to start reading
        await Task.Delay(50, cts.Token);

        return new DotNetClientContext
        {
            AgentProcess = agentProcess,
            Connection = connection,
            Client = client,
            Cts = cts,
            RunTask = runTask,
        };
    }

    private async Task<DotNetAgentContext> CreateDotNetAgentContext(string tsScript)
    {
        var tsProcess = StartTsProcess(tsScript);

        var stream = NdJsonStream.FromStreams(
            tsProcess.StandardOutput.BaseStream,
            tsProcess.StandardInput.BaseStream);

        var agent = new TestAgent();
        var connection = new AgentSideConnection(agent, stream);
        agent.Connection = connection;

        var cts = new CancellationTokenSource(TimeSpan.FromSeconds(20));
        var stderr = new StringBuilder();

        tsProcess.ErrorDataReceived += (_, e) =>
        {
            if (e.Data != null)
            {
                stderr.AppendLine(e.Data);
                _output.WriteLine($"[ts-stderr] {e.Data}");
            }
        };
        tsProcess.BeginErrorReadLine();

        var runTask = Task.Run(() => connection.RunAsync(cts.Token), cts.Token);

        // Give the run loop time to start reading
        await Task.Delay(50, cts.Token);

        return new DotNetAgentContext
        {
            Process = tsProcess,
            Connection = connection,
            Agent = agent,
            Cts = cts,
            RunTask = runTask,
            Stderr = stderr,
        };
    }

    private Process StartTsProcess(string scriptName)
    {
        var scriptPath = Path.Combine(FixturesDir, scriptName);
        Assert.True(File.Exists(scriptPath), $"Fixture not found: {scriptPath}");

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "tsx",
                Arguments = scriptPath,
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                WorkingDirectory = FixturesDir,
            }
        };

        process.Start();
        _processes.Add(process);
        _output.WriteLine($"Started tsx process {process.Id} for {scriptName}");
        return process;
    }

    /// <summary>
    /// Wait for a TypeScript process to be ready by watching for its startup
    /// message on stderr.
    /// </summary>
    private async Task WaitForProcessReady(Process process, int maxWaitMs = 5000)
    {
        var ready = new TaskCompletionSource<bool>();

        process.ErrorDataReceived += (_, e) =>
        {
            if (e.Data != null)
            {
                _output.WriteLine($"[ts-stderr] {e.Data}");
                if (e.Data.Contains("Starting ACP", StringComparison.Ordinal))
                {
                    ready.TrySetResult(true);
                }
            }
        };
        process.BeginErrorReadLine();

        using var cts = new CancellationTokenSource(maxWaitMs);
        cts.Token.Register(() => ready.TrySetResult(false));

        var result = await ready.Task;
        _output.WriteLine($"Process ready: {result}");
    }

    /// <summary>
    /// Wait for the TS client process to exit. The result is written to stderr.
    /// </summary>
    private static async Task WaitForTsClientExit(DotNetAgentContext ctx)
    {
        try
        {
            await ctx.Process.WaitForExitAsync(ctx.Cts.Token);
        }
        catch (OperationCanceledException)
        {
            // Timeout — the test will fail when trying to parse the result
        }
    }

    /// <summary>
    /// Test client implementation that records received notifications.
    /// </summary>
    private sealed class TestClient : IClient
    {
        public List<SessionNotification> ReceivedUpdates { get; } = [];

        public Task<RequestPermissionResponse> RequestPermissionAsync(
            RequestPermissionRequest request, CancellationToken ct = default)
        {
            return Task.FromResult(new RequestPermissionResponse
            {
                Outcome = new SelectedPermissionOutcome { OptionId = PermissionOptionKind.AllowOnce }
            });
        }

        public Task SessionUpdateAsync(SessionNotification notification, CancellationToken ct = default)
        {
            ReceivedUpdates.Add(notification);
            return Task.CompletedTask;
        }
    }

    /// <summary>
    /// Test agent implementation that sends session updates during prompts.
    /// </summary>
    private sealed class TestAgent : IAgent
    {
        private int _sessionCounter;
        public bool InitializeCalled { get; private set; }
        public bool NewSessionCalled { get; private set; }
        public bool PromptCalled { get; private set; }

        public AgentSideConnection? Connection { get; set; }

        public Task<InitializeResponse> InitializeAsync(InitializeRequest request, CancellationToken ct = default)
        {
            InitializeCalled = true;
            return Task.FromResult(new InitializeResponse
            {
                ProtocolVersion = Protocol.Version,
                AgentCapabilities = new AgentCapabilities(),
                AgentInfo = new Implementation { Name = "dotnet-test-agent", Version = "1.0.0" }
            });
        }

        public Task<NewSessionResponse> NewSessionAsync(NewSessionRequest request, CancellationToken ct = default)
        {
            NewSessionCalled = true;
            var sessionId = $"dotnet-session-{Interlocked.Increment(ref _sessionCounter)}";
            return Task.FromResult(new NewSessionResponse { SessionId = sessionId });
        }

        public async Task<PromptResponse> PromptAsync(PromptRequest request, CancellationToken ct = default)
        {
            PromptCalled = true;

            if (Connection != null)
            {
                await Connection.SendTextAsync(
                    request.SessionId,
                    "Echo from .NET agent: " + string.Join("",
                        request.Prompt.OfType<TextContent>().Select(t => t.Text)),
                    ct);
            }

            return new PromptResponse { StopReason = StopReason.EndTurn };
        }

        public Task CancelAsync(CancelNotification notification, CancellationToken ct = default)
            => Task.CompletedTask;
    }
}
