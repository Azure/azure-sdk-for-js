// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ClusterJob
 *
 * @summary delete a ClusterJob
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_Delete.json
 */
async function clusterJobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6D37FF61-4C93-4377-B06B-FC6D6D561A7D";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.clusterJobs.delete("rghci", "3-Vz3LSRO5Q6q8EV-PKs8-5E", "configureSdnIntegration");
}

async function main() {
  await clusterJobsDelete();
}

main().catch(console.error);
