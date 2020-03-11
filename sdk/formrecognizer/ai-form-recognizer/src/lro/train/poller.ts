// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { TrainCustomModelOptions, GetModelOptions } from "../../customRecognizerClient";

import { ModelStatus, TrainCustomModelAsyncResponse } from "../../generated/models";
export { ModelStatus, TrainCustomModelAsyncResponse };

/**
 * Defines the operations from a {@link CustomRecognizerClient} that are needed for the poller
 * returned by {@link CustomRecognizerClient.startTraining} to work.
 */
export type TrainPollerClient<T> = {
  getModel: (modelId: string, options: GetModelOptions) =>  Promise<T>
  trainCustomModelInternal: (
    source: string,
    useLabelFile?: boolean,
    options?: TrainCustomModelOptions
  ) => Promise<TrainCustomModelAsyncResponse>;
};

export interface StartTrainingPollState<T> extends PollOperationState<T> {
  readonly client: TrainPollerClient<T>;
  source: string;
  modelId?: string;
  status: ModelStatus;
  readonly trainModelOptions?: TrainCustomModelOptions;
}

export interface StartTrainingPollerOperation<T>
  extends PollOperation<StartTrainingPollState<T>, T> {}

/**
 * @internal
 */
export interface StartTrainingPollerOptions<T> {
  client: TrainPollerClient<T>;
  source: string;
  intervalInMs?: number;
  onProgress?: (state: StartTrainingPollState<T>) => void;
  resumeFrom?: string;
  trainModelOptions?: TrainCustomModelOptions;
}

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class StartTrainingPoller<T extends { modelInfo: { status: ModelStatus}}> extends Poller<StartTrainingPollState<T>, T> {
  public intervalInMs: number;

  constructor(options: StartTrainingPollerOptions<T>) {
    const {
      client,
      source,
      intervalInMs = 5000,
      onProgress,
      resumeFrom,
      trainModelOptions
    } = options;

    let state: StartTrainingPollState<T> | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeStartTrainingPollOperation<T>({
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

/**
 * Creates a poll operation given the provided state.
 * @ignore
 */
function makeStartTrainingPollOperation<T extends { modelInfo: { status: ModelStatus}}>(
  state: StartTrainingPollState<T>
): StartTrainingPollerOperation<T> {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<StartTrainingPollerOperation<T>> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<StartTrainingPollerOperation<T>> {
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
    },

    toString() {
      return JSON.stringify({ state: this.state }, (key, value) => {
        if (key === "client") {
          return undefined;
        }
        return value;
      });
    }
  };
}
