// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a maintenance window.
 *
 * @summary updates tags on a maintenance window.
 * x-ms-original-file: 2026-04-02-preview/MaintenanceWindowsUpdateTags.json
 */
async function updateMaintenanceWindowTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceWindows.updateTags(
    "rg-maintenance",
    "production-weekends",
    { tags: { environment: "production", team: "aks-platform" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateMaintenanceWindowTags();
}

main().catch(console.error);
