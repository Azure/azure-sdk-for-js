// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create or update a Target resource that extends a tracked regional resource.
 *
 * @summary create or update a Target resource that extends a tracked regional resource.
 * x-ms-original-file: 2025-01-01/Targets_CreateOrUpdate.json
 */

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

async function createOrUpdateATargetThatExtendsAVirtualMachineResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.targets.createOrUpdate(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
    "Microsoft-VirtualMachine",
    { properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateATargetThatExtendsAVirtualMachineResource();
}

main().catch(console.error);
