// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a reservation
 *
 * @summary get a reservation
 * x-ms-original-file: 2026-01-01-preview/Reservations_Get_MaximumSet_Gen.json
 */
async function reservationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.get("rgpurestorage", "storagepool-01");
  console.log(result);
}

async function main() {
  await reservationsGet();
}

main().catch(console.error);
