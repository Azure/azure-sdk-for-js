// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-10-01/ClusterJobs_Get_AddServerJob.json
 */
async function clusterJobsGetAddServerJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "addserver");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-10-01/ClusterJobs_Get_ConfigureSdnIntegrationJob.json
 */
async function clusterJobsGetConfigureSdnIntegrationJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6D37FF61-4C93-4377-B06B-FC6D6D561A7D";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("rghci", "Y-k0MG", "configureSdnIntegration");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-10-01/ClusterJobs_Get_RepairServerJob.json
 */
async function clusterJobsGetRepairServerJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "repairserver");
  console.log(result);
}

async function main() {
  await clusterJobsGetAddServerJob();
  await clusterJobsGetConfigureSdnIntegrationJob();
  await clusterJobsGetRepairServerJob();
}

main().catch(console.error);
