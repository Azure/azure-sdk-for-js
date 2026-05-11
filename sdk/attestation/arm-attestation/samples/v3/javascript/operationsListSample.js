// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2021-06-01/Operations_List.json
 */
async function operationsList() {
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential);
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
