// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import { FileUploadAndValidatePoller, PolledOperationOptions } from "./models";
import { AzureLoadTestingClient } from "./index.js";
import { TestGetFile200Response } from "./responses";
import { isUnexpected } from "./isUnexpected";
import { ReadStream } from "fs";
import { sleep } from "./util/sleepLROUtility";

/**
 * Uploads a file and creates a poller to poll for validation.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function beginUploadTestFile(
  client: AzureLoadTestingClient,
  testId: string,
  fileName: string,
  file: ReadStream,
  polledOperationOptions: PolledOperationOptions = {}
): Promise<FileUploadAndValidatePoller> {
  const fileUploadResult = await client
    .path("/tests/{testId}/files/{fileName}", testId, fileName)
    .put({
      contentType: "application/octet-stream",
      body: file,
    });

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }

  type Handler = (state: OperationState<TestGetFile200Response>) => void;

  const state: OperationState<TestGetFile200Response> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<TestGetFile200Response> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;

  const poller: SimplePollerLike<OperationState<TestGetFile200Response>, TestGetFile200Response> = {
    async poll(_options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      let fileValidationResponse = await client
        .path("/tests/{testId}/files/{fileName}", testId, fileName)
        .get();
      if (isUnexpected(fileValidationResponse)) {
        throw fileValidationResponse.body.error;
      }
      if (
        fileValidationResponse.body.validationStatus === "VALIDATION_INITIATED" ||
        fileValidationResponse.body.validationStatus === "NOT_VALIDATED"
      ) {
        state.status = "running";
      }

      if (
        fileValidationResponse.body.validationStatus === "VALIDATION_SUCCESS" ||
        fileValidationResponse.body.validationStatus === "VALIDATION_NOT_REQUIRED"
      ) {
        state.status = "succeeded";
        state.result = fileValidationResponse;
      }

      if (fileValidationResponse.body.validationStatus === "VALIDATION_FAILURE") {
        state.status = "failed";
        state.error = new Error(fileValidationResponse.body.validationStatus);
      }

      await processProgressCallbacks();

    },

    pollUntilDone(pollOptions?: {
      abortSignal?: AbortSignalLike;
    }): Promise<TestGetFile200Response> {
      return (resultPromise ??= (async () => {
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        const { signal: abortSignal } = inputAbortSignal
          ? new AbortController([inputAbortSignal, abortController.signal])
          : abortController;
        if (!poller.isDone()) {
          await poller.poll({ abortSignal });
          while (!poller.isDone()) {
            const delay = sleep(currentPollIntervalInMs, abortSignal);
            cancelJob = () => abortController.abort();
            await delay;
            await poller.poll({ abortSignal });
          }
        }
        switch (state.status) {
          case "succeeded":
          case "failed":
          case "canceled": {
            return poller.getResult() as TestGetFile200Response;
          }
          case "notStarted":
          case "running": {
            // Unreachable
            throw new Error(`polling completed without succeeding or failing`);
          }
        }
      })().finally(() => {
        resultPromise = undefined;
      }));
    },

    onProgress(
      callback: (state: OperationState<TestGetFile200Response>) => void
    ): CancelOnProgress {
      const s = Symbol();
      progressCallbacks.set(s, callback);

      return () => progressCallbacks.delete(s);
    },

    isDone(): boolean {
      return ["succeeded", "failed", "canceled"].includes(state.status);
    },

    stopPolling(): void {
      abortController.abort();
      cancelJob?.();
    },

    isStopped(): boolean {
      return resultPromise === undefined;
    },

    getOperationState(): OperationState<TestGetFile200Response> {
      return state;
    },

    getResult(): TestGetFile200Response | undefined {
      return state.result;
    },

    toString() {
      return JSON.stringify({ state });
    },
  };

  return poller;
}
