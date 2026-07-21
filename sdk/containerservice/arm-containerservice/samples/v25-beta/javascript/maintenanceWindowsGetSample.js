// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified maintenance window.
 *
 * @summary gets the specified maintenance window.
 * x-ms-original-file: 2026-04-02-preview/MaintenanceWindowsGet.json
 */
async function getMaintenanceWindow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceWindows.get("rg-maintenance", "production-weekends");
  console.log(result);
}

async function main() {
  await getMaintenanceWindow();
}

main().catch(console.error);
