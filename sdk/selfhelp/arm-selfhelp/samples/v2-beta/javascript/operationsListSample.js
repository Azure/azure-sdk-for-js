// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HelpRP } = require("@azure/arm-selfhelp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-03-01-preview/ListOperations.json
 */
async function listAllOperations() {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllOperations();
}

main().catch(console.error);
