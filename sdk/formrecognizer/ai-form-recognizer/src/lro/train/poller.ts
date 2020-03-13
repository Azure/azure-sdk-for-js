// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { TrainModelOptions, GetModelOptions } from "../../formRecognizerClient";

import { ModelStatus, TrainCustomModelAsyncResponse } from "../../generated/models";
export { ModelStatus, TrainCustomModelAsyncResponse };

/**
 * Defines the operations from a {@link FormRecognizerClient} that are needed for the poller
 * returned by {@link FormRecognizerClient.beginTraining} to work.
 */
export type TrainPollerClient<T> = {
  getModel: (modelId: string, options: GetModelOptions) => Promise<T>;
  trainCustomModelInternal: (
    source: string,
    useLabelFile?: boolean,
    options?: TrainModelOptions
  ) => Promise<TrainCustomModelAsyncResponse>;
};

export interface BeginTrainingPollState<T> extends PollOperationState<T> {
  readonly client: TrainPollerClient<T>;
  source: string;
  modelId?: string;
  status: ModelStatus;
  readonly trainModelOptions?: TrainModelOptions;
}

export interface BeginTrainingPollerOperation<T>
  extends PollOperation<BeginTrainingPollState<T>, T> {}

/**
 * @internal
 */
export interface BeginTrainingPollerOptions<T> {
  client: TrainPollerClient<T>;
  source: string;
  intervalInMs?: number;
  onProgress?: (state: BeginTrainingPollState<T>) => void;
  resumeFrom?: string;
  trainModelOptions?: TrainModelOptions;
}

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginTrainingPoller<T extends { modelInfo: { status: ModelStatus } }> extends Poller<
  BeginTrainingPollState<T>,
  T
> {
  public intervalInMs: number;

  constructor(options: BeginTrainingPollerOptions<T>) {
    const {
      client,
      source,
      intervalInMs = 5000,
      onProgress,
      resumeFrom,
      trainModelOptions
    } = options;

    let state: BeginTrainingPollState<T> | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginTrainingPollOperation<T>({
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
function makeBeginTrainingPollOperation<T extends { modelInfo: { status: ModelStatus } }>(
  state: BeginTrainingPollState<T>
): BeginTrainingPollerOperation<T> {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginTrainingPollerOperation<T>> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginTrainingPollerOperation<T>> {
      const state = this.state;
      const { client, source, trainModelOptions } = state;

      if (!state.isStarted) {
        state.isStarted = true;
        const result = await client.trainCustomModelInternal(
          source,
          false,
          trainModelOptions || {}
        );
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

      return makeBeginTrainingPollOperation(state);
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
