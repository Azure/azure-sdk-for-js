// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Update runs for a specified update
 *
 * @summary list all Update runs for a specified update
 * x-ms-original-file: 2025-12-01-preview/ListUpdateRuns.json
 */
async function listUpdateRunsUnderClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateRuns.list(
    "testrg",
    "testcluster",
    "Microsoft4.2203.2.32",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUpdateRunsUnderClusterResource();
}

main().catch(console.error);
