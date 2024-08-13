// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanGraph, SpanGraphNode } from "./spanGraphModel.js";
import { MockInstrumenter } from "./mockInstrumenter.js";

/**
 * Return all Spans for a particular trace, grouped by their
 * parent Span in a tree-like structure
 * @param traceId - The traceId to return the graph for
 */
// eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
export function getSpanGraph(traceId: string, instrumenter: MockInstrumenter): SpanGraph {
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
          `Span with name ${node.name} has an unknown parentSpan with id ${parentSpan}`,
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

export function sameArrayMembers<T>(expected: T[], actual: T[]): boolean {
  expected = expected.sort();
  actual = actual.sort();
  if (expected.length !== actual.length) {
    return false;
  }

  for (const item of expected) {
    if (!actual.includes(item)) {
      return false;
    }
  }

  return true;
}
