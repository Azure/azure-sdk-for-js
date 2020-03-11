// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, HttpRequestBody, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { ExtractReceiptOptions } from "../../receiptRecognizerClient";
import { ExtractLayoutOptions } from "../../layoutRecognizerClient";
import { ExtractCustomFormOptions } from "../../customRecognizerClient";
import { SupportedContentType } from '../../common';

import { OperationStatus } from "../../generated/models";
export { OperationStatus };

export type AnalyzeOptions = ExtractReceiptOptions | ExtractLayoutOptions | ExtractCustomFormOptions;

export interface PollerOperationOptions<T> {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: StartAnalyzePollState<T>) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines an interface to query for operation status
 * @internal
 */
export interface ICanHazStatus { status: OperationStatus }

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type AnalyzePollerClient<T> = {
  // returns a result id to retrieve results
  startAnalyze: (body: HttpRequestBody, contentType: SupportedContentType, analyzeOptions: AnalyzeOptions, modelId?: string) => Promise<{ operationLocation: string }>;
  // retrieves analyze result
  getAnalyzeResult: (
    resultId: string,
    options: { abortSignal?: AbortSignalLike }
  ) => Promise<T>;
};

export interface StartAnalyzePollState<T> extends PollOperationState<T> {
  readonly client: AnalyzePollerClient<T>;
  body?: HttpRequestBody;
  contentType: SupportedContentType;
  modelId?: string;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: AnalyzeOptions;
}

export interface StartAnalyzePollerOperation<T>
extends PollOperation<StartAnalyzePollState<T>, T> {}

/**
 * @internal
 */
export type StartAnalyzePollerOptions<T> = {
  client: AnalyzePollerClient<T>;
  body: HttpRequestBody;
  contentType: SupportedContentType;
  modelId?: string;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: StartAnalyzePollState<T>) => void;
  resumeFrom?: string;
} & AnalyzeOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class StartAnalyzePoller<T extends ICanHazStatus> extends Poller<StartAnalyzePollState<T>, T> {
  public intervalInMs: number;

  constructor(options: StartAnalyzePollerOptions<T>) {
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

    let state: StartAnalyzePollState<T> | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeStartAnalyzePollOperation({
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
function makeStartAnalyzePollOperation<T extends ICanHazStatus> (
  state: StartAnalyzePollState<T>,
): StartAnalyzePollerOperation<T> {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<StartAnalyzePollerOperation<T>> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<StartAnalyzePollerOperation<T>> {
      const state = this.state;
      const { client, body, contentType, analyzeOptions, modelId } = state;

      if (!state.isStarted) {
        if (!body) {
          throw new Error("Expect a valid 'body'");
        }

        state.isStarted = true;
        const result = await client.startAnalyze(body, contentType, analyzeOptions || {}, modelId);
        const lastSlashIndex = result.operationLocation.lastIndexOf("/");
        state.resultId = result.operationLocation.substring(lastSlashIndex + 1);
        // body is no longer needed
        state.body = undefined;
      }

      const response = await client.getAnalyzeResult(state.resultId!, {
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

      return makeStartAnalyzePollOperation(state);
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
