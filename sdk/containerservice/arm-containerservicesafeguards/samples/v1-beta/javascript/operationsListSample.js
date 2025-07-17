// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicesafeguards");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-05-02-preview/Operations_List.json
 */
async function listTheOperationsForTheProvider() {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheOperationsForTheProvider();
}

main().catch(console.error);
