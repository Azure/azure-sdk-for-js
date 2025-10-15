// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://learn.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster.
 *
 * @summary This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://learn.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ManagedClustersStop.json
 */

import ContainerServiceManagementClient, {
  getLongRunningPoller,
} from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function stopManagedCluster(): Promise<void> {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop",
      subscriptionId,
      resourceGroupName,
      resourceName,
    )
    .post();
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

stopManagedCluster().catch(console.error);
