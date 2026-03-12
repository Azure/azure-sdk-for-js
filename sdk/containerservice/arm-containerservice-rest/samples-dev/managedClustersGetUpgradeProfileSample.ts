// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the upgrade profile of a managed cluster.
 *
 * @summary Gets the upgrade profile of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ManagedClustersGetUpgradeProfile.json
 */

import ContainerServiceManagementClient from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function getUpgradeProfileForManagedCluster(): Promise<void> {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const result = await client.path(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default",
    subscriptionId,
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

getUpgradeProfileForManagedCluster().catch(console.error);
