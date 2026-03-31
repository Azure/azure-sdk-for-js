// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to send content inside request body to a group of connections.
 *
 * @summary send content inside request body to a group of connections.
 * x-ms-original-file: 2024-12-01/WebPubSub_SendToGroup.json
 */
async function sendToGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.sendToGroup("group1", Buffer.from("TWVzc2FnZSB0byBzZW5k", "base64"), {
    filter: "startswith(userId, 'listener-')",
    messageTtlSeconds: 15,
  });
}

async function main(): Promise<void> {
  await sendToGroup();
}

main().catch(console.error);
