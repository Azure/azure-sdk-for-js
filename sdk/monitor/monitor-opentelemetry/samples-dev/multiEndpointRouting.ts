// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Route logs, spans, span events, and counter measurements to two Application Insights resources.
 */
import "dotenv/config";
import { shutdownAzureMonitor, useAzureMonitor } from "@azure/monitor-opentelemetry";
import { logs, metrics, SpanKind, trace } from "@opentelemetry/api";

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

  useAzureMonitor({
    // Live Metrics uses a host connection string, not the per-item destinations.
    enableLiveMetrics: false,
    tracesPerSecond: 0,
    samplingRatio: 1,
  });
  try {
    const logger = logs.getLogger("orders");
    const tracer = trace.getTracer("orders");
    const orders = metrics.getMeter("orders").createCounter("orders.completed");
    for (const attributes of destinations) {
      const span = tracer.startSpan("checkout", { kind: SpanKind.SERVER, attributes });
      span.addEvent("payment accepted");
      logger.emit({ body: "Order completed", attributes });
      orders.add(1, attributes);
      span.end();
    }
  } finally {
    await shutdownAzureMonitor();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
