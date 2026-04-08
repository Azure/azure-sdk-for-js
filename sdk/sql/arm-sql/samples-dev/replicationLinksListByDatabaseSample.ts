// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of replication links on database.
 *
 * @summary gets a list of replication links on database.
 * x-ms-original-file: 2025-02-01-preview/ReplicationLinkListByDatabase.json
 */
async function listReplicationLinksOnServerOnDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationLinks.listByDatabase(
    "Default",
    "sourcesvr",
    "tetha-db",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listReplicationLinksOnServerOnDatabase();
}

main().catch(console.error);
