// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroResponse, LroStatus, RawResponse } from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function isLocationPollingDone(rawResponse: RawResponse): boolean {
  return !isUnexpectedPollingResponse(rawResponse) && rawResponse.statusCode !== 202;
}

export function processLocationPollingOperationResult<TResult>(
  response: LroResponse<TResult>
): LroStatus<TResult> {
  return {
    ...response,
    done: isLocationPollingDone(response.rawResponse),
  };
}
