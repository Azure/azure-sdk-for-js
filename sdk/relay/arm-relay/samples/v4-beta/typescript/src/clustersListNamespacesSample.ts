// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Relay namespace resource IDs assigned to a Relay cluster.
 *
 * @summary lists Relay namespace resource IDs assigned to a Relay cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ListNamespacesInClusterGet.json
 */
async function listNamespacesInCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.clusters.listNamespaces("myResourceGroup", "testCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await listNamespacesInCluster();
}

main().catch(console.error);
