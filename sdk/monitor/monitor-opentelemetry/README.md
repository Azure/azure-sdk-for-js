# Azure Monitor OpenTelemetry for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry)

## Getting started

### Install the package

`npm install @azure/monitor-opentelemetry`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

- [OpenTelemetry supported runtimes](https://github.com/open-telemetry/opentelemetry-js#supported-runtimes)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Application Insights workspace](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview/)

### Enable Azure Monitor OpenTelemetry Client

> *Important:* `useAzureMonitor` must be called *before* you import anything else. There may be resulting telemetry loss if other libraries are imported first.


```typescript
const { useAzureMonitor, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");

const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
}
useAzureMonitor(options);
```

* Connection String could be set using the environment variable APPLICATIONINSIGHTS\_CONNECTION\_STRING

## Configuration


```typescript
const { AzureMonitorOpenTelemetryClient, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");
const { Resource } = require("@opentelemetry/resources");

const resource = new Resource({ "testAttribute": "testValue" });
const options: AzureMonitorOpenTelemetryOptions = {
    azureMonitorExporterOptions: {
        // Offline storage
        storageDirectory: "c://azureMonitor",
        // Automatic retries
        disableOfflineStorage: false,
        // Application Insights Connection String
        connectionString:   process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
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
    },
    resource: resource
};

useAzureMonitor(options);

```


|Property|Description|Default|
| ------------------------------- |------------------------------------------------------------------------------------------------------------|-------|
| azureMonitorExporterOptions                     | Azure Monitor OpenTelemetry Exporter Configuration. [More info here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry-exporter)                                                | |                                      | |
| samplingRatio              | Sampling ratio must take a value in the range [0,1], 1 meaning all data will sampled and 0 all Tracing data will be sampled out.                       | 1|
| instrumentationOptions| Allow configuration of OpenTelemetry Instrumentations. |  {"http": { enabled: true },"azureSdk": { enabled: false },"mongoDb": { enabled: false },"mySql": { enabled: false },"postgreSql": { enabled: false },"redis": { enabled: false },"bunyan": { enabled: false }}|
| resource       | Opentelemetry Resource. [More info here](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-resources)         ||
| samplingRatio              | Sampling ratio must take a value in the range [0,1], 1 meaning all data will sampled and 0 all Tracing data will be sampled out. 
| enableLiveMetrics          | Enable/Disable Live Metrics.
| enableStandardMetrics      | Enable/Disable Standard Metrics. 

Options could be set using configuration file `applicationinsights.json` located under root folder of @azure/monitor-opentelemetry package installation folder, Ex: `node_modules/@azure/monitor-opentelemetry`. These configuration values will be applied to all AzureMonitorOpenTelemetryClient instances. 


```json
{
    "samplingRatio": 0.8,
    "enableStandardMetrics": false,
    "instrumentationOptions":{
        "azureSdk": {
            "enabled": false
        }
    },
    ...
}
  
```

Custom JSON file could be provided using `APPLICATIONINSIGHTS_CONFIGURATION_FILE` environment variable.

```javascript
process.env.APPLICATIONINSIGHTS_CONFIGURATION_FILE = "C:/applicationinsights/config/customConfig.json"

// Application Insights SDK setup....
```

## Instrumentation libraries

The following OpenTelemetry Instrumentation libraries are included as part of Azure Monitor OpenTelemetry.

> *Warning:* Instrumentation libraries are based on experimental OpenTelemetry specifications. Microsoft's *preview* support commitment is to ensure that the following libraries emit data to Azure Monitor Application Insights, but it's possible that breaking changes or experimental mapping will block some data elements.

### Distributed Tracing

  - [HTTP/HTTPS](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http)
  - [MongoDB](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-mongodb)
  - [MySQL](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-mysql)
  - [Postgres](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-pg)
  - [Redis](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-redis)
  - [Redis-4](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-redis-4)
  - [Azure SDK](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/instrumentation/opentelemetry-instrumentation-azure-sdk)

### Metrics
- [HTTP/HTTPS](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http) 


### Logs
- [Bunyan](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-bunyan) 

Other OpenTelemetry Instrumentations are available [here](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node) and could be added using TracerProvider in AzureMonitorOpenTelemetryClient.

 ```typescript
    const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
    const { metrics, trace } = require("@opentelemetry/api");
    const { registerInstrumentations } = require("@opentelemetry/instrumentation");
    const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

    useAzureMonitor();
    const instrumentations = [
        new ExpressInstrumentation(),
    ];
    registerInstrumentations({
        tracerProvider:  trace.getTracerProvider(),
        meterProvider: metrics.getMeterProvider(),
        instrumentations: instrumentations,
    });
    
```


## Set the Cloud Role Name and the Cloud Role Instance

You might set the Cloud Role Name and the Cloud Role Instance via [OpenTelemetry Resource](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/resource/sdk.md#resource-sdk) attributes.


```typescript
const { useAzureMonitor, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");

// ----------------------------------------
// Setting role name and role instance
// ----------------------------------------
const customResource = Resource.EMPTY;
customResource.attributes[SemanticResourceAttributes.SERVICE_NAME] = "my-helloworld-service";
customResource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE] = "my-namespace";
customResource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = "my-instance";

const options: AzureMonitorOpenTelemetryOptions = { resource : customResource }
useAzureMonitor(options);
```

For information on standard attributes for resources, see [Resource Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/tree/main/docs/resource).


## Modify telemetry

This section explains how to modify telemetry.

### Add span attributes

To add span attributes, use either of the following two ways:

* Use options provided by [instrumentation libraries](#instrumentation-libraries).
* Add a custom span processor.

These attributes might include adding a custom property to your telemetry.

> *Tip:* The advantage of using options provided by instrumentation libraries, when they're available, is that the entire context is available. As a result, users can select to add or filter more attributes. For example, the enrich option in the HttpClient instrumentation library gives users access to the httpRequestMessage itself. They can select anything from it and store it as an attribute.

#### Add a custom property to a Trace

Any [attributes](#add-span-attributes) you add to spans are exported as custom properties.

Use a custom processor:

```typescript
const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
const { trace } = require("@opentelemetry/api");
const { ReadableSpan, Span, SpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SemanticAttributes } = require("@opentelemetry/semantic-conventions");

useAzureMonitor();

class SpanEnrichingProcessor implements SpanProcessor{
  forceFlush(): Promise<void>{
    return Promise.resolve();
  }
  shutdown(): Promise<void>{
    return Promise.resolve();
  }
  onStart(_span: Span): void{}
  onEnd(span: ReadableSpan){
    span.attributes["CustomDimension1"] = "value1";
    span.attributes["CustomDimension2"] = "value2";
    span.attributes[SemanticAttributes.HTTP_CLIENT_IP] = "<IP Address>";
  }
}

const tracerProvider = trace.getTracerProvider().getDelegate();
tracerProvider.addSpanProcessor(new SpanEnrichingProcessor());
```

### Filter telemetry

You might use the following ways to filter out telemetry before it leaves your application.

1. Exclude the URL option provided by many HTTP instrumentation libraries.

    The following example shows how to exclude a certain URL from being tracked by using the [HTTP/HTTPS instrumentation library](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http):
    
    ```typescript
    const { useAzureMonitor, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");
    const { IncomingMessage } = require("http");
    const { RequestOptions } = require("https");
    const { HttpInstrumentationConfig }= require("@opentelemetry/instrumentation-http");

    const httpInstrumentationConfig: HttpInstrumentationConfig = {
        enabled: true,
        ignoreIncomingRequestHook: (request: IncomingMessage) => {
            // Ignore OPTIONS incoming requests
            if (request.method === 'OPTIONS') {
                return true;
            }
            return false;
        },
        ignoreOutgoingRequestHook: (options: RequestOptions) => {
            // Ignore outgoing requests with /test path
            if (options.path === '/test') {
                return true;
            }
            return false;
        }
    };
    const options : AzureMonitorOpenTelemetryOptions = {
        instrumentationOptions: {
          http:  httpInstrumentationConfig,
        }
    };
    useAzureMonitor(options);
    
    ```

1. Use a custom processor. You can use a custom span processor to exclude certain spans from being exported. To mark spans to not be exported, set `TraceFlag` to `DEFAULT`.
Use the add [custom property example](#add-a-custom-property-to-a-trace), but replace the following lines of code:

    ```typescript
    ...
    import { SpanKind, TraceFlags } from "@opentelemetry/api";
    
    class SpanEnrichingProcessor implements SpanProcessor{
        ...
    
        onEnd(span: ReadableSpan) {
            if(span.kind == SpanKind.INTERNAL){
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


The following table shows the recommended aggregation types] for each of the OpenTelemetry Metric Instruments.

| OpenTelemetry Instrument                             | Azure Monitor Aggregation Type                             |
|------------------------------------------------------|------------------------------------------------------------|
| Counter                                              | Sum                                                        |
| Asynchronous Counter                                 | Sum                                                        |
| Histogram                                            | Average, Sum, Count (Max, Min for Python and Node.js only) |
| Asynchronous Gauge                                   | Average                                                    |
| UpDownCounter (Python and Node.js only)              | Sum                                                        |
| Asynchronous UpDownCounter (Python and Node.js only) | Sum                                                        |

>> *Caution:* Aggregation types beyond what's shown in the table typically aren't meaningful.

The [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#instrument)
describes the instruments and provides examples of when you might use each one.

```typescript
    const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
    const { metrics } = require("@opentelemetry/api");

    useAzureMonitor();
    const meter =  metrics.getMeter("testMeter");

    let histogram = meter.createHistogram("histogram");
    let counter = meter.createCounter("counter");
    let gauge = meter.createObservableGauge("gauge");
    gauge.addCallback((observableResult: ObservableResult) => {
        let randomNumber = Math.floor(Math.random() * 100);
        observableResult.observe(randomNumber, {"testKey": "testValue"});
    });

    histogram.record(1, { "testKey": "testValue" });
    histogram.record(30, { "testKey": "testValue2" });
    histogram.record(100, { "testKey2": "testValue" });

    counter.add(1, { "testKey": "testValue" });
    counter.add(5, { "testKey2": "testValue" });
    counter.add(3, { "testKey": "testValue2" });
```


### Add Custom Exceptions

Select instrumentation libraries automatically support exceptions to Application Insights.
However, you may want to manually report exceptions beyond what instrumention libraries report.
For instance, exceptions caught by your code are *not* ordinarily not reported, and you may wish to report them
and thus draw attention to them in relevant experiences including the failures blade and end-to-end transaction view.

```typescript
const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
const { trace } = require("@opentelemetry/api");

useAzureMonitor();
const tracer =  trace.getTracer("testMeter");

let span = tracer.startSpan("hello");
try{
    throw new Error("Test Error");
}
catch(error){
    span.recordException(error);
}
```

## Troubleshooting

### Self-diagnostics

Azure Monitor OpenTelemetry uses the OpenTelemetry API Logger for internal logs. To enable it, use the following code:

```typescript
const { useAzureMonitor } = require("@azure/monitor-opentelemetry");
const { DiagLogLevel } = require("@opentelemetry/api");

process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL = "VERBOSE";
process.env.APPLICATIONINSIGHTS_LOG_DESTINATION = "file";
process.env.APPLICATIONINSIGHTS_LOGDIR = "C:/applicationinsights/logs";

useAzureMonitor();
```

`APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL` environment varialbe could be used to set desired log level, supporting the following values: `NONE`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `VERBOSE` and  `ALL`.

Logs could be put into local file using `APPLICATIONINSIGHTS_LOG_DESTINATION` environment variable, supported values are `file` and `file+console`, a file named `applicationinsights.log` will be generated on tmp folder by default, including all logs,  `/tmp` for *nix and `USERDIR/AppData/Local/Temp` for Windows. Log directory could be configured using `APPLICATIONINSIGHTS_LOGDIR` environment variable.


## Examples

For complete samples of a few champion scenarios, see the [`samples/`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry/samples-dev/) folder.

## Key concepts

For more information on the OpenTelemetry project, please review the [**OpenTelemetry Specifications**](https://github.com/open-telemetry/opentelemetry-specification#opentelemetry-specification).


### Plugin Registry

To see if a plugin has already been made for a library you are using, please check out the [OpenTelemetry Registry](https://opentelemetry.io/registry/).

If you cannot your library in the registry, feel free to suggest a new plugin request at [`opentelemetry-js-contrib`](https://github.com/open-telemetry/opentelemetry-js-contrib).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/monitor/monitor-opentelemetry/README.png)
