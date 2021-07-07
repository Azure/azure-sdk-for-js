// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Initialize a global tracer.
 * All tracing initialization should happen before your application code runs.
 *
 * Then initialize and register a trace exporter.
 * If you want to see a completed trace, you need to register an exporter to send traces to a tracing backend.
 *
 * @summary Returns a tracer from the global tracer provider and demonstrates how to enable exporting trace data to Azure Monitor.
 */

import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider } from "@opentelemetry/node";
import { BatchSpanProcessor } from "@opentelemetry/tracing";
import * as azureSdkTracing from "@azure/core-tracing";

const provider = new NodeTracerProvider();

const azureExporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<connection string>"
});

provider.addSpanProcessor(
  new BatchSpanProcessor(azureExporter, {
    scheduledDelayMillis: 5000, // 5 seconds
    maxExportBatchSize: 1000 // 1000 spans
  })
);

provider.register();

const tracer = provider.getTracer("example tracer");

azureSdkTracing.setTracer(tracer);

export default tracer;
