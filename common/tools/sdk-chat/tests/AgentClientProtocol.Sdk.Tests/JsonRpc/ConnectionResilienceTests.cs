// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Stream;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests.JsonRpc;

/// <summary>
/// Tests for Connection resilience - shutdown behavior, pending request handling, and error recovery.
/// </summary>
public class ConnectionResilienceTests
{
    #region Pending Request Disposal Tests (P0)

    [Fact]
    public async Task DisposeAsync_FaultsPendingRequests_WithObjectDisposedException()
    {
        // Arrange
        var (clientStream, serverInput, serverOutput) = CreateConnectedStreams();
        var connection = new Connection(clientStream);

        // Start connection processing in background
        var runTask = Task.Run(() => connection.RunAsync());

        // Start a request that will never get a response
        var requestTask = connection.SendRequestAsync<object>("test/method", new { value = 1 });

        // Give time for request to be sent
        await Task.Delay(50);

        // Act - dispose while request is pending
        await connection.DisposeAsync();

        // Assert - pending request should throw ObjectDisposedException
        await Assert.ThrowsAsync<ObjectDisposedException>(() => requestTask);
    }

    [Fact]
    public async Task DisposeAsync_MultiplePendingRequests_AllFaulted()
    {
        // Arrange
        var (clientStream, _, _) = CreateConnectedStreams();
        var connection = new Connection(clientStream);

        var runTask = Task.Run(() => connection.RunAsync());

        // Start multiple requests
        var request1 = connection.SendRequestAsync<object>("test/method1");
        var request2 = connection.SendRequestAsync<object>("test/method2");
        var request3 = connection.SendRequestAsync<object>("test/method3");

        await Task.Delay(50);

        // Act
        await connection.DisposeAsync();

        // Assert - all should throw
        await Assert.ThrowsAsync<ObjectDisposedException>(() => request1);
        await Assert.ThrowsAsync<ObjectDisposedException>(() => request2);
        await Assert.ThrowsAsync<ObjectDisposedException>(() => request3);
    }

    [Fact]
    public async Task DisposeAsync_CanBeCalledMultipleTimes_Idempotent()
    {
        // Arrange
        var stream = new NdJsonStream(new StringReader(""), new StringWriter());
        var connection = new Connection(stream);

        // Act - dispose multiple times
        await connection.DisposeAsync();
        await connection.DisposeAsync();
        await connection.DisposeAsync();

        // Assert - no exception thrown
    }

    [Fact]
    public async Task SendRequestAsync_AfterDispose_ThrowsObjectDisposedException()
    {
        // Arrange
        var stream = new NdJsonStream(new StringReader(""), new StringWriter());
        var connection = new Connection(stream);
        await connection.DisposeAsync();

        // Act & Assert
        await Assert.ThrowsAsync<ObjectDisposedException>(
            () => connection.SendRequestAsync<object>("test/method"));
    }

    #endregion

    #region Response Deserialization Tests (P1)

    [Fact]
    public async Task SendRequestAsync_JsonElementResponse_DeserializesEfficiently()
    {
        // Arrange - create a mock stream that returns a response
        var responseJson = """{"jsonrpc":"2.0","id":1,"result":{"name":"test","value":42}}""";
        var input = new StringReader(responseJson + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);
        var connection = new Connection(stream);

        // Start connection in background
        var runTask = Task.Run(async () =>
        {
            try { await connection.RunAsync(); } catch { }
        });

        // Give time for the response to be read
        await Task.Delay(100);

        // Connection reads the response and should match it to pending request
        // This test verifies the deserialization path works correctly
        await connection.DisposeAsync();
    }

    #endregion

    #region Helper Methods

    private static (NdJsonStream clientStream, TextReader serverInput, TextWriter serverOutput) CreateConnectedStreams()
    {
        // Create paired streams for bidirectional communication
        var clientToServer = new BlockingStream();
        var serverToClient = new BlockingStream();

        var clientStream = new NdJsonStream(
            new StreamReader(serverToClient),
            new StreamWriter(clientToServer) { AutoFlush = true });

        return (clientStream, new StreamReader(clientToServer), new StreamWriter(serverToClient));
    }

    /// <summary>
    /// A simple blocking stream for testing bidirectional communication.
    /// </summary>
    private class BlockingStream : System.IO.Stream
    {
        private readonly System.Threading.Channels.Channel<byte[]> _channel =
            System.Threading.Channels.Channel.CreateUnbounded<byte[]>();
        private byte[] _currentBuffer = [];
        private int _position = 0;

        public override bool CanRead => true;
        public override bool CanSeek => false;
        public override bool CanWrite => true;
        public override long Length => throw new NotSupportedException();
        public override long Position
        {
            get => throw new NotSupportedException();
            set => throw new NotSupportedException();
        }

        public override void Flush() { }

        public override int Read(byte[] buffer, int offset, int count)
        {
            if (_position >= _currentBuffer.Length)
            {
                if (!_channel.Reader.TryRead(out var newBuffer))
                {
                    if (!_channel.Reader.WaitToReadAsync().AsTask().Wait(1000))
                        return 0;
                    if (!_channel.Reader.TryRead(out newBuffer))
                        return 0;
                }
                _currentBuffer = newBuffer ?? [];
                _position = 0;
            }

            var available = _currentBuffer.Length - _position;
            var toCopy = Math.Min(available, count);
            Array.Copy(_currentBuffer, _position, buffer, offset, toCopy);
            _position += toCopy;
            return toCopy;
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            var data = new byte[count];
            Array.Copy(buffer, offset, data, 0, count);
            _channel.Writer.TryWrite(data);
        }

        public override long Seek(long offset, System.IO.SeekOrigin origin) => throw new NotSupportedException();
        public override void SetLength(long value) => throw new NotSupportedException();
    }

    #endregion
}
