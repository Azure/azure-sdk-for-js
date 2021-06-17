// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LROState, RawResponse } from "./models";
import { failureStates, successStates } from "./stateMachine";

function getProvisioningState(rawResponse: RawResponse): string {
  const { properties, provisioningState } = rawResponse.body ?? {};
  const state: string | undefined =
    properties?.provisioningState ?? provisioningState;
  return state?.toLowerCase() ?? "succeeded";
}

export function isBodyPollingDone(rawResponse: RawResponse) {
  const state = getProvisioningState(rawResponse);
  if (failureStates.includes(state)) {
    throw new Error(`Provisioning state: ${state}`);
  }
  return successStates.includes(state);
}

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function processBodyPollingOperationResult<TResult>(
  rawResponse: RawResponse,
  flatResponse: TResult
): LROState<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: isBodyPollingDone(rawResponse)
  };
}
