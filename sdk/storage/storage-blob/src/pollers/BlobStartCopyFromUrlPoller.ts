import { delay } from "@azure/core-http";
import { PollOperation, PollOperationState, Poller } from "@azure/core-lro";
import { BlobStartCopyFromURLResponse } from "../generated/src/models";
import { BlobClient, BlobStartCopyFromURLOptions } from "../BlobClient";

/**
 * Defines the operations needed from a BlobClient.
 */
export type CopyPollerBlobClient = Pick<BlobClient, "abortCopyFromURL" | "getProperties"> & {
  startCopyFromURL(
    copySource: string,
    options?: BlobStartCopyFromURLOptions
  ): Promise<BlobStartCopyFromURLResponse>;
};

/**
 * The state used by the PollOperation.
 */
export interface BlobBeginCopyFromUrlPollState
  extends PollOperationState<BlobStartCopyFromURLResponse> {
  blobClient: CopyPollerBlobClient;
  copyId?: string;
  copyProgress?: string;
  copySource: string;
  startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
}

/**
 * The PollOperation responsible for:
 *  - performing the initial startCopyFromURL
 *  - checking the copy status via getProperties
 *  - cancellation via abortCopyFromURL
 */
export interface BlobBeginCopyFromURLPollOperation
  extends PollOperation<BlobBeginCopyFromUrlPollState, BlobStartCopyFromURLResponse> {}

/**
 *
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
 *
 */
export class BlobBeginCopyFromUrlPoller extends Poller<
  BlobBeginCopyFromUrlPollState,
  BlobStartCopyFromURLResponse
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

  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}

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

  try {
    await state.blobClient.abortCopyFromURL(copyId, {
      abortSignal: options.abortSignal
    });
    state.isCancelled = true;
  } catch (err) {
    // swallow error
  }

  return makeBlobBeginCopyFromURLPollOperation(state);
};

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
      const result = await state.blobClient.getProperties();
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
 *
 * @param state
 */
function makeBlobBeginCopyFromURLPollOperation(
  state: BlobBeginCopyFromUrlPollState
): BlobBeginCopyFromURLPollOperation {
  return {
    state: { ...state },
    cancel,
    toString() {
      return JSON.stringify({ state: this.state });
    },
    update
  };
}
