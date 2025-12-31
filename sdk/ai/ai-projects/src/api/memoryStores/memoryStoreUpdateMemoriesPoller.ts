// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  MemoryStoreUpdateResult,
  MemoryStoreUpdateStatus,
  MemoryStoreUpdateResponse,
  memoryStoreUpdateResponseDeserializer,
  MemoryStoreOperationUsage,
} from "../../models/models.js";
import {
  PollerLike,
  OperationState,
  createHttpPoller,
  RunningOperation,
  OperationResponse,
} from "@azure/core-lro";
import { AbortSignalLike } from "@azure/abort-controller";
import { PathUncheckedResponse, createRestError } from "@azure-rest/core-client";

/** State of the Memory Store update operation. */
export type MemoryStoreUpdateOperationState = OperationState<MemoryStoreUpdateResult> & {
  /** The ID of the memory store update operation. */
  updateId: string;
  /** The status of the memory store update operation. */
  updateStatus: MemoryStoreUpdateStatus;
  /** The ID of the memory store update operation that superseded this one, if any. */
  supersededBy?: string;
};

/** Custom LROPoller for Memory Store update operations. */
export type MemoryStoreUpdateMemoriesPoller = PollerLike<
  MemoryStoreUpdateOperationState,
  MemoryStoreUpdateResult
> & {
  /** The ID of the memory store update operation. */
  readonly updateId: string;
  /** The status of the memory store update operation. */
  readonly updateStatus: MemoryStoreUpdateStatus;
  /** The ID of the memory store update operation that superseded this one, if any. */
  readonly supersededBy?: string;
};

/** Options for creating a MemoryStoreUpdateMemoriesPoller. */
export interface CreateMemoryStoreUpdateMemoriesPollerOptions {
  /** Interval in milliseconds between update polls */
  updateIntervalInMs?: number;
  /** An abort signal to cancel the poller */
  abortSignal?: AbortSignalLike;
  /** Used to restore poller from a serialized state */
  restoreFrom?: string;
}

const nonFailureTerminalUpdateStatuses: MemoryStoreUpdateStatus[] = ["completed", "superseded"];

function createDefaultUsage(): MemoryStoreOperationUsage {
  return {
    embedding_tokens: 0,
    input_tokens: 0,
    input_tokens_details: { cached_tokens: 0 },
    output_tokens: 0,
    output_tokens_details: { reasoning_tokens: 0 },
    total_tokens: 0,
  };
}

function toOperationResponse(
  response: PathUncheckedResponse,
  expectedStatuses: string[],
): OperationResponse<PathUncheckedResponse> {
  if (!expectedStatuses.includes(response.status)) {
    throw createRestError(response);
  }

  return {
    flatResponse: response,
    rawResponse: {
      ...response,
      statusCode: Number.parseInt(response.status),
      body: response.body,
    },
  };
}

function deserializeUpdateResponse(
  response: PathUncheckedResponse,
): MemoryStoreUpdateResponse | undefined {
  try {
    return memoryStoreUpdateResponseDeserializer(response.body);
  } catch {
    return undefined;
  }
}

function applyUpdateState(
  state: MemoryStoreUpdateOperationState,
  response: PathUncheckedResponse,
): void {
  const parsed = deserializeUpdateResponse(response);
  state.updateId = parsed?.update_id ?? "";
  state.updateStatus = parsed?.status ?? "queued";

  if (!parsed) {
    return;
  }

  if (parsed.status === "failed") {
    state.status = "failed";
    if (!state.error) {
      state.error = parsed.error
        ? new Error(parsed.error.message ?? "Memory update failed")
        : new Error("Memory update failed");
    }
    return;
  }

  if (nonFailureTerminalUpdateStatuses.includes(parsed.status)) {
    if (parsed.status === "superseded" && !state.error) {
      state.supersededBy = parsed.superseded_by;
    }
    state.status = "succeeded";
    state.result = parsed.result ??
      state.result ?? {
        memory_operations: [],
        usage: createDefaultUsage(),
      };
    return;
  }

  state.status = "running";
}

function buildRunningOperation(
  client: Client,
  expectedStatuses: string[],
  getInitialResponse?: () => PromiseLike<PathUncheckedResponse>,
  options?: CreateMemoryStoreUpdateMemoriesPollerOptions,
): RunningOperation<PathUncheckedResponse> {
  const pollAbortController = new AbortController();
  return {
    sendInitialRequest: async () => {
      if (!getInitialResponse) {
        throw new Error("getInitialResponse is required when starting a new poller");
      }
      const initialResponse = await getInitialResponse();
      return toOperationResponse(initialResponse, expectedStatuses);
    },
    sendPollRequest: async (path: string, pollOptions?: { abortSignal?: AbortSignalLike }) => {
      // The poll request will both listen to the user provided abort signal and the poller's own abort signal
      function abortListener(): void {
        pollAbortController.abort();
      }
      const abortSignal = pollAbortController.signal;
      if (options?.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (pollOptions?.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (!abortSignal.aborted) {
        options?.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
        pollOptions?.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }

      let response: PathUncheckedResponse;
      try {
        response = (await client.pathUnchecked(path).get({ abortSignal })) as PathUncheckedResponse;
      } finally {
        options?.abortSignal?.removeEventListener("abort", abortListener);
        pollOptions?.abortSignal?.removeEventListener("abort", abortListener);
      }

      return toOperationResponse(response, expectedStatuses);
    },
  };
}

/**
 * Creates a poller to track the progress of updating memories in a memory store.
 *
 * @param client - The AIProjectClient instance.
 * @param expectedStatuses - The expected HTTP statuses for the polling operation.
 * @param getInitialResponse - A function that returns a promise of the initial response to start the polling operation.
 * @param options - Optional parameters for creating the poller.
 * @returns A MemoryStoreUpdateMemoriesPoller instance.
 */
export function createMemoryStoreUpdateMemoriesPoller(
  client: Client,
  expectedStatuses: string[],
  getInitialResponse?: () => PromiseLike<PathUncheckedResponse>,
  options: CreateMemoryStoreUpdateMemoriesPollerOptions = {},
): MemoryStoreUpdateMemoriesPoller {
  if (!getInitialResponse && !options?.restoreFrom) {
    throw new Error("getInitialResponse is required when starting a new poller");
  }
  let initialResponse: PathUncheckedResponse | undefined;

  const poller = createHttpPoller<MemoryStoreUpdateResult, MemoryStoreUpdateOperationState>(
    buildRunningOperation(
      client,
      expectedStatuses,
      getInitialResponse
        ? async () => {
            initialResponse = await getInitialResponse();
            return initialResponse;
          }
        : undefined,
      options,
    ),
    {
      intervalInMs: options?.updateIntervalInMs,
      restoreFrom: options?.restoreFrom,
      updateState: (state, lastResponse) => {
        const flatResponse = lastResponse.flatResponse as PathUncheckedResponse;
        applyUpdateState(state, flatResponse);
      },
      processResult: async (operationResponse, state) => {
        applyUpdateState(state, operationResponse as PathUncheckedResponse);
        return state.result as MemoryStoreUpdateResult;
      },
    },
  ) as MemoryStoreUpdateMemoriesPoller;

  if (initialResponse && poller.operationState) {
    applyUpdateState(poller.operationState, initialResponse);
  }

  Object.defineProperties(poller, {
    updateId: {
      enumerable: true,
      get: () => poller.operationState?.updateId,
    },
    updateStatus: {
      enumerable: true,
      get: () => poller.operationState?.updateStatus,
    },
    supersededBy: {
      enumerable: true,
      get: () => poller.operationState?.supersededBy,
    },
  });

  return poller;
}
