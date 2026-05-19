// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides various statistics about resources billed via given reservation.
 *
 * @summary provides various statistics about resources billed via given reservation.
 * x-ms-original-file: 2026-01-01-preview/Reservations_GetBillingStatus_MaximumSet_Gen.json
 */
async function reservationsGetBillingStatusMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.getBillingStatus("rgpurestorage", "reservationname");
  console.log(result);
}

async function main() {
  await reservationsGetBillingStatusMaximumSet();
}

main().catch(console.error);
