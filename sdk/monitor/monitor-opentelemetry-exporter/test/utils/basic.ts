// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as opentelemetry from "@opentelemetry/api";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import type { PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

import { AzureMonitorTraceExporter, AzureMonitorMetricExporter } from "../../src/index.js";
import type { Expectation, Scenario } from "./types.js";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import { FlushSpanProcessor } from "./flushSpanProcessor.js";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  SemanticResourceAttributes,
  SemanticAttributes,
} from "@opentelemetry/semantic-conventions";
import { AzureMonitorLogExporter } from "../../src/export/log.js";
import { LoggerProvider, SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { SeverityNumber } from "@opentelemetry/api-logs";

function delay<T>(t: number, value?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

const COMMON_ENVELOPE_PARAMS: Partial<Envelope> = {
  instrumentationKey:
    process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
  sampleRate: 100,
};

export class TraceBasicScenario implements Scenario {
  private _processor: any;

  prepare(): void {
    const exporter = new AzureMonitorTraceExporter({
      connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
    });
    this._processor = new FlushSpanProcessor(exporter);
    const resource = resourceFromAttributes({
      "service.name": "testServiceName",
      "k8s.cluster.name": "testClusterName",
      "k8s.node.name": "testNodeName",
      "k8s.namespace.name": "testNamespaceName",
      "k8s.pod.name": "testPodName",
    });
    const provider = new BasicTracerProvider({
      spanProcessors: [this._processor],
      resource: resource,
    });
    trace.setGlobalTracerProvider(provider);
  }

  async run(): Promise<void> {
    const tracer = opentelemetry.trace.getTracer("basic");
    const root = tracer.startSpan(`${this.constructor.name}.Root`, {
      startTime: 0,
      kind: opentelemetry.SpanKind.SERVER,
      attributes: {
        foo: "bar",
      },
    });
    root.recordException({
      code: "TestExceptionCode",
      message: "TestExceptionMessage",
      name: "TestExceptionName",
      stack: "TestExceptionStack",
    });

    const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), root);
    const child1 = tracer.startSpan(
      `${this.constructor.name}.Child.1`,
      {
        startTime: 0,
        kind: opentelemetry.SpanKind.CLIENT,
        attributes: {
          numbers: "123",
        },
      },
      ctx,
    );
    const eventAttributes: any = {};
    eventAttributes["SomeAttribute"] = "Test";
    child1.addEvent("TestEvent", eventAttributes);
    child1.end(100);
    await delay(0);
    root.setStatus({ code: SpanStatusCode.OK });
    root.end(600);
  }

  cleanup(): void {
    opentelemetry.trace.disable();
  }

  flush(): Promise<void> {
    return this._processor.forceFlush();
  }

  expectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
          metrics: [{ name: "_OTELRESOURCE_", value: 1 }],
          properties: {
            "service.name": "testServiceName",
            "k8s.cluster.name": "testClusterName",
            "k8s.namespace.name": "testNamespaceName",
            "k8s.node.name": "testNodeName",
            "k8s.pod.name": "testPodName",
          },
        } as any,
      },
      children: [],
    },
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Request",
      data: {
        baseType: "RequestData",
        baseData: {
          version: 2,
          name: "TraceBasicScenario.Root",
          responseCode: "0",
          success: true,
          properties: {
            foo: "bar",
          },
        } as any,
      },
      children: [
        {
          name: "Microsoft.ApplicationInsights.RemoteDependency",
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "RemoteDependencyData",
            baseData: {
              version: 2,
              name: "TraceBasicScenario.Child.1",
              success: true,
              resultCode: "0",
              properties: {
                numbers: "123",
              },
            } as any,
          },
          children: [
            {
              name: "Microsoft.ApplicationInsights.Message",
              ...COMMON_ENVELOPE_PARAMS,
              data: {
                baseType: "MessageData",
                baseData: {
                  version: 2,
                  message: "TestEvent",
                  properties: {
                    SomeAttribute: "Test",
                  },
                } as any,
              },
              children: [],
            },
          ],
        },
        {
          name: "Microsoft.ApplicationInsights.Exception",
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "ExceptionData",
            baseData: {
              version: 2,
              exceptions: [
                {
                  typeName: "TestExceptionCode",
                  message: "TestExceptionMessage",
                  stack: "TestExceptionStack",
                  hasFullStack: true,
                },
              ],
            } as any,
          },
          children: [],
        },
      ],
    },
  ];

  disabledExpectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Request",
      data: {
        baseType: "RequestData",
        baseData: {
          version: 2,
          name: "TraceBasicScenario.Root",
          responseCode: "0",
          success: true,
          properties: {
            foo: "bar",
          },
        } as any,
      },
      children: [
        {
          name: "Microsoft.ApplicationInsights.RemoteDependency",
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "RemoteDependencyData",
            baseData: {
              version: 2,
              name: "TraceBasicScenario.Child.1",
              success: true,
              resultCode: "0",
              properties: {
                numbers: "123",
              },
            } as any,
          },
          children: [
            {
              name: "Microsoft.ApplicationInsights.Message",
              ...COMMON_ENVELOPE_PARAMS,
              data: {
                baseType: "MessageData",
                baseData: {
                  version: 2,
                  message: "TestEvent",
                  properties: {
                    SomeAttribute: "Test",
                  },
                } as any,
              },
              children: [],
            },
          ],
        },
        {
          name: "Microsoft.ApplicationInsights.Exception",
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "ExceptionData",
            baseData: {
              version: 2,
              exceptions: [
                {
                  typeName: "TestExceptionCode",
                  message: "TestExceptionMessage",
                  stack: "TestExceptionStack",
                  hasFullStack: true,
                },
              ],
            } as any,
          },
          children: [],
        },
      ],
    },
  ];
}

export class MetricBasicScenario implements Scenario {
  private _provider: MeterProvider;

  constructor() {
    const testResource = resourceFromAttributes({
      [SemanticResourceAttributes.SERVICE_NAME]: "my-helloworld-service",
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: "my-namespace",
      [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "my-instance",
    });
    const exporter = new AzureMonitorMetricExporter({
      connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
    });
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: exporter,
      exportIntervalMillis: 100,
    };
    this._provider = new MeterProvider({
      resource: testResource,
      readers: [new PeriodicExportingMetricReader(metricReaderOptions)],
    });
  }

  prepare(): void {
    // NOOP
  }

  async run(): Promise<void> {
    const meter = this._provider.getMeter("basic");
    const counter = meter.createCounter("testCounter");
    const counter2 = meter.createCounter("testCounter2");
    const histogram = meter.createHistogram("testHistogram");
    let attributes: any = { testAttribute: "testValue" };
    counter.add(1);
    counter.add(2);
    counter2.add(12, attributes);
    histogram.record(1);
    histogram.record(2);
    histogram.record(3);
    histogram.record(4);
    const dependencyDurationMetric = meter.createHistogram("TestDependencyDuration");

    attributes = {
      "Dependency.Success": "False",
      "Dependency.Type": "http",
      "_MS.IsAutocollected": "True",
      "_MS.MetricId": "dependencies/duration",
      "cloud/roleInstance": "my-instance",
      "cloud/roleName": "my-namespace.my-helloworld-service",
      "dependency/resultCode": "400",
      "dependency/target": "http://www.test.com",
    };

    dependencyDurationMetric.record(1234, attributes);
    dependencyDurationMetric.record(4567, attributes);

    attributes = {
      "Request.Success": "True",
      "_MS.IsAutocollected": "True",
      "_MS.MetricId": "requests/duration",
      "cloud/roleInstance": "my-instance",
      "cloud/roleName": "my-namespace.my-helloworld-service",
      "request/resultCode": "200",
    };

    const requestyDurationMetric = meter.createHistogram("TestRequestDuration");
    requestyDurationMetric.record(4567, attributes);
    await delay(0);
  }

  cleanup(): void {
    this._provider.shutdown();
  }

  flush(): Promise<void> {
    return delay(100);
  }

  expectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
          metrics: [
            {
              name: "testCounter",
              value: 3,
              count: 1,
              dataPointType: "Aggregation",
            },
          ],
        } as any,
      },
      children: [],
    },
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
          metrics: [
            {
              name: "testCounter2",
              value: 12,
              count: 1,
              dataPointType: "Aggregation",
            },
          ],
          properties: { testAttribute: "testValue" },
        } as any,
      },
      children: [],
    },
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
          metrics: [
            {
              name: "testHistogram",
              value: 10,
              count: 4,
              max: 4,
              min: 1,
              dataPointType: "Aggregation",
            },
          ],
        } as any,
      },
      children: [],
    },
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
          metrics: [
            {
              name: "TestDependencyDuration",
              value: 5801,
              count: 2,
              max: 4567,
              min: 1234,
              dataPointType: "Aggregation",
            },
          ],
          properties: {
            "Dependency.Success": "False",
            "Dependency.Type": "http",
            "_MS.IsAutocollected": "True",
            "_MS.MetricId": "dependencies/duration",
            "cloud/roleInstance": "my-instance",
            "cloud/roleName": "my-namespace.my-helloworld-service",
            "dependency/resultCode": "400",
            "dependency/target": "http://www.test.com",
          },
        } as any,
      },
      children: [],
    },
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
          metrics: [
            {
              name: "TestRequestDuration",
              value: 4567,
              count: 1,
              max: 4567,
              min: 4567,
              dataPointType: "Aggregation",
            },
          ],
          properties: {
            "Request.Success": "True",
            "_MS.IsAutocollected": "True",
            "_MS.MetricId": "requests/duration",
            "cloud/roleInstance": "my-instance",
            "cloud/roleName": "my-namespace.my-helloworld-service",
            "request/resultCode": "200",
          },
        } as any,
      },
      children: [],
    },
  ];
}

export class LogBasicScenario implements Scenario {
  private _processor: any;
  private _provider: any;

  prepare(): void {
    const exporter = new AzureMonitorLogExporter({
      connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
    });
    this._processor = new SimpleLogRecordProcessor(exporter);

    // In OpenTelemetry SDK v0.205.0, LoggerProvider uses 'processors' parameter
    this._provider = new LoggerProvider({
      processors: [this._processor],
    });
  }

  async run(): Promise<void> {
    const logger = this._provider.getLogger("basic");

    // emit a message record
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: "test message",
      attributes: { foo: "bar" },
    });
    // emit a exception record
    const attributes: any = [];
    attributes[SemanticAttributes.EXCEPTION_TYPE] = "test exception type";
    attributes[SemanticAttributes.EXCEPTION_MESSAGE] = "test exception message";
    attributes[SemanticAttributes.EXCEPTION_STACKTRACE] = "test exception stack";
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: "ERROR",
      attributes: attributes,
    });
  }

  async cleanup(): Promise<void> {
    opentelemetry.trace.disable();
    // Shutdown the logger provider to ensure all logs are flushed
    if (this._provider) {
      await this._provider.shutdown();
    }
  }

  async flush(): Promise<void> {
    // First flush the provider to ensure all logs are processed
    if (this._provider) {
      await this._provider.forceFlush();
    }
    // Then flush the processor
    return this._processor.forceFlush();
  }

  expectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Message",
      data: {
        baseType: "MessageData",
        baseData: {
          version: 2,
          message: "test message",
          severityLevel: "Information",
          properties: {
            foo: "bar",
          },
        } as any,
      },
      children: [],
    },
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Exception",
      data: {
        baseType: "ExceptionData",
        baseData: {
          version: 2,
          exceptions: [
            {
              typeName: "test exception type",
              message: "test exception message",
              hasFullStack: true,
              stack: "test exception stack",
            },
          ],
          severityLevel: "Error",
        } as any,
      },
      children: [],
    },
  ];
}
