// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. Note: Block capacity reservations cannot be deleted after they have been successfully allocated until the schedule end time. Future capacity reservations (Minimum API version: 2026-04-01) can be deleted if their reservation state is one of: Pending, Declined, FulfillmentFailed, or Approved. Otherwise, Future capacity reservations in the Committed, Live, or PartiallyFulfilled state cannot be deleted until minimumCommitmentDays have elapsed since their scheduled start date.
 *
 * @summary the operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. Note: Block capacity reservations cannot be deleted after they have been successfully allocated until the schedule end time. Future capacity reservations (Minimum API version: 2026-04-01) can be deleted if their reservation state is one of: Pending, Declined, FulfillmentFailed, or Approved. Otherwise, Future capacity reservations in the Committed, Live, or PartiallyFulfilled state cannot be deleted until minimumCommitmentDays have elapsed since their scheduled start date.
 * x-ms-original-file: 2026-04-01/capacityReservationExamples/CapacityReservation_Delete_MaximumSet_Gen.json
 */
async function capacityReservationDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservations.delete(
    "rgcompute",
    "aaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
}

/**
 * This sample demonstrates how to the operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. Note: Block capacity reservations cannot be deleted after they have been successfully allocated until the schedule end time. Future capacity reservations (Minimum API version: 2026-04-01) can be deleted if their reservation state is one of: Pending, Declined, FulfillmentFailed, or Approved. Otherwise, Future capacity reservations in the Committed, Live, or PartiallyFulfilled state cannot be deleted until minimumCommitmentDays have elapsed since their scheduled start date.
 *
 * @summary the operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. Note: Block capacity reservations cannot be deleted after they have been successfully allocated until the schedule end time. Future capacity reservations (Minimum API version: 2026-04-01) can be deleted if their reservation state is one of: Pending, Declined, FulfillmentFailed, or Approved. Otherwise, Future capacity reservations in the Committed, Live, or PartiallyFulfilled state cannot be deleted until minimumCommitmentDays have elapsed since their scheduled start date.
 * x-ms-original-file: 2026-04-01/capacityReservationExamples/CapacityReservation_Delete_MinimumSet_Gen.json
 */
async function capacityReservationDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.capacityReservations.delete("rgcompute", "aaa", "aaaaaa");
}

async function main() {
  await capacityReservationDeleteMaximumSetGen();
  await capacityReservationDeleteMinimumSetGen();
}

main().catch(console.error);
