// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LongRunningOperation,
  LroBody,
  LroResourceLocationConfig,
  LroResponse,
  LroStatus,
  RawResponse,
  failureStates,
  successStates,
} from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function isPollingDone(rawResponse: RawResponse): boolean {
  if (isUnexpectedPollingResponse(rawResponse) || rawResponse.statusCode === 202) {
    return false;
  }
  const { status } = (rawResponse.body as LroBody) ?? {};
  const state = typeof status === "string" ? status.toLowerCase() : "succeeded";
  if (isUnexpectedPollingResponse(rawResponse) || failureStates.includes(state)) {
    throw new Error(`The long running operation has failed. The provisioning state: ${state}.`);
  }
  return successStates.includes(state);
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

export function processLocationPollingOperationResult<TResult>(
  lro: LongRunningOperation<TResult>,
  resourceLocation?: string,
  lroResourceLocationConfig?: LroResourceLocationConfig
): (response: LroResponse<TResult>) => LroStatus<TResult> {
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    if (isPollingDone(response.rawResponse)) {
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
