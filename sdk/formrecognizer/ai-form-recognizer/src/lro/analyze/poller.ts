// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import {
  RecognizeFormsOptions,
  RecognizeContentOptions,
  RecognizeReceiptsOptions
} from "../../formRecognizerClient";

import { OperationStatus, ContentType } from "../../generated/models";
import { FormRecognizerRequestBody } from "../../models";
export { OperationStatus };

export type RecognizeOptions =
  | RecognizeReceiptsOptions
  | RecognizeContentOptions
  | RecognizeFormsOptions;

export interface PollerOperationOptions<T> {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: BeginRecognizePollState<T>) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type RecognizePollerClient<T> = {
  // returns a result id to retrieve results
  beginRecognize: (
    source: FormRecognizerRequestBody,
    contentType?: ContentType,
    analyzeOptions?: RecognizeOptions,
    modelId?: string
  ) => Promise<{ operationLocation?: string }>;
  // retrieves analyze result
  getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) => Promise<T>;
};

export interface BeginRecognizePollState<T> extends PollOperationState<T> {
  readonly client: RecognizePollerClient<T>;
  source?: FormRecognizerRequestBody;
  contentType?: ContentType;
  modelId?: string;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: RecognizeOptions;
}

export interface BeginRecognizePollerOperation<T>
  extends PollOperation<BeginRecognizePollState<T>, T> {}

/**
 * @internal
 */
export type BeginRecognizePollerOptions<T> = {
  client: RecognizePollerClient<T>;
  source: FormRecognizerRequestBody | string;
  contentType?: ContentType;
  modelId?: string;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: BeginRecognizePollState<T>) => void;
  resumeFrom?: string;
} & RecognizeOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginRecognizePoller<T extends { status: OperationStatus }> extends Poller<
  BeginRecognizePollState<T>,
  T
> {
  public intervalInMs: number;

  constructor(options: BeginRecognizePollerOptions<T>) {
    const {
      client,
      source,
      contentType,
      intervalInMs = 5000,
      resultId,
      modelId,
      onProgress,
      resumeFrom
    } = options;

    let state: BeginRecognizePollState<T> | undefined;

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
function makeBeginRecognizePollOperation<T extends { status: OperationStatus }>(
  state: BeginRecognizePollState<T>
): BeginRecognizePollerOperation<T> {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginRecognizePollerOperation<T>> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginRecognizePollerOperation<T>> {
      const state = this.state;
      const { client, source, contentType, analyzeOptions, modelId } = state;

      if (!state.isStarted) {
        if (!source) {
          throw new Error("Expect a valid 'source'");
        }

        state.isStarted = true;
        const result = await client.beginRecognize(
          source,
          contentType,
          analyzeOptions || {},
          modelId
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
        if (response.status === "running" && typeof options.fireProgress === "function") {
          options.fireProgress(state);
        } else if (response.status === "succeeded") {
          state.result = response;
          state.isCompleted = true;
        } else if (response.status === "failed") {
          state.error = new Error(`Model training failed with invalid model status.`);
          state.isCompleted = true;
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
