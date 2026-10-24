// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import { cleanupAbortSignal } from "../../src/util/abortSignalCleanup.js";

describe("cleanupAbortSignal", () => {
  it("waits for response stream completion", async () => {
    const listeners = new Map<string, () => void>();
    const responseStream = {
      readable: true,
      once(event: string, listener: () => void) {
        listeners.set(event, listener);
      },
      removeListener(event: string) {
        listeners.delete(event);
      },
    };
    const response = { readableStreamBody: responseStream };
    const cleanup = vi.fn();

    cleanupAbortSignal(response, cleanup);
    expect(cleanup).not.toHaveBeenCalled();

    responseStream.readable = false;
    listeners.get("end")?.();
    await Promise.resolve();
    expect(cleanup).toHaveBeenCalledOnce();
  });
});
