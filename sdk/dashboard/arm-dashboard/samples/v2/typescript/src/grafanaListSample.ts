// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all resources of workspaces for Grafana under the specified subscription.
 *
 * @summary list all resources of workspaces for Grafana under the specified subscription.
 * x-ms-original-file: 2025-08-01/Grafana_List.json
 */
async function grafanaList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.grafana.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await grafanaList();
}

main().catch(console.error);
