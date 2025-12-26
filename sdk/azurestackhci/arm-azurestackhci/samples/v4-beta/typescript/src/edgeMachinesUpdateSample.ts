// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an edge machine.
 *
 * @summary update an edge machine.
 * x-ms-original-file: 2025-12-01-preview/EdgeMachines_Update.json
 */
async function edgeMachinesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachines.update("ArcInstance-rg", "machine-1", {
    tags: { key2335: "beth" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachinesUpdate();
}

main().catch(console.error);
