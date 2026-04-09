// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to revoke a permission from a connection.
 *
 * @summary Revoke a permission from a connection.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  await serviceClient.revokePermission("connectionId", "joinLeaveGroup", {
    targetName: "myGroup",
  });
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to revoke a permission from a connection.
 *
 * @summary Revoke a permission from a connection.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  await serviceClient.revokePermission("connectionId", "joinLeaveGroup", {
    targetName: "myGroup",
  });
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revoke permission for the connection.
 *
 * @summary revoke permission for the connection.
 * x-ms-original-file: 2024-12-01/WebPubSub_RevokePermission.json
 */
async function revokePermission(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  await client.revokePermission("joinLeaveGroup", "connection1", { targetName: "group1" });
}

async function main(): Promise<void> {
  await revokePermission();
}

main().catch(console.error);
