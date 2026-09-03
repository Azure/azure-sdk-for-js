// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if there are any client connections connected for the given user.
 *
 * @summary check if there are any client connections connected for the given user.
 * x-ms-original-file: 2024-12-01/WebPubSub_UserExists.json
 */
async function userExists(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.userExists("user1");
}

async function main(): Promise<void> {
  await userExists();
}

main().catch(console.error);
