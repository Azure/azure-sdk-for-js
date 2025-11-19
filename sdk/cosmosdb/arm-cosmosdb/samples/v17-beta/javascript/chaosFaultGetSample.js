// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get Chaos Fault for a CosmosdB account for a particular Chaos Fault.
 *
 * @summary Get Chaos Fault for a CosmosdB account for a particular Chaos Fault.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/ChaosFaultGet.json
 */
async function chaosFaultGet() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const chaosFault = "ServiceUnavailability";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.chaosFault.get(resourceGroupName, accountName, chaosFault);
  console.log(result);
}

async function main() {
  await chaosFaultGet();
}

main().catch(console.error);
