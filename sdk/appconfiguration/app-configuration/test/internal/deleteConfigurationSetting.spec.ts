// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NoOpCredential } from "@azure-tools/test-credential";
import type { RawResponseCallback } from "@azure-rest/core-client";
import type { PipelinePolicy, PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import { AppConfigurationClient, type AppConfigurationClientOptions } from "../../src/index.js";

function createClient(
  sendRequest: SendRequest,
  options: AppConfigurationClientOptions = {},
): AppConfigurationClient {
  return new AppConfigurationClient("https://example.azconfig.io", new NoOpCredential(), {
    ...options,
    httpClient: { sendRequest },
  });
}

function createThrottleObserver(): {
  throttledRequests: WeakSet<PipelineRequest>;
  policy: PipelinePolicy;
} {
  const throttledRequests = new WeakSet<PipelineRequest>();
  return {
    throttledRequests,
    policy: {
      name: "testThrottleObserver",
      async sendRequest(request, next) {
        const response = await next(request);
        if (response.status === 429 || response.status === 503) {
          throttledRequests.add(response.request);
        }
        return response;
      },
    },
  };
}

describe("deleteConfigurationSetting onResponse", () => {
  it("forwards the runtime callback arguments and preserves conditional requests and transformation", async () => {
    const body = {
      key: "key?name",
      label: "dev",
      value: "deleted",
      etag: "etag",
      content_type: "text/plain",
      last_modified: "2026-01-01T00:00:00Z",
      locked: false,
      tags: { environment: "test" },
    };
    const headers = createHttpHeaders({ "content-type": "application/json", etag: '"etag"' });
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 200,
      headers,
      bodyAsText: JSON.stringify(body),
    }));
    const client = createClient(sendRequest);
    const onResponse = vi.fn<RawResponseCallback>();

    const result = await client.deleteConfigurationSetting(
      { key: body.key, label: body.label, etag: body.etag },
      { onlyIfUnchanged: true, onResponse },
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
    expect(response.request.method).toBe("DELETE");
    expect(new URL(response.request.url).pathname).toBe("/kv/key%3Fname");
    expect(new URL(response.request.url).searchParams.get("label")).toBe("dev");
    expect(response.request.headers.get("if-match")).toBe('"etag"');
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

  it("captures status before invoking the caller", async () => {
    const onResponse = vi.fn<RawResponseCallback>((response) => {
      response.status = 200;
    });
    const client = createClient(async (request) => ({
      request,
      status: 204,
      headers: createHttpHeaders(),
    }));

    const result = await client.deleteConfigurationSetting({ key: "key" }, { onResponse });

    expect(result.statusCode).toBe(204);
    expect(onResponse).toHaveBeenCalledTimes(1);
  });

  it.each([200, 204])("preserves empty-body %i deletion without a callback", async (status) => {
    const client = createClient(async (request) => ({
      request,
      status,
      headers: createHttpHeaders(),
    }));

    const result = await client.deleteConfigurationSetting({ key: "missing" });

    expect(result).toMatchObject({ statusCode: status, key: undefined, value: undefined });
  });

  it("forwards a final HTTP error response before generated deserialization rejects", async () => {
    const onResponse = vi.fn<RawResponseCallback>();
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 412,
      headers: createHttpHeaders(),
    }));
    const client = createClient(sendRequest);

    await expect(
      client.deleteConfigurationSetting(
        { key: "key", etag: "old" },
        {
          onlyIfUnchanged: true,
          onResponse,
        },
      ),
    ).rejects.toMatchObject({ name: "RestError", statusCode: 412 });

    expect(onResponse).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ status: 412, request: sendRequest.mock.calls[0][0] }),
      undefined,
      undefined,
    );
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });

  it("forwards the same runtime parsing error in both optional error arguments", async () => {
    const onResponse = vi.fn<RawResponseCallback>();
    const client = createClient(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: "{",
    }));

    const operation = client.deleteConfigurationSetting({ key: "key" }, { onResponse });
    await expect(operation).rejects.toMatchObject({
      name: "RestError",
      code: RestError.PARSE_ERROR,
      statusCode: 200,
    });
    const error: unknown = await operation.catch((caught: unknown) => caught);

    expect(onResponse).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ status: 200, bodyAsText: "{" }),
      error,
      error,
    );
    expect(onResponse.mock.calls[0][1]).toBe(error);
    expect(onResponse.mock.calls[0][2]).toBe(error);
  });

  it("propagates caller exceptions unchanged without retrying or invoking the callback again", async () => {
    const error = new Error("caller failure");
    const onResponse = vi.fn<RawResponseCallback>(() => {
      throw error;
    });
    const sendRequest = vi.fn<SendRequest>(async (request) => ({
      request,
      status: 204,
      headers: createHttpHeaders(),
    }));
    const client = createClient(sendRequest);

    await expect(client.deleteConfigurationSetting({ key: "key" }, { onResponse })).rejects.toBe(
      error,
    );
    expect(onResponse).toHaveBeenCalledTimes(1);
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });

  it("preserves runtime error-callback reentry for a caller-thrown RestError with a response", async () => {
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
      status: 204,
      headers: createHttpHeaders(),
    }));
    const client = createClient(sendRequest);

    await expect(client.deleteConfigurationSetting({ key: "key" }, { onResponse })).rejects.toBe(
      error,
    );
    expect(onResponse).toHaveBeenCalledTimes(2);
    expect(onResponse.mock.calls[0]).toEqual([
      expect.objectContaining({ status: 204 }),
      undefined,
      undefined,
    ]);
    expect(onResponse.mock.calls[1]).toEqual([
      expect.objectContaining({ status: 204 }),
      error,
      error,
    ]);
    expect(sendRequest).toHaveBeenCalledTimes(1);
  });

  it.each([429, 503, 204])(
    "allows a perRetry WeakSet observer to correlate %i with the final 204",
    async (initialStatus) => {
      const { throttledRequests, policy } = createThrottleObserver();
      const requests: PipelineRequest[] = [];
      const onResponse = vi.fn<RawResponseCallback>((response) => {
        expect(response.status).toBe(204);
        expect(throttledRequests.has(response.request)).toBe(initialStatus !== 204);
      });
      const client = createClient(
        async (request) => {
          requests.push(request);
          expect(onResponse).not.toHaveBeenCalled();
          return {
            request,
            status: requests.length === 1 ? initialStatus : 204,
            headers: createHttpHeaders({ "retry-after-ms": "1" }),
          };
        },
        { additionalPolicies: [{ policy, position: "perRetry" }] },
      );

      const result = await client.deleteConfigurationSetting({ key: "key" }, { onResponse });

      expect(result.statusCode).toBe(204);
      expect(onResponse).toHaveBeenCalledTimes(1);
      expect(requests).toHaveLength(initialStatus === 204 ? 1 : 2);
      for (const request of requests) {
        expect(request).toBe(onResponse.mock.calls[0][0].request);
      }
    },
  );

  it("isolates operation-local callbacks and request identities during concurrent deletes", async () => {
    const { throttledRequests, policy } = createThrottleObserver();
    const initialStatuses = [429, 503, 204];
    const attempts = new Map<string, PipelineRequest[]>();
    let release!: () => void;
    const allStarted = new Promise<void>((resolve) => {
      release = resolve;
    });
    const client = createClient(
      async (request) => {
        const key = new URL(request.url).pathname;
        const requests = attempts.get(key) ?? [];
        requests.push(request);
        attempts.set(key, requests);
        if (attempts.size === initialStatuses.length) {
          release();
        }
        await allStarted;
        return {
          request,
          status: requests.length === 1 ? initialStatuses[Number(key.slice(-1))] : 204,
          headers: createHttpHeaders({ "retry-after-ms": "1" }),
        };
      },
      { additionalPolicies: [{ policy, position: "perRetry" }] },
    );
    const callbacks = initialStatuses.map((status) =>
      vi.fn<RawResponseCallback>((response) => {
        expect(response.status).toBe(204);
        expect(throttledRequests.has(response.request)).toBe(status !== 204);
      }),
    );

    const results = await Promise.all(
      callbacks.map((onResponse, index) =>
        client.deleteConfigurationSetting({ key: `key${index}` }, { onResponse }),
      ),
    );

    const finalRequests = callbacks.map((onResponse, index) => {
      expect(onResponse).toHaveBeenCalledTimes(1);
      expect(results[index].statusCode).toBe(204);
      const request = onResponse.mock.calls[0][0].request;
      const requests = attempts.get(`/kv/key${index}`)!;
      expect(requests).toHaveLength(initialStatuses[index] === 204 ? 1 : 2);
      for (const attempt of requests) {
        expect(attempt).toBe(request);
      }
      return request;
    });
    expect(new Set(finalRequests).size).toBe(initialStatuses.length);
  });
});
