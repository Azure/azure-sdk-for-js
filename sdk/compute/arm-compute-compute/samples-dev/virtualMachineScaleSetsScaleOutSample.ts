// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to scales out one or more virtual machines in a VM scale set.
 *
 * @summary scales out one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ScaleOut.json
 */
async function virtualMachineScaleSetScaleOut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.scaleOut("myResourceGroup", "{vmss-name}", {
    capacity: 5,
    properties: { zone: "1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetScaleOut();
}

main().catch(console.error);
