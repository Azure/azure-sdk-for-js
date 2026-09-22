// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of all the revisions for the `Reservation`.
 *
 * @summary list of all the revisions for the `Reservation`.
 * x-ms-original-file: 2022-11-01/GetReservationRevisions.json
 */
async function reservationRevisions() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.reservation.listRevisions(
    "276e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    "6ef59113-3482-40da-8d79-787f823e34bc",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationRevisions();
}

main().catch(console.error);
