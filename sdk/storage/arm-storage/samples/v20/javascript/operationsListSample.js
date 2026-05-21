// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available Storage Rest API operations.
 *
 * @summary lists all of the available Storage Rest API operations.
 * x-ms-original-file: 2025-08-01/OperationsList.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential);
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
