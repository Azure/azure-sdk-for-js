// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a failover group.
 *
 * @summary deletes a failover group.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupDelete.json
 */
async function deleteFailoverGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.instanceFailoverGroups.delete("Default", "Japan East", "failover-group-test-1");
}

async function main() {
  await deleteFailoverGroup();
}

main().catch(console.error);
