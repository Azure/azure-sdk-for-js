// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of operations.
 *
 * @summary gets a list of operations.
 * x-ms-original-file: 2025-10-02-preview/Operation_List.json
 */
async function listAvailableOperationsForTheContainerServiceResourceProvider() {
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAvailableOperationsForTheContainerServiceResourceProvider();
}

main().catch(console.error);
