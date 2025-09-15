// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a workspace for Grafana resource.
 *
 * @summary delete a workspace for Grafana resource.
 * x-ms-original-file: 2024-11-01-preview/Grafana_Delete.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function grafanaDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.grafana.delete("myResourceGroup", "myWorkspace");
}

async function main(): Promise<void> {
  await grafanaDelete();
}

main().catch(console.error);
