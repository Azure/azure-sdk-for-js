// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a peering in the specified ExpressRouteCrossConnection.
 *
 * @summary Creates or updates a peering in the specified ExpressRouteCrossConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCrossConnectionBgpPeeringCreate.json
 */
async function expressRouteCrossConnectionBgpPeeringCreate() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "CrossConnection-SiliconValley";
  const crossConnectionName = "<circuitServiceKey>";
  const peeringName = "AzurePrivatePeering";
  const peeringParameters = {
    ipv6PeeringConfig: {
      primaryPeerAddressPrefix: "3FFE:FFFF:0:CD30::/126",
      secondaryPeerAddressPrefix: "3FFE:FFFF:0:CD30::4/126",
    },
    peerASN: 200,
    primaryPeerAddressPrefix: "192.168.16.252/30",
    secondaryPeerAddressPrefix: "192.168.18.252/30",
    vlanId: 200,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnectionPeerings.beginCreateOrUpdateAndWait(
    resourceGroupName,
    crossConnectionName,
    peeringName,
    peeringParameters,
  );
  console.log(result);
}

async function main() {
  await expressRouteCrossConnectionBgpPeeringCreate();
}

main().catch(console.error);
