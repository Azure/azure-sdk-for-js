// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates or updates an event subscription of a partner topic with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @summary asynchronously creates or updates an event subscription of a partner topic with the specified parameters. Existing event subscriptions will be updated with this API.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopicEventSubscriptions_CreateOrUpdate.json
 */
async function partnerTopicEventSubscriptionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerTopicEventSubscriptions.createOrUpdate(
    "examplerg",
    "examplePartnerTopic1",
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

async function main(): Promise<void> {
  await partnerTopicEventSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
