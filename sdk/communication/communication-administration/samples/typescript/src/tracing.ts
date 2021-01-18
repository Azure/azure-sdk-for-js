require("dotenv").config();

import { BatchSpanProcessor } from "@opentelemetry/tracing";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider } from "@opentelemetry/node";
import * as azureSdkTracing from "@azure/core-tracing";
import { Tracer } from "@opentelemetry/api";

const MONITOR_CONNECTION_STRING = process.env.MONITOR_CONNECTION_STRING || "";
const provider = new NodeTracerProvider({
  plugins: {
    http: {
      enabled: true,
      path: "@opentelemetry/plugin-http",
      // @ts-ignore
      requestHook: (span, request) => {
        span.setAttribute("request", request);
      }
    }
  }
});
const azExporter = new AzureMonitorTraceExporter({
  connectionString: MONITOR_CONNECTION_STRING
});

provider.addSpanProcessor(
  // @ts-ignore
  new BatchSpanProcessor(azExporter, {
    bufferSize: 1000, // 1000 spans
    bufferTimeout: 5000 // 5 seconds
  })
);

provider.register();

// @ts-ignore
const tracer: Tracer = provider.getTracer("sample-tracer");
azureSdkTracing.setTracer(tracer);

export default tracer;
