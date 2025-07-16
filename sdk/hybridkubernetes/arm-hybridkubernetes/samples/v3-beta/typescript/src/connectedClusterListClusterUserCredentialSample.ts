// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @summary gets cluster user credentials of the connected cluster with a specified resource group and name.
 * x-ms-original-file: 2024-12-01-preview/ConnectedClustersListClusterCredentialResultCSPAAD.json
 */
async function listClusterUserCredentialExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.listClusterUserCredential("k8sc-rg", "testCluster", {
    authenticationMethod: "AAD",
    clientProxy: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @summary gets cluster user credentials of the connected cluster with a specified resource group and name.
 * x-ms-original-file: 2024-12-01-preview/ConnectedClustersListClusterCredentialResultCSPToken.json
 */
async function listClusterUserCredentialNonAadExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.listClusterUserCredential("k8sc-rg", "testCluster", {
    authenticationMethod: "Token",
    clientProxy: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @summary gets cluster user credentials of the connected cluster with a specified resource group and name.
 * x-ms-original-file: 2024-12-01-preview/ConnectedClustersListClusterCredentialResultHPAAD.json
 */
async function listClusterUserCredentialCSPExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.listClusterUserCredential("k8sc-rg", "testCluster", {
    authenticationMethod: "AAD",
    clientProxy: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @summary gets cluster user credentials of the connected cluster with a specified resource group and name.
 * x-ms-original-file: 2024-12-01-preview/ConnectedClustersListClusterCredentialResultHPToken.json
 */
async function listClusterUserCredentialNonAadCSPExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.listClusterUserCredential("k8sc-rg", "testCluster", {
    authenticationMethod: "Token",
    clientProxy: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await listClusterUserCredentialExample();
  await listClusterUserCredentialNonAadExample();
  await listClusterUserCredentialCSPExample();
  await listClusterUserCredentialNonAadCSPExample();
}

main().catch(console.error);
