// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to remove a connection from a group.
 *
 * @summary Remove a connection from a group.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const group = serviceClient.group("myGroup");
  await group.removeConnection("connectionId");
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to remove a connection from a group.
 *
 * @summary Remove a connection from a group.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const group = serviceClient.group("myGroup");
  await group.removeConnection("connectionId");
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove a connection from the target group.
 *
 * @summary remove a connection from the target group.
 * x-ms-original-file: 2024-12-01/WebPubSub_RemoveConnectionFromGroup.json
 */
async function removeConnectionFromGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.removeConnectionFromGroup("group1", "connection1");
}

async function main(): Promise<void> {
  await removeConnectionFromGroup();
}

main().catch(console.error);
