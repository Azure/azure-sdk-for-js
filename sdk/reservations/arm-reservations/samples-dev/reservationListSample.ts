// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List `Reservation`s within a single `ReservationOrder`.
 *
 * @summary List `Reservation`s within a single `ReservationOrder`.
 * x-ms-original-file: specification/reservations/resource-manager/Microsoft.Capacity/stable/2022-11-01/examples/GetReservationsFromOrder.json
 */

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationList(): Promise<void> {
  const reservationOrderId = "276e7ae4-84d0-4da6-ab4b-d6b94f3557da";
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.reservation.list(reservationOrderId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationList();
}

main().catch(console.error);
