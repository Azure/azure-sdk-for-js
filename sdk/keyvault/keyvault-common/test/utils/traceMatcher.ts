import {
  TestTracer,
  setTracer,
  setSpan,
  context as otContext,
  OperationTracingOptions
} from "@azure/core-tracing";
import { assert } from "chai";

/**
 * An interface describing options for tracing tests
 */
export interface SupportsTracingOptions {
  /**
   * When used, limits the root spans we test to just those starting with the prefix.
   */
  prefix?: string;
}

/**
 * A plugin that adds a few custom matchers to support tracing tests.
 *
 * Example:
 *
 * ```ts
 * import supportsTracing from "../utils/traceMatcher";
 * chai.use(supportsTracing)
 *
 * await assert.supportsTracing((tracingOptions) => subject.someMethod(params, { tracingOptions }));
 * ```
 * @param chai - The Chai static context
 */
export default function(chai: Chai.ChaiStatic) {
  chai.assert.supportsTracing = async function(
    callback: (tracingOptions: OperationTracingOptions) => Promise<void>,
    children: string[],
    options: SupportsTracingOptions = {}
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

    // Ensure spans are parented correctly
    let rootSpans = tracer.getRootSpans();
    if (options.prefix) {
      rootSpans = rootSpans.filter(
        (span) => span.name.startsWith(options.prefix!) || span.name === "root"
      );
    }
    assert.equal(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(
      rootSpan,
      rootSpans.find((span) => span.name === "root"),
      "The root span should match what was passed in."
    );

    // Ensure top-level children are created correctly.
    // Testing the entire tree structure can be tricky as other packages might create their own spans.
    const spanGraph = tracer.getSpanGraph(rootSpan.context().traceId);
    const directChildren = spanGraph.roots[0].children.map((child) => child.name);
    assert.sameMembers(directChildren, children);

    // Ensure all spans are properly closed
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  };

  chai.Assertion.addMethod("supportsTracing", async function(callback, children, options) {
    return chai.assert.supportsTracing(callback, children, options);
  });
}

declare global {
  export namespace Chai {
    interface Assert {
      supportsTracing(
        callback: (tracingOptions: OperationTracingOptions) => any,
        children: string[],
        options?: SupportsTracingOptions
      ): PromiseLike<void>;
    }
    interface Assertion {
      supportsTracing(
        callback: (tracingOptions: OperationTracingOptions) => any,
        children: string[],
        options?: SupportsTracingOptions
      ): PromiseLike<void>;
    }
  }
}
