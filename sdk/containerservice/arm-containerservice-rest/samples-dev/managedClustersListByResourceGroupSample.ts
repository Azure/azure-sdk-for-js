// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists managed clusters in the specified subscription and resource group.
 *
 * @summary Lists managed clusters in the specified subscription and resource group.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ManagedClustersListByResourceGroup.json
 */

import ContainerServiceManagementClient, { paginate } from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function getManagedClustersByResourceGroup(): Promise<void> {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters",
      subscriptionId,
      resourceGroupName,
    )
    .get();
  const result = paginate(client, initialResponse);
  const resArray = new Array();
  for await (const item of result) {
    resArray.push(item);
  }
  console.log(resArray);
}

getManagedClustersByResourceGroup().catch(console.error);
