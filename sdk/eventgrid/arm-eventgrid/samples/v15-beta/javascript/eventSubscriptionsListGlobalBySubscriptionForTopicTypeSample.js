// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all global event subscriptions under an Azure subscription for a topic type.
 *
 * @summary list all global event subscriptions under an Azure subscription for a topic type.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_ListGlobalBySubscriptionForTopicType.json
 */
async function eventSubscriptionsListGlobalBySubscriptionForTopicType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventSubscriptions.listGlobalBySubscriptionForTopicType(
    "Microsoft.Resources.Subscriptions",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await eventSubscriptionsListGlobalBySubscriptionForTopicType();
}

main().catch(console.error);
