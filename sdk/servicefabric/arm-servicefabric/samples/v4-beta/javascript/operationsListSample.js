// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of available Service Fabric resource provider API operations.
 *
 * @summary get the list of available Service Fabric resource provider API operations.
 * x-ms-original-file: 2026-03-01-preview/Operations_example.json
 */
async function listAvailableOperations() {
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAvailableOperations();
}

main().catch(console.error);
