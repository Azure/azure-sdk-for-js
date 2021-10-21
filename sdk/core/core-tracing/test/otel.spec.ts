import { useTracer } from "../src";
import { OpenTelemetryTracer } from "../src/otelTracer";
import * as node from "@opentelemetry/node";

describe("Tracer", () => {
  it("works...", async () => {
    const tracerProvider = new node.NodeTracerProvider();
    tracerProvider.addSpanProcessor(
      new tracing.SimpleSpanProcessor(new tracing.ConsoleSpanExporter())
    );
    tracerProvider.register();
    const tracer = new OpenTelemetryTracer();
    useTracer(tracer);
  });
});
