// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { ExtractReceiptsOptions } from "../../receiptRecognizerClient";
import { ExtractLayoutOptions } from "../../layoutRecognizerClient";
import { ExtractFormsOptions } from "../../customRecognizerClient";
import { SupportedContentType } from '../../common';

import { OperationStatus } from "../../generated/models";
import { FormRecognizerRequestBody } from '../../models';
export { OperationStatus };

export type ExtractOptions = ExtractReceiptsOptions | ExtractLayoutOptions | ExtractFormsOptions;

export interface PollerOperationOptions<T> {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: BeginExtractPollState<T>) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type ExtractPollerClient<T> = {
  // returns a result id to retrieve results
  beginExtract: (body: FormRecognizerRequestBody, contentType: SupportedContentType, analyzeOptions: ExtractOptions, modelId?: string) => Promise<{ operationLocation: string }>;
  // retrieves analyze result
  getExtractResult: (
    resultId: string,
    options: { abortSignal?: AbortSignalLike }
  ) => Promise<T>;
};

export interface BeginExtractPollState<T> extends PollOperationState<T> {
  readonly client: ExtractPollerClient<T>;
  body?: FormRecognizerRequestBody;
  contentType: SupportedContentType;
  modelId?: string;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: ExtractOptions;
}

export interface BeginExtractPollerOperation<T>
extends PollOperation<BeginExtractPollState<T>, T> {}

/**
 * @internal
 */
export type BeginExtractPollerOptions<T> = {
  client: ExtractPollerClient<T>;
  body: FormRecognizerRequestBody;
  contentType: SupportedContentType;
  modelId?: string;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: BeginExtractPollState<T>) => void;
  resumeFrom?: string;
} & ExtractOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginExtractPoller<T extends { status: OperationStatus }> extends Poller<BeginExtractPollState<T>, T> {
  public intervalInMs: number;

  constructor(options: BeginExtractPollerOptions<T>) {
    const {
      client,
      body,
      contentType,
      intervalInMs = 1000,
      resultId,
      modelId,
      onProgress,
      resumeFrom
    } = options;

    let state: BeginExtractPollState<T> | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginExtractPollOperation({
      ...state,
      client,
      body,
      contentType,
      resultId,
      modelId,
      status: "notStarted",
      analyzeOptions: options
    }, );

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
function makeBeginExtractPollOperation<T extends { status: OperationStatus }> (
  state: BeginExtractPollState<T>,
): BeginExtractPollerOperation<T> {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginExtractPollerOperation<T>> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginExtractPollerOperation<T>> {
      const state = this.state;
      const { client, body, contentType, analyzeOptions, modelId } = state;

      if (!state.isStarted) {
        if (!body) {
          throw new Error("Expect a valid 'body'");
        }

        state.isStarted = true;
        const result = await client.beginExtract(body, contentType, analyzeOptions || {}, modelId);
        const lastSlashIndex = result.operationLocation.lastIndexOf("/");
        state.resultId = result.operationLocation.substring(lastSlashIndex + 1);
        // body is no longer needed
        state.body = undefined;
      }

      const response = await client.getExtractResult(state.resultId!, {
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

      return makeBeginExtractPollOperation(state);
    },

    toString() {
      return JSON.stringify({ state: this.state }, (key, value) => {
        if (key === "client" || key === "body") {
          return undefined;
        }
        return value;
      });
    }
  };
}
