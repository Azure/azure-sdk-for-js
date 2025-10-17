// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel the migration operation on an Availability Set.
 *
 * @summary cancel the migration operation on an Availability Set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_CancelMigrationToVirtualMachineScaleSet.json
 */
async function availabilitySetCancelMigrationToVirtualMachineScaleSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.availabilitySets.cancelMigrationToVirtualMachineScaleSet(
    "rgcompute",
    "myAvailabilitySet",
  );
}

async function main() {
  await availabilitySetCancelMigrationToVirtualMachineScaleSet();
}

main().catch(console.error);
