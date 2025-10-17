// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of a VM scale set instance.
 *
 * @summary gets the status of a VM scale set instance.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetInstanceView_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetGetInstanceViewMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.getInstanceView(
    "rgcompute",
    "aaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of a VM scale set instance.
 *
 * @summary gets the status of a VM scale set instance.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetInstanceView_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetGetInstanceViewMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.getInstanceView(
    "rgcompute",
    "aaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetGetInstanceViewMaximumSetGen();
  await virtualMachineScaleSetGetInstanceViewMinimumSetGen();
}

main().catch(console.error);
