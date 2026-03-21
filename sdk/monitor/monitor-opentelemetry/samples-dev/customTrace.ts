// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to generate custom traces that will be sent to Azure Monitor.
 */

import { useAzureMonitor, shutdownAzureMonitor } from "@azure/monitor-opentelemetry";
import { context, trace, type Span } from "@opentelemetry/api";
import "dotenv/config";

function doWork(parent: Span): void {
  const ctx = trace.setSpan(context.active(), parent);
  const span = trace.getTracer("testTracer").startSpan("doWork", undefined, ctx);

  try {
    // Simulate some random work
    for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
      // empty
    }
    span.setAttribute("key", "value");
    span.addEvent("invoking doWork");
  } finally {
    span.end();
  }
}

async function main(): Promise<void> {
  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
  };

  useAzureMonitor(options);

  const tracer = trace.getTracer("testTracer");
  const parentSpan = tracer.startSpan("main");

  try {
    for (let i = 0; i < 10; i += 1) {
      doWork(parentSpan);
    }
  } finally {
    parentSpan.end();
  }

  // Wait for traces to be sent
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await shutdownAzureMonitor();

  console.log("Custom traces sent to Azure Monitor");
}

main().catch(console.error);
