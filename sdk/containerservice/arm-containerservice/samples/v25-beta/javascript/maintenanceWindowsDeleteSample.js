// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a maintenance window.
 *
 * @summary deletes a maintenance window.
 * x-ms-original-file: 2026-04-02-preview/MaintenanceWindowsDelete.json
 */
async function deleteMaintenanceWindow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.maintenanceWindows.delete("rg-maintenance", "production-weekends");
}

async function main() {
  await deleteMaintenanceWindow();
}

main().catch(console.error);
