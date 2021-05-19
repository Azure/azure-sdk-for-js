// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider } from "@opentelemetry/node";
import { BatchSpanProcessor } from "@opentelemetry/tracing";
import { TracerProvider } from "@opentelemetry/api";
import * as dotenv from "dotenv";
import { env } from "@azure/test-utils-recorder";

dotenv.config();

export function runWithTelemetry(fn: (provider: TracerProvider) => void): void {
  // (this code more or less taken verbatim from monitor-opentelemetry-exporter's readme)
  const provider = new NodeTracerProvider({
    // plugins: {
    //   https: {
    //     // Ignore Application Insights Ingestion Server
    //     ignoreOutgoingUrls: [new RegExp(/dc.services.visualstudio.com/i)]
    //   }
    // }
  });
  provider.register();

  // Create an exporter instance
  const exporter = new AzureMonitorTraceExporter({
    connectionString: env.APPLICATIONINSIGHTS_CONNECTION_STRING
  });

  const batchSpanProcessor = new BatchSpanProcessor(exporter, {
    exportTimeoutMillis: 15000,
    maxQueueSize: 1000
  });

  // Add the exporter to the provider
  // TODO: there is an API incompatiblity here.
  provider.addSpanProcessor(batchSpanProcessor as any);

  fn(provider);

  provider.shutdown();
}
