// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to enable the OTLP exporter alongside Azure Monitor to send telemetry to two locations.
 */

const { useAzureMonitor, shutdownAzureMonitor } = require("@azure/monitor-opentelemetry");
const { trace } = require("@opentelemetry/api");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
require("dotenv/config");

async function main() {
  const otlpExporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
  });

  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
    spanProcessors: [new BatchSpanProcessor(otlpExporter)],
  };

  useAzureMonitor(options);

  // Generate a sample span to demonstrate dual export
  const tracer = trace.getTracer("otlpSampleTracer");
  const span = tracer.startSpan("sample-operation");
  span.setAttribute("sample.key", "sample-value");
  span.end();

  console.log("Azure Monitor configured with dual export:");
  console.log("  Azure Monitor: Enabled");
  console.log("  OTLP Exporter: Enabled (http://localhost:4318/v1/traces)");

  await shutdownAzureMonitor();
}

main().catch(console.error);
