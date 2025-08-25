// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { TableTransaction, parseTransactionResponse } from "$internal/TableTransaction.js";
import { TableClient } from "@azure/data-tables";
import { describe, it, assert } from "vitest";

describe("TableTransaction", () => {
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
