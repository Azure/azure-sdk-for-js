// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to close connections in the specific group.
 *
 * @summary close connections in the specific group.
 * x-ms-original-file: 2024-12-01/WebPubSub_CloseGroupConnections.json
 */
async function closeGroupConnections(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.closeGroupConnections("group1", { reason: "Close reason" });
}

async function main(): Promise<void> {
  await closeGroupConnections();
}

main().catch(console.error);
