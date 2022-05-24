// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as opentelemetry from "@opentelemetry/api";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorTraceExporter } from "../../src";
import { Expectation, Scenario } from "./types";
import { msToTimeSpan } from "../../src/utils/breezeUtils";
import { SpanStatusCode } from "@opentelemetry/api";
import { TelemetryItem as Envelope } from "../../src/generated";
import { FlushSpanProcessor } from "./flushSpanProcessor";

function delay<T>(t: number, value?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

const COMMON_ENVELOPE_PARAMS: Partial<Envelope> = {
  instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "ikey",
  sampleRate: 100,
};

const exporter = new AzureMonitorTraceExporter({
  connectionString: `instrumentationkey=${COMMON_ENVELOPE_PARAMS.instrumentationKey}`,
});
const processor = new FlushSpanProcessor(exporter);

export class BasicScenario implements Scenario {
  prepare(): void {
    const provider = new BasicTracerProvider();
    provider.addSpanProcessor(processor);
    provider.register();
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
      ctx
    );
    const child2 = tracer.startSpan(
      `${this.constructor.name}.Child.2`,
      {
        startTime: 0,
        kind: opentelemetry.SpanKind.CLIENT,
        attributes: {
          numbers: "1234",
        },
      },
      ctx
    );
    child1.setStatus({ code: SpanStatusCode.OK });
    child2.recordException({
      code: "TestExceptionCode",
      message: "TestExceptionMessage",
      name: "TestExceptionName",
      stack: "TestExceptionStack",
    });
    let eventAttributes: any = {};
    eventAttributes["SomeAttribute"] = "Test";
    child2.addEvent("TestEvent", eventAttributes);
    child1.end(100);
    await delay(0);
    child2.setStatus({ code: SpanStatusCode.OK });
    child2.end(100);
    root.setStatus({ code: SpanStatusCode.OK });
    root.end(600);
  }

  cleanup(): void {
    opentelemetry.trace.disable();
  }

  flush(): Promise<void> {
    return processor.forceFlush();
  }

  expectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      name: "Microsoft.ApplicationInsights.Request",
      data: {
        baseType: "RequestData",
        baseData: {
          version: 2,
          name: "BasicScenario.Root",
          duration: msToTimeSpan(600),
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
              name: "BasicScenario.Child.1",
              duration: msToTimeSpan(100),
              success: true,
              resultCode: "0",
              properties: {
                numbers: "123",
              },
            } as any,
          },
          children: [],
        },
        {
          name: "Microsoft.ApplicationInsights.RemoteDependency",
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "RemoteDependencyData",
            baseData: {
              version: 2,
              name: "BasicScenario.Child.2",
              duration: msToTimeSpan(100),
              success: true,
              resultCode: "0",
              properties: {
                numbers: "1234",
              },
            } as any,
          },
          children: [],
        },
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
