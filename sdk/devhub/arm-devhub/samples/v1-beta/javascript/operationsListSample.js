// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns list of operations.
 *
 * @summary returns list of operations.
 * x-ms-original-file: 2025-03-01-preview/Operation_List.json
 */
async function listAvailableOperationsForTheContainerServiceResourceProvider() {
  const credential = new DefaultAzureCredential();
  const client = new DeveloperHubServiceClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main() {
  await listAvailableOperationsForTheContainerServiceResourceProvider();
}

main().catch(console.error);
