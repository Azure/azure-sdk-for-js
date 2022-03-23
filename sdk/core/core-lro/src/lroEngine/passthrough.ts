// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroResponse, LroStatus } from "./models";

export function processPassthroughOperationResult<TResult>(
  response: LroResponse<TResult>
): LroStatus<TResult> {
  return {
    ...response,
    done: true,
  };
}
