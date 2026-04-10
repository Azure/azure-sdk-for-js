// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fails over from the current primary server to this server. This operation might result in data loss.
 *
 * @summary fails over from the current primary server to this server. This operation might result in data loss.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupForceFailoverAllowDataLoss.json
 */
async function forcedFailoverOfAFailoverGroupAllowingDataLoss() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.failoverGroups.forceFailoverAllowDataLoss(
    "Default",
    "failover-group-secondary-server",
    "failover-group-test-3",
  );
  console.log(result);
}

async function main() {
  await forcedFailoverOfAFailoverGroupAllowingDataLoss();
}

main().catch(console.error);
