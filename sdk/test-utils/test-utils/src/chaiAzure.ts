// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { OperationTracingOptions } from "@azure/core-tracing";
import { supportsTracing } from "./tracing/chaiAzureTrace";

/**
 * Augments Chai with support for Azure specific assertions.
 *
 * Sample usage:
 *
 * ```ts
 * import chai from "chai";
 * import { chaiAzure } from "@azure/test-utils";
 * chai.use(chaiAzure);
 *
 * it("supportsTracing", async () => {
 *   await assert.supportsTracing((updatedOptions) => myClient.doSomething(updatedOptions), ["myClient.doSomething"]);
 * });
 * ```
 * @param chai - The Chai instance
 */
export function chaiAzure(chai: Chai.ChaiStatic): void {
  // expect(() => {}).to.supportsTracing() syntax
  chai.Assertion.addMethod("supportTracing", function <
    T
  >(this: Chai.AssertionStatic, expectedSpanNames: string[], options?: T) {
    return assert.supportsTracing(this._obj, expectedSpanNames, options, this._obj);
  });

  // assert.supportsTracing(() => {}) syntax
  chai.assert.supportsTracing = supportsTracing;
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  export namespace Chai {
    interface Assertion {
      supportTracing<T>(expectedSpanNames: string[], options?: T): Promise<void>;
    }
    interface Assert {
      supportsTracing<
        Options extends { tracingOptions?: OperationTracingOptions },
        Callback extends (options: Options) => Promise<unknown>
      >(
        callback: Callback,
        expectedSpanNames: string[],
        options?: Options,
        thisArg?: ThisParameterType<Callback>
      ): Promise<void>;
    }
  }
}
