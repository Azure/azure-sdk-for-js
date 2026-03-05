// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Method names for requests that agents send to clients.
/// </summary>
public static class ClientMethods
{
    public const string FsReadTextFile = "fs/read_text_file";
    public const string FsWriteTextFile = "fs/write_text_file";

    public const string SessionRequestPermission = "session/request_permission";
    public const string SessionUpdate = "session/update";

    public const string TerminalCreate = "terminal/create";
    public const string TerminalOutput = "terminal/output";
    public const string TerminalRelease = "terminal/release";
    public const string TerminalWaitForExit = "terminal/wait_for_exit";
    public const string TerminalKill = "terminal/kill";
}
