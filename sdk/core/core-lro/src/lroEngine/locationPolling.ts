// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState } from "../pollOperation";
import {
  LongRunningOperation,
  LroBody,
  LroResourceLocationConfig,
  LroResponse,
  LroStatus,
  RawResponse,
} from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function getStatus(rawResponse: RawResponse): string {
  const { status } = (rawResponse.body as LroBody) ?? {};
  return typeof status === "string" ? status.toLowerCase() : "succeeded";
}

function isPollingDone(rawResponse: RawResponse, status: string): boolean {
  if (isUnexpectedPollingResponse(rawResponse) || rawResponse.statusCode === 202) {
    return false;
  }
  return status === "succeeded";
}

/**
 * Sends a request to the URI of the provisioned resource if needed.
 */
async function sendFinalRequest<TResult>(
  lro: LongRunningOperation<TResult>,
  resourceLocation: string,
  lroResourceLocationConfig?: LroResourceLocationConfig
): Promise<LroResponse<TResult> | undefined> {
  switch (lroResourceLocationConfig) {
    case "original-uri":
      return lro.sendPollRequest(lro.requestPath);
    case "azure-async-operation":
      return undefined;
    case "location":
    default:
      return lro.sendPollRequest(resourceLocation ?? lro.requestPath);
  }
}

export function processLocationPollingOperationResult<
  TResult,
  TState extends PollOperationState<TResult>
>(
  lro: LongRunningOperation<TResult>,
  state: TState,
  resourceLocation?: string,
  lroResourceLocationConfig?: LroResourceLocationConfig
): (response: LroResponse<TResult>) => LroStatus<TResult> {
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    const rawResponse = response.rawResponse;
    const status = getStatus(rawResponse);
    if (isUnexpectedPollingResponse(rawResponse) || status === "failed") {
      throw new Error(`The long running operation has failed.`);
    }
    /**
     * These HTTP request methods are typically used around provisioned resources
     * so if the LRO was cancelled, there is nothing useful can be returned to
     * the customer. POST requests on the other hand could support partial results
     * so throwing an error in this case could be prevent customer from getting
     * access to those partial results.
     */
    if (["PUT", "DELETE", "PATCH"].includes(lro.requestMethod) && status === "canceled") {
      throw new Error(`The long running operation has been canceled.`);
    }
    if (["canceled", "cancelled"].includes(status)) {
      state.isCancelled = true;
      return {
        ...response,
        done: true,
      };
    }
    if (isPollingDone(response.rawResponse, status)) {
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
              done: true,
            };
          },
        };
      }
    }
    return {
      ...response,
      done: false,
    };
  };
}
