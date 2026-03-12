// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an existing event subscription for a topic.
 *
 * @summary Update an existing event subscription for a topic.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/DomainEventSubscriptions_Update.json
 */

import {
  EventSubscriptionUpdateParameters,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function domainEventSubscriptionsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const domainName = "exampleDomain1";
  const eventSubscriptionName = "exampleEventSubscriptionName1";
  const eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters = {
    destination: {
      endpointType: "WebHook",
      endpointUrl: "https://requestb.in/15ksip71",
    },
    filter: {
      isSubjectCaseSensitive: true,
      subjectBeginsWith: "existingPrefix",
      subjectEndsWith: "newSuffix",
    },
    labels: ["label1", "label2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainEventSubscriptions.beginUpdateAndWait(
    resourceGroupName,
    domainName,
    eventSubscriptionName,
    eventSubscriptionUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await domainEventSubscriptionsUpdate();
}

main().catch(console.error);
