// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the available Azure Data Factory API operations.
 *
 * @summary lists the available Azure Data Factory API operations.
 * x-ms-original-file: 2018-06-01/Operations_List.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential);
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
