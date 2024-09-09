// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import { TestRunCompletionPoller, PolledOperationOptions } from "./models";
import { AzureLoadTestingClient } from "../generated/clientDefinitions";
import {
  LoadTestRunCreateOrUpdateTestRun200Response,
  LoadTestRunCreateOrUpdateTestRun201Response,
  LoadTestRunGetTestRun200Response,
} from "../generated/responses";
import { isUnexpected } from "../generated/isUnexpected";
import { sleep, isTestRunInProgress } from "./util/LROUtil";

/**
 * Creates a poller to poll for test run status.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function getTestRunCompletionPoller(
  client: AzureLoadTestingClient,
  createTestRunResponse:
    | LoadTestRunCreateOrUpdateTestRun200Response
    | LoadTestRunCreateOrUpdateTestRun201Response,
  polledOperationOptions: PolledOperationOptions = {},
): Promise<TestRunCompletionPoller> {
  type Handler = (state: OperationState<LoadTestRunGetTestRun200Response>) => void;

  const state: OperationState<LoadTestRunGetTestRun200Response> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<LoadTestRunGetTestRun200Response> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;
  const testRunId = createTestRunResponse.body.testRunId;

  const poller: SimplePollerLike<
    OperationState<LoadTestRunGetTestRun200Response>,
    LoadTestRunGetTestRun200Response
  > = {
    async poll(options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      if (options?.abortSignal?.aborted) {
        throw new AbortError("The polling was aborted.");
      }

      if (testRunId) {
        const getTestRunResult = await client.path("/test-runs/{testRunId}", testRunId).get();
        if (isUnexpected(getTestRunResult)) {
          state.status = "failed";
          state.error = new Error(getTestRunResult.body.error.message);
          return;
        }

        if (getTestRunResult.body.status === "FAILED") {
          state.status = "failed";
          state.error = new Error(getTestRunResult.body.status);
        }

        if (getTestRunResult.body.status === "CANCELLED") {
          state.status = "canceled";
        }

        if (getTestRunResult.body.status === "DONE") {
          state.status = "succeeded";
        }

        if (isTestRunInProgress(getTestRunResult.body)) {
          state.status = "running";
        }
        state.result = getTestRunResult;
        await processProgressCallbacks();
      }
    },

    pollUntilDone(pollOptions?: {
      abortSignal?: AbortSignalLike;
    }): Promise<LoadTestRunGetTestRun200Response> {
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
            return poller.getResult() as LoadTestRunGetTestRun200Response;
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
      callback: (state: OperationState<LoadTestRunGetTestRun200Response>) => void,
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

    getOperationState(): OperationState<LoadTestRunGetTestRun200Response> {
      return state;
    },

    getResult(): LoadTestRunGetTestRun200Response | undefined {
      return state.result;
    },

    toString() {
      return JSON.stringify({ state });
    },
  };

  return poller;
}
