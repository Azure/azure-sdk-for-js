// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list `Reservation`s within a single `ReservationOrder`.
 *
 * @summary list `Reservation`s within a single `ReservationOrder`.
 * x-ms-original-file: 2022-11-01/GetReservationsFromOrder.json
 */
async function reservationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.reservation.list("276e7ae4-84d0-4da6-ab4b-d6b94f3557da")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationList();
}

main().catch(console.error);
