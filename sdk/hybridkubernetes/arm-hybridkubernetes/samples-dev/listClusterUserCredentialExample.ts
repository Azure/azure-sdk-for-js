// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @summary Gets cluster user credentials of the connected cluster with a specified resource group and name.
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultCSPAAD.json
 */
import type { ListClusterUserCredentialProperties } from "@azure/arm-hybridkubernetes";
import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

async function listClusterUserCredentialExample(): Promise<void> {
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName = "k8sc-rg";
  const clusterName = "testCluster";
  const properties: ListClusterUserCredentialProperties = {
    authenticationMethod: "AAD",
    clientProxy: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedClusterOperations.listClusterUserCredential(
    resourceGroupName,
    clusterName,
    properties,
  );
  console.log(result);
}

listClusterUserCredentialExample().catch(console.error);
