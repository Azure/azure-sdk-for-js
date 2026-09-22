// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to synchronously updates a channel with the specified parameters.
 *
 * @summary synchronously updates a channel with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Channels_Update.json
 */
async function channelsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.channels.update("examplerg", "examplePartnerNamespaceName1", "exampleChannelName1", {
    expirationTimeIfNotActivatedUtc: new Date("2022-03-23T23:06:11.785Z"),
  });
}

async function main(): Promise<void> {
  await channelsUpdate();
}

main().catch(console.error);
