// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all global event subscriptions under a specific Azure subscription and resource group.
 *
 * @summary list all global event subscriptions under a specific Azure subscription and resource group.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_ListGlobalByResourceGroup.json
 */
async function eventSubscriptionsListGlobalByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventSubscriptions.listGlobalByResourceGroup("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await eventSubscriptionsListGlobalByResourceGroup();
}

main().catch(console.error);
