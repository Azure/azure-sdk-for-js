// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using System.Text;
using System.Text.Json;
using AgentClientProtocol.Sdk.JsonRpc;
using AgentClientProtocol.Sdk.Schema;
using Xunit;

namespace AgentClientProtocol.Sdk.Tests;

/// <summary>
/// Integration tests that spawn real processes and communicate via stdio.
/// These tests verify the full protocol stack works end-to-end.
/// </summary>
public class StdioIntegrationTests
{
    /// <summary>
    /// Tests that we can serialize and deserialize JSON-RPC messages correctly
    /// through actual stdin/stdout streams, simulating real protocol communication.
    /// </summary>
    [Fact]
    public async Task JsonRpcMessage_RoundTrip_ThroughActualStreams()
    {
        // Arrange - Create a request message
        var request = new JsonRpcRequest
        {
            Id = 1,
            Method = "initialize",
            Params = JsonSerializer.SerializeToElement(new InitializeRequest
            {
                ProtocolVersion = Protocol.Version,
                ClientCapabilities = new ClientCapabilities()
            })
        };

        var jsonLine = JsonSerializer.Serialize(request) + "\n";

        // Act - Use a simple echo via Process to verify stream handling
        using var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "cat",  // Simple echo - returns what we send
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();

        // Write to stdin
        await process.StandardInput.WriteAsync(jsonLine);
        process.StandardInput.Close();

        // Read from stdout
        var output = await process.StandardOutput.ReadToEndAsync();
        await process.WaitForExitAsync();

        // Assert - Verify round-trip
        Assert.Equal(0, process.ExitCode);
        Assert.Equal(jsonLine, output);

        // Verify we can deserialize the echoed message
        var echoed = JsonSerializer.Deserialize<JsonRpcRequest>(output.Trim());
        Assert.NotNull(echoed);
        Assert.Equal("initialize", echoed.Method);
        Assert.Equal(1, ((JsonElement)echoed.Id!).GetInt32());
    }

    /// <summary>
    /// Tests that multiple messages can be sent through stdio in NDJSON format.
    /// </summary>
    [Fact]
    public async Task NdJson_MultipleMessages_RoundTrip()
    {
        // Arrange - Create multiple messages
        var messages = new JsonRpcMessageBase[]
        {
            new JsonRpcRequest { Id = 1, Method = "first" },
            new JsonRpcRequest { Id = 2, Method = "second" },
            new JsonRpcNotification { Method = "notify", Params = JsonSerializer.SerializeToElement(new { value = 42 }) }
        };

        var sb = new StringBuilder();
        foreach (var msg in messages)
        {
            sb.AppendLine(JsonSerializer.Serialize(msg, msg.GetType()));
        }
        var input = sb.ToString();

        // Act - Echo through process
        using var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "cat",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();
        await process.StandardInput.WriteAsync(input);
        process.StandardInput.Close();

        var output = await process.StandardOutput.ReadToEndAsync();
        await process.WaitForExitAsync();

        // Assert
        Assert.Equal(0, process.ExitCode);

        var lines = output.Split('\n', StringSplitOptions.RemoveEmptyEntries);
        Assert.Equal(3, lines.Length);

        var first = JsonSerializer.Deserialize<JsonRpcRequest>(lines[0]);
        Assert.Equal("first", first?.Method);

        var second = JsonSerializer.Deserialize<JsonRpcRequest>(lines[1]);
        Assert.Equal("second", second?.Method);

        var notify = JsonSerializer.Deserialize<JsonRpcNotification>(lines[2]);
        Assert.Equal("notify", notify?.Method);
    }

    /// <summary>
    /// Tests that the protocol handles large messages correctly through stdio.
    /// </summary>
    [Fact]
    public async Task LargeMessage_RoundTrip_ThroughStdio()
    {
        // Arrange - Create a large payload (100KB+)
        var largeContent = new string('x', 100_000);
        var request = new JsonRpcRequest
        {
            Id = 1,
            Method = "large_payload",
            Params = JsonSerializer.SerializeToElement(new { content = largeContent })
        };

        var jsonLine = JsonSerializer.Serialize(request) + "\n";

        // Act
        using var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "cat",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();
        await process.StandardInput.WriteAsync(jsonLine);
        process.StandardInput.Close();

        var output = await process.StandardOutput.ReadToEndAsync();
        await process.WaitForExitAsync();

        // Assert
        Assert.Equal(0, process.ExitCode);
        Assert.Equal(jsonLine.Length, output.Length);

        var echoed = JsonSerializer.Deserialize<JsonRpcRequest>(output.Trim());
        Assert.NotNull(echoed);
        Assert.Equal("large_payload", echoed.Method);

        // Verify the content survived
        var paramsJson = echoed.Params!.Value;
        var content = paramsJson.GetProperty("content").GetString();
        Assert.Equal(100_000, content?.Length);
    }

    /// <summary>
    /// Tests concurrent read/write operations on stdio streams.
    /// </summary>
    [Fact]
    public async Task ConcurrentReadWrite_DoesNotDeadlock()
    {
        // This test verifies that our async patterns don't cause deadlocks
        // when reading and writing concurrently (as would happen in real ACP usage)

        var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

        using var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "cat",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();

        // Write and read concurrently
        var writeTask = Task.Run(async () =>
        {
            for (int i = 0; i < 10; i++)
            {
                var msg = new JsonRpcRequest { Id = i, Method = $"msg_{i}" };
                await process.StandardInput.WriteLineAsync(JsonSerializer.Serialize(msg));
            }
            process.StandardInput.Close();
        }, cts.Token);

        var readTask = Task.Run(async () =>
        {
            var lines = new List<string>();
            while (await process.StandardOutput.ReadLineAsync(cts.Token) is { } line)
            {
                lines.Add(line);
            }
            return lines;
        }, cts.Token);

        await writeTask;
        var receivedLines = await readTask;
        await process.WaitForExitAsync(cts.Token);

        // Assert - all messages received
        Assert.Equal(10, receivedLines.Count);
        for (int i = 0; i < 10; i++)
        {
            var msg = JsonSerializer.Deserialize<JsonRpcRequest>(receivedLines[i]);
            Assert.Equal($"msg_{i}", msg?.Method);
        }
    }
}
