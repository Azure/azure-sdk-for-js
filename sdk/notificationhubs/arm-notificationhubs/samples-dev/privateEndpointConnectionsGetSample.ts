// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a Private Endpoint Connection with a given name.
 * This is a public API that can be called directly by Notification Hubs users.
 *
 * @summary returns a Private Endpoint Connection with a given name.
 * This is a public API that can be called directly by Notification Hubs users.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/PrivateEndpointConnectionGet.json
 */
async function privateEndpointConnectionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-ns.1fa229cd-bf3f-47f0-8c49-afb36723997e",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
