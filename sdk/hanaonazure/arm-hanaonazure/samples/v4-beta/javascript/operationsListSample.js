// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HanaManagementClient } = require("@azure/arm-hanaonazure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of SAP HANA management operations.
 *
 * @summary gets a list of SAP HANA management operations.
 * x-ms-original-file: 2020-02-07-preview/HanaOperations_List.json
 */
async function listAllHanaManagementOperationsSupportedByHanaRP() {
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllHanaManagementOperationsSupportedByHanaRP();
}

main().catch(console.error);
