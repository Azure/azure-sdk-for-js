// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of all ConnectedCache
 *
 * @summary retrieves the properties of all ConnectedCache
 * x-ms-original-file: 2023-05-01-preview/CacheNodesOperations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function cacheNodesPrivatePreviewLegacyGetOperationListByResourceGroupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.cacheNodesOperations.listByResourceGroup(
    "rgConnectedCache",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  cacheNodesPrivatePreviewLegacyGetOperationListByResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
