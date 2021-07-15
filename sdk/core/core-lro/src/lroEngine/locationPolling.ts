// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawResponse } from "../models";
import { LroResponse, LroStatus } from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function isLocationPollingDone(rawResponse: RawResponse): boolean {
  return !isUnexpectedPollingResponse(rawResponse) && rawResponse.statusCode !== 202;
}

export function processLocationPollingOperationResult<TResult>(
  response: LroResponse<TResult>
): LroStatus<TResult> {
  return {
    ...response,
    done: isLocationPollingDone(response.rawResponse)
  };
}
