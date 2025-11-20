// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using Priority Level support with various Cosmos DB operations
 * Shows how Low/High priority levels affect request throttling behavior
 */

import "dotenv/config";
import { finish, handleError, logSampleHeader, logStep } from "./Shared/handleError.js";
import type {
  Container,
  ChangeFeedIteratorOptions,
  ChangeFeedPullModelIterator,
} from "@azure/cosmos";
import {
  CosmosClient,
  PartitionKeyDefinitionVersion,
  StatusCodes,
  ChangeFeedStartFrom,
  PriorityLevel,
} from "@azure/cosmos";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Cosmos DB Priority Level Support - Comprehensive Sample");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const containerDef = {
    id: containerId,
    partitionKey: {
      paths: ["/category"],
      version: PartitionKeyDefinitionVersion.v2,
    },
    throughput: 11000,
  };

  try {
    const { container } = await database.containers.createIfNotExists(containerDef);
    console.log(`Created container with id: ${containerId}`);

    console.log("\n========== CRUD Operations with Priority Level ==========\n");

    await demonstrateCreateWithPriority(container);
    await demonstrateReadWithPriority(container);
    await demonstrateUpdateWithPriority(container);
    await demonstrateDeleteWithPriority(container);

    console.log("\n========== Query with Priority Level ==========\n");

    await demonstrateQueryWithPriority(container);

    console.log("\n========== Change Feed with Priority Level ==========\n");

    await demonstrateChangeFeedWithPriority(container);
  } catch (err) {
    console.error(err);
  } finally {
    await finish();
  }
}

// ========== CRUD Operations ==========

async function demonstrateCreateWithPriority(container: Container): Promise<void> {
  logStep("Creating items with different priority levels");

  console.log("Creating item with High Priority...");
  const { resource: highPriorityItem } = await container.items.create(
    {
      id: "high-priority-item",
      category: "important",
      description: "Critical operation",
    },
    { priorityLevel: PriorityLevel.High },
  );
  console.log(`✓ Created item: ${highPriorityItem?.id} with High Priority`);

  console.log("Creating item with Low Priority...");
  const { resource: lowPriorityItem } = await container.items.create(
    {
      id: "low-priority-item",
      category: "background",
      description: "Background operation",
    },
    { priorityLevel: PriorityLevel.Low },
  );
  console.log(`✓ Created item: ${lowPriorityItem?.id} with Low Priority`);

  console.log("Creating multiple items with mixed priorities...");
  for (let i = 1; i <= 3; i++) {
    const priority = i % 2 === 0 ? PriorityLevel.Low : PriorityLevel.High;
    await container.items.create(
      {
        id: `item-${i}`,
        category: `category-${i}`,
        value: i * 100,
      },
      { priorityLevel: priority },
    );
    const priorityStr = priority === PriorityLevel.Low ? "Low" : "High";
    console.log(`✓ Created item-${i} with ${priorityStr} Priority`);
  }
}

async function demonstrateReadWithPriority(container: Container): Promise<void> {
  logStep("Reading items with different priority levels");

  console.log("Reading item with High Priority...");
  const { statusCode } = await container
    .item("high-priority-item", "important")
    .read({ priorityLevel: PriorityLevel.High });
  console.log(`✓ Read item with status code ${statusCode} using High Priority`);

  console.log("Reading item with Low Priority...");
  await container
    .item("low-priority-item", "background")
    .read({ priorityLevel: PriorityLevel.Low });
  console.log("✓ Read item using Low Priority");

  console.log("Reading all items with Low Priority...");
  const { resources: allItems } = await container.items
    .readAll({ priorityLevel: PriorityLevel.Low })
    .fetchAll();
  console.log(`✓ Retrieved ${allItems.length} items using Low Priority`);
}

async function demonstrateQueryWithPriority(container: Container): Promise<void> {
  logStep("Querying items with different priority levels");

  console.log("Querying items with High Priority...");
  const { resources: highPriorityResults } = await container.items
    .query(
      {
        query: "SELECT * FROM c WHERE c.category = @category",
        parameters: [{ name: "@category", value: "important" }],
      },
      { priorityLevel: PriorityLevel.High },
    )
    .fetchAll();
  console.log(`✓ Found ${highPriorityResults.length} items using High Priority query`);

  console.log("Querying items with Low Priority...");
  const { resources: lowPriorityResults } = await container.items
    .query(
      {
        query: "SELECT * FROM c WHERE c.category != @category",
        parameters: [{ name: "@category", value: "system" }],
      },
      { priorityLevel: PriorityLevel.Low },
    )
    .fetchAll();
  console.log(`✓ Found ${lowPriorityResults.length} items using Low Priority query`);
}

async function demonstrateUpdateWithPriority(container: Container): Promise<void> {
  logStep("Updating items with different priority levels");

  // Read the item first
  const { resource: itemToUpdate } = await container
    .item("item-1", "category-1")
    .read({ priorityLevel: PriorityLevel.High });

  if (itemToUpdate) {
    // Update with High Priority
    console.log("Updating item with High Priority...");
    itemToUpdate.value = 150;
    await container
      .item(itemToUpdate.id, "category-1")
      .replace(itemToUpdate, { priorityLevel: PriorityLevel.High });
    console.log("✓ Updated item with High Priority");

    // Update with Low Priority
    console.log("Updating item with Low Priority...");
    itemToUpdate.value = 200;
    await container
      .item(itemToUpdate.id, "category-1")
      .replace(itemToUpdate, { priorityLevel: PriorityLevel.Low });
    console.log("✓ Updated item with Low Priority");
  }
}

async function demonstrateDeleteWithPriority(container: Container): Promise<void> {
  logStep("Deleting items with different priority levels");

  // Delete with Low Priority (cleanup operations)
  console.log("Deleting item with Low Priority...");
  await container
    .item("low-priority-item", "background")
    .delete({ priorityLevel: PriorityLevel.Low });
  console.log("✓ Deleted item using Low Priority");

  // Delete with High Priority
  console.log("Deleting item with High Priority...");
  await container
    .item("high-priority-item", "important")
    .delete({ priorityLevel: PriorityLevel.High });
  console.log("✓ Deleted item using High Priority");
}

// ========== Change Feed with Priority Level ==========

async function demonstrateChangeFeedWithPriority(container: Container): Promise<void> {
  logStep("Change Feed with Low Priority for entire container");

  // Ingest initial data
  await ingestData(container, 1, 2);

  // Fetch changes from beginning with Low priority
  let options: ChangeFeedIteratorOptions = {
    maxItemCount: 5,
    changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
    priorityLevel: PriorityLevel.Low,
  };
  let continuationToken = await iterateChangeFeedFromBeginning(container, options);

  // Ingest more data
  await ingestData(container, 3, 4);
  await iterateChangeFeedFromContinuationToken(container, continuationToken, PriorityLevel.Low);

  logStep("Change Feed with High Priority for partition key");

  options = {
    maxItemCount: 5,
    changeFeedStartFrom: ChangeFeedStartFrom.Beginning("category-1"),
    priorityLevel: PriorityLevel.High,
  };
  continuationToken = await iterateChangeFeedFromBeginning(container, options);

  await ingestData(container, 5, 6);
  await iterateChangeFeedFromContinuationToken(container, continuationToken, PriorityLevel.High);

  logStep("Change Feed with Low Priority for an EPK range");

  const epkRanges = await container.getFeedRanges();
  options = {
    maxItemCount: 5,
    changeFeedStartFrom: ChangeFeedStartFrom.Beginning(epkRanges[0]),
    priorityLevel: PriorityLevel.Low,
  };
  continuationToken = await iterateChangeFeedFromBeginning(container, options);

  await ingestData(container, 7, 8);
  await iterateChangeFeedFromContinuationToken(container, continuationToken, PriorityLevel.Low);

  logStep("Change Feed with High Priority starting from now");

  options = {
    maxItemCount: 5,
    changeFeedStartFrom: ChangeFeedStartFrom.Now(epkRanges[0]),
    priorityLevel: PriorityLevel.High,
  };
  const iterator = container.items.getChangeFeedIterator(options);
  let nowContinuationToken = "";

  for await (const result of iterator.getAsyncIterator()) {
    if (result.statusCode === StatusCodes.NotModified) {
      nowContinuationToken = result.continuationToken;
      console.log("✓ Established 'now' starting point with High Priority");
      break;
    }
  }

  await ingestData(container, 9, 10);
  await iterateChangeFeedFromContinuationToken(container, nowContinuationToken, PriorityLevel.High);
}

// ========== Helper Functions ==========

async function ingestData(container: Container, initialize: number, end: number): Promise<void> {
  for (let i = initialize; i <= end; i++) {
    await container.items.create({ id: `item${i}`, category: `category-${(i % 3) + 1}`, key: i });
  }
  console.log(`✓ Ingested items from item${initialize} to item${end}`);
}

async function iterateChangeFeedFromBeginning(
  container: Container,
  options: ChangeFeedIteratorOptions,
): Promise<string> {
  const iterator = container.items.getChangeFeedIterator(options);
  const priorityLevel = options.priorityLevel || "Default (High)";
  console.log(`✓ Starting Change Feed iteration from beginning with ${priorityLevel} priority`);
  return iterateChangeFeed(iterator);
}

async function iterateChangeFeedFromContinuationToken(
  container: Container,
  continuationToken: string,
  priorityLevel: PriorityLevel,
): Promise<void> {
  const options: ChangeFeedIteratorOptions = {
    maxItemCount: 5,
    changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
    priorityLevel,
  };
  const iterator = container.items.getChangeFeedIterator(options);
  const levelStr = priorityLevel === PriorityLevel.Low ? "Low" : "High";
  console.log(
    `✓ Resuming Change Feed iteration with continuation token using ${levelStr} priority`,
  );
  await iterateChangeFeed(iterator);
}

async function iterateChangeFeed(
  iterator: ChangeFeedPullModelIterator<any>,
  continuationToken: string = "",
): Promise<string> {
  let itemCount = 0;

  for await (const result of iterator.getAsyncIterator()) {
    try {
      if (result.statusCode === StatusCodes.NotModified) {
        continuationToken = result.continuationToken;
        console.log(`✓ No new results. Total items processed: ${itemCount}`);
        break;
      } else if (result.result && result.result.length > 0) {
        itemCount += result.result.length;
        console.log(`  - Received ${result.result.length} item(s)`);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  }

  return continuationToken;
}

run().catch(handleError);
