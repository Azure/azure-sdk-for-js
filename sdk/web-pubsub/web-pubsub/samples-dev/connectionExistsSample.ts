// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if the connection with the given connectionId exists.
 *
 * @summary check if the connection with the given connectionId exists.
 * x-ms-original-file: 2024-12-01/WebPubSub_ConnectionExists.json
 */
async function connectionExists(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubClient(endpoint, credential, hub);
  await client.connectionExists("connection1");
}

async function main(): Promise<void> {
  await connectionExists();
}

main().catch(console.error);
