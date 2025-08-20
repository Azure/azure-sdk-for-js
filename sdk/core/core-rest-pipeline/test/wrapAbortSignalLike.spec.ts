// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, afterEach, vi } from "vitest";
import { wrapAbortSignalLike } from "$internal/util/wrapAbortSignal.js";

describe("wrapAbortSignalLike", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the original signal if it's a native AbortSignal", () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const { abortSignal, cleanup } = wrapAbortSignalLike(signal);

    expect(abortSignal).toBe(signal);
    expect(cleanup).toBeUndefined();
  });

  it("should wrap a signal-like object with addEventListener", () => {
    const abortHandler = vi.fn();
    let registeredHandler: (() => void) | undefined;
    const reason = new Error("Aborted");

    const signalLike = {
      aborted: false,
      reason: undefined as Error | undefined,
      addEventListener: vi.fn((_, handler) => {
        registeredHandler = handler;
      }),
      removeEventListener: vi.fn(),
    };

    const { abortSignal, cleanup } = wrapAbortSignalLike(signalLike);

    // Verify the returned abort signal is a native signal
    expect(abortSignal).toBeInstanceOf(AbortSignal);
    expect(abortSignal.aborted).toBe(false);
    expect(cleanup).toBeTypeOf("function");

    // Attach event listener to the wrapped signal
    abortSignal.addEventListener("abort", abortHandler);

    // Simulate abort on the original signal-like object
    expect(registeredHandler).toBeDefined();
    signalLike.aborted = true;
    signalLike.reason = reason;
    registeredHandler!();

    // Verify the wrapped signal was aborted and the handler called
    expect(abortSignal.aborted).toBe(true);
    expect(abortHandler).toHaveBeenCalled();

    // Call cleanup
    cleanup!();
    expect(signalLike.removeEventListener).toHaveBeenCalledOnce();
  });

  it("should handle already aborted signals", () => {
    const signalLike = {
      aborted: true,
      reason: new Error("Already aborted"),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const { abortSignal, cleanup } = wrapAbortSignalLike(signalLike);

    expect(signalLike.addEventListener).not.toHaveBeenCalled();
    expect(abortSignal).toBeInstanceOf(AbortSignal);
    expect(abortSignal.aborted).toBe(true);
    expect(cleanup).toBeUndefined();
  });

  it("should transfer the abort reason to the wrapped signal", () => {
    const customReason = new Error("Custom abort reason");
    const signalLike = {
      aborted: true,
      reason: customReason,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const { abortSignal } = wrapAbortSignalLike(signalLike);

    expect(abortSignal.aborted).toBe(true);
    expect(abortSignal.reason).toBe(customReason);
  });
});
