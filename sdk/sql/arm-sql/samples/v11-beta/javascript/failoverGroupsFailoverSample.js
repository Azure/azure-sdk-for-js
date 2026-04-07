// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fails over from the current primary server to this server.
 *
 * @summary fails over from the current primary server to this server.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupFailover.json
 */
async function plannedFailoverOfAFailoverGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.failoverGroups.failover(
    "Default",
    "failover-group-secondary-server",
    "failover-group-test-3",
  );
  console.log(result);
}

async function main() {
  await plannedFailoverOfAFailoverGroup();
}

main().catch(console.error);
