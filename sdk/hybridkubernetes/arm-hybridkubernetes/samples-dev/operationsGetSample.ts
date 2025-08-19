// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available API operations for Connected Cluster resource.
 *
 * @summary Lists all of the available API operations for Connected Cluster resource.
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/ListConnectedClusterOperationsExample.json
 */

import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listConnectedClusterOperationsExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectedClusterOperationsExample();
}

main().catch(console.error);
