// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation that retrieves information about the capacity reservation.
 *
 * @summary the operation that retrieves information about the capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservation_Get.json
 */
async function getABlockCapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservations.get(
    "myResourceGroup",
    "blockCapacityReservationGroup",
    "blockCapacityReservation",
    { expand: "instanceView" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation that retrieves information about the capacity reservation.
 *
 * @summary the operation that retrieves information about the capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_Get.json
 */
async function getACapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservations.get(
    "myResourceGroup",
    "myCapacityReservationGroup",
    "myCapacityReservation",
    { expand: "instanceView" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation that retrieves information about the capacity reservation.
 *
 * @summary the operation that retrieves information about the capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/TargetedCapacityReservation_Get.json
 */
async function getATargetedCapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservations.get(
    "myResourceGroup",
    "targetedCapacityReservationGroup",
    "targetedCapacityReservation",
    { expand: "instanceView" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getABlockCapacityReservation();
  await getACapacityReservation();
  await getATargetedCapacityReservation();
}

main().catch(console.error);
