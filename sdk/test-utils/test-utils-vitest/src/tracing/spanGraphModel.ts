// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Simple representation of a Span that only has name and child relationships.
 * Children should be arranged in the order they were created.
 */
export interface SpanGraphNode {
  /**
   * The Span name
   */
  name: string;
  /**
   * All child Spans of this Span
   */
  children: SpanGraphNode[];
}

/**
 * Contains all the spans for a particular TraceID
 * starting at unparented roots
 */
export interface SpanGraph {
  /**
   * All Spans without a parentSpanId
   */
  roots: SpanGraphNode[];
}
