// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { pollHttpOperation } from "../../src/http/operation.js";
import type { RawResponse } from "../../src/http/models.js";
import type { OperationState, RestorableOperationState } from "../../src/poller/models.js";

function makeRawResponse(overrides: Partial<RawResponse> = {}): RawResponse {
  return {
    statusCode: 200,
    headers: {},
    request: { method: "GET", url: "https://example.com/resource" },
    ...overrides,
  };
}

function makeState<TResult>(
  mode?: string,
  extra?: Partial<RestorableOperationState<TResult, OperationState<TResult>>>,
): RestorableOperationState<TResult, OperationState<TResult>> {
  return {
    status: "running",
    config: {
      metadata: mode ? { mode } : undefined,
      ...extra?.config,
    },
    ...extra,
  } as RestorableOperationState<TResult, OperationState<TResult>>;
}

describe("pollHttpOperation without processResult", () => {
  it("uses default flatResponse identity when processResult is not provided", async () => {
    const pollPath = "/poll-no-process";
    const sendPollRequest = vi.fn().mockResolvedValueOnce({
      flatResponse: { id: "result-123", statusCode: 200 },
      rawResponse: makeRawResponse({
        statusCode: 200,
        body: { status: "succeeded" },
      }),
    });

    const state = makeState<unknown>("OperationLocation", {
      config: {
        operationLocation: pollPath,
        metadata: { mode: "OperationLocation" },
      },
    });

    await pollHttpOperation({
      lro: {
        sendInitialRequest: vi.fn(),
        sendPollRequest,
      },
      setDelay: vi.fn(),
      state,
      setErrorAsResult: false,
    });

    // Without processResult, the flatResponse should be used as-is
    assert.deepEqual(state.result, { id: "result-123", statusCode: 200 });
  });
});
