// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check whether the scopes from request is valid for `Reservation`.
 *
 * @summary check whether the scopes from request is valid for `Reservation`.
 * x-ms-original-file: 2022-11-01/GetAvailableScope.json
 */
async function availableScopes() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservation.availableScopes(
    "276e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    "356e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    { properties: { scopes: ["/subscriptions/efc7c997-7700-4a74-b731-55aec16c15e9"] } },
  );
  console.log(result);
}

async function main() {
  await availableScopes();
}

main().catch(console.error);
