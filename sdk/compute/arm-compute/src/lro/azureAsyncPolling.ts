// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FullOperationResponse } from "@azure/core-client";
import { FinalStateVia, LROResult } from "./models";
import { failureStates, LROState, successStates } from "./stateMachine";

function getResponseStatus(rawResponse: FullOperationResponse): string {
  const { status } =
    rawResponse.parsedBody ??
    (rawResponse.bodyAsText ? JSON.parse(rawResponse.bodyAsText) : {});
  return status?.toLowerCase() ?? "succeeded";
}

function isAzureAsyncPollingDone(rawResponse: FullOperationResponse) {
  const state = getResponseStatus(rawResponse);
  if (failureStates.includes(state)) {
    throw new Error(`Operation status: ${state}`);
  }
  return successStates.includes(state);
}

export function processAzureAsyncOperationResult<TResult>(
  restrieveResource: (path?: string) => Promise<LROResult<TResult>>,
  resourceLocation?: string,
  finalStateVia?: FinalStateVia
): (
  rawResponse: FullOperationResponse,
  flatResponse: TResult
) => LROState<TResult> {
  return (
    rawResponse: FullOperationResponse,
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
