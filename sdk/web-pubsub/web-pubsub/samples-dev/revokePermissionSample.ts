// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revoke permission for the connection.
 *
 * @summary revoke permission for the connection.
 * x-ms-original-file: 2024-12-01/WebPubSub_RevokePermission.json
 */
async function revokePermission(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.revokePermission("joinLeaveGroup", "connection1", { targetName: "group1" });
}

async function main(): Promise<void> {
  await revokePermission();
}

main().catch(console.error);
