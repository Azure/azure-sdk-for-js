// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric cluster resource with the specified name.
 *
 * @summary delete a Service Fabric cluster resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ClusterDeleteOperation_example.json
 */
async function deleteACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  await client.clusters.delete("resRg", "myCluster");
}

async function main(): Promise<void> {
  await deleteACluster();
}

main().catch(console.error);
