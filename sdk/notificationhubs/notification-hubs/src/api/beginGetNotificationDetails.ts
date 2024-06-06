// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-util";
import { getNotificationOutcomeDetails } from "./getNotificationOutcomeDetails.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { logger } from "../utils/log.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { CancelOnProgress, OperationState, PollerLike } from "@azure/core-lro";
import type {
  NotificationDetails,
  NotificationDetailsPoller,
  NotificationOutcomeState,
} from "../models/notificationDetails.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { PolledOperationOptions } from "../models/options.js";

/**
 * Gets the details of a notification outcome as a long running operation.  This API can only be called for Standard SKU and above.
 * @param context - The Notification Hubs client.
 * @param notificationId - The Notification ID used to get the notification details.
 * @param polledOperationOptions - The operation options.
 * @returns A poller which can be called to poll until completion of the getting the notification details.
 */
export async function beginGetNotificationDetails(
  context: NotificationHubsClientContext,
  notificationId: string,
  polledOperationOptions: PolledOperationOptions = {},
): Promise<NotificationDetailsPoller> {
  let outcomeState: NotificationOutcomeState = "Enqueued";
  let result: NotificationDetails | undefined;
  let outcomeError: unknown | undefined;
  type Handler = (state: OperationState<NotificationDetails>) => void;

  const state: OperationState<NotificationDetails> = {
    status: "notStarted",
  };

  const progressCallbacks = new Map<symbol, Handler>();
  const processProgressCallbacks = async (): Promise<void> =>
    progressCallbacks.forEach((h) => h(state));
  let resultPromise: Promise<NotificationDetails> | undefined;
  const abortController = new AbortController();
  const currentPollIntervalInMs = polledOperationOptions.updateIntervalInMs ?? 2000;

  const poller: PollerLike<OperationState<NotificationDetails>, NotificationDetails> = {
    async poll(options?: {
      abortSignal?: AbortSignalLike;
    }): Promise<OperationState<NotificationDetails>> {
      try {
        result = await getNotificationOutcomeDetails(context, notificationId, options);
        outcomeState = result.state!;
      } catch (e: unknown) {
        // Possible to get 404 for when it doesn't exist yet.
        if (isRestError(e) && e.statusCode === 404) {
          logger.info(
            `Notification outcome details not found yet for notificationId: ${notificationId}`,
          );
        } else {
          outcomeError = e;
        }
      }

      if (outcomeState === "Enqueued" || outcomeState === "Processing") {
        state.status = "running";
      }

      if (outcomeState === "Completed" || outcomeState === "DetailedStateAvailable") {
        state.status = "succeeded";
        state.result = result;
      }

      if (outcomeState === "Cancelled") {
        state.status = "canceled";
      }

      if (outcomeState === "Abandoned") {
        state.status = "failed";
        state.error = new Error(`Notification outcome failed with state: ${outcomeState}`);
      }

      await processProgressCallbacks();

      if (state.status === "canceled") {
        throw new Error("Operation was canceled");
      }

      if (state.status === "failed") {
        throw state.error;
      }

      if (outcomeError) {
        throw outcomeError;
      }

      return state;
    },

    pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<NotificationDetails> {
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
          if (!poller.isDone) {
            await poller.poll({ abortSignal });
            while (!poller.isDone) {
              await delay(currentPollIntervalInMs, { abortSignal });
              await poller.poll({ abortSignal });
            }
          }
        } finally {
          inputAbortSignal?.removeEventListener("abort", abortListener);
        }
        switch (state.status) {
          case "succeeded":
            return poller.result as NotificationDetails;
          case "canceled":
            throw new Error("Operation was canceled");
          case "failed":
            throw state.error;
          case "notStarted":
          case "running":
            throw new Error(`Polling completed without succeeding or failing`);
        }
      })().finally(() => {
        resultPromise = undefined;
      }));
    },

    onProgress(callback: (state: OperationState<NotificationDetails>) => void): CancelOnProgress {
      const s = Symbol();
      progressCallbacks.set(s, callback);

      return () => progressCallbacks.delete(s);
    },

    get isDone(): boolean {
      return ["succeeded", "failed", "canceled"].includes(state.status);
    },

    get operationState(): OperationState<NotificationDetails> | undefined {
      return state;
    },

    get result(): NotificationDetails | undefined {
      return state.result;
    },

    async serialize(): Promise<string> {
      return JSON.stringify({ state });
    },

    async submitted() {
      // No-op
      return;
    },

    then<TResult1 = NotificationDetails, TResult2 = never>(
      onfulfilled?:
        | ((value: NotificationDetails) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2> {
      return poller.pollUntilDone().then(onfulfilled, onrejected);
    },
    catch<TResult2 = never>(
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<NotificationDetails | TResult2> {
      return poller.pollUntilDone().catch(onrejected);
    },
    finally(onfinally?: (() => void) | undefined | null): Promise<NotificationDetails> {
      return poller.pollUntilDone().finally(onfinally);
    },
    [Symbol.toStringTag]: "Poller",
  };

  return poller;
}
