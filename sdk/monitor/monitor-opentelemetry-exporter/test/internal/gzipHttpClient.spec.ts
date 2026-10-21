// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createServer } from "node:http";
import type { IncomingHttpHeaders } from "node:http";
import { Readable } from "node:stream";
import { gzip, gunzipSync } from "node:zlib";
import type * as Zlib from "node:zlib";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { afterEach, describe, expect, it, vi } from "vitest";
import { diag } from "@opentelemetry/api";
import { createGzipHttpClient } from "../../src/platform/nodejs/gzipHttpClient.js";

vi.mock("node:zlib", async (importOriginal) => {
  const original = await importOriginal<typeof Zlib>();
  return { ...original, gzip: vi.fn(original.gzip) };
});

const ingestionUrl = "https://dc.services.visualstudio.com/v2.1/track";
const json = JSON.stringify([{ message: "telemetry \u2603".repeat(200) }]);

function createTransport(): HttpClient & {
  sendRequest: ReturnType<typeof vi.fn<HttpClient["sendRequest"]>>;
} {
  return {
    sendRequest: vi.fn<HttpClient["sendRequest"]>(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders(),
    })),
  };
}

describe("gzip HTTP client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ingestionUrl,
    "https://westus-0.in.applicationinsights.azure.com/v2/track",
    "https://westus-0.in.applicationinsights.azure.com/v2.1/track?test=true",
    "https://region.monitor.azure.com/v2.1/track",
    "https://region.applicationinsights.azure.us/v2.1/track",
    "https://region.monitor.azure.us/v2.1/track",
    "https://region.applicationinsights.azure.cn/v2.1/track",
    "https://region.monitor.azure.cn/v2.1/track",
    "https://DC.SERVICES.VISUALSTUDIO.COM./v2.1/track",
  ])("compresses JSON for %s", async (url) => {
    const transport = createTransport();
    const request = createPipelineRequest({
      url,
      method: "POST",
      body: json,
      headers: createHttpHeaders({
        "Content-Type": "application/json",
        "Content-Length": String(Buffer.byteLength(json)),
      }),
      timeout: 1234,
      abortSignal: new AbortController().signal,
      onUploadProgress: vi.fn(),
    });
    const originalHeaders = request.headers.toJSON();

    await createGzipHttpClient(transport).sendRequest(request);

    const sent = transport.sendRequest.mock.calls[0][0];
    expect(sent).not.toBe(request);
    expect(sent.headers).not.toBe(request.headers);
    expect(Buffer.isBuffer(sent.body)).toBe(true);
    const body = sent.body as Buffer;
    expect(gunzipSync(body).toString("utf8")).toBe(json);
    expect(body.length).toBeLessThan(Buffer.byteLength(json));
    expect(sent.headers.get("Content-Encoding")).toBe("gzip");
    expect(sent.headers.get("Content-Length")).toBe(String(body.length));
    expect(sent.headers.get("Content-Type")).toBe("application/json");
    expect(sent.timeout).toBe(request.timeout);
    expect(sent.abortSignal).toBe(request.abortSignal);
    expect(sent.onUploadProgress).toBe(request.onUploadProgress);
    expect(request.body).toBe(json);
    expect(request.headers.toJSON()).toEqual(originalHeaders);
    expect(transport.sendRequest.mock.contexts[0]).toBe(transport);
  });

  it.each([
    "https://proxy.example/v2.1/track",
    "http://dc.services.visualstudio.com/v2.1/track",
    "https://dc.services.visualstudio.com.attacker.example/v2.1/track",
    "https://notapplicationinsights.azure.com/v2.1/track",
    "https://applicationinsights.azure.com/v2.1/track",
    "https://dc.services.visualstudio.com/v2.1/track/extra",
    "https://dc.services.visualstudio.com/v2.1/track/",
    "https://dc.services.visualstudio.com/v1/traces",
    "https://rt.services.visualstudio.com/QuickPulseService.svc/post",
    "https://settings.sdk.monitor.azure.com/settings",
    "invalid URL",
  ])("leaves other destinations unchanged: %s", async (url) => {
    const transport = createTransport();
    const request = createPipelineRequest({ url, method: "POST", body: json });
    await createGzipHttpClient(transport).sendRequest(request);
    expect(transport.sendRequest.mock.calls[0][0]).toBe(request);
    expect(request.headers.has("Content-Encoding")).toBe(false);
  });

  it.each<[string, Partial<PipelineRequest>]>([
    ["GET", { method: "GET" }],
    ["PUT", { method: "PUT" }],
    ["empty body", { body: "" }],
    ["missing body", { body: undefined }],
    ["Buffer", { body: Buffer.from(json) }],
    ["Uint8Array", { body: new Uint8Array([1, 2]) }],
    ["stream", { body: Readable.from([json]) }],
    ["stream factory", { body: () => Readable.from([json]) }],
    ["Brotli", { headers: createHttpHeaders({ "Content-Encoding": "br" }) }],
    ["gzip", { headers: createHttpHeaders({ "Content-Encoding": "gzip" }) }],
    ["empty encoding", { headers: createHttpHeaders({ "Content-Encoding": "" }) }],
  ])("leaves unsupported or already encoded requests unchanged: %s", async (_name, overrides) => {
    const transport = createTransport();
    const request = createPipelineRequest({
      url: ingestionUrl,
      method: "POST",
      body: json,
      ...overrides,
    });
    await createGzipHttpClient(transport).sendRequest(request);
    expect(transport.sendRequest.mock.calls[0][0]).toBe(request);
  });

  it.each([false, true])(
    "sends the original request if gzip fails, with transport failure = %s",
    async (transportFails) => {
      const error = new Error("gzip failed");
      vi.mocked(gzip).mockImplementationOnce((...args) => {
        const callback = args.at(-1);
        if (typeof callback === "function") {
          callback(error, Buffer.alloc(0));
        }
      });
      const warning = vi.spyOn(diag, "warn").mockImplementation(() => {});
      const transport = createTransport();
      const transportError = new Error("transport failed");
      if (transportFails) {
        transport.sendRequest.mockRejectedValueOnce(transportError);
      }
      const request = createPipelineRequest({
        url: ingestionUrl,
        method: "POST",
        body: json,
        headers: createHttpHeaders({
          "Content-Type": "application/json",
          "Content-Length": String(Buffer.byteLength(json)),
        }),
      });
      const originalHeaders = request.headers.toJSON();
      const client = createGzipHttpClient(transport);
      const response = client.sendRequest(request);
      if (transportFails) {
        await expect(response).rejects.toBe(transportError);
      } else {
        await expect(response).resolves.toMatchObject({ status: 200, request });
      }
      expect(warning).toHaveBeenCalledExactlyOnceWith(
        "Failed to gzip telemetry. Sending the uncompressed request.",
        error,
      );
      expect(transport.sendRequest).toHaveBeenCalledExactlyOnceWith(request);
      expect(transport.sendRequest.mock.calls[0][0]).toBe(request);
      expect(transport.sendRequest.mock.contexts[0]).toBe(transport);
      expect(request.body).toBe(json);
      expect(request.headers.toJSON()).toEqual(originalHeaders);
      expect(request.headers.has("Content-Encoding")).toBe(false);

      await client.sendRequest(request);
      const subsequentRequest = transport.sendRequest.mock.calls[1][0];
      expect(subsequentRequest.headers.get("Content-Encoding")).toBe("gzip");
      expect(gunzipSync(subsequentRequest.body as Buffer).toString("utf8")).toBe(json);
    },
  );

  it("propagates transport errors without mutating the original request", async () => {
    const error = new Error("transport failed");
    const transport = createTransport();
    transport.sendRequest.mockRejectedValueOnce(error);
    const request = createPipelineRequest({ url: ingestionUrl, method: "POST", body: json });
    await expect(createGzipHttpClient(transport).sendRequest(request)).rejects.toBe(error);
    expect(transport.sendRequest).toHaveBeenCalledOnce();
    expect(transport.sendRequest.mock.calls[0][0].headers.get("Content-Encoding")).toBe("gzip");
    expect(request.body).toBe(json);
    expect(request.headers.has("Content-Encoding")).toBe(false);
  });

  it("sends gzip bytes and their exact length through the Node HTTP transport", async () => {
    let receivedBody: Buffer | undefined;
    let receivedHeaders: IncomingHttpHeaders | undefined;
    const server = createServer(async (request, response) => {
      const chunks: Buffer[] = [];
      for await (const chunk of request) {
        chunks.push(Buffer.from(chunk));
      }
      receivedBody = Buffer.concat(chunks);
      receivedHeaders = request.headers;
      response.writeHead(200);
      response.end("ok");
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const address = server.address();
      if (!address || typeof address === "string") {
        throw new Error("Expected an ephemeral TCP port");
      }
      const transport = createDefaultHttpClient();
      // Route only this test's transport to loopback after compression has selected the Azure URL.
      const client = createGzipHttpClient({
        sendRequest: (request) =>
          transport.sendRequest({
            ...request,
            url: `http://127.0.0.1:${address.port}/v2.1/track`,
            allowInsecureConnection: true,
          }),
      });
      const response = await client.sendRequest(
        createPipelineRequest({
          url: ingestionUrl,
          method: "POST",
          body: json,
          headers: createHttpHeaders({ "Content-Type": "application/json" }),
        }),
      );
      expect(response.status).toBe(200);
      expect(receivedHeaders?.["content-encoding"]).toBe("gzip");
      expect(receivedHeaders?.["content-length"]).toBe(String(receivedBody?.length));
      expect(receivedHeaders?.["content-type"]).toBe("application/json");
      expect(gunzipSync(receivedBody!).toString("utf8")).toBe(json);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });
});
