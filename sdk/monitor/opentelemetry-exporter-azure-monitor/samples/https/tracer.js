"use strict";

const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/node");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");
const { AzureMonitorTraceExporter } = require("@azure/opentelemetry-exporter-azure-monitor");
const { ConsoleLogger, LogLevel } = require("@opentelemetry/core");

module.exports = () => {
  const provider = new NodeTracerProvider({
    logger: new ConsoleLogger(LogLevel.DEBUG),
    logLevel: LogLevel.DEBUG,
    plugins: {
      http: {
        enabled: true,
        path: "@opentelemetry/plugin-http"
      },
      https: {
        enabled: true,
        path: "@opentelemetry/plugin-https",
        // Ignore Application Insights Ingestion Server
        ignoreOutgoingUrls: [new RegExp(/dc.services.visualstudio.com/i)]
      }
    }
  });

  const exporter = new AzureMonitorTraceExporter({
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<connection string>"
  });

  provider.addSpanProcessor(
    new BatchSpanProcessor(exporter, {
      bufferTimeout: 1000,
      bufferSize: 1000
    })
  );

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  return opentelemetry.trace.getTracer("https-example");
};
