// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if a connection has permission to the specified action.
 *
 * @summary check if a connection has permission to the specified action.
 * x-ms-original-file: 2024-12-01/WebPubSub_CheckPermission.json
 */
async function checkPermission(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.checkPermission("joinLeaveGroup", "connection1", { targetName: "group1" });
}

async function main(): Promise<void> {
  await checkPermission();
}

main().catch(console.error);
