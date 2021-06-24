// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LROStatus, RawResponse } from "./models";

export function processPassthroughOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LROStatus<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: true
  };
}
