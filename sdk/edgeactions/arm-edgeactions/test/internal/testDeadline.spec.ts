// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import { createDeadline, deploymentTimeoutMs, lifecycleTimeoutMs } from "../utils/testDeadline.js";

afterEach(() => vi.useRealTimers());

describe("deployment time budgets", () => {
  it.each([
    [0, 20],
    [1, 50],
    [2, 90],
  ])("allocates %i deployments a %i-minute lifecycle including cleanup", (count, minutes) => {
    expect(lifecycleTimeoutMs(count)).toBe(minutes * 60 * 1000);
  });

  it.each([-1, 0.5, NaN, Infinity])("rejects invalid deployment count %s", (count) => {
    expect(() => lifecycleTimeoutMs(count)).toThrow(RangeError);
  });

  it("allows two sequential 40-minute deployments and ten minutes for other work and cleanup", () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    expect(deploymentTimeoutMs).toBe(2_400_000);
    const lifecycle = createDeadline(lifecycleTimeoutMs(2), "Lifecycle expired");
    try {
      for (let index = 0; index < 2; index++) {
        const deployment = createDeadline(deploymentTimeoutMs, "Deployment expired");
        try {
          vi.advanceTimersByTime(deploymentTimeoutMs - 1);
          expect(deployment.signal.aborted).toBe(false);
          vi.advanceTimersByTime(1);
          expect(deployment.signal.aborted).toBe(true);
          expect(lifecycle.signal.aborted).toBe(false);
        } finally {
          deployment.dispose();
        }
      }
      // Cleanup gets only the time left in the original lifecycle budget.
      vi.advanceTimersByTime(10 * 60 * 1000 - 1);
      expect(lifecycle.signal.aborted).toBe(false);
      vi.advanceTimersByTime(1);
      expect(lifecycle.signal.aborted).toBe(true);
      expect(lifecycle.signal.reason.message).toBe("Lifecycle expired");
    } finally {
      lifecycle.dispose();
    }
  });

  it("clears the timer after a completed operation", () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    const deadline = createDeadline(deploymentTimeoutMs, "Expired");
    deadline.dispose();
    vi.advanceTimersByTime(deploymentTimeoutMs);
    expect(deadline.signal.aborted).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
});
