// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an edge machine.
 *
 * @summary delete an edge machine.
 * x-ms-original-file: 2025-12-01-preview/EdgeMachines_Delete.json
 */
async function edgeMachinesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachines.delete("ArcInstance-rg", "machine-1");
}

async function main(): Promise<void> {
  await edgeMachinesDeleteMaximumSet();
}

main().catch(console.error);
