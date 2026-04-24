// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts one or more virtual machines in a VM scale set.
 *
 * @summary restarts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Restart_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRestartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.restart("rgcompute", "aaaaaaaaaaaaaaaaaaa", {
    vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] },
  });
}

/**
 * This sample demonstrates how to restarts one or more virtual machines in a VM scale set.
 *
 * @summary restarts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Restart_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRestartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.restart("rgcompute", "aaaa");
}

async function main(): Promise<void> {
  await virtualMachineScaleSetRestartMaximumSetGen();
  await virtualMachineScaleSetRestartMinimumSetGen();
}

main().catch(console.error);
