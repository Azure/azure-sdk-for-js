// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "@azure/core-util";
import { PollOperationState, PollOperation, Poller } from "@azure/core-lro";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollingOptions } from "./customModels.js";

interface PollResult {
  status: string;
}

interface AgentsPollOperationState<T extends PollResult> extends PollOperationState<T> {
  updateInternal: (state?: T) => Promise<{result: T, completed: boolean}>;
  cancelInternal?: (state: T) => Promise<boolean>;
  abortSignal?: AbortSignalLike;
  cancelled?: boolean;
}

interface AgentsPollOperation<T extends PollResult> extends PollOperation<AgentsPollOperationState<T>, T> {}

export class AgentsPoller<T extends PollResult> extends Poller<AgentsPollOperationState<T>, T> {
  sleepIntervalInMs: number = 1000;
  
  constructor(
    update: (state?: T) => Promise<{result: T, completed: boolean}>,
    pollerOptions?: PollingOptions,
    cancel?: (state: T) => Promise<boolean>,
    baseOperation?: AgentsPollOperation<T>,
    onProgress?: (state: AgentsPollOperationState<T>) => void
  ) {
    let state: AgentsPollOperationState<T> = { 
      updateInternal: update,
      cancelInternal: cancel,
      abortSignal: pollerOptions?.abortSignal
    };
  
    if (baseOperation) {
      state = baseOperation.state;
    }

    const operation = makeOperation(state);
    super(operation);

    this.sleepIntervalInMs = pollerOptions?.sleepIntervalInMs ?? this.sleepIntervalInMs;

    if (onProgress) {
      this.onProgress(onProgress);
    }
  }

  async delay(): Promise<void> {
    await delay(this.sleepIntervalInMs);
  }
}

/**
 * Utility function to create a new instance of operation state.
 * Recommended to avoid no references are left or manipulated by mistake
 */
function makeOperation<T extends PollResult>(
  state: AgentsPollOperationState<T>,
): PollOperation<AgentsPollOperationState<T>, T> {
  return {
    state: {
      ...state,
    },
    update: updateWrapper,
    cancel: cancelWrapper,
    toString: toString,
  };
}

async function updateWrapper<T extends PollResult>(
  this: AgentsPollOperation<T>,
): Promise<PollOperation<AgentsPollOperationState<T>, T>> {
  if (this.state.abortSignal?.aborted) {
    return makeOperation(this.state);
  }
  const { result, completed } = await this.state.updateInternal(this.state.result);
  this.state.result = result;
  this.state.isCompleted = completed;
  return makeOperation(this.state);
}

async function cancelWrapper<T extends PollResult>(
  this: AgentsPollOperation<T>
): Promise<PollOperation<AgentsPollOperationState<T>, T>> {
  if (!this.state.cancelInternal) {
    throw new Error("This operation does not support cancellation");
  }
  if (!this.state.result) {
    return makeOperation({
      ...this.state,
      cancelled: false
    });
  }
  const cancelled = await this.state.cancelInternal(this.state.result);
  return makeOperation({
    ...this.state,
    cancelled: cancelled,
  });
}

function toString<T extends PollResult>(
  this: AgentsPollOperation<T>,
): string {
  return JSON.stringify(this.state);
}
