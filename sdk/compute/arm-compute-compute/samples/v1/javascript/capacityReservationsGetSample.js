// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation that retrieves information about the capacity reservation.
 *
 * @summary the operation that retrieves information about the capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservation_Get.json
 */
async function getABlockCapacityReservation() {
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
async function getACapacityReservation() {
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
async function getATargetedCapacityReservation() {
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

async function main() {
  await getABlockCapacityReservation();
  await getACapacityReservation();
  await getATargetedCapacityReservation();
}

main().catch(console.error);
