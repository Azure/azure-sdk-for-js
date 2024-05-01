// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { CancelOnProgress, OperationState, SimplePollerLike } from "@azure/core-lro";
import { NotificationHubJob, NotificationHubJobPoller } from "../models/notificationHubJob.js";
import { NotificationHubsClientContext } from "./index.js";
import { PolledOperationOptions } from "../models/options.js";
import { getNotificationHubJob } from "./getNotificationHubJob.js";
import { submitNotificationHubJob } from "./submitNotificationHubJob.js";

/**
 * Submits a Notification Hub job and creates a poller to poll for results.
 * @param context - The Notification Hubs client.
 * @param notificationHubJob - The Notification Hub import/export job to start.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function beginSubmitNotificationHubJob(
  context: NotificationHubsClientContext,
  notificationHubJob: NotificationHubJob,
  polledOperationOptions: PolledOperationOptions = {},
): Promise<NotificationHubJobPoller> {
  let submittedJob = await submitNotificationHubJob(
    context,
    notificationHubJob,
    polledOperationOptions,
  );

  type Handler = (state: OperationState<NotificationHubJob>) => void;

  const state: OperationState<NotificationHubJob> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<NotificationHubJob> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;

  const poller: SimplePollerLike<OperationState<NotificationHubJob>, NotificationHubJob> = {
    async poll(options?: { abortSignal?: AbortSignalLike }): Promise<void> {
      submittedJob = await getNotificationHubJob(context, submittedJob.jobId!, options);
      if (submittedJob.status === "Running" || submittedJob.status === "Started") {
        state.status = "running";
      }

      if (submittedJob.status === "Completed") {
        state.status = "succeeded";
        state.result = submittedJob;
      }

      if (submittedJob.status === "Failed") {
        state.status = "failed";
        state.error = new Error(submittedJob.failure);
      }

      await processProgressCallbacks();

      if (state.status === "canceled") {
        throw new Error("Operation was canceled");
      }
      if (state.status === "failed") {
        throw state.error;
      }
    },

    pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<NotificationHubJob> {
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
            return poller.getResult() as NotificationHubJob;
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

    onProgress(callback: (state: OperationState<NotificationHubJob>) => void): CancelOnProgress {
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

    getOperationState(): OperationState<NotificationHubJob> {
      return state;
    },

    getResult(): NotificationHubJob | undefined {
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
