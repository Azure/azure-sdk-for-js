// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts one or more virtual machines in a VM scale set.
 *
 * @summary restarts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Restart_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRestartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.restart("rgcompute", "aaaaaaaaaaaaaaaaaaa", {
    vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to restarts one or more virtual machines in a VM scale set.
 *
 * @summary restarts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Restart_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRestartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.restart("rgcompute", "aaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetRestartMaximumSetGen();
  await virtualMachineScaleSetRestartMinimumSetGen();
}

main().catch(console.error);
