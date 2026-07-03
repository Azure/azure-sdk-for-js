// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a WebPubSubChatServiceClient
 * using a connection string or using TokenCredential (DefaultAzureCredential).
 *
 * @summary create a chat service client.
 */
async function createClientWithConnectionString(): Promise<void> {
  const connectionString = "<connectionString>";
  const hub = "chat-hub";
  const client = new WebPubSubChatServiceClient(connectionString, hub);
  // Verify the client works by listing roles
  for await (const role of client.listRoles()) {
    console.log(`Role: ${role.name}`);
  }
}

async function createClientWithTokenCredential(): Promise<void> {
  const endpoint = "<endpoint>";
  const credential = new DefaultAzureCredential();
  const hub = "chat-hub";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  // Verify the client works by listing roles
  for await (const role of client.listRoles()) {
    console.log(`Role: ${role.name}`);
  }
}

async function main(): Promise<void> {
  await createClientWithConnectionString();
  await createClientWithTokenCredential();
}

main().catch(console.error);
