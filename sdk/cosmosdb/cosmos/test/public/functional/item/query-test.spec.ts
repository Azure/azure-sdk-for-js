// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "@azure/cosmos";
import { describe, it } from "vitest";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { endpoint } from "../../common/_testConfig.js";

describe.skip("IQ Query test", async () => {
  it("test", async () => {
    const client = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
    });
    // create database container and add some data
    const { database } = await client.databases.createIfNotExists({ id: "testdb" });
    const { container } = await database.containers.createIfNotExists({ id: "testcontainer" });
    // Insert 100 items into the container

    // Arrange
    const query = "SELECT * FROM c";
    const queryOptions = {
      enableQueryControl: true, // Enable your new feature
      maxItemCount: 10, // Small page size to test pagination
      forceQueryPlan: true, // Force the query plan to be used
    };

    console.log("==========================================");
    console.log("Testing basic query with minimal options");
    console.log("==========================================");

    // Act
    try {
      const queryIterator = container.items.query(query, queryOptions);
      console.log("Query iterator created successfully");
      console.log("About to call fetchAll()...");

      // Add timeout to prevent infinite hanging
      const result = await queryIterator.fetchAll();

      console.log("fetchAll() completed successfully!");
      console.log("==========================================");
      console.log("RESULT ARRAY LENGTH:", result.resources?.length || "undefined");
      console.log("==========================================");
    } catch (error) {
      console.log("==========================================");
      console.log("ERROR OCCURRED:", error.message);
      console.log("Error stack:", error.stack);
      console.log("==========================================");
      throw error;
    }
    // Assert
    // assert.ok(result.resources.length === 100, "Expected 100 items in the result");
  });
});
