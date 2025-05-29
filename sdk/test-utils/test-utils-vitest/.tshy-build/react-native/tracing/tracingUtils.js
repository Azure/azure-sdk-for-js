// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Return all Spans for a particular trace, grouped by their
 * parent Span in a tree-like structure
 * @param traceId - The traceId to return the graph for
 */
export function getSpanGraph(traceId, instrumenter) {
    var _a, _b;
    const traceSpans = instrumenter.startedSpans.filter((span) => {
        return span.traceId === traceId;
    });
    const roots = [];
    const nodeMap = new Map();
    for (const span of traceSpans) {
        const spanId = span.spanId;
        const node = {
            name: span.name,
            children: [],
        };
        nodeMap.set(spanId, node);
        if ((_a = span.parentSpan()) === null || _a === void 0 ? void 0 : _a.spanId) {
            const parentSpan = (_b = span.parentSpan()) === null || _b === void 0 ? void 0 : _b.spanId;
            const parent = nodeMap.get(parentSpan);
            if (!parent) {
                throw new Error(`Span with name ${node.name} has an unknown parentSpan with id ${parentSpan}`);
            }
            parent.children.push(node);
        }
        else {
            roots.push(node);
        }
    }
    return {
        roots,
    };
}
export function sameArrayMembers(expected, actual) {
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
//# sourceMappingURL=tracingUtils.js.map