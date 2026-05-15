// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a peering in the specified ExpressRouteCrossConnection.
 *
 * @summary creates or updates a peering in the specified ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionBgpPeeringCreate.json
 */
async function expressRouteCrossConnectionBgpPeeringCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnectionPeerings.createOrUpdate(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
    {
      ipv6PeeringConfig: {
        primaryPeerAddressPrefix: "3FFE:FFFF:0:CD30::/126",
        secondaryPeerAddressPrefix: "3FFE:FFFF:0:CD30::4/126",
      },
      peerASN: 200,
      primaryPeerAddressPrefix: "192.168.16.252/30",
      secondaryPeerAddressPrefix: "192.168.18.252/30",
      vlanId: 200,
    },
  );
  console.log(result);
}

async function main() {
  await expressRouteCrossConnectionBgpPeeringCreate();
}

main().catch(console.error);
