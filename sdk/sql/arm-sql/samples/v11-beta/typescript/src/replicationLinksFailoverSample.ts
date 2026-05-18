// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fails over from the current primary server to this server.
 *
 * @summary fails over from the current primary server to this server.
 * x-ms-original-file: 2025-02-01-preview/ReplicationLinkFailover.json
 */
async function plannedFailoverOfAReplicationLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.replicationLinks.failover(
    "Default",
    "sourcesvr",
    "gamma-db",
    "4891ca10-ebd0-47d7-9182-c722651780fb",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await plannedFailoverOfAReplicationLink();
}

main().catch(console.error);
