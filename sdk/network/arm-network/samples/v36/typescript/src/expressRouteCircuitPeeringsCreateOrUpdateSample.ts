// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ExpressRouteCircuitPeering} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a peering in the specified express route circuits.
 *
 * @summary Creates or updates a peering in the specified express route circuits.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitPeeringCreate.json
 */
async function createExpressRouteCircuitPeerings(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "circuitName";
  const peeringName = "AzurePrivatePeering";
  const peeringParameters: ExpressRouteCircuitPeering = {
    peerASN: 200,
    primaryPeerAddressPrefix: "192.168.16.252/30",
    secondaryPeerAddressPrefix: "192.168.18.252/30",
    vlanId: 200,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.expressRouteCircuitPeerings.beginCreateOrUpdateAndWait(
      resourceGroupName,
      circuitName,
      peeringName,
      peeringParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createExpressRouteCircuitPeerings();
}

main().catch(console.error);
