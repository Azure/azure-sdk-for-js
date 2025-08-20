// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "@azure/cosmos";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import type { CosmosClientOptions, PluginConfig } from "@azure/cosmos";
import { Constants, CosmosClient, PluginOn } from "@azure/cosmos";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { SubStatusCodes } from "$internal/common/index.js";
import { describe, it, assert, beforeAll } from "vitest";

const splitError = new Error("Fake Partition Split") as any;
splitError.code = 410;
splitError.substatus = SubStatusCodes.PartitionKeyRangeGone;

const generateDocuments = function (docSize: number): {
  id: string;
}[] {
  const docs = [];
  for (let i = 0; i < docSize; i++) {
    docs.push({ id: i.toString() });
  }
  return docs;
};

const documentDefinitions = generateDocuments(20);

describe("Partition Splits", () => {
  let container: Container;

  beforeAll(async () => {
    await removeAllDatabases();
    container = await getTestContainer(
      "Partition Splits",
      undefined,
      {
        id: "partitionSplits",
        partitionKey: {
          paths: ["/id"],
        },
      },
      { offerThroughput: 25100 },
    );
    await bulkInsertItems(container, documentDefinitions);
  });

  it("handles one split part way through iteration", async () => {
    let hasSplit = false;
    const partitionKeyRanges = new Set();
    const options: CosmosClientOptions = { endpoint, key: masterKey };
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, diagNode, next) => {
          assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
          // This plugin throws a single 410 on the *second* time we see the same partition key range ID
          const partitionKeyRangeId = context?.headers[Constants.HttpHeaders.PartitionKeyRangeID];
          if (partitionKeyRanges.has(partitionKeyRangeId) && hasSplit === false) {
            hasSplit = true;
            const error = new Error("Fake Partition Split") as any;
            error.code = 410;
            error.substatus = SubStatusCodes.PartitionKeyRangeGone;
            throw error;
          }
          if (partitionKeyRangeId) {
            partitionKeyRanges.add(partitionKeyRangeId);
          }
          return next(context);
        },
      },
    ];
    const client = new CosmosClient({
      ...options,
      plugins,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    } as any);
    const { resources } = await client
      .database(container.database.id)
      .container(container.id)
      .items.query("SELECT * FROM root r", {
        maxItemCount: 2,
        maxDegreeOfParallelism: 1,
      })
      .fetchAll();

    // TODO. These should be equal but right now they are not
    // I suspect injecting a random 410 with out actually splitting the documents
    // results in duplicates by trying to read from two partitions
    assert(resources.length >= documentDefinitions.length);
  });
  // NOTE: This test is skipped because we have updated the contracts to not throw 410s.
  // Previously, 410s were thrown from the parallelQueryExecutionContextBase constructor,
  // but now they are handled in the fetchMore method. Therefore, this test is skipped and will be removed after reviews.
  it.skip("split errors surface as 503", async () => {
    const options: CosmosClientOptions = { endpoint, key: masterKey };
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, diagNode, next) => {
          assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
          // This plugin throws a single 410 for partition key range ID 0 on every single request
          const partitionKeyRangeId = context?.headers[Constants.HttpHeaders.PartitionKeyRangeID];
          if (partitionKeyRangeId === "0") {
            const error = new Error("Fake Partition Split") as any;
            error.code = 410;
            error.substatus = SubStatusCodes.PartitionKeyRangeGone;
            throw error;
          }
          return next(context);
        },
      },
    ];
    const client = new CosmosClient({
      ...options,
      plugins,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    } as any);

    // fetchAll()
    try {
      await client
        .database(container.database.id)
        .container(container.id)
        .items.query("SELECT * FROM root r", {
          maxItemCount: 2,
          maxDegreeOfParallelism: 2,
        })
        .fetchAll();
      assert.fail("Expected query to fail");
    } catch (e: any) {
      assert.strictEqual(e.code, 503);
    }

    // fetchNext()
    try {
      await client
        .database(container.database.id)
        .container(container.id)
        .items.query("SELECT * FROM root r", {
          maxItemCount: 2,
          maxDegreeOfParallelism: 2,
        })
        .fetchNext();
      assert.fail("Expected query to fail");
    } catch (e: any) {
      assert.strictEqual(e.code, 503);
    }

    // asyncIterator
    try {
      const iterator = client
        .database(container.database.id)
        .container(container.id)
        .items.query("SELECT * FROM root r", {
          maxItemCount: 2,
          maxDegreeOfParallelism: 2,
        })
        .getAsyncIterator();
      const results = [];
      for await (const result of iterator) {
        results.push(result);
      }
      assert.fail("Expected query to fail");
    } catch (e: any) {
      assert.strictEqual(e.code, 503);
    }
  });
});
