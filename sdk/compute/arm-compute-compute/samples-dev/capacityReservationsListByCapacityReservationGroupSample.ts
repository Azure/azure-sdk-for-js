// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.
 *
 * @summary lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/BlockCapacityReservation_ListByReservationGroup.json
 */
async function listBlockCapacityReservationsInReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservations.listByCapacityReservationGroup(
    "myResourceGroup",
    "blockCapacityReservationGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.
 *
 * @summary lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_ListByReservationGroup.json
 */
async function listCapacityReservationsInReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservations.listByCapacityReservationGroup(
    "myResourceGroup",
    "myCapacityReservationGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.
 *
 * @summary lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/TargetedCapacityReservation_ListByReservationGroup.json
 */
async function listCapacityReservationsInTargetedReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservations.listByCapacityReservationGroup(
    "myResourceGroup",
    "targetedCapacityReservationGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBlockCapacityReservationsInReservationGroup();
  await listCapacityReservationsInReservationGroup();
  await listCapacityReservationsInTargetedReservationGroup();
}

main().catch(console.error);
