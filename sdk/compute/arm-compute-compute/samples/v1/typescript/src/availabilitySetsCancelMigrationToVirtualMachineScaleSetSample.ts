// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel the migration operation on an Availability Set.
 *
 * @summary cancel the migration operation on an Availability Set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_CancelMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetCancelMigrationToVirtualMachineScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.availabilitySets.cancelMigrationToVirtualMachineScaleSet(
    "rgcompute",
    "myAvailabilitySet",
  );
}

async function main(): Promise<void> {
  await availabilitySetCancelMigrationToVirtualMachineScaleSet();
}

main().catch(console.error);
