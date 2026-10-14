// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an exiting resource.
 *
 * @summary operation to update an exiting resource.
 * x-ms-original-file: 2025-12-01-preview/WebPubSub_Update.json
 */
async function webPubSubUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.update("myResourceGroup", "myWebPubSubService", {
    sku: { name: "Premium_P1", tier: "Premium", capacity: 1 },
    tls: { clientCertEnabled: false },
    liveTraceConfiguration: {
      enabled: "false",
      categories: [{ name: "ConnectivityLogs", enabled: "true" }],
    },
    networkACLs: {
      defaultAction: "Deny",
      publicNetwork: { allow: ["ClientConnection"] },
      privateEndpoints: [
        {
          name: "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
          allow: ["ServerConnection"],
        },
      ],
    },
    publicNetworkAccess: "Enabled",
    disableLocalAuth: false,
    disableAadAuth: false,
    socketIO: { serviceMode: "Serverless" },
    kind: "WebPubSub",
    identity: { type: "SystemAssigned" },
    location: "eastus",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await webPubSubUpdate();
}

main().catch(console.error);
