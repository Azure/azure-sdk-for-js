// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Lightweight telemetry for Public API Graph Engines using OpenTelemetry-compatible ActivitySource.
/// </summary>
public static class EngineTelemetry
{
    /// <summary>
    /// Activity source name for Public API Graph Engine operations.
    /// </summary>
    public const string SourceName = "PublicApiGraphEngine";

    /// <summary>
    /// Activity source version.
    /// </summary>
    public const string SourceVersion = "1.0.0";

    /// <summary>
    /// Shared ActivitySource for all engine operations.
    /// </summary>
    public static readonly ActivitySource Source = new(SourceName, SourceVersion);

    /// <summary>
    /// Starts an activity for API graphing.
    /// </summary>
    public static Activity? StartGraphing(string language, string path)
    {
        var activity = Source.StartActivity("engine.extract", ActivityKind.Internal);
        activity?.SetTag("language", language);
        activity?.SetTag("path", path);
        return activity;
    }

    /// <summary>
    /// Starts an activity for usage analysis.
    /// </summary>
    public static Activity? StartUsageAnalysis(string language, string path)
    {
        var activity = Source.StartActivity("engine.usage_analysis", ActivityKind.Internal);
        activity?.SetTag("language", language);
        activity?.SetTag("path", path);
        return activity;
    }

    /// <summary>
    /// Starts an activity for external process execution.
    /// </summary>
    public static Activity? StartProcess(string executable, string language)
    {
        var activity = Source.StartActivity("engine.process", ActivityKind.Client);
        activity?.SetTag("executable", executable);
        activity?.SetTag("language", language);
        return activity;
    }

    /// <summary>
    /// Records engine result metrics.
    /// </summary>
    public static void RecordResult(Activity? activity, bool success, int? itemCount = null, string? error = null)
    {
        if (activity is null) return;

        activity.SetTag("success", success);
        if (itemCount.HasValue)
            activity.SetTag("item_count", itemCount.Value);
        if (error is not null)
        {
            activity.SetStatus(ActivityStatusCode.Error, error);
            activity.SetTag("error.message", error);
        }
        else if (success)
        {
            activity.SetStatus(ActivityStatusCode.Ok);
        }
    }

}
