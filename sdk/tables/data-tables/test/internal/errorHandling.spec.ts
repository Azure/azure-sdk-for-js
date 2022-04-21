// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";
import { TableClient, TableServiceClient } from "../../src";
import { assert } from "chai";

describe("ErrorHandling", () => {
  describe("TableClient", () => {
    it("should not throw on delete table not found", async () => {
      const client = new TableClient("https://example.org", "fakeTable", {
        httpClient: buildTestHttpClient({ status: 404 }),
      });

      let threw = false;

      try {
        await client.deleteTable();
      } catch {
        threw = true;
      } finally {
        assert.isFalse(threw, "Expected not to throw on 404");
      }
    });

    it("should throw on delete table with non 404 error", async () => {
      const client = new TableClient("https://example.org", "fakeTable", {
        httpClient: buildTestHttpClient({ status: 400 }),
      });
      let threw = false;

      try {
        await client.deleteTable();
      } catch {
        threw = true;
      } finally {
        assert.isTrue(threw, "Expected to throw on non-404");
      }
    });
  });

  describe("TableServiceClient", () => {
    it("should not throw on delete table not found", async () => {
      const client = new TableServiceClient("https://example.org", {
        httpClient: buildTestHttpClient({ status: 404 }),
      });
      let threw = false;

      try {
        await client.deleteTable("fakeTable");
      } catch {
        threw = true;
      } finally {
        assert.isFalse(threw, "Expected not to throw on 404");
      }
    });

    it("should throw on delete table with non 404 error", async () => {
      const client = new TableServiceClient("https://example.org", {
        httpClient: buildTestHttpClient({ status: 400 }),
      });
      let threw = false;

      try {
        await client.deleteTable("FakeTable");
      } catch {
        threw = true;
      } finally {
        assert.isTrue(threw, "Expected to throw on non-404");
      }
    });
  });
});

function buildTestHttpClient(response?: Partial<PipelineResponse>): HttpClient {
  return {
    async sendRequest(req) {
      return {
        headers: createHttpHeaders(),
        request: req,
        status: 200,
        ...response,
      };
    },
  };
}
