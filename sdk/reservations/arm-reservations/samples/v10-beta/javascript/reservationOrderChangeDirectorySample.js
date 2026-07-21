// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id
 *
 * @summary change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id
 * x-ms-original-file: 2022-11-01/ChangeDirectoryReservationOrder.json
 */
async function changeDirectory() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.changeDirectory(
    "a075419f-44cc-497f-b68a-14ee811d48b9",
    { destinationTenantId: "906655ea-30be-4587-9d12-b50e077b0f32" },
  );
  console.log(result);
}

async function main() {
  await changeDirectory();
}

main().catch(console.error);
