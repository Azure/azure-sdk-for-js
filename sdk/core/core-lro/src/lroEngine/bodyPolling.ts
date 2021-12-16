// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LroBody,
  LroResponse,
  LroStatus,
  RawResponse,
  failureStates,
  successStates
} from "./models";
import { isUnexpectedPollingResponse } from "./requestUtils";

function getProvisioningState(rawResponse: RawResponse): string {
  const { properties, provisioningState } = (rawResponse.body as LroBody) ?? {};
  const state: string | undefined = properties?.provisioningState ?? provisioningState;
  return typeof state === "string" ? state.toLowerCase() : "succeeded";
}

export function isBodyPollingDone(rawResponse: RawResponse): boolean {
  const state = getProvisioningState(rawResponse);
  if (isUnexpectedPollingResponse(rawResponse) || failureStates.includes(state)) {
    throw new Error(`The long running operation has failed. The provisioning state: ${state}.`);
  }
  return successStates.includes(state);
}

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function processBodyPollingOperationResult<TResult>(
  response: LroResponse<TResult>
): LroStatus<TResult> {
  return {
    ...response,
    done: isBodyPollingDone(response.rawResponse)
  };
}
