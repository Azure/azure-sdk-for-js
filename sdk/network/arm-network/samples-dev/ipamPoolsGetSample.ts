// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specific Pool resource.
 *
 * @summary Gets the specific Pool resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/IpamPools_Get.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function ipamPoolsGet(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "TestNetworkManager";
  const poolName = "TestPool";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.get(
    resourceGroupName,
    networkManagerName,
    poolName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ipamPoolsGet();
}

main().catch(console.error);
