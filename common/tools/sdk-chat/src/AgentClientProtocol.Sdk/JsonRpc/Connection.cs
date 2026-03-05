// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Channels;
using AgentClientProtocol.Sdk.Stream;
using Microsoft.Extensions.Logging;

namespace AgentClientProtocol.Sdk.JsonRpc;

/// <summary>
/// Configuration options for ACP connections.
/// </summary>
public sealed record ConnectionOptions
{
    /// <summary>
    /// Default request timeout (5 minutes for AI operations).
    /// </summary>
    public static readonly TimeSpan DefaultTimeout = TimeSpan.FromMinutes(5);

    /// <summary>
    /// Default handshake timeout (10 seconds for fast-fail on connection issues).
    /// </summary>
    public static readonly TimeSpan DefaultHandshakeTimeout = TimeSpan.FromSeconds(10);

    /// <summary>
    /// Timeout for individual requests. Defaults to 5 minutes.
    /// </summary>
    public TimeSpan RequestTimeout { get; init; } = DefaultTimeout;

    /// <summary>
    /// Timeout for handshake/initialization requests. Defaults to 10 seconds.
    /// Fast-fail for connection issues - AI generation uses RequestTimeout instead.
    /// </summary>
    public TimeSpan HandshakeTimeout { get; init; } = DefaultHandshakeTimeout;

    /// <summary>
    /// Maximum number of pending inbound messages before backpressure is applied.
    /// </summary>
    public int MaxPendingMessages { get; init; } = 100;
}

/// <summary>
/// Manages bidirectional JSON-RPC communication.
/// </summary>
[UnconditionalSuppressMessage("AOT", "IL2026:RequiresUnreferencedCode",
    Justification = "JSON-RPC requires dynamic serialization for generic request/response types")]
[UnconditionalSuppressMessage("AOT", "IL3050:RequiresDynamicCode",
    Justification = "JSON-RPC requires dynamic serialization for generic request/response types")]
public class Connection : IAsyncDisposable
{
    private readonly IAcpStream _stream;
    private readonly ILogger? _logger;
    private readonly ConnectionOptions _options;
    private readonly ConcurrentDictionary<object, TaskCompletionSource<JsonRpcResponse>> _pendingRequests = new();
    private readonly ConcurrentDictionary<string, Task> _activeHandlers = new();
    private readonly Channel<JsonRpcMessageBase> _inboundChannel;
    private readonly CancellationTokenSource _cts = new();
    private int _requestId;
    private int _handlerId;
    private int _disposed;

    private Func<string, object?, Task<object?>>? _requestHandler;
    private Func<string, object?, Task>? _notificationHandler;

    public Connection(IAcpStream stream, ILogger? logger = null, ConnectionOptions? options = null)
    {
        _stream = stream;
        _logger = logger;
        _options = options ?? new ConnectionOptions();

        // Bounded channel provides backpressure for inbound messages
        _inboundChannel = Channel.CreateBounded<JsonRpcMessageBase>(new BoundedChannelOptions(_options.MaxPendingMessages)
        {
            FullMode = BoundedChannelFullMode.Wait,
            SingleReader = true,
            SingleWriter = true
        });
    }

    /// <summary>
    /// Set handler for incoming requests.
    /// </summary>
    public void OnRequest(Func<string, object?, Task<object?>> handler)
    {
        _requestHandler = handler;
    }

    /// <summary>
    /// Set handler for incoming notifications.
    /// </summary>
    public void OnNotification(Func<string, object?, Task> handler)
    {
        _notificationHandler = handler;
    }

    /// <summary>
    /// Start processing incoming messages.
    /// </summary>
    public async Task RunAsync(CancellationToken ct = default)
    {
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(ct, _cts.Token);

        // Start the reader task (reads from stream, writes to channel)
        var readerTask = ReadMessagesAsync(linked.Token);

        // Start the processor task (reads from channel, handles messages)
        var processorTask = ProcessMessagesAsync(linked.Token);

        try
        {
            // Wait for both to complete (reader completing will close channel, processor will drain)
            await Task.WhenAll(readerTask, processorTask).ConfigureAwait(false);
        }
        catch (OperationCanceledException) { }
        catch (Exception ex)
        {
            _logger?.LogError(ex, "Connection error");
        }
    }

    private async Task ReadMessagesAsync(CancellationToken ct)
    {
        try
        {
            while (!ct.IsCancellationRequested)
            {
                var message = await _stream.ReadAsync(ct).ConfigureAwait(false);
                if (message is null) break;

                // Bounded channel - this will wait if consumer is slow (backpressure)
                await _inboundChannel.Writer.WriteAsync(message, ct).ConfigureAwait(false);
            }
        }
        finally
        {
            _inboundChannel.Writer.Complete();
        }
    }

    private async Task ProcessMessagesAsync(CancellationToken ct)
    {
        await foreach (var message in _inboundChannel.Reader.ReadAllAsync(ct).ConfigureAwait(false))
        {
            // Launch handler concurrently - critical for receiving cancel notifications during long AI operations
            var handlerKey = $"h_{Interlocked.Increment(ref _handlerId)}";
            var handlerTask = HandleMessageAsync(message).ContinueWith(t =>
            {
                _activeHandlers.TryRemove(handlerKey, out _);
                if (t.IsFaulted)
                {
                    _logger?.LogError(t.Exception, "Unhandled exception in message handler");
                }
            }, TaskScheduler.Default);
            _activeHandlers[handlerKey] = handlerTask;
        }

        // Wait for all active handlers to complete before exiting
        var handlers = _activeHandlers.Values.ToArray();
        if (handlers.Length > 0)
        {
            await Task.WhenAll(handlers).ConfigureAwait(false);
        }
    }

    private async Task HandleMessageAsync(JsonRpcMessageBase message)
    {
        switch (message)
        {
            case JsonRpcRequest request:
                await HandleRequestAsync(request);
                break;
            case JsonRpcResponse response:
                HandleResponse(response);
                break;
            case JsonRpcNotification notification:
                await HandleNotificationAsync(notification);
                break;
        }
    }

    private async Task HandleRequestAsync(JsonRpcRequest request)
    {
        if (_requestHandler is null)
        {
            await SendErrorAsync(request.Id, RequestError.MethodNotFound(request.Method));
            return;
        }

        try
        {
            var result = await _requestHandler(request.Method, request.Params);
            await SendResponseAsync(request.Id, result);
        }
        catch (RequestError ex)
        {
            await SendErrorAsync(request.Id, ex);
        }
        catch (Exception ex)
        {
            _logger?.LogError(ex, "Request handler error for {Method}", request.Method);
            await SendErrorAsync(request.Id, RequestError.InternalError(null, ex.Message));
        }
    }

    private void HandleResponse(JsonRpcResponse response)
    {
        if (response.Id is null) return;

        // Normalize ID to int for matching (JSON deserializes numbers as JsonElement)
        var normalizedId = NormalizeId(response.Id);
        if (normalizedId is not null && _pendingRequests.TryRemove(normalizedId, out var tcs))
        {
            tcs.TrySetResult(response);
        }
    }

    /// <summary>
    /// Normalize JSON-RPC ID to a consistent type for dictionary matching.
    /// JSON deserializes integer IDs as JsonElement, but we store them as int.
    /// </summary>
    private static object? NormalizeId(object? id) => id switch
    {
        null => null,
        int i => i,
        long l => (int)l,
        System.Text.Json.JsonElement je when je.ValueKind == System.Text.Json.JsonValueKind.Number => je.GetInt32(),
        System.Text.Json.JsonElement je when je.ValueKind == System.Text.Json.JsonValueKind.String => je.GetString(),
        _ => id
    };

    private async Task HandleNotificationAsync(JsonRpcNotification notification)
    {
        if (_notificationHandler is not null)
        {
            try
            {
                await _notificationHandler(notification.Method, notification.Params);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Notification handler error for {Method}", notification.Method);
            }
        }
    }

    /// <summary>
    /// Send a request and wait for response.
    /// </summary>
    public async Task<T?> SendRequestAsync<T>(string method, object? parameters = null, CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed == 1, this);

        var id = Interlocked.Increment(ref _requestId);
        var tcs = new TaskCompletionSource<JsonRpcResponse>(TaskCreationOptions.RunContinuationsAsynchronously);
        _pendingRequests[id] = tcs;

        try
        {
            // Parameters is dynamic object - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
            var serializedParams = parameters is not null ? System.Text.Json.JsonSerializer.SerializeToElement(parameters, AcpJsonContext.FlexibleOptions) : (System.Text.Json.JsonElement?)null;
#pragma warning restore IL2026, IL3050

            var request = new JsonRpcRequest
            {
                Id = id,
                Method = method,
                Params = serializedParams
            };

            await _stream.WriteAsync(request, ct).ConfigureAwait(false);

            using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            cts.CancelAfter(_options.RequestTimeout);

            var response = await tcs.Task.WaitAsync(cts.Token).ConfigureAwait(false);

            if (response.Error is not null)
            {
                throw new RequestError(response.Error.Code, response.Error.Message, response.Error.Data);
            }

            if (response.Result is null) return default;

            // Efficient deserialization: handle JsonElement directly without re-serializing
            // Generic T cannot use source-generated serialization at compile time
#pragma warning disable IL2026, IL3050 // Generic deserialization unavoidable - T is unknown at compile time
            if (response.Result is System.Text.Json.JsonElement jsonElement)
            {
                return System.Text.Json.JsonSerializer.Deserialize<T>(jsonElement.GetRawText(), AcpJsonContext.FlexibleOptions);
            }

            // Fallback for non-JsonElement results (rare)
            return System.Text.Json.JsonSerializer.Deserialize<T>(
                System.Text.Json.JsonSerializer.Serialize(response.Result, AcpJsonContext.FlexibleOptions), AcpJsonContext.FlexibleOptions);
#pragma warning restore IL2026, IL3050
        }
        finally
        {
            _pendingRequests.TryRemove(id, out _);
        }
    }

    /// <summary>
    /// Send a notification (no response expected).
    /// </summary>
    public async Task SendNotificationAsync(string method, object? parameters = null, CancellationToken ct = default)
    {
        // Parameters is dynamic object - type unknown at compile time
#pragma warning disable IL2026, IL3050 // Dynamic object serialization unavoidable
        var serializedParams = parameters is not null ? System.Text.Json.JsonSerializer.SerializeToElement(parameters, AcpJsonContext.FlexibleOptions) : (System.Text.Json.JsonElement?)null;
#pragma warning restore IL2026, IL3050

        var notification = new JsonRpcNotification
        {
            Method = method,
            Params = serializedParams
        };
        await _stream.WriteAsync(notification, ct).ConfigureAwait(false);
    }

    private async Task SendResponseAsync(object? id, object? result)
    {
        var response = JsonRpcResponse.Success(id, result);
        await _stream.WriteAsync(response);
    }

    private async Task SendErrorAsync(object? id, RequestError error)
    {
        var response = error.ToResponse(id);
        await _stream.WriteAsync(response);
    }

    public async ValueTask DisposeAsync()
    {
        if (Interlocked.Exchange(ref _disposed, 1) == 1)
            return;

        GC.SuppressFinalize(this);

        // Cancel ongoing operations
        await _cts.CancelAsync().ConfigureAwait(false);

        // Fault all pending requests to prevent callers from hanging forever
        foreach (var kvp in _pendingRequests)
        {
            kvp.Value.TrySetException(new ObjectDisposedException(nameof(Connection), "Connection was disposed while request was pending"));
        }
        _pendingRequests.Clear();

        await _stream.DisposeAsync().ConfigureAwait(false);
        _cts.Dispose();
    }
}
