// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Cancel the migration operation on an Availability Set.
 *
 * @summary Cancel the migration operation on an Availability Set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/availabilitySetExamples/AvailabilitySet_CancelMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetCancelMigrationToVirtualMachineScaleSet(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "myAvailabilitySet";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.availabilitySets.cancelMigrationToVirtualMachineScaleSet(
      resourceGroupName,
      availabilitySetName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await availabilitySetCancelMigrationToVirtualMachineScaleSet();
}

main().catch(console.error);
