// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an ipGroups in a specified resource group.
 *
 * @summary creates or updates an ipGroups in a specified resource group.
 * x-ms-original-file: 2025-05-01/IpGroupsCreate.json
 */
async function createOrUpdateIpGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipGroups.createOrUpdate("myResourceGroup", "ipGroups1", {
    location: "West US",
    ipAddresses: ["13.64.39.16/32", "40.74.146.80/31", "40.74.147.32/28"],
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateIpGroups();
}

main().catch(console.error);
