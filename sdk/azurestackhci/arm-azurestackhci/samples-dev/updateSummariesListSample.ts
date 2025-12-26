// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Update summaries under the HCI cluster
 *
 * @summary list all Update summaries under the HCI cluster
 * x-ms-original-file: 2025-12-01-preview/ListUpdateSummaries.json
 */
async function getUpdateSummariesUnderClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateSummaries.list("testrg", "testcluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getUpdateSummariesUnderClusterResource();
}

main().catch(console.error);
