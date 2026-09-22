// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get specific `Reservation` details.
 *
 * @summary get specific `Reservation` details.
 * x-ms-original-file: 2022-11-01/GetReservationDetails.json
 */
async function getReservation() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservation.get(
    "276e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    "6ef59113-3482-40da-8d79-787f823e34bc",
    { expand: "renewProperties" },
  );
  console.log(result);
}

async function main() {
  await getReservation();
}

main().catch(console.error);
