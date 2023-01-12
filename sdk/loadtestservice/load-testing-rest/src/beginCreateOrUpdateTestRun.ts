// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import { v4 as uuidv4 } from "uuid";
import { TestRunStatusPoller, PolledOperationOptions } from "./models";
import { AzureLoadTestingClient } from "./index.js";
import { TestRunGet200Response } from "./responses";
import { isUnexpected } from "./isUnexpected";

/**
 * Creates a poller to poll for test run status.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function beginTestRun(
  client: AzureLoadTestingClient,
  testId: string,
  displayName: string,
  polledOperationOptions: PolledOperationOptions = {}
): Promise<TestRunStatusPoller> {
  const testRunId = uuidv4(); // ID to be assigned to a testRun
 // Creating the test run
  const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      virtualUsers: 10,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  if (testRunCreationResult.body.testRunId === undefined)
    throw new Error("Test Run ID returned as undefined.");

  type Handler = (state: OperationState<TestRunGet200Response>) => void;

  const state: OperationState<TestRunGet200Response> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<TestRunGet200Response> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;

  const poller: SimplePollerLike<OperationState<TestRunGet200Response>, TestRunGet200Response> = {
    async poll(_options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      let getTestRunResult = await client.path("/test-runs/{testRunId}", testRunId).get();
      if (isUnexpected(getTestRunResult)) {
        throw getTestRunResult.body.error;
      }

      if (getTestRunResult.body.status === "FAILED") {
        state.status = "failed";
        state.error = new Error(getTestRunResult.body.status);
      }

      if (
        getTestRunResult.body.status === "CANCELLING" ||
        getTestRunResult.body.status === "CANCELLED"
      ) {
        state.status === "canceled";
      }

      if (getTestRunResult.body.status === "DONE") {
        state.status = "succeeded";
        state.result = getTestRunResult;
      }

      await processProgressCallbacks();

      if (state.status === "canceled") {
        throw new Error("Operation was canceled");
      }
      if (state.status === "failed") {
        throw state.error;
      }
    },

    pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<TestRunGet200Response> {
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
            return poller.getResult() as TestRunGet200Response;
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

    onProgress(callback: (state: OperationState<TestRunGet200Response>) => void): CancelOnProgress {
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

    getOperationState(): OperationState<TestRunGet200Response> {
      return state;
    },

    getResult(): TestRunGet200Response | undefined {
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
