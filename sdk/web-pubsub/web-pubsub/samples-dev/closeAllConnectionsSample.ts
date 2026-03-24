// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to close the connections in the hub.
 *
 * @summary close the connections in the hub.
 * x-ms-original-file: 2024-12-01/WebPubSub_CloseAllConnections.json
 */
async function closeAllConnections(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.closeAllConnections({ reason: "Close reason" });
}

async function main(): Promise<void> {
  await closeAllConnections();
}

main().catch(console.error);
