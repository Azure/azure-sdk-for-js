// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Capability resource that extends a Target resource.
 *
 * @summary create or update a Capability resource that extends a Target resource.
 * x-ms-original-file: 2025-01-01/Capabilities_CreateOrUpdate.json
 */
async function createOrUpdateACapabilityThatExtendsAVirtualMachineTargetResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.capabilities.createOrUpdate(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
    "Microsoft-VirtualMachine",
    "Shutdown-1.0",
    { properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateACapabilityThatExtendsAVirtualMachineTargetResource();
}

main().catch(console.error);
