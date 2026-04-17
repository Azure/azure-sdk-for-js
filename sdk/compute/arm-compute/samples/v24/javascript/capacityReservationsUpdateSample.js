// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a capacity reservation.
 *
 * @summary the operation to update a capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_Update_MaximumSet_Gen.json
 */
async function capacityReservationUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservations.update(
    "rgcompute",
    "aaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaa",
    {
      sku: { name: "Standard_DS1_v2", tier: "aaa", capacity: 7 },
      tags: { key4974: "aaaaaaaaaaaaaaaa" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update a capacity reservation.
 *
 * @summary the operation to update a capacity reservation.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservation_Update_MinimumSet_Gen.json
 */
async function capacityReservationUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.capacityReservations.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaa",
    {},
  );
  console.log(result);
}

async function main() {
  await capacityReservationUpdateMaximumSetGen();
  await capacityReservationUpdateMinimumSetGen();
}

main().catch(console.error);
