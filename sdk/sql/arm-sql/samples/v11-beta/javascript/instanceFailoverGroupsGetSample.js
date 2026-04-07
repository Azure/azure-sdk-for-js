// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a failover group.
 *
 * @summary gets a failover group.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupGet.json
 */
async function getFailoverGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instanceFailoverGroups.get(
    "Default",
    "Japan East",
    "failover-group-test",
  );
  console.log(result);
}

async function main() {
  await getFailoverGroup();
}

main().catch(console.error);
