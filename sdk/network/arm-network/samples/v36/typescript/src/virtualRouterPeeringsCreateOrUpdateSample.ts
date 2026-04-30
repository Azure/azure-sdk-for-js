// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualRouterPeering} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates the specified Virtual Router Peering.
 *
 * @summary Creates or updates the specified Virtual Router Peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualRouterPeeringPut.json
 */
async function createVirtualRouterPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualRouterName = "virtualRouter";
  const peeringName = "peering1";
  const parameters: VirtualRouterPeering = {
    peerAsn: 20000,
    peerIp: "192.168.1.5",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouterPeerings.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualRouterName,
    peeringName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualRouterPeering();
}

main().catch(console.error);
