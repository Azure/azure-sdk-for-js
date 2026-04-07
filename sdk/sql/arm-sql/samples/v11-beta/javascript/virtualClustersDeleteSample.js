// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a virtual cluster.
 *
 * @summary deletes a virtual cluster.
 * x-ms-original-file: 2025-02-01-preview/VirtualClusterDelete.json
 */
async function deleteVirtualCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.virtualClusters.delete("testrg", "vc-subnet1-f769ed71-b3ad-491a-a9d5-26eeceaa6be2");
}

async function main() {
  await deleteVirtualCluster();
}

main().catch(console.error);
