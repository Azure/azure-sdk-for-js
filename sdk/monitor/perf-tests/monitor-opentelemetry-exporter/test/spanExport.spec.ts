// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { MonitorOpenTelemetryExporterTest } from "./monitorOpenTelemetryExporter.spec";
import { trace, Span, Tracer, context } from "@opentelemetry/api";

type MonitorOpenTelemetryExporterTestOptions = Record<string, unknown>;

export class SpanExportTest extends MonitorOpenTelemetryExporterTest<MonitorOpenTelemetryExporterTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryExporterTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    async function main() {
      const tracer = trace.getTracer("testTracer");
      const parentSpan = tracer.startSpan("main");
      for (let i = 0; i < 1; i += 1) {
        doWork(parentSpan, tracer);
      }
      parentSpan.end();
    }

    function doWork(parent: Span, tracer: Tracer) {
      const ctx = trace.setSpan(context.active(), parent);
      const span = tracer.startSpan("doWork", undefined, ctx);
      for (let i = 0; i <= 1; i += 1) { }
      span.setAttribute("key", "value");
      span.addEvent("invoking doWork");
      span.end();
    }

    main().catch((error) => {
      console.error("Error running perf test:", error.message);
      process.exit(1);
    });
  }
}
