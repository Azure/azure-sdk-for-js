// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add filtered connections to multiple groups.
 *
 * @summary add filtered connections to multiple groups.
 * x-ms-original-file: 2024-12-01/WebPubSub_AddConnectionsToGroups.json
 */
async function addConnectionsToGroups(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.addConnectionsToGroups({
    filter: "startswith(userId, 'listener-')",
    groups: ["group1", "group2"],
  });
}

async function main(): Promise<void> {
  await addConnectionsToGroups();
}

main().catch(console.error);
