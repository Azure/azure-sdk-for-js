// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves continuous backup information for a table.
 *
 * @summary retrieves continuous backup information for a table.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBTableBackupInformation.json
 */
async function cosmosDBTableCollectionBackupInformation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.retrieveContinuousBackupInformation(
    "rgName",
    "ddb1",
    "tableName1",
    { location: "North Europe" },
  );
  console.log(result);
}

async function main() {
  await cosmosDBTableCollectionBackupInformation();
}

main().catch(console.error);
