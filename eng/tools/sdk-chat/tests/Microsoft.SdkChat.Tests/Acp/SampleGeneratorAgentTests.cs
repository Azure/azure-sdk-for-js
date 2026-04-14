// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.IO.Pipes;
using AgentClientProtocol.Sdk;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using AgentClientProtocol.Sdk.Stream;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Acp;
using Microsoft.SdkChat.Configuration;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.Acp;

/// <summary>
/// Tests for the ACP Sample Generator agent.
///
/// The agent no longer calls AI directly - it:
/// 1. Analyzes SDK and builds AI prompts
/// 2. Returns prompts to client for AI generation
/// 3. Receives samples from client and writes to disk
/// </summary>
[Collection("SdkInfoCache")]
public class SampleGeneratorAgentTests : IDisposable
{
    private readonly string _testRoot;
    private readonly ServiceProvider _services;

    public SampleGeneratorAgentTests()
    {
        _testRoot = Path.Combine(Path.GetTempPath(), $"AcpAgentTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testRoot);

        var serviceCollection = new ServiceCollection();
        serviceCollection.AddLogging(b => b.SetMinimumLevel(LogLevel.Debug));
        serviceCollection.AddSingleton(SdkChatOptions.FromEnvironment());
        serviceCollection.AddSingleton<FileHelper>();
        serviceCollection.AddSingleton<IPackageInfoService, PackageInfoService>();

        _services = serviceCollection.BuildServiceProvider();
    }

    public void Dispose()
    {
        _services.Dispose();
        SdkInfo.ClearCache();
        try
        {
            if (Directory.Exists(_testRoot))
                Directory.Delete(_testRoot, recursive: true);
        }
        catch { }
        GC.SuppressFinalize(this);
    }

    #region IAgent Interface Tests (via SDK client)

    [Fact]
    public async Task InitializeAsync_ReturnsProtocolInfo()
    {
        await using var harness = await CreateHarnessAsync();
        var response = await harness.Client.InitializeAsync(new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities()
        });

        Assert.NotNull(response);
        Assert.Equal(Protocol.Version, response.ProtocolVersion);
        Assert.NotNull(response.AgentInfo);
        Assert.Equal("sdk-chat", response.AgentInfo.Name);
        Assert.Equal("1.0.0", response.AgentInfo.Version);
    }

    [Fact]
    public async Task InitializeAsync_ReturnsSessionCapabilities()
    {
        await using var harness = await CreateHarnessAsync();
        var response = await harness.Client.InitializeAsync(new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities()
        });

        Assert.NotNull(response.AgentCapabilities);
        Assert.NotNull(response.AgentCapabilities.SessionCapabilities);
    }

    [Fact]
    public async Task NewSessionAsync_CreatesUniqueSession()
    {
        await using var harness = await CreateHarnessAsync();
        var request = new NewSessionRequest { Cwd = _testRoot, McpServers = [] };

        var response1 = await harness.Client.NewSessionAsync(request);
        var response2 = await harness.Client.NewSessionAsync(request);

        Assert.NotNull(response1.SessionId);
        Assert.NotNull(response2.SessionId);
        Assert.NotEqual(response1.SessionId, response2.SessionId);
        Assert.StartsWith("sess_", response1.SessionId);
        Assert.StartsWith("sess_", response2.SessionId);
    }

    [Fact]
    public async Task PromptAsync_WithUnknownSession_ThrowsRequestError()
    {
        await using var harness = await CreateHarnessAsync();
        var request = new PromptRequest
        {
            SessionId = "unknown-session-id",
            Prompt = [new TextContent { Text = "test" }]
        };

        var ex = await Assert.ThrowsAsync<RequestError>(() => harness.Client.PromptAsync(request));
        Assert.Equal(-32001, ex.Code); // SessionNotFound error code
    }

    [Fact]
    public async Task CancelAsync_DoesNotThrow()
    {
        await using var harness = await CreateHarnessAsync();
        var notification = new CancelNotification { SessionId = "any-session" };

        await harness.Client.CancelAsync(notification);
    }

    #endregion

    #region Phase-Based Flow Tests

    [Fact]
    public async Task PromptAsync_InitialPhase_AsksForSdkPath()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, "Generate samples"));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
        // Agent should now be awaiting SDK path
    }

    [Fact]
    public async Task PromptAsync_UnknownLanguage_ReturnsEndTurn()
    {
        await using var harness = await CreateHarnessAsync();
        // Empty directory - no project files

        var sessionId = await CreateSessionAsync(harness.Client);

        // Phase 1: Initial - asks for SDK path
        await harness.Client.PromptAsync(CreatePrompt(sessionId, "Generate"));

        // Phase 2: Provide SDK path (use default workspace)
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, ""));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
    }

    [Fact]
    public async Task PromptAsync_OutputFolderPhase_AsksForSampleCount()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        // Phase 1: Initial - asks for SDK path
        await harness.Client.PromptAsync(CreatePrompt(sessionId, "Generate"));

        // Phase 2: Provide SDK path (use default)
        await harness.Client.PromptAsync(CreatePrompt(sessionId, ""));

        // Phase 3: Provide output folder (empty = use default)
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, ""));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
        // Agent should now be awaiting sample count
    }

    [Fact]
    public async Task PromptAsync_ConfirmationPhase_ReturnsPromptData()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        await AdvanceToSampleCountAsync(harness.Client, sessionId);

        // Phase 4: Provide sample count
        await harness.Client.PromptAsync(CreatePrompt(sessionId, "3"));

        // Phase 5: Confirm to get prompt
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, "generate"));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
        Assert.NotNull(response.Meta);
        Assert.True(response.Meta.ContainsKey("promptData"));
    }

    [Fact]
    public async Task PromptAsync_SamplesPhase_WritesFiles()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        await AdvanceToSamplesPhaseAsync(harness.Client, sessionId);

        // Phase 6: Send samples JSON
        var samplesJson = """[{"name":"HelloWorld","description":"A hello world sample","code":"Console.WriteLine(\"Hello\");","filePath":"HelloWorld.cs"}]""";
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, samplesJson));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);

        // Verify file was written
        var outputPath = Path.Combine(_testRoot, "examples", "HelloWorld.cs");
        Assert.True(File.Exists(outputPath), $"Expected file at {outputPath}");
        var content = await File.ReadAllTextAsync(outputPath);
        Assert.Contains("Hello", content);
    }

    [Fact]
    public async Task PromptAsync_CancelDuringConfirmation_Exits()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        await AdvanceToConfirmationPhaseAsync(harness.Client, sessionId);

        // Cancel instead of confirm
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, "cancel"));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);

        await Assert.ThrowsAsync<RequestError>(() => harness.Client.PromptAsync(CreatePrompt(sessionId, "generate")));
    }

    #endregion

    #region Additional Scenario Coverage

    [Fact]
    public async Task PromptAsync_SdkPath_AllowsRetryAfterUnknownLanguage()
    {
        await using var harness = await CreateHarnessAsync();

        var sessionId = await CreateSessionAsync(harness.Client);

        await harness.Client.PromptAsync(CreatePrompt(sessionId, "Generate"));
        await harness.Client.PromptAsync(CreatePrompt(sessionId, ""));

        var sdkDir = Path.Combine(_testRoot, "sdk");
        CreateDotNetProject(sdkDir);

        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, sdkDir));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
    }

    [Fact]
    public async Task PromptAsync_SampleCount_InvalidThenValid_ReturnsPromptData()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        await AdvanceToSampleCountAsync(harness.Client, sessionId);

        var invalidResponse = await harness.Client.PromptAsync(CreatePrompt(sessionId, "0"));
        Assert.Equal(StopReason.EndTurn, invalidResponse.StopReason);

        await harness.Client.PromptAsync(CreatePrompt(sessionId, "2"));
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, "generate"));

        Assert.NotNull(response.Meta);
        Assert.True(response.Meta.ContainsKey("promptData"));
    }

    [Fact]
    public async Task PromptAsync_ConfirmationPhase_AcceptsEmptyInput()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        await AdvanceToConfirmationPhaseAsync(harness.Client, sessionId);

        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, ""));

        Assert.NotNull(response.Meta);
        Assert.True(response.Meta.ContainsKey("promptData"));
    }

    [Fact]
    public async Task PromptAsync_ConfirmationPhase_RejectsUnexpectedInput()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);

        await AdvanceToConfirmationPhaseAsync(harness.Client, sessionId);

        var reject = await harness.Client.PromptAsync(CreatePrompt(sessionId, "nope"));
        Assert.Null(reject.Meta);

        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, ""));
        Assert.NotNull(response.Meta);
        Assert.True(response.Meta.ContainsKey("promptData"));
    }

    [Fact]
    public async Task PromptAsync_SamplesPhase_InvalidJsonThenValid_WritesFiles()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);
        await AdvanceToSamplesPhaseAsync(harness.Client, sessionId);

        var invalidResponse = await harness.Client.PromptAsync(CreatePrompt(sessionId, "{not-json"));
        Assert.Equal(StopReason.EndTurn, invalidResponse.StopReason);

        var samplesJson = """[{"name":"RetrySample","description":"retry","code":"Console.WriteLine(\"Retry\");","filePath":"RetrySample.cs"}]""";
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, samplesJson));

        Assert.Equal(StopReason.EndTurn, response.StopReason);

        var outputPath = Path.Combine(_testRoot, "examples", "RetrySample.cs");
        Assert.True(File.Exists(outputPath), $"Expected file at {outputPath}");
    }

    [Fact]
    public async Task PromptAsync_SamplesPhase_EmptyArrayThenValid_WritesFiles()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);
        await AdvanceToSamplesPhaseAsync(harness.Client, sessionId);

        var emptyResponse = await harness.Client.PromptAsync(CreatePrompt(sessionId, "[]"));
        Assert.Equal(StopReason.EndTurn, emptyResponse.StopReason);

        var samplesJson = """[{"name":"SecondTry","description":"retry","code":"Console.WriteLine(\"Second\");","filePath":"SecondTry.cs"}]""";
        await harness.Client.PromptAsync(CreatePrompt(sessionId, samplesJson));

        var outputPath = Path.Combine(_testRoot, "examples", "SecondTry.cs");
        Assert.True(File.Exists(outputPath), $"Expected file at {outputPath}");
    }

    [Fact]
    public async Task PromptAsync_SamplesPhase_SkipsOutsideOutputFolder()
    {
        await using var harness = await CreateHarnessAsync();
        CreateDotNetProject();

        var sessionId = await CreateSessionAsync(harness.Client);
        await AdvanceToSamplesPhaseAsync(harness.Client, sessionId);

        var samplesJson = """[{"name":"Escape","description":"bad","code":"Console.WriteLine(\"Escape\");","filePath":"../escape.cs"}]""";
        await harness.Client.PromptAsync(CreatePrompt(sessionId, samplesJson));

        var outputPath = Path.Combine(_testRoot, "escape.cs");
        Assert.False(File.Exists(outputPath), $"Did not expect file at {outputPath}");
    }

    [Fact]
    public async Task PromptAsync_SdkPath_RelativeToCwd_Works()
    {
        await using var harness = await CreateHarnessAsync();

        var sdkDir = Path.Combine(_testRoot, "relative-sdk");
        CreateDotNetProject(sdkDir);

        var sessionId = await CreateSessionAsync(harness.Client);

        await harness.Client.PromptAsync(CreatePrompt(sessionId, "Generate"));
        var response = await harness.Client.PromptAsync(CreatePrompt(sessionId, "relative-sdk"));

        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
    }

    #endregion

    #region Helper Methods

    private async Task<AcpHarness> CreateHarnessAsync()
    {
        var logger = _services.GetRequiredService<ILogger<SampleGeneratorAgent>>();
        var agent = new SampleGeneratorAgent(_services, logger);
        var clientImpl = new TestClient();

        var (agentStream, clientStream, streams) = CreateDuplexStreams();

        var agentConnection = new AgentSideConnection(agent, agentStream);
        var clientConnection = new ClientSideConnection(clientImpl, clientStream);

        agent.SetConnection(agentConnection);

        var cts = new CancellationTokenSource();
        var agentTask = agentConnection.RunAsync(cts.Token);
        var clientTask = clientConnection.RunAsync(cts.Token);

        // Give the loops a moment to start.
        await Task.Yield();

        return new AcpHarness(
            agent,
            clientConnection,
            clientImpl,
            agentConnection,
            cts,
            agentTask,
            clientTask,
            streams);
    }

    private static (NdJsonStream agentStream, NdJsonStream clientStream, Stream[] streams) CreateDuplexStreams()
    {
        var agentToClient = new AnonymousPipeServerStream(PipeDirection.Out);
        var clientFromAgent = new AnonymousPipeClientStream(PipeDirection.In, agentToClient.ClientSafePipeHandle);

        var clientToAgent = new AnonymousPipeServerStream(PipeDirection.Out);
        var agentFromClient = new AnonymousPipeClientStream(PipeDirection.In, clientToAgent.ClientSafePipeHandle);

        var agentStream = new NdJsonStream(
            new StreamReader(agentFromClient),
            new StreamWriter(agentToClient) { AutoFlush = true });

        var clientStream = new NdJsonStream(
            new StreamReader(clientFromAgent),
            new StreamWriter(clientToAgent) { AutoFlush = true });

        return (agentStream, clientStream, [agentToClient, clientFromAgent, clientToAgent, agentFromClient]);
    }

    private async Task<string> CreateSessionAsync(ClientSideConnection client)
    {
        var session = await client.NewSessionAsync(new NewSessionRequest { Cwd = _testRoot, McpServers = [] });
        return session.SessionId;
    }

    private static PromptRequest CreatePrompt(string sessionId, string text) => new()
    {
        SessionId = sessionId,
        Prompt = [new TextContent { Text = text }]
    };

    private async Task AdvanceToSampleCountAsync(ClientSideConnection client, string sessionId, string? sdkPath = null, string? outputPath = null)
    {
        await client.PromptAsync(CreatePrompt(sessionId, "Generate"));
        await client.PromptAsync(CreatePrompt(sessionId, sdkPath ?? ""));
        await client.PromptAsync(CreatePrompt(sessionId, outputPath ?? ""));
    }

    private async Task AdvanceToConfirmationPhaseAsync(ClientSideConnection client, string sessionId)
    {
        await AdvanceToSampleCountAsync(client, sessionId);
        await client.PromptAsync(CreatePrompt(sessionId, ""));
    }

    private async Task AdvanceToSamplesPhaseAsync(ClientSideConnection client, string sessionId)
    {
        await AdvanceToConfirmationPhaseAsync(client, sessionId);
        await client.PromptAsync(CreatePrompt(sessionId, "generate"));
    }

    private void CreateDotNetProject(string? root = null)
    {
        var projectRoot = root ?? _testRoot;
        var srcDir = Path.Combine(projectRoot, "src");
        Directory.CreateDirectory(srcDir);
        File.WriteAllText(Path.Combine(srcDir, "MyProject.csproj"), "<Project />");
        File.WriteAllText(Path.Combine(srcDir, "Client.cs"), "public class Client { }");
    }

    private sealed class TestClient : IClient
    {
        public ConcurrentQueue<SessionNotification> Updates { get; } = new();

        public Task<RequestPermissionResponse> RequestPermissionAsync(RequestPermissionRequest request, CancellationToken ct = default)
        {
            return Task.FromResult(new RequestPermissionResponse
            {
                Outcome = new SelectedPermissionOutcome { OptionId = PermissionOptionKind.AllowOnce }
            });
        }

        public Task SessionUpdateAsync(SessionNotification notification, CancellationToken ct = default)
        {
            Updates.Enqueue(notification);
            return Task.CompletedTask;
        }
    }

    private sealed class AcpHarness : IAsyncDisposable
    {
        private readonly AgentSideConnection _agentConnection;
        private readonly CancellationTokenSource _cts;
        private readonly Task _agentTask;
        private readonly Task _clientTask;
        private readonly Stream[] _streams;

        public AcpHarness(
            SampleGeneratorAgent agent,
            ClientSideConnection client,
            TestClient clientImpl,
            AgentSideConnection agentConnection,
            CancellationTokenSource cts,
            Task agentTask,
            Task clientTask,
            Stream[] streams)
        {
            Agent = agent;
            Client = client;
            ClientImpl = clientImpl;
            _agentConnection = agentConnection;
            _cts = cts;
            _agentTask = agentTask;
            _clientTask = clientTask;
            _streams = streams;
        }

        public SampleGeneratorAgent Agent { get; }
        public ClientSideConnection Client { get; }
        public TestClient ClientImpl { get; }

        public async ValueTask DisposeAsync()
        {
            _cts.Cancel();

            await _agentConnection.DisposeAsync();
            await Client.DisposeAsync();

            try { await Task.WhenAll(_agentTask, _clientTask).WaitAsync(TimeSpan.FromMilliseconds(500)); } catch { }

            foreach (var stream in _streams)
            {
                try { stream.Dispose(); } catch { }
            }

            _cts.Dispose();
        }
    }

    #endregion
}
