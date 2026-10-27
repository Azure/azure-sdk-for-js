// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to query roles in a hub.
 *
 * @summary query roles in a hub.
 * x-ms-original-file: 2026-02-01-preview/ListRoles.json
 */
async function listRoles() {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const resArray = new Array();
  for await (const item of client.listRoles({ maxPageSize: 10 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRoles();
}

main().catch(console.error);
