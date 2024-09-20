// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isRestError } from "@azure/core-rest-pipeline";
import { assert } from "chai";

import { TextAnalyticsErrorResult, TextAnalyticsSuccessResult } from "../../../src/";

export function assertAllSuccess<TSuccess extends TextAnalyticsSuccessResult>(
  results: (TextAnalyticsErrorResult | TSuccess)[],
): void {
  for (const result of results) {
    assert.ok(isSuccess(result));
  }
}

export function isSuccess<TSuccess extends TextAnalyticsSuccessResult>(
  res: TextAnalyticsErrorResult | TSuccess,
): res is TSuccess {
  return res.error === undefined;
}

export async function assertRestError(
  error: Promise<unknown>,
  options: {
    statusCode?: number;
    code?: string;
    messagePattern?: RegExp;
  } = {},
): Promise<void> {
  const { code, statusCode, messagePattern } = options;
  try {
    await error;
    assert.fail(`Should have failed instead!`);
  } catch (e: unknown) {
    if (isRestError(e)) {
      if (code) {
        assert.equal(e.code, code);
      }
      if (statusCode) {
        assert.equal(e.statusCode, statusCode);
      }
      if (messagePattern) {
        assert.match(e.message, messagePattern);
      }
    } else {
      assert.fail(`Unexpected error: ${JSON.stringify(e)}`);
    }
  }
}
