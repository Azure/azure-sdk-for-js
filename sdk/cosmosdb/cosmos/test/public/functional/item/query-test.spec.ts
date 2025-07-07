// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "@azure/cosmos";
import { describe, it, assert } from "vitest";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { endpoint } from "../../common/_testConfig.js";

describe("IQ Query test", async () => {
  it("test", async () => {
    const client = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
    });
    // create database container and add some data
    await client.databases.createIfNotExists({ id: "testdb" });
    await client.database("testdb").containers.createIfNotExists({ id: "testcontainer" });
    await client.database("testdb").container("testcontainer").items.create({ id: "1", name: "Item 1" });
    await client.database("testdb").container("testcontainer").items.create({ id: "2", name: "Item 2" });
    // Arrange
    const query = "SELECT * FROM c";
    const expected = [{ id: "1", name: "Item 1" }, { id: "2", name: "Item 2" }];

    // Act
    const result = await client.database("testdb").container("testcontainer").items.query(query,{forceQueryPlan: true}).fetchAll();

    // just assert the id
    assert.deepEqual(result.resources.map(item => item.id), expected.map(item => item.id));
  });
});
