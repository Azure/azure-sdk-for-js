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

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CosmosClient } from "@azure/cosmos";
import { handleError, finish, logStep } from "./Shared/handleError.js";

// Configuration - replace with your values
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

// Test item structure
interface TestItem {
  id: string;
  pk: string;
  name: string;
  description: string;
  runId: string;
}

function getTestItem(num: number): TestItem {
  return {
    id: `Item_${num}`,
    pk: "partition1",
    name: `Item ${num}`,
    description: `This is item ${num}`,
    runId: crypto.randomUUID(),
  };
}

async function run(): Promise<void> {

  logStep("Setting up AAD credentials");
  
  // AAD auth works with az login
  const credentials = new DefaultAzureCredential();

  logStep("Creating Cosmos client with AAD credentials");
  
  const client = new CosmosClient({
    endpoint,
    aadCredentials: credentials,
    aadScope: "https://cosmos.azure.com/.default"
  });

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
  const { resource: readItem } = await container.item(testItem.id, testItem.pk).read<TestItem>();
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

  const { resources: items } = await container.items.query<TestItem>(querySpec).fetchAll();
  console.log(`Found ${items.length} items in partition '${testItem.pk}':`);
  items.forEach((item) => {
    console.log(`- ${item.id}: ${item.name}`);
  });

  logStep("Sample completed successfully");
  await finish();
}

run().catch(handleError);
