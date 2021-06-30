// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroStatus, RawResponse } from "./models";
import { isExpectedPollingResponse } from "./requestUtils";

function isLocationPollingDone(rawResponse: RawResponse): boolean {
  return !isExpectedPollingResponse(rawResponse) && rawResponse.statusCode !== 202;
}

export function processLocationPollingOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LroStatus<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: isLocationPollingDone(rawResponse)
  };
}
