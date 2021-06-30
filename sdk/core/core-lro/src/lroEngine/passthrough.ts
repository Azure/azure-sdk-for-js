// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroStatus, RawResponse } from "./models";

export function processPassthroughOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LroStatus<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: true
  };
}
