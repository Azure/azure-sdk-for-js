// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove a connection from all groups.
 *
 * @summary remove a connection from all groups.
 * x-ms-original-file: 2024-12-01/WebPubSub_RemoveConnectionFromAllGroups.json
 */
async function removeConnectionFromAllGroups(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.removeConnectionFromAllGroups("connection1");
}

async function main(): Promise<void> {
  await removeConnectionFromAllGroups();
}

main().catch(console.error);
