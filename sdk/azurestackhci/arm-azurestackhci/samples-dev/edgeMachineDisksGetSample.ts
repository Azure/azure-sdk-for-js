// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific disk on an Edge Machine.
 *
 * @summary get a specific disk on an Edge Machine.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDisks_Get.json
 */
async function edgeMachineDisksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDisks.get("test-rg", "EdgeMachine01", "disk-001");
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDisksGet();
}

main().catch(console.error);
