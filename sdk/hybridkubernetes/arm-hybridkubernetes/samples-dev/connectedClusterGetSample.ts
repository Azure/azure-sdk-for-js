// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 *
 * @summary returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 * x-ms-original-file: 2024-12-01-preview/GetClusterExample.json
 */
async function getClusterExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.get("k8sc-rg", "testCluster");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 *
 * @summary returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 * x-ms-original-file: 2024-12-01-preview/GetProvisionedClusterExample.json
 */
async function getProvisionedClusterExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.get("k8sc-rg", "testCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await getClusterExample();
  await getProvisionedClusterExample();
}

main().catch(console.error);
