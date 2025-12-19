// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to changes ring of a cluster
 *
 * @summary changes ring of a cluster
 * x-ms-original-file: 2025-12-01-preview/ChangeClusterRing.json
 */
async function changeClusterRing() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.changeRing("test-rg", "myCluster", {
    properties: { targetRing: "Insider" },
  });
  console.log(result);
}

async function main() {
  await changeClusterRing();
}

main().catch(console.error);
