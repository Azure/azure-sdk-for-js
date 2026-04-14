// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace Microsoft.SdkChat.Telemetry;

/// <summary>
/// Configures OpenTelemetry tracing with OTLP and Console exporters.
/// Environment variables control export behavior:
/// - OTEL_EXPORTER_OTLP_ENDPOINT: OTLP endpoint (enables OTLP export)
/// - OTEL_TRACES_EXPORTER: "console" for console output, "otlp" for OTLP, "none" to disable
/// - SDK_CLI_TELEMETRY_CONSOLE: "true" to force console output (for debugging)
/// </summary>
public static class TelemetryConfiguration
{
    private static TracerProvider? _tracerProvider;
    private static readonly object _lock = new();

    /// <summary>
    /// Initializes OpenTelemetry tracing if not already configured.
    /// Call this once at application startup.
    /// </summary>
    public static void Initialize()
    {
        if (_tracerProvider != null) return;

        lock (_lock)
        {
            if (_tracerProvider != null) return;

            var builder = OpenTelemetry.Sdk.CreateTracerProviderBuilder()
                .SetResourceBuilder(ResourceBuilder.CreateDefault()
                    .AddService(
                        serviceName: SdkChatTelemetry.SourceName,
                        serviceVersion: SdkChatTelemetry.SourceVersion))
                .AddSource(SdkChatTelemetry.SourceName);

            var otlpEndpoint = Environment.GetEnvironmentVariable("OTEL_EXPORTER_OTLP_ENDPOINT");
            if (!string.IsNullOrEmpty(otlpEndpoint))
            {
                builder.AddOtlpExporter();
            }

            var consoleExport = Environment.GetEnvironmentVariable("SDK_CLI_TELEMETRY_CONSOLE");
            var tracesExporter = Environment.GetEnvironmentVariable("OTEL_TRACES_EXPORTER");

            if (string.Equals(consoleExport, "true", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(tracesExporter, "console", StringComparison.OrdinalIgnoreCase))
            {
                builder.AddConsoleExporter();
            }

            _tracerProvider = builder.Build();
        }
    }

    /// <summary>
    /// Shuts down the tracer provider, flushing any pending spans.
    /// </summary>
    public static void Shutdown()
    {
        lock (_lock)
        {
            _tracerProvider?.Dispose();
            _tracerProvider = null;
        }
    }
}
