// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a role.
 *
 * @summary delete a role.
 * x-ms-original-file: 2026-02-01-preview/DeleteRole.json
 */
async function deleteRole(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  await client.deleteRole("room.moderator");
}

async function main(): Promise<void> {
  await deleteRole();
}

main().catch(console.error);
