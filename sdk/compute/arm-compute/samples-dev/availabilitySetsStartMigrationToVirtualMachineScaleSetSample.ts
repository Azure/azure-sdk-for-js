// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MigrateToVirtualMachineScaleSetInput,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine.
 *
 * @summary Start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/availabilitySetExamples/AvailabilitySet_StartMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetStartMigrationToVirtualMachineScaleSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "myAvailabilitySet";
  const parameters: MigrateToVirtualMachineScaleSetInput = {
    virtualMachineScaleSetFlexible: {
      id: "/subscriptions/{subscription-id}/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachineScaleSets/{vmss-name}",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.availabilitySets.startMigrationToVirtualMachineScaleSet(
      resourceGroupName,
      availabilitySetName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await availabilitySetStartMigrationToVirtualMachineScaleSetGen();
}

main().catch(console.error);
