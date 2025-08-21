// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list all resources of workspaces for Grafana under the specified subscription.
 *
 * @summary list all resources of workspaces for Grafana under the specified subscription.
 * x-ms-original-file: 2024-11-01-preview/Grafana_List.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

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
