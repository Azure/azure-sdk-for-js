// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to calculate price for returning `Reservations` if there are no policy errors.
 *
 * @summary calculate price for returning `Reservations` if there are no policy errors.
 * x-ms-original-file: 2022-11-01/CalculateRefund.json
 */
async function calculateRefund(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.calculateRefund.post("276e7ae4-84d0-4da6-ab4b-d6b94f3557da", {
    id: "/providers/microsoft.capacity/reservationOrders/50000000-aaaa-bbbb-cccc-100000000004",
    properties: {
      reservationToReturn: {
        quantity: 1,
        reservationId:
          "/providers/microsoft.capacity/reservationOrders/50000000-aaaa-bbbb-cccc-100000000004/reservations/40000000-aaaa-bbbb-cccc-100000000000",
      },
      scope: "Reservation",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await calculateRefund();
}

main().catch(console.error);
