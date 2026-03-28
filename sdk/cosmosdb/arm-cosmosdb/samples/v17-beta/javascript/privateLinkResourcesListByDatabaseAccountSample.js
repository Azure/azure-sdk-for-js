// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Cosmos DB account.
 *
 * @summary gets the private link resources that need to be created for a Cosmos DB account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBPrivateLinkResourceListGet.json
 */
async function getsPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByDatabaseAccount("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
