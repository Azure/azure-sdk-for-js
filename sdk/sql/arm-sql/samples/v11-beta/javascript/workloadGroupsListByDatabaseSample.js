// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of workload groups
 *
 * @summary gets the list of workload groups
 * x-ms-original-file: 2025-02-01-preview/GetWorkloadGroupList.json
 */
async function getTheListOfWorkloadGroupsForADataWarehouse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadGroups.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheListOfWorkloadGroupsForADataWarehouse();
}

main().catch(console.error);
