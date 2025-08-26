// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or replace an existing notification channel.
 *
 * @summary Create or replace an existing notification channel.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/NotificationChannels_CreateOrUpdate.json
 */

import type { NotificationChannel } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function notificationChannelsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{notificationChannelName}";
  const notificationChannel: NotificationChannel = {
    description: "Integration configured for auto-shutdown",
    emailRecipient: "{email}",
    events: [{ eventName: "AutoShutdown" }],
    notificationLocale: "en",
    webHookUrl: "{webhookUrl}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.notificationChannels.createOrUpdate(
    resourceGroupName,
    labName,
    name,
    notificationChannel,
  );
  console.log(result);
}

notificationChannelsCreateOrUpdate().catch(console.error);
