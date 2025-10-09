// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to authenticate and use your database account using AAD credentials with Fabric.
 * 
 * Prerequisites:
 * 1. An Azure Cosmos account in fabric environment and database and container created.
 *    https://learn.microsoft.com/en-us/fabric/database/cosmos-db/overview
 * 2. Node.js packages (@azure/cosmos + @azure/identity) and login:
 *    npm install @azure/cosmos @azure/identity
 *    az login
 * 
 * Sample - demonstrates how to authenticate and use your database account using AAD credentials with Fabric.
 * Read more about operations allowed for this authorization method: https://aka.ms/cosmos-native-rbac
 * 
 * Note:
 * This sample assumes the database and container already exist.
 * It writes one item (PK path assumed to be "/pk") and reads it back.
 */

require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { CosmosClient } = require("@azure/cosmos");
const { handleError, finish, logStep } = require("./Shared/handleError.js");

// Configuration - replace with your values
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

function getTestItem(num) {
  return {
    id: `Item_${num}`,
    pk: "partition1",
    name: `Item ${num}`,
    description: `This is item ${num}`,
    runId: crypto.randomUUID(),
  };
}

async function run() {

  logStep("Setting up AAD credentials");
  
  // AAD auth works with az login
  const credentials = new DefaultAzureCredential();

  logStep("Creating Cosmos client with AAD credentials");
  const client = new CosmosClient({
    endpoint,
    aadCredentials: credentials,
    aadScope: "https://cosmos.azure.com/.default"
  });


  // Do R/W data operations with your authorized AAD client
  logStep("Getting database and container references");
  const database = client.database(databaseId);
  const container = database.container(containerId);

  logStep("Creating a test item");
  // Create item
  const testItem = getTestItem(0);
  const { resource: createdItem } = await container.items.create(testItem);
  console.log(`Created item: ${createdItem?.id}`);

  logStep("Reading the item back");
  // Read item
  const { resource: readItem } = await container.item(testItem.id, testItem.pk).read();
  console.log("Point read:");
  console.log(JSON.stringify(readItem, null, 2));

  logStep("Querying for items in the partition");
  // Query items
  const querySpec = {
    query: "SELECT * FROM c WHERE c.pk = @partitionKey",
    parameters: [
      {
        name: "@partitionKey",
        value: testItem.pk,
      },
    ],
  };

  const { resources: items } = await container.items.query(querySpec).fetchAll();
  console.log(`Found ${items.length} items in partition '${testItem.pk}':`);
  items.forEach((item) => {
    console.log(`- ${item.id}: ${item.name}`);
  });

  logStep("Sample completed successfully");
  await finish();
}

run().catch(handleError);
