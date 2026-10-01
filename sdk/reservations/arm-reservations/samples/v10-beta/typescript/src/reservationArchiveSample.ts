// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to archiving a `Reservation` moves it to `Archived` state.
 *
 * @summary archiving a `Reservation` moves it to `Archived` state.
 * x-ms-original-file: 2022-11-01/Archive.json
 */
async function archive(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  await client.reservation.archive(
    "276e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    "356e7ae4-84d0-4da6-ab4b-d6b94f3557da",
  );
}

async function main(): Promise<void> {
  await archive();
}

main().catch(console.error);
