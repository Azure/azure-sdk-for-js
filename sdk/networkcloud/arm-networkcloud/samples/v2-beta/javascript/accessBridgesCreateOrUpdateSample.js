// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new access bridge or update the properties of the existing access bridge.
 *
 * @summary create a new access bridge or update the properties of the existing access bridge.
 * x-ms-original-file: 2026-05-01-preview/AccessBridges_CreateOrUpdate.json
 */
async function createOrUpdateAccessBridge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.accessBridges.createOrUpdate("resourceGroupName", "Bastion", {
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
      type: "CustomLocation",
    },
    location: "location",
    ipv4ConnectedPrefix: "198.51.100.0/24",
    ipv6ConnectedPrefix: "2001:db8::/64",
    networkId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/l3IsolationDomainName/internalNetworks/internalNetworkName",
    securityRules: [
      {
        description: "Allow management plane egress",
        direction: "Outbound",
        ipv4Addresses: ["10.10.20.10-10.10.20.20"],
        ipv6Addresses: ["2001:db8:abcd:12::1000-2001:db8:abcd:12::1fff"],
        port: "24562-24570",
      },
    ],
    tags: { key1: "myvalue1", key2: "myvalue2" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAccessBridge();
}

main().catch(console.error);
