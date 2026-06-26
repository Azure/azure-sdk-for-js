// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a disk from an Edge Machine.
 *
 * @summary delete a disk from an Edge Machine.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDisks_Delete.json
 */
async function edgeMachineDisksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineDisks.delete("test-rg", "EdgeMachine01", "disk-001");
}

async function main(): Promise<void> {
  await edgeMachineDisksDelete();
}

main().catch(console.error);
