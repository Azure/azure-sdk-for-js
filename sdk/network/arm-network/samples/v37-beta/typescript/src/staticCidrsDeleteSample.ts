// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the Static CIDR resource.
 *
 * @summary delete the Static CIDR resource.
 * x-ms-original-file: 2025-05-01/StaticCidrs_Delete.json
 */
async function staticCidrsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.staticCidrs.delete("rg1", "TestNetworkManager", "TestPool", "TestStaticCidr");
}

async function main(): Promise<void> {
  await staticCidrsDelete();
}

main().catch(console.error);
