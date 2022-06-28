// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { FeedOptions } from "../../../src";
import { getTestContainer, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

const doc = { id: "myId", pk: "pk" };

describe("ResourceLink Trimming of leading and trailing slashes", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  const containerId = "testcontainer";

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("validate correct execution of query using named container link with leading and trailing slashes", async function () {
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
      containerOptions
    );

    await container.items.create(doc);
    const query = "SELECT * from " + containerId;
    const queryIterator = container.items.query(query);

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources[0]["id"], "myId");
  });
});

describe("Test Query Metrics", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);
  const collectionId = "testCollection2";

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("validate that query metrics are correct for a single partition query", async function () {
    const database = await getTestDatabase("query metrics test db");

    const collectionDefinition = { id: collectionId };
    const collectionOptions = { offerThroughput: 4000 };

    const { resource: createdCollectionDef } = await database.containers.create(
      collectionDefinition,
      collectionOptions
    );
    const createdContainer = database.container(createdCollectionDef.id);

    await createdContainer.items.create(doc);
    const query = "SELECT * from " + collectionId;
    const queryOptions: FeedOptions = { populateQueryMetrics: true };
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

describe("Partition key in FeedOptions", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("passing partition key in FeedOptions", async function () {
    const containerDefinition = {
      id: "testcontainer",
      partitionKey: {
        paths: ["/id"],
      },
    };

    const container = await getTestContainer(
      "validate correct execution of query",
      undefined,
      containerDefinition
    );

    await container.items.create({ id: "foo" });
    await container.items.create({ id: "bar" });
    const query = "SELECT * from C";
    const queryIterator = container.items.query(query, { partitionKey: "foo" });

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources.length, 1);
    assert.equal(resources[0].id, "foo");
  });
});

describe("aggregate query over null value", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  const aggregateQueryOverNullValue = async function (
    testName: string,
    containerName: string,
    containerThroughput: number
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
      containerOptions
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

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("should execute successfully for container with single partition", async function () {
    await aggregateQueryOverNullValue("SinglePartition", "SinglePartition", 400);
  });

  it("should execute successfully for container with multiple partitions", async function () {
    await aggregateQueryOverNullValue("MultiplePartitons", "MultiplePartitons", 10100);
  });
});
