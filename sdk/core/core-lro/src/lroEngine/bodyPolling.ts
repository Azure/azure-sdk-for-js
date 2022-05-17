// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroResponse, LroStatus } from "./models";
import { getProvisioningState, isCanceled, isPollingDone } from "./requestUtils";
import { PollOperationState } from "../pollOperation";

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function processBodyPollingOperationResult<
  TResult,
  TState extends PollOperationState<TResult>
>(state: TState): (response: LroResponse<TResult>) => LroStatus<TResult> {
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    const status = getProvisioningState(response.rawResponse);
    return {
      ...response,
      done:
        isCanceled({
          state,
          status,
        }) ||
        isPollingDone({
          rawResponse: response.rawResponse,
          status,
        }),
    };
  };
}
