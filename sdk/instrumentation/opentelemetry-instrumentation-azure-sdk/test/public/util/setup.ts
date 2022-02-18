import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { useInstrumenter } from "@azure/core-tracing";
import { OpenTelemetryInstrumenter } from "../../../src/instrumenter";
export const inMemoryExporter = new InMemorySpanExporter();
const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));
provider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
