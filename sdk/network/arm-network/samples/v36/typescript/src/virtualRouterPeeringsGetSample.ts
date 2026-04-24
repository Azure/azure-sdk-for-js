// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified Virtual Router Peering.
 *
 * @summary Gets the specified Virtual Router Peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualRouterPeeringGet.json
 */
async function getVirtualRouterPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualRouterName = "virtualRouter";
  const peeringName = "peering1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouterPeerings.get(
    resourceGroupName,
    virtualRouterName,
    peeringName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualRouterPeering();
}

main().catch(console.error);
