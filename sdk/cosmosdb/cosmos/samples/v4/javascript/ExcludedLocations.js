// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Cosmos DB operations with excluded regions/locations.
 */

require("dotenv/config");
const { CosmosClient, BulkOperationType, ChangeFeedStartFrom } = require("@azure/cosmos");
const { handleError, logStep } = require("./Shared/handleError.js");

const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const key = process.env.COSMOS_KEY || "<cosmos key>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

function addEntropy(name) {
  return name + getEntropy();
}

function getEntropy() {
  return `${Math.floor(Math.random() * 10000)}`;
}

async function run() {
  /**
   * Excludes one or more Azure regions for the operation.
   * This option is only applied when enableEndPointDiscovery is set to true.
   */
  const requestOptions = { excludedLocations: ["West US 3"] };
  const client = new CosmosClient({
    endpoint,
    key,
    connectionPolicy: {
      preferredLocations: ["West US"],
    },
  });

  // Unique IDs for each API action
  const readItemId = addEntropy("item1");
  const deleteItemId = addEntropy("item2");
  const replaceItemId = addEntropy("item3");
  const patchItemId = addEntropy("item4");

  logStep("Creating database and container for excluded regions sample");
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  const { container } = await database.containers.createIfNotExists({
    id: containerId,
    partitionKey: {
      paths: ["/key"],
      version: 2,
    },
    throughput: 4000,
  });

  logStep("CREATE item with excludedLocations");
  await container.items.create({ id: readItemId, key: "Central US", value: 123 }, requestOptions);

  logStep("READ item with excludedLocations");
  const { resource: readItem } = await container
    .item(readItemId, "Central US")
    .read(requestOptions);
  console.log("Read Item:", readItem);

  logStep("UPSERT item with excludedLocations");
  await container.items.upsert({ id: readItemId, key: "Central US", value: 456 }, requestOptions);

  logStep("DELETE item with excludedLocations");
  await container.item(readItemId, "Central US").delete(requestOptions);

  logStep("QUERY items with excludedLocations");
  const querySpec = {
    query: "SELECT * FROM c WHERE c.key = @key",
    parameters: [{ name: "@key", value: "Central US" }],
  };
  const { resources: queryResults } = await container.items
    .query(querySpec, requestOptions)
    .fetchAll();
  console.log("Query Results:", queryResults);

  logStep("BATCH operations with excludedLocations");
  await container.items.batch(
    [
      {
        operationType: "Create",
        resourceBody: { id: deleteItemId, key: "Central US", value: 1 },
      },
      {
        operationType: "Upsert",
        resourceBody: { id: replaceItemId, key: "Central US", value: 2 },
      },
      { operationType: "Delete", id: deleteItemId },
    ],
    "Central US",
    requestOptions,
  );

  logStep("BULK operations with excludedLocations");
  await container.items.executeBulkOperations(
    [
      {
        operationType: BulkOperationType.Create,
        partitionKey: "Central US",
        resourceBody: { id: patchItemId, key: "Central US", value: 4 },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: "Central US",
        resourceBody: { id: readItemId, key: "Central US", value: 5 },
      },
      { operationType: BulkOperationType.Delete, id: patchItemId },
    ],
    requestOptions,
  );

  logStep("CHANGEFEED operations with excludedLocations");
  const changeFeedIteratorOptions = {
    excludedLocations: ["West US 3"],
    maxItemCount: 1,
    changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
  };
  const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
  const response = await iterator.readNext();
  console.log("Change Feed Response:", response.result);
}

run().catch(handleError);
