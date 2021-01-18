require('dotenv').config();

const { BatchSpanProcessor } = require("@opentelemetry/tracing");
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");
const { NodeTracerProvider } = require("@opentelemetry/node");
const azureSdkTracing = require("@azure/core-tracing");

const MONITOR_CONNECTION_STRING = process.env.MONITOR_CONNECTION_STRING || "";
const provider = new NodeTracerProvider({
  plugins: {
    http: {
      enabled: true,
      path: "@opentelemetry/plugin-http",
      requestHook: (span, request) => {
        span.setAttribute("request", request);
      }
    }
  }
});
const azExporter = new AzureMonitorTraceExporter({
  connectionString: MONITOR_CONNECTION_STRING
});

provider.addSpanProcessor(new BatchSpanProcessor(azExporter, {
  bufferSize: 1000, // 1000 spans
  bufferTimeout: 5000 // 5 seconds
}));

provider.register();

const tracer = provider.getTracer();

azureSdkTracing.setTracer(tracer);

module.exports = tracer;