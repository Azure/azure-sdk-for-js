// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createReconnectingSseStream,
  createSseStream,
  type EventMessageStream,
  type SseHttpResponse,
  type SseStreamOptions,
} from "../../../src/index.js";
import { describe, expect, it, vi, type Mock } from "vitest";

describe.each(["single connection", "reconnecting"] as const)(
  "[Browser] SSE body cleanup: %s",
  (kind) => {
    function create(
      body: ReadableStream<Uint8Array>,
      options: SseStreamOptions = {},
    ): {
      connect: Mock<() => Promise<SseHttpResponse>>;
      stream: Promise<EventMessageStream>;
    } {
      const connect = vi.fn<() => Promise<SseHttpResponse>>(async () => ({
        status: 200,
        headers: { "content-type": "text/event-stream" },
        body,
      }));
      return {
        connect,
        stream:
          kind === "single connection"
            ? Promise.resolve(createSseStream(body, options))
            : createReconnectingSseStream(connect, {
                ...options,
                retryDelayInMs: 0,
                maxRetries: 0,
              }),
      };
    }

    it.each(["consumer break", "terminal break", "terminal completion"] as const)(
      "cancels once and releases the body reader after %s",
      async (mode) => {
        const cancel = vi.fn();
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode("data: first\n\ndata: [DONE]\n\ndata: ignored\n\n"),
            );
          },
          cancel,
        });
        const terminal = mode !== "consumer break";
        const { stream: pendingStream, connect } = create(
          body,
          terminal ? { isTerminalEvent: (event) => event.data === "[DONE]" } : {},
        );
        const stream = await pendingStream;
        const values: string[] = [];
        for await (const event of stream) {
          values.push(event.data);
          if (mode === "consumer break" || (mode === "terminal break" && event.data === "[DONE]")) {
            break;
          }
        }

        expect(values).toEqual(terminal ? ["first", "[DONE]"] : ["first"]);
        expect(cancel).toHaveBeenCalledOnce();
        expect(body.locked).toBe(false);
        await stream[Symbol.asyncDispose]();
        expect(cancel).toHaveBeenCalledOnce();
        expect(connect).toHaveBeenCalledTimes(kind === "reconnecting" ? 1 : 0);
      },
    );

    it("releases the body reader after natural EOF without canceling a closed body", async () => {
      const cancel = vi.fn();
      const body = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data: first\n\n"));
          controller.close();
        },
        cancel,
      });
      const connect = vi
        .fn()
        .mockResolvedValueOnce({
          status: 200,
          headers: { "content-type": "text/event-stream" },
          body,
        })
        .mockImplementationOnce(async () => {
          expect(body.locked).toBe(false);
          return { status: 204, headers: {} };
        });
      const stream =
        kind === "single connection"
          ? createSseStream(body)
          : await createReconnectingSseStream(connect, { retryDelayInMs: 0, maxRetries: 1 });
      const values: string[] = [];
      for await (const event of stream) {
        values.push(event.data);
      }

      expect(values).toEqual(["first"]);
      expect(cancel).not.toHaveBeenCalled();
      expect(body.locked).toBe(false);
      expect(connect).toHaveBeenCalledTimes(kind === "reconnecting" ? 2 : 0);
    });

    it("settles a pending read and releases the body reader on cancellation", async () => {
      const cancel = vi.fn();
      const pull = vi.fn();
      const body = new ReadableStream<Uint8Array>({ pull, cancel });
      const { stream: pendingStream, connect } = create(body);
      const stream = await pendingStream;
      const reader = stream.getReader();
      const read = reader.read();
      try {
        await vi.waitFor(() => expect(pull).toHaveBeenCalled());
        expect(body.locked).toBe(true);
        await reader.cancel();
        await expect(read).resolves.toEqual({ done: true, value: undefined });
      } finally {
        await reader.cancel();
        reader.releaseLock();
        await stream[Symbol.asyncDispose]();
      }

      expect(cancel).toHaveBeenCalledOnce();
      expect(body.locked).toBe(false);
      expect(connect).toHaveBeenCalledTimes(kind === "reconnecting" ? 1 : 0);
    });
  },
);
