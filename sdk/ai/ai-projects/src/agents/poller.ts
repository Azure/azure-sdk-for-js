// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "@azure/core-util";
import { PollOperationState, PollOperation, Poller } from "@azure/core-lro";

interface PollResult {
  status: string;
}

interface AgentsPollOperationState<T extends PollResult> extends PollOperationState<T> {
  customUpdate: (state?: T) => Promise<{result: T, completed: boolean}>;
  cancelled?: boolean;
}

interface AgentsPollOperation<T extends PollResult> extends PollOperation<AgentsPollOperationState<T>, T> {}

export class AgentsPoller<T extends PollResult> extends Poller<AgentsPollOperationState<T>, T> {
  sleepIntervalInMs: number = 1000;
  
  constructor(
    customUpdate: (state?: T) => Promise<{result: T, completed: boolean}>,
    sleepIntervalInMs?: number,
    baseOperation?: AgentsPollOperation<T>,
    onProgress?: (state: AgentsPollOperationState<T>) => void
  ) {
    let state: AgentsPollOperationState<T> = { customUpdate };
  
    if (baseOperation) {
      state = baseOperation.state;
    }

    const operation = makeOperation(state);
    super(operation);

    this.sleepIntervalInMs = sleepIntervalInMs ?? this.sleepIntervalInMs;

    if (onProgress) {
      this.onProgress(onProgress);
    }
  }

  async delay(): Promise<void> {
    await delay(this.sleepIntervalInMs);
  }

  stopPolling(): void {
    this.operation.state.cancelled = true;
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
    update: update,
    cancel: cancel,
    toString: toString,
  };
}

async function update<T extends PollResult>(
  this: AgentsPollOperation<T>,
): Promise<PollOperation<AgentsPollOperationState<T>, T>> {
  const { result, completed } = await this.state.customUpdate(this.state.result);
  this.state.result = result;
  this.state.isCompleted = completed;
  return makeOperation(this.state);
}

async function cancel<T extends PollResult>(
  this: AgentsPollOperation<T>,
): Promise<PollOperation<AgentsPollOperationState<T>, T>> {
  return makeOperation({
    ...this.state,
    cancelled: true,
  });
}

function toString<T extends PollResult>(
  this: AgentsPollOperation<T>,
): string {
  return JSON.stringify(this.state);
}
