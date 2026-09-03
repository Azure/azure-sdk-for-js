// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container, FeedOptions } from "../../../src/index.js";
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

  it("passing partition key in FeedOptions with multi-partition container", async () => {
    const containerDefinition = {
      id: "testcontainer_multipartition",
      partitionKey: {
        paths: ["/category"],
      },
    };
    const containerOptions = { offerThroughput: 12100 };

    const container = await getTestContainer(
      "validate partitionKey in FeedOptions multi-partition",
      undefined,
      containerDefinition,
      containerOptions,
    );

    const categories = ["Electronics", "Books", "Clothing"];
    const itemsByCategory: Record<string, any[]> = {};
    for (const category of categories) {
      itemsByCategory[category] = [];
      for (let i = 0; i < 5; i++) {
        const item = {
          id: `${category}-${i}`,
          category,
          name: `Item ${i} in ${category}`,
        };
        await container.items.create(item);
        itemsByCategory[category].push(item);
      }
    }

    // Query using FeedOptions.partitionKey - should only return items from "Electronics"
    const query = "SELECT * FROM c";
    const queryIterator = container.items.query(query, {
      partitionKey: "Electronics",
    });

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources.length, 5, "Should only return 5 items from Electronics partition");
    for (const item of resources) {
      assert.equal(item.category, "Electronics", "All items should be from Electronics category");
    }

    // Verify that using WHERE clause gives the same results
    const queryWithWhere = {
      query: "SELECT * FROM c WHERE c.category = @category",
      parameters: [{ name: "@category", value: "Electronics" }],
    };
    const { resources: resourcesWithWhere } = await container.items
      .query(queryWithWhere)
      .fetchAll();
    assert.equal(
      resources.length,
      resourcesWithWhere.length,
      "FeedOptions.partitionKey and WHERE clause should return the same number of results",
    );
  });

  it("passing partition key in FeedOptions with forceQueryPlan", async () => {
    const containerDefinition = {
      id: "testcontainer_forceplan",
      partitionKey: {
        paths: ["/category"],
      },
    };
    const containerOptions = { offerThroughput: 12100 };

    const container = await getTestContainer(
      "validate partitionKey with forceQueryPlan",
      undefined,
      containerDefinition,
      containerOptions,
    );

    await container.items.create({ id: "e1", category: "Electronics", name: "Phone" });
    await container.items.create({ id: "e2", category: "Electronics", name: "Laptop" });
    await container.items.create({ id: "b1", category: "Books", name: "Novel" });
    await container.items.create({ id: "b2", category: "Books", name: "Textbook" });

    // Query with forceQueryPlan triggers PipelinedQueryExecutionContext
    const query = "SELECT * FROM c";
    const queryIterator = container.items.query(query, {
      partitionKey: "Electronics",
      forceQueryPlan: true,
    } as FeedOptions);

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources.length, 2, "Should only return 2 Electronics items with forceQueryPlan");
    for (const item of resources) {
      assert.equal(
        item.category,
        "Electronics",
        "All items should be from Electronics with forceQueryPlan",
      );
    }
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
