// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post action: Returns a status of commit batch operation.
 *
 * @summary post action: Returns a status of commit batch operation.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_CommitBatchStatus.json
 */
async function networkFabricsCommitBatchStatusMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.commitBatchStatus("example-rg", "example-fabric", {
    commitBatchId: "batch-id",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsCommitBatchStatusMaximumSet();
}

main().catch(console.error);
