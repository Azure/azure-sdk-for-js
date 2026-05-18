// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available SQL Rest API operations.
 *
 * @summary lists all of the available SQL Rest API operations.
 * x-ms-original-file: 2025-02-01-preview/ListOperations.json
 */
async function listsAllOfTheAvailableSQLRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential);
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
