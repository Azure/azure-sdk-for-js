# Azure Monitor OpenTelemetry Exporter client library for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter)

## Getting started

This exporter package assumes your application is [already instrumented](https://opentelemetry.io/docs/languages/js/getting-started/) with the OpenTelemetry SDK. Once you are ready to export OpenTelemetry data, you can add this exporter to your application.

### Install the package

`npm install @azure/monitor-opentelemetry-exporter`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

> _Warning:_ This SDK only works for Node.js environments. Use the [Application Insights JavaScript SDK](https://github.com/microsoft/ApplicationInsights-JS) for browser environments.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Application Insights workspace](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview/)

### Distributed Tracing

Add the exporter to your existing OpenTelemetry Tracer Provider (`NodeTracerProvider` / `BasicTracerProvider`)

```ts snippet:ReadmeSampleDistributedTracing
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider, BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

// Create an exporter instance
const exporter = new AzureMonitorTraceExporter({
  connectionString: "<connection string>",
});

// Create and configure the Node Tracer provider
const tracerProvider = new NodeTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "basic-service",
  }),
  spanProcessors: [
    new BatchSpanProcessor(exporter, {
      exportTimeoutMillis: 15000,
      maxQueueSize: 1000,
    }),
  ],
});

// Register Tracer Provider as global
tracerProvider.register();
```

### Metrics

Add the exporter to your existing OpenTelemetry Meter Provider (`MeterProvider`)

```ts snippet:ReadmeSampleMetrics
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { PeriodicExportingMetricReader, MeterProvider } from "@opentelemetry/sdk-metrics";
import { metrics } from "@opentelemetry/api";

// Add the exporter into the MetricReader and register it with the MeterProvider
const exporter = new AzureMonitorMetricExporter({
  connectionString: "<connection string>",
});

const metricReaderOptions = {
  exporter: exporter,
};
const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
const meterProvider = new MeterProvider({
  readers: [metricReader],
});

// Register Meter Provider as global
metrics.setGlobalMeterProvider(meterProvider);
```

### Logs

Add the Log Exporter to your existing OpenTelemetry Logger Provider (`LoggerProvider`)

```ts snippet:ReadmeSampleLogs
import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { logs } from "@opentelemetry/api-logs";

// Add the Log exporter into the logRecordProcessor and register it with the LoggerProvider
const exporter = new AzureMonitorLogExporter({
  connectionString: "<connection string>",
});

const logRecordProcessor = new BatchLogRecordProcessor({ exporter });
const loggerProvider = new LoggerProvider({
  processors: [logRecordProcessor],
});

// Register logger Provider as global
logs.setGlobalLoggerProvider(loggerProvider);
```

#### Availability results

After registering the logger provider, emit an OpenTelemetry log record with the availability attributes below. The exporter converts the record to Application Insights availability telemetry.

```ts snippet:ReadmeSampleAvailability
import { logs } from "@opentelemetry/api-logs";

const logger = logs.getLogger("availability");
logger.emit({
  body: "Homepage availability test completed.",
  attributes: {
    "microsoft.availability.id": "availability-test-run-123",
    "microsoft.availability.name": "Homepage",
    "microsoft.availability.duration": "00:00:00.250",
    "microsoft.availability.success": true,
    "microsoft.availability.runLocation": "westus2",
    "microsoft.availability.message": "HTTP 200",
  },
});
```

The following attributes are required:

| Attribute | Description |
| --- | --- |
| `microsoft.availability.id` | Identifier for this test run. |
| `microsoft.availability.name` | Name of the availability test. |
| `microsoft.availability.duration` | Test duration, for example `00:00:00.250`. |
| `microsoft.availability.success` | Whether the test succeeded. |

`microsoft.availability.runLocation` and `microsoft.availability.message` are optional. If the message attribute is omitted, the log body is used as the availability message. The availability result timestamp comes from the OpenTelemetry log record.

Availability records use the same correlation context as other OpenTelemetry logs. When a record is emitted with an active span (or an explicit OpenTelemetry context), the span trace ID and span ID populate the Application Insights operation ID and parent ID. These values are authoritative and cannot be overridden by log attributes. The availability test-run ID remains separate from the operation ID.

If any required attribute is missing or empty, the exporter sends the record as regular message telemetry instead. Exception and custom event attributes take precedence over availability attributes.

### Multi-endpoint routing (preview)

Set `APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES=multi_endpoint_routing` before constructing
any exporter to route logs, spans, and metric data points to different Application Insights
resources. Feature names are comma-separated, case-insensitive, and trimmed. Unknown names
are ignored. The selection is shared by the exporters and fixed when the first exporter
is constructed. Routing is disabled by default.

Each item must supply both `microsoft.instrumentation_key` and `microsoft.ingestion_endpoint`.
Keys must be nonempty strings of at most 200 characters. Endpoints must be absolute HTTPS
URLs of at most 2048 characters, without credentials, query strings, or fragments.
**Use trusted, server-owned destination configuration, not request headers or baggage.**
Missing or invalid destinations are dropped, never sent to the host connection string.

With routing enabled, the exporter connection string is optional. If supplied explicitly
or through `APPLICATIONINSIGHTS_CONNECTION_STRING`, it is still validated normally.
Without a host connection string, host retry storage, Statsbeat, and customer SDK statistics
are not initialized. Routed retry storage remains available.

```ts snippet:ReadmeSampleMultiEndpointRouting
import { LoggerProvider, BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";

process.env.APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES = "multi_endpoint_routing";

const provider = new LoggerProvider({
  processors: [
    new BatchLogRecordProcessor({
      exporter: new AzureMonitorLogExporter(),
    }),
  ],
});

provider.getLogger("routed-logs").emit({
  body: "Order completed",
  attributes: {
    "microsoft.instrumentation_key": "<destination instrumentation key>",
    "microsoft.ingestion_endpoint": "https://<region>.in.applicationinsights.azure.com",
    "microsoft.multi_endpoint_cloud_role": "orders",
  },
});
```

Set the same attributes on spans or individual metric data points to route those signals.
Span events inherit their parent span's destination, key, authentication mode, and cloud role.
Metric routing does not read resource or instrumentation-scope attributes. The host resource
metric is not emitted in routing mode.

Items are grouped by normalized endpoint and authentication mode, not by instrumentation key.
Set `microsoft.ingestion_auth` to `"aad"` to use the exporter's `credential`. The value is
trimmed and case-insensitive. Other values select key-only authentication, even when a
credential is configured. An AAD route without a credential fails without preventing other
destinations from sending.

Cloud roles come from `microsoft.multi_endpoint_cloud_role`. Missing, blank, or non-string
values use `unknown_service`. Role instances remain resource-derived. The four routing
attributes are excluded from exported custom properties and the source telemetry is not mutated.

Each exporter caches up to 64 endpoint/authentication pairs. Cached destinations have
separate retry partitions, isolated from host storage, sharing a 50 MB routed-storage quota
under the configured `storageDirectory`. Additional destinations use short-lived senders
without persistence. Retried envelopes retain their original keys and destinations.
In-flight replay batches retain their storage quota until delivery or restoration completes.
One background worker per exporter checks opened routes every 60 seconds, even without
new telemetry. Existing partitions are not discovered at startup until their route is opened.
Retryable failures pause new transmissions for that route while available offline storage
queues the new items. Backoff honors `Retry-After`, or defaults to 60 seconds.
Storage opt-outs and the OneSettings storage control also apply to routed retries.
Shutdown stops the worker and waits for active exports and retries.

The existing JS export result convention is preserved for stored batches. Successfully
queued batches return success. Routed failures that cannot be persisted return failure.
Custom `httpClient` transports and `retryOptions` remain supported. Custom `pipeline` and
`additionalPolicies` are rejected in routing mode because destination-specific authentication
and redirect state must not be shared between policy chains.

### Sampling

You can enable sampling to limit the amount of telemetry records you receive. In order to enable correct sampling in Application Insights, use the `ApplicationInsightsSampler` as shown below.

```ts snippet:ReadmeSampleSampling
import { ApplicationInsightsSampler } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

// Sampler expects a sample rate of between 0 and 1 inclusive
// A rate of 0.75 means approximately 75 % of your traces will be sent
const aiSampler = new ApplicationInsightsSampler(0.75);
const provider = new NodeTracerProvider({
  sampler: aiSampler,
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "basic-service",
  }),
});

provider.register();
```

## Examples

For complete samples of a few champion scenarios, see the [`samples/`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry-exporter/samples/) folder.

## Key concepts

For more information on the OpenTelemetry project, please review the [**OpenTelemetry Specifications**](https://github.com/open-telemetry/opentelemetry-specification#opentelemetry-specification).

### Custom Dimensions Size Limit

Attributes exported as custom dimensions are limited individually by their UTF-8 byte length. This includes custom dimensions from spans, span events, logs, metrics, and resources. Attributes mapped to other telemetry fields are not governed by these limits. Non-string values are serialized before truncation, and truncation preserves complete UTF-8 characters.

| Attributes | Default limit | With GenAI message limit opt-in |
| --- | --- | --- |
| `gen_ai.input.messages`, `gen_ai.output.messages` | 256 KiB | 4 MiB |
| `gen_ai.system_instructions`, `gen_ai.tool.definitions`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`, `gen_ai.evaluation.explanation` | 256 KiB | 256 KiB |
| All other custom dimensions | 8 KiB | 8 KiB |

See [GenAI message size limit](#genai-message-size-limit) for opt-in instructions.

### Experimental features

Use `APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES` to opt in to named experimental features before constructing exporters. Feature names are comma-separated, case-insensitive, and trimmed of surrounding whitespace. An unset or empty value enables no experimental features. Unknown names are ignored. Experimental features may change or be removed in future releases.

#### GenAI message size limit

Enable `gen_ai_input_output_limit_increase` to raise the custom dimension limit for `gen_ai.input.messages` and `gen_ai.output.messages` from 256 KiB to 4 MiB. All other limits remain unchanged.

```powershell
$env:APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES = "gen_ai_input_output_limit_increase"
```

Each exporter reads this setting once during construction. Changes to the environment variable do not affect existing exporters.

Multimodal messages containing base64-encoded images or audio can produce large telemetry items. When using `BatchSpanProcessor` or `BatchLogRecordProcessor`, consider reducing `maxExportBatchSize` or increasing `exportTimeoutMillis`. You can also limit captured content at the source. Truncated structured values may no longer be valid JSON.

### Request compression

The exporter automatically gzip-compresses telemetry sent over HTTPS to Azure Monitor ingestion endpoints, including internal Statsbeat and customer SDK Stats. Compression applies to `/v2/track` and `/v2.1/track` on recognized Azure Monitor domains in the public, US Government, and China clouds. Custom ingestion endpoints and reverse proxies outside those domains continue to receive uncompressed JSON.

Compression happens after pipeline policies run. A custom `httpClient` receives the compressed body with `Content-Encoding: gzip` and the compressed `Content-Length`. Requests with an existing `Content-Encoding` are left unchanged. Offline telemetry is stored as envelopes and compressed only when sent or replayed. This does not change Live Metrics, OTLP exporters, or other Azure SDK clients.

If gzip compression fails, the exporter logs a diagnostic warning and sends the original uncompressed request. Normal retry and offline storage behavior still applies if sending that request fails.

## Troubleshooting

### Enable debug logging

You can enable debug logging by changing the logging level of your provider.

```ts snippet:EnableDebugLogging
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";

const provider = new NodeTracerProvider();
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
provider.register();
```

### Logging

Enabling Azure logging may also help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

This exporter is made to be used with the [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js).

### Plugin Registry

To see if a plugin has already been made for a library you are using, please check out the [OpenTelemetry Registry](https://opentelemetry.io/registry/).

If you cannot your library in the registry, feel free to suggest a new plugin request at [`opentelemetry-js-contrib`](https://github.com/open-telemetry/opentelemetry-js-contrib).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
