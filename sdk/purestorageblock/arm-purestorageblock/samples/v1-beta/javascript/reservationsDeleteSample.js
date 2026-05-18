// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a reservation
 *
 * @summary delete a reservation
 * x-ms-original-file: 2026-01-01-preview/Reservations_Delete_MaximumSet_Gen.json
 */
async function reservationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.reservations.delete("rgpurestorage", "storagepool-01");
}

async function main() {
  await reservationsDelete();
}

main().catch(console.error);
