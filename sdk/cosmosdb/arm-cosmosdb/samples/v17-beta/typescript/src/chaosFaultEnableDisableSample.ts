// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enable, disable Chaos Fault in a CosmosDB account.
 *
 * @summary enable, disable Chaos Fault in a CosmosDB account.
 * x-ms-original-file: 2025-11-01-preview/ChaosFaultEnableDisable.json
 */
async function chaosFaultEnableDisable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.chaosFault.enableDisable(
    "myResourceGroupName",
    "myAccountName",
    "ServiceUnavailability",
    {
      action: "Enable",
      containerName: "testCollection",
      databaseName: "testDatabase",
      region: "EastUS",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await chaosFaultEnableDisable();
}

main().catch(console.error);
