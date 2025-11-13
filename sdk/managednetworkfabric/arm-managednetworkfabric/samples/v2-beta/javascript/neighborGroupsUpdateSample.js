// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Neighbor Group.
 *
 * @summary updates the Neighbor Group.
 * x-ms-original-file: 2024-06-15-preview/NeighborGroups_Update.json
 */
async function neighborGroupsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.neighborGroups.update("example-rg", "example-neighborGroup", {
    tags: { KeyId: "KeyValue" },
    properties: {
      annotation: "Updating",
      destination: {
        ipv4Addresses: [
          "10.10.10.10",
          "20.10.10.10",
          "30.10.10.10",
          "40.10.10.10",
          "50.10.10.10",
          "60.10.10.10",
          "70.10.10.10",
          "80.10.10.10",
          "90.10.10.10",
        ],
        ipv6Addresses: ["2F::/100"],
      },
    },
  });
  console.log(result);
}

async function main() {
  await neighborGroupsUpdateMaximumSetGen();
}

main().catch(console.error);
