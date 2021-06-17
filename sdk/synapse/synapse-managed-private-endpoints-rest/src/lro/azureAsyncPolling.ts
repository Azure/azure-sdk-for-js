// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FinalStateVia,
  LROResult,
  LROState,
  RawResponse,
  RetrieveAzureAsyncResourceOperation
} from "./models";
import { failureStates, successStates } from "./stateMachine";

function getResponseStatus(rawResponse: RawResponse): string {
  const { status } = rawResponse.body ?? {};
  return status?.toLowerCase() ?? "succeeded";
}

function isAzureAsyncPollingDone(rawResponse: RawResponse) {
  const state = getResponseStatus(rawResponse);
  if (failureStates.includes(state)) {
    throw new Error(`Operation status: ${state}`);
  }
  return successStates.includes(state);
}

export function processAzureAsyncOperationResult<TResult>(
  restrieveResource: RetrieveAzureAsyncResourceOperation<TResult>,
  resourceLocation?: string,
  finalStateVia?: FinalStateVia
): (rawResponse: RawResponse, flatResponse: TResult) => LROState<TResult> {
  return (
    rawResponse: RawResponse,
    flatResponse: TResult
  ): LROState<TResult> => {
    if (isAzureAsyncPollingDone(rawResponse)) {
      if (resourceLocation === undefined) {
        return { rawResponse, flatResponse, done: true };
      } else {
        return {
          rawResponse,
          flatResponse,
          done: false,
          next: async () => {
            async function sendFinalRequest(): Promise<
              LROResult<TResult> | undefined
            > {
              switch (finalStateVia) {
                case "original-uri":
                  return restrieveResource();
                case "azure-async-operation":
                  return Promise.resolve(undefined);
                case "location":
                default:
                  return restrieveResource(resourceLocation);
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
