// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove a user from the target group.
 *
 * @summary remove a user from the target group.
 * x-ms-original-file: 2024-12-01/WebPubSub_RemoveUserFromGroup.json
 */
async function removeUserFromGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  const group = client.group("group1");
  await group.removeUser("user1");
}

async function main(): Promise<void> {
  await removeUserFromGroup();
}

main().catch(console.error);
