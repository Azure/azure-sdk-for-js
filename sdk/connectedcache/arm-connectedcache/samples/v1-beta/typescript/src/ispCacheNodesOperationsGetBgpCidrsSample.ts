// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api gets ispCacheNode resource information
 *
 * @summary this api gets ispCacheNode resource information
 * x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_GetBgpCidrs_MaximumSet_Gen.json
 */
async function ispCacheNodesResourceBgpCidrsDetailsGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.ispCacheNodesOperations.getBgpCidrs(
    "rgConnectedCache",
    "MccRPTest1",
    "MCCCachenode1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ispCacheNodesResourceBgpCidrsDetailsGeneratedByMaximumSetRule();
}

main().catch(console.error);
