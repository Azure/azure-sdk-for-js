// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the full endpoint URL of a partner destination channel.
 *
 * @summary Get the full endpoint URL of a partner destination channel.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/Channels_GetFullUrl.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function channelsGetFullUrl(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerNamespaceName = "examplenamespace";
  const channelName = "examplechannel";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.channels.getFullUrl(
    resourceGroupName,
    partnerNamespaceName,
    channelName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await channelsGetFullUrl();
}

main().catch(console.error);
