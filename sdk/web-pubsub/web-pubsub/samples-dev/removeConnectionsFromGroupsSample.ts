// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove filtered connections from multiple groups.
 *
 * @summary remove filtered connections from multiple groups.
 * x-ms-original-file: 2024-12-01/WebPubSub_RemoveConnectionsFromGroups.json
 */
async function removeConnectionsFromGroups(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.removeConnectionsFromGroups(["group1", "group2"], "startswith(userId, 'listener-')");
}

async function main(): Promise<void> {
  await removeConnectionsFromGroups();
}

main().catch(console.error);
