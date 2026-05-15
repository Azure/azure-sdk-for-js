// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the Pool resource.
 *
 * @summary delete the Pool resource.
 * x-ms-original-file: 2025-05-01/IpamPools_Delete.json
 */
async function ipamPoolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.ipamPools.delete("rg1", "TestNetworkManager", "TestPool");
}

async function main(): Promise<void> {
  await ipamPoolsDelete();
}

main().catch(console.error);
