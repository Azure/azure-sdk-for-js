// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient } from "@azure-rest/core-client";
import { createServer, IncomingMessage } from "node:http";
import { createReconnectingSseStream, type SseConnectOptions } from "../../../src/index.js";
import { describe, expect, it, vi } from "vitest";

describe("[Node] Reconnecting SSE HTTP cancellation", () => {
  it.each(["consumer-break", "terminal-break", "terminal-completion", "caller-abort"] as const)(
    "closes the connection safely after %s",
    async (mode) => {
      const terminal = mode.startsWith("terminal");
      const wire = terminal
        ? "data: first\n\ndata: [DONE]\n\ndata: ignored\n\n"
        : "data: first\n\ndata: second\n\n";
      const socketClosed = vi.fn();
      const server = createServer((_request, response) => {
        response.setHeader("Content-Type", "text/event-stream");
        if (mode === "caller-abort") {
          response.write("data: first\n\n");
        } else {
          response.setHeader("Content-Length", Buffer.byteLength(wire));
          response.end(wire);
        }
      });
      server.on("connection", (socket) => socket.once("close", socketClosed));
      await new Promise<void>((resolve, reject) => {
        server.once("error", reject);
        server.listen(0, "127.0.0.1", resolve);
      });

      try {
        const address = server.address();
        if (!address || typeof address === "string") {
          throw new Error("Expected the HTTP fixture to listen on a TCP port.");
        }
        const client = getClient(`http://127.0.0.1:${address.port}`, {
          allowInsecureConnection: true,
          retryOptions: { maxRetries: 0 },
        });
        const aborter = new AbortController();
        let body: IncomingMessage | undefined;
        const connect = vi.fn(async ({ abortSignal }: SseConnectOptions) => {
          const response = await client
            .pathUnchecked("/events")
            .get({ abortSignal })
            .asNodeStream();
          if (!(response.body instanceof IncomingMessage)) {
            throw new Error("Expected the real Node HTTP response stream.");
          }
          body = response.body;
          return response;
        });
        const stream = await createReconnectingSseStream(connect, {
          abortSignal: aborter.signal,
          retryDelayInMs: 0,
          maxRetries: 0,
          ...(terminal ? { isTerminalEvent: (event) => event.data === "[DONE]" } : {}),
        });

        if (mode === "caller-abort") {
          const reader = stream.getReader();
          try {
            expect((await reader.read()).value?.data).toBe("first");
            const pending = reader.read();
            aborter.abort();
            await expect(pending).rejects.toMatchObject({ name: "AbortError" });
          } finally {
            reader.releaseLock();
            await stream[Symbol.asyncDispose]();
          }
        } else {
          const values: string[] = [];
          for await (const event of stream) {
            values.push(event.data);
            if (
              mode === "consumer-break" ||
              (mode === "terminal-break" && event.data === "[DONE]")
            ) {
              break;
            }
          }
          expect(values).toEqual(terminal ? ["first", "[DONE]"] : ["first"]);
        }

        await vi.waitFor(() => expect(socketClosed).toHaveBeenCalledOnce());
        expect(body?.destroyed).toBe(true);
        expect(connect).toHaveBeenCalledOnce();
        expect(connect.mock.calls[0][0].abortSignal.aborted).toBe(true);
      } finally {
        server.closeAllConnections();
        await new Promise<void>((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        );
      }
    },
  );
});
