// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2026-06-01/ReservationSummariesDaily.json
 */
async function reservationSummariesDaily() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.listByReservationOrder(
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
 * x-ms-original-file: 2026-06-01/ReservationSummariesMonthly.json
 */
async function reservationSummariesMonthly() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.listByReservationOrder(
    "00000000-0000-0000-0000-000000000000",
    "monthly",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationSummariesDaily();
  await reservationSummariesMonthly();
}

main().catch(console.error);
