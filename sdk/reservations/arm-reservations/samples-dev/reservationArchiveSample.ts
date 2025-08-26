// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Archiving a `Reservation` moves it to `Archived` state.
 *
 * @summary Archiving a `Reservation` moves it to `Archived` state.
 * x-ms-original-file: specification/reservations/resource-manager/Microsoft.Capacity/stable/2022-11-01/examples/Archive.json
 */

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function archive(): Promise<void> {
  const reservationOrderId = "276e7ae4-84d0-4da6-ab4b-d6b94f3557da";
  const reservationId = "356e7ae4-84d0-4da6-ab4b-d6b94f3557da";
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservation.archive(reservationOrderId, reservationId);
  console.log(result);
}

async function main(): Promise<void> {
  await archive();
}

main().catch(console.error);
