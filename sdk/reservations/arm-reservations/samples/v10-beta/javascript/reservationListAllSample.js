// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the reservations and the roll up counts of reservations group by provisioning states that the user has access to in the current tenant.
 *
 * @summary list the reservations and the roll up counts of reservations group by provisioning states that the user has access to in the current tenant.
 * x-ms-original-file: 2022-11-01/GetReservations.json
 */
async function reservationListAll() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.reservation.listAll({
    filter: "(properties%2farchived+eq+false)",
    orderby: "properties/displayName asc",
    skiptoken: 50,
    take: 1,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await reservationListAll();
}

main().catch(console.error);
