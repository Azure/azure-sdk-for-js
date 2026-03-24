// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to close the client connection.
 *
 * @summary close the client connection.
 * x-ms-original-file: 2024-12-01/WebPubSub_CloseConnection.json
 */
async function closeConnection(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.closeConnection("connection1", { reason: "Close reason" });
}

async function main(): Promise<void> {
  await closeConnection();
}

main().catch(console.error);
