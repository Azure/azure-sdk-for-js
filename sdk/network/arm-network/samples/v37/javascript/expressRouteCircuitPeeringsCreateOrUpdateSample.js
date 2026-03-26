// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a peering in the specified express route circuits.
 *
 * @summary creates or updates a peering in the specified express route circuits.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitPeeringCreate.json
 */
async function createExpressRouteCircuitPeerings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitPeerings.createOrUpdate(
    "rg1",
    "circuitName",
    "AzurePrivatePeering",
    {
      peerASN: 200,
      primaryPeerAddressPrefix: "192.168.16.252/30",
      secondaryPeerAddressPrefix: "192.168.18.252/30",
      vlanId: 200,
    },
  );
  console.log(result);
}

async function main() {
  await createExpressRouteCircuitPeerings();
}

main().catch(console.error);
