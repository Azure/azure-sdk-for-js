// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;

namespace Microsoft.SdkChat.Telemetry;

/// <summary>
/// Centralized telemetry for SDK Chat using OpenTelemetry-compatible ActivitySource.
/// Enables distributed tracing for all major operations.
/// </summary>
public static class SdkChatTelemetry
{
    /// <summary>
    /// Activity source name for SDK Chat operations.
    /// </summary>
    public const string SourceName = "Microsoft.SdkChat";

    /// <summary>
    /// Activity source version.
    /// </summary>
    public const string SourceVersion = "1.0.0";

    /// <summary>
    /// Shared ActivitySource for all SDK Chat operations.
    /// </summary>
    public static readonly ActivitySource Source = new(SourceName, SourceVersion);

    /// <summary>
    /// Starts an activity for AI prompt operations.
    /// </summary>
    public static Activity? StartPrompt(string sessionId, string? model = null)
    {
        var activity = Source.StartActivity("ai.prompt", ActivityKind.Client);
        activity?.SetTag("session.id", sessionId);
        if (model != null)
            activity?.SetTag("ai.model", model);
        return activity;
    }

    /// <summary>
    /// Starts an activity for SDK scanning operations.
    /// </summary>
    public static Activity? StartScan(string path)
    {
        var activity = Source.StartActivity("sdk.scan", ActivityKind.Internal);
        activity?.SetTag("sdk.path", path);
        return activity;
    }

    /// <summary>
    /// Starts an activity for API graphing operations.
    /// </summary>
    public static Activity? StartGraphing(string language, string path)
    {
        var activity = Source.StartActivity("api.graph", ActivityKind.Internal);
        activity?.SetTag("language", language);
        activity?.SetTag("sdk.path", path);
        return activity;
    }

    /// <summary>
    /// Starts an activity for sample generation operations.
    /// </summary>
    public static Activity? StartSampleGeneration(string sdkPath, string? language = null)
    {
        var activity = Source.StartActivity("samples.generate", ActivityKind.Internal);
        activity?.SetTag("sdk.path", sdkPath);
        if (language != null)
            activity?.SetTag("language", language);
        return activity;
    }

    /// <summary>
    /// Starts an activity for MCP tool invocation.
    /// </summary>
    public static Activity? StartMcpTool(string toolName)
    {
        var activity = Source.StartActivity($"mcp.tool.{toolName}", ActivityKind.Server);
        activity?.SetTag("mcp.tool", toolName);
        return activity;
    }

    /// <summary>
    /// Starts an activity for ACP session operations.
    /// </summary>
    public static Activity? StartAcpSession(string sessionId, string operation)
    {
        var activity = Source.StartActivity($"acp.{operation}", ActivityKind.Server);
        activity?.SetTag("acp.session.id", sessionId);
        activity?.SetTag("acp.operation", operation);
        return activity;
    }

    /// <summary>
    /// Records an error on the current activity.
    /// </summary>
    public static void RecordError(Activity? activity, Exception ex)
    {
        if (activity == null) return;

        activity.SetStatus(ActivityStatusCode.Error, ex.Message);
        activity.SetTag("error.type", ex.GetType().FullName);
        activity.SetTag("error.message", ex.Message);
    }

    /// <summary>
    /// Records sample generation metrics.
    /// </summary>
    public static void RecordSampleMetrics(Activity? activity, int sampleCount, int promptTokens, int responseTokens)
    {
        if (activity == null) return;

        activity.SetTag("samples.count", sampleCount);
        activity.SetTag("ai.tokens.prompt", promptTokens);
        activity.SetTag("ai.tokens.response", responseTokens);
        activity.SetTag("ai.tokens.total", promptTokens + responseTokens);
    }

    /// <summary>
    /// Starts a generic activity with the given name.
    /// </summary>
    public static Activity? StartActivity(string name, ActivityKind kind = ActivityKind.Internal)
    {
        return Source.StartActivity(name, kind);
    }

    /// <summary>
    /// Starts an activity for external process execution.
    /// </summary>
    public static Activity? StartProcessExecution(string executable, string? language = null)
    {
        var activity = Source.StartActivity("process.execute", ActivityKind.Client);
        activity?.SetTag("process.executable", executable);
        if (language != null)
            activity?.SetTag("language", language);
        return activity;
    }
}
