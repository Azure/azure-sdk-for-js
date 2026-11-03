// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a nested existing event subscription for a domain topic.
 *
 * @summary delete a nested existing event subscription for a domain topic.
 * x-ms-original-file: 2025-07-15-preview/DomainTopicEventSubscriptions_Delete.json
 */
async function domainTopicEventSubscriptionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.domainTopicEventSubscriptions.delete(
    "examplerg",
    "exampleDomain1",
    "exampleDomainTopic1",
    "examplesubscription1",
  );
}

async function main() {
  await domainTopicEventSubscriptionsDelete();
}

main().catch(console.error);
