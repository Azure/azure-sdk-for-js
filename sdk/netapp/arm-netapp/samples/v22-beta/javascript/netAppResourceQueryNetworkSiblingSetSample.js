// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details of the specified network sibling set.
 *
 * @summary get details of the specified network sibling set.
 * x-ms-original-file: 2025-09-01-preview/NetworkSiblingSet_Query.json
 */
async function networkSiblingSetQuery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.queryNetworkSiblingSet("eastus", {
    networkSiblingSetId: "9760acf5-4638-11e7-9bdb-020073ca3333",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testVnet/subnets/testSubnet",
  });
  console.log(result);
}

async function main() {
  await networkSiblingSetQuery();
}

main().catch(console.error);
