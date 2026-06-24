// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific volume on an Edge Machine.
 *
 * @summary get a specific volume on an Edge Machine.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineVolumes_Get.json
 */
async function edgeMachineVolumesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineVolumes.get("test-rg", "EdgeMachine01", "vol-001");
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineVolumesGet();
}

main().catch(console.error);
