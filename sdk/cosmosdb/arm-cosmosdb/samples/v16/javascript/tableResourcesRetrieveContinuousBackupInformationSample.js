// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves continuous backup information for a table.
 *
 * @summary Retrieves continuous backup information for a table.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBTableBackupInformation.json
 */
async function cosmosDbTableCollectionBackupInformation() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "ddb1";
  const tableName = "tableName1";
  const location = {
    location: "North Europe",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.beginRetrieveContinuousBackupInformationAndWait(
    resourceGroupName,
    accountName,
    tableName,
    location,
  );
  console.log(result);
}

async function main() {
  await cosmosDbTableCollectionBackupInformation();
}

main().catch(console.error);
