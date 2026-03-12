// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the Event Hubs in a Namespace.
 *
 * @summary Gets all the Event Hubs in a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2017-04-01/examples/EventHubs/EHEventHubListByNameSpace.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function eventHubsListAll(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "e2f361f0-3b27-4503-a9cc-21cfba380093";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "Default-NotificationHubs-AustraliaEast";
  const namespaceName = "sdk-Namespace-5357";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventHubs.listByNamespace(resourceGroupName, namespaceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await eventHubsListAll();
}

main().catch(console.error);
