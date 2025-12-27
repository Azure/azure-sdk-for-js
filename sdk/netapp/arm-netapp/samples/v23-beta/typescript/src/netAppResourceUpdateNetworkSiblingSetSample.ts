// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the network features of the specified network sibling set.
 *
 * @summary update the network features of the specified network sibling set.
 * x-ms-original-file: 2025-09-01-preview/NetworkSiblingSet_Update.json
 */
async function networkFeaturesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.updateNetworkSiblingSet("eastus", {
    networkFeatures: "Standard",
    networkSiblingSetId: "9760acf5-4638-11e7-9bdb-020073ca3333",
    networkSiblingSetStateId: "12345_44420.8001578125",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testVnet/subnets/testSubnet",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkFeaturesUpdate();
}

main().catch(console.error);
