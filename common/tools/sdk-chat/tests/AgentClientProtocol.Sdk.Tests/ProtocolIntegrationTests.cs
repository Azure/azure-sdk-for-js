// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.Schema;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests;

/// <summary>
/// Integration tests for ACP protocol components.
/// Tests individual agent/client implementations work correctly.
/// Full bidirectional stream tests require System.IO.Pipelines infrastructure.
/// </summary>
public class ProtocolIntegrationTests
{
    [Fact]
    public void TestInfrastructure_TestAgentImplementsInterface()
    {
        // Arrange & Act
        var agent = new TestAgent();

        // Assert
        Assert.IsAssignableFrom<IAgent>(agent);
    }

    [Fact]
    public void TestInfrastructure_TestClientImplementsInterface()
    {
        // Arrange & Act
        var client = new TestClient();

        // Assert
        Assert.IsAssignableFrom<IClient>(client);
    }

    [Fact]
    public async Task TestAgent_Initialize_ReturnsValidResponse()
    {
        // Arrange
        var agent = new TestAgent();
        var request = new InitializeRequest
        {
            ProtocolVersion = Protocol.Version,
            ClientCapabilities = new ClientCapabilities()
        };

        // Act
        var response = await agent.InitializeAsync(request);

        // Assert
        Assert.NotNull(response);
        Assert.Equal(Protocol.Version, response.ProtocolVersion);
        Assert.NotNull(response.AgentInfo);
        Assert.Equal("test-agent", response.AgentInfo.Name);
    }

    [Fact]
    public async Task TestAgent_NewSession_ReturnsSessionId()
    {
        // Arrange
        var agent = new TestAgent();
        var request = new NewSessionRequest { Cwd = "/test", McpServers = [] };

        // Act
        var response = await agent.NewSessionAsync(request);

        // Assert
        Assert.NotNull(response);
        Assert.StartsWith("test-session-", response.SessionId);
    }

    [Fact]
    public async Task TestAgent_Prompt_ReturnsEndTurn()
    {
        // Arrange
        var agent = new TestAgent();
        var request = new PromptRequest
        {
            SessionId = "test-session",
            Prompt = [new TextContent { Text = "Test prompt" }]
        };

        // Act
        var response = await agent.PromptAsync(request);

        // Assert
        Assert.NotNull(response);
        Assert.Equal(StopReason.EndTurn, response.StopReason);
    }

    [Fact]
    public async Task TestClient_RequestPermission_ReturnsOutcome()
    {
        // Arrange
        var client = new TestClient();
        var request = new RequestPermissionRequest
        {
            SessionId = "test-session",
            ToolCall = new ToolCallUpdate
            {
                ToolCallId = "test-tool-call",
                Title = "Test Permission",
                Status = ToolCallStatus.Pending,
                Kind = ToolKind.Read
            },
            Options = [new PermissionOption { OptionId = PermissionOptionKind.AllowOnce, Name = "Allow Once", Kind = PermissionOptionKind.AllowOnce }]
        };

        // Act
        var response = await client.RequestPermissionAsync(request);

        // Assert
        Assert.NotNull(response);
        Assert.NotNull(response.Outcome);
        Assert.IsType<SelectedPermissionOutcome>(response.Outcome);
    }

    private class TestAgent : IAgent
    {
        public Task<InitializeResponse> InitializeAsync(InitializeRequest request, CancellationToken ct = default)
        {
            return Task.FromResult(new InitializeResponse
            {
                ProtocolVersion = Protocol.Version,
                AgentCapabilities = new AgentCapabilities(),
                AgentInfo = new Implementation { Name = "test-agent", Version = "1.0.0" }
            });
        }

        public Task<NewSessionResponse> NewSessionAsync(NewSessionRequest request, CancellationToken ct = default)
        {
            return Task.FromResult(new NewSessionResponse
            {
                SessionId = $"test-session-{Guid.NewGuid():N}"
            });
        }

        public Task<PromptResponse> PromptAsync(PromptRequest request, CancellationToken ct = default)
        {
            return Task.FromResult(new PromptResponse { StopReason = StopReason.EndTurn });
        }

        public Task CancelAsync(CancelNotification notification, CancellationToken ct = default)
            => Task.CompletedTask;
    }

    private class TestClient : IClient
    {
        public Task<RequestPermissionResponse> RequestPermissionAsync(RequestPermissionRequest request, CancellationToken ct = default)
        {
            return Task.FromResult(new RequestPermissionResponse
            {
                Outcome = new SelectedPermissionOutcome { OptionId = PermissionOptionKind.AllowOnce }
            });
        }

        public Task SessionUpdateAsync(SessionNotification notification, CancellationToken ct = default)
        {
            return Task.CompletedTask;
        }
    }
}
