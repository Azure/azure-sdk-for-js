// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a connection to the target group.
 *
 * @summary add a connection to the target group.
 * x-ms-original-file: 2024-12-01/WebPubSub_AddConnectionToGroup.json
 */
async function addConnectionToGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.addConnectionToGroup("group1", "connection1");
}

async function main(): Promise<void> {
  await addConnectionToGroup();
}

main().catch(console.error);
