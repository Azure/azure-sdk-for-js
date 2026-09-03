// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all aggregated global event subscriptions under a specific Azure subscription.
 *
 * @summary list all aggregated global event subscriptions under a specific Azure subscription.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_ListGlobalBySubscription.json
 */
async function eventSubscriptionsListGlobalBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventSubscriptions.listGlobalBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await eventSubscriptionsListGlobalBySubscription();
}

main().catch(console.error);
