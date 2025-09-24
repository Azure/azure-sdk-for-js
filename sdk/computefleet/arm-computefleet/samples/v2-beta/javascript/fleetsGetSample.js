// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureFleetClient } = require("@azure/arm-computefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Fleet
 *
 * @summary get a Fleet
 * x-ms-original-file: 2025-07-01-preview/Fleets_Get.json
 */
async function fleetsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const result = await client.fleets.get("rgazurefleet", "myFleet");
  console.log(result);
}

async function main() {
  await fleetsGet();
}

main().catch(console.error);
