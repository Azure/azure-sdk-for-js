// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to list connections in a group.
 *
 * @summary List connections in a group.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const group = serviceClient.group("myGroup");
  const connections = await group.listConnections({ maxPageSize: 50 });

  for await (const connection of connections) {
    console.log(`Connection: ${connection.connectionId}, User: ${connection.userId}`);
  }
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to list connections in a group.
 *
 * @summary List connections in a group.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const group = serviceClient.group("myGroup");
  const connections = await group.listConnections({ maxPageSize: 50 });

  for await (const connection of connections) {
    console.log(`Connection: ${connection.connectionId}, User: ${connection.userId}`);
  }
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list connections in a group.
 *
 * @summary list connections in a group.
 * x-ms-original-file: 2024-12-01/WebPubSub_ListConnectionsInGroup.json
 */
async function listConnectionsInGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  const resArray = new Array();
  for await (const item of client.listConnectionsInGroup("group1", {
    maxpagesize: 200,
    top: 1000,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectionsInGroup();
}

main().catch(console.error);
