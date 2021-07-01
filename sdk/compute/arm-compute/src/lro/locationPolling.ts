// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FullOperationResponse } from "@azure/core-client";
import { LROState } from "./stateMachine";

function isLocationPollingDone(rawResponse: FullOperationResponse) {
  const code = rawResponse.status;
  if (![202, 200].includes(code)) {
    throw new Error(`Operation failed`);
  }
  return code !== 202;
}

export function processLocationPollingOperationResult<TResult>(
  rawResponse: FullOperationResponse,
  flatResponse: TResult
): LROState<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: isLocationPollingDone(rawResponse)
  };
}
