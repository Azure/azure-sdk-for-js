// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of the `ReservationOrder`.
 *
 * @summary get the details of the `ReservationOrder`.
 * x-ms-original-file: 2022-11-01/GetReservationOrderDetails.json
 */
async function getReservationOrder() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.get("a075419f-44cc-497f-b68a-14ee811d48b9");
  console.log(result);
}

/**
 * This sample demonstrates how to get the details of the `ReservationOrder`.
 *
 * @summary get the details of the `ReservationOrder`.
 * x-ms-original-file: 2022-11-01/GetReservationOrderDetailsWithExpandPlanInformation.json
 */
async function getReservationWithExpandPayments() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.get("a075419f-44cc-497f-b68a-14ee811d48b9", {
    expand: "schedule",
  });
  console.log(result);
}

async function main() {
  await getReservationOrder();
  await getReservationWithExpandPayments();
}

main().catch(console.error);
