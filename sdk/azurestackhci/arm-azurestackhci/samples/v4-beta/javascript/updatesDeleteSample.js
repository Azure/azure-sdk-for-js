// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete specified Update
 *
 * @summary delete specified Update
 * x-ms-original-file: 2025-12-01-preview/DeleteUpdates.json
 */
async function deleteAnUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updates.delete("testrg", "testcluster", "Microsoft4.2203.2.32");
}

async function main() {
  await deleteAnUpdate();
}

main().catch(console.error);
