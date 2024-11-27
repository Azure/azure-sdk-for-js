// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing Cache Node
 *
 * @summary updates an existing Cache Node
 * x-ms-original-file: 2023-05-01-preview/CacheNodesOperations_Update_MaximumSet_Gen.json
 */
async function cacheNodesPrivatePreviewLegacyUpdateOperationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.cacheNodesOperations.update(
    "rgConnectedCache",
    "wlrwpdbcv",
    { tags: { key5032: "esiuyjbpcwkpqriqiqztxuocv" } },
  );
  console.log(result);
}

async function main() {
  cacheNodesPrivatePreviewLegacyUpdateOperationGeneratedByMaximumSetRule();
}

main().catch(console.error);
