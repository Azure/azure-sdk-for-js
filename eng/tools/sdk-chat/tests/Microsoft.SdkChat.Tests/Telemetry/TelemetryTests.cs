// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using Microsoft.SdkChat.Telemetry;
using Xunit;

namespace Microsoft.SdkChat.Tests.Telemetry;

/// <summary>
/// Tests for SdkChatTelemetry activity creation and tagging.
/// </summary>
public class SdkChatTelemetryTests : IDisposable
{
    private readonly ActivityListener _listener;
    private readonly List<Activity> _capturedActivities = new();

    public SdkChatTelemetryTests()
    {
        // Set up an activity listener to capture activities from our source
        _listener = new ActivityListener
        {
            ShouldListenTo = source => source.Name == SdkChatTelemetry.SourceName,
            Sample = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllData,
            ActivityStarted = activity => _capturedActivities.Add(activity)
        };
        ActivitySource.AddActivityListener(_listener);
    }

    public void Dispose()
    {
        _listener.Dispose();
    }

    [Fact]
    public void SourceName_IsCorrect()
    {
        Assert.Equal("Microsoft.SdkChat", SdkChatTelemetry.SourceName);
    }

    [Fact]
    public void SourceVersion_IsCorrect()
    {
        Assert.Equal("1.0.0", SdkChatTelemetry.SourceVersion);
    }

    [Fact]
    public void Source_IsNotNull()
    {
        Assert.NotNull(SdkChatTelemetry.Source);
    }

    [Fact]
    public void StartPrompt_CreatesActivityWithTags()
    {
        using var activity = SdkChatTelemetry.StartPrompt("session-123", "gpt-4");

        Assert.NotNull(activity);
        Assert.Equal("ai.prompt", activity.OperationName);
        Assert.Equal(ActivityKind.Client, activity.Kind);
        Assert.Equal("session-123", activity.GetTagItem("session.id"));
        Assert.Equal("gpt-4", activity.GetTagItem("ai.model"));
    }

    [Fact]
    public void StartPrompt_WithoutModel_OmitsModelTag()
    {
        using var activity = SdkChatTelemetry.StartPrompt("session-456");

        Assert.NotNull(activity);
        Assert.Equal("session-456", activity.GetTagItem("session.id"));
        Assert.Null(activity.GetTagItem("ai.model"));
    }

    [Fact]
    public void StartScan_CreatesActivityWithPath()
    {
        using var activity = SdkChatTelemetry.StartScan("/path/to/sdk");

        Assert.NotNull(activity);
        Assert.Equal("sdk.scan", activity.OperationName);
        Assert.Equal(ActivityKind.Internal, activity.Kind);
        Assert.Equal("/path/to/sdk", activity.GetTagItem("sdk.path"));
    }

    [Fact]
    public void StartGraphing_CreatesActivityWithLanguageAndPath()
    {
        using var activity = SdkChatTelemetry.StartGraphing("csharp", "/path/to/sdk");

        Assert.NotNull(activity);
        Assert.Equal("api.graph", activity.OperationName);
        Assert.Equal(ActivityKind.Internal, activity.Kind);
        Assert.Equal("csharp", activity.GetTagItem("language"));
        Assert.Equal("/path/to/sdk", activity.GetTagItem("sdk.path"));
    }

    [Fact]
    public void StartSampleGeneration_CreatesActivityWithOptionalLanguage()
    {
        using var activity = SdkChatTelemetry.StartSampleGeneration("/sdk/path", "python");

        Assert.NotNull(activity);
        Assert.Equal("samples.generate", activity.OperationName);
        Assert.Equal("/sdk/path", activity.GetTagItem("sdk.path"));
        Assert.Equal("python", activity.GetTagItem("language"));
    }

    [Fact]
    public void StartSampleGeneration_WithoutLanguage_OmitsTag()
    {
        using var activity = SdkChatTelemetry.StartSampleGeneration("/sdk/path");

        Assert.NotNull(activity);
        Assert.Null(activity.GetTagItem("language"));
    }

    [Fact]
    public void StartMcpTool_CreatesActivityWithToolName()
    {
        using var activity = SdkChatTelemetry.StartMcpTool("build_samples_prompt");

        Assert.NotNull(activity);
        Assert.Equal("mcp.tool.build_samples_prompt", activity.OperationName);
        Assert.Equal(ActivityKind.Server, activity.Kind);
        Assert.Equal("build_samples_prompt", activity.GetTagItem("mcp.tool"));
    }

    [Fact]
    public void StartAcpSession_CreatesActivityWithSessionAndOperation()
    {
        using var activity = SdkChatTelemetry.StartAcpSession("acp-session-789", "prompt");

        Assert.NotNull(activity);
        Assert.Equal("acp.prompt", activity.OperationName);
        Assert.Equal(ActivityKind.Server, activity.Kind);
        Assert.Equal("acp-session-789", activity.GetTagItem("acp.session.id"));
        Assert.Equal("prompt", activity.GetTagItem("acp.operation"));
    }

    [Fact]
    public void RecordError_SetsErrorStatus()
    {
        using var activity = SdkChatTelemetry.StartPrompt("test-session");
        var exception = new InvalidOperationException("Test error message");

        SdkChatTelemetry.RecordError(activity, exception);

        Assert.Equal(ActivityStatusCode.Error, activity!.Status);
        Assert.Equal("Test error message", activity.StatusDescription);
        Assert.Equal("System.InvalidOperationException", activity.GetTagItem("error.type"));
        Assert.Equal("Test error message", activity.GetTagItem("error.message"));
    }

    [Fact]
    public void RecordError_WithNullActivity_DoesNotThrow()
    {
        var exception = new Exception("Test");

        // Should not throw
        SdkChatTelemetry.RecordError(null, exception);
    }

    [Fact]
    public void RecordSampleMetrics_SetsTags()
    {
        using var activity = SdkChatTelemetry.StartSampleGeneration("/test");

        SdkChatTelemetry.RecordSampleMetrics(activity, sampleCount: 5, promptTokens: 1000, responseTokens: 2000);

        Assert.Equal(5, activity!.GetTagItem("samples.count"));
        Assert.Equal(1000, activity.GetTagItem("ai.tokens.prompt"));
        Assert.Equal(2000, activity.GetTagItem("ai.tokens.response"));
        Assert.Equal(3000, activity.GetTagItem("ai.tokens.total"));
    }

    [Fact]
    public void RecordSampleMetrics_WithNullActivity_DoesNotThrow()
    {
        // Should not throw
        SdkChatTelemetry.RecordSampleMetrics(null, 5, 1000, 2000);
    }
}

/// <summary>
/// Tests for TelemetryConfiguration initialization and shutdown.
/// </summary>
public class TelemetryConfigurationTests
{
    [Fact]
    public void Initialize_CanBeCalledMultipleTimes()
    {
        // Idempotent initialization should not throw
        TelemetryConfiguration.Initialize();
        TelemetryConfiguration.Initialize();
        TelemetryConfiguration.Initialize();

        // Clean up
        TelemetryConfiguration.Shutdown();
    }

    [Fact]
    public void Shutdown_CanBeCalledMultipleTimes()
    {
        TelemetryConfiguration.Initialize();

        // Multiple shutdowns should not throw
        TelemetryConfiguration.Shutdown();
        TelemetryConfiguration.Shutdown();
        TelemetryConfiguration.Shutdown();
    }

    [Fact]
    public void Initialize_AfterShutdown_Reinitializes()
    {
        TelemetryConfiguration.Initialize();
        TelemetryConfiguration.Shutdown();

        // Should be able to reinitialize after shutdown
        TelemetryConfiguration.Initialize();
        TelemetryConfiguration.Shutdown();
    }

    [Fact]
    public void Shutdown_WithoutInitialize_DoesNotThrow()
    {
        // Should handle case where shutdown is called without prior initialize
        TelemetryConfiguration.Shutdown();
    }
}
