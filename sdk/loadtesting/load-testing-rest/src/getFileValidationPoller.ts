// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { AbortError } from "@azure/abort-controller";
import type { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import type { FileUploadAndValidatePoller, PolledOperationOptions } from "./models.js";
import type { AzureLoadTestingClient } from "./clientDefinitions.js";
import type { TestGetFile200Response, TestUploadFile201Response } from "./responses.js";
import { isUnexpected } from "./isUnexpected.js";
import { sleep } from "./util/LROUtil.js";

/**
 * Uploads a file and creates a poller to poll for validation.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function getFileValidationPoller(
  client: AzureLoadTestingClient,
  fileUploadResult: TestUploadFile201Response,
  polledOperationOptions: PolledOperationOptions = {},
): Promise<FileUploadAndValidatePoller> {
  // get filename and testid from initial response
  const fileName = fileUploadResult.body.fileName;
  const requestUrl = fileUploadResult.request.url;
  const testId = requestUrl.substring(
    requestUrl.indexOf("tests/") + 6,
    requestUrl.lastIndexOf("/files"),
  );
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
    async poll(options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      if (options?.abortSignal?.aborted) {
        throw new AbortError("The polling was aborted.");
      }

      if (fileName) {
        const fileValidationResponse = await client
          .path("/tests/{testId}/files/{fileName}", testId, fileName)
          .get();
        if (isUnexpected(fileValidationResponse)) {
          state.status = "failed";
          state.error = new Error(fileValidationResponse.body.error.message);
          return;
        }

        switch (fileValidationResponse.body.validationStatus) {
          case "NOT_VALIDATED": {
            state.status = "succeeded";
            break;
          }
          case "VALIDATION_INITIATED": {
            state.status = "running";
            break;
          }
          case "VALIDATION_SUCCESS":
          case "VALIDATION_NOT_REQUIRED": {
            state.status = "succeeded";
            break;
          }
          case "VALIDATION_FAILURE": {
            state.status = "failed";
            state.error = new Error(fileValidationResponse.body.validationFailureDetails);
            break;
          }
        }
        state.result = fileValidationResponse;

        await processProgressCallbacks();
      }
    },

    pollUntilDone(pollOptions?: {
      abortSignal?: AbortSignalLike;
    }): Promise<TestGetFile200Response> {
      return (resultPromise ??= (async () => {
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        // In the future we can use AbortSignal.any() instead
        function abortListener(): void {
          abortController.abort();
        }
        const abortSignal = abortController.signal;
        if (inputAbortSignal?.aborted) {
          abortController.abort();
        } else if (!abortSignal.aborted) {
          inputAbortSignal?.addEventListener("abort", abortListener, { once: true });
        }

        try {
          if (!poller.isDone()) {
            await poller.poll({ abortSignal });
            while (!poller.isDone()) {
              const delay = sleep(currentPollIntervalInMs, abortSignal);
              cancelJob = () => abortController.abort();
              await delay;
              await poller.poll({ abortSignal });
            }
          }
        } finally {
          inputAbortSignal?.removeEventListener("abort", abortListener);
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
      callback: (state: OperationState<TestGetFile200Response>) => void,
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
