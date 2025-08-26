// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2024-11-01-preview/Grafana_FetchAvailablePlugins.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function grafanaFetchAvailablePlugins(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.fetchAvailablePlugins("myResourceGroup", "myWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await grafanaFetchAvailablePlugins();
}

main().catch(console.error);
