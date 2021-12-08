import { useInstrumenter } from "@azure/core-tracing";
import { assert } from "chai";
import { TestInstrumenter } from "../../src";

// this is the plugin used in the test file
function chaiAzureTrace(chai: Chai.ChaiStatic, _utils: Chai.ChaiUtils) {
  // expect(() => {}).to.supportsTracing() syntax
  chai.Assertion.addMethod("supportsTracing", function() {
    this._obj.call(undefined);
  });
  // assert.supportsTracing(() => {}) syntax
  chai.assert.supportsTracing = supportsTracing;
}

// Implementation
async function supportsTracing<Callback extends (...args: unknown[]) => unknown>(
  callback: Callback
) {
  const instrumenter = new TestInstrumenter();
  useInstrumenter(instrumenter);
  const { span: rootSpan, tracingContext } = instrumenter.startSpan("root");

  const options = {
    tracingOptions: {
      tracingContext: tracingContext
    }
  };
  // TODO: pass in callback options and spanOptions
  await callback.call(options);
  console.log(callback.name);
  assert.equal(instrumenter.startedSpans.length, 1);
  assert.equal(instrumenter.startedSpans[0].name, "root");
  assert.strictEqual(
    rootSpan,
    instrumenter.startedSpans[0],
    "The root span should match what was passed in."
  );
  // const parentTracingSpanContext = tracingContext.getValue(Symbol.for("span"));

  /**
   *   const tracer = setTracer();
  const rootSpan = tracer.startSpan("root");
  const tracingContext = setSpan(otContext.active(), rootSpan);

  try {
    await callback({ tracingContext });
  } finally {
    rootSpan.end();
  }

  // Ensure any spans created by KeyVault are parented correctly
  let rootSpans = tracer
    .getRootSpans()
    .filter((span) => span.name.startsWith(prefix) || span.name === "root");

  assert.equal(rootSpans.length, 1, "Should only have one root span.");
  assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

  // Ensure top-level children are created correctly.
  // Testing the entire tree structure can be tricky as other packages might create their own spans.
  const spanGraph = tracer.getSpanGraph(rootSpan.spanContext().traceId);
  const directChildren = spanGraph.roots[0].children.map((child) => child.name);
  // LROs might poll N times, so we'll make a unique array and compare that.
  assert.sameMembers(Array.from(new Set(directChildren)), children);

  // Ensure all spans are properly closed
  assert.equal(tracer.getActiveSpans().length, 0, "All spans should have had end called");
   */

  /**
   * All spans are closed
There is only one root span (so we should be able to get the root spans)
Expected span graph? Like, can I get all the children of a span and assert that their names are what I expect?
   */
}

// types
declare global {
  export namespace Chai {
    interface Assertion {
      supportsTracing(): Promise<void>;
    }

    interface Assert {
      supportsTracing<Callback extends (...args: unknown[]) => unknown>(
        callback: Callback
      ): Promise<void>;
    }
  }
}

export { chaiAzureTrace };
