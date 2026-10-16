// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available RP operations.
 *
 * @summary lists all of the available RP operations.
 * x-ms-original-file: 2026-07-01/Operations_List.json
 */
async function listAllOperations() {
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential);
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
