// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

describe("React Native CRUD operations", { timeout: 30000 }, () => {
  let client: CosmosClient;
  const testDbId = `rn-crud-db-${Math.floor(Math.random() * 10000)}`;
  const testContainerId = "rn-crud-container";

  beforeAll(() => {
    client = createClient();
  });

  afterAll(async () => {
    try {
      await client.database(testDbId).delete();
    } catch {
      // ignore cleanup errors
    }
  });

  describe("Database operations", () => {
    it("should create a database", async () => {
      const { resource: db } = await client.databases.create({ id: testDbId });
      assert.ok(db);
      assert.equal(db.id, testDbId);
    });

    it("should read the database", async () => {
      const { resource: db } = await client.database(testDbId).read();
      assert.ok(db);
      assert.equal(db.id, testDbId);
    });
  });

  describe("Container operations", () => {
    it("should create a container", async () => {
      const { resource: container } = await client.database(testDbId).containers.create({
        id: testContainerId,
        partitionKey: { paths: ["/pk"] },
      });
      assert.ok(container);
      assert.equal(container.id, testContainerId);
    });

    it("should read the container", async () => {
      const { resource: container } = await client
        .database(testDbId)
        .container(testContainerId)
        .read();
      assert.ok(container);
      assert.equal(container.id, testContainerId);
    });
  });

  describe("Item operations", () => {
    const testItem = { id: "item1", pk: "partitionA", name: "Test Item", value: 42 };

    it("should create an item", async () => {
      const container = client.database(testDbId).container(testContainerId);
      const { resource: item } = await container.items.create(testItem);
      assert.ok(item);
      assert.equal(item.id, testItem.id);
      assert.equal(item.name, testItem.name);
      assert.equal(item.value, testItem.value);
    });

    it("should read an item", async () => {
      const container = client.database(testDbId).container(testContainerId);
      const { resource: item } = await container.item(testItem.id, testItem.pk).read();
      assert.ok(item);
      assert.equal(item.id, testItem.id);
      assert.equal(item.name, testItem.name);
    });

    it("should replace an item", async () => {
      const container = client.database(testDbId).container(testContainerId);
      const updatedItem = { ...testItem, name: "Updated Item", value: 100 };
      const { resource: item } = await container
        .item(testItem.id, testItem.pk)
        .replace(updatedItem);
      assert.ok(item);
      assert.equal(item.name, "Updated Item");
      assert.equal(item.value, 100);
    });

    it("should read the replaced item", async () => {
      const container = client.database(testDbId).container(testContainerId);
      const { resource: item } = await container.item(testItem.id, testItem.pk).read();
      assert.ok(item);
      assert.equal(item.name, "Updated Item");
      assert.equal(item.value, 100);
    });

    it("should delete an item", async () => {
      const container = client.database(testDbId).container(testContainerId);
      const { statusCode } = await container.item(testItem.id, testItem.pk).delete();
      assert.ok(statusCode >= 200 && statusCode < 300);
    });

    it("should return 404 for deleted item", async () => {
      const container = client.database(testDbId).container(testContainerId);
      const { statusCode, resource } = await container.item(testItem.id, testItem.pk).read();
      assert.equal(statusCode, 404);
      assert.equal(resource, undefined);
    });
  });

  describe("Container deletion", () => {
    it("should delete the container", async () => {
      const { statusCode } = await client.database(testDbId).container(testContainerId).delete();
      assert.ok(statusCode >= 200 && statusCode < 300);
    });
  });
});
