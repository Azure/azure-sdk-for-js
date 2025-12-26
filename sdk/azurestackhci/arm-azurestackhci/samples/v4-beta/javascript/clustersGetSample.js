// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get HCI cluster.
 *
 * @summary get HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/GetCluster.json
 */
async function getCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.get("test-rg", "myCluster");
  console.log(result);
}

async function main() {
  await getCluster();
}

main().catch(console.error);
