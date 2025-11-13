// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post action: Discards a Batch operation in progress.
 *
 * @summary post action: Discards a Batch operation in progress.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_DiscardCommitBatch.json
 */
async function networkFabricsDiscardCommitBatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.discardCommitBatch("example-rg", "example-fabric", {
    commitBatchId: "batchId1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsDiscardCommitBatch();
}

main().catch(console.error);
