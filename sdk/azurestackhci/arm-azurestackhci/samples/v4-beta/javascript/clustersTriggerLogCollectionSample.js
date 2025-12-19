// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger Log Collection on a cluster
 *
 * @summary trigger Log Collection on a cluster
 * x-ms-original-file: 2025-12-01-preview/TriggerLogCollection.json
 */
async function triggerLogCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.triggerLogCollection("test-rg", "mycluster", {
    properties: {
      fromDate: new Date("2020-01-01T17:18:19.1234567Z"),
      toDate: new Date("2021-01-01T17:18:19.1234567Z"),
    },
  });
  console.log(result);
}

async function main() {
  await triggerLogCollection();
}

main().catch(console.error);
