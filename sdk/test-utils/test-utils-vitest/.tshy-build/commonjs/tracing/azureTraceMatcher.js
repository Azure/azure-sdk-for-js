"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsTracing = supportsTracing;
const core_tracing_1 = require("@azure/core-tracing");
const tracingUtils_js_1 = require("./tracingUtils.js");
const mockInstrumenter_js_1 = require("./mockInstrumenter.js");
const mockInstrumenter = new mockInstrumenter_js_1.MockInstrumenter();
/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
async function supportsTracing(callback, expectedSpanNames, options, thisArg) {
    (0, core_tracing_1.useInstrumenter)(mockInstrumenter);
    mockInstrumenter.reset();
    try {
        const startSpanOptions = Object.assign({ packageName: "test" }, options);
        const { span: rootSpan, tracingContext } = mockInstrumenter.startSpan("root", startSpanOptions);
        const newOptions = Object.assign(Object.assign({}, options), { tracingOptions: {
                tracingContext: tracingContext,
            } });
        await callback.call(thisArg, newOptions);
        rootSpan.end();
        const spanGraph = (0, tracingUtils_js_1.getSpanGraph)(rootSpan.traceId, mockInstrumenter);
        if (spanGraph.roots.length !== 1) {
            return {
                pass: false,
                message: "There should be just one root span",
                expected: 1,
                actual: spanGraph.roots.length,
            };
        }
        if (spanGraph.roots[0].name !== "root") {
            return {
                pass: false,
                message: "The root span should be named 'root'",
                expected: "root",
                actual: spanGraph.roots[0].name,
            };
        }
        if (rootSpan !== mockInstrumenter.startedSpans[0]) {
            return {
                pass: false,
                message: "The root span should match what was passed in.",
                expected: rootSpan,
                actual: mockInstrumenter.startedSpans[0],
            };
        }
        const directChildren = spanGraph.roots[0].children.map((child) => child.name);
        if (!(0, tracingUtils_js_1.sameArrayMembers)(Array.from(new Set(directChildren)), expectedSpanNames)) {
            return {
                pass: false,
                message: "The direct children of the root span should match the expected span names.",
                expected: expectedSpanNames,
                actual: directChildren,
            };
        }
        rootSpan.end();
        const openSpans = mockInstrumenter.startedSpans.filter((s) => !s.endCalled);
        if (openSpans.length !== 0) {
            return {
                pass: false,
                message: `All spans should have been closed, but found ${openSpans.map((s) => s.name)} open spans.`,
                expected: 0,
                actual: openSpans.length,
            };
        }
        return { pass: true };
    }
    finally {
        // By resetting the instrumenter to undefined, we force the next call to instantiate the
        // no-op instrumenter and prevent test pollution.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0, core_tracing_1.useInstrumenter)(undefined);
    }
}
//# sourceMappingURL=azureTraceMatcher.js.map