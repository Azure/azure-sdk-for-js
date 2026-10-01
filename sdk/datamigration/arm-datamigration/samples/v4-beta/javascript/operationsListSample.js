// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-09-01-preview/ListOperation.json
 */
async function listsAllOfTheAvailableSQLRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOfTheAvailableSQLRestAPIOperations();
}

main().catch(console.error);
