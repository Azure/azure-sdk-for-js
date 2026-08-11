// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesDailyWithBillingAccountId.json
 */
async function reservationSummariesDailyWithBillingAccountId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.list(
    "providers/Microsoft.Billing/billingAccounts/12345",
    "daily",
    { filter: "properties/usageDate ge 2017-10-01 AND properties/usageDate le 2017-11-20" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesDailyWithBillingProfileId.json
 */
async function reservationSummariesDailyWithBillingProfileId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.list(
    "providers/Microsoft.Billing/billingAccounts/12345:2468/billingProfiles/13579",
    "daily",
    { startDate: "2017-10-01", endDate: "2017-11-20" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesMonthlyWithBillingAccountId.json
 */
async function reservationSummariesMonthlyWithBillingAccountId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.list(
    "providers/Microsoft.Billing/billingAccounts/12345",
    "monthly",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesMonthlyWithBillingProfileId.json
 */
async function reservationSummariesMonthlyWithBillingProfileId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.list(
    "providers/Microsoft.Billing/billingAccounts/12345:2468/billingProfiles/13579",
    "monthly",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 *
 * @summary lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges.
 * x-ms-original-file: 2024-08-01/ReservationSummariesMonthlyWithBillingProfileIdReservationId.json
 */
async function reservationSummariesMonthlyWithBillingProfileIdReservationId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsSummaries.list(
    "providers/Microsoft.Billing/billingAccounts/12345:2468/billingProfiles/13579",
    "monthly",
    {
      reservationId: "1c6b6358-709f-484c-85f1-72e862a0cf3b",
      reservationOrderId: "9f39ba10-794f-4dcb-8f4b-8d0cb47c27dc",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationSummariesDailyWithBillingAccountId();
  await reservationSummariesDailyWithBillingProfileId();
  await reservationSummariesMonthlyWithBillingAccountId();
  await reservationSummariesMonthlyWithBillingProfileId();
  await reservationSummariesMonthlyWithBillingProfileIdReservationId();
}

main().catch(console.error);
