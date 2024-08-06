// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as opentelemetry from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
} from "@opentelemetry/semantic-conventions";
import { SeverityNumber, logs } from "@opentelemetry/api-logs";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { LoggerProvider } from "@opentelemetry/sdk-logs";

import { useAzureMonitor } from "../../src";
import { Expectation, Scenario } from "./types";

function delay<T>(t: number, value?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

const COMMON_ENVELOPE_PARAMS: any = {
  instrumentationKey:
    process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
  sampleRate: 100,
};

export class TraceBasicScenario implements Scenario {
  private _tracerProvider: NodeTracerProvider | undefined;

  prepare(): void {
    const resource = new Resource({
      "service.name": "testServiceName",
      "k8s.cluster.name": "testClusterName",
      "k8s.node.name": "testNodeName",
      "k8s.namespace.name": "testNamespaceName",
      "k8s.pod.name": "testPodName",
    });
    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
      },
      resource: resource,
    });
    this._tracerProvider = (
      opentelemetry.trace.getTracerProvider() as opentelemetry.ProxyTracerProvider
    ).getDelegate() as NodeTracerProvider;
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
    let eventAttributes: any = {};
    eventAttributes["SomeAttribute"] = "Test";
    child1.addEvent("TestEvent", eventAttributes);
    child1.end(100);
    await delay(0);
    root.setStatus({ code: opentelemetry.SpanStatusCode.OK });
    root.end(600);
  }

  cleanup(): void {
    opentelemetry.trace.disable();
  }

  flush(): Promise<void> {
    if (this._tracerProvider) {
      return this._tracerProvider?.forceFlush();
    }
    return Promise.resolve();
  }

    nonExpectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Metric",
      data: {
        baseType: "MetricData",
        baseData: {
          version: 2,
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
}

export class MetricBasicScenario implements Scenario {
  prepare(): void {
    const testResource = new Resource({
      [SEMRESATTRS_SERVICE_NAME]: "my-helloworld-service",
      [SEMRESATTRS_SERVICE_NAMESPACE]: "my-namespace",
      [SEMRESATTRS_SERVICE_INSTANCE_ID]: "my-instance",
    });
    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
      },
      resource: testResource,
    });
  }

  async run(): Promise<void> {
    const meter = opentelemetry.metrics.getMeter("basic");
    let counter = meter.createCounter("testCounter");
    let counter2 = meter.createCounter("testCounter2");
    let histogram = meter.createHistogram("testHistogram");
    let attributes: any = { testAttribute: "testValue" };
    counter.add(1);
    counter.add(2);
    counter2.add(12, attributes);
    histogram.record(1);
    histogram.record(2);
    histogram.record(3);
    histogram.record(4);
    let dependencyDurationMetric = meter.createHistogram("TestDependencyDuration");

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

    let requestyDurationMetric = meter.createHistogram("TestRequestDuration");
    requestyDurationMetric.record(4567, attributes);
    await delay(0);
  }

  cleanup(): void {
    opentelemetry.metrics.disable();
  }

  flush(): Promise<void> {
    return (opentelemetry.metrics.getMeterProvider() as MeterProvider).forceFlush();
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
  prepare(): void {
    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
      },
    });
  }

  async run(): Promise<void> {
    const logger = logs.getLogger("basic");

    // emit a message record
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: "test message",
      attributes: { foo: "bar" },
    });
    // emit a exception record
    let attributes: any = [];
    attributes[SEMATTRS_EXCEPTION_TYPE] = "test exception type";
    attributes[SEMATTRS_EXCEPTION_MESSAGE] = "test exception message";
    attributes[SEMATTRS_EXCEPTION_STACKTRACE] = "test exception stack";
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: "ERROR",
      attributes: attributes,
    });
  }

  cleanup(): void {
    opentelemetry.trace.disable();
    opentelemetry.metrics.disable();
    logs.disable();
  }

  flush(): Promise<void> {
    return (logs.getLoggerProvider() as LoggerProvider).forceFlush();
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
