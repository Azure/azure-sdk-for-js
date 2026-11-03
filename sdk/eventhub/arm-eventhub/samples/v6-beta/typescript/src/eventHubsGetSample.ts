// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Event Hubs description for the specified Event Hub.
 *
 * @summary gets an Event Hubs description for the specified Event Hub.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubGet.json
 */
async function eventHubGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e2f361f0-3b27-4503-a9cc-21cfba380093";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.get(
    "Default-NotificationHubs-AustraliaEast",
    "sdk-Namespace-716",
    "sdk-EventHub-10",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await eventHubGet();
}

main().catch(console.error);
