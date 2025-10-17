// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an availability set.
 *
 * @summary delete an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Delete_MaximumSet_Gen.json
 */
async function availabilitySetDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.availabilitySets.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to delete an availability set.
 *
 * @summary delete an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Delete_MinimumSet_Gen.json
 */
async function availabilitySetDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.availabilitySets.delete("rgcompute", "aaaaaaaaaaa");
}

async function main(): Promise<void> {
  await availabilitySetDeleteMaximumSetGen();
  await availabilitySetDeleteMinimumSetGen();
}

main().catch(console.error);
