// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a workload group
 *
 * @summary gets a workload group
 * x-ms-original-file: 2025-02-01-preview/GetWorkloadGroup.json
 */
async function getsAWorkloadGroupForADataWarehouse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.workloadGroups.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "smallrc",
  );
  console.log(result);
}

async function main() {
  await getsAWorkloadGroupForADataWarehouse();
}

main().catch(console.error);
