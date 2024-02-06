// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationTracingOptions, useInstrumenter } from "@azure/core-tracing";
import { SpanGraph, SpanGraphNode } from "./spanGraphModel";

import { MockInstrumenter } from "./mockInstrumenter";
import { MockTracingSpan } from "./mockTracingSpan";
import { assert } from "chai";

const instrumenter = new MockInstrumenter();

/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
export async function supportsTracing<
  Options extends { tracingOptions?: OperationTracingOptions },
  Callback extends (options: Options) => Promise<unknown>
>(
  callback: Callback,
  expectedSpanNames: string[],
  options?: Options,
  thisArg?: ThisParameterType<Callback>
) {
  useInstrumenter(instrumenter);
  instrumenter.reset();
  try {
    const startSpanOptions = {
      packageName: "test",
      ...options,
    };
    const { span: rootSpan, tracingContext } = instrumenter.startSpan("root", startSpanOptions);

    const newOptions = {
      ...options,
      tracingOptions: {
        tracingContext: tracingContext,
      },
    } as Options;
    await callback.call(thisArg, newOptions);
    rootSpan.end();
    const spanGraph = getSpanGraph((rootSpan as MockTracingSpan).traceId, instrumenter);
    assert.equal(spanGraph.roots.length, 1, "There should be just one root span");
    assert.equal(spanGraph.roots[0].name, "root");
    assert.strictEqual(
      rootSpan,
      instrumenter.startedSpans[0],
      "The root span should match what was passed in."
    );

    const directChildren = spanGraph.roots[0].children.map((child) => child.name);
    assert.sameMembers(Array.from(new Set(directChildren)), expectedSpanNames);
    rootSpan.end();
    const openSpans = instrumenter.startedSpans.filter((s) => !s.endCalled);
    assert.equal(
      openSpans.length,
      0,
      `All spans should have been closed, but found ${openSpans.map((s) => s.name)} open spans.`
    );
  } finally {
    // By resetting the instrumenter to undefined, we force the next call to instantiate the
    // no-op instrumenter and prevent test pollution.
    useInstrumenter(<any>undefined);
  }
}

/**
 * Return all Spans for a particular trace, grouped by their
 * parent Span in a tree-like structure
 * @param traceId - The traceId to return the graph for
 */
function getSpanGraph(traceId: string, instrumenter: MockInstrumenter): SpanGraph {
  const traceSpans = instrumenter.startedSpans.filter((span) => {
    return span.traceId === traceId;
  });

  const roots: SpanGraphNode[] = [];
  const nodeMap: Map<string, SpanGraphNode> = new Map<string, SpanGraphNode>();

  for (const span of traceSpans) {
    const spanId = span.spanId;
    const node: SpanGraphNode = {
      name: span.name,
      children: [],
    };
    nodeMap.set(spanId, node);

    if (span.parentSpan()?.spanId) {
      const parentSpan = span.parentSpan()?.spanId;
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
    roots,
  };
}
