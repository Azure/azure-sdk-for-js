// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiate maintenance readiness checks
 *
 * @summary initiate maintenance readiness checks
 * x-ms-original-file: 2025-09-01/Maintenances_InitiateChecks.json
 */
async function maintenancesInitiateChecks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.maintenances.initiateChecks("group1", "cloud1", "maintenance1");
  console.log(result);
}

async function main() {
  await maintenancesInitiateChecks();
}

main().catch(console.error);
