// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import type { Container } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, beforeAll } from "vitest";

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
      throughput: 16000 // Higher throughput to ensure multiple partitions
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
        description: `Item ${i} in ${partitionKey}`
      });
    }
    
    console.log("Inserted 80 items across 4 partition keys");
    
    const queryIterator = partitionedContainer.items.query(query, queryOptions);
    let totalItems = 0;
    let pageCount = 0;
    
    while(queryIterator.hasMoreResults()){
      const result = await queryIterator.fetchNext();
      totalItems += result.resources.length;
      pageCount++;
      
      console.log(`Page ${pageCount}: Retrieved ${result.resources.length} items (Total: ${totalItems})`);
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

  it("should execute a order by query on multi-partitioned container", async () => {
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
      throughput: 16000 // Higher throughput to ensure multiple partitions
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
        description: `Item ${i} in ${partitionKey}`
      });
    }
    
    console.log("Inserted 80 items across 4 partition keys");
    
    const queryIterator = partitionedContainer.items.query(query, queryOptions);
    let totalItems = 0;
    let pageCount = 0;
    let br = 0;
    while(queryIterator.hasMoreResults() && br < 10){
      br++;
      const result = await queryIterator.fetchNext();
      totalItems += result.resources.length;
      pageCount++;
      
      console.log(`Page ${pageCount}: Retrieved ${result.resources.length} items (Total: ${totalItems})`);
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

});
