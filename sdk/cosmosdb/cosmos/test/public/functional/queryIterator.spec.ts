// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Import the required modules
import assert from "assert";
import { Container, CosmosClient, FeedOptions, OperationType } from "../../../src";
import { endpoint } from "../../public/common/_testConfig";
import { masterKey } from "../../public/common/_fakeTestSecrets";
import { getTestContainer, removeAllDatabases } from "../../public/common/TestHelpers";

describe("Correlated Activity Id", function () {
  this.timeout(process.env.MOCHA_TIMEOUT || 30000);
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
              context.headers["x-ms-cosmos-correlated-activityid"],
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

  it("fetchNext and fetchAll should have different correlated id with same iterator", async () => {
    const queryIterator = container.items.readAll();
    const fetchNextResult = await queryIterator.fetchNext();
    assert.ok(capturedCorrelatedActivityIds.length);
    const correlatedIdFetchNext = capturedCorrelatedActivityIds[0];
    assert.equal(fetchNextResult.correlatedActivityId, correlatedIdFetchNext);
    capturedCorrelatedActivityIds = [];
    const fetchAllResult = await queryIterator.fetchAll();
    assert.ok(capturedCorrelatedActivityIds.length);
    const correlatedIdFetchAll = capturedCorrelatedActivityIds[0];
    assert.equal(fetchAllResult.correlatedActivityId, correlatedIdFetchAll);
    assert.ok(correlatedIdFetchAll !== correlatedIdFetchNext);
  });

  it("fetchNext should have same correlated Ids in hasMoreResult loop", async () => {
    const querySpec = {
      query: "SELECT * from c",
    };
    const options: FeedOptions = { maxItemCount: 2 };
    const queryIterator = container.items.query(querySpec, options);
    while (queryIterator.hasMoreResults()) {
      await queryIterator.fetchNext();
    }
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0],
      ),
    );
  });

  it("fetchNext should pass correlation Id to request header with force query plan enabled", async () => {
    const querySpec = {
      query: "SELECT * from c",
    };
    const options: FeedOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(querySpec, options);
    await queryIterator.fetchNext();
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0],
      ),
    );
  });

  it("fetchAll should pass correlation Id to request header with force query plan enabled", async () => {
    const querySpec = {
      query: "SELECT * from c",
    };
    const options: FeedOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(querySpec, options);
    await queryIterator.fetchAll();
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0],
      ),
    );
  });

  it("ORDER BY query should pass correlation Id to request header", async () => {
    const querySpec = {
      query: "SELECT c.name FROM c ORDER BY c.name ASC",
    };
    const queryIterator = container.items.query(querySpec);
    await queryIterator.fetchAll();
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0],
      ),
    );
  });

  it("GROUP BY query should pass correlation Id to request header", async () => {
    const querySpec = {
      query: "SELECT c.name FROM c GROUP BY c.name",
    };
    const queryIterator = container.items.query(querySpec);
    await queryIterator.fetchAll();
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0],
      ),
    );
  });

  it("getAsyncIterator should pass correlation Id to request header", async () => {
    const queryIterator = container.items.readAll();
    for await (const response of queryIterator.getAsyncIterator()) {
      assert.equal(response.correlatedActivityId, capturedCorrelatedActivityIds[0]);
    }
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every(
        (element) => element === capturedCorrelatedActivityIds[0],
      ),
    );
  });

  it("fetchAll and getAsyncIterator should have different correlated id with same iterator", async () => {
    const queryIterator = container.items.readAll();
    await queryIterator.fetchAll();
    assert.ok(capturedCorrelatedActivityIds.length);
    const correlatedIdFetchAll = capturedCorrelatedActivityIds[0];
    capturedCorrelatedActivityIds = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of queryIterator.getAsyncIterator()) {
      // The loop is intentionally empty
    }
    assert.ok(capturedCorrelatedActivityIds.length);
    const correlatedIdAsyncIterator = capturedCorrelatedActivityIds[0];
    assert.ok(correlatedIdFetchAll !== correlatedIdAsyncIterator);
  });

  it("fetchNext and getAsyncIterator should have different correlated id with same iterator", async () => {
    const queryIterator = container.items.readAll();
    await queryIterator.fetchNext();
    assert.ok(capturedCorrelatedActivityIds.length);
    const correlatedIdFetchNext = capturedCorrelatedActivityIds[0];
    capturedCorrelatedActivityIds = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of queryIterator.getAsyncIterator()) {
      // The loop is intentionally empty
    }
    assert.ok(capturedCorrelatedActivityIds.length);
    const correlatedIdAsyncIterator = capturedCorrelatedActivityIds[0];
    assert.ok(correlatedIdFetchNext !== correlatedIdAsyncIterator);
  });

  it("error response should have correlated activity id header", async () => {
    // wrong query format to trigger error
    const query = "SELECT * frm c";
    const queryIterator = container.items.query(query);
    // fetchNext
    try {
      await queryIterator.fetchNext();
    } catch (err) {
      assert.ok(capturedCorrelatedActivityIds.length);
      assert.equal(
        err.headers["x-ms-cosmos-correlated-activityid"],
        capturedCorrelatedActivityIds[0],
      );
    }
    queryIterator.reset();
    capturedCorrelatedActivityIds = [];
    // fetchAll
    try {
      await queryIterator.fetchAll();
    } catch (err) {
      assert.ok(capturedCorrelatedActivityIds.length);
      assert.equal(
        err.headers["x-ms-cosmos-correlated-activityid"],
        capturedCorrelatedActivityIds[0],
      );
    }
    queryIterator.reset();
    capturedCorrelatedActivityIds = [];
    // getAsyncIterator
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of queryIterator.getAsyncIterator()) {
        // The loop is intentionally empty
      }
    } catch (err) {
      assert.ok(capturedCorrelatedActivityIds.length);
      assert.equal(
        err.headers["x-ms-cosmos-correlated-activityid"],
        capturedCorrelatedActivityIds[0],
      );
    }
  });

  after(async function () {
    await removeAllDatabases();
  });
});
