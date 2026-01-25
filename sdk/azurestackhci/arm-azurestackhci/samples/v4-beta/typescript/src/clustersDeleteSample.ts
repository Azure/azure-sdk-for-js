// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an HCI cluster.
 *
 * @summary delete an HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/DeleteCluster.json
 */
async function deleteCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.clusters.delete("test-rg", "myCluster");
}

async function main(): Promise<void> {
  await deleteCluster();
}

main().catch(console.error);
