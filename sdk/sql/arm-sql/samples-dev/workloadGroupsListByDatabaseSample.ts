// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of workload groups
 *
 * @summary gets the list of workload groups
 * x-ms-original-file: 2025-02-01-preview/GetWorkloadGroupList.json
 */
async function getTheListOfWorkloadGroupsForADataWarehouse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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

async function main(): Promise<void> {
  await getTheListOfWorkloadGroupsForADataWarehouse();
}

main().catch(console.error);
