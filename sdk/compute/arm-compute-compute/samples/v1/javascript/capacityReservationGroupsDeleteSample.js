// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_Delete_MaximumSet_Gen.json
 */
async function capacityReservationGroupDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservationGroups.delete("rgcompute", "a");
}

/**
 * This sample demonstrates how to the operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details.
 *
 * @summary the operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_Delete_MinimumSet_Gen.json
 */
async function capacityReservationGroupDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservationGroups.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaa");
}

async function main() {
  await capacityReservationGroupDeleteMaximumSetGen();
  await capacityReservationGroupDeleteMinimumSetGen();
}

main().catch(console.error);
