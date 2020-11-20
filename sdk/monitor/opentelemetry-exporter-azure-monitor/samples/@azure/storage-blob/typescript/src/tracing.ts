import { AzureMonitorTraceExporter } from "@microsoft/opentelemetry-exporter-azure-monitor";
import { NodeTracerProvider } from "@opentelemetry/node";
import { BatchSpanProcessor } from "@opentelemetry/tracing";
import * as azureSdkTracing from "@azure/core-tracing";

const provider = new NodeTracerProvider();

const azureExporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<connection string>"
});

provider.addSpanProcessor(
  new BatchSpanProcessor(azureExporter, {
    bufferSize: 1000, // 1000 spans
    bufferTimeout: 5000 // 5 seconds
  })
);

provider.register();

const tracer = provider.getTracer("example tracer");

azureSdkTracing.setTracer(tracer);

export default tracer;
