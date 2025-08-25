// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified peering from a Virtual Router.
 *
 * @summary Deletes the specified peering from a Virtual Router.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualRouterPeeringDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteVirtualRouterPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualRouterName = "virtualRouter";
  const peeringName = "peering1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouterPeerings.beginDeleteAndWait(
    resourceGroupName,
    virtualRouterName,
    peeringName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteVirtualRouterPeering();
}

main().catch(console.error);
