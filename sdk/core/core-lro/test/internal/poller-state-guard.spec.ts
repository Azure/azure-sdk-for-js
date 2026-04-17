// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for poller.ts lines 107 and 155: the `if (!state) throw` guards
 * that fire when initOperation resolves without setting state.
 */

import { describe, it, expect, vi } from "vitest";
import { buildCreatePoller } from "../../src/poller/poller.js";
import type { OperationState } from "../../src/index.js";

// Mock initOperation to resolve with undefined, so the `.then((s) => (state = s))`
// sets state to undefined, triggering the `if (!state)` guards.
vi.mock("../../src/poller/operation.js", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../src/poller/operation.js")>();
  return {
    ...original,
    initOperation: vi.fn().mockResolvedValue(undefined),
  };
});

describe("poller.ts state guard", () => {
  function createBrokenPoller() {
    const createPoller = buildCreatePoller<unknown, unknown, OperationState<unknown>>({
      getOperationLocation: () => undefined,
      getStatusFromInitialResponse: () => "running",
      getStatusFromPollResponse: () => "running",
      isOperationError: () => false,
      getResourceLocation: () => undefined,
      getPollingInterval: () => undefined,
      getError: () => undefined,
      resolveOnUnsuccessful: false,
    });

    return createPoller({
      init: async () => ({
        response: {},
        operationLocation: "https://example.com/poll",
        resourceLocation: "https://example.com/resource",
        initialRequestUrl: "https://example.com/start",
        requestMethod: "PUT",
      }),
      poll: async () => ({ response: {} }),
    });
  }

  it("pollUntilDone should throw when state is not set (line 107)", async () => {
    const poller = createBrokenPoller();
    await expect(poller.pollUntilDone()).rejects.toThrow(
      "Poller should be initialized but it is not!",
    );
  });

  it("poll should throw when state is not set (line 155)", async () => {
    const poller = createBrokenPoller();
    await expect(poller.poll()).rejects.toThrow("Poller should be initialized but it is not!");
  });
});
