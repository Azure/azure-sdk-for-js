// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a user to the target group.
 *
 * @summary add a user to the target group.
 * x-ms-original-file: 2024-12-01/WebPubSub_AddUserToGroup.json
 */
async function addUserToGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  const group = client.group("group1");
  await group.addUser("user1");
}

async function main(): Promise<void> {
  await addUserToGroup();
}

main().catch(console.error);
