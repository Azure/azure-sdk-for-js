// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Import the required modules
import assert from "assert";
import { Container, CosmosClient, FeedOptions, OperationType } from "../../../src";
import { endpoint } from "../../public/common/_testConfig";
import { masterKey } from "../../public/common/_fakeTestSecrets";
import { getTestContainer, removeAllDatabases } from "../../public/common/TestHelpers";

describe("QueryIterator(Default Execution)", function () {
  this.timeout(10000);
  let container: Container;
  let capturedCorrelatedActivityIds: any[] = [];
  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    plugins: [
      {
        on: "request",
        plugin: async (context, _diagNode, next) => {
          if (context.operationType === OperationType.Query) {
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

  const querySpec = {
    query: "SELECT * from c",
  };

  before(async () => {
    container = await getTestContainer("Test", client);
    await container.items.create({ id: "1" });
    await container.items.create({ id: "2" });
    await container.items.create({ id: "3" });
    await container.items.create({ id: "4" });
  });

  beforeEach(async () => {
    capturedCorrelatedActivityIds = [];
  });

  it("fetchNext should pass correlation Id to request header", async () => {
    const queryIterator = container.items.query(querySpec);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchNext();
    assert.equal(capturedCorrelatedActivityIds.length, 1);
    assert.ok(typeof capturedCorrelatedActivityIds[0] === "string");
  });

  it("fetchAll should pass correlation Id to request header", async () => {
    const queryIterator = container.items.query(querySpec);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchAll();
    assert.equal(capturedCorrelatedActivityIds.length, 1);
    assert.ok(typeof capturedCorrelatedActivityIds[0] === "string");
  });

  it("correlated id should be same for both roundtrips with fetchAll operation when maxItem is set to 2.", async () => {
    const queryIterator = container.items.query(querySpec, { maxItemCount: 2 });
    await queryIterator.fetchAll();
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });
  after(async function () {
    await removeAllDatabases();
  });
});

describe("QueryIterator(Parallel Execution)", function () {
  this.timeout(10000);
  let container: Container;
  let capturedCorrelatedActivityIds: any[] = [];
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

  const querySpec = {
    query: "SELECT * from c",
  };
  const options: FeedOptions = { forceQueryPlan: true };

  before(async () => {
    container = await getTestContainer("Test", client, { partitionKey: "/id", throughput: 10000 });
    await container.items.create({ id: "1" });
    await container.items.create({ id: "2" });
    await container.items.create({ id: "3" });
    await container.items.create({ id: "4" });
  });

  beforeEach(async () => {
    capturedCorrelatedActivityIds = [];
  });

  it("fetchNext should pass correlation Id to request header with force query plan enabled", async () => {
    const queryIterator = container.items.query(querySpec, options);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchNext();
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });

  it("fetchAll should pass correlation Id to request header with force query plan enabled", async () => {
    const queryIterator = container.items.query(querySpec, options);
    assert.equal(capturedCorrelatedActivityIds.length, 0);
    await queryIterator.fetchAll();
    assert.ok(capturedCorrelatedActivityIds.length);
    assert.ok(
      capturedCorrelatedActivityIds.every((element) => element === capturedCorrelatedActivityIds[0])
    );
  });

  after(async function () {
    await removeAllDatabases();
  });
});
