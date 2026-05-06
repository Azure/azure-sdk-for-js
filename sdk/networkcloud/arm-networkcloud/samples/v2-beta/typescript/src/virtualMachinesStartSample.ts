// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start the provided virtual machine.
 *
 * @summary start the provided virtual machine.
 * x-ms-original-file: 2026-05-01-preview/VirtualMachines_Start.json
 */
async function startVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.virtualMachines.start("resourceGroupName", "virtualMachineName");
  console.log(result);
}

async function main(): Promise<void> {
  await startVirtualMachine();
}

main().catch(console.error);
