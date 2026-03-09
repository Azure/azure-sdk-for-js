// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ClusterJob resources by Clusters
 *
 * @summary list ClusterJob resources by Clusters
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_List.json
 */
async function clusterJobsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6D37FF61-4C93-4377-B06B-FC6D6D561A7D";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterJobs.list("rghci", "Ql40O4-I77S")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clusterJobsList();
}

main().catch(console.error);
