// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureFleetClient } = require("@azure/arm-computefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Fleet
 *
 * @summary delete a Fleet
 * x-ms-original-file: 2026-04-01-preview/Fleets_Delete_MaximumSet_Gen.json
 */
async function fleetsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  await client.fleets.delete("rgazurefleet", "testFleet");
}

async function main() {
  await fleetsDeleteMaximumSetGen();
}

main().catch(console.error);
