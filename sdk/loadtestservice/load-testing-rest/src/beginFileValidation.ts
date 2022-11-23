// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import { FileUploadAndValidatePoller, PolledOperationOptions } from "./models";
import { AzureLoadTestingClient } from "./index.js";
import { TestUploadFile201Response } from "./responses";
import { isUnexpected } from "./isUnexpected";
import { ReadStream } from "fs";

/**
 * Submits a Notification Hub job and creates a poller to poll for results.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function beginFileValidation(
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
  let fileValidationResponse: TestUploadFile201Response;

  type Handler = (state: OperationState<TestUploadFile201Response>) => void;

  const state: OperationState<TestUploadFile201Response> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<TestUploadFile201Response> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;

  const poller: SimplePollerLike<
    OperationState<TestUploadFile201Response>,
    TestUploadFile201Response
  > = {
    async poll(_options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      await client.path("/tests/{testId}/files/{fileName}", testId, fileName).get();
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

      if (state.status === "canceled") {
        throw new Error("Operation was canceled");
      }
      if (state.status === "failed") {
        throw state.error;
      }
    },

    pollUntilDone(pollOptions?: {
      abortSignal?: AbortSignalLike;
    }): Promise<TestUploadFile201Response> {
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
          case "succeeded": {
            return poller.getResult() as TestUploadFile201Response;
          }
          case "canceled": {
            throw new Error("Operation was canceled");
          }
          case "failed": {
            throw state.error;
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
      callback: (state: OperationState<TestUploadFile201Response>) => void
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

    getOperationState(): OperationState<TestUploadFile201Response> {
      return state;
    },

    getResult(): TestUploadFile201Response | undefined {
      return state.result;
    },

    toString() {
      return JSON.stringify({ state });
    },
  };

  return poller;
}

const REJECTED_ERR = new Error("The operation has been aborted");

function sleep(ms: number, signal: AbortSignalLike): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(REJECTED_ERR);
      return;
    }

    const id = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);

      if (signal.aborted) {
        reject(REJECTED_ERR);
        return;
      }

      resolve();
    }, ms);

    signal.addEventListener("abort", onAbort, { once: true });

    function onAbort(): void {
      clearTimeout(id);
      reject(REJECTED_ERR);
    }
  });
}
