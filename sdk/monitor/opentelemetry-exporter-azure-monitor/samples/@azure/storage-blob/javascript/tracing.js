import { AzureMonitorTraceExporter } from "@azure/opentelemetry-exporter-azure-monitor";
import { NodeTracerProvider } from "@opentelemetry/node";
import { BatchSpanProcessor } from "@opentelemetry/tracing";
import * as azureSdkTracing from "@azure/core-tracing";

const provider = new NodeTracerProvider();

const azureExporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "ikey"
});

provider.addSpanProcessor(
  new BatchSpanProcessor(azureExporter, {
    bufferSize: 1000, // 1000 spans
    bufferTimeout: 15000 // 15 seconds
  })
);

provider.register();

azureSdkTracing.setTracer(provider.getTracer("example tracer"));
