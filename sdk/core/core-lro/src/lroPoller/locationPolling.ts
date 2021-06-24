// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LROStatus, RawResponse } from "./models";

function isLocationPollingDone(rawResponse: RawResponse): boolean {
  const code = rawResponse.statusCode;
  if (![202, 200].includes(code)) {
    throw new Error(`Operation failed`);
  }
  return code !== 202;
}

export function processLocationPollingOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LROStatus<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: isLocationPollingDone(rawResponse)
  };
}
