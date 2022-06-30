// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroInfo, LroResponse, LroStatus } from "./models";
import { PollOperationState } from "../pollOperation";
import { isDone } from "./utils";

export function createGetLroStatusFromResponse<
  TResult,
  TState extends PollOperationState<TResult>
>(inputs: {
  lro: LongRunningOperation<TResult>;
  state: TState;
  info: LroInfo;
}): (response: LroResponse<TResult>) => LroStatus<TResult> {
  const { lro, state, info } = inputs;
  const location = info.location;
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    const isTerminalStatus = isDone({
      info,
      rawResponse: response.rawResponse,
      state,
    });
    return {
      ...response,
      done: isTerminalStatus && !location,
      next: !(isTerminalStatus && location)
        ? undefined
        : () =>
            lro.sendPollRequest(location).then((res) => ({
              ...res,
              done: true,
            })),
    };
  };
}
