// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Import the required modules
import assert from "assert";
import { Container, CosmosClient, FeedOptions, OperationType } from "../../../src";
import { endpoint } from "../../public/common/_testConfig";
import { masterKey } from "../../public/common/_fakeTestSecrets";
import { getTestContainer, removeAllDatabases } from "../../public/common/TestHelpers";

describe("QueryIterator", function () {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  let container: Container;
  let capturedCorrelatedActivityIds: string[];
  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    plugins: [
      {
        on: "request",
        plugin: async (context, _diagNode, next) => {
          if (
            context.operationType === OperationType.Query &&
            typeof context.headers["x-ms-cosmos-correlated-activityid"] === "string"
          ) {
            capturedCorrelatedActivityIds.push(
              context.headers["x-ms-cosmos-correlated-activityid"]
            );
          }
          const response = await next(context);
          return response;
        },
      },
    ],
  });

  before(async () => {
    container = await getTestContainer("Test", client, {
      partitionKey: "/name",
      throughput: 10000,
    });
    await Promise.all([
      container.items.create({ id: "1", name: "foo" }),
      container.items.create({ id: "2", name: "bar" }),
      container.items.create({ id: "3", name: "foo" }),
      container.items.create({ id: "4", name: "bar" }),
    ]);
  });

  beforeEach(async () => {
    capturedCorrelatedActivityIds = [];
  });

  it("fetchNext should pass correlation Id to request header", async () => {
    const queryIterator = container.items.readAll();
    assert.equal(
      capturedCorrelatedActivityIds.length,
      0,
      "correlated Id should be undefined before calling fetchNext"
    );
    await queryIterator.fetchNext();
    assert.ok(
      capturedCorrelatedActivityIds.length,
      "correlated Id should be created after fetchnext"
    );
  });

  it("fetchAll should pass correlation Id to request header", async () => {
    const querySpec = "SELECT * FROM c";
    const queryIterator = container.items.query(querySpec, { maxItemCount: 2 });
    assert.equal(
      capturedCorrelatedActivityIds.length,
      0,
      "correlated Id should be undefined before calling fetchAll"
    );
    await queryIterator.fetchAll();
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0]
      ),
      "correlated Id should be equal for each roundtrips"
    );
  });

  it("fetchNext should pass correlation Id to request header with force query plan enabled", async () => {
    const querySpec = {
      query: "SELECT * from c",
    };
    const options: FeedOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(querySpec, options);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchNext();
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });
  it("fetchAll should pass correlation Id to request header with force query plan enabled", async () => {
    const querySpec = {
      query: "SELECT * from c",
    };
    const options: FeedOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(querySpec, options);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchAll();
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });

  it("ORDER BY query should pass correlation Id to request header", async () => {
    const querySpec = {
      query: "SELECT c.name FROM c ORDER BY c.name ASC",
    };
    const queryIterator = container.items.query(querySpec);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchAll();
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });

  it("GROUP BY query should pass correlation Id to request header", async () => {
    const querySpec = {
      query: "SELECT c.name FROM c GROUP BY c.name",
    };
    const queryIterator = container.items.query(querySpec);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchAll();
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });

  after(async function () {
    await removeAllDatabases();
  });
});
