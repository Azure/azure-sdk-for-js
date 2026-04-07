// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fails over from the current primary server to this server. This operation tries planned before forced failover but might still result in data loss.
 *
 * @summary fails over from the current primary server to this server. This operation tries planned before forced failover but might still result in data loss.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupTryPlannedBeforeForcedFailover.json
 */
async function tryPlannedBeforeForcedFailoverOfAFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.failoverGroups.tryPlannedBeforeForcedFailover(
    "Default",
    "failovergroupsecondaryserver",
    "failovergrouptest3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tryPlannedBeforeForcedFailoverOfAFailoverGroup();
}

main().catch(console.error);
