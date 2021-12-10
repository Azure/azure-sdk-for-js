import { OperationTracingOptions, useInstrumenter } from "@azure/core-tracing";
import { assert } from "chai";
import { SpanGraph, SpanGraphNode, TestInstrumenter } from "../../src";

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
  // TODO: pass in callback options and spanOptions
  await callback.call(undefined, newOptions);
  console.log(callback.name);
  assert.equal(instrumenter.startedSpans.length, 1);
  assert.equal(instrumenter.startedSpans[0].name, "root");
  assert.strictEqual(
    rootSpan,
    instrumenter.startedSpans[0],
    "The root span should match what was passed in."
  );
  const spanGraph = getSpanGraph(rootSpan.spanContext.traceId, instrumenter);
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

    interface Assert {
      supportsTracing<Callback extends (...args: unknown[]) => unknown>(
        callback: Callback
      ): Promise<void>;
    }
  }
}

export { chaiAzureTrace };
