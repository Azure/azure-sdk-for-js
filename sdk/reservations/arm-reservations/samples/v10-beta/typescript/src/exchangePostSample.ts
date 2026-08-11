// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns one or more `Reservations` in exchange for one or more `Reservation` purchases.
 *
 * @summary returns one or more `Reservations` in exchange for one or more `Reservation` purchases.
 * x-ms-original-file: 2022-11-01/Exchange.json
 */
async function exchange(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.exchange.post({
    properties: { sessionId: "66e2ac8f-439e-4345-8235-6fef07608081" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exchange();
}

main().catch(console.error);
