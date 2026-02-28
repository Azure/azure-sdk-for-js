// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to to learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 *
 * @summary to learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 * x-ms-original-file: 2025-10-02-preview/PrivateEndpointConnectionsList.json
 */
async function listPrivateEndpointConnectionsByManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.list("rg1", "clustername1");
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateEndpointConnectionsByManagedCluster();
}

main().catch(console.error);
