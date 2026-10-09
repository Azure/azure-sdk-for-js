// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import http from "node:http";
import https from "node:https";
import { performance } from "node:perf_hooks";
import { Readable } from "node:stream";
import { gzipSync, deflateSync } from "node:zlib";
import type { LookupFunction } from "node:net";
import { HttpProxyAgent } from "http-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";
import {
  createProxy,
  createRelay,
  createServer,
  testCertificate,
} from "../../internal/node/httpServer.js";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
  type PipelineRequestOptions,
} from "../../../src/index.js";
import { createPipelineFromOptions } from "../../../src/createPipelineFromOptions.js";

function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let complete!: (value: T) => void;
  const promise = new Promise<T>((resolve) => {
    complete = resolve;
  });
  return { promise, resolve: complete };
}

async function readText(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString();
}

describe("Expect: 100-continue on the wire", () => {
  const cleanups: (() => Promise<void>)[] = [];
  afterEach(async () => {
    for (const close of cleanups.splice(0).reverse()) await close();
  });
  const setup = async (secure = false): Promise<Awaited<ReturnType<typeof createServer>>> => {
    const fixture = await createServer(secure);
    cleanups.push(fixture.close);
    return fixture;
  };
  const pipelineRequest = (
    fixture: Awaited<ReturnType<typeof createServer>>,
    options: Omit<PipelineRequestOptions, "url"> = {},
  ): ReturnType<typeof createPipelineRequest> => {
    const request = createPipelineRequest({
      url: fixture.url,
      method: "POST",
      allowInsecureConnection: true,
      headers: createHttpHeaders({ Expect: "100-continue" }),
      ...options,
    });
    request.agent = fixture.agent;
    return request;
  };

  it("orders an empty write after real delayed TLS without sending body bytes", async () => {
    const fixture = await createServer(true);
    cleanups.push(fixture.close);
    const relay = await createRelay(Number(new URL(fixture.url).port), 1200);
    cleanups.push(relay.close);
    let receivedBytes = 0;
    fixture.server.on("checkContinue", (request, response) => {
      request.on("data", (chunk: Buffer) => (receivedBytes += chunk.length));
      request.on("end", () => response.end("done"));
    });
    const started = performance.now();
    await new Promise<void>((resolve, reject) => {
      const request = https.request(
        {
          hostname: "localhost",
          port: relay.port,
          agent: fixture.agent,
          method: "POST",
          headers: { Expect: "100-continue", "Content-Length": "4" },
        },
        (response) => {
          response.resume();
          response.once("end", resolve);
          response.once("error", reject);
        },
      );
      request.once("error", reject);
      request.flushHeaders();
      request.write("", (error) => {
        if (error) return reject(error);
        try {
          expect(performance.now() - started).toBeGreaterThanOrEqual(1100);
          expect(receivedBytes).toBe(0);
          request.end("body");
        } catch (e) {
          reject(e);
          request.destroy();
        }
      });
    });
    expect(receivedBytes).toBe(4);
  }, 10000);

  it("does not complete the header write while queued in an agent", async () => {
    const fixture = await createServer();
    cleanups.push(fixture.close);
    fixture.agent.maxSockets = 1;
    let release: (() => void) | undefined;
    fixture.server.on("request", (_request, response) => {
      release = () => response.end();
    });
    fixture.server.on("checkContinue", (request, response) => {
      request.resume();
      request.once("end", () => response.end());
    });
    const first = http.get(fixture.url, { agent: fixture.agent }, (response) => response.resume());
    await new Promise<void>((resolve, reject) => {
      first.once("error", reject);
      fixture.server.once("request", () => resolve());
    });
    let flushed = false;
    const completed = new Promise<void>((resolve, reject) => {
      const request = http.request(
        fixture.url,
        { agent: fixture.agent, method: "POST", headers: { Expect: "100-continue" } },
        (response) => {
          response.resume();
          response.once("end", resolve);
          response.once("error", reject);
        },
      );
      request.once("error", reject);
      request.flushHeaders();
      request.write("", (error) => {
        if (error) return reject(error);
        flushed = true;
        request.end("body");
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(flushed).toBe(false);
    release?.();
    await completed;
    expect(flushed).toBe(true);
  }, 10000);

  it.each([false, true])(
    "defers factories, reads and progress until 100 (TLS=%s)",
    async (secure) => {
      const fixture = await setup(secure);
      const headersSeen = deferred<http.ServerResponse>();
      let receivedBytes = 0;
      fixture.server.on("checkContinue", (incoming, response) => {
        headersSeen.resolve(response);
        incoming.on("data", (chunk: Buffer) => {
          receivedBytes += chunk.length;
        });
        incoming.once("end", () => response.end("accepted"));
      });
      let reads = 0;
      const factory = vi.fn(
        () =>
          new Readable({
            read() {
              reads++;
              this.push("payload");
              this.push(null);
            },
          }),
      );
      const progress = vi.fn();
      const pending = createDefaultHttpClient().sendRequest(
        pipelineRequest(fixture, {
          body: factory,
          onUploadProgress: progress,
        }),
      );
      const response = await headersSeen.promise;
      await new Promise((resolve) => setTimeout(resolve, 75));
      expect(factory).not.toHaveBeenCalled();
      expect(reads).toBe(0);
      expect(progress).not.toHaveBeenCalled();
      expect(receivedBytes).toBe(0);
      response.writeContinue();
      response.writeContinue();
      const final = await pending;
      expect(final.status).toBe(200);
      expect(final.bodyAsText).toBe("accepted");
      expect(factory).toHaveBeenCalledOnce();
      expect(reads).toBe(1);
      expect(receivedBytes).toBe(7);
      expect(progress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
    },
  );

  it.each([401, 413, 417, 429, 503])(
    "returns early %s without touching caller streams and retires framing",
    async (status) => {
      const fixture = await setup();
      fixture.agent.maxSockets = 1;
      let connections = 0;
      fixture.server.on("connection", () => {
        connections++;
      });
      fixture.server.on("checkContinue", (_incoming, response) => {
        response.writeHead(status, { Connection: "keep-alive" });
        response.write("early ");
        setTimeout(() => response.end("final"), 25);
      });
      fixture.server.on("request", (_incoming, response) => response.end("next"));
      const source = new Readable({
        read() {
          throw new Error("Untouched source was read");
        },
      });
      const progress = vi.fn();
      const client = createDefaultHttpClient();
      const request = pipelineRequest(fixture, { body: source, onUploadProgress: progress });
      const first = await client.sendRequest(request);
      expect(first.status).toBe(status);
      expect(first.bodyAsText).toBe("early final");
      expect(source.destroyed).toBe(false);
      expect(source.readableFlowing).toBe(null);
      expect(progress).not.toHaveBeenCalled();
      const next = await client.sendRequest(
        pipelineRequest(fixture, {
          method: "GET",
          headers: createHttpHeaders(),
        }),
      );
      expect(next.bodyAsText).toBe("next");
      expect(connections).toBe(2);
      source.destroy();
    },
  );

  it.each(["text", "stream", "gzip", "deflate", "HEAD"])(
    "preserves early %s responses",
    async (kind) => {
      const fixture = await setup();
      const payload = Buffer.from("readable final response");
      fixture.server.on("checkContinue", (_incoming, response) => {
        const encoded =
          kind === "gzip" ? gzipSync(payload) : kind === "deflate" ? deflateSync(payload) : payload;
        response.writeHead(417, {
          "Content-Length": encoded.length,
          ...(kind === "gzip" || kind === "deflate" ? { "Content-Encoding": kind } : {}),
        });
        if (kind === "HEAD") response.end();
        else {
          response.write(encoded.subarray(0, 5));
          setTimeout(() => response.end(encoded.subarray(5)), 25);
        }
      });
      const factory = vi.fn(() => Readable.from("never"));
      const request = pipelineRequest(fixture, {
        body: factory,
        method: kind === "HEAD" ? "HEAD" : "POST",
        headers: createHttpHeaders({ Expect: "100-continue", "Accept-Encoding": "gzip, deflate" }),
        streamResponseStatusCodes: kind === "stream" ? new Set([417]) : undefined,
      });
      const response = await createDefaultHttpClient().sendRequest(request);
      expect(response.status).toBe(417);
      expect(
        kind === "stream" ? await readText(response.readableStreamBody!) : response.bodyAsText,
      ).toBe(kind === "HEAD" ? undefined : payload.toString());
      expect(factory).not.toHaveBeenCalled();
    },
  );

  it.each(["immediate", "lookup", "TLS", "CONNECT", "forward", "customAgent"])(
    "fallback excludes %s setup",
    async (kind) => {
      const secure = kind === "TLS" || kind === "CONNECT";
      const fixture = await setup(secure);
      let headersAt = 0;
      let firstByteAt = 0;
      let bytes = 0;
      fixture.server.on("checkContinue", (incoming, response) => {
        headersAt = performance.now();
        incoming.on("data", (chunk: Buffer) => {
          firstByteAt ||= performance.now();
          bytes += chunk.length;
        });
        incoming.once("end", () => {
          response.writeContinue();
          response.end("fallback");
        });
      });
      const factory = vi.fn(() => Readable.from("payload"));
      const request = pipelineRequest(fixture, { body: factory });
      if (kind === "lookup" || kind === "customAgent") {
        const lookup: LookupFunction = (_hostname, _options, callback) => {
          setTimeout(() => callback(null, "127.0.0.1", 4), 1200);
        };
        if (kind === "customAgent") {
          const original = fixture.agent.createConnection.bind(fixture.agent);
          vi.spyOn(fixture.agent, "createConnection").mockImplementation((options, callback) => {
            const connectionOptions = { ...options, lookup, autoSelectFamily: false };
            return original(connectionOptions, callback);
          });
        } else {
          request.requestOverrides = { lookup, autoSelectFamily: false };
        }
      } else if (kind === "TLS") {
        const relay = await createRelay(Number(new URL(fixture.url).port), 1200);
        cleanups.push(relay.close);
        request.url = `https://localhost:${relay.port}`;
      } else if (kind === "CONNECT" || kind === "forward") {
        const proxy = await createProxy(kind === "CONNECT" ? 1200 : 0);
        cleanups.push(proxy.close);
        const agent =
          kind === "CONNECT"
            ? new HttpsProxyAgent(proxy.url, { keepAlive: true })
            : new HttpProxyAgent(proxy.url, { keepAlive: true });
        cleanups.push(async () => {
          agent.destroy();
        });
        request.agent = agent;
        request.requestOverrides = { ca: testCertificate };
      }
      const started = performance.now();
      const response = await createDefaultHttpClient().sendRequest(request);
      expect(response.status).toBe(200);
      expect(response.bodyAsText).toBe("fallback");
      expect(firstByteAt - headersAt).toBeGreaterThanOrEqual(900);
      expect(firstByteAt - headersAt).toBeLessThan(5000);
      if (["lookup", "TLS", "CONNECT", "customAgent"].includes(kind)) {
        expect(headersAt - started).toBeGreaterThanOrEqual(1100);
      }
      expect(factory).toHaveBeenCalledOnce();
      expect(bytes).toBe(7);
    },
    15000,
  );

  it.each([
    { framing: "fixed", owned: false },
    { framing: "chunked", owned: false },
    { framing: "fixed", owned: true },
    { framing: "chunked", owned: true },
  ])(
    "stops backpressured $framing uploads on 417 without losing the response (owned=$owned)",
    async ({ framing, owned }) => {
      const fixture = await setup();
      let received = 0;
      fixture.server.on("checkContinue", (incoming, response) => {
        response.writeContinue();
        incoming.on("data", (chunk: Buffer) => {
          received += chunk.length;
          if (!response.headersSent) {
            response.writeHead(417, { "Content-Length": 10, Connection: "keep-alive" });
            response.write("stop ");
            setTimeout(() => response.end("early"), 100);
          }
        });
      });
      let reads = 0;
      const size = 64 * 1024;
      const source = new Readable({
        read() {
          reads++;
          this.push(reads <= 1024 ? Buffer.alloc(size) : null);
        },
      });
      const progress = vi.fn();
      const request = pipelineRequest(fixture, {
        body: owned ? () => source : source,
        onUploadProgress: progress,
        headers: createHttpHeaders({
          Expect: "100-continue",
          ...(framing === "fixed" ? { "Content-Length": 1024 * size } : {}),
        }),
      });
      const response = await createDefaultHttpClient().sendRequest(request);
      expect(response.status).toBe(417);
      expect(response.bodyAsText).toBe("stop early");
      const stoppedAt = reads;
      const progressAt = progress.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, 75));
      expect(reads).toBe(stoppedAt);
      expect(progress.mock.calls.length).toBe(progressAt);
      expect(reads).toBeLessThan(1024);
      expect(received).toBeGreaterThan(0);
      expect(source.destroyed).toBe(owned);
      source.destroy();
    },
  );

  it("supports cancellation of an early streamed response after headers", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (_incoming, response) => {
      response.writeHead(417);
      response.write("waiting");
    });
    const controller = new AbortController();
    const source = new Readable({
      read() {
        throw new Error("Unexpected upload read");
      },
    });
    const request = pipelineRequest(fixture, {
      body: source,
      abortSignal: controller.signal,
      streamResponseStatusCodes: new Set([417]),
    });
    const response = await createDefaultHttpClient().sendRequest(request);
    const reading = readText(response.readableStreamBody!);
    controller.abort();
    await expect(reading).rejects.toMatchObject({ name: "AbortError" });
    expect(source.destroyed).toBe(false);
    source.destroy();
  });

  it("handles a caller source's in-flight error after an early final without losing the response", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (incoming, response) => {
      response.writeContinue();
      incoming.once("data", () => {
        response.writeHead(417);
        response.end("final");
      });
    });
    let started = false;
    const source = new Readable({
      read() {
        if (started) return;
        started = true;
        this.push("first");
        setTimeout(() => this.destroy(new Error("in-flight read failed")), 100);
      },
    });
    const closed = new Promise<void>((resolve) => source.once("close", resolve));
    const response = await createDefaultHttpClient().sendRequest(
      pipelineRequest(fixture, { body: source }),
    );
    expect(response.status).toBe(417);
    expect(response.bodyAsText).toBe("final");
    expect(source.destroyed).toBe(false);
    await closed;
    expect(source.listenerCount("error")).toBe(0);
  });

  it.each(["retry", "redirect"])("reuses an untouched source on an early %s", async (kind) => {
    const fixture = await setup();
    let attempts = 0;
    let received = "";
    fixture.server.on("checkContinue", (incoming, response) => {
      attempts++;
      if (attempts === 1) {
        response.writeHead(kind === "retry" ? 503 : 307, { Location: "/next" });
        response.end("try again");
      } else {
        response.writeContinue();
        incoming.on("data", (chunk: Buffer) => {
          received += chunk.toString();
        });
        incoming.once("end", () => response.end("done"));
      }
    });
    const pipeline = createPipelineFromOptions({
      retryOptions: { retryDelayInMs: 1, maxRetries: 1 },
    });
    const response = await pipeline.sendRequest(
      createDefaultHttpClient(),
      pipelineRequest(fixture, {
        body: Readable.from("replayed"),
      }),
    );
    expect(response.bodyAsText).toBe("done");
    expect(attempts).toBe(2);
    expect(received).toBe("replayed");
  });

  it("rejects a started one-shot stream on a body-preserving retry", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (incoming, response) => {
      response.writeContinue();
      incoming.resume();
      incoming.once("end", () => {
        response.writeHead(503);
        response.end();
      });
    });
    const pipeline = createPipelineFromOptions({
      retryOptions: { retryDelayInMs: 1, maxRetries: 1 },
    });
    await expect(
      pipeline.sendRequest(
        createDefaultHttpClient(),
        pipelineRequest(fixture, {
          body: Readable.from("once"),
        }),
      ),
    ).rejects.toMatchObject({ name: "RestError", code: "REQUEST_BODY_NOT_REPLAYABLE" });
  });

  it("removes expectation and overridden framing on a body-removing redirect", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (_incoming, response) => {
      response.writeHead(303, { Location: "/next" });
      response.end();
    });
    let actual: http.IncomingMessage | undefined;
    fixture.server.on("request", (incoming, response) => {
      actual = incoming;
      response.end("redirected");
    });
    const request = pipelineRequest(fixture, {
      body: () => Readable.from("unused"),
      requestOverrides: {
        method: "POST",
        headers: [
          "Host",
          new URL(fixture.url).host,
          "Expect",
          "100-continue",
          "Transfer-Encoding",
          "chunked",
        ],
      },
    });
    const response = await createPipelineFromOptions({}).sendRequest(
      createDefaultHttpClient(),
      request,
    );
    expect(response.bodyAsText).toBe("redirected");
    expect(actual?.method).toBe("GET");
    expect(actual?.headers.expect).toBeUndefined();
    expect(actual?.headers["content-length"]).toBeUndefined();
    expect(actual?.headers["transfer-encoding"]).toBeUndefined();
  });

  it("keeps multipart part factories lazy through the public pipeline", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (_incoming, response) => {
      response.writeHead(417);
      response.end("no multipart");
    });
    const factory = vi.fn(() => Readable.from("part"));
    const response = await createPipelineFromOptions({}).sendRequest(
      createDefaultHttpClient(),
      pipelineRequest(fixture, {
        multipartBody: { parts: [{ headers: createHttpHeaders(), body: factory }] },
      }),
    );
    expect(response.bodyAsText).toBe("no multipart");
    expect(factory).not.toHaveBeenCalled();
  });

  it.each(["early", "continue"])(
    "gates Blob conversion through the FormData pipeline (%s)",
    async (kind) => {
      const fixture = await setup();
      const blob = new Blob(["blob body"]);
      const converted = vi.spyOn(blob, "stream");
      fixture.server.on("checkContinue", (incoming, response) => {
        expect(converted).not.toHaveBeenCalled();
        if (kind === "early") {
          response.writeHead(417);
          response.end("rejected");
        } else {
          response.writeContinue();
          incoming.resume();
          incoming.once("end", () => response.end("complete"));
        }
      });
      const response = await createPipelineFromOptions({}).sendRequest(
        createDefaultHttpClient(),
        pipelineRequest(fixture, { formData: { file: blob } }),
      );
      expect(response.status).toBe(kind === "early" ? 417 : 200);
      expect(converted).toHaveBeenCalledTimes(kind === "early" ? 0 : 1);
    },
  );

  it.each([
    { name: "UTF-8", body: "h\u00e9llo", expected: Buffer.from("h\u00e9llo") },
    { name: "Buffer", body: Buffer.from("body"), expected: Buffer.from("body") },
    {
      name: "ArrayBuffer",
      body: new Uint8Array([1, 2, 3]).buffer,
      expected: Buffer.from([1, 2, 3]),
    },
    {
      name: "typed array window",
      body: new Uint8Array([0, 1, 2, 0]).subarray(1, 3),
      expected: Buffer.from([1, 2]),
    },
    {
      name: "DataView window",
      body: new DataView(new Uint8Array([0, 1, 2, 0]).buffer, 1, 2),
      expected: Buffer.from([1, 2]),
    },
  ])("sends $name with accurate framing and progress", async ({ body, expected }) => {
    const fixture = await setup();
    let length: string | undefined;
    let actual = Buffer.alloc(0);
    fixture.server.on("checkContinue", (incoming, response) => {
      length = incoming.headers["content-length"];
      response.writeContinue();
      const chunks: Buffer[] = [];
      incoming.on("data", (chunk: Buffer) => chunks.push(chunk));
      incoming.once("end", () => {
        actual = Buffer.concat(chunks);
        response.end("done");
      });
    });
    const progress = vi.fn();
    const response = await createDefaultHttpClient().sendRequest(
      pipelineRequest(fixture, {
        body,
        onUploadProgress: progress,
      }),
    );
    expect(response.status).toBe(200);
    expect(actual).toEqual(expected);
    expect(length).toBe(String(expected.length));
    expect(progress).toHaveBeenLastCalledWith({ loadedBytes: expected.length });
  });

  it.each([undefined, "", Buffer.alloc(0), new Uint8Array(0), new ArrayBuffer(0)])(
    "immediately ends a known-empty body without dropping Expect (%s)",
    async (body) => {
      const fixture = await setup();
      fixture.server.on("checkContinue", (incoming, response) => {
        expect(incoming.headers.expect).toBe("100-continue");
        expect(incoming.headers["content-length"]).toBe("0");
        incoming.resume();
        incoming.once("end", () => response.end("empty"));
      });
      const started = performance.now();
      const response = await createDefaultHttpClient().sendRequest(
        pipelineRequest(fixture, { body }),
      );
      expect(response.bodyAsText).toBe("empty");
      expect(performance.now() - started).toBeLessThan(900);
    },
  );

  it("gates an unknown empty factory and terminates its chunked framing", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (incoming, response) => {
      expect(incoming.headers["transfer-encoding"]).toBe("chunked");
      response.writeContinue();
      incoming.resume();
      incoming.once("end", () => response.end("empty factory"));
    });
    const factory = vi.fn(() => Readable.from([]));
    const response = await createDefaultHttpClient().sendRequest(
      pipelineRequest(fixture, { body: factory }),
    );
    expect(response.bodyAsText).toBe("empty factory");
    expect(factory).toHaveBeenCalledOnce();
  });

  it("preserves Node validation of malformed effective headers", async () => {
    const fixture = await setup();
    const factory = vi.fn(() => Readable.from("unused"));
    await expect(
      createDefaultHttpClient().sendRequest(
        pipelineRequest(fixture, {
          body: factory,
          requestOverrides: { headers: { Expect: "100-continue, invalid\r\nheader" } },
        }),
      ),
    ).rejects.toMatchObject({ code: "ERR_INVALID_CHAR" });
    expect(factory).not.toHaveBeenCalled();
  });

  it("handles a known-empty upload through a real forward proxy", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (incoming, response) => {
      incoming.resume();
      incoming.once("end", () => response.end("empty"));
    });
    const proxy = await createProxy();
    cleanups.push(proxy.close);
    const agent = new HttpProxyAgent(proxy.url);
    cleanups.push(async () => {
      agent.destroy();
    });
    const request = pipelineRequest(fixture, { body: "" });
    request.agent = agent;
    expect((await createDefaultHttpClient().sendRequest(request)).bodyAsText).toBe("empty");
  });

  it.each(["object", "flat", "pairs"])(
    "honors replaced %s headers, tokens, and explicit framing",
    async (shape) => {
      const fixture = await setup();
      const host = new URL(fixture.url).host;
      const pairs = [
        ["Host", host],
        ["eXpEcT", "unrelated, 100-CoNtInUe"],
        ["Transfer-Encoding", "chunked"],
      ];
      const headers =
        shape === "flat" ? pairs.flat() : shape === "pairs" ? pairs : Object.fromEntries(pairs);
      fixture.server.on("checkContinue", (incoming, response) => {
        expect(incoming.headers.expect).toBe("unrelated, 100-CoNtInUe");
        expect(incoming.headers["content-length"]).toBeUndefined();
        expect(incoming.headers["transfer-encoding"]).toBe("chunked");
        expect(incoming.headers["x-discarded"]).toBeUndefined();
        response.writeContinue();
        incoming.resume();
        incoming.once("end", () => response.end("replaced"));
      });
      const response = await createDefaultHttpClient().sendRequest(
        pipelineRequest(fixture, {
          body: "body",
          headers: createHttpHeaders({ "X-Discarded": "true" }),
          requestOverrides: { headers },
        }),
      );
      expect(response.bodyAsText).toBe("replaced");
      expect(headers).toEqual(
        shape === "flat" ? pairs.flat() : shape === "pairs" ? pairs : Object.fromEntries(pairs),
      );
    },
  );

  it.each([false, true])(
    "reuses finished framing on subsequent negotiated requests (TLS=%s)",
    async (secure) => {
      const fixture = await setup(secure);
      let connections = 0;
      fixture.server.on("connection", () => {
        connections++;
      });
      fixture.server.on("checkContinue", (incoming, response) => {
        response.writeContinue();
        incoming.resume();
        incoming.once("end", () => response.end("complete"));
      });
      const client = createDefaultHttpClient();
      for (let i = 0; i < 2; i++) {
        expect(
          (await client.sendRequest(pipelineRequest(fixture, { body: "body" }))).bodyAsText,
        ).toBe("complete");
      }
      expect(connections).toBe(1);
    },
  );

  it("keeps an SDK request queued for a socket out of the fallback budget", async () => {
    const fixture = await setup();
    fixture.agent.maxSockets = 1;
    const occupied = deferred<http.ServerResponse>();
    fixture.server.on("request", (_incoming, response) => occupied.resolve(response));
    fixture.server.on("checkContinue", (incoming, response) => {
      response.writeContinue();
      incoming.resume();
      incoming.once("end", () => response.end("queued"));
    });
    const client = createDefaultHttpClient();
    const first = client.sendRequest(
      pipelineRequest(fixture, { method: "GET", headers: createHttpHeaders() }),
    );
    const held = await occupied.promise;
    const factory = vi.fn(() => Readable.from("body"));
    const second = client.sendRequest(pipelineRequest(fixture, { body: factory }));
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(factory).not.toHaveBeenCalled();
    held.end();
    await first;
    expect((await second).bodyAsText).toBe("queued");
    expect(factory).toHaveBeenCalledOnce();
  }, 10000);

  it("completes an already-queued request after retiring early-response framing", async () => {
    const fixture = await setup();
    fixture.agent.maxSockets = 1;
    const headersSeen = deferred<http.ServerResponse>();
    let connections = 0;
    fixture.server.on("connection", () => {
      connections++;
    });
    fixture.server.on("checkContinue", (_incoming, response) => headersSeen.resolve(response));
    fixture.server.on("request", (_incoming, response) => response.end("safe"));
    const client = createDefaultHttpClient();
    const first = client.sendRequest(
      pipelineRequest(fixture, { body: () => Readable.from("unused") }),
    );
    const response = await headersSeen.promise;
    const next = client.sendRequest(
      pipelineRequest(fixture, { method: "GET", headers: createHttpHeaders() }),
    );
    response.writeHead(417, { Connection: "keep-alive" });
    response.end("rejected");
    expect((await first).bodyAsText).toBe("rejected");
    expect((await next).bodyAsText).toBe("safe");
    expect(connections).toBe(2);
  });

  it("returns 417 after fallback without adding a recovery attempt", async () => {
    const fixture = await setup();
    let attempts = 0;
    fixture.server.on("checkContinue", (incoming, response) => {
      attempts++;
      incoming.resume();
      incoming.once("end", () => {
        response.writeHead(417);
        response.end("no recovery");
      });
    });
    const response = await createPipelineFromOptions({}).sendRequest(
      createDefaultHttpClient(),
      pipelineRequest(fixture, { body: () => Readable.from("body") }),
    );
    expect(response.status).toBe(417);
    expect(response.bodyAsText).toBe("no recovery");
    expect(attempts).toBe(1);
  });

  it("replays multipart with fresh factories but rejects an already-started embedded source", async () => {
    const fixture = await setup();
    fixture.server.on("checkContinue", (incoming, response) => {
      response.writeContinue();
      incoming.resume();
      incoming.once("end", () => {
        response.writeHead(503);
        response.end();
      });
    });
    const pipeline = createPipelineFromOptions({
      retryOptions: { retryDelayInMs: 1, maxRetries: 1 },
    });
    const factory = vi.fn(() => Readable.from("part"));
    const request = pipelineRequest(fixture, {
      multipartBody: { parts: [{ headers: createHttpHeaders(), body: factory }] },
    });
    expect((await pipeline.sendRequest(createDefaultHttpClient(), request)).status).toBe(503);
    expect(factory).toHaveBeenCalledTimes(2);
    await expect(
      pipeline.sendRequest(
        createDefaultHttpClient(),
        pipelineRequest(fixture, {
          multipartBody: {
            parts: [{ headers: createHttpHeaders(), body: Readable.from("one-shot") }],
          },
        }),
      ),
    ).rejects.toMatchObject({ code: "REQUEST_BODY_NOT_REPLAYABLE" });
  });
});
