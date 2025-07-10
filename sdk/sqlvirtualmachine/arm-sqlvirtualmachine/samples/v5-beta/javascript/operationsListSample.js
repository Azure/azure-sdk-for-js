// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available SQL Virtual Machine Rest API operations.
 *
 * @summary lists all of the available SQL Virtual Machine Rest API operations.
 * x-ms-original-file: 2023-10-01/ListOperation.json
 */
async function listsAllOfTheAvailableSQLVirtualMachineRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOfTheAvailableSQLVirtualMachineRestAPIOperations();
}

main().catch(console.error);
