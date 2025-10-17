// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates that the Virtual Machines in the Availability Set can be migrated to the provided Virtual Machine Scale Set.
 *
 * @summary validates that the Virtual Machines in the Availability Set can be migrated to the provided Virtual Machine Scale Set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_ValidateMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetValidateMigrationToVirtualMachineScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.availabilitySets.validateMigrationToVirtualMachineScaleSet(
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
  await availabilitySetValidateMigrationToVirtualMachineScaleSet();
}

main().catch(console.error);
