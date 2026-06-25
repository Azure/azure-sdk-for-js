// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_AddServerJob.json
 */
async function clusterJobsGetAddServerJob(): Promise<void> {
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
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_ConfigureSdnIntegrationJob.json
 */
async function clusterJobsGetConfigureSdnIntegrationJob(): Promise<void> {
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
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_GpuCreatePartitionJob.json
 */
async function clusterJobsGetGpuCreatePartitionJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "gpuCreatePartition");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_GpuSwitchModeJob.json
 */
async function clusterJobsGetGpuSwitchModeJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "gpuSwitchMode");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_RepairServerJob.json
 */
async function clusterJobsGetRepairServerJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "repairserver");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_VmConnectProvisionJob.json
 */
async function clusterJobsGetVmConnectProvisionJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "vmConnectProvision");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_Get_VmConnectRemoveJob.json
 */
async function clusterJobsGetVmConnectRemoveJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("test-rg", "myCluster", "vmConnectRemove");
  console.log(result);
}

async function main(): Promise<void> {
  await clusterJobsGetAddServerJob();
  await clusterJobsGetConfigureSdnIntegrationJob();
  await clusterJobsGetGpuCreatePartitionJob();
  await clusterJobsGetGpuSwitchModeJob();
  await clusterJobsGetRepairServerJob();
  await clusterJobsGetVmConnectProvisionJob();
  await clusterJobsGetVmConnectRemoveJob();
}

main().catch(console.error);
