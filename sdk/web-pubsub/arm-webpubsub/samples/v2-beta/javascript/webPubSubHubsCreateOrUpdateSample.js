// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a hub setting.
 *
 * @summary create or update a hub setting.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_CreateOrUpdate.json
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
        anonymousConnectPolicy: "allow",
        eventHandlers: [
          {
            auth: { type: "ManagedIdentity", managedIdentity: { resource: "abc" } },
            systemEvents: ["connect", "connected"],
            urlTemplate: "http://host.com",
            userEventPattern: "*",
            groupPresenceEvents: {
              eventNames: ["joined", "left"],
              groupFilters: ["group1", "group2*"],
            },
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
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubHubsCreateOrUpdate();
}

main().catch(console.error);
