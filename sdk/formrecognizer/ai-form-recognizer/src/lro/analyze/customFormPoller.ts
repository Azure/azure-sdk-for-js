// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { RecognizeFormsOptions } from "../../formRecognizerClient";

import {
  GeneratedClientAnalyzeWithCustomModelResponse as AnalyzeWithCustomModelResponseModel,
  OperationStatus
} from "../../generated/models";
import { FormContentType } from "../../common";
import { FormRecognizerRequestBody, RecognizedFormArray } from "../../models";
import { RecognizeFormResultResponse } from "../../internalModels";
export { OperationStatus };

export interface CustomFormPollerOperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: BeginRecognizeCustomFormPollState) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type RecognizeCustomFormPollerClient = {
  // returns a result id to retrieve results
  beginRecognize: (
    source: FormRecognizerRequestBody | string,
    modelId: string,
    contentType?: FormContentType,
    analyzeOptions?: RecognizeFormsOptions
  ) => Promise<AnalyzeWithCustomModelResponseModel>;
  // retrieves analyze result
  getRecognizeResult: (
    resultId: string,
    options: { abortSignal?: AbortSignalLike }
  ) => Promise<RecognizeFormResultResponse>;
};

export interface BeginRecognizeCustomFormPollState extends PollOperationState<RecognizedFormArray> {
  readonly client: RecognizeCustomFormPollerClient;
  source?: FormRecognizerRequestBody | string;
  contentType?: FormContentType;
  modelId: string;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: RecognizeFormsOptions;
}

export interface BeginRecognizeCustomFormPollerOperation
  extends PollOperation<BeginRecognizeCustomFormPollState, RecognizedFormArray> {}

/**
 * @internal
 */
export type BeginRecognizeCustomFormPollerOptions = {
  client: RecognizeCustomFormPollerClient;
  source: FormRecognizerRequestBody | string;
  contentType?: FormContentType;
  modelId: string;
  updateIntervalInMs?: number;
  resultId?: string;
  onProgress?: (state: BeginRecognizeCustomFormPollState) => void;
  resumeFrom?: string;
} & RecognizeFormsOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginRecognizeCustomFormPoller extends Poller<
  BeginRecognizeCustomFormPollState,
  RecognizedFormArray
> {
  public updateIntervalInMs: number;

  constructor(options: BeginRecognizeCustomFormPollerOptions) {
    const {
      client,
      source,
      contentType,
      updateIntervalInMs = 5000,
      resultId,
      modelId,
      onProgress,
      resumeFrom
    } = options;

    let state: BeginRecognizeCustomFormPollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginRecognizePollOperation({
      ...state,
      client,
      source,
      contentType,
      resultId,
      modelId,
      status: "notStarted",
      analyzeOptions: options
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
function makeBeginRecognizePollOperation(
  state: BeginRecognizeCustomFormPollState
): BeginRecognizeCustomFormPollerOperation {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginRecognizeCustomFormPollerOperation> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginRecognizeCustomFormPollerOperation> {
      const state = this.state;
      const { client, source, contentType, analyzeOptions, modelId } = state;

      if (!state.isStarted) {
        if (!source) {
          throw new Error("Expect a valid 'source'");
        }

        state.isStarted = true;
        const result = await client.beginRecognize(
          source,
          modelId,
          contentType,
          analyzeOptions || {}
        );
        if (!result.operationLocation) {
          throw new Error("Expect a valid 'operationLocation' to retrieve analyze results");
        }
        const lastSlashIndex = result.operationLocation.lastIndexOf("/");
        state.resultId = result.operationLocation.substring(lastSlashIndex + 1);
        // source is no longer needed
        state.source = undefined;
      }

      const response = await client.getRecognizeResult(state.resultId!, {
        abortSignal: analyzeOptions?.abortSignal
      });

      state.status = response.status;
      if (!state.isCompleted) {
        if (typeof options.fireProgress === "function") {
          options.fireProgress(state);
        }

        if (response.status === "succeeded") {
          state.result = response.forms;
          state.isCompleted = true;
        } else if (response.status === "failed") {
          const errors = response.errors
            ?.map((e) => `  code ${e.code}, message: '${e.message}'`)
            .join("\n");
          const message = `Custom form recognition failed using model ${state.modelId}.
Error(s):
${errors || ""}
`;
          throw new Error(message);
        }
      }

      return makeBeginRecognizePollOperation(state);
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
