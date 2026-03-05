// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using AgentClientProtocol.Sdk.Stream;
using Moq;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests;

public class ConnectionTests
{
    [Fact]
    public void AgentSideConnection_Initialize_SetsAgent()
    {
        var mockAgent = new Mock<IAgent>();
        var mockStream = CreateMockStream();

        var connection = new AgentSideConnection(mockAgent.Object, mockStream);

        Assert.NotNull(connection);
    }

    [Fact]
    public async Task AgentSideConnection_ProcessInitialize_RoutesJsonRpcToAgent()
    {
        // Arrange: Create a real JSON-RPC request that will be parsed by the stream
        var initRequest = new InitializeRequest
        {
            ProtocolVersion = 1,
            ClientCapabilities = new ClientCapabilities()
        };

        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 1,
            Method = "initialize",
            Params = JsonSerializer.SerializeToElement(initRequest)
        };

        var requestJson = JsonSerializer.Serialize(jsonRpcRequest);
        var input = new StringReader(requestJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        mockAgent
            .Setup(a => a.InitializeAsync(It.IsAny<InitializeRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new InitializeResponse
            {
                ProtocolVersion = 1,
                AgentCapabilities = new AgentCapabilities()
            });

        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act: Run the connection (will process the message and exit when stream ends)
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert: Verify the agent received the call through the protocol
        mockAgent.Verify(
            a => a.InitializeAsync(
                It.Is<InitializeRequest>(r => r.ProtocolVersion == 1),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task AgentSideConnection_ProcessPrompt_RoutesJsonRpcToAgent()
    {
        // Arrange: Create a real JSON-RPC prompt request
        var promptRequest = new PromptRequest
        {
            SessionId = "test-session-123",
            Prompt = new ContentBlock[] { new TextContent { Text = "Hello, agent!" } }
        };

        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 42,
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
            .ReturnsAsync(new PromptResponse { StopReason = "end_turn" });

        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert: Verify the agent received the prompt through the protocol
        mockAgent.Verify(
            a => a.PromptAsync(
                It.Is<PromptRequest>(r => r.SessionId == "test-session-123"),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task AgentSideConnection_SendsJsonRpcResponse_OnSuccess()
    {
        // Arrange
        var initRequest = new InitializeRequest
        {
            ProtocolVersion = 1,
            ClientCapabilities = new ClientCapabilities()
        };

        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 99,
            Method = "initialize",
            Params = JsonSerializer.SerializeToElement(initRequest)
        };

        var requestJson = JsonSerializer.Serialize(jsonRpcRequest);
        var input = new StringReader(requestJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var mockAgent = new Mock<IAgent>();
        mockAgent
            .Setup(a => a.InitializeAsync(It.IsAny<InitializeRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new InitializeResponse
            {
                ProtocolVersion = 1,
                AgentCapabilities = new AgentCapabilities(),
                AgentInfo = new Implementation { Name = "TestAgent", Version = "1.0" }
            });

        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // Assert: Verify response was written to output
        var outputJson = output.ToString();
        Assert.NotEmpty(outputJson);
        Assert.Contains("\"id\":99", outputJson);
        Assert.Contains("\"result\"", outputJson);
        Assert.Contains("TestAgent", outputJson);
    }

    [Fact]
    public async Task AgentSideConnection_HandlesUnknownMethod_ReturnsError()
    {
        // Arrange: Send a request with an unknown method
        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 1,
            Method = "unknown/method",
            Params = JsonSerializer.SerializeToElement(new { })
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
        Assert.NotEmpty(outputJson);
        Assert.Contains("\"error\"", outputJson);
        Assert.Contains("-32601", outputJson); // Method not found error code
    }

    [Fact]
    public async Task AgentSideConnection_HandlesRequestError_ReturnsError()
    {
        // Arrange: Agent throws RequestError.SessionNotFound
        var promptRequest = new PromptRequest
        {
            SessionId = "unknown-session",
            Prompt = [new TextContent { Text = "test" }]
        };

        var jsonRpcRequest = new JsonRpcRequest
        {
            Id = 42,
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
            .ThrowsAsync(RequestError.SessionNotFound("unknown-session"));

        var connection = new AgentSideConnection(mockAgent.Object, stream);

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
        await connection.RunAsync(cts.Token);

        // Assert: Should return an error response with SessionNotFound code
        var outputJson = output.ToString();
        Assert.NotEmpty(outputJson);
        Assert.Contains("\"error\"", outputJson);
        Assert.Contains("-32001", outputJson); // SessionNotFound error code
        Assert.Contains("\"id\":42", outputJson);
    }

    private IAcpStream CreateMockStream()
    {
        var input = new StringReader("");
        var output = new StringWriter();
        return new NdJsonStream(input, output);
    }
}
