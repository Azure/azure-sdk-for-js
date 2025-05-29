"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSupportTracing = toSupportTracing;
const azureTraceMatcher_js_1 = require("./tracing/azureTraceMatcher.js");
/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
async function toSupportTracing(callback, expectedSpanNames, options, thisArg) {
    const matcherName = "toSupportTracing";
    const { pass, message, actual, expected } = await (0, azureTraceMatcher_js_1.supportsTracing)(callback, expectedSpanNames, options, thisArg);
    const { matcherHint, printReceived, printExpected } = this.utils;
    return {
        pass: pass,
        message: () => pass
            ? matcherHint(matcherName) +
                "\n\n" +
                message +
                `Expected ${printReceived(actual)} to equal ${printExpected(expected)}.`
            : matcherHint(matcherName) +
                "\n\n" +
                `Expected spans to be generated: ${printExpected(expectedSpanNames)}`,
    };
}
//# sourceMappingURL=azureMatchers.js.map