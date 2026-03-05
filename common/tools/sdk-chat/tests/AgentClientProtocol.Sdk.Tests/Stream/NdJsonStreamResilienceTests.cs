// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Stream;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests.Stream;

/// <summary>
/// Tests for NdJsonStream resilience - malformed JSON handling, empty lines, and stream recovery.
/// </summary>
public class NdJsonStreamResilienceTests
{
    #region Malformed JSON Resilience Tests (P0)

    [Fact]
    public async Task ReadAsync_MalformedJson_SkipsAndContinuesReading()
    {
        // Arrange - malformed line followed by valid message
        var input = """
            not valid json at all
            {"jsonrpc":"2.0","id":1,"method":"valid/method"}
            """;
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act
        var message = await stream.ReadAsync();

        // Assert - should skip malformed line and return the valid message
        Assert.NotNull(message);
        var request = Assert.IsType<JsonRpcRequest>(message);
        Assert.Equal("valid/method", request.Method);
    }

    [Fact]
    public async Task ReadAsync_MultipleMalformedLines_SkipsAllAndReturnsValid()
    {
        // Arrange - multiple malformed lines before valid message
        var input = """
            garbage1
            {broken json
            not even close}
            {"jsonrpc":"2.0","id":1,"method":"finally/valid"}
            """;
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act
        var message = await stream.ReadAsync();

        // Assert
        Assert.NotNull(message);
        var request = Assert.IsType<JsonRpcRequest>(message);
        Assert.Equal("finally/valid", request.Method);
    }

    [Fact]
    public async Task ReadAsync_InterleavedMalformedAndValid_ReturnsAllValid()
    {
        // Arrange
        var input = """
            {"jsonrpc":"2.0","id":1,"method":"first"}
            malformed
            {"jsonrpc":"2.0","id":2,"method":"second"}
            also broken {
            {"jsonrpc":"2.0","id":3,"method":"third"}
            """;
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act & Assert
        var msg1 = await stream.ReadAsync() as JsonRpcRequest;
        Assert.Equal("first", msg1?.Method);

        var msg2 = await stream.ReadAsync() as JsonRpcRequest;
        Assert.Equal("second", msg2?.Method);

        var msg3 = await stream.ReadAsync() as JsonRpcRequest;
        Assert.Equal("third", msg3?.Method);
    }

    [Fact]
    public async Task ReadAsync_UnknownMessageFormat_SkipsAndContinues()
    {
        // Arrange - valid JSON but not a recognized message format
        var input = """
            {"some":"random","json":"object"}
            {"jsonrpc":"2.0","id":1,"method":"valid"}
            """;
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act
        var message = await stream.ReadAsync();

        // Assert - should skip unknown format and return valid message
        Assert.NotNull(message);
        var request = Assert.IsType<JsonRpcRequest>(message);
        Assert.Equal("valid", request.Method);
    }

    [Fact]
    public async Task ReadAsync_OnlyMalformed_ReturnsNullAtEndOfStream()
    {
        // Arrange - only malformed content
        var input = """
            garbage
            more garbage
            """;
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act
        var message = await stream.ReadAsync();

        // Assert - returns null when stream ends with no valid messages
        Assert.Null(message);
    }

    #endregion

    #region Empty Line Handling Tests

    [Fact]
    public async Task ReadAsync_EmptyLines_SkipsAndReturnsValid()
    {
        // Arrange
        var input = """
            
            
            {"jsonrpc":"2.0","id":1,"method":"test"}
            
            """;
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act
        var message = await stream.ReadAsync();

        // Assert
        Assert.NotNull(message);
        var request = Assert.IsType<JsonRpcRequest>(message);
        Assert.Equal("test", request.Method);
    }

    [Fact]
    public async Task ReadAsync_WhitespaceOnlyLines_SkipsAndReturnsValid()
    {
        // Arrange
        var input = "   \n\t\t\n{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"test\"}\n";
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        // Act
        var message = await stream.ReadAsync();

        // Assert
        Assert.NotNull(message);
        var request = Assert.IsType<JsonRpcRequest>(message);
        Assert.Equal("test", request.Method);
    }

    #endregion

    #region Message Type Detection Tests

    [Fact]
    public async Task ReadAsync_Response_DetectedCorrectly()
    {
        var input = """{"jsonrpc":"2.0","id":1,"result":{"data":"value"}}""" + "\n";
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        var message = await stream.ReadAsync();

        Assert.IsType<JsonRpcResponse>(message);
    }

    [Fact]
    public async Task ReadAsync_ErrorResponse_DetectedCorrectly()
    {
        var input = """{"jsonrpc":"2.0","id":1,"error":{"code":-32600,"message":"Invalid"}}""" + "\n";
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        var message = await stream.ReadAsync();

        Assert.IsType<JsonRpcResponse>(message);
        var response = (JsonRpcResponse)message!;
        Assert.NotNull(response.Error);
        Assert.Equal(-32600, response.Error.Code);
    }

    [Fact]
    public async Task ReadAsync_Notification_DetectedCorrectly()
    {
        var input = """{"jsonrpc":"2.0","method":"notify/something","params":{}}""" + "\n";
        var stream = new NdJsonStream(new StringReader(input), new StringWriter());

        var message = await stream.ReadAsync();

        Assert.IsType<JsonRpcNotification>(message);
        var notification = (JsonRpcNotification)message!;
        Assert.Equal("notify/something", notification.Method);
    }

    #endregion

    #region Cancellation Tests

    [Fact]
    public async Task ReadAsync_Cancelled_ThrowsOperationCanceledException()
    {
        // Arrange - stream that blocks and respects cancellation
        var cts = new CancellationTokenSource();
        var input = new BlockingTextReader(cts.Token);
        var stream = new NdJsonStream(input, new StringWriter());

        // Act - start read, then cancel
        var readTask = stream.ReadAsync(cts.Token).AsTask();

        // Give a tiny moment for the read to start blocking
        await Task.Delay(10);

        // Cancel
        cts.Cancel();

        // Assert - should throw OperationCanceledException
        await Assert.ThrowsAnyAsync<OperationCanceledException>(() => readTask);
    }

    private class BlockingTextReader : TextReader
    {
        private readonly CancellationToken _ct;

        public BlockingTextReader(CancellationToken ct = default)
        {
            _ct = ct;
        }

        public override ValueTask<string?> ReadLineAsync(CancellationToken cancellationToken)
        {
            // Use the provided token or our stored one
            var token = cancellationToken.CanBeCanceled ? cancellationToken : _ct;
            return new ValueTask<string?>(
                Task.Delay(Timeout.Infinite, token).ContinueWith<string?>(
                    _ => null,
                    TaskContinuationOptions.OnlyOnRanToCompletion));
        }
    }

    #endregion
}
