// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network security group.
 *
 * @summary gets the specified network security group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupGet.json
 */
async function getNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.get("rg1", "testnsg");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkSecurityGroup();
}

main().catch(console.error);
