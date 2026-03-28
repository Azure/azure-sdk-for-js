// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Chaos Fault for a CosmosdB account for a particular Chaos Fault.
 *
 * @summary get Chaos Fault for a CosmosdB account for a particular Chaos Fault.
 * x-ms-original-file: 2025-11-01-preview/ChaosFaultGet.json
 */
async function chaosFaultGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.chaosFault.get("rg1", "ddb1", "ServiceUnavailability");
  console.log(result);
}

async function main() {
  await chaosFaultGet();
}

main().catch(console.error);
