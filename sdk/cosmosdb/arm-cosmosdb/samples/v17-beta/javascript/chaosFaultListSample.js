// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Chaos Faults for CosmosDB account.
 *
 * @summary list Chaos Faults for CosmosDB account.
 * x-ms-original-file: 2025-11-01-preview/ChaosFaultList.json
 */
async function chaosFaultList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.chaosFault.list("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await chaosFaultList();
}

main().catch(console.error);
