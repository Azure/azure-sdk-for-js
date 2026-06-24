// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete EdgeMachine update.
 *
 * @summary delete EdgeMachine update.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineUpdates_Delete.json
 */
async function edgeMachineUpdatesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineUpdates.delete("ArcInstance-rg", "machine1", "default");
}

async function main(): Promise<void> {
  await edgeMachineUpdatesDelete();
}

main().catch(console.error);
