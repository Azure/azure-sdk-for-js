// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of managed instance administrators.
 *
 * @summary gets a list of managed instance administrators.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdministratorListByInstance.json
 */
async function listAdministratorsOfManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstanceAdministrators.listByInstance(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAdministratorsOfManagedInstance();
}

main().catch(console.error);
