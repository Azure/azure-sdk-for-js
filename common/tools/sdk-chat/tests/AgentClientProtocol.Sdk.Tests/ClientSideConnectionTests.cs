// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using AgentClientProtocol.Sdk.Schema;
using AgentClientProtocol.Sdk.Stream;
using Moq;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests;

/// <summary>
/// Tests for ClientSideConnection - client's view of ACP protocol.
/// </summary>
public class ClientSideConnectionTests
{
    [Fact]
    public void ClientSideConnection_CreatesSuccessfully()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        var stream = new NdJsonStream(new StringReader(""), new StringWriter());

        // Act
        var connection = new ClientSideConnection(mockClient.Object, stream);

        // Assert
        Assert.NotNull(connection);
    }

    [Fact]
    public void ClientSideConnection_ImplementsIAgent()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        var stream = new NdJsonStream(new StringReader(""), new StringWriter());

        // Act
        var connection = new ClientSideConnection(mockClient.Object, stream);

        // Assert
        Assert.IsAssignableFrom<IAgent>(connection);
    }

    [Fact]
    public async Task DisposeAsync_CompletesSuccessfully()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        var stream = new NdJsonStream(new StringReader(""), new StringWriter());
        var connection = new ClientSideConnection(mockClient.Object, stream);

        // Act & Assert - should not throw
        await connection.DisposeAsync();
    }

    #region Client Interface Tests

    [Fact]
    public async Task Client_RequestPermissionAsync_CallsHandler()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        mockClient
            .Setup(c => c.RequestPermissionAsync(It.IsAny<RequestPermissionRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new RequestPermissionResponse
            {
                Outcome = new SelectedPermissionOutcome { OptionId = "allow" }
            });

        // Act
        var response = await mockClient.Object.RequestPermissionAsync(new RequestPermissionRequest
        {
            SessionId = "sess_123",
            ToolCall = new ToolCallUpdate
            {
                ToolCallId = "tc_1",
                Title = "Run command",
                Status = ToolCallStatus.Pending,
                Kind = ToolKind.Execute
            },
            Options = new[] { new PermissionOption { OptionId = "allow", Name = "Allow", Kind = PermissionOptionKind.AllowOnce } }
        });

        // Assert
        Assert.NotNull(response.Outcome);
        var selected = Assert.IsType<SelectedPermissionOutcome>(response.Outcome);
        Assert.Equal("allow", selected.OptionId);
    }

    [Fact]
    public async Task Client_SessionUpdateAsync_ReceivesNotification()
    {
        // Arrange
        SessionNotification? receivedNotification = null;
        var mockClient = new Mock<IClient>();
        mockClient
            .Setup(c => c.SessionUpdateAsync(It.IsAny<SessionNotification>(), It.IsAny<CancellationToken>()))
            .Callback<SessionNotification, CancellationToken>((n, _) => receivedNotification = n)
            .Returns(Task.CompletedTask);

        // Act
        await mockClient.Object.SessionUpdateAsync(new SessionNotification
        {
            SessionId = "sess_123",
            Update = new AgentMessageChunk { Content = new TextContent { Text = "Hello" } }
        });

        // Assert
        Assert.NotNull(receivedNotification);
        Assert.Equal("sess_123", receivedNotification.SessionId);
    }

    [Fact]
    public async Task Client_ReadTextFileAsync_ReturnsContent()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        mockClient
            .Setup(c => c.ReadTextFileAsync(It.IsAny<ReadTextFileRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ReadTextFileResponse { Content = "file content here" });

        // Act
        var response = await mockClient.Object.ReadTextFileAsync(new ReadTextFileRequest
        {
            SessionId = "sess_123",
            Path = "/workspace/file.txt"
        });

        // Assert
        Assert.NotNull(response);
        Assert.Equal("file content here", response.Content);
    }

    [Fact]
    public async Task Client_WriteTextFileAsync_Succeeds()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        mockClient
            .Setup(c => c.WriteTextFileAsync(It.IsAny<WriteTextFileRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new WriteTextFileResponse());

        // Act
        var response = await mockClient.Object.WriteTextFileAsync(new WriteTextFileRequest
        {
            SessionId = "sess_123",
            Path = "/workspace/file.txt",
            Content = "new content"
        });

        // Assert
        Assert.NotNull(response);
    }

    [Fact]
    public async Task Client_CreateTerminalAsync_ReturnsTerminalId()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        mockClient
            .Setup(c => c.CreateTerminalAsync(It.IsAny<CreateTerminalRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new CreateTerminalResponse { TerminalId = "term_abc123" });

        // Act
        var response = await mockClient.Object.CreateTerminalAsync(new CreateTerminalRequest
        {
            SessionId = "sess_123",
            Command = "dotnet",
            Args = new[] { "build" },
            Cwd = "/workspace"
        });

        // Assert
        Assert.NotNull(response);
        Assert.Equal("term_abc123", response.TerminalId);
    }

    [Fact]
    public async Task Client_TerminalOutputAsync_ReturnsOutput()
    {
        // Arrange
        var mockClient = new Mock<IClient>();
        mockClient
            .Setup(c => c.TerminalOutputAsync(It.IsAny<TerminalOutputRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new TerminalOutputResponse { Output = "Build succeeded.\n", Truncated = false });

        // Act
        var response = await mockClient.Object.TerminalOutputAsync(new TerminalOutputRequest
        {
            SessionId = "sess_123",
            TerminalId = "term_abc123"
        });

        // Assert
        Assert.NotNull(response);
        Assert.Equal("Build succeeded.\n", response.Output);
    }

    #endregion

    #region Permission Outcome Tests

    [Fact]
    public void SelectedPermissionOutcome_SerializesCorrectly()
    {
        // Arrange
        var outcome = new SelectedPermissionOutcome { OptionId = "allow_once" };

        // Act
        var json = JsonSerializer.Serialize<RequestPermissionOutcome>(outcome);

        // Assert
        Assert.Contains("\"outcome\":\"selected\"", json);
        Assert.Contains("\"optionId\":\"allow_once\"", json);
    }

    [Fact]
    public void CancelledPermissionOutcome_SerializesCorrectly()
    {
        // Arrange
        var outcome = new CancelledPermissionOutcome();

        // Act
        var json = JsonSerializer.Serialize<RequestPermissionOutcome>(outcome);

        // Assert
        Assert.Contains("\"outcome\":\"cancelled\"", json);
    }

    #endregion
}
