// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import { lookup } from "node:dns";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "../../../src/index.js";
import { getRequestCompletion } from "../../../src/util/responseBody.js";

const servers: http.Server[] = [];

async function listen(server: http.Server): Promise<number> {
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected a TCP address");
  }
  return address.port;
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        }),
    ),
  );
});

describe("Expect: 100-continue", () => {
  it.each([
    { expectContinue: false, factory: false },
    { expectContinue: false, factory: true },
    { expectContinue: true, factory: false },
    { expectContinue: true, factory: true },
  ])(
    "prepares a body once and preserves framing with upload progress (expectContinue=$expectContinue, factory=$factory)",
    async ({ expectContinue, factory }) => {
      const body = new DataView(Uint8Array.from([0, 1, 2, 3, 4]).buffer, 1, 3);
      const bodyFactory = vi.fn(() =>
        Readable.from([Buffer.from(body.buffer, body.byteOffset, body.byteLength)]),
      );
      const progress = vi.fn();
      const chunks: Buffer[] = [];
      let receivedHeaders: http.IncomingHttpHeaders | undefined;
      const receiveBody: http.RequestListener = (request, response) => {
        receivedHeaders = request.headers;
        request.on("data", (chunk: Buffer) => chunks.push(chunk));
        request.on("end", () => response.end("accepted"));
      };
      const server = http.createServer(receiveBody);
      server.on("checkContinue", (request, response) => {
        expect(bodyFactory).not.toHaveBeenCalled();
        expect(progress).not.toHaveBeenCalled();
        receiveBody(request, response);
        response.writeContinue();
        response.writeContinue();
      });
      const port = await listen(server);

      const response = await createDefaultHttpClient().sendRequest(
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders(expectContinue ? { Expect: "100-continue" } : {}),
          body: factory ? bodyFactory : body,
          onUploadProgress: progress,
        }),
      );

      expect(response.bodyAsText).toBe("accepted");
      expect(bodyFactory).toHaveBeenCalledTimes(factory ? 1 : 0);
      expect(Buffer.concat(chunks)).toEqual(Buffer.from([1, 2, 3]));
      expect(progress).toHaveBeenCalledExactlyOnceWith({ loadedBytes: 3 });
      if (factory) {
        expect(receivedHeaders?.["content-length"]).toBeUndefined();
        expect(receivedHeaders?.["transfer-encoding"]).toBe("chunked");
      } else {
        expect(receivedHeaders?.["content-length"]).toBe("3");
        expect(receivedHeaders?.["transfer-encoding"]).toBeUndefined();
      }
    },
  );

  it("waits for 100 Continue before creating and sending the body", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    let receivedBody = "";
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      expect(request.headers.expect).toBe("100-continue");
      expect(bodyFactory).not.toHaveBeenCalled();
      request.setEncoding("utf8");
      request.on("data", (chunk) => {
        receivedBody += chunk;
      });
      request.on("end", () => {
        response.end("accepted");
      });
      response.writeContinue();
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(200);
    expect(response.bodyAsText).toBe("accepted");
    expect(receivedBody).toBe("payload");
    expect(bodyFactory).toHaveBeenCalledOnce();
  });

  it("does not create the body when the server sends a final response", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    const server = http.createServer();
    server.on("checkContinue", (_request, response) => {
      response.writeHead(417);
      response.end("rejected");
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(417);
    expect(response.bodyAsText).toBe("rejected");
    expect(bodyFactory).not.toHaveBeenCalled();
  });

  it.each([
    { streamedResponse: false, progress: false },
    { streamedResponse: false, progress: true },
    { streamedResponse: true, progress: false },
    { streamedResponse: true, progress: true },
  ])(
    "releases the abort listener without waiting for an untouched body after rejection (streamedResponse=$streamedResponse, progress=$progress)",
    async ({ streamedResponse, progress }) => {
      const read = vi.fn();
      const body = new Readable({ read });
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const onUploadProgress = vi.fn();
      const server = http.createServer();
      server.on("checkContinue", (_request, response) => {
        response.writeHead(417);
        response.end("rejected");
      });
      const port = await listen(server);

      try {
        const response = await createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body,
            abortSignal: controller.signal,
            onUploadProgress: progress ? onUploadProgress : undefined,
            streamResponseStatusCodes: streamedResponse ? new Set([417]) : undefined,
          }),
        );

        expect(response.status).toBe(417);
        if (streamedResponse) {
          await new Promise<void>((resolve) => setImmediate(resolve));
          expect(removeEventListener).not.toHaveBeenCalled();
          const responseStream = response.readableStreamBody;
          if (!responseStream) {
            throw new Error("Expected a streamed rejection response");
          }
          const responseComplete = finished(responseStream, { writable: false });
          responseStream.resume();
          await responseComplete;
        } else {
          expect(response.bodyAsText).toBe("rejected");
        }
        await getRequestCompletion(response);
        await new Promise<void>((resolve) => setImmediate(resolve));

        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("abort", expect.any(Function));
        expect(read).not.toHaveBeenCalled();
        expect(onUploadProgress).not.toHaveBeenCalled();
        expect(body.destroyed).toBe(false);
        expect(body.readableEnded).toBe(false);
        expect(body.listenerCount("data")).toBe(0);
        expect(body.listenerCount("end")).toBe(0);
        expect(body.listenerCount("close")).toBe(0);
        expect(body.listenerCount("error")).toBe(0);
      } finally {
        body.destroy();
      }
    },
  );

  it("sends the body after the fixed fallback when no Continue response arrives", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    let headersReceivedAt = 0;
    let bodyReceivedAt = 0;
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      headersReceivedAt = Date.now();
      request.once("data", () => {
        bodyReceivedAt = Date.now();
      });
      request.resume();
      request.on("end", () => response.end());
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(200);
    expect(bodyFactory).toHaveBeenCalledOnce();
    expect(bodyReceivedAt - headersReceivedAt).toBeGreaterThanOrEqual(900);
  });

  it.each([false, true])(
    "excludes slow DNS from the fallback (serverSendsContinue=%s)",
    async (serverSendsContinue) => {
      let bodyCreatedAt = 0;
      let headersReceivedAt = 0;
      let continueSentAt = 0;
      const bodyFactory = vi.fn(() => {
        bodyCreatedAt = Date.now();
        return Readable.from(["payload"]);
      });
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        headersReceivedAt = Date.now();
        request.resume();
        request.on("end", () => response.end("accepted"));
        if (serverSendsContinue) {
          setTimeout(() => {
            continueSentAt = Date.now();
            response.writeContinue();
          }, 50);
        }
      });
      const port = await listen(server);
      const agent = new http.Agent({
        lookup(_hostname, options, callback) {
          setTimeout(() => lookup("127.0.0.1", options, callback), 1200);
        },
      });
      try {
        const response = await createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://delayed-lookup.test:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            requestOverrides: { agent },
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body: bodyFactory,
          }),
        );

        expect(response.bodyAsText).toBe("accepted");
        expect(bodyFactory).toHaveBeenCalledOnce();
        if (serverSendsContinue) {
          expect(continueSentAt).toBeGreaterThan(0);
          expect(bodyCreatedAt).toBeGreaterThanOrEqual(continueSentAt);
        } else {
          expect(bodyCreatedAt - headersReceivedAt).toBeGreaterThanOrEqual(900);
        }
      } finally {
        agent.destroy();
      }
    },
  );

  it("does not consume the fallback while queued for a reused agent socket", async () => {
    let releaseFirstResponse: (() => void) | undefined;
    let firstRequestArrived!: () => void;
    const firstRequest = new Promise<void>((resolve) => {
      firstRequestArrived = resolve;
    });
    const server = http.createServer((_request, response) => {
      releaseFirstResponse = () => response.end("first");
      firstRequestArrived();
    });
    let continueSentAt = 0;
    let bodyCreatedAt = 0;
    const bodyFactory = vi.fn(() => {
      bodyCreatedAt = Date.now();
      return Readable.from(["payload"]);
    });
    server.on("checkContinue", (request, response) => {
      request.resume();
      request.on("end", () => response.end("second"));
      setTimeout(() => {
        continueSentAt = Date.now();
        response.writeContinue();
      }, 50);
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
    const client = createDefaultHttpClient();
    const first = client.sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        allowInsecureConnection: true,
        requestOverrides: { agent },
      }),
    );
    try {
      await firstRequest;
      const second = client.sendRequest(
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          requestOverrides: { agent },
          headers: createHttpHeaders({ Expect: "100-continue" }),
          body: bodyFactory,
        }),
      );
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      const bodyCreatedWhileQueued = bodyFactory.mock.calls.length > 0;
      releaseFirstResponse?.();
      const [, response] = await Promise.all([first, second]);

      expect(bodyCreatedWhileQueued).toBe(false);
      expect(response.bodyAsText).toBe("second");
      expect(bodyFactory).toHaveBeenCalledOnce();
      expect(continueSentAt).toBeGreaterThan(0);
      expect(bodyCreatedAt).toBeGreaterThanOrEqual(continueSentAt);
    } finally {
      releaseFirstResponse?.();
      agent.destroy();
    }
  });
});
