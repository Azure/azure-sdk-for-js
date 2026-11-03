// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to links an Azure Notification Hub to this communication service.
 *
 * @summary links an Azure Notification Hub to this communication service.
 * x-ms-original-file: 2026-03-18/communicationServices/linkNotificationHub.json
 */
async function linkNotificationHub(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.linkNotificationHub(
    "MyResourceGroup",
    "MyCommunicationResource",
    {
      linkNotificationHubParameters: {
        connectionString:
          "Endpoint=sb://MyNamespace.servicebus.windows.net/;SharedAccessKey=abcd1234",
        resourceId:
          "/subscriptions/11112222-3333-4444-5555-666677778888/resourceGroups/MyOtherResourceGroup/providers/Microsoft.NotificationHubs/namespaces/MyNamespace/notificationHubs/MyHub",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linkNotificationHub();
}

main().catch(console.error);
