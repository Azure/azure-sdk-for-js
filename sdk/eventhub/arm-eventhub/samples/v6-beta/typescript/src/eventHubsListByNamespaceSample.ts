// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the Event Hubs in a Namespace.
 *
 * @summary gets all the Event Hubs in a Namespace.
 * x-ms-original-file: 2026-01-01/EventHubs/EHEventHubListByNameSpace.json
 */
async function eventHubsListAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e2f361f0-3b27-4503-a9cc-21cfba380093";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventHubs.listByNamespace(
    "Default-NotificationHubs-AustraliaEast",
    "sdk-Namespace-5357",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await eventHubsListAll();
}

main().catch(console.error);
