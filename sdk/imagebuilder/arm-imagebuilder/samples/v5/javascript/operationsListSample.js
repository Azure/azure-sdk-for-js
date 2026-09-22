// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists available operations for the Microsoft.VirtualMachineImages provider
 *
 * @summary lists available operations for the Microsoft.VirtualMachineImages provider
 * x-ms-original-file: 2025-10-01/OperationsList.json
 */
async function retrieveOperationsList() {
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await retrieveOperationsList();
}

main().catch(console.error);
