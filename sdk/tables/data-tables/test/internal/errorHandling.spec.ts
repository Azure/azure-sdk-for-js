// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { TableClient, TableServiceClient } from "@azure/data-tables";
import { describe, it, assert } from "vitest";

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

    describe("getEntity validation", () => {
      const client = new TableClient("https://example.org", "fakeTable");

      interface TestCase {
        description: string;
        partitionKey: any;
        rowKey: any;
        expectedErrorMessage: string;
      }

      const testCases: TestCase[] = [
        {
          description: "should throw error when partitionKey is undefined",
          partitionKey: undefined,
          rowKey: "testRowKey",
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when partitionKey is null",
          partitionKey: null,
          rowKey: "testRowKey",
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is undefined",
          partitionKey: "testPartitionKey",
          rowKey: undefined,
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is null",
          partitionKey: "testPartitionKey",
          rowKey: null,
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
      ];

      testCases.forEach(({ description, partitionKey, rowKey, expectedErrorMessage }) => {
        it(description, async () => {
          try {
            await client.getEntity(partitionKey, rowKey);
            assert.fail(`Expected an error to be thrown: ${description}`);
          } catch (error: any) {
            assert.equal(error.message, expectedErrorMessage);
          }
        });
      });
    });
    describe("updateEntity validation", () => {
      const client = new TableClient("https://example.org", "fakeTable");

      interface TestCase {
        description: string;
        entity: {
          partitionKey: any;
          rowKey: any;
          data: string;
        };
        mode?: "Merge" | "Replace";
        expectedErrorMessage: string;
      }

      const testCases: TestCase[] = [
        {
          description: "should throw error when partitionKey is undefined",
          entity: {
            partitionKey: undefined,
            rowKey: "testRowKey",
            data: "test data",
          },
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when partitionKey is null",
          entity: {
            partitionKey: null,
            rowKey: "testRowKey",
            data: "test data",
          },
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is undefined",
          entity: {
            partitionKey: "testPartitionKey",
            rowKey: undefined,
            data: "test data",
          },
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is null",
          entity: {
            partitionKey: "testPartitionKey",
            rowKey: null,
            data: "test data",
          },
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
      ];

      testCases.forEach(({ description, entity, mode, expectedErrorMessage }) => {
        it(description, async () => {
          try {
            await client.updateEntity(entity, mode);
            assert.fail(`Expected an error to be thrown: ${description}`);
          } catch (error: any) {
            assert.equal(error.message, expectedErrorMessage);
          }
        });
      });
    });

    describe("deleteEntity validation", () => {
      const client = new TableClient("https://example.org", "fakeTable");

      interface TestCase {
        description: string;
        partitionKey: any;
        rowKey: any;
        expectedErrorMessage: string;
      }

      const testCases: TestCase[] = [
        {
          description: "should throw error when partitionKey is undefined",
          partitionKey: undefined,
          rowKey: "testRowKey",
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when partitionKey is null",
          partitionKey: null,
          rowKey: "testRowKey",
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is undefined",
          partitionKey: "testPartitionKey",
          rowKey: undefined,
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is null",
          partitionKey: "testPartitionKey",
          rowKey: null,
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
      ];

      testCases.forEach(({ description, partitionKey, rowKey, expectedErrorMessage }) => {
        it(description, async () => {
          try {
            await client.deleteEntity(partitionKey, rowKey);
            assert.fail(`Expected an error to be thrown: ${description}`);
          } catch (error: any) {
            assert.equal(error.message, expectedErrorMessage);
          }
        });
      });
    });

    describe("upsertEntity validation", () => {
      const client = new TableClient("https://example.org", "fakeTable");

      interface TestCase {
        description: string;
        entity: {
          partitionKey: any;
          rowKey: any;
          data: string;
        };
        expectedErrorMessage: string;
      }

      const testCases: TestCase[] = [
        {
          description: "should throw error when partitionKey is undefined",
          entity: {
            partitionKey: undefined,
            rowKey: "testRowKey",
            data: "test data",
          },
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when partitionKey is null",
          entity: {
            partitionKey: null,
            rowKey: "testRowKey",
            data: "test data",
          },
          expectedErrorMessage: "The entity's partitionKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is undefined",
          entity: {
            partitionKey: "testPartitionKey",
            rowKey: undefined,
            data: "test data",
          },
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
        {
          description: "should throw error when rowKey is null",
          entity: {
            partitionKey: "testPartitionKey",
            rowKey: null,
            data: "test data",
          },
          expectedErrorMessage: "The entity's rowKey cannot be undefined or null.",
        },
      ];

      testCases.forEach(({ description, entity, expectedErrorMessage }) => {
        it(description, async () => {
          try {
            await client.upsertEntity(entity);
            assert.fail(`Expected an error to be thrown: ${description}`);
          } catch (error: any) {
            assert.equal(error.message, expectedErrorMessage);
          }
        });
      });
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
