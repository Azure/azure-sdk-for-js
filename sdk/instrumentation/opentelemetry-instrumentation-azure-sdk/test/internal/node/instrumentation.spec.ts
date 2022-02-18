import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { TestClient, tracingClientAttributes } from "../testClient";
import { assert } from "chai";
import { inMemoryExporter } from "../../public/util/setup";

describe("instrumentation", () => {
  beforeEach(() => {
    inMemoryExporter.reset();
  });

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
      assert.equal(inner.attributes["az.namespace"], tracingClientAttributes.namespace);
      assert.equal(outer.attributes["az.namespace"], tracingClientAttributes.namespace);
    });
  });
});
