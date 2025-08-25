// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "@azure/cosmos";
import {
  OperationType,
  ResourceType,
  Constants,
  CosmosClient,
  BulkOperationType,
} from "@azure/cosmos";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { PriorityLevel } from "$internal/documents/PriorityLevel.js";
import { addEntropy, removeAllDatabases, createOrUpsertItem } from "../common/TestHelpers.js";
import { describe, it, assert, beforeEach, beforeAll, afterAll } from "vitest";

interface TestItem {
  id?: string;
  name?: string;
  foo?: string;
  key?: string | number | boolean;
  key2?: string | number | boolean;
  _partitionKey?: string;
  replace?: string;
  nested1?: {
    nested2: {
      nested3: string | number | boolean;
    };
  };
  prop?: number;
}

describe("ItemCRUDWithThorughputBucket", { timeout: 10000 }, () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  const dbId = addEntropy("throughputBucketDb");
  const containerId = addEntropy("throughputBucketContainer");
  const documentCRUDTest = async function (isUpsertTest: boolean): Promise<void> {
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      plugins: [
        {
          on: "request",
          plugin: async (context, diagNode, next) => {
            assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
            if (
              context.resourceType === ResourceType.database &&
              context.operationType === OperationType.Create
            ) {
              assert.ok(context.headers[Constants.HttpHeaders.ThroughputBucket] === 2);
            }
            if (
              context.resourceType === ResourceType.item &&
              context.operationType === OperationType.Create
            ) {
              assert.ok(context.headers[Constants.HttpHeaders.ThroughputBucket] === 3);
            }
            if (
              context.resourceType === ResourceType.item &&
              (context.operationType === OperationType.Read ||
                context.operationType === OperationType.Query)
            ) {
              assert.ok(context.headers[Constants.HttpHeaders.ThroughputBucket] === 4);
            }
            const response = await next(context);
            return response;
          },
        },
      ],
    });

    // create database
    await client.databases.create({ id: dbId }, { throughputBucket: 2 });
    const database = client.database(dbId);
    // create container
    await database.containers.create({ id: containerId }, { throughputBucket: 2 });
    const container: Container = database.container(containerId);
    // create an item
    const itemDefinition: TestItem = {
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property",
    };

    const { resource: document } = await createOrUpsertItem(
      container,
      itemDefinition,
      { priorityLevel: PriorityLevel.Low, throughputBucket: 3 },
      isUpsertTest,
    );
    assert.equal(document.name, itemDefinition.name);
    assert(document.id !== undefined);

    // read documents after creation
    const { resources: documents2 } = await container.items
      .readAll({ priorityLevel: PriorityLevel.Low, throughputBucket: 4 })
      .fetchAll();
    assert.equal(documents2.length, 1, "create should increase the number of documents");

    // query documents
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.id=@id",
      parameters: [
        {
          name: "@id",
          value: document.id,
        },
      ],
    };
    const { resources: results } = await container.items
      .query(querySpec, { priorityLevel: PriorityLevel.Low, throughputBucket: 4 })
      .fetchAll();
    assert(results.length > 0, "number of results for the query should be > 0");
  };
  it("Should do document CRUD operations with RU bucket successfully", async () => {
    await documentCRUDTest(false);
  });
});

describe("testThroughputBucketForBulk", async () => {
  let container: Container;
  let readItemId: string;
  let replaceItemId: string;
  let deleteItemId: string;

  beforeAll(async () => {
    const dbId = addEntropy("throughputBucketDb");
    const containerId = addEntropy("throughputBucketContainer");
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      plugins: [
        {
          on: "request",
          plugin: async (context, diagNode, next) => {
            assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
            if (
              context.resourceType === ResourceType.database &&
              context.operationType === OperationType.Create
            ) {
              assert.ok(context.headers[Constants.HttpHeaders.ThroughputBucket] === 2);
            }
            if (
              context.resourceType === ResourceType.item &&
              context.operationType !== OperationType.Batch
            ) {
              assert.ok(context.headers[Constants.HttpHeaders.ThroughputBucket] === undefined);
            }
            if (
              context.resourceType === ResourceType.item &&
              context.operationType === OperationType.Batch
            ) {
              assert.ok(context.headers[Constants.HttpHeaders.ThroughputBucket] === 4);
            }
            const response = await next(context);
            return response;
          },
        },
      ],
    });

    // create database
    await client.databases.create({ id: dbId }, { throughputBucket: 2 });
    const database = client.database(dbId);
    // create container
    await database.containers.create({ id: containerId }, { throughputBucket: 2 });
    container = database.container(containerId);

    readItemId = addEntropy("item1");
    await container.items.create({
      id: readItemId,
      key: "A",
      class: "2010",
    });
    deleteItemId = addEntropy("item2");
    await container.items.create({
      id: deleteItemId,
      key: "A",
      class: "2010",
    });
    replaceItemId = addEntropy("item3");
    await container.items.create({
      id: replaceItemId,
      key: 5,
      class: "2010",
    });
  });

  afterAll(async () => {
    if (container) {
      await container.database.delete();
    }
  });

  it("test throughput bucketing in bulk", async () => {
    const operations = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: "A",
        resourceBody: { id: addEntropy("doc2"), name: "other", key: "A" },
      },
      {
        operationType: BulkOperationType.Read,
        id: readItemId,
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Delete,
        id: deleteItemId,
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Replace,
        partitionKey: 5,
        id: replaceItemId,
        resourceBody: { id: replaceItemId, name: "nice", key: 5 },
      },
    ];
    container.items.bulk(operations, {}, { throughputBucket: 4 });
  });
});
