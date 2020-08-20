// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { TextAnalyticsResult, TextAnalyticsSuccessResult } from "../../src/index";

export function assertAllSuccess(results: TextAnalyticsResult[]): void {
  for (const result of results) {
    assert.ok(isSuccess(result));
  }
}

export function isSuccess(res: TextAnalyticsResult): res is TextAnalyticsSuccessResult {
  return res.error === undefined;
}
