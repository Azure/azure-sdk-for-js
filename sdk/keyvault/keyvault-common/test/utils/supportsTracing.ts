import { OperationTracingOptions } from "@azure/core-http";
import { setTracer, setSpan, tracingContext } from "@azure/test-utils";
import { assert } from "chai";

const prefix = "Azure.KeyVault";

export async function supportsTracing(
  callback: (tracingOptions: OperationTracingOptions) => Promise<unknown>,
  children: string[]
): Promise<void> {
  const tracer = setTracer();
  const rootSpan = tracer.startSpan("root");

  try {
    await callback({ tracingContext: setSpan(tracingContext.active(), rootSpan) });
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
}
