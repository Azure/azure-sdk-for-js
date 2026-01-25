// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a EdgeMachineJob
 *
 * @summary get a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Get_CollectLog.json
 */
async function edgeMachineJobsGetCollectLog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.get("ArcInstance-rg", "machine1", "collectLog");
  console.log(result);
}

/**
 * This sample demonstrates how to get a EdgeMachineJob
 *
 * @summary get a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Get_ProvisionOs.json
 */
async function edgeMachineJobsGetProvisionOs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.get("ArcInstance-rg", "machine1", "ProvisionOs");
  console.log(result);
}

/**
 * This sample demonstrates how to get a EdgeMachineJob
 *
 * @summary get a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Get_RemoteSupport.json
 */
async function edgeMachineJobsGetRemoteSupport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.get("ArcInstance-rg", "machine1", "RemoteSupport");
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineJobsGetCollectLog();
  await edgeMachineJobsGetProvisionOs();
  await edgeMachineJobsGetRemoteSupport();
}

main().catch(console.error);
