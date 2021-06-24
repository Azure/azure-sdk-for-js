// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  failureStates,
  FinalStateVia,
  LRO,
  LROResponse,
  LROStatus,
  RawResponse,
  successStates
} from "./models";

function getResponseStatus(rawResponse: RawResponse): string {
  const { status } = rawResponse.body ?? {};
  return status?.toLowerCase() ?? "succeeded";
}

function isAzureAsyncPollingDone(rawResponse: RawResponse): boolean {
  const state = getResponseStatus(rawResponse);
  if (failureStates.includes(state)) {
    throw new Error(`Operation status: ${state}`);
  }
  return successStates.includes(state);
}

export function processAzureAsyncOperationResult<TResult>(
  lro: LRO<TResult>,
  resourceLocation?: string,
  finalStateVia?: FinalStateVia
): (rawResponse: RawResponse, flatResponse: TResult) => LROStatus<TResult> {
  return (rawResponse: RawResponse, flatResponse: TResult): LROStatus<TResult> => {
    if (isAzureAsyncPollingDone(rawResponse)) {
      if (resourceLocation === undefined) {
        return { rawResponse, flatResponse, done: true };
      } else {
        return {
          rawResponse,
          flatResponse,
          done: false,
          next: async () => {
            async function sendFinalRequest(): Promise<LROResponse<TResult> | undefined> {
              switch (finalStateVia) {
                case "original-uri":
                  return lro.retrieveAzureAsyncResource();
                case "azure-async-operation":
                  return Promise.resolve(undefined);
                case "location":
                default:
                  return lro.retrieveAzureAsyncResource(resourceLocation);
              }
            }
            const finalResponse = await sendFinalRequest();
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
