// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import http from "node:http";
import { Socket } from "node:net";
import { Readable, Writable } from "node:stream";
import type { PipelineResponse } from "../../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../../src/index.js";
import { createNodeHttpClient } from "../../../src/nodeHttpClient.js";

let outgoing: MockRequest;
let respond: (response: http.IncomingMessage) => void;
vi.mock("node:http", async (importOriginal) => {
  const original = await importOriginal<typeof http>();
  return {
    default: {
      ...original,
      request: vi.fn((options: http.RequestOptions, callback: typeof respond) => {
        outgoing = new MockRequest(options);
        respond = callback;
        return outgoing;
      }),
    },
  };
});

class MockRequest extends Writable {
  public readonly chunks: Buffer[] = [];
  public readonly flushHeaders = vi.fn();
  public readonly setHeader = vi.fn();
  public shouldKeepAlive = true;
  public strictContentLength = false;
  public socket = undefined;
  public barrier?: (error?: Error | null) => void;
  public constructor(public readonly options: http.RequestOptions) {
    super({ autoDestroy: false });
  }
  public override write(
    chunk: unknown,
    encodingOrCallback?: BufferEncoding | ((error?: Error | null) => void),
    callback?: (error?: Error | null) => void,
  ): boolean {
    if (chunk === "") {
      this.barrier = typeof encodingOrCallback === "function" ? encodingOrCallback : callback;
      return true;
    }
    return typeof encodingOrCallback === "string"
      ? super.write(chunk, encodingOrCallback, callback)
      : super.write(chunk, encodingOrCallback);
  }
  public _write(
    chunk: Buffer,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    this.chunks.push(chunk);
    callback();
  }
}

function finalResponse(status = 200): void {
  const response = new http.IncomingMessage(new Socket());
  response.statusCode = status;
  response.headers = {};
  response.push("final");
  response.push(null);
  respond(response);
}

describe("Expect: 100-continue attempt state", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(async () => {
    outgoing?.destroy();
    await vi.runAllTimersAsync();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const start = (
    body: ReturnType<typeof createPipelineRequest>["body"] = "body",
    options: Partial<Parameters<typeof createPipelineRequest>[0]> = {},
  ): Promise<PipelineResponse> =>
    createNodeHttpClient().sendRequest(
      createPipelineRequest({
        url: "http://localhost/",
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body,
        ...options,
      }),
    );
  const flush = (): void => {
    outgoing.emit("socket", {});
    outgoing.barrier?.();
  };

  it.each(["continue", "fallback"])("sends exactly once when %s wins", async (first) => {
    const factory = vi.fn(() => Readable.from("body"));
    const pending = start(factory);
    flush();
    if (first === "continue") outgoing.emit("continue");
    await vi.advanceTimersByTimeAsync(1000);
    outgoing.emit("continue");
    outgoing.emit("continue");
    finalResponse();
    expect((await pending).status).toBe(200);
    expect(factory).toHaveBeenCalledOnce();
    expect(Buffer.concat(outgoing.chunks).toString()).toBe("body");
    expect(outgoing.listenerCount("continue")).toBe(0);
    expect(outgoing.listenerCount("socket")).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("ignores 102 and 103 and waits a full second after the write barrier", async () => {
    const factory = vi.fn(() => Readable.from("body"));
    const pending = start(factory);
    outgoing.emit("socket", {});
    outgoing.emit("information", { statusCode: 102 });
    outgoing.emit("information", { statusCode: 103 });
    await vi.advanceTimersByTimeAsync(5000);
    expect(factory).not.toHaveBeenCalled();
    outgoing.barrier?.();
    await vi.advanceTimersByTimeAsync(999);
    expect(factory).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    finalResponse();
    await pending;
    expect(factory).toHaveBeenCalledOnce();
  });

  it.each(["beforeSocket", "beforeBarrier", "afterBarrier"])(
    "suppresses late sends after final response (%s)",
    async (when) => {
      const factory = vi.fn(() => Readable.from("unused"));
      const pending = start(factory);
      if (when !== "beforeSocket") outgoing.emit("socket", {});
      if (when === "afterBarrier") outgoing.barrier?.();
      finalResponse(417);
      outgoing.emit("socket", {});
      outgoing.barrier?.();
      outgoing.emit("continue");
      await vi.advanceTimersByTimeAsync(2000);
      expect((await pending).status).toBe(417);
      expect(outgoing.shouldKeepAlive).toBe(false);
      expect(factory).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it.each(["abort", "error", "close", "timeout", "writeError"])(
    "suppresses sends after %s and returns the expected error",
    async (event) => {
      const controller = new AbortController();
      const factory = vi.fn(() => Readable.from("unused"));
      const pending = start(factory, {
        abortSignal: controller.signal,
        timeout: event === "timeout" ? 500 : 0,
      });
      const assertion = expect(pending).rejects.toMatchObject({
        name: event === "abort" || event === "timeout" ? "AbortError" : "RestError",
      });
      outgoing.emit("socket", {});
      if (event === "abort") controller.abort();
      else if (event === "error") {
        outgoing.emit("error", Object.assign(new Error("failed"), { code: "ECONNRESET" }));
      } else if (event === "close") outgoing.emit("close");
      else if (event === "writeError") outgoing.barrier?.(new Error("write failed"));
      else {
        outgoing.barrier?.();
        await vi.advanceTimersByTimeAsync(500);
      }
      outgoing.barrier?.();
      outgoing.emit("continue");
      await vi.advanceTimersByTimeAsync(2000);
      await assertion;
      expect(factory).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it("never dispatches a pre-aborted request", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(start("body", { abortSignal: controller.signal })).rejects.toMatchObject({
      name: "AbortError",
    });
    expect(http.request).not.toHaveBeenCalled();
  });

  it.each(["factory", "source", "progress", "pipe"])(
    "surfaces %s failures as RestError",
    async (kind) => {
      const source = new Readable({
        read() {
          this.destroy(new Error("source failed"));
        },
      });
      const body =
        kind === "factory"
          ? () => {
              throw new Error("factory failed");
            }
          : source;
      if (kind === "pipe") {
        vi.spyOn(source, "pipe").mockImplementation(() => {
          throw new Error("pipe failed");
        });
      }
      const pending = start(kind === "progress" ? Buffer.from("body") : body, {
        onUploadProgress:
          kind === "progress"
            ? () => {
                throw new Error("progress failed");
              }
            : undefined,
      });
      const assertion = expect(pending).rejects.toMatchObject({
        name: "RestError",
        code: "REQUEST_SEND_ERROR",
      });
      flush();
      outgoing.emit("continue");
      await vi.runAllTimersAsync();
      await assertion;
    },
  );

  it("disposes a factory result when its factory aborts synchronously", async () => {
    const controller = new AbortController();
    const source = new Readable({
      read() {
        throw new Error("must remain unread");
      },
    });
    const pending = start(
      () => {
        controller.abort();
        return source;
      },
      { abortSignal: controller.signal },
    );
    const assertion = expect(pending).rejects.toMatchObject({ name: "AbortError" });
    flush();
    outgoing.emit("continue");
    await assertion;
    expect(source.destroyed).toBe(true);
    expect(source.readableFlowing).toBe(null);
  });

  it("rejects a source that closes without ending instead of waiting indefinitely", async () => {
    const source = new Readable({
      read() {
        this.destroy();
      },
    });
    const pending = start(source);
    const assertion = expect(pending).rejects.toMatchObject({
      name: "RestError",
      code: "REQUEST_SEND_ERROR",
      message: "Request body stream closed before ending",
    });
    flush();
    outgoing.emit("continue");
    await vi.runAllTimersAsync();
    await assertion;
  });

  it("handles owned-stream cleanup errors after a synchronous factory abort", async () => {
    const controller = new AbortController();
    const source = new Readable({
      read() {
        throw new Error("must remain unread");
      },
      destroy(_error, callback) {
        callback(new Error("cleanup failed"));
      },
    });
    const pending = start(
      () => {
        controller.abort();
        return source;
      },
      { abortSignal: controller.signal },
    );
    const assertion = expect(pending).rejects.toMatchObject({ name: "AbortError" });
    flush();
    outgoing.emit("continue");
    await vi.runAllTimersAsync();
    await assertion;
    expect(source.closed).toBe(true);
    expect(source.listenerCount("error")).toBe(0);
  });

  it("does not queue a barrier write if continue arrives inside header flushing", async () => {
    const pending = start("body");
    outgoing.flushHeaders.mockImplementation(() => {
      outgoing.emit("continue");
    });
    outgoing.emit("socket", {});
    expect(outgoing.barrier).toBeUndefined();
    finalResponse();
    expect((await pending).bodyAsText).toBe("final");
    expect(vi.getTimerCount()).toBe(0);
  });
});
