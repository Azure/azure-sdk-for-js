// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all event subscriptions from the given location under a specific Azure subscription.
 *
 * @summary List all event subscriptions from the given location under a specific Azure subscription.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/EventSubscriptions_ListRegionalBySubscription.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function eventSubscriptionsListRegionalBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const location = "westus2";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventSubscriptions.listRegionalBySubscription(
    location,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await eventSubscriptionsListRegionalBySubscription();
}

main().catch(console.error);
