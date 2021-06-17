// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LROState, RawResponse } from "./models";

export function processPassthroughOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LROState<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: true
  };
}
