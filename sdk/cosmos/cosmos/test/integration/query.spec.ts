import assert from "assert";
import { Constants, FeedOptions } from "../../dist-esm";
import { PartitionKind } from "../../dist-esm/documents";
import { getTestContainer, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

const doc = { id: "myId", pk: "pk" };

describe("ResourceLink Trimming of leading and trailing slashes", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  const containerId = "testcontainer";

  beforeEach(async function() {
    await removeAllDatabases();
  });

  it("validate correct execution of query using named container link with leading and trailing slashes", async function() {
    const containerDefinition = {
      id: containerId,
      partitionKey: {
        paths: ["/pk"],
        kind: PartitionKind.Hash
      }
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
    const queryOptions = { partitionKey: "pk" };
    const queryIterator = container.items.query(query, queryOptions);

    const { resources } = await queryIterator.fetchAll();
    assert.equal(resources[0]["id"], "myId");
  });
});

describe("Test Query Metrics On Single Partition Collection", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);
  const collectionId = "testCollection2";

  const testQueryMetricsOnSinglePartition = async function(document: any) {
    try {
      const database = await getTestDatabase("query metrics test db");

      const collectionDefinition = { id: collectionId };
      const collectionOptions = { offerThroughput: 4000 };

      const { resource: createdCollectionDef } = await database.containers.create(
        collectionDefinition,
        collectionOptions
      );
      const createdContainer = database.container(createdCollectionDef.id);

      await createdContainer.items.create(document);
      const collectionLink = "/dbs/" + database.id + "/colls/" + collectionId + "/";
      const query = "SELECT * from " + collectionId;
      const queryOptions: FeedOptions = { populateQueryMetrics: true };
      const queryIterator = createdContainer.items.query(query, queryOptions);

      while (queryIterator.hasMoreResults()) {
        const { resources: results, queryMetrics, activityId, requestCharge } = await queryIterator.fetchNext();
        assert(activityId, "activityId must exist");
        assert(requestCharge, "requestCharge must exist");

        if (results === undefined) {
          // no more results
          break;
        }

        assert.notEqual(queryMetrics, null);
      }
    } catch (err) {
      throw err;
    }
  };

  afterEach(async function() {
    await removeAllDatabases();
  });

  beforeEach(async function() {
    await removeAllDatabases();
  });

  it("validate that query metrics are correct for a single partition query", async function() {
    await testQueryMetricsOnSinglePartition(doc);
  });
});
