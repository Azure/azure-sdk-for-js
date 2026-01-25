// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to put Update summaries under the HCI cluster
 *
 * @summary put Update summaries under the HCI cluster
 * x-ms-original-file: 2025-12-01-preview/PutUpdateSummaries.json
 */
async function putUpdateSummariesUnderClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updateSummaries.put("testrg", "testcluster", {
    currentVersion: "4.2203.2.32",
    hardwareModel: "PowerEdge R730xd",
    lastChecked: new Date("2022-04-07T18:04:07Z"),
    lastUpdated: new Date("2022-04-06T14:08:18.254Z"),
    oemFamily: "DellEMC",
    state: "AppliedSuccessfully",
  });
  console.log(result);
}

async function main() {
  await putUpdateSummariesUnderClusterResource();
}

main().catch(console.error);
