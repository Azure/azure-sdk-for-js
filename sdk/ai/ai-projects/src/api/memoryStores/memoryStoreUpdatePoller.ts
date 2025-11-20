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

export type MemoryStoreUpdateOperationState = OperationState<MemoryStoreUpdateResult> & {
  updateId?: string;
  updateStatus?: MemoryStoreUpdateStatus;
  supersededBy?: string;
};

export type MemoryStoreUpdatePoller = PollerLike<
  MemoryStoreUpdateOperationState,
  MemoryStoreUpdateResult
> & {
  readonly updateId?: string;
  readonly updateStatus?: MemoryStoreUpdateStatus;
  readonly supersededBy?: string;
};

export interface CreateMemoryStoreUpdatePollerOptions {
  updateIntervalInMs?: number;
  abortSignal?: AbortSignalLike;
  restoreFrom?: string;
}

const terminalUpdateStatuses: MemoryStoreUpdateStatus[] = ["completed", "superseded"];

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

function extractUpdateIdFromResponse(
  response: Pick<PathUncheckedResponse, "headers">,
): string | undefined {
  const operationLocation =
    response.headers?.["operation-location"] ??
    response.headers?.["Operation-Location"] ??
    response.headers?.operationLocation;
  if (!operationLocation) {
    return undefined;
  }
  const match = /\/updates\/([^/?]+)/i.exec(operationLocation);
  return match?.[1];
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
  state.updateId ??= parsed?.update_id ?? extractUpdateIdFromResponse(response);
  state.updateStatus = parsed?.status ?? state.updateStatus;
  state.supersededBy = parsed?.superseded_by;

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

  if (terminalUpdateStatuses.includes(parsed.status)) {
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
      function abortListener(): void {
        pollAbortController.abort();
      }
      const abortSignal = pollAbortController.signal;
      if (pollOptions?.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (!abortSignal.aborted) {
        pollOptions?.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }

      let response: PathUncheckedResponse;
      try {
        response = (await client.pathUnchecked(path).get({ abortSignal })) as PathUncheckedResponse;
      } finally {
        pollOptions?.abortSignal?.removeEventListener("abort", abortListener);
      }

      return toOperationResponse(response, expectedStatuses);
    },
  };
}

export function createMemoryStoreUpdatePoller(
  client: Client,
  expectedStatuses: string[],
  getInitialResponse?: () => PromiseLike<PathUncheckedResponse>,
  options: CreateMemoryStoreUpdatePollerOptions = {},
): MemoryStoreUpdatePoller {
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
      withOperationLocation: (operationLocation) => {
        const updateId =
          operationLocation && !initialResponse
            ? extractUpdateIdFromResponse({
                headers: { "operation-location": operationLocation },
              })
            : undefined;
        if (updateId && poller.operationState) {
          poller.operationState.updateId ??= updateId;
        }
      },
    },
  ) as MemoryStoreUpdatePoller;

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
