import { OperationTracingOptions, useInstrumenter } from "@azure/core-tracing";
import { assert } from "chai";
import { TestInstrumenter } from "../../src";
import { SpanGraph, SpanGraphNode } from "../../src/tracing/spanGraphModel";
// this is the plugin used in the test file
function chaiAzureTrace(chai: Chai.ChaiStatic, _utils: Chai.ChaiUtils) {
  // expect(() => {}).to.supportsTracing() syntax
  chai.Assertion.addMethod("supportsTracing", function() {
    this._obj.call(undefined);
  });
  // assert.supportsTracing(() => {}) syntax
  chai.assert.supportsTracing = supportsTracing;
}

// Implementation for supportsTracing Plugin
async function supportsTracing<
  Options extends { tracingOptions?: OperationTracingOptions },
  Callback extends (options: Options) => unknown
>(callback: Callback, expectedSpanNames: string[], options?: Options) {
  const instrumenter = new TestInstrumenter();
  useInstrumenter(instrumenter);
  const { span: rootSpan, tracingContext } = instrumenter.startSpan("root");

  const newOptions = {
    ...options,
    tracingOptions: {
      tracingContext: tracingContext
    }
  } as Options;
  await callback.call(undefined, newOptions);
  console.log(callback.name);
  // TODO: this expectation should be: assert only 1 _root_ span
  const spanGraph = getSpanGraph(rootSpan.spanContext.traceId, instrumenter);
  console.log(JSON.stringify(spanGraph, null, 2));
  assert.equal(spanGraph.roots.length, 1, "There should be just one root span");
  assert.equal(spanGraph.roots[0].name, "root");
  assert.strictEqual(
    rootSpan,
    instrumenter.startedSpans[0],
    "The root span should match what was passed in."
  );

  const directChildren = spanGraph.roots[0].children.map((child) => child.name);
  assert.sameMembers(Array.from(new Set(directChildren)), expectedSpanNames);
  // TODO:  All spans are closed??
}

/**
 * Return all Spans for a particular trace, grouped by their
 * parent Span in a tree-like structure
 * @param traceId - The traceId to return the graph for
 */
function getSpanGraph(traceId: string, instrumenter: TestInstrumenter): SpanGraph {
  const traceSpans = instrumenter.startedSpans.filter((span) => {
    return span.spanContext.traceId === traceId;
  });

  const roots: SpanGraphNode[] = [];
  const nodeMap: Map<string, SpanGraphNode> = new Map<string, SpanGraphNode>();

  for (const span of traceSpans) {
    const spanId = span.spanContext.spanId;
    const node: SpanGraphNode = {
      name: span.name,
      children: []
    };
    nodeMap.set(spanId, node);

    if (span.parentSpan()?.spanContext.spanId) {
      const parentSpan = span.parentSpan()?.spanContext.spanId;
      const parent = nodeMap.get(parentSpan!);
      if (!parent) {
        throw new Error(
          `Span with name ${node.name} has an unknown parentSpan with id ${parentSpan}`
        );
      }
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return {
    roots
  };
}

// types
declare global {
  export namespace Chai {
    interface Assertion {
      supportsTracing(): Promise<void>;
    }
    //Options extends { tracingOptions?: OperationTracingOptions },
    // Callback extends (options: Options) => unknown
    interface Assert {
      supportsTracing<
        Options extends { tracingOptions?: OperationTracingOptions },
        Callback extends (options: Options) => unknown
      >(
        callback: Callback,
        expectedSpanNames: string[],
        options?: Options
      ): Promise<void>;
    }
  }
}

export { chaiAzureTrace };
