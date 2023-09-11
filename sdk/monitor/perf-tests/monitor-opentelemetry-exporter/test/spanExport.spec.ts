// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { MonitorOpenTelemetryExporterTest } from "./monitorOpenTelemetryExporter.spec";
import * as opentelemetry from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { BasicTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

type MonitorOpenTelemetryExporterTestOptions = Record<string, unknown>;

export class SpanExportTest extends MonitorOpenTelemetryExporterTest<MonitorOpenTelemetryExporterTestOptions> {
  public options: PerfOptionDictionary<MonitorOpenTelemetryExporterTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const provider = new BasicTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
      }),
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(this.client as any));
    provider.register();
    const tracer = opentelemetry.trace.getTracer("example-basic-tracer-node");

    async function main(client: AzureMonitorTraceExporter) {
      const parentSpan = tracer.startSpan("main");
      for (let i = 0; i < 10; i += 1) {
        doWork(parentSpan);
      }
      parentSpan.end();
      client.shutdown();
    }

    function doWork(parent: opentelemetry.Span) {
      const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parent);
      const span = tracer.startSpan("doWork", undefined, ctx);
      for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {}
      span.setAttribute("key", "value");
      span.addEvent("invoking doWork");
      span.end();
    }

    main(this.client).catch((error) => {
      console.error("Error running perf test:", error.message);
      process.exit(1);
    });
  }
}
