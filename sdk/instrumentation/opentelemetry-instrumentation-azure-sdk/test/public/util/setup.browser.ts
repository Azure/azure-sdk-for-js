import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
  BasicTracerProvider,
} from "@opentelemetry/sdk-trace-base";
import { useInstrumenter } from "@azure/core-tracing";
import { OpenTelemetryInstrumenter } from "../../../src/instrumenter";

export const inMemoryExporter = new InMemorySpanExporter();
const provider = new BasicTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));
provider.register();
useInstrumenter(new OpenTelemetryInstrumenter());
