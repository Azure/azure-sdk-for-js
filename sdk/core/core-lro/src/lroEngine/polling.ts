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
import { getProvisioningState, isCanceled, isPollingDone } from "./requestUtils";
import { PollOperationState } from "../pollOperation";

function getStatus(rawResponse: RawResponse): string {
  const { status } = (rawResponse.body as LroBody) ?? {};
  return typeof status === "string" ? status.toLowerCase() : getProvisioningState(rawResponse);
}

/**
 * Sends a request to the URI of the provisioned resource if needed.
 */
function sendFinalRequest<TResult>(inputs: {
  lro: LongRunningOperation<TResult>;
  resourceLocation: string;
  lroResourceLocationConfig?: LroResourceLocationConfig;
}): Promise<LroResponse<TResult>> {
  const { lro, resourceLocation, lroResourceLocationConfig } = inputs;
  switch (lroResourceLocationConfig) {
    case "original-uri":
      return lro.sendPollRequest(lro.requestPath);
    case "location":
    default:
      return lro.sendPollRequest(resourceLocation);
  }
}

export function createGetLroStatusFromResponse<
  TResult,
  TState extends PollOperationState<TResult>
>(inputs: {
  lro: LongRunningOperation<TResult>;
  state: TState;
  resourceLocation?: string;
  lroResourceLocationConfig?: LroResourceLocationConfig;
}): (response: LroResponse<TResult>) => LroStatus<TResult> {
  const { lro, state, lroResourceLocationConfig, resourceLocation } = inputs;
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    const status = getStatus(response.rawResponse);
    const isTerminalStatus =
      isCanceled({
        state,
        status,
      }) ||
      isPollingDone({
        rawResponse: response.rawResponse,
        status,
      });
    return {
      ...response,
      done:
        isTerminalStatus &&
        (!resourceLocation || lroResourceLocationConfig === "azure-async-operation"),
      next: !(isTerminalStatus && resourceLocation)
        ? undefined
        : () =>
            sendFinalRequest({
              lro,
              resourceLocation,
              lroResourceLocationConfig,
            }).then((res) => ({
              ...res,
              done: true,
            })),
    };
  };
}
