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
  if (state.completed) {
    return makeBlobBeginCopyFromURLPollOperation(state);
  }

  if (!copyId) {
    state.cancelled = true;
    return makeBlobBeginCopyFromURLPollOperation(state);
  }

  try {
    // TODO: Support abort options
    await state.blobClient.abortCopyFromURL(copyId, {
      abortSignal: options.abortSignal
    });
    state.cancelled = true;
  } catch (err) {
    // Not sure what to do in this case... treat as not cancelled?
  }

  return makeBlobBeginCopyFromURLPollOperation(state);
};

const update: BlobBeginCopyFromURLPollOperation["update"] = async function update(
  this: BlobBeginCopyFromURLPollOperation,
  options = {}
): Promise<BlobBeginCopyFromURLPollOperation> {
  const state = this.state;
  const { blobClient, copySource, startCopyFromURLOptions } = state;

  // TODO: Logic when state isn't started
  if (!state.started) {
    state.started = true;
    const result = await blobClient.startCopyFromURL(copySource, startCopyFromURLOptions);

    // copyId is needed to abort
    state.copyId = result.copyId;
    if (result.copyStatus === "success") {
      state.result = result;
      state.completed = true;
    }
    // TODO: Check other statuses?
  } else if (!state.completed) {
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
        state.completed = true;
      } else if (copyStatus === "failed") {
        state.error = new Error(
          `Blob copy failed with reason: "${result.copyStatusDescription || "unknown"}"`
        );
        state.completed = true;
      }
    } catch (err) {
      // how should we handle transient errors?
      state.error = err;
      state.completed = true;
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
