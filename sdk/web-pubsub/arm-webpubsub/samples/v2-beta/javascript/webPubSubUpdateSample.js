// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an exiting resource.
 *
 * @summary operation to update an exiting resource.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_Update.json
 */
async function webPubSubUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.update("myResourceGroup", "myWebPubSubService", {
    identity: { type: "SystemAssigned" },
    kind: "WebPubSub",
    location: "eastus",
    disableAadAuth: false,
    disableLocalAuth: false,
    liveTraceConfiguration: {
      categories: [{ name: "ConnectivityLogs", enabled: "true" }],
      enabled: "false",
    },
    networkACLs: {
      defaultAction: "Deny",
      privateEndpoints: [
        {
          name: "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
          allow: ["ServerConnection"],
        },
      ],
      publicNetwork: { allow: ["ClientConnection"] },
    },
    publicNetworkAccess: "Enabled",
    socketIO: { serviceMode: "Serverless" },
    tls: { clientCertEnabled: false },
    sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await webPubSubUpdate();
}

main().catch(console.error);
