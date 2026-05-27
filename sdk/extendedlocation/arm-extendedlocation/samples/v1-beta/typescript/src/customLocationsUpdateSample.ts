// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription.
 *
 * @summary updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription.
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsPatch.json
 */
async function updateCustomLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.customLocations.update("testresourcegroup", "customLocation01", {
    identity: { type: "SystemAssigned" },
    clusterExtensionIds: [
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/testresourcegroup/providers/Microsoft.ContainerService/managedClusters/cluster01/Microsoft.KubernetesConfiguration/clusterExtensions/fooExtension",
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/testresourcegroup/providers/Microsoft.ContainerService/managedClusters/cluster01/Microsoft.KubernetesConfiguration/clusterExtensions/barExtension",
    ],
    tags: { archv3: "", tier: "testing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCustomLocation();
}

main().catch(console.error);
