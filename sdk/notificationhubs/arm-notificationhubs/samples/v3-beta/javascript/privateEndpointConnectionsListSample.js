// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all Private Endpoint Connections that belong to the given Notification Hubs namespace.
 * This is a public API that can be called directly by Notification Hubs users.
 *
 * @summary returns all Private Endpoint Connections that belong to the given Notification Hubs namespace.
 * This is a public API that can be called directly by Notification Hubs users.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/PrivateEndpointConnectionList.json
 */
async function privateEndpointConnectionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("5ktrial", "nh-sdk-ns")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
