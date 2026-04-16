// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Maintenance
 *
 * @summary get a Maintenance
 * x-ms-original-file: 2025-09-01/Maintenances_Get.json
 */
async function maintenancesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.maintenances.get("group1", "cloud1", "maintenance1");
  console.log(result);
}

async function main() {
  await maintenancesGet();
}

main().catch(console.error);
