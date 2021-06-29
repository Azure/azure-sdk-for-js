"use strict";

import * as opentelemetry from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/node";
import { BatchSpanProcessor } from "@opentelemetry/tracing";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { ResourceAttributes } from "@opentelemetry/semantic-conventions";
import { Resource } from "@opentelemetry/resources";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { GrpcInstrumentation } from "@opentelemetry/instrumentation-grpc";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export function tracer(serviceName: string, exampleName: string) {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [ResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  const exporter = new AzureMonitorTraceExporter({
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<connection string>"
  });

  provider.addSpanProcessor(
    new BatchSpanProcessor(exporter, {
      scheduledDelayMillis: 1000,
      maxExportBatchSize: 1000
    })
  );

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  registerInstrumentations({
    instrumentations: [
      getInstrumentation(exampleName),
    ],
  });

  return opentelemetry.trace.getTracer(exampleName);
};

function getInstrumentation(exampleName: string) {
  switch (exampleName) {
    case "https-example":
      return new HttpInstrumentation();
    case "grpc-example":
      return new GrpcInstrumentation();
    default:
      return;
  }
}
