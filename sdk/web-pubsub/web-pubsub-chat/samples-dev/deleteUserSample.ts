// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a user.
 *
 * @summary delete a user.
 * x-ms-original-file: 2026-02-01-preview/DeleteUser.json
 */
async function deleteUser(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  await client.deleteUser("user1");
}

async function main(): Promise<void> {
  await deleteUser();
}

main().catch(console.error);
