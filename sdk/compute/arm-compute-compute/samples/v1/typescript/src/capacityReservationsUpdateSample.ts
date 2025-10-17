// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a capacity reservation.
 *
 * @summary the operation to update a capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_Update_MaximumSet_Gen.json
 */
async function capacityReservationUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.capacityReservations.update("rgcompute", "aaaaaaaaaa", "aaaaaaaaaaaaaaaaaaa", {
    properties: {
      instanceView: {
        utilizationInfo: {},
        statuses: [
          {
            code: "aaaaaaaaaaaaaaaaaaaaaaa",
            level: "Info",
            displayStatus: "aaaaaa",
            message: "a",
            time: new Date("2021-11-30T12:58:26.522Z"),
          },
        ],
      },
    },
    sku: { name: "Standard_DS1_v2", tier: "aaa", capacity: 7 },
    tags: { key4974: "aaaaaaaaaaaaaaaa" },
  });
}

/**
 * This sample demonstrates how to the operation to update a capacity reservation.
 *
 * @summary the operation to update a capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_Update_MinimumSet_Gen.json
 */
async function capacityReservationUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.capacityReservations.update("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaa", "aaa", {});
}

async function main(): Promise<void> {
  await capacityReservationUpdateMaximumSetGen();
  await capacityReservationUpdateMinimumSetGen();
}

main().catch(console.error);
