// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to split a `Reservation` into two `Reservation`s with specified quantity distribution.
 *
 * @summary split a `Reservation` into two `Reservation`s with specified quantity distribution.
 * x-ms-original-file: 2022-11-01/SplitReservation.json
 */
async function split(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservation.split("276e7ae4-84d0-4da6-ab4b-d6b94f3557da", {
    quantities: [1, 2],
    reservationId:
      "/providers/Microsoft.Capacity/reservationOrders/276e7ae4-84d0-4da6-ab4b-d6b94f3557da/reservations/bcae77cd-3119-4766-919f-b50d36c75c7a",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await split();
}

main().catch(console.error);
