// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalysisErrorResult, TextAnalysisSuccessResult } from "../../../src/";
import { assert } from "chai";

export function assertAllSuccess<TSuccess extends TextAnalysisSuccessResult>(
  results: (TextAnalysisErrorResult | TSuccess)[]
): void {
  for (const result of results) {
    assert.ok(isSuccess(result));
  }
}

export function isSuccess<TSuccess extends TextAnalysisSuccessResult>(
  res: TextAnalysisErrorResult | TSuccess
): res is TSuccess {
  return res.error === undefined;
}

export function getSuccRes<TSuccess extends TextAnalysisSuccessResult>(
  res: TextAnalysisErrorResult | TSuccess
): TSuccess {
  if (!res.error) {
    return res;
  } else {
    throw new Error(`Unexpected error: ${JSON.stringify(res.error)}`);
  }
}
