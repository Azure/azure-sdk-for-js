// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return a reservation and get refund information.
 *
 * @summary return a reservation and get refund information.
 * x-ms-original-file: 2022-11-01/Return.json
 */
async function returnAReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.return.post("50000000-aaaa-bbbb-cccc-100000000004", {
    properties: {
      reservationToReturn: {
        quantity: 1,
        reservationId:
          "/providers/microsoft.capacity/reservationOrders/50000000-aaaa-bbbb-cccc-100000000004/reservations/40000000-aaaa-bbbb-cccc-100000000000",
      },
      returnReason: "PurchasedWrongProduct",
      scope: "Reservation",
      sessionId: "10000000-aaaa-bbbb-cccc-200000000000",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await returnAReservation();
}

main().catch(console.error);
