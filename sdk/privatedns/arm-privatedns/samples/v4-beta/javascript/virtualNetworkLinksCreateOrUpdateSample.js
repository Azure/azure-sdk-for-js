// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateDnsManagementClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a virtual network link to the specified Private DNS zone.
 *
 * @summary creates or updates a virtual network link to the specified Private DNS zone.
 * x-ms-original-file: 2024-06-01/VirtualNetworkLinkPut.json
 */
async function putPrivateDNSZoneVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkLinks.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "virtualNetworkLink1",
    {
      location: "Global",
      registrationEnabled: false,
      virtualNetwork: {
        id: "/subscriptions/virtualNetworkSubscriptionId/resourceGroups/virtualNetworkResourceGroup/providers/Microsoft.Network/virtualNetworks/virtualNetworkName",
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main() {
  await putPrivateDNSZoneVirtualNetworkLink();
}

main().catch(console.error);
