// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, afterEach, vi } from "vitest";
import type { ClientRequest, IncomingMessage } from "node:http";
import { type IncomingHttpHeaders } from "node:http";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { getBinaryStreamResponse } from "../../../src/getBinaryStreamResponse.js";

vi.mock("node:https", async () => {
  const actual = await vi.importActual("node:https");
  return {
    default: {
      ...((actual as Record<string, unknown>).default as Record<string, unknown>),
      request: vi.fn(),
    },
  };
});

import https from "https";

const mockBaseUrl = "https://example.org";

describe("[Node] Streams", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should get a JSON body response as a stream", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, JSON.stringify({ foo: "foo" }));
      const callback = cb as unknown as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../../src/getClient.js");

    const client = getClient(mockBaseUrl);
    const expectedBody = { foo: "foo" };

    const promise = client.pathUnchecked("/foo").get().asNodeStream();

    const response = await promise;
    const stringBody = await readStreamToBuffer(response.body!);

    assert.strictEqual(stringBody.toString(), JSON.stringify(expectedBody));
  });

  it("should get a JSON body response", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, JSON.stringify({ foo: "foo" }));
      const callback = cb as unknown as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../../src/getClient.js");

    const client = getClient(mockBaseUrl);
    const expectedBody = { foo: "foo" };

    const promise = client.pathUnchecked("/foo").get();
    const response = await promise;

    assert.deepEqual(response.body, expectedBody);
  });

  it("should be able to handle errors on normal response", async () => {
    vi.mocked(https.request).mockImplementation(() => {
      throw new Error("ExpectedException");
    });

    const { getClient } = await import("../../../src/getClient.js");
    const client = getClient(mockBaseUrl);

    await expect(client.pathUnchecked("/foo").get()).rejects.toThrow("ExpectedException");
  });

  it("should be able to handle errors on streamed response", async () => {
    vi.mocked(https.request).mockImplementation(() => {
      throw new Error("ExpectedException");
    });

    const { getClient } = await import("../../../src/getClient.js");
    const client = getClient(mockBaseUrl);

    await expect(client.pathUnchecked("/foo").get().asNodeStream()).rejects.toThrow(
      "ExpectedException",
    );
  });

  it("should throw when attempting to use browser streams", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, JSON.stringify({ foo: "foo" }));
      const callback = cb as unknown as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../../src/getClient.js");
    const client = getClient(mockBaseUrl);

    await expect(client.pathUnchecked("/foo").get().asBrowserStream()).rejects.toThrow(
      "`asBrowserStream` is supported only in the browser environment. Use `asNodeStream` instead to obtain the response body stream. If you require a Web stream of the response in Node, consider using `Readable.toWeb` on the result of `asNodeStream`.",
    );
  });
});

describe("[Node] getBinaryStreamResponse", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should set readableStreamBody and leave blobBody undefined", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, "binary content");
      const callback = cb as unknown as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../../src/getClient.js");
    const client = getClient(mockBaseUrl);
    const result = await getBinaryStreamResponse(client.pathUnchecked("/foo").get());

    assert.isUndefined(result.blobBody);
    assert.isDefined(result.readableStreamBody);
  });

  it("should expose the response body as a readable stream with correct content", async () => {
    const expectedBody = "binary stream data";
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, expectedBody);
      const callback = cb as unknown as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../../src/getClient.js");
    const client = getClient(mockBaseUrl);
    const result = await getBinaryStreamResponse(client.pathUnchecked("/foo").get());

    const buffer = await readStreamToBuffer(result.readableStreamBody!);
    assert.strictEqual(buffer.toString(), expectedBody);
  });

  it("should preserve status and headers from the underlying response", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(206, "partial content");
      const callback = cb as unknown as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../../src/getClient.js");
    const client = getClient(mockBaseUrl);
    const result = await getBinaryStreamResponse(client.pathUnchecked("/foo").get());

    assert.strictEqual(result.status, "206");
  });
});

function createRequest(overrides?: Partial<ClientRequest>): ClientRequest {
  const emitter = new EventEmitter();
  return Object.assign(emitter, { end: vi.fn(), ...overrides }) as ClientRequest;
}

class FakeResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

function createResponse(statusCode: number, body = ""): IncomingMessage {
  const response = new FakeResponse();
  response.headers = {};
  response.statusCode = statusCode;
  response.write(body);
  response.end();
  return response as unknown as IncomingMessage;
}
function readStreamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("error", reject);
    stream.on("data", function (chunk: Buffer) {
      chunks.push(chunk);
    });
    stream.on("end", function () {
      resolve(Buffer.concat(chunks));
    });
  });
}
