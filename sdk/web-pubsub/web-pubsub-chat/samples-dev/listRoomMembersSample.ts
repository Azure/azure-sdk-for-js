// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get room members.
 *
 * @summary get room members.
 * x-ms-original-file: 2026-02-01-preview/ListRoomMembers.json
 */
async function listRoomMembers(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const resArray = new Array();
  for await (const item of client.listRoomMembers("room1", { maxPageSize: 10 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoomMembers();
}

main().catch(console.error);
