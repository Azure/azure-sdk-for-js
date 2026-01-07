// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationState } from "@azure/core-lro";
import { createBatchPoller } from "../src/static-helpers/batchPoller.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("createBatchPoller", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call initFn immediately when poller is created", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

    createBatchPoller({ initFn, pollFn });

    // initFn should be called immediately
    expect(initFn).toHaveBeenCalledTimes(1);
  });

  it("should resolve submitted() after init completes", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

    const poller = createBatchPoller({ initFn, pollFn });

    await poller.submitted();
    expect(poller.operationState?.status).toBe("running");
  });

  it("should poll until done with pollUntilDone()", async () => {
    let pollCount = 0;
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn().mockImplementation(async () => {
      pollCount++;
      if (pollCount >= 3) {
        return { status: "succeeded" } as OperationState<void>;
      }
      return { status: "running" } as OperationState<void>;
    });

    const poller = createBatchPoller({ initFn, pollFn });
    const pollPromise = poller.pollUntilDone();

    // Advance timers to trigger polling
    await vi.advanceTimersByTimeAsync(5000);
    await vi.advanceTimersByTimeAsync(5000);
    await vi.advanceTimersByTimeAsync(5000);

    await pollPromise;

    expect(poller.isDone).toBe(true);
    expect(pollFn).toHaveBeenCalledTimes(3);
  });

  it("should return the same promise when pollUntilDone() is called multiple times", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);
    const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

    const poller = createBatchPoller({ initFn, pollFn });

    const promise1 = poller.pollUntilDone();
    const promise2 = poller.pollUntilDone();

    expect(promise1).toStrictEqual(promise2);
  });

  it("should reuse in-flight poll promise when poll() is called multiple times", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    let resolvePromise: (value: OperationState<void>) => void;
    const pollFn = vi.fn().mockImplementation(() => {
      return new Promise<OperationState<void>>((resolve) => {
        resolvePromise = resolve;
      });
    });

    const poller = createBatchPoller({ initFn, pollFn });
    await poller.submitted();

    // Call poll() multiple times before the first one resolves
    const poll1 = poller.poll();
    const poll2 = poller.poll();
    await Promise.resolve();

    // pollFn should only be called once
    expect(pollFn).toHaveBeenCalledTimes(1);

    // Resolve the promise
    resolvePromise!({ status: "succeeded" } as OperationState<void>);

    await poll1;
    await poll2;

    expect(poller.operationState?.status).toBe("succeeded");
  });

  it("should call onProgress callbacks after each poll", async () => {
    let pollCount = 0;
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn().mockImplementation(async () => {
      pollCount++;
      if (pollCount >= 2) {
        return { status: "succeeded" } as OperationState<void>;
      }
      return { status: "running" } as OperationState<void>;
    });

    const poller = createBatchPoller({ initFn, pollFn });
    const progressCallback = vi.fn();
    poller.onProgress(progressCallback);

    const pollPromise = poller.pollUntilDone();

    await vi.advanceTimersByTimeAsync(5000);
    await vi.advanceTimersByTimeAsync(5000);

    await pollPromise;

    expect(progressCallback).toHaveBeenCalledTimes(2);
  });

  it("should stop receiving updates after canceling onProgress", async () => {
    let pollCount = 0;
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn().mockImplementation(async () => {
      pollCount++;
      if (pollCount >= 3) {
        return { status: "succeeded" } as OperationState<void>;
      }
      return { status: "running" } as OperationState<void>;
    });

    const poller = createBatchPoller({ initFn, pollFn });
    const progressCallback = vi.fn();
    const cancel = poller.onProgress(progressCallback);

    const pollPromise = poller.pollUntilDone();

    await vi.advanceTimersByTimeAsync(1000);
    // Cancel after first poll
    cancel();

    await vi.advanceTimersByTimeAsync(5000);
    await vi.advanceTimersByTimeAsync(5000);
    await vi.advanceTimersByTimeAsync(5000);

    await pollPromise;

    // Should only have been called once before cancel
    expect(progressCallback).toHaveBeenCalledTimes(1);
  });

  it("should throw error when operation fails", async () => {
    const testError = new Error("Operation failed");
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn().mockResolvedValue({
      status: "failed",
      error: testError,
    } as OperationState<void>);

    const poller = createBatchPoller({ initFn, pollFn });
    const pollPromise = poller.pollUntilDone();
    pollPromise.catch(() => {
      /* swallow error for test */
    });

    await vi.advanceTimersByTimeAsync(5000);

    await expect(pollPromise).rejects.toThrow("Operation failed");
  });

  it("should handle init failure", async () => {
    const initError = new Error("Init failed");
    const initFn = vi.fn().mockRejectedValue(initError);
    const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

    const poller = createBatchPoller({ initFn, pollFn });

    await expect(poller.submitted()).rejects.toThrow("Init failed");
    expect(poller.operationState?.status).toBe("failed");
    expect(poller.operationState?.error).toBe(initError);
  });

  it("should be awaitable with then()", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);
    const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

    const poller = createBatchPoller({ initFn, pollFn });

    await poller;

    expect(poller.isDone).toBe(true);
  });

  it("should return isDone=true for succeeded status", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);
    const pollFn = vi.fn();

    const poller = createBatchPoller({ initFn, pollFn });
    await poller.submitted();

    expect(poller.isDone).toBe(true);
  });

  it("should throw error for failed status", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "failed" } as OperationState<void>);
    const pollFn = vi.fn();

    const poller = createBatchPoller({ initFn, pollFn });
    await expect(poller.submitted()).rejects.toThrow("Operation failed");

    expect(poller.isDone).toBe(true);
  });

  it("should throw error for canceled status", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "canceled" } as OperationState<void>);
    const pollFn = vi.fn();

    const poller = createBatchPoller({ initFn, pollFn });
    await expect(poller.submitted()).rejects.toThrow("Operation was canceled");

    expect(poller.isDone).toBe(true);
  });

  it("should serialize state correctly", async () => {
    const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
    const pollFn = vi.fn();

    const poller = createBatchPoller({ initFn, pollFn });
    await poller.submitted();

    const serialized = await poller.serialize();
    const parsed = JSON.parse(serialized);

    expect(parsed.state.status).toBe("running");
  });

  describe("initFn error handling", () => {
    it("should throw from submitted() when initFn throws", async () => {
      const initError = new Error("Init threw an error");
      const initFn = vi.fn().mockRejectedValue(initError);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });

      await expect(poller.submitted()).rejects.toThrow("Init threw an error");
      expect(poller.operationState?.status).toBe("failed");
      expect(poller.operationState?.error).toBe(initError);
      expect(poller.isDone).toBe(true);
    });

    it("should throw from poll() when initFn throws", async () => {
      const initError = new Error("Init threw an error");
      const initFn = vi.fn().mockRejectedValue(initError);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });

      await expect(poller.poll()).rejects.toThrow("Init threw an error");
      expect(poller.operationState?.status).toBe("failed");
    });

    it("should throw from pollUntilDone() when initFn throws", async () => {
      const initError = new Error("Init threw an error");
      const initFn = vi.fn().mockRejectedValue(initError);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });

      await expect(poller.pollUntilDone()).rejects.toThrow("Init threw an error");
      expect(poller.operationState?.status).toBe("failed");
    });

    it("should throw from submitted() when initFn returns failed status", async () => {
      const testError = new Error("Init returned failed");
      const initFn = vi.fn().mockResolvedValue({
        status: "failed",
        error: testError,
      } as OperationState<void>);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });
      await expect(poller.submitted()).rejects.toThrow("Init returned failed");

      expect(poller.operationState?.status).toBe("failed");
      expect(poller.operationState?.error).toBe(testError);
      expect(poller.isDone).toBe(true);
    });

    it("should throw from submitted() when initFn returns canceled status", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "canceled" } as OperationState<void>);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });
      await expect(poller.submitted()).rejects.toThrow("Operation was canceled");

      expect(poller.operationState?.status).toBe("canceled");
      expect(poller.isDone).toBe(true);
    });

    it("should not poll when initFn returns failed status", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "failed" } as OperationState<void>);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });
      const pollPromise = poller.pollUntilDone();
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      await vi.advanceTimersByTimeAsync(10000);

      await expect(pollPromise).rejects.toThrow("Operation failed");
      expect(pollFn).not.toHaveBeenCalled();
    });

    it("should not poll when initFn returns canceled status", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "canceled" } as OperationState<void>);
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });
      await expect(poller.pollUntilDone()).rejects.toThrow("Operation was canceled");

      expect(pollFn).not.toHaveBeenCalled();
    });

    it("should not poll when initFn throws", async () => {
      const initFn = vi.fn().mockRejectedValue(new Error("Init failed"));
      const pollFn = vi.fn();

      const poller = createBatchPoller({ initFn, pollFn });

      await expect(poller.pollUntilDone()).rejects.toThrow("Init failed");
      expect(pollFn).not.toHaveBeenCalled();
    });
  });

  describe("pollFn error handling", () => {
    it("should throw from poll() when pollFn throws", async () => {
      const pollError = new Error("Poll threw an error");
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockRejectedValue(pollError);

      const poller = createBatchPoller({ initFn, pollFn });
      await poller.submitted();

      await expect(poller.poll()).rejects.toThrow("Poll threw an error");
      expect(poller.operationState?.status).toBe("failed");
    });

    it("should throw from pollUntilDone() when pollFn throws", async () => {
      const pollError = new Error("Poll threw an error");
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockRejectedValue(pollError);

      const poller = createBatchPoller({ initFn, pollFn });
      const pollPromise = poller.pollUntilDone();
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      // Advance timer to trigger the first poll
      await vi.advanceTimersByTimeAsync(5000);

      await expect(pollPromise).rejects.toThrow("Poll threw an error");
    });

    it("should throw from poll() when pollFn returns failed status", async () => {
      const testError = new Error("Poll returned failed");
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({
        status: "failed",
        error: testError,
      } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      await poller.submitted();

      await expect(poller.poll()).rejects.toThrow("Poll returned failed");
    });

    it("should throw from pollUntilDone() when pollFn returns failed status", async () => {
      const testError = new Error("Poll returned failed");
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({
        status: "failed",
        error: testError,
      } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      const pollPromise = poller.pollUntilDone();

      await expect(pollPromise).rejects.toThrow("Poll returned failed");
    });

    it("should throw default error when pollFn returns failed status without error", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "failed" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });

      await expect(poller.poll()).rejects.toThrow("Operation failed");
    });

    it("should throw from poll() when pollFn returns canceled status", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "canceled" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      await poller.submitted();

      await expect(poller.poll()).rejects.toThrow("Operation was canceled");
    });

    it("should throw from pollUntilDone() when pollFn returns canceled status", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "canceled" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });

      await expect(poller.pollUntilDone()).rejects.toThrow("Operation was canceled");
    });

    it("should stop polling after pollFn returns failed status", async () => {
      let pollCount = 0;
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockImplementation(async () => {
        pollCount++;
        if (pollCount === 2) {
          return { status: "failed", error: new Error("Failed") } as OperationState<void>;
        }
        return { status: "running" } as OperationState<void>;
      });

      const poller = createBatchPoller({ initFn, pollFn });
      const pollPromise = poller.pollUntilDone();
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      await vi.advanceTimersByTimeAsync(5000);
      await vi.advanceTimersByTimeAsync(5000);
      await vi.advanceTimersByTimeAsync(5000);

      await expect(pollPromise).rejects.toThrow();
      expect(pollFn).toHaveBeenCalledTimes(2);
    });

    it("should stop polling after pollFn returns canceled status", async () => {
      let pollCount = 0;
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockImplementation(async () => {
        pollCount++;
        if (pollCount === 2) {
          return { status: "canceled" } as OperationState<void>;
        }
        return { status: "running" } as OperationState<void>;
      });

      const poller = createBatchPoller({ initFn, pollFn });
      const pollPromise = poller.pollUntilDone();
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      await vi.advanceTimersByTimeAsync(5000);
      await vi.advanceTimersByTimeAsync(5000);
      await vi.advanceTimersByTimeAsync(5000);

      await expect(pollPromise).rejects.toThrow("Operation was canceled");
      expect(pollFn).toHaveBeenCalledTimes(2);
    });

    it("should handle poll() throwing and not allow subsequent poll() calls", async () => {
      let callCount = 0;
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          throw new Error("First poll failed");
        }
        return { status: "succeeded" } as OperationState<void>;
      });

      const poller = createBatchPoller({ initFn, pollFn });
      await poller.submitted();

      // First poll throws
      await expect(poller.poll()).rejects.toThrow("First poll failed");

      // Second poll should throw as the poller is in failed state
      await expect(poller.poll()).rejects.toThrow("First poll failed");
    });
  });

  describe("abort behavior", () => {
    it("should abort immediately if abortSignal is already aborted", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });

      const abortController = new AbortController();
      abortController.abort();

      await expect(poller.pollUntilDone({ abortSignal: abortController.signal })).rejects.toThrow(
        "The operation was aborted.",
      );
      expect(poller.operationState?.status).toBe("canceled");
    });

    it("should abort during wait between polls", async () => {
      let pollCount = 0;
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockImplementation(async () => {
        pollCount++;
        return { status: "running" } as OperationState<void>;
      });

      const poller = createBatchPoller({ initFn, pollFn });
      const abortController = new AbortController();
      const pollPromise = poller.pollUntilDone({ abortSignal: abortController.signal });
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      // Advance timers to allow first poll
      await vi.advanceTimersByTimeAsync(1000);
      expect(pollFn).toHaveBeenCalledTimes(1);

      // Abort during second wait
      await vi.advanceTimersByTimeAsync(2500);
      abortController.abort();
      await vi.advanceTimersByTimeAsync(5000);

      await expect(pollPromise).rejects.toThrow("The operation was aborted.");
      expect(poller.operationState?.status).toBe("canceled");
    });

    it("should abort while waiting for init to complete", async () => {
      let resolveInit: (value: OperationState<void>) => void;
      const initFn = vi.fn().mockImplementation(() => {
        return new Promise<OperationState<void>>((resolve) => {
          resolveInit = resolve;
        });
      });
      const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      const abortController = new AbortController();
      const pollPromise = poller.pollUntilDone({ abortSignal: abortController.signal });
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      // Abort while init is still pending
      abortController.abort();

      // Now resolve init
      resolveInit!({ status: "running" } as OperationState<void>);

      await expect(pollPromise).rejects.toThrow("The operation was aborted.");
      expect(poller.operationState?.status).toBe("canceled");
    });

    it("should not call pollFn after abort", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      const abortController = new AbortController();
      const pollPromise = poller.pollUntilDone({ abortSignal: abortController.signal });
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      // Abort before first poll
      abortController.abort();
      await vi.advanceTimersByTimeAsync(5000);

      await expect(pollPromise).rejects.toThrow("The operation was aborted.");
      expect(pollFn).not.toHaveBeenCalled();
    });

    it("should stop polling when abort signal fires after first poll", async () => {
      let pollCount = 0;
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockImplementation(async () => {
        pollCount++;
        return { status: "running" } as OperationState<void>;
      });

      const poller = createBatchPoller({ initFn, pollFn });
      const abortController = new AbortController();
      const pollPromise = poller.pollUntilDone({ abortSignal: abortController.signal });
      pollPromise.catch(() => {
        /* swallow error for test */
      });

      // Let first poll complete
      await vi.advanceTimersByTimeAsync(4999);
      expect(pollFn).toHaveBeenCalledTimes(1);

      // Abort and ensure no more polls
      abortController.abort();
      await vi.advanceTimersByTimeAsync(10000);

      await expect(pollPromise).rejects.toThrow("The operation was aborted.");
      expect(pollFn).toHaveBeenCalledTimes(1);
    });

    it("should abort poll() immediately if abortSignal is already aborted", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      await poller.submitted();

      const abortController = new AbortController();
      abortController.abort();

      await expect(poller.poll({ abortSignal: abortController.signal })).rejects.toThrow(
        "The operation was aborted.",
      );
      expect(poller.operationState?.status).toBe("canceled");
      expect(pollFn).not.toHaveBeenCalled();
    });

    it("should not call pollFn when poll() is called with aborted signal", async () => {
      const initFn = vi.fn().mockResolvedValue({ status: "running" } as OperationState<void>);
      const pollFn = vi.fn().mockResolvedValue({ status: "succeeded" } as OperationState<void>);

      const poller = createBatchPoller({ initFn, pollFn });
      await poller.submitted();

      const abortController = new AbortController();
      abortController.abort();

      await expect(poller.poll({ abortSignal: abortController.signal })).rejects.toThrow(
        "The operation was aborted.",
      );
      expect(pollFn).not.toHaveBeenCalled();
    });
  });
});
