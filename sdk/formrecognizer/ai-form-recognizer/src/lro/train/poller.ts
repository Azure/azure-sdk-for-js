// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { CustomFormRecognizerClient, TrainCustomModelOptions } from "../../customRecognizerClient";

import { Model, ModelStatus, TrainCustomModelAsyncResponse } from "../../generated/models";
export { ModelStatus, TrainCustomModelAsyncResponse };

/**
 * Defines the operations from a {@link CustomRecognizerClient} that are needed for the poller
 * returned by {@link CustomRecognizerClient.startTraining} to work.
 */
export type TrainPollerClient = Pick<CustomFormRecognizerClient, "getModel"> & {
  trainCustomModelInternal: (
    source: string,
    useLabelFile?: boolean,
    options?: TrainCustomModelOptions
  ) => Promise<TrainCustomModelAsyncResponse>;
};

export interface StartTrainingPollState extends PollOperationState<Model> {
  readonly client: TrainPollerClient;
  source: string;
  modelId?: string;
  status: ModelStatus;
  readonly trainModelOptions?: TrainCustomModelOptions;
}

export interface StartTrainingPollerOperation
  extends PollOperation<StartTrainingPollState, Model> {}

export interface StartTrainingPollerOptions {
  client: TrainPollerClient;
  source: string;
  intervalInMs?: number;
  onProgress?: (state: StartTrainingPollState) => void;
  resumeFrom?: string;
  trainModelOptions?: TrainCustomModelOptions;
}

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class StartTrainingPoller extends Poller<StartTrainingPollState, Model> {
  public intervalInMs: number;

  constructor(options: StartTrainingPollerOptions) {
    const {
      client,
      source,
      intervalInMs = 5000,
      onProgress,
      resumeFrom,
      trainModelOptions
    } = options;

    let state: StartTrainingPollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeStartTrainingPollOperation({
      ...state,
      client,
      source,
      status: "creating",
      trainModelOptions
    });

    super(operation);

    if (typeof onProgress === "function") {
      this.onProgress(onProgress);
    }

    this.intervalInMs = intervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}

const cancel: StartTrainingPollerOperation["cancel"] = async function cancel(
  this: StartTrainingPollerOperation,
  _options = {}
): Promise<StartTrainingPollerOperation> {
  throw new Error("Cancel operation is not supported.");
};

const update: StartTrainingPollerOperation["update"] = async function update(
  this: StartTrainingPollerOperation,
  options = {}
): Promise<StartTrainingPollerOperation> {
  const state = this.state;
  const { client, source, trainModelOptions } = state;

  if (!state.isStarted) {
    state.isStarted = true;
    const result = await client.trainCustomModelInternal(source, false, trainModelOptions || {});
    const lastSlashIndex = result.location.lastIndexOf("/");
    state.modelId = result.location.substring(lastSlashIndex + 1);
  }

  const model = await client.getModel(state.modelId!, {
    abortSignal: trainModelOptions?.abortSignal
  });

  state.status = model.modelInfo.status;

  if (!state.isCompleted) {
    if (model.modelInfo.status === "creating" && typeof options.fireProgress === "function") {
      options.fireProgress(state);
    } else if (model.modelInfo.status === "ready") {
      state.result = model;
      state.isCompleted = true;
    } else if (model.modelInfo.status === "invalid") {
      state.error = new Error(`Model training failed with invalid model status.`);
      state.isCompleted = true;
    }
  }

  return makeStartTrainingPollOperation(state);
};

const toString: StartTrainingPollerOperation["toString"] = function toString(
  this: StartTrainingPollerOperation
) {
  return JSON.stringify({ state: this.state }, (key, value) => {
    if (key === "client") {
      return undefined;
    }
    return value;
  });
};

/**
 * Creates a poll operation given the provided state.
 * @ignore
 */
function makeStartTrainingPollOperation(
  state: StartTrainingPollState
): StartTrainingPollerOperation {
  return {
    state: { ...state },
    cancel,
    toString,
    update
  };
}
