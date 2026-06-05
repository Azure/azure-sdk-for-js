// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available Cosmos DB Resource Provider operations.
 *
 * @summary lists all of the available Cosmos DB Resource Provider operations.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBOperationsList.json
 */
async function cosmosDBOperationsList() {
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBOperationsList();
}

main().catch(console.error);
