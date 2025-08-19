// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a nested existing event subscription for a domain topic.
 *
 * @summary Delete a nested existing event subscription for a domain topic.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/DomainTopicEventSubscriptions_Delete.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function domainTopicEventSubscriptionsDelete(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const domainName = "exampleDomain1";
  const topicName = "exampleDomainTopic1";
  const eventSubscriptionName = "examplesubscription1";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainTopicEventSubscriptions.beginDeleteAndWait(
    resourceGroupName,
    domainName,
    topicName,
    eventSubscriptionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await domainTopicEventSubscriptionsDelete();
}

main().catch(console.error);
