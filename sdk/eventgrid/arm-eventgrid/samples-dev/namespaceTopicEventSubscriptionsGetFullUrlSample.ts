// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the full endpoint URL for an event subscription of a namespace topic.
 *
 * @summary Get the full endpoint URL for an event subscription of a namespace topic.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/NamespaceTopicEventSubscriptions_GetFullUrl.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespaceTopicEventSubscriptionsGetFullUrl(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "exampleNamespaceName1";
  const topicName = "exampleDomainTopic1";
  const eventSubscriptionName = "examplesubscription1";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopicEventSubscriptions.getFullUrl(
    resourceGroupName,
    namespaceName,
    topicName,
    eventSubscriptionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespaceTopicEventSubscriptionsGetFullUrl();
}

main().catch(console.error);
