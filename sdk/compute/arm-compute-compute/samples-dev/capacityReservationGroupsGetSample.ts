// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation that retrieves information about a capacity reservation group.
 *
 * @summary the operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservationGroup_Get.json
 */
async function getABlockCapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    "myResourceGroup",
    "blockCapacityReservationGroup",
    { expand: "instanceView" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation that retrieves information about a capacity reservation group.
 *
 * @summary the operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_Get.json
 */
async function getACapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    "myResourceGroup",
    "myCapacityReservationGroup",
    { expand: "instanceView" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation that retrieves information about a capacity reservation group.
 *
 * @summary the operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/TargetedCapacityReservationGroup_Get.json
 */
async function getATargetedCapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    "myResourceGroup",
    "targetedCapacityReservationGroup",
    { expand: "instanceView" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getABlockCapacityReservationGroup();
  await getACapacityReservationGroup();
  await getATargetedCapacityReservationGroup();
}

main().catch(console.error);
