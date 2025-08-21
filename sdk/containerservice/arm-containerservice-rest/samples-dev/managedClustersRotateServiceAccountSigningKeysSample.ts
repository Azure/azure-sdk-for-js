// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Rotates the service account signing keys of a managed cluster.
 *
 * @summary Rotates the service account signing keys of a managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ManagedClustersRotateServiceAccountSigningKeys.json
 */

import ContainerServiceManagementClient, {
  getLongRunningPoller,
} from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function rotateClusterServiceAccountSigningKeys(): Promise<void> {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys",
      subscriptionId,
      resourceGroupName,
      resourceName,
    )
    .post();
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = poller.pollUntilDone();
  console.log(result);
}

rotateClusterServiceAccountSigningKeys().catch(console.error);
