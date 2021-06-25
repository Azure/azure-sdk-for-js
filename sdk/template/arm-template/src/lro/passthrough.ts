// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FullOperationResponse } from "@azure/core-client";
import { LROState } from "./stateMachine";

export function processPassthroughOperationResult<TResult>(
  rawResponse: FullOperationResponse,
  flatResponse: TResult
): LROState<TResult> {
  return {
    rawResponse,
    flatResponse,
    done: true
  };
}
