// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a hub setting.
 *
 * @summary create or update a hub setting.
 * x-ms-original-file: 2025-12-01-preview/WebPubSubHubs_CreateOrUpdate.json
 */
async function webPubSubHubsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubHubs.createOrUpdate(
    "exampleHub",
    "myResourceGroup",
    "myWebPubSubService",
    {
      properties: {
        eventHandlers: [
          {
            urlTemplate: "http://host.com",
            userEventPattern: "*",
            systemEvents: ["connect", "connected"],
            auth: { type: "ManagedIdentity", managedIdentity: { resource: "abc" } },
            groupPresenceEvents: { eventNames: ["joined", "left"], groupFilters: ["chat*"] },
          },
        ],
        eventListeners: [
          {
            filter: {
              type: "EventName",
              systemEvents: ["connected", "disconnected"],
              userEventPattern: "*",
            },
            endpoint: {
              type: "EventHub",
              fullyQualifiedNamespace: "example.servicebus.windows.net",
              eventHubName: "eventHubName1",
            },
          },
        ],
        anonymousConnectPolicy: "allow",
        webSocketKeepAliveIntervalInSeconds: 50,
        chat: {
          mode: "Enabled",
          persistentStorage: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.SignalRService/WebPubSub/myWebPubSubService/persistentStorages/myStor",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubHubsCreateOrUpdate();
}

main().catch(console.error);
