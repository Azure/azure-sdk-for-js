// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Synchronously creates or updates a new channel with the specified parameters.
 *
 * @summary Synchronously creates or updates a new channel with the specified parameters.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/Channels_CreateOrUpdate.json
 */

import { Channel, EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function channelsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerNamespaceName = "examplePartnerNamespaceName1";
  const channelName = "exampleChannelName1";
  const channelInfo: Channel = {
    channelType: "PartnerTopic",
    expirationTimeIfNotActivatedUtc: new Date("2021-10-21T22:50:25.410433Z"),
    messageForActivation: "Example message to approver",
    partnerTopicInfo: {
      name: "examplePartnerTopic1",
      azureSubscriptionId: "8f6b6269-84f2-4d09-9e31-1127efcd1e40",
      resourceGroupName: "examplerg2",
      source: "ContosoCorp.Accounts.User1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.channels.createOrUpdate(
    resourceGroupName,
    partnerNamespaceName,
    channelName,
    channelInfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await channelsCreateOrUpdate();
}

main().catch(console.error);
