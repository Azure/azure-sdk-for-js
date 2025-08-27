// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import type { Container } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, beforeAll, assert } from "vitest";

const client = new CosmosClient({
  endpoint,
  key: masterKey,
});

describe("Queries", { timeout: 10000 }, () => {
  let container: Container;

  beforeAll(async () => {
    await removeAllDatabases(client);
  });

  it.skip("should execute a simple query", async () => {
    const query = "SELECT * FROM c";
    const queryOptions = {
      enableQueryControl: true, // Enable your new feature
      maxItemCount: 10, // Small page size to test pagination
      forceQueryPlan: true, // Force the query plan to be used
    };
    container = await getTestContainer("test-container", client);
    // Insert some test data
    for (let i = 0; i < 100; i++) {
      await container.items.create({ id: `item-${i}`, value: i });
    }
    const queryIterator = container.items.query(query, queryOptions);
    while (queryIterator.hasMoreResults()) {
      const result = await queryIterator.fetchNext();
      console.log("Query executed successfully:", result.resources.length);
      console.log("continuation token", result.continuationToken);
      // You can add assertions here to validate the results
    }

    // testForDiagnostics(queryIterator, result);
    // console.log("Query executed successfully:", result.resources.length);
  });

  it.skip("should execute a query on multi-partitioned container", async () => {
    const query = "SELECT * FROM c";
    const queryOptions = {
      enableQueryControl: true, // Enable your new feature
      maxItemCount: 30, // Very small page size to test pagination across partitions
      forceQueryPlan: true, // Force the query plan to be used
      maxDegreeOfParallelism: 3, // Use parallel query execution
    };

    // Create a partitioned container
    const database = await client.databases.createIfNotExists({ id: "test-db-partitioned" });
    const containerResponse = await database.database.containers.createIfNotExists({
      id: "test-container-partitioned",
      partitionKey: { paths: ["/partitionKey"] }, // Explicit partition key
      throughput: 16000, // Higher throughput to ensure multiple partitions
    });
    const partitionedContainer = containerResponse.container;

    console.log("Created partitioned container");

    // Insert test data across multiple partition key values to force multiple partitions
    const partitionKeys = ["partition-A", "partition-B", "partition-C", "partition-D"];
    for (let i = 0; i < 80; i++) {
      const partitionKey = partitionKeys[i % partitionKeys.length];
      await partitionedContainer.items.create({
        id: `item-${i}`,
        value: i,
        partitionKey: partitionKey,
        description: `Item ${i} in ${partitionKey}`,
      });
    }

    console.log("Inserted 80 items across 4 partition keys");

    const queryIterator = partitionedContainer.items.query(query, queryOptions);
    let totalItems = 0;
    let pageCount = 0;

    while (queryIterator.hasMoreResults()) {
      const result = await queryIterator.fetchNext();
      totalItems += result.resources.length;
      pageCount++;

      console.log(
        `Page ${pageCount}: Retrieved ${result.resources.length} items (Total: ${totalItems})`,
      );
      console.log("continuation token:", result.continuationToken ? "Present" : "None");

      if (result.continuationToken) {
        try {
          const tokenObj = JSON.parse(result.continuationToken);
          // print indexes: and partitionKeyRange:
          const indexes = tokenObj.rangeMappings.map((rm: any) => rm.indexes);
          const partitionKeyRange = tokenObj.rangeMappings.map((rm: any) => rm.partitionKeyRange);

          console.log("  - Parsed continuation token:", tokenObj);
          console.log("  - Indexes:", indexes);
          console.log("  - Partition Key Ranges:", partitionKeyRange);
        } catch (e) {
          console.log("  - Could not parse continuation token");
        }
      }
    }

    console.log(`\nSummary: Retrieved ${totalItems} total items across ${pageCount} pages`);

    // Clean up
    await database.database.delete();
  });

  it.skip("should execute a order by query on multi-partitioned container", async () => {
    const query = "SELECT * FROM c ORDER BY c.id";
    const queryOptions = {
      enableQueryControl: true, // Enable your new feature
      maxItemCount: 30, // Very small page size to test pagination across partitions
      forceQueryPlan: true, // Force the query plan to be used
      maxDegreeOfParallelism: 3, // Use parallel query execution
    };

    // Create a partitioned container
    const database = await client.databases.createIfNotExists({ id: "test-db-partitioned" });
    const containerResponse = await database.database.containers.createIfNotExists({
      id: "test-container-partitioned",
      partitionKey: { paths: ["/partitionKey"] }, // Explicit partition key
      throughput: 16000, // Higher throughput to ensure multiple partitions
    });
    const partitionedContainer = containerResponse.container;

    console.log("Created partitioned container");

    // Insert test data across multiple partition key values to force multiple partitions
    const partitionKeys = ["partition-A", "partition-B", "partition-C", "partition-D"];
    for (let i = 0; i < 80; i++) {
      const partitionKey = partitionKeys[i % partitionKeys.length];
      await partitionedContainer.items.create({
        id: `item-${i}`,
        value: i,
        partitionKey: partitionKey,
        description: `Item ${i} in ${partitionKey}`,
      });
    }

    console.log("Inserted 80 items across 4 partition keys");

    const queryIterator = partitionedContainer.items.query(query, queryOptions);
    let totalItems = 0;
    let pageCount = 0;
    let br = 0;
    while (queryIterator.hasMoreResults() && br < 10) {
      br++;
      const result = await queryIterator.fetchNext();
      totalItems += result.resources.length;
      pageCount++;

      console.log(
        `Page ${pageCount}: Retrieved ${result.resources.length} items (Total: ${totalItems})`,
      );
      console.log(
        "continuation token:",
        result.continuationToken ? "Present" : "None",
        result.continuationToken,
      );

      if (result.continuationToken) {
        try {
          const tokenObj = JSON.parse(result.continuationToken);
          console.log("  - Parsed continuation token:", tokenObj);

          // Check if this is an ORDER BY continuation token
          if (tokenObj.compositeToken && tokenObj.orderByItems !== undefined) {
            console.log("  - ORDER BY continuation token detected");
            console.log("  - Order by items:", tokenObj.orderByItems);
            console.log("  - RID:", tokenObj.rid);
            console.log("  - Skip count:", tokenObj.skipCount);

            // Parse the inner composite token if it exists
            if (tokenObj.compositeToken) {
              try {
                const compositeTokenObj = JSON.parse(tokenObj.compositeToken);
                if (compositeTokenObj.rangeMappings) {
                  const indexes = compositeTokenObj.rangeMappings.map((rm: any) => rm.indexes);
                  const partitionKeyRange = compositeTokenObj.rangeMappings.map(
                    (rm: any) => rm.partitionKeyRange,
                  );
                  console.log("  - Inner composite token indexes:", indexes);
                  console.log("  - Inner composite token partition key ranges:", partitionKeyRange);
                }
              } catch (e) {
                console.log("  - Could not parse inner composite token:", e.message);
              }
            }
          }
          // Check if this is a regular composite continuation token
          else if (tokenObj.rangeMappings) {
            console.log("  - Composite continuation token detected");
            const indexes = tokenObj.rangeMappings.map((rm: any) => rm.indexes);
            const partitionKeyRange = tokenObj.rangeMappings.map((rm: any) => rm.partitionKeyRange);
            console.log("  - Indexes:", indexes);
            console.log("  - Partition Key Ranges:", partitionKeyRange);
          } else {
            console.log("  - Unknown continuation token format");
            console.log("  - Token keys:", Object.keys(tokenObj));
          }
        } catch (e) {
          console.log("  - Could not parse continuation token:", e.message);
          console.log("  - Raw token:", result.continuationToken);
        }
      }
    }

    console.log(`\nSummary: Retrieved ${totalItems} total items across ${pageCount} pages`);

    // Clean up
    await database.database.delete();
  });

  it.skip("should recreate ORDER BY query iterator using continuation token", async () => {
    const query = "SELECT * FROM c ORDER BY c.id";
    const queryOptions = {
      enableQueryControl: true, // Enable your new feature
      maxItemCount: 10, // Small page size to ensure we get a continuation token
      forceQueryPlan: true, // Force the query plan to be used
      maxDegreeOfParallelism: 3, // Use parallel query execution
    };

    // Create a partitioned container
    const database = await client.databases.createIfNotExists({ id: "test-db-recreation" });
    const containerResponse = await database.database.containers.createIfNotExists({
      id: "test-container-recreation",
      partitionKey: { paths: ["/partitionKey"] }, // Explicit partition key
      throughput: 16000, // Higher throughput to ensure multiple partitions
    });
    const partitionedContainer = containerResponse.container;

    console.log("Created partitioned container for recreation test");

    // Insert test data across multiple partition key values to force multiple partitions
    const partitionKeys = ["partition-A", "partition-B", "partition-C", "partition-D"];
    for (let i = 0; i < 100; i++) {
      const partitionKey = partitionKeys[i % partitionKeys.length];
      await partitionedContainer.items.create({
        id: `item-${i.toString()}`,
        value: i,
        partitionKey: partitionKey,
        description: `Item ${i} in ${partitionKey}`,
      });
    }

    console.log("Inserted 1000 items across 4 partition keys for recreation test");
    const result = [];

    // PHASE 1: Execute first query and get continuation token
    console.log("\n=== PHASE 1: Initial Query Execution ===");
    const queryIterator1 = partitionedContainer.items.query(query, queryOptions);

    if (!queryIterator1.hasMoreResults()) {
      throw new Error("First query iterator should have results");
    }
    let contToken1;
    while (queryIterator1.hasMoreResults()) {
      const firstResult = await queryIterator1.fetchNext();
      if (firstResult && firstResult.resources) {
        result.push(...firstResult.resources);
      }
      console.log(`First fetchNext: Retrieved ${firstResult.resources.length} items`);
      console.log(
        "First batch items:",
        firstResult.resources.map((item) => item.id),
      );
      if (firstResult.continuationToken) {
        contToken1 = firstResult.continuationToken;
        break;
      }
    }

    const continuationToken = contToken1;
    console.log("Continuation token obtained:", continuationToken ? "Present" : "None");

    // Parse and log the continuation token structure
    try {
      const tokenObj = JSON.parse(continuationToken);
      console.log("Parsed continuation token structure:");
      console.log("  - Type:", tokenObj.compositeToken ? "ORDER BY" : "Regular");

      if (tokenObj.compositeToken && tokenObj.orderByItems !== undefined) {
        console.log("  - ORDER BY continuation token confirmed");
        console.log("  - Order by items:", tokenObj.orderByItems);
        console.log("  - RID:", tokenObj.rid);
        console.log("  - Skip count:", tokenObj.skipCount);
      }
    } catch (e) {
      console.log("  - Could not parse continuation token:", e.message);
    }

    // PHASE 2: Recreate query iterator with continuation token
    console.log("\n=== PHASE 2: Query Iterator Recreation ===");
    const recreationOptions = {
      ...queryOptions,
      continuationToken: continuationToken, // Use the continuation token from first query
    };

    console.log("Creating new query iterator with continuation token...");
    const queryIterator2 = partitionedContainer.items.query(query, recreationOptions);
    // TODO: remove count once loop issue fixed
    while (queryIterator2.hasMoreResults()) {
      // if(countTemp > 10){
      //   break;
      // }
      const secondResult = await queryIterator2.fetchNext();
      if (secondResult && secondResult.resources) {
        result.push(...secondResult.resources);
      }
      console.log(`Second fetchNext: Retrieved ${secondResult.resources.length} items`);
      console.log(
        "Second batch items:",
        secondResult.resources.map((item) => item.id),
      );
      // countTemp++;
    }

    // PHASE 3: Verify recreation worked correctly
    console.log("\n=== PHASE 3: Verification ===");

    assert.equal(result.length, 100, "Total items retrieved should match inserted count");

    // check for ordering for all items they should be order item-1, item-2, ... in the result array
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i].id, `item-${i}`, "Items should be ordered by their IDs");
    }

    // Clean up
    await database.database.delete();
  });

  it.skip("should recreate parallel query iterator using continuation token", async () => {
    const query = "SELECT * FROM c";
    const queryOptions = {
      enableQueryControl: true, // Enable your new feature
      maxItemCount: 10, // Small page size to ensure we get a continuation token
      forceQueryPlan: true, // Force the query plan to be used
      maxDegreeOfParallelism: 3, // Use parallel query execution
    };

    // Create a partitioned container
    const database = await client.databases.createIfNotExists({ id: "test-db-recreation" });
    const containerResponse = await database.database.containers.createIfNotExists({
      id: "test-container-recreation",
      partitionKey: { paths: ["/partitionKey"] }, // Explicit partition key
      throughput: 16000, // Higher throughput to ensure multiple partitions
    });
    const partitionedContainer = containerResponse.container;

    console.log("Created partitioned container for recreation test");

    // Insert test data across multiple partition key values to force multiple partitions
    const partitionKeys = ["partition-A", "partition-B", "partition-C", "partition-D"];
    for (let i = 0; i < 100; i++) {
      const partitionKey = partitionKeys[i % partitionKeys.length];
      await partitionedContainer.items.create({
        id: `item-${i.toString()}`,
        value: i,
        partitionKey: partitionKey,
        description: `Item ${i} in ${partitionKey}`,
      });
    }

    console.log("Inserted 1000 items across 4 partition keys for recreation test");
    const result = [];

    // PHASE 1: Execute first query and get continuation token
    console.log("\n=== PHASE 1: Initial Query Execution ===");
    const queryIterator1 = partitionedContainer.items.query(query, queryOptions);

    if (!queryIterator1.hasMoreResults()) {
      throw new Error("First query iterator should have results");
    }
    let contToken1;
    while (queryIterator1.hasMoreResults()) {
      const firstResult = await queryIterator1.fetchNext();
      if (firstResult && firstResult.resources) {
        result.push(...firstResult.resources);
      }
      console.log(`First fetchNext: Retrieved ${firstResult.resources.length} items`);
      console.log(
        "First batch items:",
        firstResult.resources.map((item) => item.id),
      );
      if (firstResult.continuationToken) {
        contToken1 = firstResult.continuationToken;
        break;
      }
    }

    const continuationToken = contToken1;
    console.log("Continuation token obtained:", continuationToken ? "Present" : "None");

    // Parse and log the continuation token structure
    try {
      const tokenObj = JSON.parse(continuationToken);
      console.log("Parsed continuation token structure:");
      console.log("  - Type:", tokenObj.compositeToken ? "ORDER BY" : "Regular");

      if (tokenObj.compositeToken && tokenObj.orderByItems !== undefined) {
        console.log("  - ORDER BY continuation token confirmed");
        console.log("  - Order by items:", tokenObj.orderByItems);
        console.log("  - RID:", tokenObj.rid);
        console.log("  - Skip count:", tokenObj.skipCount);
      }
    } catch (e) {
      console.log("  - Could not parse continuation token:", e.message);
    }

    // PHASE 2: Recreate query iterator with continuation token
    console.log("\n=== PHASE 2: Query Iterator Recreation ===");
    const recreationOptions = {
      ...queryOptions,
      continuationToken: continuationToken, // Use the continuation token from first query
    };

    console.log("Creating new query iterator with continuation token...");
    const queryIterator2 = partitionedContainer.items.query(query, recreationOptions);
    // TODO: remove count once loop issue fixed
    while (queryIterator2.hasMoreResults()) {
      // if(countTemp > 10){
      //   break;
      // }
      const secondResult = await queryIterator2.fetchNext();
      if (secondResult && secondResult.resources) {
        result.push(...secondResult.resources);
      }
      console.log(`Second fetchNext: Retrieved ${secondResult.resources.length} items`);
      console.log(
        "Second batch items:",
        secondResult.resources.map((item) => item.id),
      );
      // countTemp++;
    }

    // PHASE 3: Verify recreation worked correctly
    console.log("\n=== PHASE 3: Verification ===");

    assert.equal(result.length, 100, "Total items retrieved should match inserted count");

    // check for ordering for all items they should be order item-1, item-2, ... in the result array
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i].id, `item-${i}`, "Items should be ordered by their IDs");
    }

    // Clean up
    await database.database.delete();
  });

  
});
