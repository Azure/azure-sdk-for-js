// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using AgentClientProtocol.Sdk.JsonRpc;

namespace AgentClientProtocol.Sdk.Stream;

/// <summary>
/// Bidirectional stream for ACP communication.
/// Implementations should properly dispose resources.
/// </summary>
[SuppressMessage("Naming", "CA1711:Identifiers should not have incorrect suffix",
    Justification = "IAcpStream represents a message stream in the ACP protocol context, not a System.IO.Stream")]
public interface IAcpStream : IAsyncDisposable
{
    /// <summary>
    /// Read the next message from the stream.
    /// </summary>
    ValueTask<JsonRpcMessageBase?> ReadAsync(CancellationToken ct = default);

    /// <summary>
    /// Write a message to the stream.
    /// </summary>
    ValueTask WriteAsync(JsonRpcMessageBase message, CancellationToken ct = default);
}
