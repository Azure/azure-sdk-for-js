// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_Get_ConfigureSdnIntegrationJob.json
 */
async function clusterJobsGetConfigureSdnIntegrationJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6D37FF61-4C93-4377-B06B-FC6D6D561A7D";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("rghci", "Y-k0MG", "configureSdnIntegration");
  console.log(result);
}

async function main() {
  await clusterJobsGetConfigureSdnIntegrationJob();
}

main().catch(console.error);
