# Azure Monitor OpenTelemetry for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry)

## Getting started

### Install the package

`npm install @azure/monitor-opentelemetry`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

- [OpenTelemetry supported runtimes](https://github.com/open-telemetry/opentelemetry-js#supported-runtimes)

> _Warning:_ This SDK only works for Node.js environments. Use the [Application Insights JavaScript SDK](https://github.com/microsoft/ApplicationInsights-JS) for web and browser scenarios.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Application Insights workspace](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview/)

### Enable Azure Monitor OpenTelemetry Client

> _Important:_ `useAzureMonitor` must be called _before_ you import anything else. There may be resulting telemetry loss if other libraries are imported first.

```ts snippet:ReadmeSampleUseAzureMonitor
import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
};
useAzureMonitor(options);
```

- Connection String could be set using the environment variable `APPLICATIONINSIGHTS_CONNECTION_STRING`.

## Configuration

```ts snippet:ReadmeSampleConfiguration
import { resourceFromAttributes } from "@opentelemetry/resources";
import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

const resource = resourceFromAttributes({ testAttribute: "testValue" });
const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    // Offline storage
    storageDirectory: "c://azureMonitor",
    // Automatic retries
    disableOfflineStorage: false,
    // Application Insights Connection String
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
  samplingRatio: 1,
  instrumentationOptions: {
    // Instrumentations generating traces
    azureSdk: { enabled: true },
    http: { enabled: true },
    mongoDb: { enabled: true },
    mySql: { enabled: true },
    postgreSql: { enabled: true },
    redis: { enabled: true },
    redis4: { enabled: true },
    // Instrumentations generating logs
    bunyan: { enabled: true },
    winston: { enabled: true },
  },
  enableLiveMetrics: true,
  enableStandardMetrics: true,
  browserSdkLoaderOptions: {
    enabled: false,
    connectionString: "",
  },
  resource: resource,
  logRecordProcessors: [],
  spanProcessors: [],
};
useAzureMonitor(options);
```

<table>
  <tr>
    <th>Option</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>azureMonitorExporterOptions</code></td>
    <td>Azure Monitor OpenTelemetry Exporter Configuration. <a href="https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry-exporter">More info here</a></td>
    <td></td>
  </tr>
  <tr>
    <td><code>samplingRatio</code></td>
    <td>Sampling ratio must take a value in the range [0,1], 1 meaning all data will sampled and 0 all Tracing data will be sampled out.</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>instrumentationOptions</code></td>
    <td>Instrumentation libraries configuration. <a href="#instrumentation-libraries">More info here</a></td>
    <td>
      <pre><code class="language-javascript">
{
  http: { enabled: true },
  azureSdk: { enabled: true },
  mongoDb: { enabled: true },
  mySql: { enabled: true },
  postgreSql: { enabled: true },
  redis: { enabled: true },
  redis4: { enabled: true },
  bunyan: { enabled: false }, 
  winston: { enabled: false } 
}
      </code></pre>
    </td>
  </tr>
  <tr>
    <td><code>browserSdkLoaderOptions</code></td>
    <td>Allow configuration of Web Instrumentations.</td>
    <td>
      <pre>
        <code class="language-javascript">
{ 
  enabled: false, 
  connectionString: "" 
}
        </code>
      </pre>
    </td>
  </tr>
  <tr>
    <td><code>resource</code></td>
    <td>Opentelemetry Resource. <a href="https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-resources">More info here</a></td>
    <td></td>
  </tr>
  <tr>
    <td><code>enableLiveMetrics</code></td>
    <td>Enable/Disable Live Metrics.</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>enableStandardMetrics</code></td>
    <td>Enable/Disable Standard Metrics. </td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>logRecordProcessors</code></td>
    <td>Array of log record processors to register to the global logger provider. </td>
    <td></td>
  </tr>
  <tr>
    <td><code>spanProcessors</code></td>
    <td>Array of span processors to register to the global tracer provider. </td>
    <td></td>
  </tr>
  <tr>
    <td><code>enableTraceBasedSamplingForLogs</code></td>
    <td>Enable log sampling based on trace.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>enablePerformanceCounters</code></td>
    <td>Enable performance counters.</td>
    <td><code>true</code></td>
  </tr>
</table>

Options could be set using configuration file `applicationinsights.json` located under root folder of @azure/monitor-opentelemetry package installation folder, Ex: `node_modules/@azure/monitor-opentelemetry`. These configuration values will be applied to all AzureMonitorOpenTelemetryClient instances.

```json
{
    "samplingRatio": 0.8,
    "enableStandardMetrics": true,
    "enableLiveMetrics": true,
    "instrumentationOptions":{
        "azureSdk": {
            "enabled": false
        }
    },
    ...
}
```

Custom JSON file could be provided using `APPLICATIONINSIGHTS_CONFIGURATION_FILE` environment variable.

```ts snippet:ReadmeSampleCustomConfig
process.env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = "path/to/customConfig.json";
```

## Instrumentation libraries

The following OpenTelemetry Instrumentation libraries are included as part of Azure Monitor OpenTelemetry.

**Note:** The Azure SDK, MongoDB, MySQL, PostgreSQL, Redis, and Redis-4 instrumentations are enabled by default for distributed tracing. The HTTP/HTTPS instrumentation is also enabled by default. All other instrumentations are disabled by default and can be enabled by setting `enabled: true` in the instrumentation options.

> _Warning:_ Instrumentation libraries are based on experimental OpenTelemetry specifications. Microsoft's _preview_ support commitment is to ensure that the following libraries emit data to Azure Monitor Application Insights, but it's possible that breaking changes or experimental mapping will block some data elements.

### Distributed Tracing

- [HTTP/HTTPS](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http)
- [MongoDB](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-mongodb)
- [MySQL](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-mysql)
- [Postgres](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-pg)
- [Redis](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-redis)
- [Redis-4](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-redis-4)
- [Azure SDK](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/instrumentation/opentelemetry-instrumentation-azure-sdk)

### Metrics

- [HTTP/HTTPS](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http)

### Logs

- [Bunyan](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-bunyan)

- [Winston](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-winston)

Other OpenTelemetry Instrumentations are available [here](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages) and could be added using TracerProvider in AzureMonitorOpenTelemetryClient.

```ts snippet:ReadmeSampleCustomInstrumentation
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { trace, metrics } from "@opentelemetry/api";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";

useAzureMonitor();
registerInstrumentations({
  tracerProvider: trace.getTracerProvider(),
  meterProvider: metrics.getMeterProvider(),
  instrumentations: [new ExpressInstrumentation()],
});
```

### Application Insights Browser SDK Loader

Application Insights Browser SDK Loader allows you to inject the web SDK into node server responses when the following conditions are true:

- Response has status code `200`.
- Response method is `GET`.
- Server response has the `Conent-Type` html header.
- Server resonse contains both <head> and </head> tags.
- Response does not contain current /backup web Instrumentation CDN endpoints. (current and backup Web Instrumentation CDN endpoints [here](https://github.com/microsoft/ApplicationInsights-JS#active-public-cdn-endpoints))

Further information on usage of the browser SDK loader can be found [here](https://learn.microsoft.com/azure/azure-monitor/app/javascript-sdk?tabs=javascriptwebsdkloaderscript).

## Set the Cloud Role Name and the Cloud Role Instance

You might set the Cloud Role Name and the Cloud Role Instance via [OpenTelemetry Resource](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/resource/sdk.md#resource-sdk) attributes.

```ts snippet:ReadmeSampleSetRoleNameAndInstance
import { emptyResource } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
} from "@opentelemetry/semantic-conventions";
import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

// ----------------------------------------
// Setting role name and role instance
// ----------------------------------------
const customResource = emptyResource();
customResource.attributes[ATTR_SERVICE_NAME] = "my-helloworld-service";
customResource.attributes[SEMRESATTRS_SERVICE_NAMESPACE] = "my-namespace";
customResource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "my-instance";

const options: AzureMonitorOpenTelemetryOptions = { resource: customResource };
useAzureMonitor(options);
```

For information on standard attributes for resources, see [Resource Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/tree/main/docs/resource).

## Modify telemetry

This section explains how to modify telemetry.

### Add span attributes

To add span attributes, use either of the following two ways:

- Use options provided by [instrumentation libraries](#instrumentation-libraries).
- Add a custom span processor.

These attributes might include adding a custom property to your telemetry.

> _Tip:_ The advantage of using options provided by instrumentation libraries, when they're available, is that the entire context is available. As a result, users can select to add or filter more attributes. For example, the enrich option in the HttpClient instrumentation library gives users access to the httpRequestMessage itself. They can select anything from it and store it as an attribute.

#### Add a custom property to a Trace

Any [attributes](#add-span-attributes) you add to spans are exported as custom properties.

Use a custom processor:

```ts snippet:ReadmeSampleAddCustomProperty
import { SpanProcessor, ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { Span } from "@opentelemetry/api";
import { SEMATTRS_HTTP_CLIENT_IP } from "@opentelemetry/semantic-conventions";
import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

class SpanEnrichingProcessor implements SpanProcessor {
  async forceFlush(): Promise<void> {
    // Flush code here
  }
  async shutdown(): Promise<void> {
    // shutdown code here
  }
  onStart(_span: Span): void {}
  onEnd(span: ReadableSpan): void {
    span.attributes["CustomDimension1"] = "value1";
    span.attributes["CustomDimension2"] = "value2";
    span.attributes[SEMATTRS_HTTP_CLIENT_IP] = "<IP Address>";
  }
}

// Enable Azure Monitor integration.
const options: AzureMonitorOpenTelemetryOptions = {
  // Add the SpanEnrichingProcessor
  spanProcessors: [new SpanEnrichingProcessor()],
};

useAzureMonitor(options);
```

#### Add Operation Name to Traces and Logs

Use a custom span processor and log record processor in order to attach and correlate operation name from requests to dependencies and logs.

```ts snippet:ReadmeSampleAddOperationName
import { SpanProcessor, ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { Span, Context, trace } from "@opentelemetry/api";
import { AI_OPERATION_NAME } from "@azure/monitor-opentelemetry-exporter";
import { LogRecordProcessor, SdkLogRecord } from "@opentelemetry/sdk-logs";
import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

class SpanEnrichingProcessor implements SpanProcessor {
  async forceFlush(): Promise<void> {
    // Flush code here
  }
  async shutdown(): Promise<void> {
    // shutdown code here
  }
  onStart(_span: Span, _context: Context): void {
    const parentSpan = trace.getSpan(_context);
    if (parentSpan && "name" in parentSpan) {
      // If the parent span has a name we can assume it is a ReadableSpan and cast it.
      _span.setAttribute(AI_OPERATION_NAME, (parentSpan as unknown as ReadableSpan).name);
    }
  }
  onEnd(_span: ReadableSpan): void {}
}

class LogRecordEnrichingProcessor implements LogRecordProcessor {
  async forceFlush(): Promise<void> {
    // Flush code here
  }
  async shutdown(): Promise<void> {
    // shutdown code here
  }
  onEmit(_logRecord: SdkLogRecord, _context: Context): void {
    const parentSpan = trace.getSpan(_context);
    if (parentSpan && "name" in parentSpan) {
      // If the parent span has a name we can assume it is a ReadableSpan and cast it.
      _logRecord.setAttribute(AI_OPERATION_NAME, (parentSpan as unknown as ReadableSpan).name);
    }
  }
}

// Enable Azure Monitor integration.
const options: AzureMonitorOpenTelemetryOptions = {
  // Add the SpanEnrichingProcessor
  spanProcessors: [new SpanEnrichingProcessor()],
  logRecordProcessors: [new LogRecordEnrichingProcessor()],
};

useAzureMonitor(options);
```

### Filter telemetry

You might use the following ways to filter out telemetry before it leaves your application.

1.  Exclude the URL option provided by many HTTP instrumentation libraries.

    The following example shows how to exclude a certain URL from being tracked by using the [HTTP/HTTPS instrumentation library](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http):

    ```ts snippet:ReadmeSampleExcludeUrl
    import { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
    import { IncomingMessage, RequestOptions } from "node:http";
    import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

    const httpInstrumentationConfig: HttpInstrumentationConfig = {
      enabled: true,
      ignoreIncomingRequestHook: (request: IncomingMessage) => {
        // Ignore OPTIONS incoming requests
        if (request.method === "OPTIONS") {
          return true;
        }
        return false;
      },
      ignoreOutgoingRequestHook: (options: RequestOptions) => {
        // Ignore outgoing requests with /test path
        if (options.path === "/test") {
          return true;
        }
        return false;
      },
    };

    const options: AzureMonitorOpenTelemetryOptions = {
      instrumentationOptions: {
        http: httpInstrumentationConfig,
      },
    };

    useAzureMonitor(options);
    ```

1.  Use a custom processor. You can use a custom span processor to exclude certain spans from being exported. To mark spans to not be exported, set `TraceFlag` to `DEFAULT`.
    Use the add [custom property example](#add-a-custom-property-to-a-trace), but replace the following lines of code:

      ```ts snippet:ReadmeSampleCustomProcessor
      import { SpanProcessor, ReadableSpan } from "@opentelemetry/sdk-trace-base";
      import { Span, Context, SpanKind, TraceFlags } from "@opentelemetry/api";

      class SpanEnrichingProcessor implements SpanProcessor {
        async forceFlush(): Promise<void> {
          // Force flush code here
        }
        onStart(_span: Span, _parentContext: Context): void {
          // Normal code here
        }
        async shutdown(): Promise<void> {
          // Shutdown code here
        }
        onEnd(span: ReadableSpan): void {
          if (span.kind === SpanKind.INTERNAL) {
            span.spanContext().traceFlags = TraceFlags.NONE;
          }
        }
      }
      ```

## Custom telemetry

This section explains how to collect custom telemetry from your application.

### Add Custom Metrics

You may want to collect metrics beyond what is collected by [instrumentation libraries](#instrumentation-libraries).

The OpenTelemetry API offers six metric "instruments" to cover a variety of metric scenarios and you'll need to pick the correct "Aggregation Type" when visualizing metrics in Metrics Explorer. This requirement is true when using the OpenTelemetry Metric API to send metrics and when using an instrumentation library.

The following table shows the recommended aggregation types for each of the OpenTelemetry Metric Instruments.

| OpenTelemetry Instrument                             | Azure Monitor Aggregation Type                             |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| Counter                                              | Sum                                                        |
| Asynchronous Counter                                 | Sum                                                        |
| Histogram                                            | Average, Sum, Count (Max, Min for Python and Node.js only) |
| Asynchronous Gauge                                   | Average                                                    |
| UpDownCounter (Python and Node.js only)              | Sum                                                        |
| Asynchronous UpDownCounter (Python and Node.js only) | Sum                                                        |

> > _Caution:_ Aggregation types beyond what's shown in the table typically aren't meaningful.

The [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#instrument)
describes the instruments and provides examples of when you might use each one.

```ts snippet:ReadmeSampleCustomMetrics
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { metrics, ObservableResult } from "@opentelemetry/api";

useAzureMonitor();
const meter = metrics.getMeter("testMeter");

const histogram = meter.createHistogram("histogram");
const counter = meter.createCounter("counter");
const gauge = meter.createObservableGauge("gauge");
gauge.addCallback((observableResult: ObservableResult) => {
  const randomNumber = Math.floor(Math.random() * 100);
  observableResult.observe(randomNumber, { testKey: "testValue" });
});

histogram.record(1, { testKey: "testValue" });
histogram.record(30, { testKey: "testValue2" });
histogram.record(100, { testKey2: "testValue" });

counter.add(1, { testKey: "testValue" });
counter.add(5, { testKey2: "testValue" });
counter.add(3, { testKey: "testValue2" });
```

### Add Custom Exceptions

Select instrumentation libraries automatically support exceptions to Application Insights.
However, you may want to manually report exceptions beyond what instrumention libraries report.
For instance, exceptions caught by your code are _not_ ordinarily not reported, and you may wish to report them
and thus draw attention to them in relevant experiences including the failures blade and end-to-end transaction view.

```ts snippet:ReadmeSampleCustomExceptions
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { trace, Exception } from "@opentelemetry/api";

useAzureMonitor();
const tracer = trace.getTracer("testMeter");

const span = tracer.startSpan("hello");
try {
  throw new Error("Test Error");
} catch (error) {
  span.recordException(error as Exception);
}
```

## Troubleshooting

### Self-diagnostics

Azure Monitor OpenTelemetry uses the OpenTelemetry API Logger for internal logs. To enable it, use the following code:

```ts snippet:ReadmeSampleSelfDiagnostics
import { useAzureMonitor } from "@azure/monitor-opentelemetry";

process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "VERBOSE";
process.env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file";
process.env["APPLICATIONINSIGHTS_LOGDIR"] = "path/to/logs";

useAzureMonitor();
```

`APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL` environment variable could be used to set desired log level, supporting the following values: `NONE`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `VERBOSE` and `ALL`.

Logs could be put into local file using `APPLICATIONINSIGHTS_LOG_DESTINATION` environment variable, supported values are `file` and `file+console`, a file named `applicationinsights.log` will be generated on tmp folder by default, including all logs, `/tmp` for \*nix and `USERDIR/AppData/Local/Temp` for Windows. Log directory could be configured using `APPLICATIONINSIGHTS_LOGDIR` environment variable.

## Examples

For complete samples of a few champion scenarios, see the [`samples/`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry/samples-dev/) folder.

## Key concepts

For more information on the OpenTelemetry project, please review the [**OpenTelemetry Specifications**](https://github.com/open-telemetry/opentelemetry-specification#opentelemetry-specification).

### Plugin Registry

To see if a plugin has already been made for a library you are using, please check out the [OpenTelemetry Registry](https://opentelemetry.io/registry/).

If you cannot your library in the registry, feel free to suggest a new plugin request at [`opentelemetry-js-contrib`](https://github.com/open-telemetry/opentelemetry-js-contrib).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
