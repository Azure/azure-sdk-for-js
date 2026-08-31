// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-09-01-preview/ListOperation.json
 */
async function listsAllOfTheAvailableSQLRestAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableSQLRestAPIOperations();
}

main().catch(console.error);
