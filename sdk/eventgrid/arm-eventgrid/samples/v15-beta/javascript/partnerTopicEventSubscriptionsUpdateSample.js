// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing event subscription of a partner topic.
 *
 * @summary update an existing event subscription of a partner topic.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopicEventSubscriptions_Update.json
 */
async function partnerTopicEventSubscriptionsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerTopicEventSubscriptions.update(
    "examplerg",
    "examplePartnerTopic1",
    "exampleEventSubscriptionName1",
    {
      destination: { endpointType: "WebHook", endpointUrl: "https://requestb.in/15ksip71" },
      filter: {
        isSubjectCaseSensitive: true,
        subjectBeginsWith: "existingPrefix",
        subjectEndsWith: "newSuffix",
      },
      labels: ["label1", "label2"],
    },
  );
  console.log(result);
}

async function main() {
  await partnerTopicEventSubscriptionsUpdate();
}

main().catch(console.error);
