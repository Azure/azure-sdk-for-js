// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine.
 *
 * @summary start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_StartMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetStartMigrationToVirtualMachineScaleSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.availabilitySets.startMigrationToVirtualMachineScaleSet(
    "rgcompute",
    "myAvailabilitySet",
    {
      virtualMachineScaleSetFlexible: {
        id: "/subscriptions/{subscription-id}/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachineScaleSets/{vmss-name}",
      },
    },
  );
}

async function main(): Promise<void> {
  await availabilitySetStartMigrationToVirtualMachineScaleSetGen();
}

main().catch(console.error);
