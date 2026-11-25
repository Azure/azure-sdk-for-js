// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Route logs, spans, span events, and counter measurements to two Application Insights resources.
 */
import "dotenv/config";
import {
  AzureMonitorLogExporter,
  AzureMonitorMetricExporter,
  AzureMonitorTraceExporter,
} from "@azure/monitor-opentelemetry-exporter";
import { SpanKind } from "@opentelemetry/api";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { BatchSpanProcessor, TracerProvider } from "@opentelemetry/sdk-trace";

export async function main(): Promise<void> {
  process.env.APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES = "multi_endpoint_routing";
  const destinations = [1, 2].map((n) => {
    const key = process.env[`ROUTING_KEY_${n}`];
    const endpoint = process.env[`ROUTING_ENDPOINT_${n}`];
    if (!key || !endpoint) {
      throw new Error(
        `Set ROUTING_KEY_${n} and ROUTING_ENDPOINT_${n} from resource ${n}'s connection string.`,
      );
    }
    return {
      "microsoft.instrumentation_key": key,
      "microsoft.ingestion_endpoint": endpoint,
      "microsoft.multi_endpoint_cloud_role": `orders-${n}`,
    };
  });

  const logs = new LoggerProvider({
    processors: [new BatchLogRecordProcessor({ exporter: new AzureMonitorLogExporter() })],
  });
  const traces = new TracerProvider({
    spanProcessors: [new BatchSpanProcessor({ exporter: new AzureMonitorTraceExporter() })],
  });
  const metrics = new MeterProvider({
    readers: [new PeriodicExportingMetricReader({ exporter: new AzureMonitorMetricExporter() })],
  });
  try {
    const logger = logs.getLogger("orders");
    const tracer = traces.getTracer("orders");
    const orders = metrics.getMeter("orders").createCounter("orders.completed");
    for (const attributes of destinations) {
      const span = tracer.startSpan("checkout", { kind: SpanKind.SERVER, attributes });
      span.addEvent("payment accepted");
      logger.emit({ body: "Order completed", attributes });
      orders.add(1, attributes);
      span.end();
    }
    await Promise.all([logs.forceFlush(), traces.forceFlush(), metrics.forceFlush()]);
  } finally {
    await Promise.all([logs.shutdown(), traces.shutdown(), metrics.shutdown()]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
