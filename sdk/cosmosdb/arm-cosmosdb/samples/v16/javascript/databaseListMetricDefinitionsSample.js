// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves metric definitions for the given database.
 *
 * @summary Retrieves metric definitions for the given database.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBDatabaseGetMetricDefinitions.json
 */
async function cosmosDbDatabaseGetMetricDefinitions() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseRid = "databaseRid";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.database.listMetricDefinitions(
    resourceGroupName,
    accountName,
    databaseRid,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await cosmosDbDatabaseGetMetricDefinitions();
}

main().catch(console.error);
