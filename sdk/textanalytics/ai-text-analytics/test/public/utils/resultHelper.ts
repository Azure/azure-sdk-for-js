// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { TextAnalyticsErrorResult, TextAnalyticsSuccessResult } from "../../../src/";

export function assertAllSuccess<TSuccess extends TextAnalyticsSuccessResult>(
  results: (TextAnalyticsErrorResult | TSuccess)[]
): void {
  for (const result of results) {
    assert.ok(isSuccess(result));
  }
}

export function isSuccess<TSuccess extends TextAnalyticsSuccessResult>(
  res: TextAnalyticsErrorResult | TSuccess
): res is TSuccess {
  return res.error === undefined;
}
