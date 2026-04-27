// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all event subscriptions that have been created for a specific domain topic.
 *
 * @summary list all event subscriptions that have been created for a specific domain topic.
 * x-ms-original-file: 2025-07-15-preview/EventSubscriptions_ListByDomainTopic.json
 */
async function eventSubscriptionsListByDomainTopic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventSubscriptions.listByDomainTopic(
    "examplerg",
    "domain1",
    "topic1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await eventSubscriptionsListByDomainTopic();
}

main().catch(console.error);
