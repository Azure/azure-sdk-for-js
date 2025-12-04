// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resourceFromAttributes, emptyResource } from "@opentelemetry/resources";
import type { AzureMonitorOpenTelemetryOptions } from "../src";
import { useAzureMonitor } from "../src";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import type { Context, Exception, ObservableResult, Span } from "@opentelemetry/api";
import { metrics, SpanKind, trace, TraceFlags } from "@opentelemetry/api";
// @ts-ignore
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import {
  ATTR_SERVICE_NAME,
  SEMATTRS_HTTP_CLIENT_IP,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
} from "@opentelemetry/semantic-conventions";
import type { ReadableSpan, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { SdkLogRecord, LogRecordProcessor } from "@opentelemetry/sdk-logs";
import { AI_OPERATION_NAME } from "@azure/monitor-opentelemetry-exporter";
import type { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import type { IncomingMessage, RequestOptions } from "node:http";

describe("snippets", () => {
  it("ReadmeSampleUseAzureMonitor", () => {
    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString:
          process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
      },
    };
    useAzureMonitor(options);
  });

  it("ReadmeSampleConfiguration", () => {
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
      views: [],
    };

    useAzureMonitor(options);
  });

  it("ReadmeSampleCustomConfig", () => {
    process.env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = "path/to/customConfig.json";
    // @ts-preserve-whitespace
    // Application Insights SDK setup....
  });

  it("ReadmeSampleCustomInstrumentation", () => {
    useAzureMonitor();
    registerInstrumentations({
      tracerProvider: trace.getTracerProvider(),
      meterProvider: metrics.getMeterProvider(),
      instrumentations: [new ExpressInstrumentation()],
    });
  });

  it("ReadmeSampleSetRoleNameAndInstance", () => {
    // ----------------------------------------
    // Setting role name and role instance
    // ----------------------------------------
    const customResource = emptyResource();
    customResource.attributes[ATTR_SERVICE_NAME] = "my-helloworld-service";
    customResource.attributes[SEMRESATTRS_SERVICE_NAMESPACE] = "my-namespace";
    customResource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "my-instance";
    // @ts-preserve-whitespace
    const options: AzureMonitorOpenTelemetryOptions = { resource: customResource };
    useAzureMonitor(options);
  });

  it("ReadmeSampleAddCustomProperty", () => {
    // @ts-ignore
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
    // @ts-preserve-whitespace
    // Enable Azure Monitor integration.
    const options: AzureMonitorOpenTelemetryOptions = {
      // Add the SpanEnrichingProcessor
      spanProcessors: [new SpanEnrichingProcessor()],
    };
    // @ts-preserve-whitespace
    useAzureMonitor(options);
  });

  it("ReadmeSampleAddOperationName", () => {
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
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    // Enable Azure Monitor integration.
    const options: AzureMonitorOpenTelemetryOptions = {
      // Add the SpanEnrichingProcessor
      spanProcessors: [new SpanEnrichingProcessor()],
      logRecordProcessors: [new LogRecordEnrichingProcessor()],
    };
    // @ts-preserve-whitespace
    useAzureMonitor(options);
  });

  it("ReadmeSampleExcludeUrl", () => {
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
    // @ts-preserve-whitespace
    const options: AzureMonitorOpenTelemetryOptions = {
      instrumentationOptions: {
        http: httpInstrumentationConfig,
      },
    };
    // @ts-preserve-whitespace
    useAzureMonitor(options);
  });

  it("ReadmeSampleCustomProcessor", () => {
    // @ts-ignore
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
  });

  it("ReadmeSampleCustomMetrics", () => {
    useAzureMonitor();
    const meter = metrics.getMeter("testMeter");
    // @ts-preserve-whitespace
    const histogram = meter.createHistogram("histogram");
    const counter = meter.createCounter("counter");
    const gauge = meter.createObservableGauge("gauge");
    gauge.addCallback((observableResult: ObservableResult) => {
      const randomNumber = Math.floor(Math.random() * 100);
      observableResult.observe(randomNumber, { testKey: "testValue" });
    });
    // @ts-preserve-whitespace
    histogram.record(1, { testKey: "testValue" });
    histogram.record(30, { testKey: "testValue2" });
    histogram.record(100, { testKey2: "testValue" });
    // @ts-preserve-whitespace
    counter.add(1, { testKey: "testValue" });
    counter.add(5, { testKey2: "testValue" });
    counter.add(3, { testKey: "testValue2" });
  });

  it("ReadmeSampleCustomExceptions", () => {
    useAzureMonitor();
    const tracer = trace.getTracer("testMeter");
    // @ts-preserve-whitespace
    const span = tracer.startSpan("hello");
    try {
      throw new Error("Test Error");
    } catch (error) {
      span.recordException(error as Exception);
    }
  });

  it("ReadmeSampleSelfDiagnostics", () => {
    process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "VERBOSE";
    process.env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file";
    process.env["APPLICATIONINSIGHTS_LOGDIR"] = "path/to/logs";
    // @ts-preserve-whitespace
    useAzureMonitor();
  });
});
