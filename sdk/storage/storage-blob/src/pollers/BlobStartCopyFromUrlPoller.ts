// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { delay } from "@azure/core-http";
import { PollOperation, PollOperationState, Poller } from "@azure/core-lro";
import {
  BlobClient,
  BlobStartCopyFromURLOptions,
  BlobBeginCopyFromURLResponse
} from "../Clients";

/**
 * Defines the operations from a {@link BlobClient} that are needed for the poller
 * returned by {@link BlobClient.beginCopyFromURL} to work.
 */
export type CopyPollerBlobClient = Pick<BlobClient, "abortCopyFromURL" | "getProperties"> & {
  startCopyFromURL(
    copySource: string,
    options?: BlobStartCopyFromURLOptions
  ): Promise<BlobBeginCopyFromURLResponse>;
};

/**
 * The state used by the poller returned from {@link BlobClient.beginCopyFromURL}.
 *
 * This state is passed into the user-specified `onProgress` callback
 * whenever copy progress is detected.
 */
export interface BlobBeginCopyFromUrlPollState
  extends PollOperationState<BlobBeginCopyFromURLResponse> {
  /**
   * The instance of {@link BlobClient} that was used when calling {@link BlobClient.beginCopyFromURL}.
   */
  readonly blobClient: CopyPollerBlobClient;
  /**
   * The copyId that identifies the in-progress blob copy.
   */
  copyId?: string;
  /**
   * the progress of the blob copy as reported by the service.
   */
  copyProgress?: string;
  /**
   * The source URL provided in {@link BlobClient.beginCopyFromURL}.
   */
  copySource: string;
  /**
   * The options that were passed to the initial {@link BlobClient.beginCopyFromURL} call.
   * This is exposed for the poller and should not be modified directly.
   */
  readonly startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
}

/**
 * The PollOperation responsible for:
 *  - performing the initial startCopyFromURL
 *  - checking the copy status via getProperties
 *  - cancellation via abortCopyFromURL
 * @ignore
 */
export interface BlobBeginCopyFromURLPollOperation
  extends PollOperation<BlobBeginCopyFromUrlPollState, BlobBeginCopyFromURLResponse> {}

/**
 * The set of options used to configure the poller.
 * This is an internal interface populated by {@link BlobClient.beginCopyFromURL}.
 *
 * @ignore
 */
export interface BlobBeginCopyFromUrlPollerOptions {
  blobClient: CopyPollerBlobClient;
  copySource: string;
  intervalInMs?: number;
  onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
  resumeFrom?: string;
  startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
}

/**
 * This is the poller returned by {@link BlobClient.beginCopyFromURL}.
 * This can not be instantiated directly outside of this package.
 *
 * @ignore
 */
export class BlobBeginCopyFromUrlPoller extends Poller<
  BlobBeginCopyFromUrlPollState,
  BlobBeginCopyFromURLResponse
> {
  public intervalInMs: number;

  constructor(options: BlobBeginCopyFromUrlPollerOptions) {
    const {
      blobClient,
      copySource,
      intervalInMs = 15000,
      onProgress,
      resumeFrom,
      startCopyFromURLOptions
    } = options;

    let state: BlobBeginCopyFromUrlPollState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBlobBeginCopyFromURLPollOperation({
      ...state,
      blobClient,
      copySource,
      startCopyFromURLOptions
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

/**
 * Note: Intentionally using function expression over arrow function expression
 * so that the function can be invoked with a different context.
 * This affects what `this` refers to.
 * @ignore
 */
const cancel: BlobBeginCopyFromURLPollOperation["cancel"] = async function cancel(
  this: BlobBeginCopyFromURLPollOperation,
  options = {}
) {
  const state = this.state;
  const { copyId } = state;
  if (state.isCompleted) {
    return makeBlobBeginCopyFromURLPollOperation(state);
  }

  if (!copyId) {
    state.isCancelled = true;
    return makeBlobBeginCopyFromURLPollOperation(state);
  }

  // if abortCopyFromURL throws, it will bubble up to user's poller.cancelOperation call
  await state.blobClient.abortCopyFromURL(copyId, {
    abortSignal: options.abortSignal
  });
  state.isCancelled = true;

  return makeBlobBeginCopyFromURLPollOperation(state);
};

/**
 * Note: Intentionally using function expression over arrow function expression
 * so that the function can be invoked with a different context.
 * This affects what `this` refers to.
 * @ignore
 */
const update: BlobBeginCopyFromURLPollOperation["update"] = async function update(
  this: BlobBeginCopyFromURLPollOperation,
  options = {}
): Promise<BlobBeginCopyFromURLPollOperation> {
  const state = this.state;
  const { blobClient, copySource, startCopyFromURLOptions } = state;

  if (!state.isStarted) {
    state.isStarted = true;
    const result = await blobClient.startCopyFromURL(copySource, startCopyFromURLOptions);

    // copyId is needed to abort
    state.copyId = result.copyId;
    if (result.copyStatus === "success") {
      state.result = result;
      state.isCompleted = true;
    }
  } else if (!state.isCompleted) {
    try {
      const result = await state.blobClient.getProperties({ abortSignal: options.abortSignal });
      const { copyStatus, copyProgress } = result;
      const prevCopyProgress = state.copyProgress;
      if (copyProgress) {
        state.copyProgress = copyProgress;
      }
      if (
        copyStatus === "pending" &&
        copyProgress !== prevCopyProgress &&
        typeof options.fireProgress === "function"
      ) {
        // trigger in setTimeout, or swallow error?
        options.fireProgress(state);
      } else if (copyStatus === "success") {
        state.result = result;
        state.isCompleted = true;
      } else if (copyStatus === "failed") {
        state.error = new Error(
          `Blob copy failed with reason: "${result.copyStatusDescription || "unknown"}"`
        );
        state.isCompleted = true;
      }
    } catch (err) {
      state.error = err;
      state.isCompleted = true;
    }
  }

  return makeBlobBeginCopyFromURLPollOperation(state);
};

/**
 * Note: Intentionally using function expression over arrow function expression
 * so that the function can be invoked with a different context.
 * This affects what `this` refers to.
 * @ignore
 */
const toString: BlobBeginCopyFromURLPollOperation["toString"] = function toString(
  this: BlobBeginCopyFromURLPollOperation
) {
  return JSON.stringify({ state: this.state }, (key, value) => {
    // remove blobClient from serialized state since a client can't be hydrated from this info.
    if (key === "blobClient") {
      return undefined;
    }
    return value;
  });
};

/**
 * Creates a poll operation given the provided state.
 * @ignore
 */
function makeBlobBeginCopyFromURLPollOperation(
  state: BlobBeginCopyFromUrlPollState
): BlobBeginCopyFromURLPollOperation {
  return {
    state: { ...state },
    cancel,
    toString,
    update
  };
}
