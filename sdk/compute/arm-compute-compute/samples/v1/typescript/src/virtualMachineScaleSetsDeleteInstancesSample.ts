// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes virtual machines in a VM scale set.
 *
 * @summary deletes virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_DeleteInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetDeleteInstancesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.deleteInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
    { forceDeletion: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to deletes virtual machines in a VM scale set.
 *
 * @summary deletes virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_DeleteInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetDeleteInstancesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.deleteInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetDeleteInstancesMaximumSetGen();
  await virtualMachineScaleSetDeleteInstancesMinimumSetGen();
}

main().catch(console.error);
