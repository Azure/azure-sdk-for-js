// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to API to update certain properties of the connected cluster resource
 *
 * @summary API to update certain properties of the connected cluster resource
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/UpdateClusterExample.json
 */
import type { ConnectedClusterPatch } from "@azure/arm-hybridkubernetes";
import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

async function updateClusterExample(): Promise<void> {
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName = "k8sc-rg";
  const clusterName = "testCluster";
  const connectedClusterPatch: ConnectedClusterPatch = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedClusterOperations.update(
    resourceGroupName,
    clusterName,
    connectedClusterPatch,
  );
  console.log(result);
}

updateClusterExample().catch(console.error);
