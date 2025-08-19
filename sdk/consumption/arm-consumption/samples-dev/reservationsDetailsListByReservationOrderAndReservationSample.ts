// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the reservations details for provided date range.
 *
 * @summary Lists the reservations details for provided date range.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ReservationDetailsWithReservationId.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reservationDetailsWithReservationId(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const reservationOrderId = "00000000-0000-0000-0000-000000000000";
  const reservationId = "00000000-0000-0000-0000-000000000000";
  const filter = "properties/usageDate ge 2017-10-01 AND properties/usageDate le 2017-12-05";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservationsDetails.listByReservationOrderAndReservation(
    reservationOrderId,
    reservationId,
    filter,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationDetailsWithReservationId();
}

main().catch(console.error);
