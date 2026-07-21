// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an exiting resource.
 *
 * @summary operation to update an exiting resource.
 * x-ms-original-file: 2025-01-01-preview/SignalR_Update.json
 */
async function signalRUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalR.update("myResourceGroup", "mySignalRService", {
    identity: { type: "SystemAssigned" },
    kind: "SignalR",
    location: "eastus",
    cors: { allowedOrigins: ["https://foo.com", "https://bar.com"] },
    disableAadAuth: false,
    disableLocalAuth: false,
    features: [
      { flag: "ServiceMode", properties: {}, value: "Serverless" },
      { flag: "EnableConnectivityLogs", properties: {}, value: "True" },
      { flag: "EnableMessagingLogs", properties: {}, value: "False" },
      { flag: "EnableLiveTrace", properties: {}, value: "False" },
    ],
    liveTraceConfiguration: {
      categories: [{ name: "ConnectivityLogs", enabled: "true" }],
      enabled: "false",
    },
    networkACLs: {
      defaultAction: "Deny",
      privateEndpoints: [
        {
          name: "mysignalrservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
          allow: ["ServerConnection"],
        },
      ],
      publicNetwork: { allow: ["ClientConnection"] },
    },
    publicNetworkAccess: "Enabled",
    serverless: { connectionTimeoutInSeconds: 5, keepAliveIntervalInSeconds: 5 },
    tls: { clientCertEnabled: false },
    upstream: {
      templates: [
        {
          auth: { type: "ManagedIdentity", managedIdentity: { resource: "api://example" } },
          categoryPattern: "*",
          eventPattern: "connect,disconnect",
          hubPattern: "*",
          urlTemplate: "https://example.com/chat/api/connect",
        },
      ],
    },
    sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await signalRUpdate();
}

main().catch(console.error);
