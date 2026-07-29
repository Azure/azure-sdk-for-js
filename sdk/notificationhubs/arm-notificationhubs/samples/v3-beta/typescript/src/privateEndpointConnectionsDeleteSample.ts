// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the Private Endpoint Connection.
 * This is a public API that can be called directly by Notification Hubs users.
 *
 * @summary deletes the Private Endpoint Connection.
 * This is a public API that can be called directly by Notification Hubs users.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/PrivateEndpointConnectionDelete.json
 */
async function privateEndpointConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-ns.1fa229cd-bf3f-47f0-8c49-afb36723997e",
  );
}

async function main(): Promise<void> {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
