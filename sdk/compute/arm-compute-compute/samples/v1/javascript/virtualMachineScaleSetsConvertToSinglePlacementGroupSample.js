// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ConvertToSinglePlacementGroup_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetConvertToSinglePlacementGroupMaximumSetGen() {
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
async function virtualMachineScaleSetConvertToSinglePlacementGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.convertToSinglePlacementGroup(
    "rgcompute",
    "aaaaaaaaaaaaa",
    {},
  );
}

async function main() {
  await virtualMachineScaleSetConvertToSinglePlacementGroupMaximumSetGen();
  await virtualMachineScaleSetConvertToSinglePlacementGroupMinimumSetGen();
}

main().catch(console.error);
