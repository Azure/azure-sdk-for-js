// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the replication link type.
 *
 * @summary updates the replication link type.
 * x-ms-original-file: 2025-02-01-preview/ReplicationLinkCreateOrUpdate.json
 */
async function updatesReplicationLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.replicationLinks.createOrUpdate(
    "Default",
    "sourcesvr",
    "gamma-db",
    "00000000-1111-2222-3333-666666666666",
    { linkType: "STANDBY" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesReplicationLink();
}

main().catch(console.error);
