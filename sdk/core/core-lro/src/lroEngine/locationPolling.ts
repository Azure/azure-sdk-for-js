// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LongRunningOperation,
  LroBody,
  LroResourceLocationConfig,
  LroResponse,
  LroStatus,
  RawResponse,
} from "./models";
import { isCanceled, isPollingDone } from "./requestUtils";
import { PollOperationState } from "../pollOperation";

function getStatus(rawResponse: RawResponse): string {
  const { status } = (rawResponse.body as LroBody) ?? {};
  return typeof status === "string" ? status.toLowerCase() : "succeeded";
}

function isLocationPollingDone(rawResponse: RawResponse, status: string): boolean {
  if (rawResponse.statusCode === 202) {
    return false;
  }
  return isPollingDone({ rawResponse, status });
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
    const status = getStatus(response.rawResponse);
    if (
      isCanceled({
        state,
        status,
      }) ||
      isLocationPollingDone(response.rawResponse, status)
    ) {
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
