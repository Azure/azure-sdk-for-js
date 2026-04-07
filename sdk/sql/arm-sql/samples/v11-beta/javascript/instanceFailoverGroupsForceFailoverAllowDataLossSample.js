// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fails over from the current primary managed instance to this managed instance. This operation might result in data loss.
 *
 * @summary fails over from the current primary managed instance to this managed instance. This operation might result in data loss.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupForceFailoverAllowDataLoss.json
 */
async function forcedFailoverOfAFailoverGroupAllowingDataLoss() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instanceFailoverGroups.forceFailoverAllowDataLoss(
    "Default",
    "Japan West",
    "failover-group-test-3",
  );
  console.log(result);
}

async function main() {
  await forcedFailoverOfAFailoverGroupAllowingDataLoss();
}

main().catch(console.error);
