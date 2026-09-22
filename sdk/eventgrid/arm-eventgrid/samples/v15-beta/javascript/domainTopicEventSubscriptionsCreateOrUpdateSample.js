// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously creates a new event subscription or updates an existing event subscription.
 *
 * @summary asynchronously creates a new event subscription or updates an existing event subscription.
 * x-ms-original-file: 2025-07-15-preview/DomainTopicEventSubscriptions_CreateOrUpdate.json
 */
async function domainTopicEventSubscriptionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainTopicEventSubscriptions.createOrUpdate(
    "examplerg",
    "exampleDomain1",
    "exampleDomainTopic1",
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
  await domainTopicEventSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
