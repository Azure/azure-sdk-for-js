// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to grant permission to the connection.
 *
 * @summary grant permission to the connection.
 * x-ms-original-file: 2024-12-01/WebPubSub_GrantPermission.json
 */
async function grantPermission(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.grantPermission("joinLeaveGroup", "connection1", { targetName: "group1" });
}

async function main(): Promise<void> {
  await grantPermission();
}

main().catch(console.error);
