// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 *
 * @summary Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/GetClusterExample.json
 */

import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getClusterExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedClusterOperations.get(
    resourceGroupName,
    clusterName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 *
 * @summary Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/GetProvisionedClusterExample.json
 */
async function getProvisionedClusterExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedClusterOperations.get(
    resourceGroupName,
    clusterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getClusterExample();
  await getProvisionedClusterExample();
}

main().catch(console.error);
