// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 *
 * @summary Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/GetClusterExample.json
 */
import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

async function getClusterExample(): Promise<void> {
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName = "k8sc-rg";
  const clusterName = "testCluster";
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedClusterOperations.get(resourceGroupName, clusterName);
  console.log(result);
}

getClusterExample().catch(console.error);
