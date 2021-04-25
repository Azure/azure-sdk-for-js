import {
  TestTracer,
  setTracer,
  setSpan,
  SpanGraph,
  context as otContext,
  OperationTracingOptions,
  SpanGraphNode
} from "@azure/core-tracing";
import { assert } from "chai";

/**
 * A plugin that adds a few custom matchers to support tracing tests.
 *
 * Example:
 *
 * ```ts
 * import supportsTracing from "../utils/traceMatcher";
 * chai.use(supportsTracing)
 * await assert.supportsTracing(client, (client, tracingOptions) => {
 *    client.someMethod()
 * });

    async (client: CryptographyClient, tracingOptions: OperationTracingOptions) => {
          await client.encrypt(
            { algorithm: "RSA-OAEP", plaintext: stringToUint8Array("foo") },
            { tracingOptions }
          );
        },
        [
          {
            children: [],
            name: "Azure.KeyVault.Keys.CryptographyClient.encrypt"
          }
        ]
      );
 * ```
 * @param chai The chai static context
 * @param _util
 */
export default function(chai: Chai.ChaiStatic, _util: Chai.ChaiUtils) {
  chai.assert.supportsTracing = async function(
    callback: (tracingOptions: OperationTracingOptions) => any,
    children: SpanGraphNode[]
  ) {
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");
    const tracingContext = setSpan(otContext.active(), rootSpan);

    try {
      await callback({ tracingContext });
    } finally {
      rootSpan.end();
    }

    const rootSpans = tracer.getRootSpans();
    console.log(rootSpans);
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");
    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    console.log("tracer.getActiveSpans()", tracer.getActiveSpans());
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  };
  chai.Assertion.addMethod("supportsTracing", async function(callback, children) {
    return chai.assert.supportsTracing(callback, children);
  });
}

declare global {
  export namespace Chai {
    interface Assert {
      supportsTracing(
        callback: (tracingOptions: OperationTracingOptions) => any,
        children: any
      ): PromiseLike<void>;
    }
    interface Assertion {
      supportsTracing(
        callback: (tracingOptions: OperationTracingOptions) => any,
        children: any
      ): PromiseLike<void>;
    }
  }
}
