import { SpanGraph } from "./spanGraphModel.js";
import { MockInstrumenter } from "./mockInstrumenter.js";
/**
 * Return all Spans for a particular trace, grouped by their
 * parent Span in a tree-like structure
 * @param traceId - The traceId to return the graph for
 */
export declare function getSpanGraph(traceId: string, instrumenter: MockInstrumenter): SpanGraph;
export declare function sameArrayMembers<T>(expected: T[], actual: T[]): boolean;
//# sourceMappingURL=tracingUtils.d.ts.map