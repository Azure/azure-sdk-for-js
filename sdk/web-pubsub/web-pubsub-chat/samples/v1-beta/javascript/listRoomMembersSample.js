// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get room members.
 *
 * @summary get room members.
 * x-ms-original-file: 2026-02-01-preview/ListRoomMembers.json
 */
async function listRoomMembers() {
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

async function main() {
  await listRoomMembers();
}

main().catch(console.error);
