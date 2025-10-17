// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new Flexible Virtual Machine Scale Set and migrate all the Virtual Machines in the Availability Set. This does not trigger a downtime on the Virtual Machines.
 *
 * @summary create a new Flexible Virtual Machine Scale Set and migrate all the Virtual Machines in the Availability Set. This does not trigger a downtime on the Virtual Machines.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_ConvertToVirtualMachineScaleSet.json
 */
async function availabilitySetConvertToVirtualMachineScaleSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.availabilitySets.convertToVirtualMachineScaleSet("rgcompute", "myAvailabilitySet", {
    parameters: { virtualMachineScaleSetName: "{vmss-name}" },
  });
}

async function main() {
  await availabilitySetConvertToVirtualMachineScaleSetGen();
}

main().catch(console.error);
