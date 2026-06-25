// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a EdgeMachineGpu
 *
 * @summary delete a EdgeMachineGpu
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpus_Delete_MaximumSet_Gen.json
 */
async function edgeMachineGpusDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineGpus.delete("test-rg", "EdgeMachine01", "gpu-001");
}

async function main(): Promise<void> {
  await edgeMachineGpusDelete();
}

main().catch(console.error);
