// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import { RestError, createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { TableTransaction, parseTransactionResponse } from "../../src/TableTransaction.js";
import { TableClient } from "../../src/TableClient.js";
import { describe, it, assert, expect, vi } from "vitest";

describe("TableTransaction", () => {
  describe("submitTransaction options", () => {
    const actions: TableTransaction["actions"] = [
      ["create", { partitionKey: "partition", rowKey: "row" }],
    ];

    it.each<{
      customHeaders?: Record<string, string>;
      headers?: Record<string, string>;
    }>([
      { customHeaders: { "X-Custom": "legacy" } },
      { headers: { "X-Custom": "canonical" } },
      {
        customHeaders: { "X-Custom": "legacy", "x-legacy-only": "legacy" },
        headers: { "x-custom": "canonical" },
      },
      {
        customHeaders: { "x-custom": "legacy", "x-legacy-only": "legacy" },
        headers: { "X-Custom": "canonical" },
      },
    ])("should normalize user headers: %j", async (requestOptions) => {
      const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
        assert.equal(
          request.headers.get("x-custom"),
          requestOptions.headers ? "canonical" : "legacy",
        );
        if (requestOptions.customHeaders?.["x-legacy-only"]) {
          assert.equal(request.headers.get("x-legacy-only"), "legacy");
        }
        assert.equal(request.url, "https://example.org/$batch");
        assert.equal(request.method, "POST");
        assert.equal(request.headers.get("accept"), "application/json");
        assert.equal(request.headers.get("x-ms-version"), "2019-02-02");
        assert.equal(request.headers.get("dataserviceversion"), "3.0;");
        assert.equal(request.headers.get("maxdataserviceversion"), "3.0;NetFx");
        const contentType = request.headers.get("content-type")!;
        assert.match(contentType, /^multipart\/mixed; boundary=batch_/);
        assert.include(request.body as string, `--${contentType.split("boundary=")[1]}`);
        return { status: 202, headers: createHttpHeaders(), request };
      });
      const client = new TableClient("https://example.org", "TestTable", {
        httpClient: { sendRequest },
      });
      const options = {
        requestOptions: {
          ...requestOptions,
          headers: {
            ...requestOptions.headers,
            "CONTENT-TYPE": "invalid",
            Accept: "invalid",
            "X-MS-VERSION": "invalid",
            DataServiceVersion: "invalid",
            MaxDataServiceVersion: "invalid",
          },
        },
      };
      const originalOptions = JSON.stringify(options);
      await client.submitTransaction(actions, options);
      assert.equal(JSON.stringify(options), originalOptions);
      expect(sendRequest).toHaveBeenCalledTimes(1);
    });

    it("should forward nested request controls and cancellation", async () => {
      const onUploadProgress = vi.fn();
      const onDownloadProgress = vi.fn();
      const abortSignal = new AbortController().signal;
      const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
        assert.equal(request.timeout, 1234);
        assert.strictEqual(request.abortSignal, abortSignal);
        assert.strictEqual(request.onUploadProgress, onUploadProgress);
        assert.strictEqual(request.onDownloadProgress, onDownloadProgress);
        request.onUploadProgress?.({ loadedBytes: 10 });
        request.onDownloadProgress?.({ loadedBytes: 20 });
        return { status: 202, headers: createHttpHeaders(), request };
      });
      const client = new TableClient("https://example.org", "TestTable", {
        httpClient: { sendRequest },
      });
      await client.submitTransaction(actions, {
        abortSignal,
        requestOptions: { timeout: 1234, onUploadProgress, onDownloadProgress },
      });
      expect(sendRequest).toHaveBeenCalledTimes(1);
      expect(onUploadProgress).toHaveBeenCalledExactlyOnceWith({ loadedBytes: 10 });
      expect(onDownloadProgress).toHaveBeenCalledExactlyOnceWith({ loadedBytes: 20 });
    });

    it.each([
      [false, undefined, false],
      [true, undefined, true],
      [false, true, true],
      [true, false, false],
    ])(
      "should resolve insecure connections (client=%s, request=%s) to %s",
      async (clientSetting, requestSetting, expected) => {
        const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
          assert.equal(request.allowInsecureConnection, expected);
          return { status: 202, headers: createHttpHeaders(), request };
        });
        const client = new TableClient("https://example.org", "TestTable", {
          httpClient: { sendRequest },
          allowInsecureConnection: clientSetting,
        });
        await client.submitTransaction(actions, {
          requestOptions: { allowInsecureConnection: requestSetting },
        });
        expect(sendRequest).toHaveBeenCalledTimes(1);
      },
    );

    it("should pass the raw and parsed responses to the legacy callback", async () => {
      let rawResponse: PipelineResponse | undefined;
      const client = new TableClient("https://example.org", "TestTable", {
        httpClient: {
          sendRequest: async (request) => {
            rawResponse = {
              status: 202,
              headers: createHttpHeaders({ "x-ms-request-id": "request-id" }),
              request,
              bodyAsText:
                "--changesetresponse_test\r\nHTTP/1.1 204 No Content\r\nETag: test-etag\r\n\r\n--changesetresponse_test--",
            };
            return rawResponse;
          },
        },
      });
      const onResponse = vi.fn();
      const result = await client.submitTransaction(actions, { onResponse });
      expect(onResponse).toHaveBeenCalledExactlyOnceWith(rawResponse, result, undefined);
      assert.equal(onResponse.mock.calls[0][0].headers.get("x-ms-request-id"), "request-id");
      assert.deepEqual(result.subResponses, [{ status: 204, etag: "test-etag" }]);
    });

    it.each(["outer", "inner", "transport"] as const)(
      "should pass %s errors as the third legacy callback argument",
      async (failure) => {
        let rawResponse: PipelineResponse | undefined;
        const body = JSON.stringify({
          "odata.error": { code: "EntityAlreadyExists", message: { value: "Already exists" } },
        });
        const client = new TableClient("https://example.org", "TestTable", {
          retryOptions: { maxRetries: 0 },
          httpClient: {
            sendRequest: async (request) => {
              rawResponse = {
                status: failure === "inner" ? 202 : 409,
                headers: createHttpHeaders({ "x-ms-request-id": "request-id" }),
                request,
                bodyAsText:
                  failure === "inner"
                    ? `--changesetresponse_test\r\nHTTP/1.1 409 Conflict\r\n\r\n${body}\r\n--changesetresponse_test--`
                    : body,
              };
              if (failure === "transport") {
                throw new RestError("Already exists", {
                  statusCode: 409,
                  request,
                  response: rawResponse,
                });
              }
              return rawResponse;
            },
          },
        });
        const onResponse = vi.fn();
        const result = client.submitTransaction(actions, { onResponse });
        await expect(result).rejects.toThrow("Already exists");
        expect(onResponse).toHaveBeenCalledTimes(1);
        const [response, flatResponse, error] = onResponse.mock.calls[0];
        assert.strictEqual(response, rawResponse);
        assert.equal(response.headers.get("x-ms-request-id"), "request-id");
        assert.isUndefined(flatResponse);
        await expect(result).rejects.toBe(error);
        assert.instanceOf(error, RestError);
        assert.equal(error.statusCode, 409);
      },
    );

    it("should not call onResponse when no response was received", async () => {
      const error = new RestError("Connection failed");
      const client = new TableClient("https://example.org", "TestTable", {
        retryOptions: { maxRetries: 0 },
        httpClient: {
          sendRequest: async () => {
            throw error;
          },
        },
      });
      const onResponse = vi.fn();
      await expect(client.submitTransaction(actions, { onResponse })).rejects.toBe(error);
      expect(onResponse).not.toHaveBeenCalled();
    });

    it("should not invoke a throwing response callback twice", async () => {
      const client = new TableClient("https://example.org", "TestTable", {
        httpClient: {
          sendRequest: async (request) => ({
            status: 202,
            headers: createHttpHeaders(),
            request,
          }),
        },
      });
      const error = new Error("Callback failed");
      const onResponse = vi.fn(() => {
        throw error;
      });
      await expect(client.submitTransaction(actions, { onResponse })).rejects.toBe(error);
      expect(onResponse).toHaveBeenCalledTimes(1);
    });
  });

  describe("parseTransactionResponse", () => {
    it("should handle error with no error info", () => {
      const testResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request: createPipelineRequest({ url: "https://example.org" }),
        status: 400,
      };

      try {
        parseTransactionResponse(testResponse);
        assert.fail("Expected error");
      } catch (error: any) {
        assert.equal(error.message, "Transaction Failed");
      }
    });

    it("should handle error with  odata error info", () => {
      const testResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request: createPipelineRequest({ url: "https://example.org" }),
        status: 400,
        bodyAsText: JSON.stringify({
          "odata.error": {
            code: "123",
            message: { value: "Test message" },
          },
        }),
      };

      try {
        parseTransactionResponse(testResponse);
        assert.fail("Expected error");
      } catch (error: any) {
        assert.equal(error.message, "Test message");
        assert.equal(error.code, "123");
      }
    });

    it("should honor the custom httpClient passed to the TableClient", async () => {
      let isProxy = false;
      const proxyHttpClient: HttpClient = {
        sendRequest: async (request) => {
          isProxy = true;
          return { status: 200, headers: createHttpHeaders(), request };
        },
      };
      const client = new TableClient("https://example.org", "TestTable", {
        httpClient: proxyHttpClient,
      });
      const transaction = new TableTransaction();
      transaction.createEntity({ partitionKey: "helper", rowKey: "1", value: "t1" });
      transaction.createEntity({ partitionKey: "helper", rowKey: "2", value: "t2" });

      await client.submitTransaction(transaction.actions);
      assert.isTrue(isProxy);
    });
  });

  describe("updateEntity", () => {
    it("should have ergonomic overloads", () => {
      const transaction = new TableTransaction();
      const entity = { partitionKey: "1", rowKey: "1" };
      transaction.updateEntity(entity);
      transaction.updateEntity(entity, "Replace");
      transaction.updateEntity(entity, { etag: "" });
      transaction.updateEntity(entity, "Merge", { etag: "" });
      assert.deepEqual(transaction.actions, [
        ["update", { partitionKey: "1", rowKey: "1" }, "Merge", {}],
        ["update", { partitionKey: "1", rowKey: "1" }, "Replace", {}],
        ["update", { partitionKey: "1", rowKey: "1" }, "Merge", { etag: "" }],
        ["update", { partitionKey: "1", rowKey: "1" }, "Merge", { etag: "" }],
      ]);
    });
  });
});
