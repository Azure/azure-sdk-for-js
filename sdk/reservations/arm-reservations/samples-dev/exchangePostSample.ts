// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns one or more `Reservations` in exchange for one or more `Reservation` purchases.

 *
 * @summary Returns one or more `Reservations` in exchange for one or more `Reservation` purchases.

 * x-ms-original-file: specification/reservations/resource-manager/Microsoft.Capacity/stable/2022-11-01/examples/Exchange.json
 */

import type { ExchangeRequest } from "@azure/arm-reservations";
import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exchange(): Promise<void> {
  const body: ExchangeRequest = {
    properties: { sessionId: "66e2ac8f-439e-4345-8235-6fef07608081" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.exchange.beginPostAndWait(body);
  console.log(result);
}

async function main(): Promise<void> {
  await exchange();
}

main().catch(console.error);
