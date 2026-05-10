// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the failover groups in a server.
 *
 * @summary lists the failover groups in a server.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupList.json
 */
async function listFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.failoverGroups.listByServer(
    "Default",
    "failover-group-primary-server",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFailoverGroup();
}

main().catch(console.error);
