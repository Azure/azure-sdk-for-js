// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert } from "vitest";
import { supportsTracing } from "./tracing/azureTraceAssert.js";
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
export function chaiAzure(chai) {
    // expect(() => {}).to.supportsTracing() syntax
    chai.Assertion.addMethod("supportTracing", function (expectedSpanNames, options) {
        return assert.supportsTracing(this._obj, expectedSpanNames, options, this._obj);
    });
    // assert.supportsTracing(() => {}) syntax
    chai.assert.supportsTracing = supportsTracing;
}
//# sourceMappingURL=azureAssert.js.map