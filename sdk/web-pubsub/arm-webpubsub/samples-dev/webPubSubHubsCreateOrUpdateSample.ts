// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubHub } from "@azure/arm-webpubsub";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a hub setting.
 *
 * @summary Create or update a hub setting.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubHubs_CreateOrUpdate.json
 */
async function webPubSubHubsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const hubName = "exampleHub";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const parameters: WebPubSubHub = {
    properties: {
      anonymousConnectPolicy: "allow",
      eventHandlers: [
        {
          auth: {
            type: "ManagedIdentity",
            managedIdentity: { resource: "abc" },
          },
          systemEvents: ["connect", "connected"],
          urlTemplate: "http://host.com",
          userEventPattern: "*",
        },
      ],
      eventListeners: [
        {
          endpoint: {
            type: "EventHub",
            eventHubName: "eventHubName1",
            fullyQualifiedNamespace: "example.servicebus.windows.net",
          },
          filter: {
            type: "EventName",
            systemEvents: ["connected", "disconnected"],
            userEventPattern: "*",
          },
        },
      ],
      webSocketKeepAliveIntervalInSeconds: 50,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubHubs.beginCreateOrUpdateAndWait(
    hubName,
    resourceGroupName,
    resourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubHubsCreateOrUpdate();
}

main().catch(console.error);
