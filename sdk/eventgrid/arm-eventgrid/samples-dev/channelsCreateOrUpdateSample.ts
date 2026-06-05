// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to synchronously creates or updates a new channel with the specified parameters.
 *
 * @summary synchronously creates or updates a new channel with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Channels_CreateOrUpdate.json
 */
async function channelsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.channels.createOrUpdate(
    "examplerg",
    "examplePartnerNamespaceName1",
    "exampleChannelName1",
    {
      channelType: "PartnerTopic",
      expirationTimeIfNotActivatedUtc: new Date("2021-10-21T22:50:25.410433Z"),
      messageForActivation: "Example message to approver",
      partnerTopicInfo: {
        name: "examplePartnerTopic1",
        azureSubscriptionId: "8f6b6269-84f2-4d09-9e31-1127efcd1e40",
        resourceGroupName: "examplerg2",
        source: "ContosoCorp.Accounts.User1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await channelsCreateOrUpdate();
}

main().catch(console.error);
