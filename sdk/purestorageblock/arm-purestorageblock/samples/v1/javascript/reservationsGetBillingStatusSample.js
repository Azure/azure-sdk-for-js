// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides various statistics about resources billed via given reservation.
 *
 * @summary provides various statistics about resources billed via given reservation.
 * x-ms-original-file: 2024-11-01/Reservations_GetBillingStatus_MaximumSet_Gen.json
 */
async function reservationsGetBillingStatusMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.getBillingStatus("rgpurestorage", "reservationname");
  console.log(result);
}

async function main() {
  await reservationsGetBillingStatusMaximumSet();
}

main().catch(console.error);
