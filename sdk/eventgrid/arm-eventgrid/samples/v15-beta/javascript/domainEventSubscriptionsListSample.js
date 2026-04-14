// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all event subscriptions that have been created for a specific topic.
 *
 * @summary list all event subscriptions that have been created for a specific topic.
 * x-ms-original-file: 2025-07-15-preview/DomainEventSubscriptions_List.json
 */
async function domainEventSubscriptionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domainEventSubscriptions.list("examplerg", "exampleDomain1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await domainEventSubscriptionsList();
}

main().catch(console.error);
