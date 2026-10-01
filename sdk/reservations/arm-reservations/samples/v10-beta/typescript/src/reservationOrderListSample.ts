// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of all the `ReservationOrder`s that the user has access to in the current tenant.
 *
 * @summary list of all the `ReservationOrder`s that the user has access to in the current tenant.
 * x-ms-original-file: 2022-11-01/GetReservationOrders.json
 */
async function reservationOrderList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.reservationOrder.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationOrderList();
}

main().catch(console.error);
