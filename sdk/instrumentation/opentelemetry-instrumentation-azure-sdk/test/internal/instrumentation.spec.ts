import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { TestClient, tracingClientAttributes } from "./testClient";
import { OpenTelemetryInstrumenter } from "../../src/instrumenter";
import { useInstrumenter } from "@azure/core-tracing";
import { assert } from "chai";

const provider = new NodeTracerProvider();
const inMemoryExporter = new InMemorySpanExporter();
provider.addSpanProcessor(new SimpleSpanProcessor(inMemoryExporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();
useInstrumenter(new OpenTelemetryInstrumenter());

describe.only("instrumentation", () => {
  describe("with a configured client", () => {
    it("works when using withSpan", async () => {
      await new TestClient().outer();
      const spans = inMemoryExporter.getFinishedSpans();
      // count of spans
      // happy path
      // error path
      // withContext, withSpan
      // with links
      console.log(spans);
      assert.lengthOf(spans, 3);
      const [coreRestPipeline, inner, outer] = spans;

      // Check parenting chain
      assert.equal(coreRestPipeline.parentSpanId, inner.spanContext().spanId);
      assert.equal(inner.parentSpanId, outer.spanContext().spanId);
      assert.notExists(outer.parentSpanId);

      // Check default span kind
      assert.equal(outer.kind, SpanKind.INTERNAL);

      // Check specified span kind
      assert.equal(inner.kind, SpanKind.CLIENT);

      // Check status
      assert.deepEqual(coreRestPipeline.status, { code: SpanStatusCode.OK });
      assert.deepEqual(inner.status, { code: SpanStatusCode.OK });
      assert.deepEqual(outer.status, { code: SpanStatusCode.OK });

      // Check instrumentationLibrary
      assert.deepEqual(outer.instrumentationLibrary, {
        name: tracingClientAttributes.packageName,
        version: tracingClientAttributes.packageVersion,
      });

      // Check attributes on all spans
      assert.equal(coreRestPipeline.attributes["az.namespace"], tracingClientAttributes.namespace);
      assert.equal(inner.attributes["az.namespace"], tracingClientAttributes.namespace);
      assert.equal(outer.attributes["az.namespace"], tracingClientAttributes.namespace);
    });
  });
});
