// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using Microsoft.Extensions.Logging;

namespace AgentClientProtocol.Sdk.Stream;

/// <summary>
/// Newline-delimited JSON stream for stdio-based ACP communication.
/// </summary>
[SuppressMessage("Naming", "CA1711:Identifiers should not have incorrect suffix",
    Justification = "NdJsonStream represents an NDJSON message stream, not a System.IO.Stream")]
public class NdJsonStream : IAcpStream, IAsyncDisposable
{
    private readonly TextReader _input;
    private readonly TextWriter _output;
    private readonly ILogger? _logger;
    private readonly SemaphoreSlim _writeLock = new(1, 1);
    private int _disposed;

    public NdJsonStream(TextReader input, TextWriter output, ILogger? logger = null)
    {
        _input = input;
        _output = output;
        _logger = logger;
    }

    /// <summary>
    /// Create stream from stdin/stdout.
    /// </summary>
    public static NdJsonStream FromStdio(ILogger? logger = null)
    {
        var input = new StreamReader(Console.OpenStandardInput(), Encoding.UTF8);
        var output = new StreamWriter(Console.OpenStandardOutput(), new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)) { AutoFlush = true };
        return new NdJsonStream(input, output, logger);
    }

    /// <summary>
    /// Create stream from arbitrary streams.
    /// </summary>
    public static NdJsonStream FromStreams(System.IO.Stream input, System.IO.Stream output, ILogger? logger = null)
    {
        var reader = new StreamReader(input, Encoding.UTF8);
        var writer = new StreamWriter(output, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)) { AutoFlush = true };
        return new NdJsonStream(reader, writer, logger);
    }

    public async ValueTask<JsonRpcMessageBase?> ReadAsync(CancellationToken ct = default)
    {
        // Resilient read loop: skip malformed lines instead of terminating connection
        while (!ct.IsCancellationRequested)
        {
            var line = await _input.ReadLineAsync(ct).ConfigureAwait(false);
            if (line == null) return null; // End of stream
            if (string.IsNullOrWhiteSpace(line)) continue; // Skip empty lines

            if (_logger?.IsEnabled(LogLevel.Trace) == true)
                _logger.LogTrace("ACP recv: {Message}", line);

            try
            {
                using var doc = JsonDocument.Parse(line, AcpJsonContext.SecureDocumentOptions);
                var root = doc.RootElement;

                // Check if it's a response (has result or error)
                if (root.TryGetProperty("result", out _) || root.TryGetProperty("error", out _))
                {
                    return JsonSerializer.Deserialize(line, AcpJsonContext.Default.JsonRpcResponse);
                }

                // Check if it's a request (has id and method)
                if (root.TryGetProperty("id", out _) && root.TryGetProperty("method", out _))
                {
                    return JsonSerializer.Deserialize(line, AcpJsonContext.Default.JsonRpcRequest);
                }

                // Otherwise it's a notification (method only)
                if (root.TryGetProperty("method", out _))
                {
                    return JsonSerializer.Deserialize(line, AcpJsonContext.Default.JsonRpcNotification);
                }

                _logger?.LogWarning("Unknown message format, skipping: {Message}", line);
                // Continue reading instead of returning null
            }
            catch (JsonException ex)
            {
                _logger?.LogWarning(ex, "Malformed JSON line, skipping: {Message}", line);
                // Continue reading instead of returning null - connection stays alive
            }
        }

        return null;
    }

    public async ValueTask WriteAsync(JsonRpcMessageBase message, CancellationToken ct = default)
    {
        var json = JsonSerializer.Serialize(message, message.GetType(), AcpJsonContext.Default);

        await _writeLock.WaitAsync(ct);
        try
        {
            if (_logger?.IsEnabled(LogLevel.Trace) == true)
                _logger.LogTrace("ACP send: {Message}", json);
            await _output.WriteLineAsync(json);
        }
        finally
        {
            _writeLock.Release();
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (Interlocked.Exchange(ref _disposed, 1) == 1)
            return;

        GC.SuppressFinalize(this);

        // Wait for any in-flight writes to complete before disposing.
        // Track acquisition so we only release if we actually acquired the lock.
        var lockAcquired = false;
        try
        {
            await _writeLock.WaitAsync();
            lockAcquired = true;
        }
        catch (ObjectDisposedException)
        {
            // Already disposed by another path, that's fine
        }

        try
        {
            _input.Dispose();
            _output.Dispose();
        }
        finally
        {
            if (lockAcquired)
            {
                try { _writeLock.Release(); } catch (ObjectDisposedException) { /* Safe to ignore */ }
            }
            _writeLock.Dispose();
        }
    }
}
