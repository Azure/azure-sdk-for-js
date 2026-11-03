// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This test file uses vi.doMock + dynamic imports to mock checkNetworkConnection before retry.ts imports it.
 * This is necessary because ESM modules don't allow vi.spyOn on module exports.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

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

    const operationSpy = vi.fn().mockImplementation(async () => {
      const err = new MessagingError("Connection lost");
      err.name = "ServiceCommunicationError";
      err.retryable = false;
      throw err;
    });

    await expect(
      retry({
        operation: operationSpy,
        connectionId: "conn-1",
        operationType: RetryOperationType.cbsAuth,
        connectionHost: "nonexistent.host.invalid",
        retryOptions: {
          maxRetries: 1,
          retryDelayInMs: 10,
        },
      }),
    ).rejects.toThrow();

    expect(mockCheckNetwork).toHaveBeenCalled();
    expect(operationSpy.mock.calls.length).toBeGreaterThan(1);
  });
});
