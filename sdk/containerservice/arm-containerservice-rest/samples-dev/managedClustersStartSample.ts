// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to See [starting a cluster](https://learn.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster.
 *
 * @summary See [starting a cluster](https://learn.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ManagedClustersStart.json
 */

import ContainerServiceManagementClient, {
  getLongRunningPoller,
} from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function startManagedCluster(): Promise<void> {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start",
      subscriptionId,
      resourceGroupName,
      resourceName,
    )
    .post();
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = poller.pollUntilDone();
  console.log(result);
}

startManagedCluster().catch(console.error);
