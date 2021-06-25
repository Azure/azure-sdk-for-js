// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroStatus, RawResponse } from "./models";

function isLocationPollingDone(rawResponse: RawResponse): boolean {
  const code = rawResponse.statusCode;
  if (![202, 200].includes(code)) {
    throw new Error(`Received unexpected HTTP status code ${code} while polling. This may indicate a server issue.`);
  }
  return code !== 202;
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
