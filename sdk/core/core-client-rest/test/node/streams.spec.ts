// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, afterEach, vi } from "vitest";
import { ClientRequest, type IncomingHttpHeaders, IncomingMessage } from "node:http";
import { PassThrough } from "node:stream";

vi.mock("https", async () => {
  const actual = await vi.importActual("https");
  return {
    ...actual,
    request: vi.fn(),
  };
});

import * as https from "https";

const mockBaseUrl = "https://example.org";

describe("[Node] Streams", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should get a JSON body response as a stream", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, JSON.stringify({ foo: "foo" }));
      const callback = cb as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../src/getClient.js");

    const client = getClient(mockBaseUrl);
    const expectedBody = { foo: "foo" };

    const promise = client.pathUnchecked("/foo").get().asNodeStream();

    const response = await promise;
    const stringBody = await readStreamToBuffer(response.body!);

    assert.deepEqual(stringBody.toString(), JSON.stringify(expectedBody));
  });

  it("should get a JSON body response", async () => {
    vi.mocked(https.request).mockImplementation((_url, cb) => {
      const response = createResponse(200, JSON.stringify({ foo: "foo" }));
      const callback = cb as (res: IncomingMessage) => void;
      callback(response);
      return createRequest();
    });

    const { getClient } = await import("../../src/getClient.js");

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

    const { getClient } = await import("../../src/getClient.js");
    const client = getClient(mockBaseUrl);

    try {
      await client.pathUnchecked("/foo").get();
    } catch (e: any) {
      assert.equal(e.message, "ExpectedException");
    }
  });

  it("should be able to handle errors on streamed response", async () => {
    vi.mocked(https.request).mockImplementation(() => {
      throw new Error("ExpectedException");
    });

    const { getClient } = await import("../../src/getClient.js");
    const client = getClient(mockBaseUrl);

    try {
      await client.pathUnchecked("/foo").get().asNodeStream();
    } catch (e: any) {
      assert.equal(e.message, "ExpectedException");
    }
  });
});

function createRequest(): ClientRequest {
  const request = new FakeRequest();
  return request as unknown as ClientRequest;
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

class FakeRequest extends PassThrough {}
