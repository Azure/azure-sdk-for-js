// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { failureStates, LROStatus, RawResponse, successStates } from "./models";

function getProvisioningState(rawResponse: RawResponse): string {
  const { properties, provisioningState } = rawResponse.body ?? {};
  const state: string | undefined = properties?.provisioningState ?? provisioningState;
  return state?.toLowerCase() ?? "succeeded";
}

export function isBodyPollingDone(rawResponse: RawResponse): boolean {
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
): LROStatus<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: isBodyPollingDone(rawResponse)
  };
}
