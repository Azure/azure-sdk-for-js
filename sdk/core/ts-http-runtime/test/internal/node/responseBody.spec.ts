// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { afterEach, describe, expect, it, vi } from "vitest";
import { logger } from "../../../src/log.js";
import { disposeResponseBody } from "../../../src/util/responseBody.js";

describe("disposeResponseBody in Node", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs asynchronous destroy errors without leaving an unhandled error listener", async () => {
    const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});
    const stream = new Readable({
      read() {},
      destroy(_error, callback) {
        queueMicrotask(() => callback(new Error("cleanup failed")));
      },
    });
    const closed = new Promise<void>((resolve) => stream.once("close", resolve));

    await expect(disposeResponseBody({ readableStreamBody: stream })).resolves.toBeUndefined();
    await closed;

    expect(warning).toHaveBeenCalledWith(
      "Error disposing response body",
      expect.objectContaining({ message: "cleanup failed" }),
    );
    expect(stream.listenerCount("error")).toBe(0);
  });

  it("does not attach disposal listeners to an already-closed stream", async () => {
    const stream = Readable.from([]);
    const closed = new Promise<void>((resolve) => stream.once("close", resolve));
    stream.resume();
    await closed;
    const errorListeners = stream.listenerCount("error");
    const closeListeners = stream.listenerCount("close");

    await expect(disposeResponseBody({ readableStreamBody: stream })).resolves.toBeUndefined();

    expect(stream.listenerCount("error")).toBe(errorListeners);
    expect(stream.listenerCount("close")).toBe(closeListeners);
  });
});
