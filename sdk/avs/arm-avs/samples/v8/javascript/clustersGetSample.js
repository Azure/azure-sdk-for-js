// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Cluster
 *
 * @summary get a Cluster
 * x-ms-original-file: 2025-09-01/Clusters_Get.json
 */
async function clustersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.clusters.get("group1", "cloud1", "cluster1");
  console.log(result);
}

async function main() {
  await clustersGet();
}

main().catch(console.error);
