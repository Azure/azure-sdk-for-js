// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available REST API operations.
 *
 * @summary lists all available REST API operations.
 * x-ms-original-file: 2026-01-01-preview/OperationsList.json
 */
async function listAllAvailableRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllAvailableRestAPIOperations();
}

main().catch(console.error);
