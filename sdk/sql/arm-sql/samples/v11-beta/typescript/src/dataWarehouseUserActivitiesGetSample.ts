// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the user activities of a data warehouse which includes running and suspended queries
 *
 * @summary gets the user activities of a data warehouse which includes running and suspended queries
 * x-ms-original-file: 2025-02-01-preview/GetDataWarehouseUserActivities.json
 */
async function getTheListOfTheUserActivitiesOfADataWarehouse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataWarehouseUserActivities.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheListOfTheUserActivitiesOfADataWarehouse();
}

main().catch(console.error);
