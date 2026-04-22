// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists available operations for the Microsoft.Batch provider
 *
 * @summary lists available operations for the Microsoft.Batch provider
 * x-ms-original-file: 2025-06-01/OperationsList.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await operationsList();
}

main().catch(console.error);
