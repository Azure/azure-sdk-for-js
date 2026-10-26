// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NoOpCredential } from "@azure-tools/test-credential";
import type { RawResponseCallback } from "@azure-rest/core-client";
import type { PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import { AppConfigurationClient } from "../../src/index.js";

const body = {
  key: "key?name",
  label: "dev",
  value: "value",
  etag: "etag",
  content_type: "text/plain",
  last_modified: "2026-01-01T00:00:00Z",
  locked: false,
  tags: { environment: "test" },
};

function createClient(sendRequest: SendRequest): AppConfigurationClient {
  return new AppConfigurationClient("https://example.azconfig.io", new NoOpCredential(), {
    httpClient: { sendRequest },
  });
}

describe("getConfigurationSetting onResponse", () => {
  it("forwards runtime arguments and preserves conditional requests and transformation", async () => {
    const headers = createHttpHeaders({ "content-type": "application/json" });
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 200,
      headers,
      bodyAsText: JSON.stringify(body),
    }));
    const onResponse = vi.fn<RawResponseCallback>();

    const result = await createClient(sendRequest).getConfigurationSetting(
      { key: body.key, label: body.label, etag: body.etag },
      { onlyIfChanged: true, onResponse },
    );

    expect(onResponse).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        status: 200,
        headers,
        rawHeaders: headers.toJSON(),
        parsedBody: body,
        bodyAsText: JSON.stringify(body),
      }),
      undefined,
      undefined,
    );
    const response = onResponse.mock.calls[0][0];
    expect(response.request).toBe(sendRequest.mock.calls[0][0]);
    expect(response.headers).toBe(headers);
    expect(response.request.method).toBe("GET");
    expect(new URL(response.request.url).pathname).toBe("/kv/key%3Fname");
    expect(new URL(response.request.url).searchParams.get("label")).toBe("dev");
    expect(response.request.headers.get("if-none-match")).toBe('"etag"');
    expect(result).toMatchObject({
      key: body.key,
      label: body.label,
      value: body.value,
      etag: body.etag,
      contentType: body.content_type,
      lastModified: new Date(body.last_modified),
      isReadOnly: false,
      tags: body.tags,
      statusCode: 200,
    });
  });

  it.each([false, true])(
    "preserves conditional 304 handling with callback=%s",
    async (withCallback) => {
      const onResponse = vi.fn<RawResponseCallback>();
      const sendRequest = vi.fn<SendRequest>(async (request) => ({
        request,
        status: 304,
        headers: createHttpHeaders({ etag: '"etag"' }),
      }));

      const result = await createClient(sendRequest).getConfigurationSetting(
        { key: body.key, label: body.label, etag: body.etag },
        { onlyIfChanged: true, onResponse: withCallback ? onResponse : undefined },
      );

      expect(result).toMatchObject({
        key: body.key,
        statusCode: 304,
        value: undefined,
        label: undefined,
        etag: undefined,
        isReadOnly: undefined,
      });
      expect(sendRequest.mock.calls[0][0].headers.get("if-none-match")).toBe('"etag"');
      if (withCallback) {
        expect(onResponse).toHaveBeenCalledExactlyOnceWith(
          expect.objectContaining({ status: 304, request: sendRequest.mock.calls[0][0] }),
          undefined,
          undefined,
        );
        expect(result).toHaveProperty("_response", onResponse.mock.calls[0][0]);
      } else {
        expect(onResponse).not.toHaveBeenCalled();
      }
    },
  );

  it("preserves successful reads without a callback", async () => {
    const client = createClient(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: JSON.stringify(body),
    }));

    await expect(client.getConfigurationSetting({ key: body.key })).resolves.toMatchObject({
      key: body.key,
      value: body.value,
      statusCode: 200,
    });
  });

  it("forwards a terminal HTTP error response before rejecting", async () => {
    const onResponse = vi.fn<RawResponseCallback>();
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 404,
      headers: createHttpHeaders(),
    }));

    await expect(
      createClient(sendRequest).getConfigurationSetting({ key: body.key }, { onResponse }),
    ).rejects.toMatchObject({ name: "RestError", statusCode: 404 });
    expect(onResponse).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ status: 404, request: sendRequest.mock.calls[0][0] }),
      undefined,
      undefined,
    );
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });

  it("forwards the runtime parsing error unchanged in both optional arguments", async () => {
    const onResponse = vi.fn<RawResponseCallback>();
    const client = createClient(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: "{",
    }));
    const operation = client.getConfigurationSetting({ key: body.key }, { onResponse });

    await expect(operation).rejects.toMatchObject({ code: RestError.PARSE_ERROR, statusCode: 200 });
    const error: unknown = await operation.catch((caught: unknown) => caught);
    expect(onResponse).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ status: 200, bodyAsText: "{" }),
      error,
      error,
    );
    expect(onResponse.mock.calls[0][1]).toBe(error);
    expect(onResponse.mock.calls[0][2]).toBe(error);
  });

  it("propagates caller exceptions without retrying or invoking the callback again", async () => {
    const error = new Error("caller failure");
    const onResponse = vi.fn<RawResponseCallback>(() => {
      throw error;
    });
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: JSON.stringify(body),
    }));

    await expect(
      createClient(sendRequest).getConfigurationSetting({ key: body.key }, { onResponse }),
    ).rejects.toBe(error);
    expect(onResponse).toHaveBeenCalledTimes(1);
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });

  it("preserves runtime callback reentry for a caller-thrown RestError with a response", async () => {
    const error = new RestError("caller failure");
    const onResponse = vi.fn<RawResponseCallback>((response, callbackError) => {
      if (callbackError === undefined) {
        error.request = response.request;
        error.response = response;
        throw error;
      }
    });
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: JSON.stringify(body),
    }));

    await expect(
      createClient(sendRequest).getConfigurationSetting({ key: body.key }, { onResponse }),
    ).rejects.toBe(error);
    expect(onResponse).toHaveBeenCalledTimes(2);
    expect(onResponse.mock.calls[0]).toEqual([
      expect.objectContaining({ status: 200 }),
      undefined,
      undefined,
    ]);
    expect(onResponse.mock.calls[1]).toEqual([
      expect.objectContaining({ status: 200 }),
      error,
      error,
    ]);
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });

  it.each([429, 503])(
    "invokes the callback only after a %i retry succeeds",
    async (initialStatus) => {
      const requests: PipelineRequest[] = [];
      const onResponse = vi.fn<RawResponseCallback>();
      const client = createClient(async (request) => {
        requests.push(request);
        expect(onResponse).not.toHaveBeenCalled();
        return {
          request,
          status: requests.length === 1 ? initialStatus : 200,
          headers: createHttpHeaders({
            "content-type": "application/json",
            "retry-after-ms": "1",
          }),
          bodyAsText: JSON.stringify(body),
        };
      });

      const result = await client.getConfigurationSetting({ key: body.key }, { onResponse });

      expect(result.statusCode).toBe(200);
      expect(requests).toHaveLength(2);
      expect(onResponse).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ status: 200, request: requests[0] }),
        undefined,
        undefined,
      );
      expect(requests[1]).toBe(requests[0]);
    },
  );
});
