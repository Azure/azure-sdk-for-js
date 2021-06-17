// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LROState, RawResponse } from "./models";

function isLocationPollingDone(rawResponse: RawResponse) {
  const code = rawResponse.statusCode;
  if (![202, 200].includes(code)) {
    throw new Error(`Operation failed`);
  }
  return code !== 202;
}

export function processLocationPollingOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LROState<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: isLocationPollingDone(rawResponse)
  };
}
