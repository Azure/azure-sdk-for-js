// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a GPU Job on an Edge Machine GPU.
 *
 * @summary create or update a GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_CreateOrUpdate_AssignPartition.json
 */
async function edgeMachineGpuJobsCreateOrUpdateAssignPartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "default",
    "AssignPartition",
    {
      properties: {
        jobType: "AssignPartition",
        deploymentMode: "Validate",
        vmId: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.Compute/virtualMachines/workload-vm1",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a GPU Job on an Edge Machine GPU.
 *
 * @summary create or update a GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_CreateOrUpdate_CreatePartition.json
 */
async function edgeMachineGpuJobsCreateOrUpdateCreatePartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "default",
    "CreatePartition",
    { properties: { jobType: "CreatePartition", deploymentMode: "Validate", partitionCount: 4 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a GPU Job on an Edge Machine GPU.
 *
 * @summary create or update a GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_CreateOrUpdate_RemovePartition.json
 */
async function edgeMachineGpuJobsCreateOrUpdateRemovePartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "default",
    "RemovePartition",
    {
      properties: {
        jobType: "RemovePartition",
        deploymentMode: "Validate",
        vmId: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.Compute/virtualMachines/workload-vm1",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a GPU Job on an Edge Machine GPU.
 *
 * @summary create or update a GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_CreateOrUpdate_SwitchMode.json
 */
async function edgeMachineGpuJobsCreateOrUpdateSwitchMode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineGpuJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "default",
    "SwitchMode",
    { properties: { jobType: "SwitchMode", deploymentMode: "Validate", mode: "GPUP" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineGpuJobsCreateOrUpdateAssignPartition();
  await edgeMachineGpuJobsCreateOrUpdateCreatePartition();
  await edgeMachineGpuJobsCreateOrUpdateRemovePartition();
  await edgeMachineGpuJobsCreateOrUpdateSwitchMode();
}

main().catch(console.error);
