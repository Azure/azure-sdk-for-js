"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.chaiAzure = chaiAzure;
const vitest_1 = require("vitest");
const azureTraceAssert_js_1 = require("./tracing/azureTraceAssert.js");
/**
 * Augments Chai with support for Azure specific assertions.
 *
 * Sample usage:
 *
 * ```ts
 * import chai from "chai";
 * import { chaiAzure } from "@azure-tools/test-utils-vitest";
 * chai.use(chaiAzure);
 *
 * it("supportsTracing", async () => {
 *   await assert.supportsTracing((updatedOptions) => myClient.doSomething(updatedOptions), ["myClient.doSomething"]);
 * });
 * ```
 * @param chai - The Chai instance
 */
function chaiAzure(chai) {
    // expect(() => {}).to.supportsTracing() syntax
    chai.Assertion.addMethod("supportTracing", function (expectedSpanNames, options) {
        return vitest_1.assert.supportsTracing(this._obj, expectedSpanNames, options, this._obj);
    });
    // assert.supportsTracing(() => {}) syntax
    chai.assert.supportsTracing = azureTraceAssert_js_1.supportsTracing;
}
//# sourceMappingURL=azureAssert.js.map