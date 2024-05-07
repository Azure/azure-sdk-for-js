// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationTracingOptions } from "@azure/core-tracing";
import { supportsTracing } from "./tracing/azureTraceMatcher.js";

export interface MatcherState {
  utils: MatcherUtils;
}

export interface MatcherUtils {
  matcherHint(
    matcherName: string,
    received?: string,
    expected?: string,
    options?: MatcherHintOptions,
  ): string;
  printReceived(object: unknown): string;
  printExpected(object: unknown): string;
}

export type MatcherHintColor = (arg: string) => string;

export type MatcherHintOptions = {
  comment?: string;
  expectedColor?: MatcherHintColor;
  isDirectExpectCall?: boolean;
  isNot?: boolean;
  promise?: string;
  receivedColor?: MatcherHintColor;
  secondArgument?: string;
  secondArgumentColor?: MatcherHintColor;
};

export interface SyncExpectationResult {
  pass: boolean;
  message(): string;
}

export type AsyncExpectationResult = Promise<SyncExpectationResult>;

export type ExpectationResult = SyncExpectationResult | AsyncExpectationResult;

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
