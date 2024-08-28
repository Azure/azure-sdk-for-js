// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { AzureFleetClient } = require("@azure/arm-computefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Fleet
 *
 * @summary delete a Fleet
 * x-ms-original-file: 2024-05-01-preview/Fleets_Delete.json
 */
async function fleetsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const result = await client.fleets.delete("rgazurefleet", "testFleet");
  console.log(result);
}

async function main() {
  fleetsDelete();
}

main().catch(console.error);
