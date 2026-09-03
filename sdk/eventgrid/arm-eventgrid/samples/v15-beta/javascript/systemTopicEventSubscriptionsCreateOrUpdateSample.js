// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously creates or updates an event subscription with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @summary asynchronously creates or updates an event subscription with the specified parameters. Existing event subscriptions will be updated with this API.
 * x-ms-original-file: 2025-07-15-preview/SystemTopicEventSubscriptions_CreateOrUpdate.json
 */
async function systemTopicEventSubscriptionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.systemTopicEventSubscriptions.createOrUpdate(
    "examplerg",
    "exampleSystemTopic1",
    "exampleEventSubscriptionName1",
    {
      destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
      filter: {
        isSubjectCaseSensitive: false,
        subjectBeginsWith: "ExamplePrefix",
        subjectEndsWith: "ExampleSuffix",
      },
    },
  );
  console.log(result);
}

async function main() {
  await systemTopicEventSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
