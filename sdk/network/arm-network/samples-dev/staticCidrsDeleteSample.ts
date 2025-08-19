// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the Static CIDR resource.
 *
 * @summary Delete the Static CIDR resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/StaticCidrs_Delete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function staticCidrsDelete(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "TestNetworkManager";
  const poolName = "TestPool";
  const staticCidrName = "TestStaticCidr";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.staticCidrs.beginDeleteAndWait(
    resourceGroupName,
    networkManagerName,
    poolName,
    staticCidrName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await staticCidrsDelete();
}

main().catch(console.error);
