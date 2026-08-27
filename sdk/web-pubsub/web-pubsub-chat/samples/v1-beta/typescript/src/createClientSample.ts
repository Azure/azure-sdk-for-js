// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to create a WebPubSubChatServiceClient
 * using a connection string or using TokenCredential (DefaultAzureCredential).
 *
 * @summary create a chat service client.
 */
async function createClientWithConnectionString(): Promise<void> {
  const connectionString = process.env.WPS_CHAT_CONNECTION_STRING || "";
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(connectionString, hub);
  // Verify the client works by listing roles
  for await (const role of client.listRoles()) {
    console.log(`Role: ${role.name}`);
  }
}

async function createClientWithTokenCredential(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
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
