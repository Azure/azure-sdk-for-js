// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ClusterJob resources by Clusters
 *
 * @summary list ClusterJob resources by Clusters
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_List.json
 */
async function clusterJobsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6D37FF61-4C93-4377-B06B-FC6D6D561A7D";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterJobs.list("rghci", "Ql40O4-I77S")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await clusterJobsList();
}

main().catch(console.error);
