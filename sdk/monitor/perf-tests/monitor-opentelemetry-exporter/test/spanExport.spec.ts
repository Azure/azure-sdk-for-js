// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { MonitorOpenTelemetryExporterTest } from "./monitorOpenTelemetryExporter.spec";
import * as opentelemetry from "@opentelemetry/api";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

type MonitorOpenTelemetryExporterTestOptions = Record<string, unknown>;

export class SpanExportTest extends MonitorOpenTelemetryExporterTest<MonitorOpenTelemetryExporterTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryExporterTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    async function main(client: AzureMonitorTraceExporter, tracer: opentelemetry.Tracer) {
      const parentSpan = tracer.startSpan("main");
      for (let i = 0; i < 1; i += 1) {
        doWork(parentSpan, tracer);
      }
      parentSpan.end();
      client.shutdown();
    }

    function doWork(parent: opentelemetry.Span, tracer: opentelemetry.Tracer) {
      const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parent);
      const span = tracer.startSpan("doWork", undefined, ctx);
      for (let i = 0; i <= 1; i += 1) {}
      span.setAttribute("key", "value");
      span.addEvent("invoking doWork");
      span.end();
    }

    main(this.client, this.tracer).catch((error) => {
      console.error("Error running perf test:", error.message);
      process.exit(1);
    });
  }
}
