// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { Container, FeedOptions } from "../../../src";
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
      containerOptions,
    );

    await container.items.create(doc);
    const query = "SELECT * from " + containerId;
    const queryIterator = container.items.query(query, { disableNonStreamingOrderByQuery: true });

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources[0]["id"], "myId");
  });
});

describe("Test Query Metrics", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);
  const collectionId = "testCollection3";

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("validate that query metrics are correct for a single partition query", async function () {
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
      disableNonStreamingOrderByQuery: true,
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
      containerDefinition,
    );

    await container.items.create({ id: "foo" });
    await container.items.create({ id: "bar" });
    const query = "SELECT * from C";
    const queryIterator = container.items.query(query, {
      partitionKey: "foo",
      disableNonStreamingOrderByQuery: true,
    });

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

    const queryIterator = container.items.query(query, { disableNonStreamingOrderByQuery: true });

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

describe("Test Index metrics", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("validate that index metrics are correct", async function () {
    const collectionId = "testCollection3";
    const containerDefinition = {
      id: collectionId,
    };
    const containerOptions1 = { offerThroughput: 4000 };
    const createdContainerSinglePartition = await getTestContainer(
      "index metrics test db",
      undefined,
      containerDefinition,
      containerOptions1,
    );
    const containerOptions2 = { offerThroughput: 12000 };
    const createdContainerMultiPartition = await getTestContainer(
      "index metrics test db multipartioned",
      undefined,
      containerDefinition,
      containerOptions2,
    );

    await validateIndexMetrics(createdContainerSinglePartition, collectionId);
    await validateIndexMetrics(createdContainerMultiPartition, collectionId);
  });

  async function validateIndexMetrics(container: Container, collectionId: string) {
    const doc1 = { id: "myId1", pk: "pk1", name: "test1" };
    const doc2 = { id: "myId2", pk: "pk2", name: "test2" };
    const doc3 = { id: "myId3", pk: "pk2", name: "test2" };
    await container.items.create(doc1);
    await container.items.create(doc2);
    await container.items.create(doc3);
    //  stremeable query
    const query1 = "SELECT * from " + collectionId + " where " + collectionId + ".name = 'test2'";
    //  aggregate query
    const query2 = "SELECT * from " + collectionId + " order by " + collectionId + ".name";
    const queryList = [query1, query2];
    const queryOptions: FeedOptions = {
      populateIndexMetrics: true,
      maxItemCount: 1,
      disableNonStreamingOrderByQuery: true,
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
});

describe("Test RU Capping query", function (this: Suite) {
  const offset = 0.5;

  afterEach(async function () {
    await removeAllDatabases();
  });

  it("For Single partition query", async function () {
    const collectionId = "testCollection4";
    const containerDefinition = { id: collectionId, throughput: 4000 };
    const createdContainerSinglePartition = await getTestContainer(
      "RU Capping test db for single partition",
      undefined,
      containerDefinition,
    );
    // Create 500 documents
    for (let i = 1; i <= 500; i++) {
      const document = {
        id: `myId${i}`,
        pk: `pk${i % 10}`, // You can adjust the logic for partition key (pk) as needed
        name: `test${i}`,
      };
      await createdContainerSinglePartition.items.create(document);
    }

    const query1 = "SELECT * from " + collectionId + " where " + collectionId + ".name = 'test2'";
    const queryOptions: FeedOptions = { maxItemCount: 100, disableNonStreamingOrderByQuery: true};
    const queryIterator1 = createdContainerSinglePartition.items.query(query1, queryOptions);
    const queryIterator1RUCapCalculate = createdContainerSinglePartition.items.query(
      query1,
      queryOptions,
    );
    let calculated_ru_threshold = (await queryIterator1RUCapCalculate.fetchNext()).requestCharge;
    // Case 1: RU Cap breached
    try {
      await queryIterator1.fetchNext({
        ruCapPerOperation: calculated_ru_threshold - offset,
      });
      assert.fail("Must throw OPERATION_RU_LIMIT_EXCEEDED error");
    } catch (err) {
      assert.ok(err.code, "OPERATION_RU_LIMIT_EXCEEDED");
      assert.ok(err.fetchedResults);
      assert.ok(err.body.message === "Request Unit limit per Operation call exceeded");
    }
    queryIterator1.reset();
    // Case 2: RU Cap not breached
    while (queryIterator1.hasMoreResults()) {
      const { resources: results } = await queryIterator1.fetchNext({
        ruCapPerOperation: calculated_ru_threshold + offset,
      });
      if (results === undefined) {
        continue;
      }
      assert.equal(results.length, 1);
    }

    const query2 = "SELECT * from " + collectionId;
    const queryiterator2 = createdContainerSinglePartition.items.query(query2, queryOptions);
    const queryiterator2RUCapCalculate = createdContainerSinglePartition.items.query(
      query2,
      queryOptions,
    );
    calculated_ru_threshold = (await queryiterator2RUCapCalculate.fetchAll()).requestCharge;
    // Case 3: RU Cap breached for fetchAll operation
    try {
      await queryiterator2.fetchAll({ ruCapPerOperation: calculated_ru_threshold - offset });
      assert.fail("Must throw exception");
    } catch (err) {
      assert.ok(err.code, "OPERATION_RU_LIMIT_EXCEEDED");
      assert.ok(err.fetchedResults);
      assert.ok(err.body.message === "Request Unit limit per Operation call exceeded");
    }
    queryiterator2.reset();
    // Case 4: RU Cap not breached for fetchAll operation
    const { resources: results } = await queryiterator2.fetchAll({
      ruCapPerOperation: calculated_ru_threshold + offset,
    });
    // All items should be returned
    assert.equal(results.length, 500);
  });

  describe("For Multi partition query", async function () {
    let queryIterator: any;
    let queryIteratorRUCapCalculate: any;
    afterEach(async function () {
      queryIterator.reset();
      queryIteratorRUCapCalculate.reset();
      await removeAllDatabases();
    });

    beforeEach(async function () {
      const collectionId = "testCollection5";
      const containerDefinition = { id: collectionId, throughput: 30000 };
      const createdContainerMultiPartition = await getTestContainer(
        "RU Capping test db for multi partition",
        undefined,
        containerDefinition,
      );
      const data = [
        { id: "myId1", pk: "pk1", name: "test1" },
        { id: "myId2", pk: "pk2", name: "test2" },
        { id: "myId3", pk: "pk2", name: "test2" },
        { id: "myId4", pk: "pk3", name: "test3" },
        { id: "myId5", pk: "pk3", name: "test3" },
        { id: "myId6", pk: "pk3", name: "test3" },
        { id: "myId7", pk: "pk3", name: "test4" },
        { id: "myId8", pk: "pk3", name: "test4" },
        { id: "myId9", pk: "pk4", name: "test5" },
        { id: "myId10", pk: "pk5", name: "test5" },
        { id: "myId11", pk: "pk5", name: "test6" },
        { id: "myId12", pk: "pk6", name: "test7" },
        { id: "myId13", pk: "pk6", name: "test7" },
        { id: "myId14", pk: "pk6", name: "test7" },
      ];

      data.forEach((itemData) => {
        createdContainerMultiPartition.items.create(itemData);
      });

      const query = `SELECT count(${collectionId}.name) from ${collectionId} GROUP BY ${collectionId}.name`;
      const queryOptions: FeedOptions = {
        maxItemCount: 10,
        maxDegreeOfParallelism: 4,
        disableNonStreamingOrderByQuery: true,
      };
      queryIterator = createdContainerMultiPartition.items.query(query, queryOptions);
      queryIteratorRUCapCalculate = createdContainerMultiPartition.items.query(query, queryOptions);
    });

    it("FetchNext RU Cap breached for a single operation", async function () {
      const calculated_ru_threshold1 = (await queryIteratorRUCapCalculate.fetchNext())
        .requestCharge;
      try {
        await queryIterator.fetchNext({
          ruCapPerOperation: calculated_ru_threshold1 - offset,
        });
        assert.fail("Must throw OPERATION_RU_LIMIT_EXCEEDED exception");
      } catch (err) {
        assert.ok(err.code, "OPERATION_RU_LIMIT_EXCEEDED");
        assert.ok(err.fetchedResults === undefined);
        assert.ok(err.body.message === "Request Unit limit per Operation call exceeded");
      }
    });

    it("FetchNext RU Cap not breached", async function () {
      const calculated_ru_threshold = (await queryIteratorRUCapCalculate.fetchNext()).requestCharge;
      const { resources: results } = await queryIterator.fetchNext({
        ruCapPerOperation: calculated_ru_threshold + offset,
      });
      assert.equal(results.length, 7);
    });

    it("FetchAll RU Cap breached", async function () {
      const calculated_ru_threshold = (await queryIteratorRUCapCalculate.fetchAll()).requestCharge;
      try {
        await queryIterator.fetchAll({ ruCapPerOperation: calculated_ru_threshold - offset });
        assert.fail("Must throw OPERATION_RU_LIMIT_EXCEEDED exception");
      } catch (err) {
        assert.ok(err.code, "OPERATION_RU_LIMIT_EXCEEDED");
        assert.ok(err.fetchedResults === undefined);
        assert.ok(err.body.message === "Request Unit limit per Operation call exceeded");
      }
    });

    it("FetchAll RU Cap not breached", async function () {
      const calculated_ru_threshold = (await queryIteratorRUCapCalculate.fetchAll()).requestCharge;
      const { resources: results } = await queryIterator.fetchAll({
        ruCapPerOperation: calculated_ru_threshold + offset,
      });
      assert.equal(results.length, 7);
    });
  });
});
