// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific network adapter on an Edge Machine.
 *
 * @summary get a specific network adapter on an Edge Machine.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineNetworkAdapters_Get.json
 */
async function edgeMachineNetworkAdaptersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineNetworkAdapters.get(
    "test-rg",
    "EdgeMachine01",
    "ethernet0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineNetworkAdaptersGet();
}

main().catch(console.error);
