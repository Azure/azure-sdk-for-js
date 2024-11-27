// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api gets secrets of the ispCacheNode resource install details
 *
 * @summary this api gets secrets of the ispCacheNode resource install details
 * x-ms-original-file: 2023-05-01-preview/IspCacheNodesOperations_GetCacheNodeInstallDetails_MaximumSet_Gen.json
 */
async function ispCacheNodeResourceGetInstallDetailsGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result =
    await client.ispCacheNodesOperations.getCacheNodeInstallDetails(
      "rgConnectedCache",
      "MccRPTest1",
      "MCCCachenode1",
    );
  console.log(result);
}

async function main() {
  ispCacheNodeResourceGetInstallDetailsGeneratedByMaximumSetRule();
}

main().catch(console.error);
