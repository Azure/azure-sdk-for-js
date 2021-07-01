// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroStatus, RawResponse } from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function isLocationPollingDone(rawResponse: RawResponse): boolean {
  return !isUnexpectedPollingResponse(rawResponse) && rawResponse.statusCode !== 202;
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
