// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "@azure/core-util";
import { PollOperationState, PollOperation, Poller } from "@azure/core-lro";
import { Client } from "@azure-rest/core-client";
import { CreateVectorStoreParameters } from "../../generated/src/parameters.js";
import { VectorStoreOutput } from "../../generated/src/outputModels.js";
import { createVectorStore, getVectorStore } from "../vectorStores.js";

interface CreateVectorStorePollOperationState extends PollOperationState<VectorStoreOutput> {
  context: Client;
  options?: CreateVectorStoreParameters;
  sleepIntervalInMs?: number;
  vectorStoreId?: string;
  cancelled?: boolean;
}

interface CreateVectorStorePollOperation extends PollOperation<CreateVectorStorePollOperationState, VectorStoreOutput> {}

export class CreateVectorStorePoller extends Poller<CreateVectorStorePollOperationState, VectorStoreOutput> {
  sleepIntervalInMs: number = 1000;
  
  constructor(
    context: Client,
    options?: CreateVectorStoreParameters,
    sleepIntervalInMs?: number,
    baseOperation?: CreateVectorStorePollOperation,
    onProgress?: (state: CreateVectorStorePollOperationState) => void
  ) {
    let state: CreateVectorStorePollOperationState = { context, options };
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
function makeOperation(
  state: CreateVectorStorePollOperationState,
): PollOperation<CreateVectorStorePollOperationState, VectorStoreOutput> {
  return {
    state: {
      ...state,
    },
    update: update,
    cancel: cancel,
    toString: toString,
  };
}

async function update(
  this: CreateVectorStorePollOperation,
): Promise<PollOperation<CreateVectorStorePollOperationState, VectorStoreOutput>> {
  if (!this.state.vectorStoreId) {
    const result = await createVectorStore(this.state.context, this.state.options);
    this.state.vectorStoreId = result.id;
    this.state.result = result;
  } else {
    const result = await getVectorStore(this.state.context, this.state.vectorStoreId);
    this.state.result = result;
    if (result.status !== "in_progress") {
      this.state.isCompleted = true;
    }
  }
  return makeOperation(this.state);
}

async function cancel(
  this: CreateVectorStorePollOperation,
): Promise<PollOperation<CreateVectorStorePollOperationState, VectorStoreOutput>> {
  return makeOperation({
    ...this.state,
    cancelled: true,
  });
}

function toString(
  this: CreateVectorStorePollOperation,
): string {
  return JSON.stringify(this.state);
}
