// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists service health events in the subscription.
 *
 * @summary lists service health events in the subscription.
 * x-ms-original-file: 2025-05-01/Events_ListBySubscriptionId.json
 */
async function listEventsBySubscriptionId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.events.listBySubscriptionId({
    filter: "service eq 'Virtual Machines' or region eq 'West US'",
    queryStartTime: "5/12/2025",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEventsBySubscriptionId();
}

main().catch(console.error);
