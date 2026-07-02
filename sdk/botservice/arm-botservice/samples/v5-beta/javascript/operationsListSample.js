// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureBotService } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2023-09-15-preview/GetOperations.json
 */
async function getOperations() {
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getOperations();
}

main().catch(console.error);
