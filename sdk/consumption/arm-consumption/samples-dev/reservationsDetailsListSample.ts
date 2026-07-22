// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs.
 *
 * @summary lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs.
 * x-ms-original-file: 2024-08-01/ReservationDetailsByBillingAccountId.json
 */
async function reservationDetailsByBillingAccountId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsDetails.list(
    "providers/Microsoft.Billing/billingAccounts/12345",
    { filter: "properties/usageDate ge 2017-10-01 AND properties/usageDate le 2017-12-05" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs.
 *
 * @summary lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs.
 * x-ms-original-file: 2024-08-01/ReservationDetailsByBillingProfileId.json
 */
async function reservationDetailsByBillingProfileId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsDetails.list(
    "providers/Microsoft.Billing/billingAccounts/12345:2468/billingProfiles/13579",
    { startDate: "2019-09-01", endDate: "2019-10-31" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs.
 *
 * @summary lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs.
 * x-ms-original-file: 2024-08-01/ReservationDetailsByBillingProfileIdReservationId.json
 */
async function reservationDetailsByBillingProfileIdReservationId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.reservationsDetails.list(
    "providers/Microsoft.Billing/billingAccounts/12345:2468/billingProfiles/13579",
    {
      startDate: "2019-09-01",
      endDate: "2019-10-31",
      reservationId: "1c6b6358-709f-484c-85f1-72e862a0cf3b",
      reservationOrderId: "9f39ba10-794f-4dcb-8f4b-8d0cb47c27dc",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationDetailsByBillingAccountId();
  await reservationDetailsByBillingProfileId();
  await reservationDetailsByBillingProfileIdReservationId();
}

main().catch(console.error);
