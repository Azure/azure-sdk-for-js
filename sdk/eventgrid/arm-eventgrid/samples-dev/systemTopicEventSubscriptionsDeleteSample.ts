// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an existing event subscription of a system topic.
 *
 * @summary Delete an existing event subscription of a system topic.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/SystemTopicEventSubscriptions_Delete.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function systemTopicEventSubscriptionsDelete(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const systemTopicName = "exampleSystemTopic1";
  const eventSubscriptionName = "examplesubscription1";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.systemTopicEventSubscriptions.beginDeleteAndWait(
    resourceGroupName,
    systemTopicName,
    eventSubscriptionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await systemTopicEventSubscriptionsDelete();
}

main().catch(console.error);
