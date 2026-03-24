// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to close connections for the specific user.
 *
 * @summary close connections for the specific user.
 * x-ms-original-file: 2024-12-01/WebPubSub_CloseUserConnections.json
 */
async function closeUserConnections(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.closeUserConnections("user1", { reason: "Close reason" });
}

async function main(): Promise<void> {
  await closeUserConnections();
}

main().catch(console.error);
