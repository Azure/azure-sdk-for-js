# Azure Monitor OpenTelemetry Exporter client library for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter)

## Getting started

This exporter package assumes your application is [already instrumented](https://opentelemetry.io/docs/languages/js/getting-started/) with the OpenTelemetry SDK. Once you are ready to export OpenTelemetry data, you can add this exporter to your application.

### Install the package

`npm install @azure/monitor-opentelemetry-exporter`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule), starting with Node.js 22.15.0.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

> _Warning:_ This SDK only works for Node.js environments. Use the [Application Insights JavaScript SDK](https://github.com/microsoft/ApplicationInsights-JS) for browser environments.

### Prerequisites

- OpenTelemetry SDK 3.x with `@opentelemetry/api` 1.10.0 or later. Instrumentation packages use the matching 0.300.x release line. See the [OpenTelemetry 3.x migration guide](https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/3.x/migration-guide.md) when upgrading from SDK 2.x.
- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Application Insights workspace](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview/)

### Distributed Tracing

Add the exporter to your existing OpenTelemetry `TracerProvider`. SDK 3.x requires explicit registration of the context manager and propagators, as shown below.

```ts snippet:ReadmeSampleDistributedTracing
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { TracerProvider, BatchSpanProcessor } from "@opentelemetry/sdk-trace";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { trace, context, propagation } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from "@opentelemetry/core";

// Create an exporter instance
const exporter = new AzureMonitorTraceExporter({
  connectionString: "<connection string>",
});

// Create and configure the Node Tracer provider
const tracerProvider = new TracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "basic-service",
  }),
  spanProcessors: [
    new BatchSpanProcessor({
      exporter,
      exportTimeoutMillis: 15000,
      maxQueueSize: 1000,
    }),
  ],
});

// Register tracing, asynchronous context, and W3C propagation
trace.setGlobalTracerProvider(tracerProvider);
context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
propagation.setGlobalPropagator(
  new CompositePropagator({
    propagators: [new W3CTraceContextPropagator(), new W3CBaggagePropagator()],
  }),
);
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
import { logs } from "@opentelemetry/api";

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
import { logs } from "@opentelemetry/api";

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
resources. Routing is disabled by default. The first exporter fixes this selection for the
process. A host connection string is optional when routing is enabled, but is still validated
if supplied.

Each item must supply `microsoft.instrumentation_key` and `microsoft.ingestion_endpoint`
as attributes. The key must be a nonblank string of at most 200 characters. The endpoint
must be an absolute HTTPS URL of at most 2048 characters without credentials, query strings,
or fragments. Both limits apply before trimming whitespace. Items with missing or invalid
destinations are dropped, not sent to the host.
**Use trusted, server-owned destination configuration, not request headers or baggage.**

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

The [two-destination sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry-exporter/samples-dev/multiEndpointRouting.ts)
shows how to route logs, spans, events, and counter measurements. Set `ROUTING_KEY_1` and
`ROUTING_ENDPOINT_1` to the first resource's `InstrumentationKey` and `IngestionEndpoint`,
then set `ROUTING_KEY_2` and `ROUTING_ENDPOINT_2` for the second resource. From the built
exporter package directory, run `node --experimental-strip-types samples-dev/multiEndpointRouting.ts`.

Attach the attributes to each log record, span, and metric measurement or observation.
Child spans and logs do not inherit a parent span's route. Span events do. If a metric view
filters attributes, retain the routing attributes. Resource and instrumentation-scope
attributes are not used for metric routing. Two keys may share a normalized endpoint and
authentication mode. Within one export batch their items share a request but keep their own
keys and roles. Per-item routing does not redirect Live Metrics, Statsbeat, or SDK statistics.

For Microsoft Entra ID authentication, pass a `TokenCredential` to the exporter's
`credential` option and grant the identity the **Monitoring Metrics Publisher** role on each
destination resource. Setting `microsoft.ingestion_auth` to `"aad"` authorizes the exporter
to send a bearer token to that item's HTTPS endpoint, including a custom endpoint. Other
items use key-only authentication, even at the same endpoint. An `aad` route without a
credential fails without preventing independent routes from exporting.

All `aad` routes on an exporter share one identity and audience. The default token scope is
`https://monitor.azure.com/.default`. For another cloud, set
`APPLICATIONINSIGHTS_MULTI_ENDPOINT_AAD_AUDIENCE` before constructing the exporter, for
example to `https://monitor.azure.cn/.default`. The host connection string's `AadAudience`
does not apply to routed items. Use separate exporters if destinations require different
identities or audiences.

Set `microsoft.multi_endpoint_cloud_role` to specify the cloud role name. It defaults to
`unknown_service`. Role instances still come from the resource.

Custom `httpClient` and `retryOptions` are supported, but `pipeline` and `additionalPolicies`
are rejected in routing mode. A custom HTTP client is shared across destinations. Do not
add an `Authorization` header, cookie, or other secret indiscriminately, even to key-only
requests. Leave redirect handling to the exporter and honor request abort signals.

#### Retry storage and delivery guarantees

Delivery is best effort. Each destination is attempted independently. A failed export does
not roll back successful destinations, and a successful export can mean items were saved
locally for replay. Neither result is a per-item ingestion receipt. A lost response can
lead to duplicate delivery. Do not rely on ordering across destinations, batches, or retries.

Offline retry storage supports up to 64 endpoint/authentication pairs per exporter.
Each routed batch has a 10-second send deadline, including authentication, HTTP retries,
and redirects. Server-requested `Retry-After` delays still apply to later sends after a timeout.
Timed-out batches are saved for retry when offline storage is available. Overflow
destinations can still send, but have no offline storage if a request fails. Non-retryable
items are not saved. Storage limits, retention expiry, disk permissions, or disabling
storage can cause loss. Protect the retry directory because it contains telemetry.

Retry files are separate from host storage and preserve the original item keys. After a
restart, use the same storage location and host configuration. New telemetry for the same
normalized endpoint and authentication mode reopens its partition for background replay.

Call `forceFlush()` to process buffered telemetry, not to drain retry files or confirm
ingestion. Shut down providers before exiting to avoid losing in-memory items.
Shutdown allows 30 seconds for pending routed requests before cancelling them.
Queued overflow destinations that have not started by that deadline report a failed export.

### Sampling

You can enable sampling to limit the amount of telemetry records you receive. In order to enable correct sampling in Application Insights, use the `ApplicationInsightsSampler` as shown below.

```ts snippet:ReadmeSampleSampling
import { ApplicationInsightsSampler } from "@azure/monitor-opentelemetry-exporter";
import { TracerProvider } from "@opentelemetry/sdk-trace";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { trace, context, propagation } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from "@opentelemetry/core";

// Sampler expects a sample rate of between 0 and 1 inclusive
// A rate of 0.75 means approximately 75 % of your traces will be sent
const aiSampler = new ApplicationInsightsSampler(0.75);
const provider = new TracerProvider({
  sampler: aiSampler,
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "basic-service",
  }),
});

trace.setGlobalTracerProvider(provider);
context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
propagation.setGlobalPropagator(
  new CompositePropagator({
    propagators: [new W3CTraceContextPropagator(), new W3CBaggagePropagator()],
  }),
);
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
import { TracerProvider } from "@opentelemetry/sdk-trace";
import {
  diag,
  DiagConsoleLogger,
  DiagLogLevel,
  trace,
  context,
  propagation,
} from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from "@opentelemetry/core";

const provider = new TracerProvider();
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
trace.setGlobalTracerProvider(provider);
context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
propagation.setGlobalPropagator(
  new CompositePropagator({
    propagators: [new W3CTraceContextPropagator(), new W3CBaggagePropagator()],
  }),
);
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
