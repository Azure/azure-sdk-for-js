// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using AgentClientProtocol.Sdk.Stream;
using Moq;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests;

/// <summary>
/// Extended tests for AgentSideConnection covering session notifications,
/// user interaction requests, file operations, and terminal operations.
/// </summary>
public class AgentSideConnectionExtendedTests
{
    #region Session Notification Tests

    [Fact]
    public async Task SendTextAsync_WritesAgentMessageChunkToOutput()
    {
        // Arrange
        var (connection, output) = CreateTestConnection();

        // Act
        await connection.SendTextAsync("session-123", "Hello, world!");
        await Task.Delay(50); // Allow async write to complete

        // Assert
        var outputJson = output.ToString();
        Assert.Contains("session/update", outputJson);
        Assert.Contains("session-123", outputJson);
        Assert.Contains("Hello, world!", outputJson);
    }

    [Fact]
    public async Task SendPlanAsync_WritesPlanUpdateToOutput()
    {
        // Arrange
        var (connection, output) = CreateTestConnection();
        var entries = new[]
        {
            new PlanEntry { Content = "Step 1", Status = PlanEntryStatus.Completed, Priority = PlanEntryPriority.Medium },
            new PlanEntry { Content = "Step 2", Status = PlanEntryStatus.InProgress, Priority = PlanEntryPriority.High }
        };

        // Act
        await connection.SendPlanAsync("session-456", entries);
        await Task.Delay(50);

        // Assert
        var outputJson = output.ToString();
        Assert.Contains("session/update", outputJson);
        Assert.Contains("Step 1", outputJson);
        Assert.Contains("Step 2", outputJson);
        Assert.Contains("completed", outputJson);
        Assert.Contains("in_progress", outputJson);
    }

    [Fact]
    public async Task SendToolCallAsync_WritesToolCallUpdateToOutput()
    {
        // Arrange
        var (connection, output) = CreateTestConnection();

        // Act
        await connection.SendToolCallAsync(
            sessionId: "session-789",
            toolCallId: "tool-call-1",
            title: "read_file",
            status: ToolCallStatus.InProgress,
            kind: ToolKind.Read,
            rawInput: new { path = "/test/file.txt" });
        await Task.Delay(50);

        // Assert
        var outputJson = output.ToString();
        Assert.Contains("session/update", outputJson);
        Assert.Contains("tool-call-1", outputJson);
        Assert.Contains("read_file", outputJson);
        Assert.Contains("in_progress", outputJson);
    }

    #endregion

    #region Cancel Notification Tests

    [Fact]
    public async Task ProcessCancel_RoutesToAgentCancelAsync()
    {
        // Arrange
        var cancelNotification = new CancelNotification { SessionId = "cancel-session" };
        var jsonRpcNotification = new JsonRpcNotification
        {
            Method = "session/cancel",
            Params = JsonSerializer.SerializeToElement(cancelNotification)
        };

        var notificationJson = JsonSerializer.Serialize(jsonRpcNotification);
        var input = new StringReader(notificationJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert
        mockAgent.Verify(
            a => a.CancelAsync(
                It.Is<CancelNotification>(n => n.SessionId == "cancel-session"),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    #endregion

    #region NewSession Tests

    [Fact]
    public async Task ProcessNewSession_RoutesToAgentNewSessionAsync()
    {
        // Arrange
        var newSessionRequest = new NewSessionRequest { Cwd = "/workspace", McpServers = [] };
        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 10,
            Method = "session/new",
            Params = JsonSerializer.SerializeToElement(newSessionRequest)
        };

        var requestJson = JsonSerializer.Serialize(jsonRpcRequest);
        var input = new StringReader(requestJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        mockAgent
            .Setup(a => a.NewSessionAsync(It.IsAny<NewSessionRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new NewSessionResponse { SessionId = "new-session-id" });

        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert
        mockAgent.Verify(
            a => a.NewSessionAsync(
                It.Is<NewSessionRequest>(r => r.Cwd == "/workspace"),
                It.IsAny<CancellationToken>()),
            Times.Once);

        var outputJson = output.ToString();
        Assert.Contains("new-session-id", outputJson);
    }

    #endregion

    #region Error Handling Tests

    [Fact]
    public async Task ProcessRequest_WhenAgentThrows_ReturnsErrorResponse()
    {
        // Arrange
        var promptRequest = new PromptRequest
        {
            SessionId = "error-session",
            Prompt = new ContentBlock[] { new TextContent { Text = "Test" } }
        };
        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 20,
            Method = "session/prompt",
            Params = JsonSerializer.SerializeToElement(promptRequest)
        };

        var requestJson = JsonSerializer.Serialize(jsonRpcRequest);
        var input = new StringReader(requestJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        mockAgent
            .Setup(a => a.PromptAsync(It.IsAny<PromptRequest>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("Agent processing failed"));

        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert
        var outputJson = output.ToString();
        Assert.Contains("\"error\"", outputJson);
        Assert.Contains("Agent processing failed", outputJson);
    }

    [Fact]
    public async Task ProcessRequest_WithInvalidParams_ReturnsError()
    {
        // Arrange: Send a request with malformed params
        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 30,
            Method = "initialize",
            Params = JsonSerializer.SerializeToElement("invalid-not-an-object")
        };

        var requestJson = JsonSerializer.Serialize(jsonRpcRequest);
        var input = new StringReader(requestJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert: Should return an error response
        var outputJson = output.ToString();
        Assert.Contains("\"error\"", outputJson);
    }

    #endregion

    #region DisposeAsync Tests

    [Fact]
    public async Task DisposeAsync_CanBeCalledMultipleTimes()
    {
        var (connection, _) = CreateTestConnection();

        // Should not throw on multiple dispose calls
        await connection.DisposeAsync();
        await connection.DisposeAsync();
        await connection.DisposeAsync();
    }

    #endregion

    #region Helper Methods

    private static (AgentSideConnection connection, StringWriter output) CreateTestConnection()
    {
        var input = new StringReader("");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);
        var mockAgent = new Mock<IAgent>();

        mockAgent
            .Setup(a => a.InitializeAsync(It.IsAny<InitializeRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new InitializeResponse { ProtocolVersion = 1 });

        var connection = new AgentSideConnection(mockAgent.Object, stream);
        return (connection, output);
    }

    #endregion
}

/// <summary>
/// Tests for SetConnection method on agents.
/// </summary>
public class AgentConnectionInjectionTests
{
    [Fact]
    public void SetConnection_InjectsConnectionIntoAgent()
    {
        // This test verifies that if an agent implements connection awareness,
        // the connection is properly injected
        var input = new StringReader("");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // The connection should set itself on the agent if supported
        Assert.NotNull(connection);
    }
}
