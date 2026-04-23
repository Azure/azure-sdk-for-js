// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing event subscription of a partner topic.
 *
 * @summary delete an existing event subscription of a partner topic.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopicEventSubscriptions_Delete.json
 */
async function partnerTopicEventSubscriptionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.partnerTopicEventSubscriptions.delete(
    "examplerg",
    "examplePartnerTopic1",
    "examplesubscription1",
  );
}

async function main() {
  await partnerTopicEventSubscriptionsDelete();
}

main().catch(console.error);
