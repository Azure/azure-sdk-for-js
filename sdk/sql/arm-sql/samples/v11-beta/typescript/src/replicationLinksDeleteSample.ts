// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the replication link.
 *
 * @summary deletes the replication link.
 * x-ms-original-file: 2025-02-01-preview/ReplicationLinkDelete.json
 */
async function deleteReplicationLinkOnServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.replicationLinks.delete(
    "Default",
    "sourcesvr",
    "gamma-db",
    "4891ca10-ebd0-47d7-9182-c722651780fb",
  );
}

async function main(): Promise<void> {
  await deleteReplicationLinkOnServer();
}

main().catch(console.error);
