// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Update Summaries
 *
 * @summary delete Update Summaries
 * x-ms-original-file: 2025-12-01-preview/DeleteUpdateSummaries.json
 */
async function deleteAnUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updateSummaries.delete("testrg", "testcluster");
}

async function main() {
  await deleteAnUpdate();
}

main().catch(console.error);
