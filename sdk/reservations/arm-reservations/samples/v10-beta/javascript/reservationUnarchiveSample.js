// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restores a `Reservation` to the state it was before archiving.
 *
 * @summary restores a `Reservation` to the state it was before archiving.
 * x-ms-original-file: 2022-11-01/Unarchive.json
 */
async function unarchive() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  await client.reservation.unarchive(
    "276e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    "356e7ae4-84d0-4da6-ab4b-d6b94f3557da",
  );
}

async function main() {
  await unarchive();
}

main().catch(console.error);
