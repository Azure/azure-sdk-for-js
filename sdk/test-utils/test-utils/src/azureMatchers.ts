// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "vitest";
import { OperationTracingOptions } from "@azure/core-tracing";
import { supportsTracing } from "./tracing/azureTraceMatcher.js";

expect.extend({
  toSupportTracing: async <
    Options extends { tracingOptions?: OperationTracingOptions },
    Callback extends (options: Options) => Promise<unknown>,
  >(
    callback: Callback,
    expectedSpanNames: string[],
    options?: Options,
    thisArg?: ThisParameterType<Callback>,
  ) => {
    const result = await supportsTracing(callback, expectedSpanNames, options, thisArg);
    return {
      pass: result.pass,
      message: () => result.message ?? "Assertion passed.",
    };
  },
});

interface AzureMatchers<R = unknown> {
  toSupportTracing: <
    Options extends { tracingOptions?: OperationTracingOptions },
    Callback extends (options: Options) => Promise<unknown>,
  >(
    callback: Callback,
    expectedSpanNames: string[],
    options?: Options,
    thisArg?: ThisParameterType<Callback>,
  ) => Promise<R>;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends AzureMatchers<T> {}
  interface AsymmetricMatchersContaining extends AzureMatchers {}
}
