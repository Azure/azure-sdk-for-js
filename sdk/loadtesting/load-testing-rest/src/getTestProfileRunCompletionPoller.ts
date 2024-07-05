// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortError, AbortSignalLike } from "@azure/abort-controller";
import { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import { TestProfileRunCompletionPoller, PolledOperationOptions } from "./models.js";
import { AzureLoadTestingClient } from "./clientDefinitions.js";
import {
  TestProfileRunAdministrationCreateOrUpdateTestProfileRun200Response,
  TestProfileRunAdministrationCreateOrUpdateTestProfileRun201Response,
  TestProfileRunAdministrationGetTestProfileRun200Response,
} from "./responses.js";
import { isUnexpected } from "./isUnexpected.js";
import { sleep, isTestProfileRunInProgress } from "./util/LROUtil.js";

/**
 * Creates a poller to poll for test profile run status.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function getTestProfileRunCompletionPoller(
  client: AzureLoadTestingClient,
  createTestProfileRunResponse:
    | TestProfileRunAdministrationCreateOrUpdateTestProfileRun200Response
    | TestProfileRunAdministrationCreateOrUpdateTestProfileRun201Response,
  polledOperationOptions: PolledOperationOptions = {},
): Promise<TestProfileRunCompletionPoller> {
  type Handler = (state: OperationState<TestProfileRunAdministrationGetTestProfileRun200Response>) => void;

  const state: OperationState<TestProfileRunAdministrationGetTestProfileRun200Response> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<TestProfileRunAdministrationGetTestProfileRun200Response> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;
  const testProfileRunId = createTestProfileRunResponse.body.testProfileRunId;

  const poller: SimplePollerLike<
    OperationState<TestProfileRunAdministrationGetTestProfileRun200Response>,
    TestProfileRunAdministrationGetTestProfileRun200Response
  > = {
    async poll(options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      if (options?.abortSignal?.aborted) {
        throw new AbortError("The polling was aborted.");
      }

      if (testProfileRunId) {
        const getTestProfileRunStatus = await client.path("/test-profile-runs/{testProfileRunId}", testProfileRunId).get();
        if (isUnexpected(getTestProfileRunStatus)) {
          state.status = "failed";
          state.error = new Error(getTestProfileRunStatus.body.error.message);
          return;
        }

        if (getTestProfileRunStatus.body.status === "FAILED") {
          state.status = "failed";
          state.error = new Error(getTestProfileRunStatus.body.status);
        }

        if (getTestProfileRunStatus.body.status === "CANCELLED") {
          state.status = "canceled";
        }

        if (getTestProfileRunStatus.body.status === "DONE") {
          state.status = "succeeded";
        }

        if (isTestProfileRunInProgress(getTestProfileRunStatus.body)) {
          state.status = "running";
        }

        state.result = getTestProfileRunStatus;
        await processProgressCallbacks();
      }
    },

    pollUntilDone(pollOptions?: {
      abortSignal?: AbortSignalLike;
    }): Promise<TestProfileRunAdministrationGetTestProfileRun200Response> {
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
            return poller.getResult() as TestProfileRunAdministrationGetTestProfileRun200Response;
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
      callback: (state: OperationState<TestProfileRunAdministrationGetTestProfileRun200Response>) => void,
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

    getOperationState(): OperationState<TestProfileRunAdministrationGetTestProfileRun200Response> {
      return state;
    },

    getResult(): TestProfileRunAdministrationGetTestProfileRun200Response | undefined {
      return state.result;
    },

    toString() {
      return JSON.stringify({ state });
    },
  };

  return poller;
}
