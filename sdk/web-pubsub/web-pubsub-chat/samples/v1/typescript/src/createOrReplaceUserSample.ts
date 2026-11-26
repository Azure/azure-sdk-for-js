// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or replace a user.
 *
 * @summary create or replace a user.
 */
async function createOrReplaceUser(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.createOrReplaceUser("user1", {
    kind: "Human",
    nickname: "John",
    roleName: "user.normal",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceUser();
}

main().catch(console.error);
