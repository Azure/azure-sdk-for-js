// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an event subscription.
 *
 * @summary get an event subscription.
 * x-ms-original-file: 2025-07-15-preview/SystemTopicEventSubscriptions_Get.json
 */
async function systemTopicEventSubscriptionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.systemTopicEventSubscriptions.get(
    "examplerg",
    "exampleSystemTopic1",
    "examplesubscription1",
  );
  console.log(result);
}

async function main() {
  await systemTopicEventSubscriptionsGet();
}

main().catch(console.error);
