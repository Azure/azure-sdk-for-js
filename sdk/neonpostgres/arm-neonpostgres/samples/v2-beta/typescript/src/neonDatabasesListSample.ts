// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NeonDatabase resources by Branch
 *
 * @summary list NeonDatabase resources by Branch
 * x-ms-original-file: 2025-06-23-preview/NeonDatabases_List_MaximumSet_Gen.json
 */
async function neonDatabasesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neonDatabases.list(
    "rgneon",
    "myOrganization",
    "myProject",
    "main",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await neonDatabasesListMaximumSet();
}

main().catch(console.error);
