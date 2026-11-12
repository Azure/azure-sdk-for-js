// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator.
 *
 * @summary get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator.
 * x-ms-original-file: 2026-02-01-preview/GetUser.json
 */
async function getUser(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.getUser("user1");
  console.log(result);
}

async function main(): Promise<void> {
  await getUser();
}

main().catch(console.error);
