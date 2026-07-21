// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available NetworkFunction Rest API operations.
 *
 * @summary lists all of the available NetworkFunction Rest API operations.
 * x-ms-original-file: 2022-11-01/OperationsList.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential);
  const resArray = new Array();
  for await (const item of client.networkFunction.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await operationsList();
}

main().catch(console.error);
