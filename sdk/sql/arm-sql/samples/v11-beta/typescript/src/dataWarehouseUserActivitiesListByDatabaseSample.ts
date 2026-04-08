// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the user activities of a data warehouse which includes running and suspended queries
 *
 * @summary list the user activities of a data warehouse which includes running and suspended queries
 * x-ms-original-file: 2025-02-01-preview/ListDataWarehouseUserActivities.json
 */
async function listOfTheUserActivitiesOfADataWarehouse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataWarehouseUserActivities.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfTheUserActivitiesOfADataWarehouse();
}

main().catch(console.error);
