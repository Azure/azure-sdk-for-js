// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an HCI cluster.
 *
 * @summary delete an HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/DeleteCluster.json
 */
async function deleteCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.clusters.delete("test-rg", "myCluster");
}

async function main() {
  await deleteCluster();
}

main().catch(console.error);
