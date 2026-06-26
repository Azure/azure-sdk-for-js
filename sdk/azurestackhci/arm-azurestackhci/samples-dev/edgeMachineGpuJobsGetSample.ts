// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific GPU Job on an Edge Machine GPU.
 *
 * @summary get a specific GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_Get_AssignPartition.json
 */
async function edgeMachineGpuJobsGetAssignPartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.get(
    "ArcInstance-rg",
    "machine1",
    "default",
    "AssignPartition",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific GPU Job on an Edge Machine GPU.
 *
 * @summary get a specific GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_Get_CreatePartition.json
 */
async function edgeMachineGpuJobsGetCreatePartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.get(
    "ArcInstance-rg",
    "machine1",
    "default",
    "CreatePartition",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific GPU Job on an Edge Machine GPU.
 *
 * @summary get a specific GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_Get_MaximumSet_Gen.json
 */
async function edgeMachineGpuJobsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.get(
    "ArcInstance-rg",
    "machine1",
    "gpu-001",
    "CreatePartition",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific GPU Job on an Edge Machine GPU.
 *
 * @summary get a specific GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_Get_RemovePartition.json
 */
async function edgeMachineGpuJobsGetRemovePartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.get(
    "ArcInstance-rg",
    "machine1",
    "default",
    "RemovePartition",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific GPU Job on an Edge Machine GPU.
 *
 * @summary get a specific GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_Get_SwitchMode.json
 */
async function edgeMachineGpuJobsGetSwitchMode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.get(
    "ArcInstance-rg",
    "machine1",
    "default",
    "SwitchMode",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineGpuJobsGetAssignPartition();
  await edgeMachineGpuJobsGetCreatePartition();
  await edgeMachineGpuJobsGet();
  await edgeMachineGpuJobsGetRemovePartition();
  await edgeMachineGpuJobsGetSwitchMode();
}

main().catch(console.error);
