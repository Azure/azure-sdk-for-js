// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Method names for requests that clients send to agents.
/// </summary>
public static class AgentMethods
{
    public const string Initialize = "initialize";
    public const string Authenticate = "authenticate";

    public const string SessionNew = "session/new";
    public const string SessionLoad = "session/load";
    public const string SessionPrompt = "session/prompt";
    public const string SessionCancel = "session/cancel";
    public const string SessionSetMode = "session/set_mode";
}
