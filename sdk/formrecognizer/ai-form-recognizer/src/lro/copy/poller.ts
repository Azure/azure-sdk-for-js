// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { CopyModelOptions, GetCopyModelResultOptions } from "../../formTrainingClient";

import {
  GeneratedClientGetCustomModelCopyResultResponse as GetCustomModelCopyResultResponse,
  GeneratedClientCopyCustomModelResponse as CopyCustomModelResponseModel,
  OperationStatus
} from "../../generated/models";
import { CopyAuthorization, CustomFormModelInfo } from "../../models";
export { OperationStatus };

export interface CopyPollerOperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: BeginCopyModelPollState) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines the operations from a training client that are needed for the poller
 * to work
 */
export type CopyModelPollerClient = {
  // returns a result id to retrieve results
  beginCopyModel: (
    modelId: string,
    copyAuthorization: CopyAuthorization,
    copyModelOptions?: CopyModelOptions
  ) => Promise<CopyCustomModelResponseModel>;
  // retrieves copy model result
  getCopyModelResult: (
    modelId: string,
    resultId: string,
    options: GetCopyModelResultOptions
  ) => Promise<GetCustomModelCopyResultResponse>;
};

export interface BeginCopyModelPollState extends PollOperationState<CustomFormModelInfo> {
  readonly client: CopyModelPollerClient;
  modelId: string;
  targetResourceId: string;
  targetResourceRegion: string;
  copyAuthorization: CopyAuthorization;
  resultId?: string;
  status: OperationStatus;
  readonly copyModelOptions?: CopyModelOptions;
}

export interface BeginCopyModelPollerOperation
  extends PollOperation<BeginCopyModelPollState, CustomFormModelInfo> {}

/**
 * @internal
 */
export type BeginCopyModelPollerOptions = {
  client: CopyModelPollerClient;
  modelId: string;
  targetResourceId: string;
  targetResourceRegion: string;
  copyAuthorization: CopyAuthorization;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: BeginCopyModelPollState) => void;
  resumeFrom?: string;
} & CopyModelOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginCopyModelPoller extends Poller<BeginCopyModelPollState, CustomFormModelInfo> {
  public intervalInMs: number;

  constructor(options: BeginCopyModelPollerOptions) {
    const {
      client,
      intervalInMs = 5000,
      modelId,
      resultId,
      targetResourceId,
      targetResourceRegion,
      copyAuthorization,
      onProgress,
      resumeFrom
    } = options;

    let state: BeginCopyModelPollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginCopyModelPollOperation({
      ...state,
      client,
      modelId,
      targetResourceId,
      targetResourceRegion,
      copyAuthorization,
      resultId,
      status: "notStarted",
      copyModelOptions: options
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
function makeBeginCopyModelPollOperation(
  state: BeginCopyModelPollState
): BeginCopyModelPollerOperation {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginCopyModelPollerOperation> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginCopyModelPollerOperation> {
      const state = this.state;
      const { client, modelId, copyAuthorization, copyModelOptions } = state;

      if (!state.isStarted) {
        state.isStarted = true;
        const result = await client.beginCopyModel(
          modelId,
          copyAuthorization,
          copyModelOptions || {}
        );
        if (!result.operationLocation) {
          throw new Error("Expect a valid 'operationLocation' to retrieve analyze results");
        }
        const lastSlashIndex = result.operationLocation.lastIndexOf("/");
        state.resultId = result.operationLocation.substring(lastSlashIndex + 1);
      }

      const response = await client.getCopyModelResult(modelId, state.resultId!, {
        abortSignal: copyModelOptions?.abortSignal
      });

      state.status = response.status;
      if (!state.isCompleted) {
        if (
          (response.status === "running" || response.status === "notStarted") &&
          typeof options.fireProgress === "function"
        ) {
          options.fireProgress(state);
        } else if (response.status === "succeeded") {
          state.result = {
            status: "ready",
            createdOn: response.createdOn,
            lastModified: response.lastModified,
            modelId: copyAuthorization.modelId
          };
          state.isCompleted = true;
        } else if (response.status === "failed") {
          throw new Error(`Copy model operation failed: ${response._response.bodyAsText}`);
        }
      }

      return makeBeginCopyModelPollOperation(state);
    },

    toString() {
      return JSON.stringify({ state: this.state }, (key, value) => {
        if (key === "client" || key === "source") {
          return undefined;
        }
        return value;
      });
    }
  };
}
