// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Chaos Faults for CosmosDB account.
 *
 * @summary list Chaos Faults for CosmosDB account.
 * x-ms-original-file: 2025-11-01-preview/ChaosFaultList.json
 */
async function chaosFaultList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.chaosFault.list("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await chaosFaultList();
}

main().catch(console.error);
