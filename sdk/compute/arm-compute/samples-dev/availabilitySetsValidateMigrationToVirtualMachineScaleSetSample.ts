// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MigrateToVirtualMachineScaleSetInput,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validates that the Virtual Machines in the Availability Set can be migrated to the provided Virtual Machine Scale Set.
 *
 * @summary Validates that the Virtual Machines in the Availability Set can be migrated to the provided Virtual Machine Scale Set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/availabilitySetExamples/AvailabilitySet_ValidateMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetValidateMigrationToVirtualMachineScaleSet(): Promise<void> {
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
    await client.availabilitySets.validateMigrationToVirtualMachineScaleSet(
      resourceGroupName,
      availabilitySetName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await availabilitySetValidateMigrationToVirtualMachineScaleSet();
}

main().catch(console.error);
