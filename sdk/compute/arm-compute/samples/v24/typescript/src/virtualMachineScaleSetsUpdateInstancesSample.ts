// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.updateInstances("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaa", {
    instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"],
  });
}

/**
 * This sample demonstrates how to upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.updateInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetUpdateInstancesMaximumSetGen();
  await virtualMachineScaleSetUpdateInstancesMinimumSetGen();
}

main().catch(console.error);
