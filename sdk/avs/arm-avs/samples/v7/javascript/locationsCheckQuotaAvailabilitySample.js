// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return quota for subscription by region
 *
 * @summary return quota for subscription by region
 * x-ms-original-file: 2024-09-01/Locations_CheckQuotaAvailability.json
 */
async function locationsCheckQuotaAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.locations.checkQuotaAvailability("eastus");
  console.log(result);
}

async function main() {
  await locationsCheckQuotaAvailability();
}

main().catch(console.error);
