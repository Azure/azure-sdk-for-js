// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates throughput bucket operations at the client, database, container and item levels.
*/
require("dotenv/config");
const { ChangeFeedStartFrom, CosmosClient } = require("@azure/cosmos");
const { logSampleHeader, logStep, finish, handleError } = require("./Shared/handleError.js");
const { randomUUID } = require("@azure/core-util");

const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const key = process.env.COSMOS_KEY || "<cosmos key>";
const databaseId = process.env.COSMOS_DATABASE || "ThroughputBucketSampleDB";
const containerId = process.env.COSMOS_CONTAINER || "ThroughputBucketSampleContainer";

// Global variables to be used across functions
let globalClient;
let globalContainer;

logSampleHeader("Throughput Bucket Operations");

// Applies throughput bucket 1 to all requests from a client application
async function createClientWithThroughputBucket() {
  logStep("Creating client with throughput bucket 1 for all operations");
  
  globalClient = new CosmosClient({
    endpoint,
    key,
    throughputBucket: 1
  });
  
  logStep("Client created with throughput bucket 1");
}

// Creates database and container for the sample
async function setupDatabaseAndContainer() {
  logStep("Setting up database and container for throughput bucket operations");
  
  // Create database
  const { database } = await globalClient.databases.createIfNotExists({ id: databaseId });
  logStep(`Created/found database: ${database.id}`);
  
  // Create container
  const { container } = await database.containers.createIfNotExists({ 
    id: containerId,
    partitionKey: { paths: ["/pk"] }
  });
  logStep(`Created/found container: ${container.id}`);
  globalContainer = container;
}

// Demonstrates all CRUD operations with different throughput buckets
async function demonstrateCRUDWithThroughputBuckets() {
  logStep("Demonstrating CRUD operations with different throughput buckets");
  
  // CREATE - Create item with throughput bucket 2
  const createItemId = `create-item-${randomUUID()}`;
  const { resource: createdItem } = await globalContainer.items.create({
    id: createItemId,
    pk: "crud-pk",
    name: "CRUD Test Document",
    description: "Created with throughput bucket 2",
    operation: "create"
  }, {
    throughputBucket: 2
  });
  
  logStep(`Created item with id: ${createdItem?.id} using throughput bucket 2`);
  
  // READ - Read item with throughput bucket 3
  const { resource: readItem } = await globalContainer.item(createItemId, "crud-pk").read({
    throughputBucket: 3
  });
  
  logStep(`Read item with id: ${readItem.id} using throughput bucket 3`);
  
  // UPDATE (Replace) - Update item with throughput bucket 4
  readItem.description = "Updated with throughput bucket 4";
  readItem.operation = "update";
  readItem.updatedAt = new Date().toISOString();
  
  const { resource: updatedItem } = await globalContainer.item(createItemId, "crud-pk").replace(readItem, {
    throughputBucket: 4
  });
  
  logStep(`Updated item with id: ${updatedItem.id} using throughput bucket 4`);
  
  // UPSERT - Upsert items with throughput bucket 5
  for (let i = 1; i <= 2; i++) {
    const upsertItemId = `upsert-item-${i}`;
    const { resource: upsertedItem } = await globalContainer.items.upsert({
      id: upsertItemId,
      pk: "crud-pk",
      name: `Upserted Document ${i}`,
      description: `Upserted with bucket 2 - iteration ${i}`,
      operation: "upsert"
    }, {
      throughputBucket: 2
    });

    logStep(`Upserted item with id: ${upsertedItem?.id} using throughput bucket 2`);
  }
  
  // DELETE - Delete item with throughput bucket 6
  await globalContainer.item(createItemId, "crud-pk").delete({
    throughputBucket: 4
  });

  logStep(`Deleted item with id: ${createItemId} using throughput bucket 4`);

  // QUERY - Query items with throughput bucket 7
  const querySpec = {
    query: "SELECT * FROM c WHERE c.operation = @operation",
    parameters: [
      {
        name: "@operation",
        value: "upsert"
      }
    ]
  };
  
  const { resources: queryResults } = await globalContainer.items.query(querySpec, {
    throughputBucket: 3
  }).fetchAll();
  
  logStep(`Queried ${queryResults.length} items using throughput bucket 3`);
  
  // Clean up remaining items
  for (const item of queryResults) {
    await globalContainer.item(item.id, item.pk).delete();
  }
  
  logStep("Cleaned up remaining CRUD test items");
}

// Demonstrates client-level vs operation-level throughput buckets
async function demonstrateClientVsOperationBuckets() {
  logStep("Demonstrating client-level vs operation-level throughput buckets");
  
  // Create client with throughput bucket 1 for all operations
  const bucketClient = new CosmosClient({
    endpoint,
    key,
    throughputBucket: 1
  });
  
  const database = bucketClient.database(databaseId);
  const clientContainer = database.container(globalContainer.id);
  
  // Operation 1: Uses client's default bucket (1)
  const itemId1 = `client-bucket-${randomUUID()}`;
  await clientContainer.items.create({
    id: itemId1,
    pk: "client-test",
    name: "Uses Client Bucket",
    description: "This operation uses the client's default throughput bucket 1"
  });
  
  logStep("Created item using client's default throughput bucket 1");
  
  // Operation 2: Overrides client bucket with operation-specific bucket (2)
  const itemId2 = `operation-bucket-${randomUUID()}`;
  await clientContainer.items.create({
    id: itemId2,
    pk: "client-test",
    name: "Uses Operation Bucket",
    description: "This operation overrides client bucket with throughput bucket 2"
  }, {
    throughputBucket: 2
  });
  
  logStep("Created item using operation-specific throughput bucket 2 (overriding client bucket 1)");
  
  // Clean up
  await clientContainer.item(itemId1, "client-test").delete();
  await clientContainer.item(itemId2, "client-test").delete();
  
  logStep("Cleaned up client vs operation bucket test items");
}

// Demonstrates bulk operations with throughput buckets
async function demonstrateBulkOperationsWithThroughputBucket() {
  logStep("Demonstrating bulk operations with throughput bucket 2");
  
  // Prepare bulk operations
  const operations = [];
  for (let i = 1; i <= 5; i++) {
    operations.push({
      operationType: "Create",
      resourceBody: {
        id: `bulk-item-${i}`,
        pk: "bulk-pk",
        name: `Bulk Document ${i}`,
        description: `Created via bulk operation with bucket 2`
      }
    });
  }
  
  // Execute bulk operations with throughput bucket 2
  const res = await globalContainer.items.executeBulkOperations(operations, {
    throughputBucket: 2
  });

  logStep(`Executed ${res.length} bulk operations using throughput bucket 2`);
}

// Demonstrates change feed operations with throughput buckets
async function demonstrateChangeFeedWithThroughputBucket() {
  logStep("Demonstrating change feed operations with throughput bucket 2");
  
  // Create some test data for change feed
  const testItems = [];
  for (let i = 1; i <= 3; i++) {
    const itemId = `changefeed-item-${i}`;
    await globalContainer.items.create({
      id: itemId,
      pk: "changefeed-pk",
      name: `Change Feed Document ${i}`,
      description: `Document for change feed demo`,
      timestamp: new Date().toISOString()
    });
    testItems.push(itemId);
  }
  
  logStep("Created test data for change feed");
  
  // Read change feed with throughput bucket 4
  const changeFeedIterator = globalContainer.items.getChangeFeedIterator({
    changeFeedStartFrom: ChangeFeedStartFrom.Beginning("changefeed-pk"),
    throughputBucket: 4
  });
  
  let changeCount = 0;
  if (changeFeedIterator.hasMoreResults) {
    const res = await changeFeedIterator.readNext();
    changeCount = res.result.length;
  }

  logStep(`Read change feed with ${changeCount} changes using throughput bucket 4`);

  // Clean up test items
  for (const itemId of testItems) {
    await globalContainer.item(itemId, "changefeed-pk").delete();
  }
  
  logStep("Cleaned up change feed test items");
}

// Cleanup function to delete database and container
async function cleanup() {
  logStep("Cleaning up resources");
  
  try {
    await globalClient.database(databaseId).delete();
    logStep(`Cleaned up database: ${databaseId}`);
  } catch (error) {
    logStep(`Could not delete database ${databaseId}. You may need to delete it manually.`);
  }
}

async function runSample() {
  try {
    // Initialize client
    await createClientWithThroughputBucket();
    
    // Setup database and container
    await setupDatabaseAndContainer();
    
    // 1. Demonstrate all CRUD operations with different throughput buckets
    await demonstrateCRUDWithThroughputBuckets();

    // 2. Demonstrate client-level vs operation-level throughput buckets
    await demonstrateClientVsOperationBuckets();

    // 3. Demonstrate bulk operations with throughput buckets
    await demonstrateBulkOperationsWithThroughputBucket();

    // 4. Demonstrate change feed operations with throughput buckets
    await demonstrateChangeFeedWithThroughputBucket();
    
    logStep("Throughput bucket sample completed successfully!");
    
  } catch (error) {
    await handleError(error);
  } finally {
    // Clean up resources
    if (globalClient) {
      await cleanup();
    }
  }
}

// Run the sample
runSample()
  .catch((error) => {
    console.error("Sample failed:", error);
    process.exit(1);
});
