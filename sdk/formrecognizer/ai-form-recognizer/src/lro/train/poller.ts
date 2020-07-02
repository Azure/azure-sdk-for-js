// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { TrainingFileFilter, GetModelOptions } from "../../formTrainingClient";

import {
  ModelStatus,
  GeneratedClientTrainCustomModelAsyncResponse as TrainCustomModelAsyncResponse
} from "../../generated/models";
import { CustomFormModel, FormModelResponse } from "../../models";
export { ModelStatus, TrainCustomModelAsyncResponse };

/**
 * Defines the operations from a {@link FormRecognizerClient} that are needed for the poller
 * returned by {@link FormRecognizerClient.beginTraining} to work.
 */
export type TrainPollerClient = {
  getCustomModel: (modelId: string, options: GetModelOptions) => Promise<FormModelResponse>;
  trainCustomModelInternal: (
    source: string,
    useLabelFile?: boolean,
    options?: TrainingFileFilter
  ) => Promise<TrainCustomModelAsyncResponse>;
};

/**
 * The state used by the poller returned from {@link FormTrainingClient.beginTraining}.
 *
 * This state is passed into the user-specified `onProgress` callback
 * whenever copy progress is detected.
 */
export interface BeginTrainingPollState extends PollOperationState<CustomFormModel> {
  /**
   * The instance of {@link TrainPollerClient} that is used when calling {@link FormTrainingClient.beginTraining}.
   */
  readonly client: TrainPollerClient;
  /**
   * The accessible url to an Azure Blob Storage container holding the training documents.
   */
  source: string;
  /**
   * The id of the custom form model being created from the training operation.
   */
  modelId?: string;
  /**
   * the status of the created model.
   */
  status: ModelStatus;
  /**
   * Option to filter training files.
   */
  readonly trainModelOptions?: TrainingFileFilter;
}

export interface BeginTrainingPollerOperation
  extends PollOperation<BeginTrainingPollState, CustomFormModel> {}

/**
 * @internal
 */
export interface BeginTrainingPollerOptions {
  client: TrainPollerClient;
  source: string;
  updateIntervalInMs?: number;
  onProgress?: (state: BeginTrainingPollState) => void;
  resumeFrom?: string;
  trainModelOptions?: TrainingFileFilter;
}

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginTrainingPoller extends Poller<BeginTrainingPollState, CustomFormModel> {
  public updateIntervalInMs: number;

  constructor(options: BeginTrainingPollerOptions) {
    const {
      client,
      source,
      updateIntervalInMs = 5000,
      onProgress,
      resumeFrom,
      trainModelOptions
    } = options;

    let state: BeginTrainingPollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginTrainingPollOperation({
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

    this.updateIntervalInMs = updateIntervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}

/**
 * Creates a poll operation given the provided state.
 * @ignore
 */
function makeBeginTrainingPollOperation(
  state: BeginTrainingPollState
): BeginTrainingPollerOperation {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginTrainingPollerOperation> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginTrainingPollerOperation> {
      const state = this.state;
      const { client, source, trainModelOptions } = state;

      if (!state.isStarted) {
        state.isStarted = true;
        const result = await client.trainCustomModelInternal(
          source,
          false,
          trainModelOptions || {}
        );
        if (!result.location) {
          throw new Error("Expect a valid 'operationLocation' to retrieve analyze results");
        }
        const lastSlashIndex = result.location.lastIndexOf("/");
        state.modelId = result.location.substring(lastSlashIndex + 1);
      }

      const model = await client.getCustomModel(state.modelId!, {
        abortSignal: trainModelOptions?.abortSignal
      });

      state.status = model.status;

      if (!state.isCompleted) {
        if (typeof options.fireProgress === "function") {
          options.fireProgress(state);
        }

        if (model.status === "ready") {
          state.result = model;
          state.isCompleted = true;
        } else if (model.status === "invalid") {
          const errors = model.errors
            ?.map((e) => `  code ${e.code}, message: '${e.message}'`)
            .join("\n");
          const additionalInfo = model.trainingDocuments
            ?.map(
              (d) =>
                `  document: ${d.documentName}, status: ${d.status}, errors: ${d.errors
                  ?.map((e) => `code ${e.code}, message: '${e.message}'`)
                  .join("\n")}`
            )
            .join("\n");
          const message = `Model training failed. Invalid model was created with id '${
            state.modelId
          }'.
Error(s):
${errors || ""}
Additional information:
${additionalInfo || ""}
`;
          throw new Error(message);
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
