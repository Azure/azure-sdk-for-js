// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationTracingOptions } from "@azure/core-tracing";
import type { AsyncExpectationResult, MatcherState } from "@vitest/expect" with {
  "resolution-mode": "import",
};
import { supportsTracing } from "./tracing/azureTraceMatcher.js";

/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
export async function toSupportTracing<
  ThisState extends MatcherState,
  Options extends { tracingOptions?: OperationTracingOptions },
  Callback extends (options: Options) => Promise<unknown>,
>(
  this: ThisState,
  callback: Callback,
  expectedSpanNames: string[],
  options?: Options,
  thisArg?: ThisParameterType<Callback>,
): AsyncExpectationResult {
  const matcherName = "toSupportTracing";
  const { pass, message, actual, expected } = await supportsTracing(
    callback,
    expectedSpanNames,
    options,
    thisArg,
  );
  const { matcherHint, printReceived, printExpected } = this.utils;

  return {
    pass: pass,
    message: () =>
      pass
        ? matcherHint(matcherName) +
          "\n\n" +
          message +
          `Expected ${printReceived(actual)} to equal ${printExpected(expected)}.`
        : matcherHint(matcherName) +
          "\n\n" +
          `Expected spans to be generated: ${printExpected(expectedSpanNames)}`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AzureMatchers<R> extends Record<string, any> {
  toSupportTracing<
    Options extends { tracingOptions?: OperationTracingOptions },
    Callback extends (options: Options) => Promise<unknown>,
  >(
    expectedSpanNames: string[],
    options?: { tracingOptions?: OperationTracingOptions },
    thisArg?: ThisParameterType<Callback>,
  ): Promise<R>;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends AzureMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining<T = any> extends AzureMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface ExpectStatic<T = any> extends AzureMatchers<T> {}
}
