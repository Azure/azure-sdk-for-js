// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { pollHttpOperation } from "../../src/http/operation.js";
import { makeRawResponse, makeState } from "../utils/utils.js";

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
