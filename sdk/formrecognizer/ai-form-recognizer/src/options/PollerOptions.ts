// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { PollOperationState } from "@azure/core-lro";

/**
 * Options for long-running operations (pollers) in the Form Recognizer clients.
 */
export interface PollerOptions<TState extends PollOperationState<unknown>>
  extends OperationOptions {
  /**
   * The amount of time to wait (in milliseconds) between subsequent requests relating to the same operation.
   */
  updateIntervalInMs?: number;
  /**
   * A serialized poller state. If provided, the polling operation will be resumed from the given state instead of
   * started as if it were a new operation.
   */
  resumeFrom?: string;
  /**
   * An optional initial progress handler that will be called when the poller state updates. This handler will be called
   * once immediately after the poller state is initialized.
   */
  onProgress?: (state: TState) => void;
}
