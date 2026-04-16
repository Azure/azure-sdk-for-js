// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This test file uses vi.doMock + dynamic imports to mock checkNetworkConnection before retry.ts imports it.
 * This is necessary because ESM modules don't allow vi.spyOn on module exports.
 */
import { describe, it, assert, vi, beforeEach } from "vitest";

describe("retry - ConnectionLostError when checkNetworkConnection returns false", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("marks ServiceCommunicationError as ConnectionLostError when network is down", async () => {
    const mockCheckNetwork = vi.fn().mockResolvedValue(false);
    vi.doMock("../../../src/util/checkNetworkConnection.js", () => ({
      checkNetworkConnection: mockCheckNetwork,
    }));

    const { retry, RetryOperationType } = await import("../../../src/retry.js");
    const { MessagingError } = await import("../../../src/errors.js");

    let callCount = 0;
    try {
      await retry({
        operation: async () => {
          callCount++;
          const err = new MessagingError("Connection lost");
          err.name = "ServiceCommunicationError";
          err.retryable = false;
          throw err;
        },
        connectionId: "conn-1",
        operationType: RetryOperationType.cbsAuth,
        connectionHost: "nonexistent.host.invalid",
        retryOptions: {
          maxRetries: 1,
          retryDelayInMs: 10,
        },
      });
      assert.fail("Should have thrown");
    } catch (err: any) {
      assert.isTrue(
        mockCheckNetwork.mock.calls.length > 0,
        "checkNetworkConnection should have been called",
      );
      assert.isAbove(callCount, 1, "Operation should have been retried");
    }
  });
});
