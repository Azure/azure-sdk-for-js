// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all action groups in a subscription.
 *
 * @summary get a list of all action groups in a subscription.
 * x-ms-original-file: 2024-10-01-preview/listActionGroups.json
 */
async function listActionGroupsAtSubscriptionLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.actionGroups.listBySubscriptionId()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listActionGroupsAtSubscriptionLevel();
}

main().catch(console.error);
