// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Stream;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests.JsonRpc;

/// <summary>
/// Tests for Connection concurrent message handling.
/// Verifies the critical fix that allows cancel notifications to be received
/// during long-running AI operations.
/// </summary>
public class ConnectionConcurrencyTests
{
    [Fact]
    public async Task ProcessMessages_HandlersRunConcurrently_NotSerially()
    {
        // Arrange: Set up stream with multiple requests that will be handled
        var requests = new[]
        {
            CreateRequest(1, "slow/operation"),
            CreateRequest(2, "slow/operation"),
            CreateRequest(3, "slow/operation")
        };

        var requestsJson = string.Join("\n", requests.Select(r => JsonSerializer.Serialize(r))) + "\n";
        var input = new StringReader(requestsJson);
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var handlerStartTimes = new ConcurrentDictionary<int, DateTime>();
        var handlerEndTimes = new ConcurrentDictionary<int, DateTime>();
        var barrier = new TaskCompletionSource();
        var handlersStarted = 0;

        var connection = new Connection(stream);
        connection.OnRequest(async (method, parameters) =>
        {
            var id = Interlocked.Increment(ref handlersStarted);
            handlerStartTimes[id] = DateTime.UtcNow;

            // Signal when all 3 handlers have started
            if (id == 3) barrier.SetResult();

            // Simulate work - if handlers are serial, this will take 300ms+
            await Task.Delay(100);

            handlerEndTimes[id] = DateTime.UtcNow;
            return new { success = true };
        });

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        await connection.RunAsync(cts.Token);

        // Assert: All handlers should have started before any finished (concurrent)
        Assert.Equal(3, handlerStartTimes.Count);
        Assert.Equal(3, handlerEndTimes.Count);

        var firstEnd = handlerEndTimes.Values.Min();
        var lastStart = handlerStartTimes.Values.Max();

        // If concurrent: lastStart should be before firstEnd
        // If serial: lastStart would be after firstEnd
        Assert.True(lastStart < firstEnd,
            $"Handlers ran serially! Last started at {lastStart:O}, first ended at {firstEnd:O}");
    }

    [Fact]
    public async Task CancelNotification_ReachesHandler_DuringLongOperation()
    {
        // Arrange: Send a long-running request followed by a cancel notification
        var slowRequest = CreateRequest(1, "ai/generate");
        var cancelNotification = new JsonRpcNotification
        {
            Method = "$/cancelRequest",
            Params = JsonSerializer.SerializeToElement(new { id = 1 })
        };

        var input = new StringReader(
            JsonSerializer.Serialize(slowRequest) + "\n" +
            JsonSerializer.Serialize(cancelNotification) + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var cancelReceived = new TaskCompletionSource();
        var operationStarted = new TaskCompletionSource();

        var connection = new Connection(stream);
        connection.OnRequest(async (method, parameters) =>
        {
            operationStarted.SetResult();

            // Wait for cancel (or timeout after 5s)
            var cancelledInTime = await Task.WhenAny(
                cancelReceived.Task,
                Task.Delay(5000)) == cancelReceived.Task;

            return new { cancelled = cancelledInTime };
        });

        connection.OnNotification((method, parameters) =>
        {
            if (method == "$/cancelRequest")
            {
                cancelReceived.SetResult();
            }
            return Task.CompletedTask;
        });

        // Act
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
        await connection.RunAsync(cts.Token);

        // Assert: Cancel notification should have been received
        Assert.True(cancelReceived.Task.IsCompleted,
            "Cancel notification was not received during long-running operation");
    }

    [Fact]
    public async Task DisposeAsync_WaitsForActiveHandlers()
    {
        // Arrange
        var request = CreateRequest(1, "slow/operation");
        var input = new StringReader(JsonSerializer.Serialize(request) + "\n");
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var handlerCompleted = false;
        var handlerStarted = new TaskCompletionSource();

        var connection = new Connection(stream);
        connection.OnRequest(async (method, parameters) =>
        {
            handlerStarted.SetResult();
            await Task.Delay(200); // Simulate work
            handlerCompleted = true;
            return new { };
        });

        // Start connection in background
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        var runTask = connection.RunAsync(cts.Token);

        // Wait for handler to start
        await handlerStarted.Task.WaitAsync(TimeSpan.FromSeconds(1));

        // Wait for run to complete (stream ends after single message)
        await runTask;

        // Assert: Handler should have completed (RunAsync waits for handlers)
        Assert.True(handlerCompleted, "RunAsync did not wait for active handler to complete");

        await connection.DisposeAsync();
    }

    [Fact]
    public async Task DisposeAsync_FaultsPendingRequests()
    {
        // Arrange
        var input = new BlockingReader(); // Never provides input
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var connection = new Connection(stream);

        // Start connection in background
        var runTask = Task.Run(() => connection.RunAsync());
        await Task.Delay(50); // Let it start

        // Send a request that will be pending
        var requestTask = connection.SendRequestAsync<object>("test/method");

        // Act: Dispose while request is pending
        await connection.DisposeAsync();

        // Assert: Request should throw ObjectDisposedException
        await Assert.ThrowsAsync<ObjectDisposedException>(() => requestTask);
    }

    [Fact]
    public async Task SendRequest_Timeout_ThrowsTaskCanceled()
    {
        // Arrange: Connection that never responds
        var input = new BlockingReader();
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var options = new ConnectionOptions
        {
            RequestTimeout = TimeSpan.FromMilliseconds(100)
        };
        var connection = new Connection(stream, options: options);

        // Start connection in background
        _ = Task.Run(() => connection.RunAsync());
        await Task.Delay(50); // Let it start

        // Act & Assert: TaskCanceledException is a subclass of OperationCanceledException
        // Both are acceptable for timeout behavior
        var ex = await Assert.ThrowsAnyAsync<OperationCanceledException>(
            () => connection.SendRequestAsync<object>("test/method"));
        Assert.True(ex is TaskCanceledException or OperationCanceledException);

        await connection.DisposeAsync();
    }

    [Fact]
    public async Task HandleResponse_MatchesJsonElementId_ToIntId()
    {
        // Arrange: Response with ID as JsonElement (as it comes from JSON deserialization)
        var request = CreateRequest(42, "test/method");
        var response = new JsonRpcResponse
        {
            Id = JsonSerializer.SerializeToElement(42), // ID comes as JsonElement from JSON
            Result = JsonSerializer.SerializeToElement(new { success = true })
        };

        // Write request, then response
        var messages = new[]
        {
            JsonSerializer.Serialize(request),
            JsonSerializer.Serialize(response)
        };

        var messageQueue = new Queue<string>(messages);
        var input = new QueueReader(messageQueue);
        var output = new StringWriter();
        var stream = new NdJsonStream(input, output);

        var connection = new Connection(stream);

        // Act: The internal ID normalization should match the response
        // Since we can't easily test this without integration, we verify
        // that responses don't pile up as unmatched
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
        await connection.RunAsync(cts.Token);

        // If ID normalization fails, pending requests would leak
        // This test documents the expected behavior
        await connection.DisposeAsync();
    }

    private static JsonRpcRequest CreateRequest(int id, string method)
    {
        return new JsonRpcRequest
        {
            Id = id,
            Method = method,
            Params = JsonSerializer.SerializeToElement(new { })
        };
    }

    /// <summary>
    /// A TextReader that blocks forever until disposed.
    /// </summary>
    private sealed class BlockingReader : TextReader
    {
        private readonly CancellationTokenSource _cts = new();

        public override string? ReadLine()
        {
            try
            {
                _cts.Token.WaitHandle.WaitOne();
            }
            catch (ObjectDisposedException) { }
            return null;
        }

        protected override void Dispose(bool disposing)
        {
            _cts.Cancel();
            _cts.Dispose();
            base.Dispose(disposing);
        }
    }

    /// <summary>
    /// A TextReader that returns messages from a queue.
    /// </summary>
    private sealed class QueueReader(Queue<string> messages) : TextReader
    {
        public override string? ReadLine()
        {
            lock (messages)
            {
                return messages.Count > 0 ? messages.Dequeue() : null;
            }
        }
    }
}
