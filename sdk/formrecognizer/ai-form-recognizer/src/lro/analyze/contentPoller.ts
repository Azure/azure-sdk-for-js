// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { RecognizeContentOptions } from "../../formRecognizerClient";
import { FormContentType } from "../../common";

import {
  GeneratedClientAnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel,
  OperationStatus
} from "../../generated/models";
import { FormRecognizerRequestBody, FormPageArray } from "../../models";
import { RecognizeContentResultResponse } from "../../internalModels";
export { OperationStatus };

export interface ContentPollerOperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * callback to receive events on the progress of download operation.
   */
  onProgress?: (state: BeginRecognizeContentPollState) => void;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type RecognizeContentPollerClient = {
  // returns a result id to retrieve results
  beginRecognize: (
    source: FormRecognizerRequestBody | string,
    contentType?: FormContentType,
    analyzeOptions?: RecognizeContentOptions
  ) => Promise<AnalyzeLayoutAsyncResponseModel>;
  // retrieves analyze result
  getRecognizeResult: (
    resultId: string,
    options: { abortSignal?: AbortSignalLike }
  ) => Promise<RecognizeContentResultResponse>;
};

export interface BeginRecognizeContentPollState extends PollOperationState<FormPageArray> {
  readonly client: RecognizeContentPollerClient;
  source?: FormRecognizerRequestBody | string;
  contentType?: FormContentType;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: RecognizeContentOptions;
}

export interface BeginRecognizeContentPollerOperation
  extends PollOperation<BeginRecognizeContentPollState, FormPageArray> {}

/**
 * @internal
 */
export type BeginRecognizeContentPollerOptions = {
  client: RecognizeContentPollerClient;
  source: FormRecognizerRequestBody | string;
  contentType?: FormContentType;
  updateIntervalInMs?: number;
  resultId?: string;
  onProgress?: (state: BeginRecognizeContentPollState) => void;
  resumeFrom?: string;
} & RecognizeContentOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class BeginRecognizeContentPoller extends Poller<
  BeginRecognizeContentPollState,
  FormPageArray
> {
  public updateIntervalInMs: number;

  constructor(options: BeginRecognizeContentPollerOptions) {
    const {
      client,
      source,
      contentType,
      updateIntervalInMs = 5000,
      resultId,
      onProgress,
      resumeFrom
    } = options;

    let state: BeginRecognizeContentPollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBeginRecognizePollOperation({
      ...state,
      client,
      source,
      contentType,
      resultId,
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
 * @internal
 * @hidden
 */
function makeBeginRecognizePollOperation(
  state: BeginRecognizeContentPollState
): BeginRecognizeContentPollerOperation {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<BeginRecognizeContentPollerOperation> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<BeginRecognizeContentPollerOperation> {
      const pollerState = this.state;
      const { client, source, contentType, analyzeOptions } = pollerState;

      if (!pollerState.isStarted) {
        if (!source) {
          throw new Error("Expect a valid 'source'");
        }

        pollerState.isStarted = true;
        const result = await client.beginRecognize(source, contentType, analyzeOptions || {});
        if (!result.operationLocation) {
          throw new Error("Expect a valid 'operationLocation' to retrieve analyze results");
        }
        const lastSlashIndex = result.operationLocation.lastIndexOf("/");
        pollerState.resultId = result.operationLocation.substring(lastSlashIndex + 1);
        // source is no longer needed
        pollerState.source = undefined;
      }

      const response = await client.getRecognizeResult(pollerState.resultId!, {
        abortSignal: analyzeOptions?.abortSignal
      });

      pollerState.status = response.status;
      if (!pollerState.isCompleted) {
        if (typeof options.fireProgress === "function") {
          options.fireProgress(pollerState);
        }

        if (response.status === "succeeded") {
          pollerState.result = response.pages;
          pollerState.isCompleted = true;
        } else if (response.status === "failed") {
          const errors = response.errors
            ?.map((e) => `  code ${e.code}, message: '${e.message}'`)
            .join("\n");
          const message = `Content recognition failed.
Error(s):
${errors || ""}
`;
          throw new Error(message);
        }
      }

      return makeBeginRecognizePollOperation(pollerState);
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
