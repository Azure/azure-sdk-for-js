"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsTracing = supportsTracing;
const core_tracing_1 = require("@azure/core-tracing");
const mockInstrumenter_js_1 = require("./mockInstrumenter.js");
const tracingUtils_js_1 = require("./tracingUtils.js");
const vitest_1 = require("vitest");
const instrumenter = new mockInstrumenter_js_1.MockInstrumenter();
/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
async function supportsTracing(callback, expectedSpanNames, options, thisArg) {
    (0, core_tracing_1.useInstrumenter)(instrumenter);
    instrumenter.reset();
    try {
        const startSpanOptions = Object.assign({ packageName: "test" }, options);
        const { span: rootSpan, tracingContext } = instrumenter.startSpan("root", startSpanOptions);
        const newOptions = Object.assign(Object.assign({}, options), { tracingOptions: {
                tracingContext: tracingContext,
            } });
        await callback.call(thisArg, newOptions);
        rootSpan.end();
        const spanGraph = (0, tracingUtils_js_1.getSpanGraph)(rootSpan.traceId, instrumenter);
        vitest_1.assert.equal(spanGraph.roots.length, 1, "There should be just one root span");
        vitest_1.assert.equal(spanGraph.roots[0].name, "root");
        vitest_1.assert.strictEqual(rootSpan, instrumenter.startedSpans[0], "The root span should match what was passed in.");
        const directChildren = spanGraph.roots[0].children.map((child) => child.name);
        vitest_1.assert.sameMembers(Array.from(new Set(directChildren)), expectedSpanNames);
        rootSpan.end();
        const openSpans = instrumenter.startedSpans.filter((s) => !s.endCalled);
        vitest_1.assert.equal(openSpans.length, 0, `All spans should have been closed, but found ${openSpans.map((s) => s.name)} open spans.`);
    }
    finally {
        // By resetting the instrumenter to undefined, we force the next call to instantiate the
        // no-op instrumenter and prevent test pollution.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0, core_tracing_1.useInstrumenter)(undefined);
    }
}
//# sourceMappingURL=azureTraceAssert.js.map