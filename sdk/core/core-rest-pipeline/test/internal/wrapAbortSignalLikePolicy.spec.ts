// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, afterEach } from "vitest";
import { wrapAbortSignalLikePolicy } from "../../src/policies/wrapAbortSignalLikePolicy.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import type { PipelineResponse, SendRequest } from "../../src/interfaces.js";
import type { AbortSignalLike } from "@azure/abort-controller";

describe("wrapAbortSignalLikePolicy", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should wrap AbortSignalLike with native AbortSignal", async () => {
    const policy = wrapAbortSignalLikePolicy();
    let receivedSignal: AbortSignalLike | undefined;

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
    const response: PipelineResponse = {
      status: 200,
      headers: createHttpHeaders(),
      request,
    };
    const nextSpy = vi.fn<SendRequest>().mockImplementation((nextRequest) => {
      receivedSignal = nextRequest.abortSignal;
      return Promise.resolve(response);
    });

    const result = await policy.sendRequest(request, nextSpy);

    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(receivedSignal).toBeInstanceOf(AbortSignal);
    expect(result).toBe(response);
    expect(mockAbortSignalLike.addEventListener).toHaveBeenCalledOnce();
    expect(mockAbortSignalLike.removeEventListener).toHaveBeenCalledOnce();
    expect(request.abortSignal).toBe(mockAbortSignalLike);
  });

  it("should restore the original AbortSignalLike if next handler throws", async () => {
    const policy = wrapAbortSignalLikePolicy();
    const error = new Error("Test error");
    const nextSpy = vi.fn<SendRequest>().mockRejectedValue(error);

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

    expect(request.abortSignal).toBe(mockAbortSignalLike);
  });
});
