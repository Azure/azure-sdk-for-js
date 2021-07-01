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
  if (isUnexpectedPollingResponse(rawResponse) || failureStates.includes(state)) {
    throw new Error(`Operation status: ${state}`);
  }
  return successStates.includes(state);
}

async function sendFinalRequest<TResult>(
  lro: LongRunningOperation<TResult>,
  lroResourceLocationConfig?: LroResourceLocationConfig,
  resourceLocation?: string
): Promise<LroResponse<TResult> | undefined> {
  switch (lroResourceLocationConfig) {
    case "original-uri":
      return lro.retrieveAzureAsyncResource();
    case "azure-async-operation":
      return Promise.resolve(undefined);
    case "location":
    default:
      return lro.retrieveAzureAsyncResource(resourceLocation);
  }
}

export function processAzureAsyncOperationResult<TResult>(
  lro: LongRunningOperation<TResult>,
  resourceLocation?: string,
  lroResourceLocationConfig?: LroResourceLocationConfig
): (rawResponse: RawResponse, flatResponse: TResult) => LroStatus<TResult> {
  return (rawResponse: RawResponse, flatResponse: TResult): LroStatus<TResult> => {
    if (isAzureAsyncPollingDone(rawResponse)) {
      if (resourceLocation === undefined) {
        return { rawResponse, flatResponse, done: true };
      } else {
        return {
          rawResponse,
          flatResponse,
          done: false,
          next: async () => {
            const finalResponse = await sendFinalRequest(
              lro,
              lroResourceLocationConfig,
              resourceLocation
            );
            return {
              ...(finalResponse ?? {
                rawResponse,
                flatResponse
              }),
              done: true
            };
          }
        };
      }
    }
    return {
      rawResponse,
      flatResponse,
      done: false
    };
  };
}
