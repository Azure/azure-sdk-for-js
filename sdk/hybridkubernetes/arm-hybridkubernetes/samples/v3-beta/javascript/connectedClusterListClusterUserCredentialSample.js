// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedKubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @summary gets cluster user credentials of the connected cluster with a specified resource group and name.
 * x-ms-original-file: 2026-05-01/ConnectedClustersListClusterCredentialResultCSPAAD.json
 */
async function listClusterUserCredentialExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-05-01/ConnectedClustersListClusterCredentialResultCSPToken.json
 */
async function listClusterUserCredentialNonAadExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-05-01/ConnectedClustersListClusterCredentialResultHPAAD.json
 */
async function listClusterUserCredentialCSPExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-05-01/ConnectedClustersListClusterCredentialResultHPToken.json
 */
async function listClusterUserCredentialNonAadCSPExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.listClusterUserCredential("k8sc-rg", "testCluster", {
    authenticationMethod: "Token",
    clientProxy: false,
  });
  console.log(result);
}

async function main() {
  await listClusterUserCredentialExample();
  await listClusterUserCredentialNonAadExample();
  await listClusterUserCredentialCSPExample();
  await listClusterUserCredentialNonAadCSPExample();
}

main().catch(console.error);
