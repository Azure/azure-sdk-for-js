// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EdgeMachineGpuJob resources by EdgeMachineGpu.
 *
 * @summary list EdgeMachineGpuJob resources by EdgeMachineGpu.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_List_MaximumSet_Gen.json
 */
async function edgeMachineGpuJobsListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachineGpuJobs.list(
    "ArcInstance-rg",
    "machine1",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await edgeMachineGpuJobsListMaximumSetGen();
}

main().catch(console.error);
