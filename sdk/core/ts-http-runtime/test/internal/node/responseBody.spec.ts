// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { once } from "node:events";
import http from "node:http";
import { deflateSync, gzipSync } from "node:zlib";
import { afterEach, describe, expect, it, vi } from "vitest";
import { logger } from "../../../src/log.js";
import {
  disposeNodeStream,
  disposeResponseBody,
  setResponseBodyDisposer,
  setResponseBodySource,
} from "../../../src/util/responseBody.js";
import { createNodeHttpClient } from "../../../src/nodeHttpClient.js";
import { createPipelineRequest } from "../../../src/pipelineRequest.js";
import { redirectPolicy } from "../../../src/policies/redirectPolicy.js";

describe("disposeResponseBody in Node", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([false, true])(
    "logs asynchronous destroy errors without leaking listeners (raw=%s)",
    async (raw) => {
      const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});
      const stream = new Readable({
        read() {},
        destroy(_error, callback) {
          queueMicrotask(() => callback(new Error("cleanup failed")));
        },
      });
      const closed = new Promise<void>((resolve) => stream.once("close", resolve));

      if (raw) {
        disposeNodeStream(stream);
      } else {
        await expect(disposeResponseBody({ readableStreamBody: stream })).resolves.toBeUndefined();
      }
      await closed;

      expect(warning).toHaveBeenCalledWith(
        "Error disposing Node stream",
        expect.objectContaining({ message: "cleanup failed" }),
      );
      expect(stream.listenerCount("error")).toBe(0);
    },
  );

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

  describe("disposeNodeStream", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("disposes each stream once when the source chain contains a cycle", () => {
      const stream = { resume: vi.fn(), destroy: vi.fn() };
      const source = { resume: vi.fn(), destroy: vi.fn() };
      setResponseBodySource(stream, source);
      setResponseBodySource(source, stream);

      disposeNodeStream(stream);

      expect(stream.destroy).toHaveBeenCalledOnce();
      expect(source.destroy).toHaveBeenCalledOnce();
      expect(stream.resume).not.toHaveBeenCalled();
      expect(source.resume).not.toHaveBeenCalled();
    });

    it("drains streams that cannot be destroyed", () => {
      const stream = { resume: vi.fn() };

      disposeNodeStream(stream);

      expect(stream.resume).toHaveBeenCalledOnce();
    });

    it("logs synchronous destruction errors without throwing", () => {
      const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});
      const failure = new Error("destroy failed");
      const stream = {
        resume: vi.fn(),
        destroy() {
          throw failure;
        },
      };

      expect(() => disposeNodeStream(stream)).not.toThrow();
      expect(warning).toHaveBeenCalledExactlyOnceWith("Error disposing Node stream", failure);
    });
  });

  it("runs the transport disposer once even when destroying the response body throws", async () => {
    vi.spyOn(logger, "warning").mockImplementation(() => {});
    const dispose = vi.fn();
    const response = {
      readableStreamBody: {
        resume: vi.fn(),
        destroy() {
          throw new Error("cleanup failed");
        },
      },
    };
    setResponseBodyDisposer(response, dispose);

    await disposeResponseBody(response);
    await disposeResponseBody(response);

    expect(dispose).toHaveBeenCalledOnce();
    expect(logger.warning).toHaveBeenCalledWith(
      "Error disposing Node stream",
      expect.objectContaining({ message: "cleanup failed" }),
    );
  });

  it.each([
    { stream: false, progress: false },
    { stream: false, progress: true },
    { stream: true, progress: false },
    { stream: true, progress: true },
  ])(
    "releases a real socket and upload before following an early redirect (stream=$stream, progress=$progress)",
    async ({ stream, progress }) => {
      const server = http.createServer((request, response) => {
        request.once("data", () => {
          if (request.url === "/") {
            response.writeHead(307, { location: "/redirect", "content-length": "0" });
          }
          response.end();
        });
      });
      const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
      const uploads: Readable[] = [];
      server.listen(0, "127.0.0.1");
      await once(server, "listening");

      try {
        const address = server.address();
        if (!address || typeof address === "string") {
          throw new Error("Expected a TCP server address");
        }
        const controller = new AbortController();
        const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
        const request = createPipelineRequest({
          url: `http://127.0.0.1:${address.port}`,
          method: "PUT",
          allowInsecureConnection: true,
          abortSignal: controller.signal,
          body: () => {
            const upload =
              uploads.length === 0 ? new Readable({ read() {} }) : Readable.from(["done"]);
            if (uploads.length === 0) {
              upload.push("pending upload");
            }
            uploads.push(upload);
            return upload;
          },
          onUploadProgress: progress ? () => {} : undefined,
          streamResponseStatusCodes: stream ? new Set([307]) : undefined,
        });
        request.agent = agent;
        const client = createNodeHttpClient();
        const response = await redirectPolicy().sendRequest(request, (r) => client.sendRequest(r));
        await new Promise<void>((resolve) => setImmediate(resolve));

        expect(response.status).toBe(200);
        expect(uploads).toHaveLength(2);
        expect(uploads[0].destroyed).toBe(true);
        expect(removeEventListener).toHaveBeenCalledTimes(2);
      } finally {
        for (const upload of uploads) {
          upload.destroy();
        }
        agent.destroy();
        server.closeAllConnections();
        await new Promise<void>((resolve, reject) => {
          server.close((error) => {
            if (error) {
              reject(error);
            } else resolve();
          });
        });
      }
    },
  );

  it.each([
    { encoding: "gzip", progress: true, stream: false, timeout: false },
    { encoding: "gzip", progress: true, stream: true, timeout: false },
    { encoding: "deflate", progress: true, stream: false, timeout: true },
    { encoding: "deflate", progress: true, stream: true, timeout: false },
    { encoding: undefined, progress: true, stream: false, timeout: false },
    { encoding: undefined, progress: true, stream: true, timeout: false },
    { encoding: undefined, progress: false, stream: false, timeout: false },
    { encoding: undefined, progress: false, stream: true, timeout: false },
    { encoding: undefined, progress: false, stream: false, timeout: true },
  ])(
    "propagates cancellation through a real response stream (encoding=$encoding, progress=$progress, stream=$stream, timeout=$timeout)",
    async ({ encoding, progress, stream, timeout }) => {
      if (timeout) {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
      }
      const text = Buffer.from("partial response");
      const chunk =
        encoding === "gzip"
          ? gzipSync(text).subarray(0, -8)
          : encoding === "deflate"
            ? deflateSync(text).subarray(0, -4)
            : text;
      const server = http.createServer((_request, response) => {
        response.writeHead(200, encoding ? { "content-encoding": encoding } : {});
        response.write(chunk);
      });
      const agent = new http.Agent({ keepAlive: true });
      server.listen(0, "127.0.0.1");
      await once(server, "listening");

      try {
        const address = server.address();
        if (!address || typeof address === "string") {
          throw new Error("Expected a TCP server address");
        }
        let resolveBodyReceived!: () => void;
        const bodyReceived = new Promise<void>((resolve) => {
          resolveBodyReceived = resolve;
        });
        if (!progress) {
          // Observe arrival without adding the progress transform under test.
          const sendRequest = http.request;
          vi.spyOn(http, "request").mockImplementation((...args) => {
            const outgoing = sendRequest(...args);
            outgoing.once("response", (response) => {
              response.once("data", () => resolveBodyReceived());
            });
            return outgoing;
          });
        }
        const controller = new AbortController();
        const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
        const request = createPipelineRequest({
          url: `http://127.0.0.1:${address.port}`,
          allowInsecureConnection: true,
          abortSignal: controller.signal,
          timeout: timeout ? 1000 : 0,
          streamResponseStatusCodes: stream ? new Set([200]) : undefined,
          onDownloadProgress: progress ? () => resolveBodyReceived() : undefined,
        });
        if (encoding) {
          request.headers.set("Accept-Encoding", "gzip,deflate");
        }
        request.agent = agent;
        const result = createNodeHttpClient()
          .sendRequest(request)
          .then(async (response) => {
            if (response.readableStreamBody instanceof Readable) {
              for await (const _chunk of response.readableStreamBody) {
                // Consume the response until the transport reports cancellation.
              }
            }
            return response;
          });
        const rejection = expect(result).rejects.toMatchObject({ name: "AbortError" });
        await bodyReceived;

        if (timeout) {
          vi.advanceTimersByTime(1000);
        } else controller.abort();

        await rejection;
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(removeEventListener).toHaveBeenCalledOnce();
      } finally {
        agent.destroy();
        server.closeAllConnections();
        await new Promise<void>((resolve, reject) => {
          server.close((error) => {
            if (error) {
              reject(error);
            } else resolve();
          });
        });
        if (timeout) {
          vi.useRealTimers();
        }
      }
    },
  );

  it.each([
    { encoding: "gzip", progress: false },
    { encoding: "deflate", progress: false },
    { encoding: "gzip", progress: true },
    { encoding: undefined, progress: true },
    { encoding: undefined, progress: false },
  ])(
    "keeps a completed response connection reusable (encoding=$encoding, progress=$progress)",
    async ({ encoding, progress }) => {
      const text = "complete response";
      const content =
        encoding === "gzip" ? gzipSync(text) : encoding === "deflate" ? deflateSync(text) : text;
      const server = http.createServer((_request, response) => {
        response.writeHead(200, encoding ? { "content-encoding": encoding } : {});
        response.end(content);
      });
      const connected = vi.fn();
      server.on("connection", connected);
      const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
      server.listen(0, "127.0.0.1");
      await once(server, "listening");

      try {
        const address = server.address();
        if (!address || typeof address === "string") {
          throw new Error("Expected a TCP server address");
        }
        const client = createNodeHttpClient();
        for (let attempt = 0; attempt < 2; attempt++) {
          const request = createPipelineRequest({
            url: `http://127.0.0.1:${address.port}`,
            allowInsecureConnection: true,
            onDownloadProgress: progress ? () => {} : undefined,
          });
          request.headers.set("Accept-Encoding", "gzip,deflate");
          request.agent = agent;

          expect((await client.sendRequest(request)).bodyAsText).toBe(text);
        }
        expect(connected).toHaveBeenCalledOnce();
      } finally {
        agent.destroy();
        server.closeAllConnections();
        await new Promise<void>((resolve, reject) => {
          server.close((error) => {
            if (error) {
              reject(error);
            } else resolve();
          });
        });
      }
    },
  );
});
