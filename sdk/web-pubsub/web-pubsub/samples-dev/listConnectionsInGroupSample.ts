// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list connections in a group.
 *
 * @summary list connections in a group.
 * x-ms-original-file: 2024-12-01/WebPubSub_ListConnectionsInGroup.json
 */
async function listConnectionsInGroup(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  const group = client.group("group1");
  const resArray = new Array();
  for await (const item of await group.listConnections({
    maxPageSize: 200,
    top: 1000,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectionsInGroup();
}

main().catch(console.error);
