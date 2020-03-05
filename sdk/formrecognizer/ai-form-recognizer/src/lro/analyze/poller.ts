// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, HttpRequestBody, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { ExtractReceiptOptions } from "../../receiptRecognizerClient";
import { ExtractLayoutOptions } from "../../layoutRecognizerClient";
import { ExtractCustomFormOptions } from "../../customRecognizerClient";
import { AnalyzeLayoutResultResponse, AnalyzeReceiptResultResponse } from "../../models";
import { GetAnalyzeFormResultResponse, OperationStatus } from "../../generated/models";
import { SupportedContentType } from '../../common';

export type StartAnalyzeOptions = ExtractReceiptOptions | ExtractLayoutOptions | ExtractCustomFormOptions;

export type ResultResponse = AnalyzeReceiptResultResponse | AnalyzeLayoutResultResponse | GetAnalyzeFormResultResponse;

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type AnalyzePollerClient = {
  // returns a result id to retrieve results
  startAnalyze: (body: HttpRequestBody, contentType: SupportedContentType, analyzeOptions: StartAnalyzeOptions) => Promise<{ operationLocation: string }>;
  // retrieves analyze result
  getAnalyzeResult: (
    resultId: string,
    options: { abortSignal?: AbortSignalLike }
  ) => Promise<ResultResponse>;
};

export interface StartAnalyzePollState extends PollOperationState<ResultResponse> {
  readonly client: AnalyzePollerClient;
  body?: HttpRequestBody;
  contentType: SupportedContentType;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: StartAnalyzeOptions;
}

export interface StartAnalyzePollerOperation
extends PollOperation<StartAnalyzePollState, ResultResponse> {}

export interface StartAnalyzePollerOptions {
  client: AnalyzePollerClient;
  body: HttpRequestBody;
  contentType: SupportedContentType;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: StartAnalyzePollState) => void;
  resumeFrom?: string;
  analyzeOptions?: StartAnalyzeOptions;
}

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class StartAnalyzePoller extends Poller<StartAnalyzePollState, ResultResponse> {
  public intervalInMs: number;

  constructor(options: StartAnalyzePollerOptions) {
    const {
      client,
      body,
      contentType,
      intervalInMs = 1000,
      resultId,
      onProgress,
      resumeFrom,
      analyzeOptions
    } = options;

    let state: StartAnalyzePollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeStartAnalyzePollOperation({
      ...state,
      client,
      body,
      contentType,
      resultId,
      status: "notStarted",
      analyzeOptions
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

const cancel: StartAnalyzePollerOperation["cancel"] = async function cancel(
  this: StartAnalyzePollerOperation,
  _options = {}
): Promise<StartAnalyzePollerOperation> {
  throw new Error("Cancel operation is not supported.");
};

const update: StartAnalyzePollerOperation["update"] = async function update(
  this: StartAnalyzePollerOperation,
  options = {}
): Promise<StartAnalyzePollerOperation> {
  const state = this.state;
  const { client, body, contentType, analyzeOptions } = state;

  if (!state.isStarted && body) {
    state.isStarted = true;
    const result = await client.startAnalyze(body, contentType, analyzeOptions || {});
    const lastSlashIndex = result.operationLocation.lastIndexOf("/");
    state.resultId = result.operationLocation.substring(lastSlashIndex + 1);
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
};

const toString: StartAnalyzePollerOperation["toString"] = function toString(
  this: StartAnalyzePollerOperation
) {
  return JSON.stringify({ state: this.state }, (key, value) => {
    if (key === "client" || key === "body") {
      return undefined;
    }
    return value;
  });
};

/**
 * Creates a poll operation given the provided state.
 * @ignore
 */
function makeStartAnalyzePollOperation(
  state: StartAnalyzePollState
): StartAnalyzePollerOperation {
  return {
    state: { ...state },
    cancel,
    toString,
    update
  };
}
