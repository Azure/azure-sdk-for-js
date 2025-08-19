// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified ipGroups.
 *
 * @summary Gets the specified ipGroups.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/IpGroupsGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getIPGroups(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "myResourceGroup";
  const ipGroupsName = "ipGroups1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipGroups.get(resourceGroupName, ipGroupsName);
  console.log(result);
}

async function main(): Promise<void> {
  await getIPGroups();
}

main().catch(console.error);
