// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ConvertToSinglePlacementGroup_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetConvertToSinglePlacementGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.convertToSinglePlacementGroup(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { activePlacementGroupId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  );
}

/**
 * This sample demonstrates how to converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ConvertToSinglePlacementGroup_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetConvertToSinglePlacementGroupMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.convertToSinglePlacementGroup(
    "rgcompute",
    "aaaaaaaaaaaaa",
    {},
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetConvertToSinglePlacementGroupMaximumSetGen();
  await virtualMachineScaleSetConvertToSinglePlacementGroupMinimumSetGen();
}

main().catch(console.error);
