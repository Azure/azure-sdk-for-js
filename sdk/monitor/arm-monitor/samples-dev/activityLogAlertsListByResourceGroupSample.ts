// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all Activity Log Alert rules in a resource group.
 *
 * @summary get a list of all Activity Log Alert rules in a resource group.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_ListByResourceGroupName.json
 */
async function listActivityLogAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activityLogAlerts.listByResourceGroup("MyResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listActivityLogAlerts();
}

main().catch(console.error);
