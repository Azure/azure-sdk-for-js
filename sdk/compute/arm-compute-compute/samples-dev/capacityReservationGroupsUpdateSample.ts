// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified.
 *
 * @summary the operation to update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_Update_MaximumSet_Gen.json
 */
async function capacityReservationGroupUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaa",
    { properties: { instanceView: {} }, tags: { key5355: "aaa" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified.
 *
 * @summary the operation to update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_Update_MinimumSet_Gen.json
 */
async function capacityReservationGroupUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaa",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await capacityReservationGroupUpdateMaximumSetGen();
  await capacityReservationGroupUpdateMinimumSetGen();
}

main().catch(console.error);
