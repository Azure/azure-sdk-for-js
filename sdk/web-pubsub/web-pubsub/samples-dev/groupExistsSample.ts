// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if there are any client connections inside the given group
 *
 * @summary check if there are any client connections inside the given group
 * x-ms-original-file: 2024-12-01/WebPubSub_GroupExists.json
 */
async function groupExists(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.groupExists("group1");
}

async function main(): Promise<void> {
  await groupExists();
}

main().catch(console.error);
