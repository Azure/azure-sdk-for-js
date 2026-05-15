// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "@azure/cosmos";
import { CosmosClient } from "@azure/cosmos";
import { describe, it, assert, beforeAll, afterAll } from "vitest";

const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
const key =
  process.env.ACCOUNT_KEY ||
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function createClient(): CosmosClient {
  return new CosmosClient({
    endpoint,
    key,
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
  });
}

describe("React Native query operations", { timeout: 30000 }, () => {
  let client: CosmosClient;
  let container: Container;
  const testDbId = `rn-query-db-${Math.floor(Math.random() * 10000)}`;
  const testContainerId = "rn-query-container";

  const testDocs = [
    { id: "doc1", pk: "partA", category: "electronics", price: 100 },
    { id: "doc2", pk: "partA", category: "electronics", price: 200 },
    { id: "doc3", pk: "partA", category: "books", price: 15 },
    { id: "doc4", pk: "partB", category: "books", price: 25 },
    { id: "doc5", pk: "partB", category: "clothing", price: 50 },
  ];

  beforeAll(async () => {
    client = createClient();
    const { resource: db } = await client.databases.create({ id: testDbId });
    assert.ok(db);
    const { resource: cont } = await client.database(testDbId).containers.create({
      id: testContainerId,
      partitionKey: { paths: ["/pk"] },
    });
    assert.ok(cont);
    container = client.database(testDbId).container(testContainerId);
    for (const doc of testDocs) {
      await container.items.create(doc);
    }
  });

  afterAll(async () => {
    try {
      await client.database(testDbId).delete();
    } catch {
      // ignore cleanup errors
    }
  });

  it("should execute a simple query with fetchAll", async () => {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.category = @category",
      parameters: [{ name: "@category", value: "electronics" }],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    assert.equal(resources.length, 2);
    assert.ok(resources.every((r: any) => r.category === "electronics"));
  });

  it("should execute a parameterized query with multiple parameters", async () => {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.category = @category AND c.price > @minPrice",
      parameters: [
        { name: "@category", value: "electronics" },
        { name: "@minPrice", value: 150 },
      ],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    assert.equal(resources.length, 1);
    assert.equal(resources[0].id, "doc2");
  });

  it("should iterate with fetchNext", async () => {
    const queryIterator = container.items.readAll({ maxItemCount: 2 });
    const allItems: any[] = [];

    while (queryIterator.hasMoreResults()) {
      const { resources } = await queryIterator.fetchNext();
      if (resources) {
        allItems.push(...resources);
      }
    }

    assert.equal(allItems.length, testDocs.length);
  });

  it("should execute a string query", async () => {
    const query = "SELECT * FROM c WHERE c.pk = 'partB'";
    const { resources } = await container.items.query(query).fetchAll();
    assert.equal(resources.length, 2);
    assert.ok(resources.every((r: any) => r.pk === "partB"));
  });

  it("should execute an aggregate query", async () => {
    const querySpec = {
      query: "SELECT VALUE COUNT(1) FROM c",
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    assert.equal(resources[0], testDocs.length);
  });
});
