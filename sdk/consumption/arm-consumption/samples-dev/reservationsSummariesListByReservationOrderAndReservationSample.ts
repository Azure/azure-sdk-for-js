// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesDailyWithReservationId.json
 */
async function reservationSummariesDailyWithReservationId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.listByReservationOrderAndReservation(
    "00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000000",
    "daily",
    { filter: "properties/usageDate ge 2017-10-01 AND properties/usageDate le 2017-11-20" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesMonthlyWithReservationId.json
 */
async function reservationSummariesMonthlyWithReservationId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.listByReservationOrderAndReservation(
    "00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000000",
    "monthly",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationSummariesDailyWithReservationId();
  await reservationSummariesMonthlyWithReservationId();
}

main().catch(console.error);
