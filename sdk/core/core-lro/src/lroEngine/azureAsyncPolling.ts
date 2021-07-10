// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  failureStates,
  LroResourceLocationConfig,
  LongRunningOperation,
  LroBody,
  LroResponse,
  LroStatus,
  RawResponse,
  successStates
} from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function getResponseStatus(rawResponse: RawResponse): string {
  const { status } = (rawResponse.body as LroBody) ?? {};
  return status?.toLowerCase() ?? "succeeded";
}

function isAzureAsyncPollingDone(rawResponse: RawResponse): boolean {
  const state = getResponseStatus(rawResponse);
  if (
    isUnexpectedPollingResponse(rawResponse) ||
    failureStates.includes(state)
  ) {
    throw new Error(`Operation status: ${state}`);
  }
  return successStates.includes(state);
}

async function sendFinalRequest<TResult>(
  lro: LongRunningOperation<TResult>,
  resourceLocation: string,
  lroResourceLocationConfig?: LroResourceLocationConfig
): Promise<LroResponse<TResult> | undefined> {
  switch (lroResourceLocationConfig) {
    case "original-uri":
      return lro.sendPollRequest(lro.requestPath, () => true);
    case "azure-async-operation":
      return Promise.resolve(undefined);
    case "location":
    default:
      return lro.sendPollRequest(
        resourceLocation ?? lro.requestPath,
        () => true
      );
  }
}

export function processAzureAsyncOperationResult<TResult>(
  lro: LongRunningOperation<TResult>,
  resourceLocation?: string,
  lroResourceLocationConfig?: LroResourceLocationConfig
): (response: LroResponse<TResult>) => LroStatus<TResult> {
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    if (isAzureAsyncPollingDone(response.rawResponse)) {
      if (resourceLocation === undefined) {
        return { ...response, done: true };
      } else {
        return {
          ...response,
          done: false,
          next: async () => {
            const finalResponse = await sendFinalRequest(
              lro,
              resourceLocation,
              lroResourceLocationConfig
            );
            return {
              ...(finalResponse ?? response),
              done: true
            };
          }
        };
      }
    }
    return {
      ...response,
      done: false
    };
  };
}
