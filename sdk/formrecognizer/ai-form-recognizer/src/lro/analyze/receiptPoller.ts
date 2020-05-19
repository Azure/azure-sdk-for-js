// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import {
  RecognizeReceiptsOptions,
} from "../../formRecognizerClient";

import {
  GeneratedClientAnalyzeReceiptAsyncResponse as AnalyzeReceiptAsyncResponseModel,
  OperationStatus,
  ContentType } from "../../generated/models";
import { FormRecognizerRequestBody, RecognizedReceiptArray } from "../../models";
import { RecognizeReceiptResultResponse } from "../../internalModels";
export { OperationStatus };

export interface ReceiptPollerOperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: BeginRecognizeReceiptPollState) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type RecognizeReceiptPollerClient = {
  // returns a result id to retrieve results
  beginRecognize: (
    source: FormRecognizerRequestBody | string,
    contentType?: ContentType,
    analyzeOptions?: RecognizeReceiptsOptions,
    modelId?: string
  ) => Promise<AnalyzeReceiptAsyncResponseModel>;
  // retrieves analyze result
  getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) => Promise<RecognizeReceiptResultResponse>;
};

export interface BeginRecognizeReceiptPollState extends PollOperationState<RecognizedReceiptArray> {
  readonly client: RecognizeReceiptPollerClient;
  source?: FormRecognizerRequestBody | string;
  contentType?: ContentType;
  modelId?: string;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: RecognizeReceiptsOptions;
}

export interface BeginRecognizeReceiptPollerOperation
extends PollOperation<BeginRecognizeReceiptPollState, RecognizedReceiptArray> {}

/**
 * @internal
 */
export type BeginRecognizeReceiptPollerOptions = {
  client: RecognizeReceiptPollerClient;
  source: FormRecognizerRequestBody | string;
  contentType?: ContentType;
  modelId?: string;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: BeginRecognizeReceiptPollState) => void;
  resumeFrom?: string;
} & RecognizeReceiptsOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginRecognizeReceiptPoller extends Poller<
  BeginRecognizeReceiptPollState,
  RecognizedReceiptArray
> {
  public intervalInMs: number;

  constructor(options: BeginRecognizeReceiptPollerOptions) {
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

    let state: BeginRecognizeReceiptPollState | undefined;

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
function makeBeginRecognizePollOperation(
  state: BeginRecognizeReceiptPollState
): BeginRecognizeReceiptPollerOperation {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginRecognizeReceiptPollerOperation> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginRecognizeReceiptPollerOperation> {
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
        if (
          (response.status === "running" || response.status === "notStarted") &&
          typeof options.fireProgress === "function"
        ) {
          options.fireProgress(state);
        } else if (response.status === "succeeded") {
          state.result = response.receipts;
          state.isCompleted = true;
        } else if (response.status === "failed") {
          throw new Error(`Recognition failed ${response._response.bodyAsText}`);
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
