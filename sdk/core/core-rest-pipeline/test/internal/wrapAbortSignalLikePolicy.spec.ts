// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, afterEach } from "vitest";
import { wrapAbortSignalLikePolicy } from "../../src/policies/wrapAbortSignalLikePolicy.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import type { AbortSignalLike } from "@azure/abort-controller";

describe("wrapAbortSignalLikePolicy", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should wrap AbortSignalLike with native AbortSignal", async () => {
    const policy = wrapAbortSignalLikePolicy();
    let receivedSignal: AbortSignalLike | undefined;
    const nextSpy = vi.fn().mockImplementation((request) => {
      receivedSignal = request.abortSignal;
      return Promise.resolve({ status: 200 });
    });

    // Create a mock AbortSignalLike
    const mockAbortSignalLike: AbortSignalLike = {
      aborted: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: mockAbortSignalLike,
    });

    const result = await policy.sendRequest(request, nextSpy);

    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(receivedSignal).toBeInstanceOf(AbortSignal);
    expect(result).toEqual({ status: 200 });
    expect(mockAbortSignalLike.addEventListener).toHaveBeenCalledOnce();
    expect(mockAbortSignalLike.removeEventListener).toHaveBeenCalledOnce();
    expect(request.abortSignal).toBe(mockAbortSignalLike);
  });

  it("should clean up even if next handler throws", async () => {
    const policy = wrapAbortSignalLikePolicy();
    const error = new Error("Test error");
    const nextSpy = vi.fn().mockRejectedValue(error);

    const mockAbortSignalLike: AbortSignalLike = {
      aborted: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: mockAbortSignalLike,
    });

    await expect(policy.sendRequest(request, nextSpy)).rejects.toThrow(error);

    // Verify cleanup still happened despite error
    expect(mockAbortSignalLike.removeEventListener).toHaveBeenCalled();
    expect(request.abortSignal).toBe(mockAbortSignalLike);
  });
});
