// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as opentelemetry from "@opentelemetry/api";
import { BasicTracerProvider, SimpleSpanProcessor } from "@opentelemetry/tracing";
import { AzureMonitorTraceExporter } from "../../../src";
import { Expectation, Scenario } from "./types";
import { promisify } from "util";
import { Envelope, RemoteDependencyData, RequestData } from "../../../src/Declarations/Contracts";
import { msToTimeSpan } from "../../../src/utils/breezeUtils";
import { CanonicalCode } from "@opentelemetry/api";

const sleep = promisify(setTimeout);

const COMMON_ENVELOPE_PARAMS: Partial<Envelope> = {
  iKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "ikey",
  sampleRate: 100
};

export class BasicScenario implements Scenario {
  prepare(): void {
    const provider = new BasicTracerProvider();
    const exporter = new AzureMonitorTraceExporter({
      instrumentationKey: COMMON_ENVELOPE_PARAMS.iKey
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    opentelemetry.trace.setGlobalTracerProvider(provider);
  }

  async run(): Promise<void> {
    const tracer = opentelemetry.trace.getTracer("basic");
    const root = tracer.startSpan(`${this.constructor.name}.Root`, {
      startTime: 0,
      kind: opentelemetry.SpanKind.SERVER,
      attributes: {
        foo: "bar"
      }
    });
    await tracer.withSpan(root, async () => {
      const child1 = tracer.startSpan(`${this.constructor.name}.Child.1`, {
        startTime: 0,
        parent: root,
        kind: opentelemetry.SpanKind.CLIENT,
        attributes: {
          numbers: 123
        }
      });

      const child2 = tracer.startSpan(`${this.constructor.name}.Child.2`, {
        startTime: 0,
        parent: root,
        kind: opentelemetry.SpanKind.CLIENT,
        attributes: {
          numbers: 1234
        }
      });

      await tracer.withSpan(child1, async () => {
        await sleep(0);
        child1.setStatus({ code: CanonicalCode.OK });
        child1.end(100);
      });

      child2.setStatus({ code: CanonicalCode.OK });
      child2.end(100);

      await sleep(0);
      root.setStatus({ code: CanonicalCode.OK });
      root.end(600);
    });
  }

  cleanup(): void {
    opentelemetry.trace.disable();
  }

  expectation: Expectation[] = [
    {
      ...COMMON_ENVELOPE_PARAMS,
      data: {
        baseType: "RequestData",
        baseData: {
          name: "BasicScenario.Root",
          duration: msToTimeSpan(600),
          responseCode: "0",
          success: true,
          properties: {
            foo: "bar"
          }
        } as Partial<RequestData>,
        properties: undefined
      },
      children: [
        {
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "RemoteDependencyData",
            baseData: {
              name: "BasicScenario.Child.1",
              duration: msToTimeSpan(100),
              success: true,
              resultCode: "0",
              properties: {
                numbers: 123
              }
            } as Partial<RemoteDependencyData>,
            properties: undefined
          },
          children: []
        },
        {
          ...COMMON_ENVELOPE_PARAMS,
          data: {
            baseType: "RemoteDependencyData",
            baseData: {
              name: "BasicScenario.Child.2",
              duration: msToTimeSpan(100),
              success: true,
              resultCode: "0",
              properties: {
                numbers: 1234
              }
            } as Partial<RemoteDependencyData>,
            properties: undefined
          },
          children: []
        }
      ]
    }
  ];
}
