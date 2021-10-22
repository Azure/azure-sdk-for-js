import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

provider.register();
registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()]
});
import { createTracingClient, TracingClient, useTracer } from "../src";
import { OpenTelemetryTracer } from "../src/otelTracer";
import * as https from "https";

describe("Tracer", () => {
  it("works...", async () => {
    const tracer = new OpenTelemetryTracer();
    useTracer(tracer);
    const client = new MockClient();
    await client.makeRequest();
  });
});

class MockClient {
  tracingClient: TracingClient;
  constructor() {
    this.tracingClient = createTracingClient({ namespace: "mock for testing" });
  }

  async makeRequest() {
    return await this.tracingClient.withTrace("outer", (updatedOptions, span) => {
      span.setAttribute("outer", "outer");
      return this.tracingClient.withTrace("inner", (updatedOptions, span) => {
        return new Promise((resolve, reject) => {
          const request = https.get("https://www.bing.com", (res) => {
            const data: any = [];
            if (res?.statusCode! < 200 || res?.statusCode! > 299) {
              return reject(new Error(`status code: ${res.statusCode}`));
            }
            res.on("data", (chunk) => {
              data.push(chunk);
            });
            res.on("end", () => resolve(Buffer.concat(data).toString()));
            span.setAttribute("res status", res.statusCode);
          });
          request.on("error", reject);
          request.end();
        });
      });
    });
  }
}
