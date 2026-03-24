// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to send content inside request body to the specific user.
 *
 * @summary send content inside request body to the specific user.
 * x-ms-original-file: 2024-12-01/WebPubSub_SendToUser.json
 */
async function sendToUser(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.sendToUser("user1", Buffer.from("TWVzc2FnZSB0byBzZW5k", "base64"), {
    filter: "startswith(userId, 'listener-')",
    messageTtlSeconds: 15,
  });
}

async function main(): Promise<void> {
  await sendToUser();
}

main().catch(console.error);
