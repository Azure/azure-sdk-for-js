// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to query messages in a conversation from latest to earliest.
 *
 * @summary query messages in a conversation from latest to earliest.
 * x-ms-original-file: 2026-02-01-preview/ListMessages.json
 */
async function listMessages() {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const resArray = new Array();
  for await (const item of client.listMessages("c.room1.abcd1234", { maxPageSize: 10 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMessages();
}

main().catch(console.error);
