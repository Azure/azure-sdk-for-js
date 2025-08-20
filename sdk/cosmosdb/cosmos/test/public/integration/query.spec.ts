// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container, FeedOptions } from "@azure/cosmos";
import { getTestContainer, getTestDatabase, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, assert, beforeEach } from "vitest";

const doc = { id: "myId", pk: "pk" };

describe("ResourceLink Trimming of leading and trailing slashes", { timeout: 10000 }, () => {
  const containerId = "testcontainer";

  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("validate correct execution of query using named container link with leading and trailing slashes", async () => {
    const containerDefinition = {
      id: containerId,
      partitionKey: {
        paths: ["/pk"],
      },
    };
    const containerOptions = { offerThroughput: 10100 };

    const container = await getTestContainer(
      "validate correct execution of query",
      undefined,
      containerDefinition,
      containerOptions,
    );

    await container.items.create(doc);
    const query = "SELECT * from " + containerId;
    const queryIterator = container.items.query(query);

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources[0]["id"], "myId");
  });
});

describe("Test Query Metrics", { timeout: 20000 }, () => {
  const collectionId = "testCollection3";

  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("validate that query metrics are correct for a single partition query", async () => {
    const database = await getTestDatabase("query metrics test db");

    const collectionDefinition = {
      id: collectionId,
      partitionKey: {
        paths: ["/pk"],
      },
    };
    const collectionOptions = { offerThroughput: 4000 };

    const { resource: createdCollectionDef } = await database.containers.create(
      collectionDefinition,
      collectionOptions,
    );
    const createdContainer = database.container(createdCollectionDef.id);

    await createdContainer.items.create(doc);
    const query = "SELECT * from " + collectionId;
    const queryOptions: FeedOptions = {
      populateQueryMetrics: true,
    };
    const queryIterator = createdContainer.items.query(query, queryOptions);

    while (queryIterator.hasMoreResults()) {
      const {
        resources: results,
        queryMetrics,
        activityId,
        requestCharge,
      } = await queryIterator.fetchNext();
      assert(activityId, "activityId must exist");
      assert(requestCharge, "requestCharge must exist");

      if (results === undefined) {
        // no more results
        break;
      }
      assert.notEqual(queryMetrics, null);
    }
  });
});

describe("Partition key in FeedOptions", { timeout: 10000 }, () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("passing partition key in FeedOptions", async () => {
    const containerDefinition = {
      id: "testcontainer",
      partitionKey: {
        paths: ["/id"],
      },
    };

    const container = await getTestContainer(
      "validate correct execution of query",
      undefined,
      containerDefinition,
    );

    await container.items.create({ id: "foo" });
    await container.items.create({ id: "bar" });
    const query = "SELECT * from C";
    const queryIterator = container.items.query(query, {
      partitionKey: "foo",
    });

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources.length, 1);
    assert.equal(resources[0].id, "foo");
  });
});

describe("aggregate query over null value", { timeout: 10000 }, () => {
  const aggregateQueryOverNullValue = async function (
    testName: string,
    containerName: string,
    containerThroughput: number,
  ): Promise<void> {
    const containerDefinition = {
      id: containerName,
      partitionKey: {
        paths: ["/id"],
      },
    };
    const containerOptions = { offerThroughput: containerThroughput };

    const container = await getTestContainer(
      testName,
      undefined,
      containerDefinition,
      containerOptions,
    );

    await container.items.create({
      id: "AAAAHGM",
      referenceNumber: "AAAAHGM",
      type: "td",
      source: null,
    });
    await container.items.create({
      id: "AAAAGDD",
      referenceNumber: "AAAAGDD",
      type: "td",
      source: null,
    });

    const query =
      "SELECT COUNT(c.source) AS _COUNT, c.source FROM c " +
      "WHERE c.referenceNumber IN ('AAAAGDD', 'AAAAHGM') GROUP BY c.source";

    const queryIterator = container.items.query(query);

    const { resources } = await queryIterator.fetchAll();

    assert.strictEqual(resources.length, 1);
    assert.strictEqual(resources[0]._COUNT, 2);
    assert.strictEqual(resources[0].source, null);
  };

  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("should execute successfully for container with single partition", async () => {
    await aggregateQueryOverNullValue("SinglePartition", "SinglePartition", 400);
  });

  it("should execute successfully for container with multiple partitions", async () => {
    await aggregateQueryOverNullValue("MultiplePartitons", "MultiplePartitons", 10100);
  });
});

describe("Test Index metrics", { timeout: 20000 }, () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("validate that index metrics are correct", async () => {
    const collectionId = "testCollection3";
    const createdContainerSinglePartition = await setupContainer(
      "index metrics test db",
      collectionId,
      4000,
    );
    const createdContainerMultiPartition = await setupContainer(
      "index metrics test db multi-partitioned",
      collectionId,
      12000,
    );

    await validateIndexMetrics(createdContainerSinglePartition, collectionId);
    await validateIndexMetrics(createdContainerMultiPartition, collectionId);
  });

  async function validateIndexMetrics(container: Container, collectionId: string): Promise<void> {
    const doc1 = { id: "myId1", pk: "pk1", name: "test1" };
    const doc2 = { id: "myId2", pk: "pk2", name: "test2" };
    const doc3 = { id: "myId3", pk: "pk2", name: "test2" };
    await container.items.create(doc1);
    await container.items.create(doc2);
    await container.items.create(doc3);
    //  streamable query
    const query1 = "SELECT * from " + collectionId + " where " + collectionId + ".name = 'test2'";
    //  aggregate query
    const query2 = "SELECT * from " + collectionId + " order by " + collectionId + ".name";
    const queryList = [query1, query2];
    const queryOptions: FeedOptions = {
      populateIndexMetrics: true,
      maxItemCount: 1,
    };
    for (const query of queryList) {
      const queryIterator = container.items.query(query, queryOptions);
      while (queryIterator.hasMoreResults()) {
        const { resources: results, indexMetrics } = await queryIterator.fetchNext();

        if (results === undefined) {
          break;
        }
        assert.notEqual(indexMetrics, undefined);
      }
    }
  }

  async function setupContainer(
    datbaseName: string,
    collectionId: string,
    throughput?: number,
  ): Promise<Container> {
    const database = await getTestDatabase(datbaseName);

    const collectionDefinition = {
      id: collectionId,
      partitionKey: {
        paths: ["/pk"],
      },
    };
    const collectionOptions = { offerThroughput: throughput };

    const { resource: createdCollectionDef } = await database.containers.create(
      collectionDefinition,
      collectionOptions,
    );
    return database.container(createdCollectionDef.id);
  }
});
